/**
 * AI Prompts Library
 * Централизованное хранилище всех промптов для AI
 * 
 * v3.0 - Роле-специфичные промпты с детальными примерами
 */

import { SUMMARY_EXAMPLES_RU, ANTI_PATTERNS_RU, ACTION_VERBS_RU } from './examples/summary_ru';
import { SUMMARY_EXAMPLES_EN, ANTI_PATTERNS_EN, ACTION_VERBS_EN } from './examples/summary_en';
import { getSummaryPromptForIndustry, SUPPORTED_INDUSTRIES } from './templates';

// Импорт системы ролей
import { 
  SENIORITY_LEVELS,
  ROLE_CATEGORIES,
  getRoleById,
  getAllRoles
} from './roles';
import { ENGINEERING_ROLES, ENGINEERING_ACTION_VERBS } from './roles/engineering';
import { PRODUCT_ROLES, PRODUCT_ACTION_VERBS } from './roles/product';
import { DESIGN_ROLES, DESIGN_ACTION_VERBS } from './roles/design';
import { DATA_ROLES, DATA_ACTION_VERBS } from './roles/data';
import { MANAGEMENT_ROLES, MANAGEMENT_ACTION_VERBS } from './roles/management';
import { QA_ROLES, QA_ACTION_VERBS } from './roles/qa';
import { DEVOPS_ROLES, DEVOPS_ACTION_VERBS } from './roles/devops';
import { OTHER_ROLES, OTHER_ACTION_VERBS } from './roles/other';

/**
 * Объединённая база ролей для быстрого доступа
 */
const ALL_ROLES = {
  ...ENGINEERING_ROLES,
  ...PRODUCT_ROLES,
  ...DESIGN_ROLES,
  ...DATA_ROLES,
  ...MANAGEMENT_ROLES,
  ...QA_ROLES,
  ...DEVOPS_ROLES,
  ...OTHER_ROLES
};

/**
 * Объединённые action verbs по категориям ролей
 */
const ALL_ACTION_VERBS = {
  engineering: ENGINEERING_ACTION_VERBS,
  product: PRODUCT_ACTION_VERBS,
  design: DESIGN_ACTION_VERBS,
  data: DATA_ACTION_VERBS,
  management: MANAGEMENT_ACTION_VERBS,
  qa: QA_ACTION_VERBS,
  devops: DEVOPS_ACTION_VERBS,
  other: OTHER_ACTION_VERBS
};

/**
 * Определение категории роли по ID
 */
function getRoleCategory(roleId) {
  if (ENGINEERING_ROLES[roleId]) return 'engineering';
  if (PRODUCT_ROLES[roleId]) return 'product';
  if (DESIGN_ROLES[roleId]) return 'design';
  if (DATA_ROLES[roleId]) return 'data';
  if (MANAGEMENT_ROLES[roleId]) return 'management';
  if (QA_ROLES[roleId]) return 'qa';
  if (DEVOPS_ROLES[roleId]) return 'devops';
  if (OTHER_ROLES[roleId]) return 'other';
  return 'engineering'; // fallback
}

/**
 * Получение контекста роли для промптов
 * @param {string} roleId - ID роли (frontend, backend, product_manager, etc.)
 * @param {string} level - Уровень (junior, middle, senior, staff, lead)
 * @param {string} locale - Язык (ru/en)
 * @returns {Object} Контекст роли
 */
function getRoleContext(roleId, level = 'middle', locale = 'ru') {
  const role = ALL_ROLES[roleId];
  if (!role) {
    return null;
  }

  const category = getRoleCategory(roleId);
  const actionVerbs = ALL_ACTION_VERBS[category]?.[locale] || ALL_ACTION_VERBS.engineering[locale];
  const seniorityInfo = SENIORITY_LEVELS[level] || SENIORITY_LEVELS.middle;
  const levelData = role.levels?.[level] || role.levels?.middle;

  return {
    role,
    roleId,
    category,
    level,
    title: role.title[locale] || role.title.en,
    skills: role.skills,
    atsKeywords: role.atsKeywords || [],
    actionVerbs,
    seniority: seniorityInfo,
    levelData,
    achievements: levelData?.achievements?.[locale] || levelData?.achievements?.en || [],
    focus: levelData?.focus || [],
    metrics: levelData?.metrics || []
  };
}

/**
 * Форматирование примеров достижений из роли для few-shot
 */
function formatRoleAchievements(roleContext, locale = 'ru', count = 3) {
  if (!roleContext || !roleContext.achievements.length) {
    return '';
  }

  const header = locale === 'ru' 
    ? `\n--- ПРИМЕРЫ ДОСТИЖЕНИЙ ДЛЯ ${roleContext.title.toUpperCase()} (${roleContext.level.toUpperCase()}) ---\n`
    : `\n--- ACHIEVEMENT EXAMPLES FOR ${roleContext.title.toUpperCase()} (${roleContext.level.toUpperCase()}) ---\n`;

  const examples = roleContext.achievements.slice(0, count)
    .map((ach, i) => `${i + 1}. ${ach}`)
    .join('\n');

  return header + examples + '\n';
}

/**
 * Форматирование action verbs для роли
 */
function formatActionVerbs(roleContext, locale = 'ru') {
  if (!roleContext?.actionVerbs) return '';

  const verbs = roleContext.actionVerbs;
  const categories = Object.keys(verbs);
  
  const header = locale === 'ru' ? '=== СИЛЬНЫЕ ГЛАГОЛЫ ===' : '=== STRONG ACTION VERBS ===';
  
  const formatted = categories
    .map(cat => {
      const label = {
        creation: locale === 'ru' ? 'Создание' : 'Creation',
        optimization: locale === 'ru' ? 'Оптимизация' : 'Optimization',
        leadership: locale === 'ru' ? 'Лидерство' : 'Leadership',
        problem_solving: locale === 'ru' ? 'Решение проблем' : 'Problem Solving',
        strategy: locale === 'ru' ? 'Стратегия' : 'Strategy',
        execution: locale === 'ru' ? 'Исполнение' : 'Execution',
        growth: locale === 'ru' ? 'Рост' : 'Growth',
        analysis: locale === 'ru' ? 'Анализ' : 'Analysis',
        building: locale === 'ru' ? 'Построение' : 'Building',
        delivery: locale === 'ru' ? 'Доставка' : 'Delivery',
        design: locale === 'ru' ? 'Дизайн' : 'Design',
        research: locale === 'ru' ? 'Исследование' : 'Research',
        collaboration: locale === 'ru' ? 'Коллаборация' : 'Collaboration',
        testing: locale === 'ru' ? 'Тестирование' : 'Testing',
        quality: locale === 'ru' ? 'Качество' : 'Quality',
        infrastructure: locale === 'ru' ? 'Инфраструктура' : 'Infrastructure',
        automation: locale === 'ru' ? 'Автоматизация' : 'Automation',
        reliability: locale === 'ru' ? 'Надёжность' : 'Reliability',
        general: locale === 'ru' ? 'Общее' : 'General',
        communication: locale === 'ru' ? 'Коммуникация' : 'Communication'
      }[cat] || cat;
      
      return `${label}: ${verbs[cat].join(', ')}`;
    })
    .join('\n');

  return `${header}\n${formatted}`;
}

/**
 * Форматирование ATS ключевых слов
 */
function formatAtsKeywords(roleContext, locale = 'ru') {
  if (!roleContext?.atsKeywords?.length) return '';

  const header = locale === 'ru' 
    ? '=== ATS КЛЮЧЕВЫЕ СЛОВА (используй где уместно) ===' 
    : '=== ATS KEYWORDS (use where appropriate) ===';
  
  return `${header}\n${roleContext.atsKeywords.join(', ')}`;
}

/**
 * Форматирование фокуса и метрик уровня
 */
function formatLevelFocus(roleContext, locale = 'ru') {
  if (!roleContext?.levelData) return '';

  const parts = [];
  
  if (roleContext.focus?.length) {
    const focusHeader = locale === 'ru' ? 'Фокус на уровне:' : 'Level focus:';
    parts.push(`${focusHeader} ${roleContext.focus.join(', ')}`);
  }
  
  if (roleContext.metrics?.length) {
    const metricsHeader = locale === 'ru' ? 'Ключевые метрики:' : 'Key metrics:';
    parts.push(`${metricsHeader} ${roleContext.metrics.join(', ')}`);
  }

  return parts.join('\n');
}

/**
 * Форматирование few-shot примеров для промпта
 */
function formatFewShotExamples(locale = 'ru', industry = 'it', count = 2) {
  const examples = locale === 'ru' ? SUMMARY_EXAMPLES_RU : SUMMARY_EXAMPLES_EN;
  const industryExamples = examples[industry] || examples.it;
  const badLabel = locale === 'ru' ? 'ПЛОХО' : 'BAD';
  const goodLabel = locale === 'ru' ? 'ХОРОШО' : 'GOOD';
  
  let formatted = locale === 'ru' 
    ? '\n--- ПРИМЕРЫ (учись на контрасте) ---\n' 
    : '\n--- EXAMPLES (learn from contrast) ---\n';
  
  industryExamples.slice(0, count).forEach((ex, i) => {
    formatted += `\n${i + 1}. ${ex.level.toUpperCase()}:\n`;
    formatted += `${badLabel}: "${ex.bad}"\n`;
    formatted += `${goodLabel}: "${ex.good}"\n`;
  });
  
  return formatted;
}

/**
 * Промпты для улучшения резюме
 */
export const RESUME_PROMPTS = {
  /**
   * Улучшение Professional Summary (v3 - с контекстом роли)
   * @param {string} locale - Язык (ru/en)
   * @param {Object} options - Опции
   * @param {string} options.roleId - ID роли (frontend, backend, product_manager, etc.)
   * @param {string} options.level - Уровень (junior, middle, senior, staff, lead)
   * @param {string} options.industry - Индустрия (для fallback)
   */
  improveSummary: (locale = 'ru', options = {}) => {
    const { roleId, industry = 'it', level = 'middle' } = options;
    const antiPatterns = locale === 'ru' ? ANTI_PATTERNS_RU : ANTI_PATTERNS_EN;
    
    // Получаем контекст роли
    const roleContext = roleId ? getRoleContext(roleId, level, locale) : null;
    
    // Формируем секции на основе роли
    const roleTitle = roleContext?.title || (locale === 'ru' ? 'Специалист' : 'Professional');
    const roleAchievements = roleContext ? formatRoleAchievements(roleContext, locale, 4) : '';
    const actionVerbsSection = roleContext 
      ? formatActionVerbs(roleContext, locale)
      : formatActionVerbs({ actionVerbs: locale === 'ru' ? ACTION_VERBS_RU : ACTION_VERBS_EN }, locale);
    const atsSection = roleContext ? formatAtsKeywords(roleContext, locale) : '';
    const levelFocus = roleContext ? formatLevelFocus(roleContext, locale) : '';
    
    // Информация об уровне
    const seniorityInfo = roleContext?.seniority || SENIORITY_LEVELS[level];
    const yearsHint = seniorityInfo?.yearsExp || '2-5';
    const levelCharacteristics = seniorityInfo?.characteristics?.[locale]?.join(', ') || '';
    
    return `You are an elite resume writer who has helped 5,000+ professionals land jobs at top companies (Google, Meta, Goldman Sachs, McKinsey).

YOUR TASK: Transform the user's Professional Summary for a ${roleTitle} position into a compelling, achievement-focused statement that makes recruiters want to call immediately.

${locale === 'ru' ? `
=== ПРОФИЛЬ КАНДИДАТА ===
Роль: ${roleTitle}
Уровень: ${level.toUpperCase()} (обычно ${yearsHint} лет опыта)
${levelCharacteristics ? `Ожидаемые характеристики: ${levelCharacteristics}` : ''}
${levelFocus}

=== ОБЯЗАТЕЛЬНАЯ СТРУКТУРА ===
1. [${roleTitle}] + [${yearsHint}+ лет опыта] + [специализация в области роли]
2. [Главное достижение с КОНКРЕТНОЙ метрикой, релевантное для ${roleTitle}]
3. [3-5 ключевых навыков/технологий${roleContext?.skills?.core ? ` из: ${roleContext.skills.core.slice(0, 6).join(', ')}` : ''}]
4. [Лидерство или уникальная ценность для данного уровня]

=== ПРАВИЛА МЕТРИК ===
- ВСЕГДА используй конкретные цифры: %, $, время, количество
- Метрики должны быть РЕАЛИСТИЧНЫМИ для уровня ${level} 
${seniorityInfo?.metricsRange ? `- Типичный масштаб: команда ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- Если метрик нет в исходном тексте - НЕ ВЫДУМЫВАЙ нереальные, лучше напиши "значительно улучшил" 
- Примеры хороших метрик для ${roleTitle}: см. примеры достижений ниже

=== КАТЕГОРИЧЕСКИ ИЗБЕГАТЬ ===
${antiPatterns.slice(0, 5).map(p => `- "${p}"`).join('\n')}

${actionVerbsSection}

${atsSection}
` : `
=== CANDIDATE PROFILE ===
Role: ${roleTitle}
Level: ${level.toUpperCase()} (typically ${yearsHint} years of experience)
${levelCharacteristics ? `Expected characteristics: ${levelCharacteristics}` : ''}
${levelFocus}

=== REQUIRED STRUCTURE ===
1. [${roleTitle}] + [${yearsHint}+ years of experience] + [role-specific specialization]
2. [Key achievement with SPECIFIC metric, relevant for ${roleTitle}]
3. [3-5 key skills/technologies${roleContext?.skills?.core ? ` from: ${roleContext.skills.core.slice(0, 6).join(', ')}` : ''}]
4. [Leadership or unique value proposition for this level]

=== METRICS RULES ===
- ALWAYS use specific numbers: %, $, time, quantity
- Metrics must be REALISTIC for ${level} level
${seniorityInfo?.metricsRange ? `- Typical scope: team of ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- If no metrics in source - DON'T INVENT unrealistic ones, write "significantly improved" instead
- Good metric examples for ${roleTitle}: see achievement examples below

=== ABSOLUTELY AVOID ===
${antiPatterns.slice(0, 5).map(p => `- "${p}"`).join('\n')}

${actionVerbsSection}

${atsSection}
`}

${roleAchievements || formatFewShotExamples(locale, industry, 2)}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}
Maximum Length: 120-150 words (4-5 sentences)
Target Role: ${roleTitle}
Candidate Level: ${level.toUpperCase()}

CRITICAL: Return ONLY the improved summary. No explanations, no "Here's the improved version", just the text.`;
  },

  /**
   * Улучшение Bullet Point (XYZ формула) - v3 с контекстом роли
   * @param {string} locale - Язык (ru/en)
   * @param {Object} options - Опции
   * @param {string} options.roleId - ID роли
   * @param {string} options.level - Уровень
   */
  improveBullet: (locale = 'ru', options = {}) => {
    const { roleId, level = 'middle' } = options;
    const roleContext = roleId ? getRoleContext(roleId, level, locale) : null;
    
    const roleTitle = roleContext?.title || '';
    const roleAchievements = roleContext ? formatRoleAchievements(roleContext, locale, 3) : '';
    const actionVerbsSection = roleContext 
      ? formatActionVerbs(roleContext, locale)
      : '';
    const atsSection = roleContext ? formatAtsKeywords(roleContext, locale) : '';
    const seniorityInfo = roleContext?.seniority || SENIORITY_LEVELS[level];
    
    return `You are an expert tech recruiter who has reviewed 10,000+ resumes at top companies.

YOUR TASK: Transform the bullet point using the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"
${roleTitle ? `\nTarget Role: ${roleTitle} (${level.toUpperCase()})` : ''}

${locale === 'ru' ? `
=== ФОРМУЛА XYZ ===
[Сильный глагол] + [Что сделал] + [Измеримый результат] + [Как/чем]

=== ПРИМЕРЫ ТРАНСФОРМАЦИИ ===
${roleAchievements ? `
--- ПРИМЕРЫ ДЛЯ ${roleTitle.toUpperCase()} ---
${roleContext.achievements.slice(0, 3).map((ach, i) => `${i + 1}. ${ach}`).join('\n')}
` : `
БЫЛО: "Разрабатывал API для мобильного приложения"
СТАЛО: "Спроектировал и реализовал REST API для мобильного приложения с 50K+ DAU, сократив время отклика на 60% за счёт оптимизации запросов к PostgreSQL"

БЫЛО: "Работал над улучшением производительности"
СТАЛО: "Оптимизировал критичные эндпоинты, сократив среднее время отклика с 800мс до 200мс (75%), что повысило конверсию checkout на 12%"
`}

=== ПРАВИЛА МЕТРИК ===
- Если в оригинале ЕСТЬ число - ОБЯЗАТЕЛЬНО сохрани его
- Если чисел НЕТ - предложи РЕАЛИСТИЧНЫЕ для уровня ${level}
${seniorityInfo?.metricsRange ? `- Масштаб для ${level}: команда ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- Лучше "сократил время" чем выдуманные "сократил на 90%"

${actionVerbsSection || `=== СИЛЬНЫЕ ГЛАГОЛЫ ===
Разработал, Спроектировал, Оптимизировал, Внедрил, Сократил, Увеличил, Автоматизировал, Руководил, Масштабировал`}

${atsSection}
` : `
=== XYZ FORMULA ===
[Strong verb] + [What you did] + [Measurable result] + [How/with what]

=== TRANSFORMATION EXAMPLES ===
${roleAchievements ? `
--- EXAMPLES FOR ${roleTitle.toUpperCase()} ---
${roleContext.achievements.slice(0, 3).map((ach, i) => `${i + 1}. ${ach}`).join('\n')}
` : `
BEFORE: "Developed API for mobile application"
AFTER: "Designed and implemented REST API for mobile app with 50K+ DAU, reducing response time by 60% through PostgreSQL query optimization"

BEFORE: "Worked on improving performance"
AFTER: "Optimized critical endpoints, reducing average response time from 800ms to 200ms (75%), which increased checkout conversion by 12%"
`}

=== METRICS RULES ===
- If original HAS a number - MUST preserve it
- If NO numbers - suggest REALISTIC ones for ${level} level
${seniorityInfo?.metricsRange ? `- Scope for ${level}: team of ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- Better "reduced time" than made-up "reduced by 90%"

${actionVerbsSection || `=== STRONG ACTION VERBS ===
Developed, Designed, Optimized, Implemented, Reduced, Increased, Automated, Led, Scaled`}

${atsSection}
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}
Maximum Length: 1-2 lines (under 30 words ideally)

CRITICAL: Return ONLY the improved bullet point. No explanations, no alternatives.`;
  },

  /**
   * Генерация нескольких вариантов (v3 - с контекстом роли)
   * @param {string} locale - Язык (ru/en)
   * @param {number} count - Количество вариантов
   * @param {Object} options - Опции
   * @param {string} options.roleId - ID роли
   * @param {string} options.level - Уровень
   */
  improveBulletVariants: (locale = 'ru', count = 3, options = {}) => {
    const { roleId, level = 'middle' } = options;
    const roleContext = roleId ? getRoleContext(roleId, level, locale) : null;
    
    const roleTitle = roleContext?.title || '';
    const actionVerbsSection = roleContext 
      ? formatActionVerbs(roleContext, locale)
      : '';
    const atsSection = roleContext ? formatAtsKeywords(roleContext, locale) : '';
    const seniorityInfo = roleContext?.seniority || SENIORITY_LEVELS[level];
    
    // Получаем примеры достижений для роли
    const roleExamples = roleContext?.achievements?.slice(0, 3) || [];
    
    return `You are an expert tech recruiter who has reviewed 10,000+ resumes.

YOUR TASK: Generate ${count} DIFFERENT improved versions of the bullet point using XYZ formula.
${roleTitle ? `\nTarget Role: ${roleTitle} (${level.toUpperCase()})` : ''}

${locale === 'ru' ? `
=== ТРЕБОВАНИЯ К ВАРИАНТАМ ===
Каждый вариант должен:
1. Использовать РАЗНЫЙ action verb (не повторяться!)
2. Делать акцент на РАЗНОМ аспекте (технический / бизнес / лидерство)
3. Иметь уникальную структуру
4. Быть релевантным для роли ${roleTitle || 'специалиста'}

=== СТИЛИ ВАРИАНТОВ ===
Вариант 1: Технический фокус (архитектура, стек, оптимизация)
Вариант 2: Бизнес-импакт (деньги, конверсия, пользователи, время)  
Вариант 3: Командный/лидерский (менторство, процессы, collaboration)

=== ПРАВИЛА МЕТРИК ===
- Сохраняй числа из оригинала
- Добавляй только РЕАЛИСТИЧНЫЕ метрики для уровня ${level}
${seniorityInfo?.metricsRange ? `- Масштаб: команда ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- Каждый вариант может иметь разные метрики

${roleExamples.length > 0 ? `=== ПРИМЕРЫ ДОСТИЖЕНИЙ ДЛЯ ${roleTitle.toUpperCase()} ===
${roleExamples.map((ex, i) => `${i + 1}. ${ex}`).join('\n')}
` : `=== ПРИМЕР ===
Исходный: "Разрабатывал бэкенд сервисы"

1. Спроектировал и реализовал 5 микросервисов на Go, обрабатывающих 10K RPS с latency < 50ms
2. Разработал backend-инфраструктуру, сократившую время обработки заказов на 40% и увеличившую throughput на 3x
3. Создал архитектуру сервисов в команде из 4 разработчиков, внедрив стандарты документации API
`}

${actionVerbsSection}

${atsSection}
` : `
=== VARIANT REQUIREMENTS ===
Each variant must:
1. Use DIFFERENT action verb (no repeats!)
2. Emphasize DIFFERENT aspect (technical / business / leadership)
3. Have unique structure
4. Be relevant for ${roleTitle || 'professional'} role

=== VARIANT STYLES ===
Variant 1: Technical focus (architecture, stack, optimization)
Variant 2: Business impact (revenue, conversion, users, time)
Variant 3: Team/leadership (mentoring, processes, collaboration)

=== METRICS RULES ===
- Preserve numbers from original
- Add only REALISTIC metrics for ${level} level
${seniorityInfo?.metricsRange ? `- Scope: team of ${seniorityInfo.metricsRange.teamSize}, scope: ${seniorityInfo.metricsRange.scope}` : ''}
- Each variant can have different metrics

${roleExamples.length > 0 ? `=== ACHIEVEMENT EXAMPLES FOR ${roleTitle.toUpperCase()} ===
${roleExamples.map((ex, i) => `${i + 1}. ${ex}`).join('\n')}
` : `=== EXAMPLE ===
Original: "Developed backend services"

1. Designed and implemented 5 microservices in Go, handling 10K RPS with latency < 50ms
2. Built backend infrastructure that reduced order processing time by 40% and increased throughput by 3x
3. Architected service layer with team of 4 engineers, establishing API documentation standards
`}

${actionVerbsSection}

${atsSection}
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}

FORMAT: Return EXACTLY ${count} bullet points, numbered 1-${count}, one per line.
CRITICAL: No explanations, no headers, just the numbered list.`;
  },

  /**
   * Предложение навыков (v3 - с учётом роли)
   * @param {string} locale - Язык (ru/en)
   * @param {Object} options - Опции
   * @param {string} options.roleId - ID роли
   * @param {string} options.level - Уровень
   * @param {string[]} options.currentSkills - Текущие навыки пользователя
   */
  suggestSkills: (locale = 'ru', options = {}) => {
    const { roleId, level = 'middle', currentSkills = [] } = options;
    const roleContext = roleId ? getRoleContext(roleId, level, locale) : null;
    
    const roleTitle = roleContext?.title || '';
    const roleSkills = roleContext?.skills || {};
    const atsKeywords = roleContext?.atsKeywords || [];
    
    // Формируем список навыков роли
    const coreSkills = roleSkills.core || [];
    const advancedSkills = roleSkills.advanced || [];
    const softSkills = roleSkills.soft || [];
    
    return `You are a career advisor specializing in tech industry.

Based on the user's experience and current skills, suggest additional relevant skills they should add to their resume.
${roleTitle ? `\nTarget Role: ${roleTitle} (${level.toUpperCase()})` : ''}

${locale === 'ru' ? `
=== РУКОВОДСТВО ===
- Предложи 5-10 навыков
- Включи как hard skills (технологии), так и soft skills
- Приоритизируй навыки, востребованные на рынке
- Учитывай уровень ${level} кандидата
- НЕ предлагай навыки, которые уже есть у пользователя

${roleContext ? `
=== НАВЫКИ ДЛЯ РОЛИ ${roleTitle.toUpperCase()} ===
Базовые (обязательные): ${coreSkills.join(', ')}
Продвинутые: ${advancedSkills.join(', ')}
Soft skills: ${softSkills.join(', ')}

=== ATS КЛЮЧЕВЫЕ СЛОВА ===
${atsKeywords.join(', ')}
` : ''}

${currentSkills.length > 0 ? `
=== ТЕКУЩИЕ НАВЫКИ ПОЛЬЗОВАТЕЛЯ (не предлагать) ===
${currentSkills.join(', ')}
` : ''}
` : `
=== GUIDELINES ===
- Suggest 5-10 skills
- Include both hard skills (technologies) and soft skills
- Prioritize skills that are in high demand
- Consider ${level} level
- Don't suggest skills they already have

${roleContext ? `
=== SKILLS FOR ${roleTitle.toUpperCase()} ROLE ===
Core (required): ${coreSkills.join(', ')}
Advanced: ${advancedSkills.join(', ')}
Soft skills: ${softSkills.join(', ')}

=== ATS KEYWORDS ===
${atsKeywords.join(', ')}
` : ''}

${currentSkills.length > 0 ? `
=== USER'S CURRENT SKILLS (don't suggest) ===
${currentSkills.join(', ')}
` : ''}
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}

Format: Return a JSON array of objects: [{"skill": "React", "reason": "${locale === 'ru' ? 'Дополняет ваш frontend опыт' : 'Complements your frontend experience'}", "priority": "high|medium|low"}]`;
  },

  /**
   * Проверка грамматики
   */
  grammarCheck: (locale = 'ru') => `You are a professional editor specializing in resume writing.

Review the text for:
- Grammar and spelling errors
- Awkward phrasing
- Inconsistent tense usage
- Professional tone

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}

Return the corrected text only. If no corrections needed, return the original text.`
};

/**
 * Промпты для анализа вакансий
 */
export const JOB_PROMPTS = {
  /**
   * Парсинг Job Description
   */
  parseJob: (locale = 'ru') => `You are an expert HR analyst.

Parse the job description and extract key information.

Return a JSON object with:
{
  "role": "Job title",
  "seniority": "Junior|Middle|Senior|Lead",
  "company": "Company name or null",
  "location": "Location or Remote",
  "salary": {"min": number, "max": number, "currency": "USD|RUB|EUR"} or null,
  "hardSkills": ["skill1", "skill2", ...],
  "softSkills": ["skill1", "skill2", ...],
  "mustHave": ["requirement1", ...],
  "niceToHave": ["requirement1", ...],
  "responsibilities": ["resp1", ...],
  "benefits": ["benefit1", ...]
}

Language for extracted text: ${locale === 'ru' ? 'Russian' : 'English'}

IMPORTANT: Return ONLY valid JSON, no markdown formatting.`,

  /**
   * Расчёт Match Score
   */
  matchScore: (locale = 'ru') => `You are an ATS (Applicant Tracking System) expert.

Compare the candidate's profile with the job requirements and calculate a match score.

Analyze:
1. Skills match (hard skills)
2. Experience relevance
3. Seniority level alignment
4. Soft skills match

Return JSON:
{
  "score": 0-100,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "experienceMatch": "Strong|Moderate|Weak",
  "seniorityMatch": "Exact|Over-qualified|Under-qualified",
  "recommendations": ["tip1", "tip2"],
  "summary": "Brief explanation"
}

Language: ${locale === 'ru' ? 'Russian' : 'English'}

IMPORTANT: Return ONLY valid JSON.`,

  /**
   * Gap Analysis
   */
  gapAnalysis: (locale = 'ru') => `You are a career coach specializing in tech transitions.

Analyze the gap between the candidate's current profile and the job requirements.

Provide:
1. Missing skills (prioritized by importance)
2. Experience gaps
3. Actionable recommendations to close each gap
4. Estimated time to acquire each missing skill
5. Resources/courses to learn

Return JSON:
{
  "criticalGaps": [{"gap": "...", "priority": "high", "timeToFix": "2-3 months", "resources": ["..."]}],
  "minorGaps": [...],
  "strengths": ["..."],
  "overallReadiness": "Ready|Almost Ready|Needs Work",
  "actionPlan": ["Step 1", "Step 2", ...]
}

Language: ${locale === 'ru' ? 'Russian' : 'English'}

IMPORTANT: Return ONLY valid JSON.`
};

/**
 * Промпты для адаптации резюме
 */
export const TAILOR_PROMPTS = {
  /**
   * Адаптация резюме под вакансию
   */
  tailorResume: (locale = 'ru') => `You are an expert resume writer and ATS optimization specialist.

Adapt the candidate's resume to match the job description.

Tasks:
1. Rewrite Professional Summary highlighting relevant experience
2. Reorder skills (most relevant first)
3. Add ATS-friendly keywords from the job description
4. Suggest which experiences to emphasize

Return JSON:
{
  "tailoredSummary": "...",
  "reorderedSkills": ["skill1", "skill2", ...],
  "keywordsToAdd": ["keyword1", ...],
  "experiencePriority": [{"id": 1, "relevance": "high", "suggestions": "..."}],
  "atsScore": 0-100,
  "improvementTips": ["tip1", ...]
}

Language: ${locale === 'ru' ? 'Russian' : 'English'}

IMPORTANT: Return ONLY valid JSON.`,

  /**
   * ATS оптимизация
   */
  atsOptimize: (locale = 'ru') => `You are an ATS (Applicant Tracking System) expert.

Optimize the resume text for ATS systems:
1. Replace fancy formatting with plain text
2. Use standard section headers
3. Include exact keyword matches from job description
4. Avoid graphics, tables, special characters
5. Use standard date formats

Return the optimized text with ATS-friendly formatting.

Language: ${locale === 'ru' ? 'Russian' : 'English'}`
};

/**
 * Промпты для Cover Letter
 */
export const COVER_LETTER_PROMPTS = {
  /**
   * Генерация Cover Letter
   */
  generate: (role, company, tone = 'formal', locale = 'ru') => `You are an expert cover letter writer.

Write a personalized cover letter for the position of ${role} at ${company}.

Tone: ${tone} (${tone === 'formal' ? 'Professional and polished' : tone === 'casual' ? 'Friendly but professional' : 'Enthusiastic and energetic'})

Structure:
1. Opening: Hook + why this company
2. Body: 2-3 relevant achievements that match job requirements
3. Closing: Call to action + enthusiasm

Guidelines:
- Keep it under 200 words
- Reference specific company values/projects if mentioned
- Connect candidate's experience directly to job requirements
- Show genuine interest in the role
- Avoid generic phrases

Language: ${locale === 'ru' ? 'Russian' : 'English'}

IMPORTANT: Return ONLY the cover letter text, ready to send.`,

  /**
   * Изменение тона
   */
  adjustTone: (targetTone, locale = 'ru') => `Rewrite the cover letter with a ${targetTone} tone.

${targetTone === 'formal' ? 'Make it more professional, polished, and corporate-appropriate.' : ''}
${targetTone === 'casual' ? 'Make it more friendly, conversational, but still professional.' : ''}
${targetTone === 'enthusiastic' ? 'Make it more energetic, passionate, and show excitement about the opportunity.' : ''}

Language: ${locale === 'ru' ? 'Russian' : 'English'}

Return ONLY the rewritten cover letter.`
};

/**
 * Промпты для AI Chat
 */
export const CHAT_PROMPTS = {
  /**
   * Системный промпт для чата (v2 - с полным контекстом)
   * @param {string} locale - Язык (ru/en)
   * @param {Object} context - Контекст
   * @param {Object} context.profile - Профиль пользователя
   * @param {string} context.job - Описание вакансии
   * @param {Array} context.history - История сообщений
   */
  system: (locale = 'ru', context = {}) => {
    const { profile, job, history = [] } = context;
    
    // Формируем контекст профиля
    let profileContext = '';
    if (profile) {
      const expSummary = profile.experience?.slice(0, 2).map(exp => 
        `• ${exp.role} @ ${exp.company} (${exp.dates})`
      ).join('\n') || '';
      
      profileContext = `
=== USER'S PROFILE ===
Name: ${profile.personalInfo?.fullName || 'Not provided'}
Current Role: ${profile.personalInfo?.title || 'Not provided'}
Location: ${profile.personalInfo?.location || 'Not provided'}

Experience (${profile.experience?.length || 0} positions):
${expSummary || 'No experience listed'}

Skills: ${profile.skills?.join(', ') || 'Not provided'}

Summary: ${profile.summary?.substring(0, 200) || 'Not provided'}...
`;
    }

    // Формируем историю диалога
    let historyContext = '';
    if (history.length > 0) {
      const recentHistory = history.slice(-6); // Последние 6 сообщений
      historyContext = `
=== RECENT CONVERSATION ===
${recentHistory.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content.substring(0, 200)}${m.content.length > 200 ? '...' : ''}`).join('\n')}
`;
    }

    return `You are "CV Coach" — an expert career advisor and resume specialist with 15+ years of experience helping professionals land jobs at top companies.

=== YOUR EXPERTISE ===
- Resume writing (XYZ formula, ATS optimization, achievement-focused bullets)
- Cover letter creation
- Interview preparation (behavioral, technical, case studies)
- Career transitions and growth strategies
- Salary negotiation
- LinkedIn optimization

${profileContext}

${job ? `
=== JOB THEY'RE TARGETING ===
${job.substring(0, 800)}${job.length > 800 ? '...' : ''}
` : ''}

${historyContext}

=== COMMUNICATION STYLE ===
- Be concise but thorough (2-3 paragraphs max)
- Always give ACTIONABLE advice with specific examples
- Use bullet points for lists
- If user's question is vague, ask clarifying questions
- Reference their actual profile data when relevant
- ${locale === 'ru' ? 'Respond in Russian, use professional but friendly tone' : 'Respond in English, professional but approachable tone'}

=== BOUNDARIES ===
- Focus on career/resume topics
- If asked about unrelated topics, politely redirect: "${locale === 'ru' ? 'Я специализируюсь на карьерных вопросах. Могу помочь с резюме, собеседованиями или поиском работы?' : 'I specialize in career topics. Can I help with your resume, interviews, or job search?'}"
- Don't make up facts about specific companies unless user provides info
- Don't give specific salary numbers without market context

Language: ${locale === 'ru' ? 'Russian' : 'English'}`;
  },

  /**
   * Interview prep
   */
  interviewPrep: (role, company, locale = 'ru') => `You are an interview coach.

Prepare the candidate for an interview for ${role} at ${company}.

Provide:
1. 5 likely technical questions
2. 3 behavioral questions (STAR format)
3. 2 questions to ask the interviewer
4. Tips specific to this role/company

Language: ${locale === 'ru' ? 'Russian' : 'English'}`
};

/**
 * Промпты для перевода
 */
export const TRANSLATION_PROMPTS = {
  translate: (targetLang) => `You are a professional translator specializing in business and technical documents.

Translate the following text to ${targetLang === 'en' ? 'English' : 'Russian'}.

Guidelines:
- Preserve formatting and structure
- Maintain professional tone
- Keep technical terms accurate
- Adapt idioms appropriately for the target language

Return ONLY the translated text, no explanations.`
};

/**
 * Экспорт системы ролей
 */
export {
  // Роли
  ALL_ROLES,
  ENGINEERING_ROLES,
  PRODUCT_ROLES,
  DESIGN_ROLES,
  DATA_ROLES,
  MANAGEMENT_ROLES,
  QA_ROLES,
  DEVOPS_ROLES,
  OTHER_ROLES,
  // Action Verbs
  ALL_ACTION_VERBS,
  ENGINEERING_ACTION_VERBS,
  PRODUCT_ACTION_VERBS,
  DESIGN_ACTION_VERBS,
  DATA_ACTION_VERBS,
  MANAGEMENT_ACTION_VERBS,
  QA_ACTION_VERBS,
  DEVOPS_ACTION_VERBS,
  OTHER_ACTION_VERBS,
  // Уровни и категории
  SENIORITY_LEVELS,
  ROLE_CATEGORIES,
  // Утилиты для ролей
  getRoleContext,
  getRoleCategory,
  formatRoleAchievements,
  formatActionVerbs,
  formatAtsKeywords,
  formatLevelFocus
};

/**
 * Экспорт всех промптов
 */
export default {
  resume: RESUME_PROMPTS,
  job: JOB_PROMPTS,
  tailor: TAILOR_PROMPTS,
  coverLetter: COVER_LETTER_PROMPTS,
  chat: CHAT_PROMPTS,
  translation: TRANSLATION_PROMPTS,
  // Утилиты для индустрий (legacy)
  getSummaryPromptForIndustry,
  SUPPORTED_INDUSTRIES,
  // Система ролей (v3)
  roles: ALL_ROLES,
  actionVerbs: ALL_ACTION_VERBS,
  seniorityLevels: SENIORITY_LEVELS,
  roleCategories: ROLE_CATEGORIES,
  // Утилиты для ролей
  getRoleContext,
  getRoleCategory,
  formatRoleAchievements,
  formatActionVerbs,
  formatAtsKeywords
};
