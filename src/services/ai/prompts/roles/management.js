/**
 * Management Roles
 * Engineering Manager, Project Manager, Scrum Master, Agile Coach, CTO, etc.
 */

export const MANAGEMENT_ROLES = {
  // ============================================
  // ENGINEERING MANAGER
  // ============================================
  engineering_manager: {
    id: 'engineering_manager',
    title: {
      ru: 'Engineering Manager',
      en: 'Engineering Manager'
    },
    aliases: ['EM', 'Dev Manager', 'Software Development Manager', 'Tech Manager'],
    
    skills: {
      core: ['People Management', 'Technical Leadership', 'Hiring', 'Performance Management', 'Agile'],
      advanced: ['Org Design', 'Strategy', 'Budget Management', 'Cross-functional Leadership'],
      soft: ['Coaching', 'Conflict resolution', 'Communication', 'Empathy']
    },
    
    levels: {
      manager: {
        title: { ru: 'Engineering Manager', en: 'Engineering Manager' },
        focus: ['Team management', 'Hiring', 'Career development', 'Delivery'],
        achievements: {
          ru: [
            'Руководил командой из 8 инженеров, достигнув 95% retention rate',
            'Нанял 10 инженеров, построив команду с нуля за 6 месяцев',
            'Внедрил performance review систему, повысив clarity ожиданий на 80%',
            'Увеличил velocity команды на 40% через улучшение процессов',
            'Провёл 2 junior инженеров до middle за 12 месяцев'
          ],
          en: [
            'Led team of 8 engineers, achieving 95% retention rate',
            'Hired 10 engineers, building team from scratch in 6 months',
            'Implemented performance review system, improving expectation clarity by 80%',
            'Increased team velocity by 40% through process improvements',
            'Promoted 2 juniors to mid-level within 12 months'
          ]
        }
      },
      senior_manager: {
        title: { ru: 'Senior EM / Manager of Managers', en: 'Senior EM / Manager of Managers' },
        focus: ['Multiple teams', 'Manager development', 'Org strategy'],
        achievements: {
          ru: [
            'Руководил 3 командами (25 инженеров) с 4 tech leads',
            'Построил hiring pipeline, сократив time-to-hire с 60 до 30 дней',
            'Внедрил engineering ladder, повысив retention с 70% до 90%',
            'Сократил tech debt на 50% без снижения velocity'
          ],
          en: [
            'Managed 3 teams (25 engineers) with 4 tech leads',
            'Built hiring pipeline reducing time-to-hire from 60 to 30 days',
            'Implemented engineering ladder, improving retention from 70% to 90%',
            'Reduced tech debt by 50% without impacting velocity'
          ]
        }
      },
      director: {
        title: { ru: 'Director of Engineering / VP Engineering', en: 'Director of Engineering / VP Engineering' },
        focus: ['Engineering org', 'Technical strategy', 'Executive alignment', 'Budget'],
        achievements: {
          ru: [
            'Возглавил инженерную организацию из 50+ человек',
            'Определил техническую стратегию, сократив time-to-market на 50%',
            'Управлял бюджетом $5M на инженерию и инфраструктуру',
            'Построил инженерную культуру, попав в топ-10 tech компаний по Glassdoor'
          ],
          en: [
            'Led engineering organization of 50+ people',
            'Defined technical strategy reducing time-to-market by 50%',
            'Managed $5M engineering and infrastructure budget',
            'Built engineering culture, ranking in top 10 tech companies on Glassdoor'
          ]
        }
      }
    },
    
    atsKeywords: ['Engineering Management', 'People Management', 'Hiring', 'Agile', 'Scrum', 'Technical Leadership', 'Team Building', 'Performance Management', 'Career Development', 'Org Design']
  },

  // ============================================
  // PROJECT MANAGER (IT)
  // ============================================
  project_manager: {
    id: 'project_manager',
    title: {
      ru: 'Project Manager',
      en: 'Project Manager'
    },
    aliases: ['PM', 'Technical PM', 'IT PM', 'Digital PM'],
    
    skills: {
      core: ['Project Planning', 'Risk Management', 'Stakeholder Management', 'Agile/Scrum', 'JIRA'],
      advanced: ['Program Management', 'Budget Management', 'Resource Planning', 'Vendor Management'],
      soft: ['Communication', 'Negotiation', 'Problem-solving', 'Leadership']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Успешно delivered 10 проектов в срок и бюджет',
            'Координировал работу команды из 5 человек',
            'Внедрил risk management процесс, снизив количество блокеров на 40%',
            'Сократил время daily standups с 30 до 15 минут'
          ],
          en: [
            'Successfully delivered 10 projects on time and budget',
            'Coordinated team of 5 members',
            'Implemented risk management process, reducing blockers by 40%',
            'Reduced daily standup time from 30 to 15 minutes'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Управлял портфелем из 5 параллельных проектов ($2M бюджет)',
            'Достиг 95% on-time delivery rate за год',
            'Внедрил Agile трансформацию в 3 командах',
            'Сократил project overhead на 30% через автоматизацию отчётности'
          ],
          en: [
            'Managed portfolio of 5 concurrent projects ($2M budget)',
            'Achieved 95% on-time delivery rate over the year',
            'Led Agile transformation in 3 teams',
            'Reduced project overhead by 30% through reporting automation'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Руководил программой трансформации с бюджетом $10M',
            'Управлял 10 project managers и 50+ стейкхолдерами',
            'Внедрил PMO, повысив success rate проектов с 60% до 85%',
            'Сэкономил $1M через оптимизацию vendor contracts'
          ],
          en: [
            'Led transformation program with $10M budget',
            'Managed 10 project managers and 50+ stakeholders',
            'Established PMO, improving project success rate from 60% to 85%',
            'Saved $1M through vendor contract optimization'
          ]
        }
      }
    },
    
    atsKeywords: ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'Risk Management', 'Stakeholder Management', 'Budget Management', 'PMP', 'PMO', 'Waterfall', 'Kanban']
  },

  // ============================================
  // SCRUM MASTER
  // ============================================
  scrum_master: {
    id: 'scrum_master',
    title: {
      ru: 'Scrum Master',
      en: 'Scrum Master'
    },
    aliases: ['SM', 'Agile Coach (Team)', 'Iteration Manager'],
    
    skills: {
      core: ['Scrum Framework', 'Facilitation', 'Impediment Removal', 'Team Coaching', 'JIRA'],
      advanced: ['Scaled Agile (SAFe)', 'Kanban', 'Metrics', 'Continuous Improvement'],
      soft: ['Servant leadership', 'Conflict resolution', 'Active listening']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Повысил velocity команды на 50% за 6 месяцев',
            'Снизил cycle time с 14 до 7 дней',
            'Достиг 90% sprint completion rate (было 60%)',
            'Внедрил retrospectives практики, выявив 50+ improvements'
          ],
          en: [
            'Increased team velocity by 50% in 6 months',
            'Reduced cycle time from 14 to 7 days',
            'Achieved 90% sprint completion rate (from 60%)',
            'Implemented retrospective practices, identifying 50+ improvements'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Коучил 3 scrum-команды (25 человек) одновременно',
            'Внедрил SAFe для 5 команд, улучшив alignment на 70%',
            'Построил Scrum Master community of practice',
            'Обучил 10 новых Scrum Masters'
          ],
          en: [
            'Coached 3 scrum teams (25 people) simultaneously',
            'Implemented SAFe for 5 teams, improving alignment by 70%',
            'Built Scrum Master community of practice',
            'Trained 10 new Scrum Masters'
          ]
        }
      }
    },
    
    atsKeywords: ['Scrum Master', 'Agile', 'Scrum', 'Kanban', 'SAFe', 'Facilitation', 'Coaching', 'Sprint Planning', 'Retrospectives', 'JIRA', 'Continuous Improvement', 'CSM', 'PSM']
  },

  // ============================================
  // AGILE COACH
  // ============================================
  agile_coach: {
    id: 'agile_coach',
    title: {
      ru: 'Agile Coach',
      en: 'Agile Coach'
    },
    aliases: ['Enterprise Agile Coach', 'Transformation Coach', 'Lean-Agile Coach'],
    
    skills: {
      core: ['Agile Frameworks', 'Coaching', 'Training', 'Change Management', 'Facilitation'],
      advanced: ['SAFe', 'LeSS', 'Org Design', 'Leadership Coaching', 'Culture Change'],
      soft: ['Influence without authority', 'Executive presence', 'Patience']
    },
    
    levels: {
      senior: {
        achievements: {
          ru: [
            'Провёл Agile трансформацию для 100+ человек',
            'Сократил time-to-market на 60% через Agile практики',
            'Обучил 50+ людей Agile методологиям (certified trainings)',
            'Внедрил метрики (flow metrics, predictability), повысив transparency'
          ],
          en: [
            'Led Agile transformation for 100+ people',
            'Reduced time-to-market by 60% through Agile practices',
            'Trained 50+ people on Agile methodologies (certified trainings)',
            'Implemented metrics (flow metrics, predictability), improving transparency'
          ]
        }
      },
      principal: {
        achievements: {
          ru: [
            'Трансформировал организацию из 500+ человек в Agile',
            'Построил Agile Center of Excellence с 5 коучами',
            'Снизил release cycle с 6 месяцев до 2 недель',
            'Консультировал C-level по Agile стратегии'
          ],
          en: [
            'Transformed 500+ person organization to Agile',
            'Built Agile Center of Excellence with 5 coaches',
            'Reduced release cycle from 6 months to 2 weeks',
            'Consulted C-level executives on Agile strategy'
          ]
        }
      }
    },
    
    atsKeywords: ['Agile Coach', 'Agile Transformation', 'SAFe', 'LeSS', 'Scrum', 'Kanban', 'Change Management', 'Coaching', 'Training', 'Leadership', 'ICP-ACC', 'SPC']
  },

  // ============================================
  // DELIVERY MANAGER
  // ============================================
  delivery_manager: {
    id: 'delivery_manager',
    title: {
      ru: 'Delivery Manager',
      en: 'Delivery Manager'
    },
    aliases: ['DM', 'Release Manager', 'Program Delivery Manager'],
    
    skills: {
      core: ['Delivery Planning', 'Release Management', 'Risk Management', 'Stakeholder Communication'],
      advanced: ['Program Management', 'Vendor Management', 'Budget Tracking', 'SLA Management'],
      soft: ['Cross-team coordination', 'Escalation handling', 'Reporting']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Обеспечил delivery 20 релизов в год с 98% success rate',
            'Координировал работу 4 команд для крупного запуска',
            'Внедрил release train подход, снизив integration issues на 60%',
            'Улучшил прогнозируемость delivery с 50% до 85%'
          ],
          en: [
            'Delivered 20 releases per year with 98% success rate',
            'Coordinated 4 teams for major product launch',
            'Implemented release train approach, reducing integration issues by 60%',
            'Improved delivery predictability from 50% to 85%'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Управлял delivery для продукта с 1M+ пользователей',
            'Построил delivery operations team из 5 человек',
            'Снизил production incidents на 70% через improved release processes',
            'Внедрил DevOps практики, сократив deployment time с 4 часов до 15 минут'
          ],
          en: [
            'Managed delivery for product with 1M+ users',
            'Built delivery operations team of 5 people',
            'Reduced production incidents by 70% through improved release processes',
            'Implemented DevOps practices, reducing deployment time from 4 hours to 15 minutes'
          ]
        }
      }
    },
    
    atsKeywords: ['Delivery Management', 'Release Management', 'Agile', 'CI/CD', 'DevOps', 'Program Management', 'Stakeholder Management', 'Risk Management']
  },

  // ============================================
  // CTO / VP ENGINEERING
  // ============================================
  cto: {
    id: 'cto',
    title: {
      ru: 'CTO / VP Engineering',
      en: 'CTO / VP Engineering'
    },
    aliases: ['Chief Technology Officer', 'VP Engineering', 'Head of Engineering'],
    
    skills: {
      core: ['Technical Strategy', 'Org Leadership', 'Executive Communication', 'Budgeting'],
      advanced: ['M&A Technical Due Diligence', 'Board Reporting', 'Investor Relations'],
      soft: ['Vision setting', 'Culture building', 'Executive presence']
    },
    
    levels: {
      executive: {
        achievements: {
          ru: [
            'Масштабировал engineering org с 20 до 150 человек за 3 года',
            'Определил техническую стратегию для продукта с $50M ARR',
            'Провёл техническую due diligence для 3 M&A сделок ($100M+)',
            'Снизил cloud costs на 40% ($2M/год) через архитектурные изменения',
            'Построил engineering culture, достигнув 4.5 рейтинга на Glassdoor'
          ],
          en: [
            'Scaled engineering org from 20 to 150 in 3 years',
            'Defined technical strategy for $50M ARR product',
            'Led technical due diligence for 3 M&A deals ($100M+)',
            'Reduced cloud costs by 40% ($2M/year) through architecture changes',
            'Built engineering culture achieving 4.5 Glassdoor rating'
          ]
        }
      }
    },
    
    atsKeywords: ['CTO', 'VP Engineering', 'Technical Leadership', 'Engineering Strategy', 'Org Building', 'Executive Leadership', 'Scaling', 'Technical Vision']
  }
};

/**
 * Action verbs для Management
 */
export const MANAGEMENT_ACTION_VERBS = {
  ru: {
    leadership: ['Руководил', 'Возглавил', 'Построил', 'Масштабировал', 'Трансформировал'],
    people: ['Нанял', 'Развил', 'Менторил', 'Обучил', 'Повысил', 'Коучил'],
    delivery: ['Обеспечил', 'Delivered', 'Запустил', 'Внедрил', 'Достиг'],
    improvement: ['Улучшил', 'Оптимизировал', 'Сократил', 'Увеличил', 'Повысил']
  },
  en: {
    leadership: ['Led', 'Headed', 'Built', 'Scaled', 'Transformed', 'Directed'],
    people: ['Hired', 'Developed', 'Mentored', 'Trained', 'Promoted', 'Coached'],
    delivery: ['Delivered', 'Launched', 'Implemented', 'Achieved', 'Enabled'],
    improvement: ['Improved', 'Optimized', 'Reduced', 'Increased', 'Enhanced']
  }
};

export default MANAGEMENT_ROLES;

