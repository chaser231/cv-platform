/**
 * CV Platform - Main Application
 * 
 * Рефакторинг: App.jsx теперь содержит только layout и routing.
 * Все компоненты вынесены в src/components/
 */

import React, { useState, useEffect } from 'react';
import { User, Download, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Store & Hooks
import { useProfileStore } from './src/store/useProfileStore';
import { useAutosave } from './src/hooks/useAutosave';

// Services
import aiService from './src/services/ai/aiService';

// Components
import {
  Sidebar,
  EditorForm,
  ResumePreview,
  SettingsView,
  JobsView,
  AIChatWidget,
  ResumeScoreCard,
  PDFDocument
} from './src/components';

// --- INITIAL DATA ---

const initialMasterProfile = {
  personalInfo: {
    fullName: "Алексей Иванов",
    title: "Senior Full Stack Developer",
    email: "alex.ivanov@example.com",
    phone: "+7 (999) 123-45-67",
    location: "Москва, Россия",
    links: "[github.com/alexivanov](https://github.com/alexivanov)"
  },
  summary: "Опытный разработчик с 5-летним стажем. Люблю писать код и решать сложные задачи. Работал с React и Node.js.",
  experience: [
    {
      id: 1,
      company: "TechCorp",
      role: "Middle Frontend Developer",
      dates: "2020 - 2023",
      description: "Разрабатывал интерфейсы для CRM системы. Использовал React и Redux. Ускорил загрузку страниц."
    },
    {
      id: 2,
      company: "StartUp Inc",
      role: "Junior Web Developer",
      dates: "2018 - 2020",
      description: "Верстка лендингов, поддержка легаси кода на jQuery. Участие в код-ревью."
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  education: [
    {
      id: 1,
      institution: "МГТУ им. Баумана",
      degree: "Магистр, Информатика и вычислительная техника",
      dates: "2014 - 2018"
    }
  ],
  projects: [],
  languages: []
};

// --- MAIN APP COMPONENT ---

export default function ResumeBuilderApp() {
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState('master');
  
  // Автосохранение
  const { saveStatus, triggerSave } = useAutosave(() => {
    // Zustand автоматически сохраняет в localStorage
  }, 1000);
  
  // Zustand Store
  const { 
    masterProfile, 
    updateSummary,
    updateExperience,
    updateMasterProfile,
    addExperience,
    deleteExperience,
    addProject,
    deleteProject,
    addLanguage,
    deleteLanguage,
    addTailoredResume,
    resetProfile,
    isProcessingAI,
    setAIProcessing,
    aiTokensUsed,
    incrementAITokens
  } = useProfileStore();

  // Инициализация данными, если профиль пустой
  useEffect(() => {
    if (!masterProfile.personalInfo.fullName) {
      updateMasterProfile(initialMasterProfile);
    }
  }, []);

  // AI Logic
  const handleAIAction = async (type, id = null) => {
    setAIProcessing(true);
    
    try {
      const locale = i18n.language;
      
      if (type === 'summary') {
        const improved = await aiService.improveSummary(masterProfile.summary, locale);
        updateSummary(improved);
        incrementAITokens(1);
      } else if (type === 'experience') {
        const exp = masterProfile.experience.find(e => e.id === id);
        if (exp) {
          const improved = await aiService.improveBullet(exp.description, locale);
          updateExperience(id, { description: improved });
          incrementAITokens(1);
        }
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('AI service error. Please try again.');
    } finally {
      setAIProcessing(false);
    }
  };

  // Handlers
  const handleAddExperience = () => {
    addExperience({
      company: '',
      role: '',
      dates: '',
      description: ''
    });
    triggerSave();
  };

  const handleAddProject = () => {
    addProject({
      name: '',
      description: '',
      technologies: [],
      link: '',
      dates: ''
    });
    triggerSave();
  };

  const handleAddLanguage = () => {
    addLanguage({
      language: '',
      level: 'intermediate'
    });
    triggerSave();
  };

  const handleProfileChange = (updates) => {
    updateMasterProfile(updates);
    triggerSave();
  };

  const handleResetData = () => {
    const message = i18n.language === 'ru' 
      ? 'Вы уверены? Все данные будут удалены.' 
      : 'Are you sure? All data will be deleted.';
    
    if (confirm(message)) {
      resetProfile();
      const successMsg = i18n.language === 'ru' 
        ? 'Данные успешно удалены!' 
        : 'Data successfully deleted!';
      alert(successMsg);
    }
  };

  const handleSaveTailoredResume = (resume) => {
    addTailoredResume(resume);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        aiTokensUsed={aiTokensUsed}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {activeTab === 'settings' ? (
          <SettingsView 
            aiTokensUsed={aiTokensUsed}
            onResetData={handleResetData}
          />
        ) : activeTab === 'jobs' ? (
          <JobsView 
            masterProfile={masterProfile}
            onSaveTailoredResume={handleSaveTailoredResume}
          />
        ) : (
          /* Split View Editor */
          <>
            {/* Left Panel: Editor */}
            <div className="w-1/2 min-w-[500px] border-r border-slate-200 h-full relative z-10 shadow-xl">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                  <h2 className="font-bold text-lg flex items-center">
                    <User size={20} className="mr-2 text-slate-400" />
                    {i18n.language === 'ru' ? 'Редактор Мастер CV' : 'Master CV Editor'}
                  </h2>
                  <div className="flex items-center space-x-3">
                    {/* Autosave Indicator */}
                    {saveStatus === 'saving' && (
                      <span className="text-xs text-slate-500 flex items-center">
                        <span className="animate-spin mr-1">⌛</span> {t('common.saving')}
                      </span>
                    )}
                    {saveStatus === 'saved' && (
                      <span className="text-xs text-green-600 flex items-center">
                        <CheckCircle2 size={14} className="mr-1" /> {t('common.saved')}
                      </span>
                    )}
                    {isProcessingAI && (
                      <span className="text-xs text-purple-600 animate-pulse font-bold">
                        {i18n.language === 'ru' ? 'AI думает...' : 'AI thinking...'}
                      </span>
                    )}
                  </div>
                </div>
                <EditorForm 
                  data={masterProfile} 
                  onChange={handleProfileChange} 
                  onAIAction={handleAIAction}
                  isProcessingAI={isProcessingAI}
                  onAddExperience={handleAddExperience}
                  onAddProject={handleAddProject}
                  onAddLanguage={handleAddLanguage}
                  onDeleteExperience={deleteExperience}
                  onDeleteProject={deleteProject}
                  onDeleteLanguage={deleteLanguage}
                />
              </div>
            </div>

            {/* Right Panel: Preview */}
            <div className="flex-1 h-full bg-slate-100 relative overflow-hidden">
              {/* Top Bar: Score Card + Download */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between pointer-events-none">
                {/* Resume Health Check */}
                <div className="pointer-events-auto max-w-sm">
                  <ResumeScoreCard 
                    profile={masterProfile} 
                    isCompact={true}
                    onAutoFix={async (improvement) => {
                      // Обработка auto-fix через AI
                      if (improvement.type === 'summary') {
                        await handleAIAction('summary');
                      } else if (improvement.type === 'experience' && improvement.targetId) {
                        await handleAIAction('experience', improvement.targetId);
                      }
                    }}
                  />
                </div>
                
                {/* Download PDF */}
                <div className="pointer-events-auto">
                  <PDFDownloadLink
                    document={<PDFDocument data={masterProfile} showWatermark={true} />}
                    fileName={`${masterProfile.personalInfo.fullName || 'Resume'}_CV.pdf`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg flex items-center font-medium transition-colors"
                  >
                    {({ loading }) => (
                      loading ? (
                        <>
                          <span className="animate-spin mr-2">⌛</span>
                          {i18n.language === 'ru' ? 'Готовлю...' : 'Preparing...'}
                        </>
                      ) : (
                        <>
                          <Download size={16} className="mr-2" />
                          {i18n.language === 'ru' ? 'Скачать PDF' : 'Download PDF'}
                        </>
                      )
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
              
              <ResumePreview data={masterProfile} />
            </div>
          </>
        )}
      </main>

      {/* AI Chat Widget - Floating */}
      <AIChatWidget profileContext={masterProfile} />
    </div>
  );
}
