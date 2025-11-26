import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';
import en from './locales/en.json';

// Получаем язык из localStorage или используем RU по умолчанию
const savedLanguage = localStorage.getItem('appLanguage') || 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en }
    },
    lng: savedLanguage, // Язык по умолчанию
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false // React уже защищает от XSS
    },
    react: {
      useSuspense: false
    }
  });

// Сохраняем выбранный язык при изменении
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('appLanguage', lng);
  document.documentElement.lang = lng;
});

export default i18n;

