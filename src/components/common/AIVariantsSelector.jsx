/**
 * AIVariantsSelector Component
 * Модальное окно для выбора из нескольких AI-сгенерированных вариантов
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../services/ai/aiService';

/**
 * Подсветка различий между оригиналом и вариантом
 */
const highlightDifferences = (original, variant) => {
  // Простая реализация: показываем весь вариант
  // В будущем можно добавить diff-алгоритм
  return variant;
};

/**
 * Компонент одного варианта
 */
const VariantCard = ({ 
  variant, 
  index, 
  original, 
  isSelected, 
  onSelect,
  isLoading 
}) => {
  const { t } = useTranslation();
  
  const styleLabels = {
    0: { ru: 'Технический фокус', en: 'Technical Focus' },
    1: { ru: 'Бизнес-импакт', en: 'Business Impact' },
    2: { ru: 'Командный фокус', en: 'Team Focus' }
  };

  const label = styleLabels[index] || styleLabels[0];

  return (
    <div 
      onClick={() => !isLoading && onSelect(index)}
      className={`
        relative p-4 rounded-lg border-2 cursor-pointer transition-all
        ${isSelected 
          ? 'border-purple-500 bg-purple-50 shadow-lg' 
          : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Style Label */}
      <div className="flex items-center justify-between mb-2">
        <span className={`
          text-xs font-semibold px-2 py-1 rounded-full
          ${index === 0 ? 'bg-blue-100 text-blue-700' : ''}
          ${index === 1 ? 'bg-green-100 text-green-700' : ''}
          ${index === 2 ? 'bg-orange-100 text-orange-700' : ''}
        `}>
          {label.ru}
        </span>
        
        {isSelected && (
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <Check size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Variant Text */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-slate-400">
          <Loader2 size={20} className="animate-spin mr-2" />
          <span className="text-sm">Генерирую...</span>
        </div>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed">
          {highlightDifferences(original, variant)}
        </p>
      )}
    </div>
  );
};

/**
 * Основной компонент AIVariantsSelector
 */
export const AIVariantsSelector = ({
  isOpen,
  onClose,
  originalText,
  onSelect,
  type = 'bullet', // 'bullet' | 'summary'
  locale = 'ru'
}) => {
  const { t, i18n } = useTranslation();
  const currentLocale = locale || i18n.language;
  
  const [variants, setVariants] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Генерация вариантов при открытии
  useEffect(() => {
    if (isOpen && originalText) {
      generateVariants();
    }
  }, [isOpen, originalText]);

  const generateVariants = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedIndex(null);
    setVariants([null, null, null]); // Placeholder для анимации
    
    try {
      const result = await aiService.improveBulletVariants(
        originalText, 
        currentLocale, 
        3
      );
      
      // Убеждаемся что получили массив из 3 элементов
      const normalizedVariants = Array.isArray(result) 
        ? result.slice(0, 3)
        : [result];
      
      while (normalizedVariants.length < 3) {
        normalizedVariants.push(normalizedVariants[0] || originalText);
      }
      
      setVariants(normalizedVariants);
    } catch (err) {
      console.error('Error generating variants:', err);
      setError(currentLocale === 'ru' 
        ? 'Ошибка генерации. Попробуйте ещё раз.' 
        : 'Generation error. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedIndex !== null && variants[selectedIndex]) {
      onSelect(variants[selectedIndex]);
      onClose();
    }
  };

  const handleRegenerate = () => {
    generateVariants();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center text-white">
            <Sparkles size={20} className="mr-2" />
            <h2 className="text-lg font-bold">
              {currentLocale === 'ru' ? 'Выберите вариант' : 'Choose a variant'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Original Text */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
            {currentLocale === 'ru' ? 'Оригинал' : 'Original'}
          </div>
          <p className="text-sm text-slate-600 italic">
            "{originalText}"
          </p>
        </div>

        {/* Variants Grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">{error}</div>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {currentLocale === 'ru' ? 'Попробовать снова' : 'Try again'}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {variants.map((variant, index) => (
                <VariantCard
                  key={index}
                  variant={variant}
                  index={index}
                  original={originalText}
                  isSelected={selectedIndex === index}
                  onSelect={setSelectedIndex}
                  isLoading={isLoading || variant === null}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <button
            onClick={handleRegenerate}
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {currentLocale === 'ru' ? 'Другие варианты' : 'More options'}
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              {currentLocale === 'ru' ? 'Отмена' : 'Cancel'}
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedIndex === null || isLoading}
              className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Check size={16} className="mr-2" />
              {currentLocale === 'ru' ? 'Применить' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVariantsSelector;

