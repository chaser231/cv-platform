/**
 * Экспорт всех шаблонов по индустриям
 */

export { IT_TEMPLATES } from './it';
export { FINANCE_TEMPLATES } from './finance';
export { MARKETING_TEMPLATES } from './marketing';

/**
 * Получить шаблон по индустрии
 */
export function getIndustryTemplate(industry = 'it') {
  switch (industry.toLowerCase()) {
    case 'it':
    case 'tech':
    case 'software':
    case 'developer':
    case 'engineering':
      return require('./it').IT_TEMPLATES;
    
    case 'finance':
    case 'banking':
    case 'investment':
    case 'accounting':
      return require('./finance').FINANCE_TEMPLATES;
    
    case 'marketing':
    case 'growth':
    case 'digital':
    case 'brand':
    case 'smm':
      return require('./marketing').MARKETING_TEMPLATES;
    
    default:
      return require('./it').IT_TEMPLATES; // Default to IT
  }
}

/**
 * Получить промпт для Summary по индустрии
 */
export function getSummaryPromptForIndustry(locale = 'ru', industry = 'it', role = null) {
  const template = getIndustryTemplate(industry);
  return template.promptTemplate(locale, role);
}

/**
 * Список поддерживаемых индустрий
 */
export const SUPPORTED_INDUSTRIES = [
  { id: 'it', label: { ru: 'IT / Разработка', en: 'IT / Software Development' } },
  { id: 'finance', label: { ru: 'Финансы / Банкинг', en: 'Finance / Banking' } },
  { id: 'marketing', label: { ru: 'Маркетинг / Digital', en: 'Marketing / Digital' } }
];

export default {
  getIndustryTemplate,
  getSummaryPromptForIndustry,
  SUPPORTED_INDUSTRIES
};

