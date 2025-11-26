/**
 * Шаблоны промптов для Marketing индустрии
 * Специфика: ROI, конверсии, рост метрик, креатив
 */

export const MARKETING_TEMPLATES = {
  /**
   * Структура идеального Marketing Summary
   */
  summaryStructure: {
    ru: `
Структура Summary для маркетолога:
1. [Роль] + [Годы опыта] + [Специализация/Канал]
2. [Ключевое достижение с метрикой роста]
3. [Экспертиза: каналы, инструменты, методологии]
4. [Бренды/Индустрии с которыми работал]
`,
    en: `
Structure for Marketing Professional Summary:
1. [Role] + [Years of experience] + [Specialization/Channel]
2. [Key achievement with growth metric]
3. [Expertise: channels, tools, methodologies]
4. [Brands/Industries worked with]
`
  },

  /**
   * Ключевые метрики для Marketing
   */
  metrics: {
    growth: {
      ru: ['увеличил трафик на X%', 'вырастил аудиторию с X до Y', 'повысил узнаваемость бренда на X%'],
      en: ['increased traffic by X%', 'grew audience from X to Y', 'boosted brand awareness by X%']
    },
    conversion: {
      ru: ['повысил конверсию на X%', 'увеличил CTR с X% до Y%', 'снизил CAC на X%'],
      en: ['increased conversion by X%', 'improved CTR from X% to Y%', 'reduced CAC by X%']
    },
    revenue: {
      ru: ['принёс $X в выручке', 'ROI кампаний X%', 'увеличил LTV на X%'],
      en: ['generated $X in revenue', 'achieved X% campaign ROI', 'increased LTV by X%']
    },
    engagement: {
      ru: ['увеличил engagement на X%', 'вырастил email open rate до X%', 'достиг X подписчиков'],
      en: ['increased engagement by X%', 'grew email open rate to X%', 'reached X followers']
    }
  },

  /**
   * Роли и их особенности
   */
  roles: {
    digital: {
      focus: ['Performance', 'PPC', 'SEO', 'Analytics'],
      metrics_ru: ['ROAS', 'CPA', 'трафик', 'конверсия'],
      metrics_en: ['ROAS', 'CPA', 'traffic', 'conversion']
    },
    content: {
      focus: ['Content Strategy', 'SEO', 'Storytelling', 'Editorial'],
      metrics_ru: ['органический трафик', 'engagement', 'shares', 'rankings'],
      metrics_en: ['organic traffic', 'engagement', 'shares', 'rankings']
    },
    brand: {
      focus: ['Brand Strategy', 'Positioning', 'Creative', 'Research'],
      metrics_ru: ['узнаваемость', 'NPS', 'brand lift', 'sentiment'],
      metrics_en: ['awareness', 'NPS', 'brand lift', 'sentiment']
    },
    growth: {
      focus: ['Acquisition', 'Retention', 'Experimentation', 'Data'],
      metrics_ru: ['MAU/DAU', 'retention', 'virality', 'activation'],
      metrics_en: ['MAU/DAU', 'retention', 'virality', 'activation']
    },
    product_marketing: {
      focus: ['GTM', 'Positioning', 'Competitive', 'Sales Enablement'],
      metrics_ru: ['launch metrics', 'win rate', 'pipeline influence'],
      metrics_en: ['launch metrics', 'win rate', 'pipeline influence']
    },
    smm: {
      focus: ['Social Media', 'Community', 'Influencers', 'Content'],
      metrics_ru: ['followers', 'engagement rate', 'reach', 'virality'],
      metrics_en: ['followers', 'engagement rate', 'reach', 'virality']
    }
  },

  /**
   * Инструменты по категориям
   */
  tools: {
    analytics: ['Google Analytics', 'Mixpanel', 'Amplitude', 'Tableau'],
    advertising: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Яндекс.Директ'],
    automation: ['HubSpot', 'Marketo', 'Mailchimp', 'Salesforce'],
    seo: ['Ahrefs', 'SEMrush', 'Moz', 'Screaming Frog'],
    social: ['Hootsuite', 'Buffer', 'Sprout Social', 'Later']
  },

  /**
   * Шаблон промпта для Marketing Summary
   */
  promptTemplate: (locale, role = 'digital') => `
You are an expert marketing resume writer who has helped professionals land roles at top brands and agencies.

Your task: Rewrite the Professional Summary for a marketing professional.

${locale === 'ru' ? `
СТРУКТУРА (обязательно):
1. [Роль] с [X+ лет] опыта в [специализация/канал]
2. [Главное достижение с метрикой роста/ROI]
3. Экспертиза в [каналы, инструменты]
4. [Бренды/масштаб кампаний]

ПРИМЕРЫ МЕТРИК для Marketing:
- Рост: "увеличил органический трафик на 200%", "вырастил аудиторию до 500K"
- Конверсия: "повысил конверсию на 45%", "снизил CAC на 30%"
- Деньги: "управлял бюджетом $2M", "ROAS 400%", "принёс $5M выручки"
- Engagement: "достиг 10% engagement rate", "собрал 100K подписчиков"

ОСОБЕННОСТИ:
- Маркетинг любит конкретные цифры роста
- Упоминай бренды/кампании если можно
- Покажи понимание воронки и бизнес-метрик

ИЗБЕГАТЬ:
- "Креативный маркетолог" без доказательств
- Списка инструментов без результатов
- Фокуса на процессе вместо результата
` : `
STRUCTURE (required):
1. [Role] with [X+ years] of experience in [specialization/channel]
2. [Key achievement with growth/ROI metric]
3. Expertise in [channels, tools]
4. [Brands/campaign scale]

EXAMPLE METRICS for Marketing:
- Growth: "increased organic traffic by 200%", "grew audience to 500K"
- Conversion: "improved conversion by 45%", "reduced CAC by 30%"
- Revenue: "managed $2M budget", "achieved 400% ROAS", "generated $5M revenue"
- Engagement: "achieved 10% engagement rate", "built 100K follower base"

KEY POINTS:
- Marketing loves specific growth numbers
- Mention brands/campaigns if possible
- Show understanding of funnel and business metrics

AVOID:
- "Creative marketer" without proof
- Tool lists without results
- Focus on process instead of outcomes
`}

Output Language: ${locale === 'ru' ? 'Russian' : 'English'}
Maximum length: 150 words

IMPORTANT: Return ONLY the improved summary text, no explanations.
`
};

export default MARKETING_TEMPLATES;

