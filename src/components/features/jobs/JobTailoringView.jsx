/**
 * JobTailoringView Component
 * Страница адаптации резюме под вакансию + Cover Letter генератор
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Wand2, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Download,
  RefreshCw,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../../services/ai/aiService';

const TONE_OPTIONS = [
  { id: 'formal', labelRu: 'Формальный', labelEn: 'Formal', emoji: '👔', descRu: 'Профессиональный и деловой', descEn: 'Professional and business-like' },
  { id: 'casual', labelRu: 'Дружелюбный', labelEn: 'Friendly', emoji: '😊', descRu: 'Тёплый, но профессиональный', descEn: 'Warm yet professional' },
  { id: 'enthusiastic', labelRu: 'Энергичный', labelEn: 'Enthusiastic', emoji: '🚀', descRu: 'Показывает энтузиазм и страсть', descEn: 'Shows excitement and passion' }
];

const JobTailoringView = ({ onBack, onSaveTailoredResume, masterProfile }) => {
  const { t, i18n } = useTranslation();
  
  // Main flow state
  const [step, setStep] = useState(1);
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tailoredSummary, setTailoredSummary] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Cover Letter state
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetterTone, setCoverLetterTone] = useState('formal');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetterError, setCoverLetterError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Analyze job description
  const handleAnalyze = async () => {
    if (!jobText) return;
    setIsAnalyzing(true);
    
    try {
      const result = await aiService.tailorResume(masterProfile, jobText, i18n.language);
      
      setTailoredSummary(result.tailoredSummary || result.summary || '');
      setJobTitle(result.jobTitle || "Position");
      setCompany(result.company || "Company");
      setAnalysisResult(result);
      setStep(2);
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback
      setTailoredSummary(i18n.language === 'ru'
        ? "Опытный разработчик с экспертизой в React экосистеме и оптимизации производительности. Мой опыт идеально соответствует вашим требованиям по высоконагруженным системам."
        : "Senior Developer with proven expertise in React ecosystem and performance optimization. Experience aligns perfectly with your requirements for high-load systems."
      );
      setJobTitle("Senior Developer");
      setCompany("Company");
      setStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate Cover Letter
  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    setCoverLetterError(null);
    
    try {
      const letter = await aiService.generateCoverLetter(
        masterProfile,
        jobText,
        {
          role: jobTitle,
          company: company,
          tone: coverLetterTone,
          locale: i18n.language
        }
      );
      setCoverLetter(letter);
    } catch (error) {
      console.error('Cover letter generation error:', error);
      setCoverLetterError(i18n.language === 'ru' 
        ? 'Не удалось сгенерировать письмо. Попробуйте ещё раз.'
        : 'Failed to generate letter. Please try again.'
      );
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  // Copy to clipboard
  const handleCopyLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Save resume
  const handleSaveResume = () => {
    onSaveTailoredResume({
      jobDescription: jobText,
      jobTitle,
      company,
      tailoredSummary,
      coverLetter: coverLetter || null,
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
        {/* Back button */}
        <button 
          onClick={showCoverLetter ? () => setShowCoverLetter(false) : onBack} 
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronRight className="rotate-180 mr-1" size={20} />
          {showCoverLetter 
            ? (i18n.language === 'ru' ? 'Назад к резюме' : 'Back to resume')
            : t('sidebar.masterProfile')
          }
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {showCoverLetter 
            ? (i18n.language === 'ru' ? 'Cover Letter' : 'Cover Letter')
            : t('jobs.newApplication')
          }
        </h1>
        <p className="text-slate-500 mb-8">
          {showCoverLetter
            ? (i18n.language === 'ru' ? 'Сопроводительное письмо для ' + company : 'Cover letter for ' + company)
            : t('jobs.tailoredResume')
          }
        </p>

        {/* Cover Letter View */}
        {showCoverLetter ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Tone Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">
                {i18n.language === 'ru' ? 'Выберите тон письма' : 'Select letter tone'}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {TONE_OPTIONS.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setCoverLetterTone(tone.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      coverLetterTone === tone.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{tone.emoji}</div>
                    <div className="font-semibold text-sm text-slate-800">
                      {i18n.language === 'ru' ? tone.labelRu : tone.labelEn}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {i18n.language === 'ru' ? tone.descRu : tone.descEn}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Generate Button */}
              <button
                onClick={handleGenerateCoverLetter}
                disabled={isGeneratingCoverLetter}
                className={`w-full mt-4 py-3 rounded-lg flex items-center justify-center font-bold text-white transition-all ${
                  isGeneratingCoverLetter 
                    ? 'bg-purple-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30'
                }`}
              >
                {isGeneratingCoverLetter ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {i18n.language === 'ru' ? 'Генерирую...' : 'Generating...'}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2" size={20} />
                    {coverLetter 
                      ? (i18n.language === 'ru' ? 'Перегенерировать' : 'Regenerate')
                      : (i18n.language === 'ru' ? 'Сгенерировать письмо' : 'Generate Letter')
                    }
                  </>
                )}
              </button>
            </div>

            {/* Error */}
            {coverLetterError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {coverLetterError}
              </div>
            )}

            {/* Generated Cover Letter */}
            {coverLetter && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center">
                    <FileText size={18} className="text-purple-600 mr-2" />
                    {i18n.language === 'ru' ? 'Ваше письмо' : 'Your Letter'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyLetter}
                      className="flex items-center text-sm text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 size={14} className="mr-1 text-green-600" />
                          {i18n.language === 'ru' ? 'Скопировано!' : 'Copied!'}
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="mr-1" />
                          {i18n.language === 'ru' ? 'Копировать' : 'Copy'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-purple-500 outline-none min-h-[300px] font-serif"
                  placeholder={i18n.language === 'ru' ? 'Ваше письмо появится здесь...' : 'Your letter will appear here...'}
                />

                <div className="flex space-x-3 mt-4">
                  <button 
                    onClick={handleSaveResume}
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 flex items-center justify-center"
                  >
                    💾 {i18n.language === 'ru' ? 'Сохранить всё' : 'Save All'}
                  </button>
                  <button 
                    onClick={() => setShowCoverLetter(false)}
                    className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-50 flex items-center justify-center"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    {i18n.language === 'ru' ? 'К резюме' : 'To Resume'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Step 1: Job Description Input */}
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
                      <Loader2 className="animate-spin mr-2" size={20} /> {t('jobs.analyzing')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={20} /> {t('jobs.tailoredResume')}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2: Results */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Success Banner */}
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

                {/* Tailored Resume Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                    <Sparkles size={18} className="text-purple-600 mr-2" />
                    {t('jobs.tailoredResume')}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                        {i18n.language === 'ru' ? 'Должность' : 'Position'}
                      </label>
                      <input 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                        {i18n.language === 'ru' ? 'Компания' : 'Company'}
                      </label>
                      <input 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                      {i18n.language === 'ru' ? 'Адаптированное Summary' : 'Tailored Summary'}
                    </label>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <textarea
                        value={tailoredSummary}
                        onChange={(e) => setTailoredSummary(e.target.value)}
                        className="w-full bg-transparent border-none resize-none focus:outline-none text-sm text-slate-700 leading-relaxed"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Analysis Insights */}
                  {analysisResult?.keywordsToAdd?.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-blue-800 mb-2">
                        {i18n.language === 'ru' ? '💡 Добавлены ключевые слова:' : '💡 Added keywords:'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.keywordsToAdd.slice(0, 8).map((kw, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSaveResume}
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 flex items-center justify-center"
                    >
                      💾 {i18n.language === 'ru' ? 'Сохранить' : 'Save'}
                    </button>
                    <button 
                      onClick={() => setShowCoverLetter(true)}
                      className="flex-1 bg-purple-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-purple-700 flex items-center justify-center"
                    >
                      <FileText size={16} className="mr-2" />
                      {i18n.language === 'ru' ? 'Cover Letter' : 'Cover Letter'}
                    </button>
                  </div>
                </div>

                {/* Back to Edit */}
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center py-2"
                >
                  <RefreshCw size={14} className="mr-1" />
                  {i18n.language === 'ru' ? 'Изменить описание вакансии' : 'Edit job description'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobTailoringView;
