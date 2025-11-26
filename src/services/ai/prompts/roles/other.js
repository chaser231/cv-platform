/**
 * Other IT Roles
 * Technical Writer, Solutions Architect, Business Analyst, IT Recruiter, etc.
 */

export const OTHER_ROLES = {
  // ============================================
  // SOLUTIONS ARCHITECT
  // ============================================
  solutions_architect: {
    id: 'solutions_architect',
    title: {
      ru: 'Solutions Architect',
      en: 'Solutions Architect'
    },
    aliases: ['Technical Architect', 'Enterprise Architect', 'Software Architect'],
    
    skills: {
      core: ['System Design', 'Cloud Architecture', 'Integration Patterns', 'Technical Leadership'],
      advanced: ['Enterprise Architecture', 'TOGAF', 'Cost Modeling', 'Vendor Evaluation'],
      soft: ['Stakeholder communication', 'Technical sales', 'Presentation skills']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Спроектировал архитектуру для 5 enterprise проектов',
            'Провёл 20+ technical discovery sessions с клиентами',
            'Создал reference architectures для 3 use cases',
            'Получил AWS Solutions Architect Professional certification'
          ],
          en: [
            'Designed architecture for 5 enterprise projects',
            'Conducted 20+ technical discovery sessions with clients',
            'Created reference architectures for 3 use cases',
            'Obtained AWS Solutions Architect Professional certification'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал системы для клиентов с суммарной выручкой $100M+',
            'Возглавил архитектурную практику из 5 архитекторов',
            'Выиграл 10+ deals через technical leadership ($5M+ TCV)',
            'Создал Architecture Review Board для governance'
          ],
          en: [
            'Designed systems for clients with combined $100M+ revenue',
            'Led architecture practice of 5 architects',
            'Won 10+ deals through technical leadership ($5M+ TCV)',
            'Established Architecture Review Board for governance'
          ]
        }
      }
    },
    
    atsKeywords: ['Solutions Architecture', 'System Design', 'Cloud Architecture', 'AWS', 'Azure', 'Enterprise Architecture', 'Technical Leadership', 'Integration', 'TOGAF']
  },

  // ============================================
  // TECHNICAL WRITER
  // ============================================
  technical_writer: {
    id: 'technical_writer',
    title: {
      ru: 'Technical Writer',
      en: 'Technical Writer'
    },
    aliases: ['Documentation Engineer', 'Content Developer', 'API Documentation Specialist'],
    
    skills: {
      core: ['Technical Writing', 'Documentation', 'Markdown', 'API Docs', 'User Guides'],
      advanced: ['Docs-as-Code', 'Content Strategy', 'Information Architecture', 'Localization'],
      soft: ['Clarity', 'Attention to detail', 'Collaboration with engineers']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Написал документацию для 50+ API endpoints',
            'Снизил support tickets на 40% через improved docs',
            'Создал onboarding guide, сократив time-to-first-value на 50%',
            'Внедрил docs-as-code подход с Git и CI/CD'
          ],
          en: [
            'Wrote documentation for 50+ API endpoints',
            'Reduced support tickets by 40% through improved docs',
            'Created onboarding guide, reducing time-to-first-value by 50%',
            'Implemented docs-as-code approach with Git and CI/CD'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил documentation platform для 200+ docs',
            'Возглавил команду из 4 technical writers',
            'Внедрил content strategy, улучшив doc NPS с 50 до 80',
            'Создал style guide, унифицировав 500+ документов'
          ],
          en: [
            'Built documentation platform for 200+ docs',
            'Led team of 4 technical writers',
            'Implemented content strategy, improving doc NPS from 50 to 80',
            'Created style guide, standardizing 500+ documents'
          ]
        }
      }
    },
    
    atsKeywords: ['Technical Writing', 'Documentation', 'API Documentation', 'Markdown', 'Docs-as-Code', 'Content Strategy', 'User Guides', 'Developer Documentation']
  },

  // ============================================
  // BUSINESS ANALYST (IT)
  // ============================================
  business_analyst: {
    id: 'business_analyst',
    title: {
      ru: 'Business Analyst',
      en: 'Business Analyst'
    },
    aliases: ['BA', 'Systems Analyst', 'Requirements Analyst'],
    
    skills: {
      core: ['Requirements Analysis', 'Process Modeling', 'BPMN', 'User Stories', 'Stakeholder Management'],
      advanced: ['Data Analysis', 'SQL', 'Business Case', 'Change Management'],
      soft: ['Facilitation', 'Communication', 'Analytical thinking']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Собрал и документировал требования для 10 проектов',
            'Провёл 100+ stakeholder interviews',
            'Создал 50+ process maps (BPMN)',
            'Сократил requirements churn на 30% через improved analysis'
          ],
          en: [
            'Gathered and documented requirements for 10 projects',
            'Conducted 100+ stakeholder interviews',
            'Created 50+ process maps (BPMN)',
            'Reduced requirements churn by 30% through improved analysis'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Возглавил BA practice из 5 аналитиков',
            'Разработал requirements framework, сокративший rework на 40%',
            'Построил business case для $5M проекта трансформации',
            'Внедрил Agile BA практики в 3 командах'
          ],
          en: [
            'Led BA practice of 5 analysts',
            'Developed requirements framework reducing rework by 40%',
            'Built business case for $5M transformation project',
            'Implemented Agile BA practices in 3 teams'
          ]
        }
      }
    },
    
    atsKeywords: ['Business Analysis', 'Requirements', 'BPMN', 'User Stories', 'Stakeholder Management', 'Process Modeling', 'SQL', 'Agile', 'JIRA', 'Confluence']
  },

  // ============================================
  // IT RECRUITER (TECH)
  // ============================================
  tech_recruiter: {
    id: 'tech_recruiter',
    title: {
      ru: 'Tech Recruiter',
      en: 'Tech Recruiter'
    },
    aliases: ['Technical Recruiter', 'IT Recruiter', 'Engineering Recruiter', 'Talent Acquisition'],
    
    skills: {
      core: ['Sourcing', 'Screening', 'Technical Assessment', 'ATS', 'LinkedIn Recruiter'],
      advanced: ['Employer Branding', 'Compensation', 'Diversity Hiring', 'Recruitment Marketing'],
      soft: ['Relationship building', 'Negotiation', 'Technical understanding']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Нанял 50+ инженеров за год с 90% retention rate',
            'Сократил time-to-hire с 45 до 25 дней',
            'Построил talent pipeline из 500+ кандидатов',
            'Достиг 85% offer acceptance rate'
          ],
          en: [
            'Hired 50+ engineers per year with 90% retention rate',
            'Reduced time-to-hire from 45 to 25 days',
            'Built talent pipeline of 500+ candidates',
            'Achieved 85% offer acceptance rate'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Руководил recruiting team из 5 рекрутеров',
            'Масштабировал инженерный найм с 20 до 100 человек/год',
            'Внедрил structured interviewing, повысив quality of hire',
            'Построил employer brand, увеличив inbound applications на 200%'
          ],
          en: [
            'Led recruiting team of 5 recruiters',
            'Scaled engineering hiring from 20 to 100 per year',
            'Implemented structured interviewing, improving quality of hire',
            'Built employer brand, increasing inbound applications by 200%'
          ]
        }
      }
    },
    
    atsKeywords: ['Technical Recruiting', 'Talent Acquisition', 'Sourcing', 'LinkedIn', 'ATS', 'Engineering Hiring', 'Employer Branding', 'Interviewing']
  },

  // ============================================
  // CUSTOMER SUCCESS MANAGER (TECH)
  // ============================================
  customer_success: {
    id: 'customer_success',
    title: {
      ru: 'Customer Success Manager',
      en: 'Customer Success Manager'
    },
    aliases: ['CSM', 'Client Success', 'Account Manager (Tech)'],
    
    skills: {
      core: ['Account Management', 'Onboarding', 'Renewal Management', 'Upselling', 'Product Knowledge'],
      advanced: ['Health Scoring', 'Churn Prevention', 'Expansion Revenue', 'QBRs'],
      soft: ['Relationship building', 'Problem-solving', 'Empathy']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Управлял портфелем из 50 accounts ($3M ARR)',
            'Достиг 95% renewal rate (превысил target на 10%)',
            'Увеличил expansion revenue на 30% через upsell',
            'Снизил time-to-value с 90 до 30 дней'
          ],
          en: [
            'Managed portfolio of 50 accounts ($3M ARR)',
            'Achieved 95% renewal rate (exceeded target by 10%)',
            'Increased expansion revenue by 30% through upsell',
            'Reduced time-to-value from 90 to 30 days'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Управлял enterprise accounts с $10M+ ARR',
            'Построил CS team из 6 CSMs',
            'Внедрил health scoring, предотвратив $2M churn',
            'Увеличил NPS с 30 до 60 для managed accounts'
          ],
          en: [
            'Managed enterprise accounts with $10M+ ARR',
            'Built CS team of 6 CSMs',
            'Implemented health scoring, preventing $2M churn',
            'Increased NPS from 30 to 60 for managed accounts'
          ]
        }
      }
    },
    
    atsKeywords: ['Customer Success', 'Account Management', 'SaaS', 'Renewal', 'Upsell', 'NPS', 'Churn Prevention', 'Onboarding', 'QBR']
  },

  // ============================================
  // GROWTH MARKETER
  // ============================================
  growth_marketer: {
    id: 'growth_marketer',
    title: {
      ru: 'Growth Marketer',
      en: 'Growth Marketer'
    },
    aliases: ['Growth Marketing Manager', 'Performance Marketer', 'Demand Gen'],
    
    skills: {
      core: ['Paid Acquisition', 'SEO', 'Analytics', 'A/B Testing', 'Marketing Automation'],
      advanced: ['Attribution', 'LTV/CAC Modeling', 'Funnel Optimization', 'PLG'],
      soft: ['Data-driven mindset', 'Experimentation', 'Creativity']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Управлял paid media бюджетом $500K с ROAS 4:1',
            'Увеличил organic traffic на 200% за 12 месяцев',
            'Снизил CAC на 40% через channel mix optimization',
            'Запустил 50+ growth experiments с 70% win rate'
          ],
          en: [
            'Managed $500K paid media budget with 4:1 ROAS',
            'Increased organic traffic by 200% in 12 months',
            'Reduced CAC by 40% through channel mix optimization',
            'Launched 50+ growth experiments with 70% win rate'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил growth team из 5 маркетологов',
            'Масштабировал acquisition с $1M до $10M ARR',
            'Внедрил PLG motion, снизив CAC на 60%',
            'Построил attribution model для multi-touch journey'
          ],
          en: [
            'Built growth team of 5 marketers',
            'Scaled acquisition from $1M to $10M ARR',
            'Implemented PLG motion, reducing CAC by 60%',
            'Built attribution model for multi-touch journey'
          ]
        }
      }
    },
    
    atsKeywords: ['Growth Marketing', 'Performance Marketing', 'Paid Media', 'SEO', 'Analytics', 'A/B Testing', 'Marketing Automation', 'HubSpot', 'Google Ads', 'Facebook Ads', 'PLG']
  },

  // ============================================
  // PRODUCT MARKETING MANAGER
  // ============================================
  product_marketing: {
    id: 'product_marketing',
    title: {
      ru: 'Product Marketing Manager',
      en: 'Product Marketing Manager'
    },
    aliases: ['PMM', 'Product Marketer', 'GTM Manager'],
    
    skills: {
      core: ['Go-to-Market', 'Positioning', 'Messaging', 'Competitive Analysis', 'Sales Enablement'],
      advanced: ['Market Research', 'Pricing Strategy', 'Analyst Relations', 'Launch Management'],
      soft: ['Storytelling', 'Cross-functional collaboration', 'Strategic thinking']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Запустил 5 продуктов с GTM strategy',
            'Создал sales enablement materials, увеличив win rate на 20%',
            'Провёл competitive analysis для 10 конкурентов',
            'Разработал messaging framework, unified across marketing'
          ],
          en: [
            'Launched 5 products with GTM strategy',
            'Created sales enablement materials, increasing win rate by 20%',
            'Conducted competitive analysis for 10 competitors',
            'Developed messaging framework unified across marketing'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Руководил PMM team из 4 человек',
            'Провёл repositioning, увеличивший pipeline на $5M',
            'Построил analyst relations program (Gartner, Forrester)',
            'Запустил pricing strategy, увеличившую ACV на 30%'
          ],
          en: [
            'Led PMM team of 4 people',
            'Led repositioning that increased pipeline by $5M',
            'Built analyst relations program (Gartner, Forrester)',
            'Launched pricing strategy that increased ACV by 30%'
          ]
        }
      }
    },
    
    atsKeywords: ['Product Marketing', 'Go-to-Market', 'Positioning', 'Messaging', 'Sales Enablement', 'Competitive Analysis', 'Launch Management', 'B2B', 'SaaS']
  }
};

/**
 * Action verbs для Other roles
 */
export const OTHER_ACTION_VERBS = {
  ru: {
    creation: ['Создал', 'Разработал', 'Построил', 'Написал', 'Спроектировал'],
    leadership: ['Руководил', 'Возглавил', 'Координировал', 'Управлял'],
    improvement: ['Улучшил', 'Оптимизировал', 'Увеличил', 'Снизил', 'Повысил'],
    delivery: ['Запустил', 'Внедрил', 'Достиг', 'Обеспечил']
  },
  en: {
    creation: ['Created', 'Developed', 'Built', 'Wrote', 'Designed'],
    leadership: ['Led', 'Headed', 'Coordinated', 'Managed', 'Directed'],
    improvement: ['Improved', 'Optimized', 'Increased', 'Reduced', 'Enhanced'],
    delivery: ['Launched', 'Implemented', 'Achieved', 'Delivered', 'Enabled']
  }
};

export default OTHER_ROLES;

