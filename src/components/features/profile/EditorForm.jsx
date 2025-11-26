/**
 * EditorForm Component
 * Форма редактирования мастер-профиля с секциями
 */

import React, { useState } from 'react';
import { 
  Layout, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  User, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Globe,
  Sparkles,
  X,
  Wand2,
  Loader2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AIVariantsSelector } from '../../common/AIVariantsSelector';
import AIGenerateButton from '../../common/AIGenerateButton';
import aiService from '../../../services/ai/aiService';

const EditorForm = ({ 
  data, 
  onChange, 
  onAIAction, 
  isProcessingAI, 
  onAddExperience, 
  onAddProject, 
  onAddLanguage, 
  onDeleteExperience, 
  onDeleteProject, 
  onDeleteLanguage 
}) => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('personal');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  // State для модалки выбора вариантов
  const [variantsModal, setVariantsModal] = useState({
    isOpen: false,
    experienceId: null,
    originalText: ''
  });

  // State для AI-предложенных навыков
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [skillsError, setSkillsError] = useState(null);

  // Запрос AI-предложений навыков
  const handleSuggestSkills = async () => {
    setIsLoadingSkills(true);
    setSkillsError(null);
    
    try {
      const suggestions = await aiService.suggestSkills(
        data.experience || [],
        data.skills || [],
        i18n.language
      );
      
      // Фильтруем навыки, которые уже есть у пользователя
      const filtered = (Array.isArray(suggestions) ? suggestions : [])
        .filter(s => !data.skills?.includes(s.skill));
      
      setSuggestedSkills(filtered);
    } catch (error) {
      console.error('Skill suggestion error:', error);
      setSkillsError(i18n.language === 'ru' 
        ? 'Не удалось получить предложения. Попробуйте ещё раз.'
        : 'Failed to get suggestions. Please try again.'
      );
    } finally {
      setIsLoadingSkills(false);
    }
  };

  // Добавить предложенный навык
  const handleAddSuggestedSkill = (skill) => {
    if (!data.skills?.includes(skill)) {
      onChange({ ...data, skills: [...(data.skills || []), skill] });
      setSuggestedSkills(prev => prev.filter(s => s.skill !== skill));
    }
  };

  // Отклонить предложенный навык
  const handleDismissSuggestedSkill = (skill) => {
    setSuggestedSkills(prev => prev.filter(s => s.skill !== skill));
  };

  // Открыть модалку выбора вариантов
  const openVariantsModal = (expId, text) => {
    setVariantsModal({
      isOpen: true,
      experienceId: expId,
      originalText: text
    });
  };

  // Применить выбранный вариант
  const handleVariantSelect = (selectedText) => {
    if (variantsModal.experienceId) {
      const newExp = data.experience.map(exp => 
        exp.id === variantsModal.experienceId 
          ? { ...exp, description: selectedText } 
          : exp
      );
      onChange({ ...data, experience: newExp });
    }
  };

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
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phone) {
      setPhoneError('');
      return true;
    }
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
        
        {/* Personal Info Section */}
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

        {/* Summary Section */}
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

        {/* Experience Section */}
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
              data.experience.map((exp) => (
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
                      <div className="flex items-center space-x-2">
                        {/* Кнопка "3 варианта" */}
                        <button
                          onClick={() => openVariantsModal(exp.id, exp.description)}
                          disabled={isProcessingAI || !exp.description}
                          className="flex items-center space-x-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Sparkles size={12} />
                          <span>3 {i18n.language === 'ru' ? 'варианта' : 'variants'}</span>
                        </button>
                        {/* Кнопка "Улучшить" */}
                        <AIGenerateButton 
                          isGenerating={isProcessingAI}
                          onGenerate={() => onAIAction('experience', exp.id)}
                          label={t('ai.improveAchievements')}
                        />
                      </div>
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

        {/* Projects Section */}
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
                    placeholder={i18n.language === 'ru' ? "Описание проекта, технологии..." : "Project description, technologies..."}
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

        {/* Languages Section */}
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

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{t('profile.skills')}</h3>
              {/* AI Suggest Button */}
              <button
                onClick={handleSuggestSkills}
                disabled={isLoadingSkills || isProcessingAI}
                className="flex items-center space-x-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingSkills ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Wand2 size={14} />
                )}
                <span>{i18n.language === 'ru' ? 'AI предложения' : 'AI Suggest'}</span>
              </button>
            </div>
            
            {/* Input для добавления навыка */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('profile.skillPlaceholder')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    onChange({ ...data, skills: [...(data.skills || []), e.target.value.trim()] });
                    e.target.value = '';
                  }
                }}
                className="flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  if (input.value.trim()) {
                    onChange({ ...data, skills: [...(data.skills || []), input.value.trim()] });
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium flex items-center"
              >
                <Plus size={16} className="mr-1" /> {t('common.add')}
              </button>
            </div>

            {/* AI Suggested Skills */}
            {suggestedSkills.length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles size={16} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">
                      {i18n.language === 'ru' ? 'Рекомендуемые навыки' : 'Recommended Skills'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSuggestedSkills([])}
                    className="text-purple-400 hover:text-purple-600 text-xs"
                  >
                    {i18n.language === 'ru' ? 'Скрыть' : 'Hide'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-white border border-purple-200 rounded-lg px-3 py-2 flex items-center gap-2 group hover:border-purple-400 transition-colors"
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-700">{suggestion.skill}</span>
                        {suggestion.reason && (
                          <p className="text-[10px] text-slate-500 mt-0.5">{suggestion.reason}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAddSuggestedSkill(suggestion.skill)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1 rounded transition-colors"
                          title={i18n.language === 'ru' ? 'Добавить' : 'Add'}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => handleDismissSuggestedSkill(suggestion.skill)}
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                          title={i18n.language === 'ru' ? 'Отклонить' : 'Dismiss'}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Error */}
            {skillsError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center justify-between">
                <span>{skillsError}</span>
                <button 
                  onClick={() => setSkillsError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}

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
            {!suggestedSkills.length && (
              <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-700 flex items-start space-x-2">
                <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">{t('ai.suggestions')}</p>
                  <p>{i18n.language === 'ru' 
                    ? 'Нажмите "AI предложения" для автоматических рекомендаций на основе вашего опыта'
                    : 'Click "AI Suggest" for automatic recommendations based on your experience'
                  }</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education Section */}
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
                        placeholder={i18n.language === 'ru' ? "Например: МГУ им. Ломоносова" : "e.g., MIT, Stanford"}
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
                        placeholder={i18n.language === 'ru' ? "Например: Бакалавр, Компьютерные науки" : "e.g., BSc Computer Science"}
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
      
      {/* Модалка выбора вариантов AI */}
      <AIVariantsSelector
        isOpen={variantsModal.isOpen}
        onClose={() => setVariantsModal({ isOpen: false, experienceId: null, originalText: '' })}
        originalText={variantsModal.originalText}
        onSelect={handleVariantSelect}
        type="bullet"
        locale={i18n.language}
      />
    </div>
  );
};

export default EditorForm;

