/**
 * JobTailoringView Component
 * Страница адаптации резюме под вакансию
 */

import React, { useState } from 'react';
import { ChevronRight, Wand2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../../services/ai/aiService';

const JobTailoringView = ({ onBack, onSaveTailoredResume, masterProfile }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tailoredSummary, setTailoredSummary] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobText) return;
    setIsAnalyzing(true);
    
    try {
      // Используем реальный AI сервис если доступен
      const result = await aiService.adaptResume(masterProfile, jobText, i18n.language);
      
      setTailoredSummary(result.summary || result.tailoredSummary);
      setJobTitle(result.jobTitle || "Position");
      setCompany(result.company || "Company");
      setAnalysisResult(result);
      setStep(2);
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback на мок данные
      setTailoredSummary(i18n.language === 'ru'
        ? "Опытный разработчик с экспертизой в React экосистеме и оптимизации производительности. Мой опыт идеально соответствует вашим требованиям по высоконагруженным системам."
        : "Senior Developer with proven expertise in React ecosystem and performance optimization. Experience aligns perfectly with your requirements for high-load systems."
      );
      setJobTitle("Senior React Developer");
      setCompany("TechCorp");
      setStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveResume = () => {
    onSaveTailoredResume({
      jobDescription: jobText,
      jobTitle,
      company,
      tailoredSummary,
      analysisResult,
      status: 'draft',
      createdAt: new Date().toISOString()
    });
    alert(t('common.success'));
    onBack();
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
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
                isAnalyzing 
                  ? 'bg-purple-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30'
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
                <h3 className="font-bold text-green-800">
                  {i18n.language === 'ru' ? 'Анализ завершен!' : 'Analysis complete!'}
                </h3>
                <p className="text-sm text-green-700">
                  {i18n.language === 'ru' 
                    ? 'Мы нашли ключевые навыки и адаптировали ваше Summary.' 
                    : 'We found key skills and adapted your Summary.'
                  }
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <Sparkles size={18} className="text-purple-600 mr-2" />
                {t('jobs.tailoredResume')}
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    {i18n.language === 'ru' ? 'Должность' : 'Position'}
                  </label>
                  <input 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    {i18n.language === 'ru' ? 'Компания' : 'Company'}
                  </label>
                  <input 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-slate-700 text-sm leading-relaxed border border-purple-100 mb-4">
                <strong className="block mb-2 text-slate-800">
                  {i18n.language === 'ru' ? 'Адаптированное Summary:' : 'Tailored Summary:'}
                </strong>
                <textarea
                  value={tailoredSummary}
                  onChange={(e) => setTailoredSummary(e.target.value)}
                  className="w-full bg-transparent border-none resize-none focus:outline-none"
                  rows={4}
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleSaveResume}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700"
                >
                  💾 {i18n.language === 'ru' ? 'Сохранить в Мои Отклики' : 'Save to Applications'}
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

export default JobTailoringView;

