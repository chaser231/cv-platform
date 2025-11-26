import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Начальное состояние мастер-профиля
const initialMasterProfile = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    links: "",
    photo: null
  },
  summary: "",
  experience: [],
  skills: [],
  education: [],
  projects: [],
  certifications: [],
  languages: []
};

export const useProfileStore = create(
  persist(
    (set, get) => ({
      // Состояние
      masterProfile: initialMasterProfile,
      tailoredResumes: [], // История адаптированных резюме
      isProcessingAI: false,
      aiTokensUsed: 0,
      
      // Действия
      updateMasterProfile: (updates) => 
        set((state) => ({
          masterProfile: { ...state.masterProfile, ...updates }
        })),
      
      updatePersonalInfo: (updates) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            personalInfo: { ...state.masterProfile.personalInfo, ...updates }
          }
        })),
      
      updateSummary: (summary) =>
        set((state) => ({
          masterProfile: { ...state.masterProfile, summary }
        })),
      
      addExperience: (experience) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            experience: [...state.masterProfile.experience, { ...experience, id: Date.now() }]
          }
        })),
      
      updateExperience: (id, updates) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            experience: state.masterProfile.experience.map(exp =>
              exp.id === id ? { ...exp, ...updates } : exp
            )
          }
        })),
      
      deleteExperience: (id) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            experience: state.masterProfile.experience.filter(exp => exp.id !== id)
          }
        })),
      
      addProject: (project) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            projects: [...state.masterProfile.projects, { ...project, id: Date.now() }]
          }
        })),
      
      updateProject: (id, updates) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            projects: state.masterProfile.projects.map(proj =>
              proj.id === id ? { ...proj, ...updates } : proj
            )
          }
        })),
      
      deleteProject: (id) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            projects: state.masterProfile.projects.filter(proj => proj.id !== id)
          }
        })),
      
      addLanguage: (language) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            languages: [...state.masterProfile.languages, { ...language, id: Date.now() }]
          }
        })),
      
      updateLanguage: (id, updates) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            languages: state.masterProfile.languages.map(lang =>
              lang.id === id ? { ...lang, ...updates } : lang
            )
          }
        })),
      
      deleteLanguage: (id) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            languages: state.masterProfile.languages.filter(lang => lang.id !== id)
          }
        })),
      
      // Skills методы
      addSkill: (skill) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            skills: [...state.masterProfile.skills, skill]
          }
        })),
      
      deleteSkill: (index) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            skills: state.masterProfile.skills.filter((_, i) => i !== index)
          }
        })),
      
      updateSkills: (skills) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            skills
          }
        })),
      
      // Education методы
      addEducation: (education) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            education: [...state.masterProfile.education, { ...education, id: Date.now() }]
          }
        })),
      
      updateEducation: (id, updates) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            education: state.masterProfile.education.map(edu =>
              edu.id === id ? { ...edu, ...updates } : edu
            )
          }
        })),
      
      deleteEducation: (id) =>
        set((state) => ({
          masterProfile: {
            ...state.masterProfile,
            education: state.masterProfile.education.filter(edu => edu.id !== id)
          }
        })),
      
      setAIProcessing: (isProcessing) =>
        set({ isProcessingAI: isProcessing }),
      
      incrementAITokens: (amount = 1) =>
        set((state) => ({ aiTokensUsed: state.aiTokensUsed + amount })),
      
      // Методы для работы с адаптированными резюме
      addTailoredResume: (resume) =>
        set((state) => ({
          tailoredResumes: [{
            ...resume,
            id: Date.now(),
            createdAt: new Date().toISOString()
          }, ...state.tailoredResumes]
        })),
      
      deleteTailoredResume: (id) =>
        set((state) => ({
          tailoredResumes: state.tailoredResumes.filter(r => r.id !== id)
        })),
      
      updateTailoredResume: (id, updates) =>
        set((state) => ({
          tailoredResumes: state.tailoredResumes.map(r =>
            r.id === id ? { ...r, ...updates } : r
          )
        })),
      
      resetProfile: () =>
        set({ masterProfile: initialMasterProfile, tailoredResumes: [], aiTokensUsed: 0 })
    }),
    {
      name: 'cv-master-profile', // Ключ в localStorage
      partialize: (state) => ({
        masterProfile: state.masterProfile,
        tailoredResumes: state.tailoredResumes,
        aiTokensUsed: state.aiTokensUsed
      })
    }
  )
);

