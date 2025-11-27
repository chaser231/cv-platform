/**
 * ResumeScoreCard Component
 * Карточка с анализом резюме (Health Check)
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Wand2,
  Loader2,
  RefreshCw,
  X,
  Target,
  FileText,
  Briefcase,
  Code
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../services/ai/aiService';

// Цвета для скоров
const getScoreColor = (score) => {
  if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' };
  if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' };
  if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' };
  return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' };
};

// Иконки для типов улучшений
const IMPROVEMENT_ICONS = {
  summary: FileText,
  experience: Briefcase,
  skills: Code,
  education: Target,
  projects: Target
};

// Circular Progress Ring
const ScoreRing = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={color.text}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold ${color.text}`}>{score}</span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
    </div>
  );
};

// Mini Score Bar
const ScoreBar = ({ label, score }) => {
  const color = getScoreColor(score);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className={`font-semibold ${color.text}`}>{score}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color.bg} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const ResumeScoreCard = ({ profile, onAutoFix, isCompact = false }) => {
  const { t, i18n } = useTranslation();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(!isCompact);
  const [fixingId, setFixingId] = useState(null);

  // Анализ резюме
  const runAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await aiService.analyzeResume(profile, i18n.language);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(i18n.language === 'ru' 
        ? 'Не удалось проанализировать резюме' 
        : 'Failed to analyze resume'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fix improvement
  const handleAutoFix = async (improvement) => {
    if (!improvement.canAutoFix || !onAutoFix) return;
    
    setFixingId(improvement.id);
    try {
      await onAutoFix(improvement);
      // Перезапускаем анализ после исправления
      await runAnalysis();
    } catch (err) {
      console.error('Auto-fix error:', err);
    } finally {
      setFixingId(null);
    }
  };

  // Приоритет цвета
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // Если нет анализа и не загружается - показываем кнопку запуска
  if (!analysis && !isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity size={28} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">
            {i18n.language === 'ru' ? 'Проверка резюме' : 'Resume Health Check'}
          </h3>
          <p className="text-sm text-slate-500 mb-4 max-w-xs mx-auto">
            {i18n.language === 'ru' 
              ? 'AI проанализирует ваше резюме и даст рекомендации по улучшению'
              : 'AI will analyze your resume and provide improvement recommendations'
            }
          </p>
          <button
            onClick={runAnalysis}
            className="inline-flex items-center px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Sparkles size={18} className="mr-2" />
            {i18n.language === 'ru' ? 'Запустить анализ' : 'Run Analysis'}
          </button>
        </div>
      </div>
    );
  }

  // Загрузка
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 size={40} className="text-purple-600 animate-spin mb-4" />
          <p className="text-slate-600 font-medium">
            {i18n.language === 'ru' ? 'Анализирую резюме...' : 'Analyzing resume...'}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {i18n.language === 'ru' ? 'Это займёт несколько секунд' : 'This will take a few seconds'}
          </p>
        </div>
      </div>
    );
  }

  // Ошибка
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-red-500 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={runAnalysis}
              className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center"
            >
              <RefreshCw size={14} className="mr-1" />
              {i18n.language === 'ru' ? 'Попробовать снова' : 'Try again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Результат анализа
  const scoreColor = getScoreColor(analysis.overallScore);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header - всегда видимый */}
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${isCompact ? '' : 'border-b border-slate-100'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full ${scoreColor.light} flex items-center justify-center`}>
            <span className={`text-lg font-bold ${scoreColor.text}`}>{analysis.overallScore}</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              {i18n.language === 'ru' ? 'Оценка резюме' : 'Resume Score'}
            </h3>
            <p className="text-sm text-slate-500">
              {analysis.improvements?.length || 0} {i18n.language === 'ru' ? 'рекомендаций' : 'recommendations'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); runAnalysis(); }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title={i18n.language === 'ru' ? 'Обновить' : 'Refresh'}
          >
            <RefreshCw size={16} className="text-slate-400" />
          </button>
          {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Main Score + Breakdown */}
          <div className="flex items-start space-x-8">
            <ScoreRing score={analysis.overallScore} />
            
            <div className="flex-1 space-y-3">
              {Object.entries(analysis.scores || {}).map(([key, value]) => (
                <ScoreBar key={key} label={value.label} score={value.score} />
              ))}
            </div>
          </div>

          {/* Strengths */}
          {analysis.strengths?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <CheckCircle2 size={16} className="text-green-500 mr-2" />
                {i18n.language === 'ru' ? 'Сильные стороны' : 'Strengths'}
              </h4>
              <ul className="space-y-1">
                {analysis.strengths.map((strength, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                {i18n.language === 'ru' ? 'Рекомендации' : 'Recommendations'}
              </h4>
              <div className="space-y-2">
                {analysis.improvements.map((improvement) => {
                  const Icon = IMPROVEMENT_ICONS[improvement.type] || Target;
                  const isFixing = fixingId === improvement.id;
                  
                  return (
                    <div 
                      key={improvement.id}
                      className={`p-3 rounded-lg border ${getPriorityColor(improvement.priority)} flex items-start justify-between`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon size={18} className="mt-0.5 opacity-60" />
                        <div>
                          <p className="font-medium text-sm">{improvement.title}</p>
                          <p className="text-xs opacity-80 mt-0.5">{improvement.description}</p>
                        </div>
                      </div>
                      {improvement.canAutoFix && onAutoFix && (
                        <button
                          onClick={() => handleAutoFix(improvement)}
                          disabled={isFixing}
                          className="ml-3 px-3 py-1 bg-white rounded text-xs font-medium hover:bg-slate-50 transition-colors flex items-center disabled:opacity-50"
                        >
                          {isFixing ? (
                            <Loader2 size={12} className="animate-spin mr-1" />
                          ) : (
                            <Wand2 size={12} className="mr-1" />
                          )}
                          {i18n.language === 'ru' ? 'Исправить' : 'Fix'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Keywords */}
          {(analysis.atsKeywords?.length > 0 || analysis.missingKeywords?.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {analysis.atsKeywords?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    {i18n.language === 'ru' ? 'Найденные ключевые слова' : 'Found Keywords'}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.atsKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {analysis.missingKeywords?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    {i18n.language === 'ru' ? 'Рекомендуемые' : 'Suggested'}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-dashed border-slate-300">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeScoreCard;

