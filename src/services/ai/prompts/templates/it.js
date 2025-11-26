/**
 * Шаблоны промптов для IT индустрии
 * Специфика: технический стек, метрики производительности, архитектура
 */

export const IT_TEMPLATES = {
  /**
   * Структура идеального IT Summary
   */
  summaryStructure: {
    ru: `
Структура Summary для IT-специалиста:
1. [Роль] + [Годы опыта] + [Специализация]
2. [Ключевое достижение с метрикой]
3. [Технический стек (3-5 ключевых технологий)]
4. [Лидерство/Менторство если есть]
`,
    en: `
Structure for IT Professional Summary:
1. [Role] + [Years of experience] + [Specialization]
2. [Key achievement with metric]
3. [Tech stack (3-5 key technologies)]
4. [Leadership/Mentoring if applicable]
`
  },

  /**
   * Ключевые метрики для IT
   */
  metrics: {
    performance: {
      ru: ['сократил время отклика на X%', 'увеличил пропускную способность в X раз', 'оптимизировал запросы, ускорив работу на X%'],
      en: ['reduced response time by X%', 'increased throughput by Xx', 'optimized queries, improving speed by X%']
    },
    scale: {
      ru: ['система обрабатывает X запросов/сек', 'платформа с X активных пользователей', 'инфраструктура на X серверов'],
      en: ['system handles X requests/sec', 'platform with X active users', 'infrastructure of X servers']
    },
    business: {
      ru: ['сэкономил X на инфраструктуре', 'увеличил конверсию на X%', 'сократил time-to-market на X'],
      en: ['saved $X on infrastructure', 'increased conversion by X%', 'reduced time-to-market by X']
    },
    team: {
      ru: ['руководил командой из X человек', 'менторил X junior разработчиков', 'провёл X код-ревью'],
      en: ['led team of X engineers', 'mentored X junior developers', 'conducted X code reviews']
    }
  },

  /**
   * Роли и их особенности
   */
  roles: {
    frontend: {
      focus: ['UI/UX', 'Performance', 'Accessibility', 'Cross-browser'],
      metrics_ru: ['Core Web Vitals', 'время загрузки', 'размер бандла', 'покрытие тестами'],
      metrics_en: ['Core Web Vitals', 'load time', 'bundle size', 'test coverage']
    },
    backend: {
      focus: ['API Design', 'Scalability', 'Security', 'Database'],
      metrics_ru: ['RPS', 'latency', 'uptime', 'throughput'],
      metrics_en: ['RPS', 'latency', 'uptime', 'throughput']
    },
    fullstack: {
      focus: ['End-to-end', 'Architecture', 'Integration', 'DevOps basics'],
      metrics_ru: ['полный цикл разработки', 'от идеи до production'],
      metrics_en: ['full development cycle', 'from idea to production']
    },
    devops: {
      focus: ['CI/CD', 'Infrastructure', 'Monitoring', 'Cost optimization'],
      metrics_ru: ['uptime', 'deployment frequency', 'MTTR', 'cost savings'],
      metrics_en: ['uptime', 'deployment frequency', 'MTTR', 'cost savings']
    },
    mobile: {
      focus: ['iOS/Android', 'Cross-platform', 'Performance', 'Store ratings'],
      metrics_ru: ['рейтинг в сторе', 'crash rate', 'retention', 'DAU/MAU'],
      metrics_en: ['store rating', 'crash rate', 'retention', 'DAU/MAU']
    },
    data: {
      focus: ['ML/AI', 'Analytics', 'Data pipelines', 'Insights'],
      metrics_ru: ['точность модели', 'ROI от модели', 'объём данных'],
      metrics_en: ['model accuracy', 'model ROI', 'data volume processed']
    }
  },

  /**
   * Шаблон промпта для IT Summary
   */
  promptTemplate: (locale, role = 'developer') => `
You are an expert tech resume writer who has helped 1000+ engineers land jobs at FAANG companies.

Your task: Rewrite the Professional Summary for an IT professional.

${locale === 'ru' ? `
СТРУКТУРА (обязательно):
1. [Роль] с [X+ лет] опыта в [специализация]
2. [Главное достижение с метрикой] 
3. Эксперт в [3-5 ключевых технологий]
4. [Лидерство/доп. ценность]

ПРИМЕРЫ МЕТРИК для IT:
- Производительность: "сократил время отклика на 60%", "ускорил сборку в 3 раза"
- Масштаб: "система с 1M+ пользователей", "обрабатывает 10K RPS"
- Бизнес: "сэкономил $200K/год на инфраструктуре"
- Команда: "руководил командой из 5 разработчиков"

ИЗБЕГАТЬ:
- "Коммуникабельный, стрессоустойчивый" - клише
- "Хочу развиваться" - фокус на себе
- "Знаю много технологий" - без конкретики
` : `
STRUCTURE (required):
1. [Role] with [X+ years] of experience in [specialization]
2. [Key achievement with metric]
3. Expert in [3-5 key technologies]
4. [Leadership/additional value]

EXAMPLE METRICS for IT:
- Performance: "reduced response time by 60%", "sped up builds by 3x"
- Scale: "platform with 1M+ users", "handles 10K RPS"
- Business: "saved $200K/year on infrastructure"
- Team: "led team of 5 engineers"

AVOID:
- "Hard-working team player" - clichés
- "Looking to grow" - self-focused
- "Know many technologies" - no specifics
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}
Maximum length: 150 words

IMPORTANT: Return ONLY the improved summary text, no explanations.
`
};

export default IT_TEMPLATES;

