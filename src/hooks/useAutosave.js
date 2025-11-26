import { useState, useEffect, useRef } from 'react';

/**
 * Hook для автосохранения с debounce и индикатором статуса
 * @param {Function} saveFunction - функция сохранения
 * @param {number} delay - задержка в мс (по умолчанию 1000)
 * @returns {Object} - { saveStatus, triggerSave }
 */
export const useAutosave = (saveFunction, delay = 1000) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);

  const triggerSave = () => {
    // Пропускаем первый рендер
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSaveStatus('unsaved');

    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      setSaveStatus('saving');
      
      // Выполняем сохранение
      if (typeof saveFunction === 'function') {
        saveFunction();
      }

      // Через 500ms показываем "сохранено"
      setTimeout(() => {
        setSaveStatus('saved');
      }, 500);
    }, delay);
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { saveStatus, triggerSave };
};

