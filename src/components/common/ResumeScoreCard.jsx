/**
 * ResumeScoreCard Component
 * Карточка с анализом резюме (Health Check)
 * Компактная кнопка по умолчанию, раскрывается при клике
 */

import React, { useState } from 'react';
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
  Code,
  Copy
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../services/ai/aiService';

// Цвета для скоров
const getScoreColor = (score) => {
  if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' };
  if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200' };
  if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' };
  return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' };
};

// Иконки для типов улучшений
const IMPROVEMENT_ICONS = {
  summary: FileText,
  experience: Briefcase,
  skills: Code,
  education: Target,
  projects: Target,
  duplicates: Copy
};

// Circular Progress Ring
const ScoreRing = ({ score, size = 100, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
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
        <span className={`text-2xl font-bold ${color.text}`}>{score}</span>
        <span className="text-[10px] text-slate-400">/ 100</span>
      </div>
    </div>
  );
};

// Mini Score Bar
const ScoreBar = ({ label, score }) => {
  const color = getScoreColor(score);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-600">{label}</span>
        <span className={`font-semibold ${color.text}`}>{score}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color.bg} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const ResumeScoreCard = ({ 
  profile, 
  onAutoFix, 
  onAddSkill,
  onRemoveDuplicates
}) => {
  const { i18n } = useTranslation();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fixingId, setFixingId] = useState(null);
  const [addedSkills, setAddedSkills] = useState(new Set());

  // Анализ резюме
  const runAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await aiService.analyzeResume(profile, i18n.language);
      setAnalysis(result);
      setIsExpanded(true); // Раскрываем после анализа
    } catch (err) {
      console.error('Analysis error:', err);
      setError(i18n.language === 'ru' 
        ? 'Ошибка анализа' 
        : 'Analysis failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fix improvement
  const handleAutoFix = async (improvement) => {
    if (!improvement.canAutoFix) return;
    
    setFixingId(improvement.id);
    try {
      if (improvement.type === 'duplicates' && onRemoveDuplicates && improvement.duplicateIds) {
        await onRemoveDuplicates(improvement.duplicateIds, improvement.removeAll);
      } else if (onAutoFix) {
        await onAutoFix(improvement);
      }
      await runAnalysis();
    } catch (err) {
      console.error('Auto-fix error:', err);
    } finally {
      setFixingId(null);
    }
  };

  // Добавить навык
  const handleAddSkill = (skill) => {
    if (onAddSkill && !addedSkills.has(skill)) {
      onAddSkill(skill);
      setAddedSkills(prev => new Set([...prev, skill]));
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

  const scoreColor = analysis ? getScoreColor(analysis.overallScore) : null;
  const recommendationsCount = analysis?.improvements?.length || 0;

  // ============ КОМПАКТНАЯ КНОПКА ============
  if (!isExpanded) {
    return (
      <button
        onClick={analysis ? () => setIsExpanded(true) : runAnalysis}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-all
          ${isLoading 
            ? 'bg-purple-100 cursor-wait' 
            : analysis 
              ? `bg-white border ${scoreColor?.border || 'border-slate-200'} hover:shadow-xl`
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }
        `}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              {i18n.language === 'ru' ? 'Анализ...' : 'Analyzing...'}
            </span>
          </>
        ) : analysis ? (
          <>
            <div className={`w-8 h-8 rounded-full ${scoreColor?.light} flex items-center justify-center`}>
              <span className={`text-sm font-bold ${scoreColor?.text}`}>{analysis.overallScore}</span>
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-700">
                {i18n.language === 'ru' ? 'Оценка' : 'Score'}
              </div>
              {recommendationsCount > 0 && (
                <div className="text-[10px] text-slate-500">
                  {recommendationsCount} {i18n.language === 'ru' ? 'рек.' : 'rec.'}
                </div>
              )}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              {i18n.language === 'ru' ? 'Анализ' : 'Analyze'}
            </span>
          </>
        )}
      </button>
    );
  }

  // ============ РАЗВЁРНУТАЯ КАРТОЧКА ============
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-80 max-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          {analysis && (
            <div className={`w-8 h-8 rounded-full ${scoreColor?.light} flex items-center justify-center`}>
              <span className={`text-sm font-bold ${scoreColor?.text}`}>{analysis.overallScore}</span>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              {i18n.language === 'ru' ? 'Оценка резюме' : 'Resume Score'}
            </h3>
            {recommendationsCount > 0 && (
              <p className="text-[10px] text-slate-500">
                {recommendationsCount} {i18n.language === 'ru' ? 'рекомендаций' : 'recommendations'}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={runAnalysis}
            disabled={isLoading}
            className="p-1.5 hover:bg-slate-200 rounded transition-colors"
            title={i18n.language === 'ru' ? 'Обновить' : 'Refresh'}
          >
            <RefreshCw size={14} className={`text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 hover:bg-slate-200 rounded transition-colors"
          >
            <X size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-3 bg-red-50 border-b border-red-100 flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" />
          <span className="text-xs text-red-700">{error}</span>
        </div>
      )}

      {/* Content */}
      {analysis && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Score Ring + Bars */}
          <div className="flex items-center gap-4">
            <ScoreRing score={analysis.overallScore} size={80} strokeWidth={6} />
            <div className="flex-1 space-y-2">
              {Object.entries(analysis.scores || {}).map(([key, value]) => (
                <ScoreBar key={key} label={value.label} score={value.score} />
              ))}
            </div>
          </div>

          {/* Strengths */}
          {analysis.strengths?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center">
                <CheckCircle2 size={12} className="text-green-500 mr-1" />
                {i18n.language === 'ru' ? 'Сильные стороны' : 'Strengths'}
              </h4>
              <ul className="space-y-0.5">
                {analysis.strengths.slice(0, 3).map((strength, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start">
                    <span className="text-green-500 mr-1">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center">
                <AlertTriangle size={12} className="text-yellow-500 mr-1" />
                {i18n.language === 'ru' ? 'Рекомендации' : 'Recommendations'}
              </h4>
              <div className="space-y-1.5">
                {analysis.improvements.map((improvement) => {
                  const Icon = IMPROVEMENT_ICONS[improvement.type] || Target;
                  const isFixing = fixingId === improvement.id;
                  
                  return (
                    <div 
                      key={improvement.id}
                      className={`p-2 rounded border ${getPriorityColor(improvement.priority)} flex items-start justify-between`}
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <Icon size={14} className="mt-0.5 opacity-60 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-xs truncate">{improvement.title}</p>
                          <p className="text-[10px] opacity-70 line-clamp-2">{improvement.description}</p>
                        </div>
                      </div>
                      {improvement.canAutoFix && onAutoFix && (
                        <button
                          onClick={() => handleAutoFix(improvement)}
                          disabled={isFixing}
                          className="ml-2 px-2 py-0.5 bg-white rounded text-[10px] font-medium hover:bg-slate-50 transition-colors flex items-center flex-shrink-0 disabled:opacity-50"
                        >
                          {isFixing ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : (
                            <Wand2 size={10} />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Keywords */}
          {analysis.missingKeywords?.length > 0 && (
            <div>
              <h4 className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">
                {i18n.language === 'ru' ? 'Рекомендуемые навыки' : 'Suggested Skills'}
              </h4>
              <div className="flex flex-wrap gap-1">
                {analysis.missingKeywords.slice(0, 6).map((kw, i) => {
                  const isAdded = addedSkills.has(kw);
                  const canAdd = onAddSkill && !isAdded && !profile.skills?.includes(kw);
                  
                  return (
                    <button
                      key={i}
                      onClick={() => canAdd && handleAddSkill(kw)}
                      disabled={!canAdd}
                      className={`px-1.5 py-0.5 text-[10px] rounded border transition-all ${
                        isAdded 
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : canAdd
                            ? 'bg-slate-100 text-slate-600 border-dashed border-slate-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer'
                            : 'bg-slate-50 text-slate-400 border-slate-200 cursor-default'
                      }`}
                    >
                      {isAdded ? '✓' : '+'} {kw}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeScoreCard;
