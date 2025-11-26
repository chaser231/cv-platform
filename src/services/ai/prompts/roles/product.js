/**
 * Product Roles
 * Product Manager, Product Owner, Growth PM, Technical PM, etc.
 */

export const PRODUCT_ROLES = {
  // ============================================
  // PRODUCT MANAGER
  // ============================================
  product_manager: {
    id: 'product_manager',
    title: {
      ru: 'Product Manager',
      en: 'Product Manager'
    },
    aliases: ['PM', 'Product Lead', 'Product Director', 'Head of Product'],
    
    skills: {
      core: ['Product Strategy', 'Roadmap Planning', 'User Research', 'Data Analysis', 'Prioritization'],
      advanced: ['A/B Testing', 'SQL', 'Product Analytics', 'Competitive Analysis', 'Go-to-Market'],
      soft: ['Stakeholder Management', 'Cross-functional Leadership', 'Communication', 'Negotiation']
    },
    
    levels: {
      junior: {
        title: { ru: 'Associate PM / Junior PM', en: 'Associate PM / Junior PM' },
        focus: ['Feature specs', 'User stories', 'Basic analytics', 'Competitor research'],
        metrics: ['Features shipped', 'Sprint velocity', 'Bug backlog'],
        achievements: {
          ru: [
            'Запустил 5 фич, увеличивших engagement на 15%',
            'Провёл 20+ custdev-интервью, выявив 3 ключевых pain point',
            'Написал 50+ user stories для 2 эпиков',
            'Сократил время согласования спецификаций на 30%'
          ],
          en: [
            'Shipped 5 features that increased engagement by 15%',
            'Conducted 20+ customer interviews, identifying 3 key pain points',
            'Wrote 50+ user stories for 2 epics',
            'Reduced spec approval time by 30%'
          ]
        }
      },
      middle: {
        title: { ru: 'Product Manager', en: 'Product Manager' },
        focus: ['Product area ownership', 'Metrics-driven decisions', 'A/B testing', 'Stakeholder alignment'],
        metrics: ['Conversion rate', 'Retention', 'Revenue impact', 'NPS'],
        achievements: {
          ru: [
            'Увеличил конверсию регистрации с 5% до 12% (+140%) через оптимизацию онбординга',
            'Запустил программу лояльности, повысившую retention на 25%',
            'Управлял roadmap продукта с 500K MAU',
            'Провёл 15 A/B тестов, увеличив выручку на $2M/год'
          ],
          en: [
            'Increased signup conversion from 5% to 12% (+140%) through onboarding optimization',
            'Launched loyalty program that improved retention by 25%',
            'Managed product roadmap for 500K MAU product',
            'Ran 15 A/B tests, increasing revenue by $2M/year'
          ]
        }
      },
      senior: {
        title: { ru: 'Senior PM / Lead PM', en: 'Senior PM / Lead PM' },
        focus: ['Product vision', 'Team leadership', 'Strategy', 'P&L ownership'],
        metrics: ['ARR/MRR', 'CAC', 'LTV', 'Market share'],
        achievements: {
          ru: [
            'Вывел продукт с 0 до $5M ARR за 18 месяцев',
            'Построил и руководил командой из 3 PM и 15 инженеров',
            'Снизил CAC на 40% через product-led growth стратегию',
            'Увеличил LTV на 60% за счёт новой системы монетизации'
          ],
          en: [
            'Grew product from 0 to $5M ARR in 18 months',
            'Built and led team of 3 PMs and 15 engineers',
            'Reduced CAC by 40% through product-led growth strategy',
            'Increased LTV by 60% with new monetization system'
          ]
        }
      },
      director: {
        title: { ru: 'Director of Product / VP Product', en: 'Director of Product / VP Product' },
        focus: ['Portfolio strategy', 'Org design', 'Executive alignment', 'Market positioning'],
        metrics: ['Portfolio revenue', 'Team performance', 'Strategic milestones'],
        achievements: {
          ru: [
            'Управлял портфелем продуктов с совокупной выручкой $50M',
            'Масштабировал продуктовую команду с 5 до 25 человек',
            'Запустил 3 новых продукта, 2 из которых стали profitable в первый год',
            'Провёл pivot, увеличивший рыночную долю с 5% до 20%'
          ],
          en: [
            'Managed product portfolio with $50M combined revenue',
            'Scaled product team from 5 to 25 members',
            'Launched 3 new products, 2 became profitable in year one',
            'Led pivot that increased market share from 5% to 20%'
          ]
        }
      }
    },
    
    atsKeywords: ['Product Management', 'Roadmap', 'User Research', 'A/B Testing', 'Agile', 'Scrum', 'JIRA', 'Data-driven', 'Metrics', 'KPIs', 'OKRs', 'PRD', 'Go-to-Market', 'Product Strategy', 'Customer Development', 'Prioritization', 'Stakeholder Management']
  },

  // ============================================
  // PRODUCT OWNER
  // ============================================
  product_owner: {
    id: 'product_owner',
    title: {
      ru: 'Product Owner',
      en: 'Product Owner'
    },
    aliases: ['PO', 'Scrum Product Owner'],
    
    skills: {
      core: ['Backlog Management', 'Sprint Planning', 'User Stories', 'Acceptance Criteria', 'Scrum'],
      advanced: ['Agile Metrics', 'Stakeholder Management', 'Release Planning', 'Value Prioritization'],
      soft: ['Facilitation', 'Negotiation', 'Clear Communication']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Управлял backlog из 200+ user stories для команды из 8 разработчиков',
            'Увеличил velocity команды на 30% через улучшение качества описания задач',
            'Сократил time-to-market новых фич с 6 до 4 недель',
            'Достиг 95% acceptance rate для delivered фич'
          ],
          en: [
            'Managed backlog of 200+ user stories for team of 8 developers',
            'Increased team velocity by 30% through improved story quality',
            'Reduced feature time-to-market from 6 to 4 weeks',
            'Achieved 95% acceptance rate for delivered features'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Владел roadmap для 3 scrum-команд (25 человек)',
            'Внедрил систему приоритизации, увеличившую business value на 40%',
            'Снизил количество спринтов с незавершёнными задачами с 40% до 10%',
            'Обучил 5 новых PO методологии работы с backlog'
          ],
          en: [
            'Owned roadmap for 3 scrum teams (25 people)',
            'Implemented prioritization system that increased business value by 40%',
            'Reduced incomplete sprint rate from 40% to 10%',
            'Trained 5 new POs on backlog management methodology'
          ]
        }
      }
    },
    
    atsKeywords: ['Product Owner', 'Scrum', 'Backlog', 'User Stories', 'Sprint Planning', 'Agile', 'JIRA', 'Acceptance Criteria', 'Prioritization', 'Stakeholder Management']
  },

  // ============================================
  // GROWTH PRODUCT MANAGER
  // ============================================
  growth_pm: {
    id: 'growth_pm',
    title: {
      ru: 'Growth Product Manager',
      en: 'Growth Product Manager'
    },
    aliases: ['Growth PM', 'Growth Lead', 'Head of Growth'],
    
    skills: {
      core: ['Funnel Analysis', 'A/B Testing', 'User Acquisition', 'Retention', 'Activation'],
      advanced: ['SQL', 'Amplitude', 'Mixpanel', 'Statistical Analysis', 'Experimentation'],
      soft: ['Hypothesis-driven mindset', 'Fast iteration', 'Data storytelling']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Увеличил DAU с 50K до 200K за 12 месяцев (+300%)',
            'Оптимизировал воронку активации, повысив activation rate с 20% до 45%',
            'Запустил 50+ A/B экспериментов с 70% win rate',
            'Снизил churn на 25% через персонализированный onboarding'
          ],
          en: [
            'Grew DAU from 50K to 200K in 12 months (+300%)',
            'Optimized activation funnel, improving activation rate from 20% to 45%',
            'Launched 50+ A/B experiments with 70% win rate',
            'Reduced churn by 25% through personalized onboarding'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил growth-команду из 8 человек (PM, аналитики, инженеры)',
            'Увеличил конверсию в платящих с 2% до 8% (+300%)',
            'Внедрил систему экспериментов, позволяющую запускать 20+ тестов в неделю',
            'Привёл к росту revenue на $10M через growth initiatives'
          ],
          en: [
            'Built growth team of 8 (PM, analysts, engineers)',
            'Increased paying conversion from 2% to 8% (+300%)',
            'Implemented experimentation platform enabling 20+ tests/week',
            'Drove $10M revenue growth through growth initiatives'
          ]
        }
      }
    },
    
    atsKeywords: ['Growth', 'A/B Testing', 'Funnel Optimization', 'User Acquisition', 'Retention', 'Activation', 'Experimentation', 'Analytics', 'SQL', 'Amplitude', 'Mixpanel', 'AARRR', 'North Star Metric']
  },

  // ============================================
  // TECHNICAL PRODUCT MANAGER
  // ============================================
  technical_pm: {
    id: 'technical_pm',
    title: {
      ru: 'Technical Product Manager',
      en: 'Technical Product Manager'
    },
    aliases: ['TPM', 'Platform PM', 'Infrastructure PM', 'API PM'],
    
    skills: {
      core: ['Technical Architecture', 'API Design', 'Platform Strategy', 'Developer Experience'],
      advanced: ['System Design', 'Technical Specs', 'Integration Planning', 'Performance Metrics'],
      soft: ['Technical Communication', 'Engineering Partnership']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Запустил публичный API, привлекший 500+ разработчиков за 6 месяцев',
            'Сократил время интеграции партнёров с 4 недель до 3 дней',
            'Определил техническую стратегию для платформы с 1M API calls/day',
            'Снизил технический долг на 40% через приоритизацию платформенных задач'
          ],
          en: [
            'Launched public API that attracted 500+ developers in 6 months',
            'Reduced partner integration time from 4 weeks to 3 days',
            'Defined technical strategy for platform with 1M API calls/day',
            'Reduced technical debt by 40% through platform task prioritization'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал платформу, которую используют 10+ внутренних продуктов',
            'Увеличил developer adoption на 200% через улучшение DX',
            'Управлял roadmap платформы с 20 инженерами',
            'Провёл миграцию на новую архитектуру без downtime для 50+ клиентов'
          ],
          en: [
            'Architected platform used by 10+ internal products',
            'Increased developer adoption by 200% through DX improvements',
            'Managed platform roadmap with 20 engineers',
            'Led migration to new architecture with zero downtime for 50+ clients'
          ]
        }
      }
    },
    
    atsKeywords: ['Technical PM', 'API', 'Platform', 'Developer Experience', 'Technical Architecture', 'System Design', 'Integration', 'Technical Strategy', 'Infrastructure']
  }
};

/**
 * Action verbs для Product
 */
export const PRODUCT_ACTION_VERBS = {
  ru: {
    strategy: ['Определил', 'Разработал', 'Сформулировал', 'Спланировал'],
    execution: ['Запустил', 'Вывел', 'Реализовал', 'Внедрил', 'Достиг'],
    growth: ['Увеличил', 'Вырастил', 'Масштабировал', 'Повысил', 'Ускорил'],
    leadership: ['Руководил', 'Построил', 'Возглавил', 'Координировал'],
    analysis: ['Проанализировал', 'Исследовал', 'Выявил', 'Оптимизировал']
  },
  en: {
    strategy: ['Defined', 'Developed', 'Formulated', 'Planned', 'Established'],
    execution: ['Launched', 'Shipped', 'Delivered', 'Implemented', 'Achieved'],
    growth: ['Increased', 'Grew', 'Scaled', 'Improved', 'Accelerated', 'Boosted'],
    leadership: ['Led', 'Built', 'Managed', 'Coordinated', 'Directed'],
    analysis: ['Analyzed', 'Researched', 'Identified', 'Optimized', 'Discovered']
  }
};

export default PRODUCT_ROLES;

