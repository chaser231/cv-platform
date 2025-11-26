/**
 * Экспорт всех few-shot примеров
 */

export { SUMMARY_EXAMPLES_RU, ANTI_PATTERNS_RU, ACTION_VERBS_RU } from './summary_ru';
export { SUMMARY_EXAMPLES_EN, ANTI_PATTERNS_EN, ACTION_VERBS_EN, ATS_KEYWORDS } from './summary_en';
export { BULLET_EXAMPLES_RU, ACTION_VERBS_BULLETS_RU, XYZ_TEMPLATES_RU } from './bullets_ru';
export { BULLET_EXAMPLES_EN, ACTION_VERBS_BULLETS_EN, XYZ_TEMPLATES_EN, ATS_METRICS_EN } from './bullets_en';

/**
 * Получить примеры для Summary по языку и индустрии
 */
export function getSummaryExamples(locale = 'ru', industry = 'it') {
  const examples = locale === 'ru' 
    ? require('./summary_ru').SUMMARY_EXAMPLES_RU 
    : require('./summary_en').SUMMARY_EXAMPLES_EN;
  
  return examples[industry] || examples.it;
}

/**
 * Получить примеры для Bullet Points по языку и категории
 */
export function getBulletExamples(locale = 'ru', category = 'development') {
  const examples = locale === 'ru'
    ? require('./bullets_ru').BULLET_EXAMPLES_RU
    : require('./bullets_en').BULLET_EXAMPLES_EN;
  
  return examples[category] || examples.development;
}

/**
 * Форматировать примеры для промпта
 */
export function formatExamplesForPrompt(examples, locale = 'ru') {
  const header = locale === 'ru' ? 'ПРИМЕРЫ (учись на них):' : 'EXAMPLES (learn from these):';
  const badLabel = locale === 'ru' ? 'ПЛОХО' : 'BAD';
  const goodLabel = locale === 'ru' ? 'ХОРОШО' : 'GOOD';
  const whyLabel = locale === 'ru' ? 'Почему лучше' : 'Why better';

  let formatted = `\n${header}\n`;
  
  examples.slice(0, 2).forEach((example, i) => {
    formatted += `
${i + 1}. ${example.level.toUpperCase()}:
${badLabel}: "${example.bad}"
${goodLabel}: "${example.good}"
${whyLabel}: ${example.why}
`;
  });

  return formatted;
}

/**
 * Форматировать примеры XYZ трансформации
 */
export function formatBulletExamplesForPrompt(examples, locale = 'ru', count = 3) {
  const header = locale === 'ru' 
    ? '\n--- ПРИМЕРЫ XYZ ТРАНСФОРМАЦИИ ---\n'
    : '\n--- XYZ TRANSFORMATION EXAMPLES ---\n';
  const beforeLabel = locale === 'ru' ? 'БЫЛО' : 'BEFORE';
  const afterLabel = locale === 'ru' ? 'СТАЛО' : 'AFTER';

  let formatted = header;
  
  examples.slice(0, count).forEach((example, i) => {
    formatted += `\n${i + 1}. ${beforeLabel}: "${example.before}"\n`;
    formatted += `   ${afterLabel}: "${example.after}"\n`;
  });

  return formatted;
}

export default {
  getSummaryExamples,
  getBulletExamples,
  formatExamplesForPrompt,
  formatBulletExamplesForPrompt
};

