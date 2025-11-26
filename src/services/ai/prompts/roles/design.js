/**
 * Design Roles
 * UX/UI Designer, Product Designer, UX Researcher, Design Lead, etc.
 */

export const DESIGN_ROLES = {
  // ============================================
  // PRODUCT DESIGNER
  // ============================================
  product_designer: {
    id: 'product_designer',
    title: {
      ru: 'Product Designer',
      en: 'Product Designer'
    },
    aliases: ['Senior Product Designer', 'Lead Product Designer', 'Staff Designer'],
    
    skills: {
      core: ['User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Design Systems', 'Figma'],
      advanced: ['Design Strategy', 'Service Design', 'Design Ops', 'Accessibility', 'Motion Design'],
      soft: ['Cross-functional collaboration', 'Design thinking', 'Stakeholder presentation']
    },
    
    levels: {
      junior: {
        title: { ru: 'Junior Product Designer', en: 'Junior Product Designer' },
        focus: ['UI design', 'Component creation', 'Design QA', 'Prototyping'],
        metrics: ['Screens designed', 'Components created', 'Design review feedback'],
        achievements: {
          ru: [
            'Создал 100+ UI компонентов для design system команды',
            'Разработал дизайн 30+ экранов для мобильного приложения',
            'Улучшил accessibility, достигнув WCAG AA compliance',
            'Сократил время дизайн-ревью на 40% через улучшение документации'
          ],
          en: [
            'Created 100+ UI components for team design system',
            'Designed 30+ screens for mobile application',
            'Improved accessibility, achieving WCAG AA compliance',
            'Reduced design review time by 40% through better documentation'
          ]
        }
      },
      middle: {
        title: { ru: 'Product Designer', en: 'Product Designer' },
        focus: ['End-to-end product design', 'User research', 'Design strategy'],
        metrics: ['Feature adoption', 'User satisfaction', 'Task completion rate'],
        achievements: {
          ru: [
            'Редизайнил checkout flow, увеличив конверсию на 35%',
            'Провёл 50+ user research сессий, выявив 10 критичных UX-проблем',
            'Создал design system с 200+ компонентами для 5 продуктов',
            'Снизил количество support tickets на 40% через улучшение UX'
          ],
          en: [
            'Redesigned checkout flow, increasing conversion by 35%',
            'Conducted 50+ user research sessions, identifying 10 critical UX issues',
            'Built design system with 200+ components for 5 products',
            'Reduced support tickets by 40% through UX improvements'
          ]
        }
      },
      senior: {
        title: { ru: 'Senior Product Designer', en: 'Senior Product Designer' },
        focus: ['Design leadership', 'Product strategy', 'Mentoring', 'Complex problems'],
        metrics: ['Business impact', 'Design quality', 'Team growth'],
        achievements: {
          ru: [
            'Возглавил редизайн продукта, увеличивший retention на 50%',
            'Менторил 4 дизайнеров, 2 из которых получили повышение',
            'Внедрил design ops практики, ускорив delivery на 60%',
            'Разработал design vision для продукта с 2M+ пользователей'
          ],
          en: [
            'Led product redesign that increased retention by 50%',
            'Mentored 4 designers, 2 promoted within a year',
            'Implemented design ops practices, accelerating delivery by 60%',
            'Developed design vision for product with 2M+ users'
          ]
        }
      },
      lead: {
        title: { ru: 'Design Lead / Head of Design', en: 'Design Lead / Head of Design' },
        focus: ['Design org', 'Design culture', 'Cross-company influence', 'Hiring'],
        metrics: ['Team performance', 'Design maturity', 'Business outcomes'],
        achievements: {
          ru: [
            'Построил и возглавил команду из 10 дизайнеров',
            'Внедрил дизайн-культуру в организации, повысив design maturity с 2 до 4 уровня',
            'Создал единую design system, сократившую время разработки на 40%',
            'Привёл design-driven инициативы, увеличившие NPS с 30 до 65'
          ],
          en: [
            'Built and led design team of 10 designers',
            'Established design culture, improving design maturity from level 2 to 4',
            'Created unified design system, reducing development time by 40%',
            'Led design-driven initiatives that increased NPS from 30 to 65'
          ]
        }
      }
    },
    
    atsKeywords: ['Product Design', 'UX Design', 'UI Design', 'Figma', 'Design Systems', 'User Research', 'Prototyping', 'Wireframing', 'Design Thinking', 'Accessibility', 'WCAG', 'Usability Testing', 'Information Architecture']
  },

  // ============================================
  // UX DESIGNER
  // ============================================
  ux_designer: {
    id: 'ux_designer',
    title: {
      ru: 'UX Designer',
      en: 'UX Designer'
    },
    aliases: ['User Experience Designer', 'Interaction Designer', 'UX/UI Designer'],
    
    skills: {
      core: ['User Research', 'Information Architecture', 'Wireframing', 'Usability Testing', 'Journey Mapping'],
      advanced: ['Service Design', 'Accessibility', 'Analytics', 'A/B Testing'],
      soft: ['Empathy', 'Problem-solving', 'Communication']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Провёл 30+ usability тестов, улучшив task success rate с 60% до 90%',
            'Создал user journey maps для 5 ключевых персон',
            'Редизайнил навигацию, сократив время поиска информации на 50%',
            'Внедрил систему сбора UX-метрик (SUS, task completion)'
          ],
          en: [
            'Conducted 30+ usability tests, improving task success rate from 60% to 90%',
            'Created user journey maps for 5 key personas',
            'Redesigned navigation, reducing information search time by 50%',
            'Implemented UX metrics collection system (SUS, task completion)'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Возглавил UX-трансформацию продукта, повысив NPS с 20 до 55',
            'Построил UX research практику с нуля, проведя 100+ исследований за год',
            'Создал accessibility guidelines, достигнув WCAG AAA для ключевых flow',
            'Менторил 3 junior UX дизайнеров'
          ],
          en: [
            'Led UX transformation that improved NPS from 20 to 55',
            'Built UX research practice from scratch, conducting 100+ studies per year',
            'Created accessibility guidelines, achieving WCAG AAA for key flows',
            'Mentored 3 junior UX designers'
          ]
        }
      }
    },
    
    atsKeywords: ['UX Design', 'User Research', 'Usability Testing', 'Information Architecture', 'Wireframing', 'Prototyping', 'Journey Mapping', 'Personas', 'User Flows', 'Accessibility']
  },

  // ============================================
  // UI DESIGNER
  // ============================================
  ui_designer: {
    id: 'ui_designer',
    title: {
      ru: 'UI Designer',
      en: 'UI Designer'
    },
    aliases: ['Visual Designer', 'Interface Designer', 'Web Designer'],
    
    skills: {
      core: ['Visual Design', 'Typography', 'Color Theory', 'Figma', 'Design Systems', 'Iconography'],
      advanced: ['Motion Design', 'Illustration', 'Brand Design', 'Responsive Design'],
      soft: ['Attention to detail', 'Creativity', 'Collaboration with developers']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Создал визуальный язык для 3 продуктов компании',
            'Разработал icon set из 200+ иконок',
            'Внедрил dark mode, увеличив user satisfaction на 25%',
            'Оптимизировал UI для mobile, повысив engagement на 40%'
          ],
          en: [
            'Created visual language for 3 company products',
            'Developed icon set of 200+ icons',
            'Implemented dark mode, increasing user satisfaction by 25%',
            'Optimized UI for mobile, improving engagement by 40%'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Провёл visual redesign продукта, увеличивший brand recognition на 60%',
            'Построил design system с 500+ компонентами, tokens и guidelines',
            'Снизил время разработки UI на 50% через component-based подход',
            'Выиграл 2 design awards (Awwwards, CSS Design Awards)'
          ],
          en: [
            'Led visual redesign that increased brand recognition by 60%',
            'Built design system with 500+ components, tokens and guidelines',
            'Reduced UI development time by 50% through component-based approach',
            'Won 2 design awards (Awwwards, CSS Design Awards)'
          ]
        }
      }
    },
    
    atsKeywords: ['UI Design', 'Visual Design', 'Figma', 'Sketch', 'Design Systems', 'Typography', 'Color Theory', 'Iconography', 'Responsive Design', 'Motion Design']
  },

  // ============================================
  // UX RESEARCHER
  // ============================================
  ux_researcher: {
    id: 'ux_researcher',
    title: {
      ru: 'UX Researcher',
      en: 'UX Researcher'
    },
    aliases: ['User Researcher', 'Design Researcher', 'Research Lead'],
    
    skills: {
      core: ['User Interviews', 'Usability Testing', 'Survey Design', 'Data Analysis', 'Research Planning'],
      advanced: ['Quantitative Research', 'Eye-tracking', 'Diary Studies', 'A/B Testing Analysis'],
      soft: ['Synthesis', 'Storytelling', 'Stakeholder influence']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Провёл 100+ user interviews за год',
            'Создал research repository с 50+ insights, используемых 5 продуктовыми командами',
            'Выявил 15 критичных user pain points, приоритизировав roadmap',
            'Внедрил continuous discovery практики в 3 командах'
          ],
          en: [
            'Conducted 100+ user interviews per year',
            'Built research repository with 50+ insights used by 5 product teams',
            'Identified 15 critical user pain points, informing roadmap prioritization',
            'Implemented continuous discovery practices in 3 teams'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил UX research функцию с 4 researchers',
            'Создал research ops систему, сократив time-to-insight на 60%',
            'Провёл стратегическое исследование рынка, повлиявшее на $10M product bet',
            'Внедрил mixed-methods подход, объединив qual и quant данные'
          ],
          en: [
            'Built UX research function with 4 researchers',
            'Created research ops system, reducing time-to-insight by 60%',
            'Conducted strategic market research informing $10M product bet',
            'Implemented mixed-methods approach, combining qual and quant data'
          ]
        }
      }
    },
    
    atsKeywords: ['UX Research', 'User Research', 'Usability Testing', 'User Interviews', 'Survey Design', 'Data Analysis', 'Research Synthesis', 'Personas', 'Journey Mapping', 'A/B Testing']
  },

  // ============================================
  // DESIGN MANAGER
  // ============================================
  design_manager: {
    id: 'design_manager',
    title: {
      ru: 'Design Manager',
      en: 'Design Manager'
    },
    aliases: ['Design Director', 'Head of Design', 'VP Design', 'Chief Design Officer'],
    
    skills: {
      core: ['Team Leadership', 'Design Strategy', 'Hiring', 'Performance Management', 'Design Ops'],
      advanced: ['Org Design', 'Budget Management', 'Executive Communication', 'Change Management'],
      soft: ['People development', 'Vision setting', 'Cross-functional leadership']
    },
    
    levels: {
      manager: {
        achievements: {
          ru: [
            'Построил дизайн-команду с 0 до 8 человек за 18 месяцев',
            'Внедрил career ladder для дизайнеров, снизив turnover на 50%',
            'Создал design review процесс, повысив качество deliverables на 40%',
            'Нанял 10+ дизайнеров с retention rate 90%'
          ],
          en: [
            'Built design team from 0 to 8 members in 18 months',
            'Implemented career ladder for designers, reducing turnover by 50%',
            'Created design review process, improving deliverable quality by 40%',
            'Hired 10+ designers with 90% retention rate'
          ]
        }
      },
      director: {
        achievements: {
          ru: [
            'Руководил дизайн-организацией из 25+ человек',
            'Определил design vision и strategy для компании на 3 года',
            'Внедрил design thinking в культуру компании',
            'Увеличил design team impact, доказав ROI дизайна в $5M'
          ],
          en: [
            'Led design organization of 25+ people',
            'Defined design vision and strategy for company over 3 years',
            'Embedded design thinking into company culture',
            'Increased design team impact, proving $5M design ROI'
          ]
        }
      }
    },
    
    atsKeywords: ['Design Leadership', 'Team Management', 'Design Strategy', 'Hiring', 'Design Ops', 'Design Culture', 'Career Development', 'Design Systems', 'Cross-functional']
  }
};

/**
 * Action verbs для Design
 */
export const DESIGN_ACTION_VERBS = {
  ru: {
    creation: ['Создал', 'Разработал', 'Спроектировал', 'Визуализировал'],
    research: ['Исследовал', 'Провёл', 'Выявил', 'Проанализировал', 'Протестировал'],
    improvement: ['Улучшил', 'Оптимизировал', 'Редизайнил', 'Переработал'],
    leadership: ['Возглавил', 'Построил', 'Менторил', 'Обучил', 'Внедрил']
  },
  en: {
    creation: ['Created', 'Designed', 'Developed', 'Visualized', 'Crafted'],
    research: ['Researched', 'Conducted', 'Identified', 'Analyzed', 'Tested'],
    improvement: ['Improved', 'Optimized', 'Redesigned', 'Revamped', 'Enhanced'],
    leadership: ['Led', 'Built', 'Mentored', 'Trained', 'Implemented', 'Established']
  }
};

export default DESIGN_ROLES;

