import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  FileText, 
  Settings, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  User, 
  Plus, 
  Trash2, 
  ChevronRight,
  Download,
  Search,
  CheckCircle2,
  Wand2,
  Globe,
  MessageCircle,
  Send,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from './src/store/useProfileStore';
import aiService from './src/services/ai/aiService';
import { useAutosave } from './src/hooks/useAutosave';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './src/components/PDFDocument';

// --- MOCK DATA & TYPES ---

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
  ]
};

// --- COMPONENTS ---

// 1. Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, aiTokensUsed }) => {
  const { t, i18n } = useTranslation();
  
  const menuItems = [
    { id: 'master', label: t('sidebar.masterProfile'), icon: User },
    { id: 'jobs', label: t('sidebar.myApplications'), icon: Briefcase },
    { id: 'settings', label: t('sidebar.settings'), icon: Settings },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
          <span className="text-white font-bold text-lg tracking-tight">CV Platform</span>
        </div>
        
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
        >
          <Globe size={16} />
          <span className="font-medium">{i18n.language.toUpperCase()}</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-400">{i18n.language === 'ru' ? 'EN' : 'RU'}</span>
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
            <div>
              <div className="text-white text-sm font-medium">{t('sidebar.proPlan')}</div>
              <div className="text-xs text-slate-400">Free Plan</div>
            </div>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-blue-500"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>{t('sidebar.tokensUsed')}</span>
            <span>{aiTokensUsed} / 1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. AI Improvement Button
const AIGenerateButton = ({ onGenerate, isGenerating, label }) => {
  const { t } = useTranslation();
  const defaultLabel = label || t('ai.improve');
  
  return (
    <button
      onClick={onGenerate}
      disabled={isGenerating}
      className="flex items-center space-x-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <span className="animate-spin">⌛</span>
      ) : (
        <Sparkles size={12} />
      )}
      <span>{isGenerating ? t('ai.thinking') : defaultLabel}</span>
    </button>
  );
};

// 3. Resume Preview Component (The A4 Paper)
const ResumePreview = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-slate-100 p-8 overflow-y-auto h-full">
      <div className="flex justify-center min-h-full">
        <div 
          className="bg-white shadow-2xl w-[210mm] p-[15mm] text-slate-800 transition-all duration-300 ease-in-out origin-top transform scale-[0.85] lg:scale-100 my-8"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            minHeight: '297mm', // Минимум A4, но может расширяться
            paddingBottom: '15mm', // Стандартный отступ
            height: 'auto' // Автоматическая высота
          }}
        >
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-blue-600 font-medium mt-1">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
            <span>{data.personalInfo.email}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
            <span>•</span>
            <span>{data.personalInfo.location}</span>
            <span>•</span>
            <span className="text-blue-600">{data.personalInfo.links}</span>
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">{t('profile.summary')}</h2>
            <p className="text-sm leading-relaxed text-slate-700 text-justify">
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">{t('profile.experience')}</h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-sm text-slate-500 font-medium">{exp.dates}</span>
                  </div>
                  <div className="text-blue-600 text-sm font-semibold mb-2">{exp.company}</div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">{t('profile.skills')}</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">{t('profile.projects')}</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-slate-900 text-sm">{project.name}</h3>
                  {project.link && (
                    <div className="text-blue-600 text-xs mb-1">{project.link}</div>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">{t('profile.education')}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-slate-700">{edu.degree}</span>
                  <span className="text-slate-500">{edu.dates}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">{t('profile.languages')}</h2>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center space-x-2">
                  <span className="font-medium text-sm text-slate-900">{lang.language}</span>
                  <span className="text-slate-400">—</span>
                  <span className="text-xs text-slate-600 capitalize">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

// 4. Editor Form Component
const EditorForm = ({ data, onChange, onAIAction, isProcessingAI, onAddExperience, onAddProject, onAddLanguage, onDeleteExperience, onDeleteProject, onDeleteLanguage }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('personal');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Валидация email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('');
      return true;
    }
    if (!emailRegex.test(email)) {
      setEmailError(t('common.error') + ': Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Валидация телефона
  const validatePhone = (phone) => {
    // Разрешаем международный формат: +7, +1, и т.д., или просто цифры
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phone) {
      setPhoneError('');
      return true;
    }
    // Проверяем минимальную длину (хотя бы 7 цифр)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setPhoneError(t('common.error') + ': Too short');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError(t('common.error') + ': Invalid format');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePersonalChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleSummaryChange = (value) => {
    onChange({ ...data, summary: value });
  };

  const handleExpChange = (id, field, value) => {
    const newExp = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: newExp });
  };

  const handleProjectChange = (id, field, value) => {
    const newProjects = data.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange({ ...data, projects: newProjects });
  };

  const handleLanguageChange = (id, field, value) => {
    const newLanguages = data.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onChange({ ...data, languages: newLanguages });
  };

  const sections = [
    { id: 'personal', label: t('profile.personalInfo'), icon: User },
    { id: 'summary', label: t('profile.summary'), icon: FileText },
    { id: 'experience', label: t('profile.experience'), icon: Briefcase },
    { id: 'projects', label: t('profile.projects'), icon: Layout },
    { id: 'skills', label: t('profile.skills'), icon: CheckCircle2 },
    { id: 'education', label: t('profile.education'), icon: GraduationCap },
    { id: 'languages', label: t('profile.languages'), icon: Globe },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Section Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`flex items-center space-x-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeSection === sec.id
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <sec.icon size={16} />
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-20 space-y-6">
        
        {activeSection === 'personal' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800">{t('profile.personalInfo')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  {t('profile.fullName')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  required
                  className={`w-full p-2 border rounded focus:ring-2 focus:border-transparent outline-none ${
                    !data.personalInfo.fullName ? 'border-yellow-300' : 'border-slate-300'
                  } focus:ring-blue-500`}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  {t('profile.title')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  required
                  className={`w-full p-2 border rounded focus:ring-2 outline-none ${
                    !data.personalInfo.title ? 'border-yellow-300' : 'border-slate-300'
                  } focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('profile.email')}</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email}
                  onChange={(e) => {
                    handlePersonalChange('email', e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`w-full p-2 border rounded focus:ring-2 outline-none ${
                    emailError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                />
                {emailError && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {emailError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('profile.phone')}</label>
                <input 
                  type="tel" 
                  value={data.personalInfo.phone}
                  onChange={(e) => {
                    handlePersonalChange('phone', e.target.value);
                    validatePhone(e.target.value);
                  }}
                  onBlur={(e) => validatePhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className={`w-full p-2 border rounded focus:ring-2 outline-none ${
                    phoneError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                />
                {phoneError && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {phoneError}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('profile.location')}</label>
                <input 
                  type="text" 
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{t('profile.links')}</label>
                <input 
                  type="text" 
                  value={data.personalInfo.links}
                  onChange={(e) => handlePersonalChange('links', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'summary' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{t('profile.summary')}</h3>
              <AIGenerateButton 
                isGenerating={isProcessingAI} 
                onGenerate={() => onAIAction('summary')} 
                label={t('ai.rewrite')}
              />
            </div>
            <textarea 
              rows={6}
              value={data.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
              placeholder={t('profile.summary')}
            />
            <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-700 flex items-start space-x-2">
              <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
              <p>{t('ai.suggestions')}</p>
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800 flex justify-between">
              <span>{t('profile.experience')}</span>
              <button 
                onClick={onAddExperience}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </h3>
            
            {data.experience && data.experience.length > 0 ? (
              data.experience.map((exp, idx) => (
              <div key={exp.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all relative">
                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (confirm(t('common.confirmDelete'))) {
                      onDeleteExperience(exp.id);
                    }
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                  title={t('common.delete')}
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-2 gap-3 mb-3 pr-8">
                  <input 
                    placeholder={t('profile.experience')}
                    value={exp.company}
                    onChange={(e) => handleExpChange(exp.id, 'company', e.target.value)}
                    className="p-2 border border-slate-300 rounded text-sm font-bold"
                  />
                  <input 
                    placeholder={t('profile.title')}
                    value={exp.role}
                    onChange={(e) => handleExpChange(exp.id, 'role', e.target.value)}
                    className="p-2 border border-slate-300 rounded text-sm"
                  />
                  <input 
                    placeholder="2020 - 2023"
                    value={exp.dates}
                    onChange={(e) => handleExpChange(exp.id, 'dates', e.target.value)}
                    className="p-2 border border-slate-300 rounded text-sm col-span-2"
                  />
                </div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">{t('profile.experience')}</label>
                    <AIGenerateButton 
                      isGenerating={isProcessingAI}
                      onGenerate={() => onAIAction('experience', exp.id)}
                      label={t('ai.improveAchievements')}
                    />
                  </div>
                  <textarea 
                    rows={4}
                    value={exp.description}
                    onChange={(e) => handleExpChange(exp.id, 'description', e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                <Briefcase size={20} />
              </div>
              <p>{t('common.add')} {t('profile.experience')}</p>
            </div>
          )}
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800 flex justify-between">
              <span>{t('profile.projects')}</span>
              <button 
                onClick={onAddProject}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </h3>
            
            {data.projects && data.projects.length > 0 ? (
              data.projects.map((project) => (
                <div key={project.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all relative">
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(t('common.confirmDelete'))) {
                        onDeleteProject(project.id);
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title={t('common.delete')}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-2 gap-3 mb-3 pr-8">
                    <input 
                      placeholder="Project Name"
                      value={project.name || ''}
                      onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                      className="p-2 border border-slate-300 rounded text-sm font-bold"
                    />
                    <input 
                      placeholder="GitHub / Demo link"
                      value={project.link || ''}
                      onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                      className="p-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  <textarea 
                    rows={3}
                    value={project.description || ''}
                    onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                    placeholder="Описание проекта, технологии..."
                    className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                  <Layout size={20} />
                </div>
                <p>{t('common.add')} {t('profile.projects')}</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'languages' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800 flex justify-between">
              <span>{t('profile.languages')}</span>
              <button 
                onClick={onAddLanguage}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </h3>
            
            {data.languages && data.languages.length > 0 ? (
              data.languages.map((lang) => (
                <div key={lang.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all relative">
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(t('common.confirmDelete'))) {
                        onDeleteLanguage(lang.id);
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title={t('common.delete')}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-2 gap-3 pr-8">
                    <input 
                      placeholder="English / Русский"
                      value={lang.language || ''}
                      onChange={(e) => handleLanguageChange(lang.id, 'language', e.target.value)}
                      className="p-2 border border-slate-300 rounded text-sm font-bold"
                    />
                    <select 
                      value={lang.level || 'intermediate'}
                      onChange={(e) => handleLanguageChange(lang.id, 'level', e.target.value)}
                      className="p-2 border border-slate-300 rounded text-sm"
                    >
                      <option value="native">Native</option>
                      <option value="fluent">Fluent</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="basic">Basic</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                  <Globe size={20} />
                </div>
                <p>{t('common.add')} {t('profile.languages')}</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800">{t('profile.skills')}</h3>
            
            {/* Input для добавления навыка */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('profile.skillPlaceholder')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    onChange({ ...data, skills: [...data.skills, e.target.value.trim()] });
                    e.target.value = '';
                  }
                }}
                className="flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  if (input.value.trim()) {
                    onChange({ ...data, skills: [...data.skills, input.value.trim()] });
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium flex items-center"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </div>

            {/* Список навыков */}
            {data.skills && data.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 flex items-center gap-2 hover:bg-slate-200 transition-colors group"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => {
                        onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
                      }}
                      className="text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 size={20} />
                </div>
                <p>{t('common.add')} {t('profile.skills')}</p>
              </div>
            )}

            {/* Подсказка */}
            <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-700 flex items-start space-x-2">
              <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">{t('ai.suggestions')}</p>
                <p>Добавьте как технические навыки (React, Python), так и soft skills (Коммуникация, Лидерство)</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-800 flex justify-between">
              <span>{t('profile.education')}</span>
              <button 
                onClick={() => {
                  const newEdu = {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    dates: ''
                  };
                  onChange({ ...data, education: [...data.education, newEdu] });
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </h3>
            
            {data.education && data.education.length > 0 ? (
              data.education.map((edu) => (
                <div key={edu.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all relative">
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(t('common.confirmDelete'))) {
                        onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) });
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title={t('common.delete')}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 gap-3 pr-8">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        {t('profile.institution')}
                      </label>
                      <input 
                        placeholder="Например: МГУ им. Ломоносова"
                        value={edu.institution || ''}
                        onChange={(e) => {
                          const updated = data.education.map(item => 
                            item.id === edu.id ? { ...item, institution: e.target.value } : item
                          );
                          onChange({ ...data, education: updated });
                        }}
                        className="w-full p-2 border border-slate-300 rounded text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        {t('profile.degree')}
                      </label>
                      <input 
                        placeholder="Например: Бакалавр, Компьютерные науки"
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const updated = data.education.map(item => 
                            item.id === edu.id ? { ...item, degree: e.target.value } : item
                          );
                          onChange({ ...data, education: updated });
                        }}
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        {t('profile.dates')}
                      </label>
                      <input 
                        placeholder="2018 - 2022"
                        value={edu.dates || ''}
                        onChange={(e) => {
                          const updated = data.education.map(item => 
                            item.id === edu.id ? { ...item, dates: e.target.value } : item
                          );
                          onChange({ ...data, education: updated });
                        }}
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                  <GraduationCap size={20} />
                </div>
                <p>{t('common.add')} {t('profile.education')}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

// 5. Settings View
const SettingsView = ({ aiTokensUsed, onResetData }) => {
  const { t, i18n } = useTranslation();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      onResetData();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('settings.accountSettings')}</h1>
        <p className="text-slate-500 mb-8">{t('settings.account')}</p>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-600" />
            {t('settings.profile')}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('settings.email')}</label>
              <input 
                type="email"
                disabled
                value="user@example.com"
                className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-slate-500"
              />
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {t('settings.changePassword')}
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Sparkles size={20} className="mr-2 text-purple-600" />
            {t('settings.subscription')}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">{t('settings.currentPlan')}</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{t('settings.freePlan')}</div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
              {t('settings.upgradeToPro')}
            </button>
          </div>
        </div>

        {/* AI Usage Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Wand2 size={20} className="mr-2 text-blue-600" />
            {t('settings.aiUsage')}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">{t('settings.requestsToday')}</span>
              <span className="text-2xl font-bold text-blue-600">{aiTokensUsed} / 3</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all" 
                style={{ width: `${Math.min((aiTokensUsed / 3) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500">
              {aiTokensUsed >= 3 ? '⚠️ Лимит исчерпан. Обновится завтра.' : `Осталось ${3 - aiTokensUsed} запросов`}
            </p>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Globe size={20} className="mr-2 text-green-600" />
            {t('settings.language')}
          </h2>
          <select 
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
            <Settings size={20} className="mr-2" />
            {t('settings.resetData')}
          </h2>
          <p className="text-sm text-slate-600 mb-4">{t('settings.resetDataWarning')}</p>
          <button 
            onClick={handleReset}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              showResetConfirm 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'border border-red-300 text-red-600 hover:bg-red-50'
            }`}
          >
            {showResetConfirm ? 'Подтвердить удаление' : t('settings.resetData')}
          </button>
          {showResetConfirm && (
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="ml-3 px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              {t('common.cancel')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. Job Tailoring View (Vacancy Analysis)
const JobTailoringView = ({ onBack, onSaveTailoredResume }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tailoredSummary, setTailoredSummary] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleAnalyze = () => {
    if (!jobText) return;
    setIsAnalyzing(true);
    // Simulate AI delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
      // Мок данных
      setTailoredSummary("Senior Developer with proven expertise in React ecosystem and performance optimization. Experience aligns perfectly with your requirements for high-load systems. Ready to bring my background in Cloud Architecture to the team.");
      setJobTitle("Senior React Developer");
      setCompany("TechCorp");
    }, 2000);
  };

  const handleSaveResume = () => {
    onSaveTailoredResume({
      jobDescription: jobText,
      jobTitle,
      company,
      tailoredSummary,
      status: 'draft'
    });
    alert(t('common.success'));
    onBack();
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ChevronRight className="rotate-180 mr-1" size={20} />
          {t('sidebar.masterProfile')}
        </button>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('jobs.newApplication')}</h1>
        <p className="text-slate-500 mb-8">{t('jobs.tailoredResume')}</p>

        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fadeIn">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              {t('jobs.pasteJobDescription')}
            </label>
            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder={t('jobs.pasteJobDescription')}
              className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm mb-4"
            ></textarea>
            
            <button 
              onClick={handleAnalyze}
              disabled={!jobText || isAnalyzing}
              className={`w-full py-3 rounded-lg flex items-center justify-center font-bold text-white transition-all ${
                isAnalyzing ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Wand2 className="animate-spin mr-2" /> {t('jobs.analyzing')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" /> {t('jobs.tailoredResume')}
                </>
              )}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle2 className="text-green-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-800">Анализ завершен!</h3>
                <p className="text-sm text-green-700">Мы нашли 5 ключевых навыков и адаптировали ваше Summary.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <Sparkles size={18} className="text-purple-600 mr-2" />
                {t('jobs.tailoredResume')}
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Должность</label>
                  <input 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Компания</label>
                  <input 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-slate-700 text-sm leading-relaxed border border-purple-100 mb-4">
                <strong className="block mb-2 text-slate-800">Адаптированное Summary:</strong>
                {tailoredSummary}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleSaveResume}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700"
                >
                  💾 Сохранить в Мои Отклики
                </button>
                <button className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-lg font-medium text-sm hover:bg-slate-50">
                  {t('jobs.coverLetter')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 7. AI Chat Component (Floating)
const AIChatWidget = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai.chatWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Симуляция AI ответа
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: i18n.language === 'ru' 
          ? `Отличный вопрос! Для описания опыта используйте формулу XYZ: "Достиг [X] по метрике [Y], делая [Z]". Например: "Ускорил загрузку приложения на 40% (с 3с до 1.8с), оптимизировав рендеринг React компонентов."`
          : `Great question! Use the XYZ formula for experience: "Achieved [X] as measured by [Y], by doing [Z]". Example: "Improved app load time by 40% (from 3s to 1.8s) by optimizing React component rendering."`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const examples = [
    t('ai.example1'),
    t('ai.example2'),
    t('ai.example3')
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} />
          <h3 className="font-bold">{t('ai.chat')}</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 p-3 rounded-lg text-sm">
              <span className="animate-pulse">{t('ai.thinking')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Example Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs font-semibold text-slate-500 mb-2">{t('ai.exampleQuestions')}:</p>
          <div className="space-y-1">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setInput(ex)}
                className="w-full text-left text-xs p-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-700 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('ai.chatPlaceholder')}
            className="flex-1 p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function ResumeBuilderApp() {
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState('master');
  
  // Автосохранение
  const { saveStatus, triggerSave } = useAutosave(() => {
    // Zustand автоматически сохраняет в localStorage
    // Этот callback просто для индикатора
  }, 1000);
  
  // Zustand Store вместо useState
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
    tailoredResumes,
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

  // AI Logic с реальным aiService
  const handleAIAction = async (type, id = null) => {
    setAIProcessing(true);
    
    try {
      const locale = i18n.language; // Берем текущий язык
      
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

  // Обработчики для добавления новых элементов
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

  // Обёртка для updateMasterProfile с автосохранением
  const handleProfileChange = (updates) => {
    updateMasterProfile(updates);
    triggerSave();
  };

  // Обработчик сброса данных
  const handleResetData = () => {
    if (confirm(i18n.language === 'ru' ? 'Вы уверены? Все данные будут удалены.' : 'Are you sure? All data will be deleted.')) {
      resetProfile();
      alert(i18n.language === 'ru' ? 'Данные успешно удалены!' : 'Data successfully deleted!');
    }
  };

  // Обработчик сохранения адаптированного резюме
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
          <JobTailoringView 
            onBack={() => setActiveTab('master')}
            onSaveTailoredResume={handleSaveTailoredResume}
          />
        ) : (
          /* Split View Editor */
          <>
            {/* Left Panel: Input */}
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
            <div className="flex-1 h-full bg-slate-100 relative">
              <div className="absolute top-4 right-6 z-20">
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
              <ResumePreview data={masterProfile} />
            </div>
          </>
        )}
      </main>

      {/* AI Chat Widget - Floating */}
      <AIChatWidget />
    </div>
  );
}