/**
 * AIGenerateButton Component
 * Кнопка для запуска AI улучшений
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

export default AIGenerateButton;

