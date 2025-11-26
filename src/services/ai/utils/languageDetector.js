/**
 * Language Detector
 * Определение языка текста для роутинга на оптимальный AI провайдер
 */

/**
 * Русские символы (кириллица)
 */
const CYRILLIC_REGEX = /[\u0400-\u04FF]/;

/**
 * Частые русские слова
 */
const COMMON_RUSSIAN_WORDS = [
  'и', 'в', 'на', 'с', 'по', 'для', 'из', 'к', 'от', 'до',
  'что', 'как', 'это', 'он', 'она', 'они', 'мы', 'вы', 'я',
  'быть', 'год', 'работа', 'опыт', 'компания', 'разработка',
  'проект', 'команда', 'система', 'данные', 'результат'
];

/**
 * Частые английские слова
 */
const COMMON_ENGLISH_WORDS = [
  'the', 'and', 'to', 'of', 'a', 'in', 'is', 'it', 'you', 'that',
  'was', 'for', 'on', 'are', 'with', 'as', 'at', 'be', 'this',
  'have', 'from', 'or', 'by', 'one', 'had', 'not', 'but', 'what',
  'experience', 'work', 'team', 'project', 'developed', 'led'
];

/**
 * Определить язык текста
 * @param {string} text - Текст для анализа
 * @returns {'ru' | 'en' | 'mixed'} - Определённый язык
 */
export function detectLanguage(text) {
  if (!text || typeof text !== 'string') {
    return 'en'; // Default to English
  }

  const cleanText = text.toLowerCase().trim();
  
  // Подсчёт кириллических символов
  const cyrillicMatches = cleanText.match(/[\u0400-\u04FF]/g) || [];
  const latinMatches = cleanText.match(/[a-zA-Z]/g) || [];
  
  const cyrillicCount = cyrillicMatches.length;
  const latinCount = latinMatches.length;
  const totalLetters = cyrillicCount + latinCount;

  if (totalLetters === 0) {
    return 'en'; // Default if no letters
  }

  const cyrillicRatio = cyrillicCount / totalLetters;
  
  // Если более 70% кириллицы - русский
  if (cyrillicRatio > 0.7) {
    return 'ru';
  }
  
  // Если менее 10% кириллицы - английский
  if (cyrillicRatio < 0.1) {
    return 'en';
  }
  
  // Смешанный текст - определяем по словам
  const words = cleanText.split(/\s+/);
  
  let russianWordCount = 0;
  let englishWordCount = 0;
  
  for (const word of words) {
    if (COMMON_RUSSIAN_WORDS.includes(word)) {
      russianWordCount++;
    }
    if (COMMON_ENGLISH_WORDS.includes(word)) {
      englishWordCount++;
    }
  }
  
  if (russianWordCount > englishWordCount) {
    return 'ru';
  }
  
  if (englishWordCount > russianWordCount) {
    return 'en';
  }
  
  // Если равно или не определили - смотрим на общее соотношение
  return cyrillicRatio > 0.4 ? 'ru' : 'en';
}

/**
 * Проверить, содержит ли текст кириллицу
 */
export function containsCyrillic(text) {
  return CYRILLIC_REGEX.test(text);
}

/**
 * Получить основной язык из массива текстов
 */
export function detectPrimaryLanguage(texts) {
  if (!Array.isArray(texts)) {
    texts = [texts];
  }
  
  const languages = texts
    .filter(Boolean)
    .map(detectLanguage);
  
  const ruCount = languages.filter(l => l === 'ru').length;
  const enCount = languages.filter(l => l === 'en').length;
  
  return ruCount >= enCount ? 'ru' : 'en';
}

/**
 * Определить нужен ли YandexGPT для текста
 * YandexGPT лучше справляется с русским языком
 */
export function shouldUseYandexGPT(text, locale) {
  // Если локаль явно русская и текст на русском
  if (locale === 'ru') {
    const detectedLang = detectLanguage(text);
    return detectedLang === 'ru';
  }
  
  return false;
}

export default {
  detectLanguage,
  containsCyrillic,
  detectPrimaryLanguage,
  shouldUseYandexGPT
};

