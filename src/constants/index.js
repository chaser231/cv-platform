/**
 * Константы приложения
 */

// Поддерживаемые языки
export const SUPPORTED_LOCALES = {
  RU: 'ru',
  EN: 'en'
};

// Статусы откликов
export const JOB_APPLICATION_STATUS = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected'
};

// Тоны для Cover Letter
export const COVER_LETTER_TONES = {
  FORMAL: 'formal',
  CASUAL: 'casual',
  ENTHUSIASTIC: 'enthusiastic'
};

// Уровни навыков/языков
export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
};

export const LANGUAGE_LEVELS = {
  NATIVE: 'native',
  FLUENT: 'fluent',
  INTERMEDIATE: 'intermediate',
  BASIC: 'basic'
};

// Планы подписки
export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};

// Лимиты планов
export const PLAN_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE]: {
    aiRequestsPerDay: 3,
    jobTailoring: false,
    templates: ['modern'],
    watermark: true
  },
  [SUBSCRIPTION_PLANS.PRO]: {
    aiRequestsPerDay: Infinity,
    jobTailoring: true,
    templates: ['modern', 'latex', 'classic'],
    watermark: false
  },
  [SUBSCRIPTION_PLANS.ENTERPRISE]: {
    aiRequestsPerDay: Infinity,
    jobTailoring: true,
    templates: ['modern', 'latex', 'classic', 'creative'],
    watermark: false,
    customTemplates: true,
    apiAccess: true
  }
};

// Шаблоны резюме
export const RESUME_TEMPLATES = {
  MODERN: 'modern',
  LATEX: 'latex',
  CLASSIC: 'classic',
  CREATIVE: 'creative'
};

// Размеры A4 в mm
export const A4_SIZE = {
  WIDTH: 210,
  HEIGHT: 297,
  PADDING: 15
};

// Лимиты контента
export const CONTENT_LIMITS = {
  SUMMARY_MAX_WORDS: 150,
  COVER_LETTER_MAX_WORDS: 200,
  BULLET_POINT_MAX_CHARS: 200
};

// AI модели
export const AI_MODELS = {
  GPT4O: 'gpt-4o',
  GPT4O_MINI: 'gpt-4o-mini',
  CLAUDE: 'claude-3-5-sonnet-20241022'
};

// Секции профиля
export const PROFILE_SECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  EDUCATION: 'education',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  LANGUAGES: 'languages'
};

// Роуты приложения (для будущего Next.js)
export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/app/dashboard',
  MASTER_PROFILE: '/app/profile',
  JOBS: '/app/jobs',
  NEW_JOB: '/app/jobs/new',
  JOB_DETAIL: (id) => `/app/jobs/${id}`,
  JOB_RESUME: (id) => `/app/jobs/${id}/resume`,
  JOB_LETTER: (id) => `/app/jobs/${id}/letter`,
  SETTINGS: '/app/settings'
};

// Дебаунс тайминги (ms)
export const DEBOUNCE_DELAYS = {
  AUTOSAVE: 1000,
  SEARCH: 300,
  LIVE_PREVIEW: 500
};

// Локальное хранилище ключи
export const LOCAL_STORAGE_KEYS = {
  LANGUAGE: 'appLanguage',
  THEME: 'appTheme',
  MASTER_PROFILE: 'cv-master-profile',
  USER_TOKEN: 'userToken'
};

