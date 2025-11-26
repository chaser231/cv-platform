/**
 * IT Roles Database
 * Детальное описание всех IT-ролей для генерации резюме FAANG-уровня
 * 
 * Структура:
 * - Роли и специализации
 * - Уровни (Junior → Principal)
 * - Навыки, метрики, достижения
 * - Action verbs и ATS ключевые слова
 */

// Экспорт всех ролей
export * from './engineering';
export * from './product';
export * from './design';
export * from './data';
export * from './management';
export * from './qa';
export * from './devops';
export * from './other';

/**
 * Уровни специалистов
 */
export const SENIORITY_LEVELS = {
  junior: {
    ru: 'Junior',
    en: 'Junior',
    yearsExp: '0-2',
    characteristics: {
      ru: ['Учится у старших', 'Выполняет задачи под руководством', 'Растёт в технических навыках'],
      en: ['Learning from seniors', 'Executes tasks under guidance', 'Growing technical skills']
    },
    metricsRange: {
      teamSize: '0-2',
      impact: 'individual tasks',
      scope: 'single feature/component'
    }
  },
  middle: {
    ru: 'Middle',
    en: 'Mid-level',
    yearsExp: '2-4',
    characteristics: {
      ru: ['Самостоятельно решает задачи', 'Участвует в код-ревью', 'Помогает джуниорам'],
      en: ['Works independently', 'Participates in code reviews', 'Helps juniors']
    },
    metricsRange: {
      teamSize: '0-3',
      impact: 'feature-level',
      scope: 'multiple features/services'
    }
  },
  senior: {
    ru: 'Senior',
    en: 'Senior',
    yearsExp: '4-7',
    characteristics: {
      ru: ['Принимает архитектурные решения', 'Менторит команду', 'Влияет на продукт'],
      en: ['Makes architectural decisions', 'Mentors team', 'Influences product']
    },
    metricsRange: {
      teamSize: '2-5',
      impact: 'system-level',
      scope: 'entire service/product area'
    }
  },
  staff: {
    ru: 'Staff / Principal',
    en: 'Staff / Principal',
    yearsExp: '7-10',
    characteristics: {
      ru: ['Определяет техническую стратегию', 'Влияет на несколько команд', 'Решает сложнейшие проблемы'],
      en: ['Defines technical strategy', 'Influences multiple teams', 'Solves hardest problems']
    },
    metricsRange: {
      teamSize: '5-20',
      impact: 'org-level',
      scope: 'multiple products/platforms'
    }
  },
  lead: {
    ru: 'Tech Lead / Manager',
    en: 'Tech Lead / Manager',
    yearsExp: '5+',
    characteristics: {
      ru: ['Управляет командой', 'Отвечает за delivery', 'Развивает людей'],
      en: ['Manages team', 'Owns delivery', 'Develops people']
    },
    metricsRange: {
      teamSize: '3-15',
      impact: 'team/org-level',
      scope: 'team roadmap and people'
    }
  }
};

/**
 * Получить роль по ID
 */
export function getRoleById(roleId) {
  // Динамический импорт всех ролей
  const allRoles = {
    ...require('./engineering').ENGINEERING_ROLES,
    ...require('./product').PRODUCT_ROLES,
    ...require('./design').DESIGN_ROLES,
    ...require('./data').DATA_ROLES,
    ...require('./management').MANAGEMENT_ROLES,
    ...require('./qa').QA_ROLES,
    ...require('./devops').DEVOPS_ROLES,
    ...require('./other').OTHER_ROLES
  };
  
  return allRoles[roleId] || null;
}

/**
 * Получить все роли
 */
export function getAllRoles() {
  return {
    ...require('./engineering').ENGINEERING_ROLES,
    ...require('./product').PRODUCT_ROLES,
    ...require('./design').DESIGN_ROLES,
    ...require('./data').DATA_ROLES,
    ...require('./management').MANAGEMENT_ROLES,
    ...require('./qa').QA_ROLES,
    ...require('./devops').DEVOPS_ROLES,
    ...require('./other').OTHER_ROLES
  };
}

/**
 * Категории ролей для UI
 */
export const ROLE_CATEGORIES = [
  { id: 'engineering', label: { ru: '👨‍💻 Разработка', en: '👨‍💻 Engineering' } },
  { id: 'product', label: { ru: '📦 Продукт', en: '📦 Product' } },
  { id: 'design', label: { ru: '🎨 Дизайн', en: '🎨 Design' } },
  { id: 'data', label: { ru: '📊 Данные', en: '📊 Data' } },
  { id: 'management', label: { ru: '👔 Менеджмент', en: '👔 Management' } },
  { id: 'qa', label: { ru: '🧪 QA', en: '🧪 QA' } },
  { id: 'devops', label: { ru: '⚙️ DevOps/Infra', en: '⚙️ DevOps/Infra' } },
  { id: 'other', label: { ru: '🔧 Другие', en: '🔧 Other' } }
];

