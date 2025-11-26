/**
 * Шаблоны промптов для Finance индустрии
 * Специфика: финансовые метрики, compliance, риск-менеджмент
 */

export const FINANCE_TEMPLATES = {
  /**
   * Структура идеального Finance Summary
   */
  summaryStructure: {
    ru: `
Структура Summary для финансового специалиста:
1. [Роль] + [Годы опыта] + [Специализация/Сектор]
2. [Ключевое достижение с финансовой метрикой]
3. [Экспертиза: регуляторика, инструменты, методологии]
4. [Сертификации/Образование если релевантно]
`,
    en: `
Structure for Finance Professional Summary:
1. [Role] + [Years of experience] + [Specialization/Sector]
2. [Key achievement with financial metric]
3. [Expertise: regulations, tools, methodologies]
4. [Certifications/Education if relevant]
`
  },

  /**
   * Ключевые метрики для Finance
   */
  metrics: {
    revenue: {
      ru: ['увеличил выручку на X%', 'привлёк инвестиций на $X', 'управлял портфелем $X'],
      en: ['increased revenue by X%', 'raised $X in investments', 'managed $X portfolio']
    },
    efficiency: {
      ru: ['сократил издержки на X%', 'оптимизировал процессы, сэкономив X', 'автоматизировал отчётность'],
      en: ['reduced costs by X%', 'optimized processes, saving X', 'automated reporting']
    },
    risk: {
      ru: ['снизил риски на X%', 'внедрил систему риск-контроля', 'обеспечил compliance на 100%'],
      en: ['reduced risk exposure by X%', 'implemented risk control system', 'achieved 100% compliance']
    },
    deals: {
      ru: ['закрыл сделок на $X', 'провёл X M&A транзакций', 'привлёк X клиентов'],
      en: ['closed $X in deals', 'executed X M&A transactions', 'acquired X clients']
    }
  },

  /**
   * Роли и их особенности
   */
  roles: {
    analyst: {
      focus: ['Financial Modeling', 'Valuation', 'Due Diligence', 'Reporting'],
      metrics_ru: ['точность прогнозов', 'скорость подготовки отчётов', 'объём анализируемых данных'],
      metrics_en: ['forecast accuracy', 'report turnaround time', 'data volume analyzed']
    },
    accountant: {
      focus: ['GAAP/IFRS', 'Tax', 'Audit', 'Internal Controls'],
      metrics_ru: ['точность отчётности', 'экономия на налогах', 'результаты аудита'],
      metrics_en: ['reporting accuracy', 'tax savings', 'audit results']
    },
    investment: {
      focus: ['Portfolio Management', 'Asset Allocation', 'Risk Management', 'Returns'],
      metrics_ru: ['доходность портфеля', 'alpha', 'AUM', 'Sharpe ratio'],
      metrics_en: ['portfolio returns', 'alpha', 'AUM', 'Sharpe ratio']
    },
    banking: {
      focus: ['Lending', 'Credit Analysis', 'Relationship Management', 'Products'],
      metrics_ru: ['объём выданных кредитов', 'NPL ratio', 'клиентская база'],
      metrics_en: ['loan volume originated', 'NPL ratio', 'client portfolio']
    },
    fintech: {
      focus: ['Product', 'Technology', 'Compliance', 'Scale'],
      metrics_ru: ['рост пользователей', 'объём транзакций', 'конверсия'],
      metrics_en: ['user growth', 'transaction volume', 'conversion rate']
    }
  },

  /**
   * Важные сертификации
   */
  certifications: ['CFA', 'CPA', 'FRM', 'ACCA', 'CMA', 'Series 7', 'Series 63'],

  /**
   * Шаблон промпта для Finance Summary
   */
  promptTemplate: (locale, role = 'analyst') => `
You are an expert finance resume writer who has helped professionals land roles at top investment banks and financial institutions.

Your task: Rewrite the Professional Summary for a finance professional.

${locale === 'ru' ? `
СТРУКТУРА (обязательно):
1. [Роль] с [X+ лет] опыта в [сектор/специализация]
2. [Главное достижение с финансовой метрикой]
3. Экспертиза в [методологии, инструменты, регуляторика]
4. [Сертификации если есть]

ПРИМЕРЫ МЕТРИК для Finance:
- Результат: "увеличил доходность портфеля на 15%", "привлёк $50M инвестиций"
- Эффективность: "сократил время закрытия на 30%", "автоматизировал 80% отчётности"
- Риск: "снизил NPL на 2%", "обеспечил 100% compliance"
- Масштаб: "управлял портфелем $100M", "обслуживал 200+ корпоративных клиентов"

ОСОБЕННОСТИ:
- Используй профессиональную финансовую терминологию
- Упоминай регуляторные требования если релевантно (МСФО, Basel III, etc.)
- Сертификации (CFA, ACCA) добавляют ценности

ИЗБЕГАТЬ:
- Общих фраз без цифр
- Клише типа "ответственный финансист"
` : `
STRUCTURE (required):
1. [Role] with [X+ years] of experience in [sector/specialization]
2. [Key achievement with financial metric]
3. Expertise in [methodologies, tools, regulations]
4. [Certifications if applicable]

EXAMPLE METRICS for Finance:
- Results: "increased portfolio returns by 15%", "raised $50M in funding"
- Efficiency: "reduced close time by 30%", "automated 80% of reporting"
- Risk: "reduced NPL by 2%", "achieved 100% compliance"
- Scale: "managed $100M portfolio", "served 200+ corporate clients"

KEY POINTS:
- Use professional financial terminology
- Mention regulatory expertise if relevant (GAAP, Basel III, etc.)
- Certifications (CFA, CPA) add value

AVOID:
- Generic phrases without numbers
- Clichés like "detail-oriented finance professional"
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}
Maximum length: 150 words

IMPORTANT: Return ONLY the improved summary text, no explanations.
`
};

export default FINANCE_TEMPLATES;

