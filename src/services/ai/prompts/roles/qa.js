/**
 * QA Roles
 * QA Engineer, SDET, QA Lead, Test Automation Engineer, etc.
 */

export const QA_ROLES = {
  // ============================================
  // QA ENGINEER
  // ============================================
  qa_engineer: {
    id: 'qa_engineer',
    title: {
      ru: 'QA Engineer',
      en: 'QA Engineer'
    },
    aliases: ['Quality Assurance Engineer', 'Test Engineer', 'QA Analyst', 'Tester'],
    
    skills: {
      core: ['Manual Testing', 'Test Case Design', 'Bug Reporting', 'Test Planning', 'JIRA'],
      advanced: ['API Testing', 'Performance Testing', 'Security Testing', 'Mobile Testing'],
      soft: ['Attention to detail', 'Critical thinking', 'Communication']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Написал 500+ test cases для 3 продуктов',
            'Обнаружил 200+ багов, включая 20 критичных до релиза',
            'Сократил время регрессионного тестирования на 30%',
            'Создал документацию тестирования для 5 фич'
          ],
          en: [
            'Wrote 500+ test cases for 3 products',
            'Found 200+ bugs, including 20 critical before release',
            'Reduced regression testing time by 30%',
            'Created testing documentation for 5 features'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Разработал тест-стратегию для продукта с 500K пользователей',
            'Внедрил API тестирование, увеличив покрытие на 40%',
            'Сократил количество production bugs на 60%',
            'Обучил 3 junior тестировщиков'
          ],
          en: [
            'Developed test strategy for product with 500K users',
            'Implemented API testing, increasing coverage by 40%',
            'Reduced production bugs by 60%',
            'Trained 3 junior testers'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил QA процессы для 5 команд (20 инженеров)',
            'Внедрил shift-left testing, сократив time-to-release на 40%',
            'Создал testing COE с 8 QA инженерами',
            'Достиг 99.9% production stability через improved QA процессы'
          ],
          en: [
            'Built QA processes for 5 teams (20 engineers)',
            'Implemented shift-left testing, reducing time-to-release by 40%',
            'Created testing COE with 8 QA engineers',
            'Achieved 99.9% production stability through improved QA processes'
          ]
        }
      }
    },
    
    atsKeywords: ['QA', 'Quality Assurance', 'Testing', 'Test Cases', 'Bug Tracking', 'JIRA', 'Regression Testing', 'Smoke Testing', 'UAT', 'Test Planning']
  },

  // ============================================
  // SDET / AUTOMATION ENGINEER
  // ============================================
  sdet: {
    id: 'sdet',
    title: {
      ru: 'SDET / Automation Engineer',
      en: 'SDET / Automation Engineer'
    },
    aliases: ['Software Development Engineer in Test', 'Test Automation Engineer', 'QA Automation'],
    
    skills: {
      core: ['Python', 'Java', 'Selenium', 'Cypress', 'API Testing', 'CI/CD'],
      advanced: ['Test Frameworks', 'Performance Testing', 'Mobile Automation', 'BDD'],
      soft: ['Problem-solving', 'Code quality mindset', 'Collaboration with devs']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Написал 200+ автотестов на Selenium/Python',
            'Достиг 70% automation coverage для критичных flows',
            'Интегрировал тесты в CI/CD pipeline',
            'Сократил время регрессии с 8 часов до 2 часов'
          ],
          en: [
            'Wrote 200+ automated tests using Selenium/Python',
            'Achieved 70% automation coverage for critical flows',
            'Integrated tests into CI/CD pipeline',
            'Reduced regression time from 8 hours to 2 hours'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Создал test automation framework с нуля',
            'Достиг 90% automation coverage для regression suite',
            'Внедрил параллельное выполнение, ускорив тесты в 5 раз',
            'Разработал API testing framework для 50+ endpoints'
          ],
          en: [
            'Built test automation framework from scratch',
            'Achieved 90% automation coverage for regression suite',
            'Implemented parallel execution, speeding up tests by 5x',
            'Developed API testing framework for 50+ endpoints'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал automation architecture для 10 микросервисов',
            'Внедрил visual regression testing, поймав 100+ UI багов',
            'Построил команду автоматизации из 5 SDET',
            'Сократил flaky tests с 30% до 2%'
          ],
          en: [
            'Architected automation for 10 microservices',
            'Implemented visual regression testing, catching 100+ UI bugs',
            'Built automation team of 5 SDETs',
            'Reduced flaky tests from 30% to 2%'
          ]
        }
      }
    },
    
    atsKeywords: ['SDET', 'Test Automation', 'Selenium', 'Cypress', 'Python', 'Java', 'API Testing', 'CI/CD', 'Jenkins', 'BDD', 'Cucumber', 'TestNG', 'pytest']
  },

  // ============================================
  // QA LEAD
  // ============================================
  qa_lead: {
    id: 'qa_lead',
    title: {
      ru: 'QA Lead',
      en: 'QA Lead'
    },
    aliases: ['Test Lead', 'QA Manager', 'Head of QA'],
    
    skills: {
      core: ['Team Leadership', 'Test Strategy', 'Resource Planning', 'Quality Metrics', 'Process Improvement'],
      advanced: ['QA Transformation', 'Vendor Management', 'Budget Management'],
      soft: ['People management', 'Stakeholder communication', 'Mentoring']
    },
    
    levels: {
      lead: {
        achievements: {
          ru: [
            'Руководил командой из 10 QA инженеров',
            'Внедрил QA метрики (defect leakage, test coverage), снизив bugs в prod на 50%',
            'Построил QA process, сократив release cycle с 4 недель до 1 недели',
            'Обучил команду automation, увеличив coverage с 30% до 80%'
          ],
          en: [
            'Led team of 10 QA engineers',
            'Implemented QA metrics (defect leakage, test coverage), reducing prod bugs by 50%',
            'Built QA process reducing release cycle from 4 weeks to 1 week',
            'Trained team on automation, increasing coverage from 30% to 80%'
          ]
        }
      },
      manager: {
        achievements: {
          ru: [
            'Управлял QA организацией из 25 человек для 5 продуктов',
            'Внедрил continuous testing, сократив feedback loop с дней до часов',
            'Снизил стоимость QA на 30% через automation и process optimization',
            'Построил offshore QA team из 10 человек'
          ],
          en: [
            'Managed QA organization of 25 for 5 products',
            'Implemented continuous testing, reducing feedback loop from days to hours',
            'Reduced QA costs by 30% through automation and process optimization',
            'Built offshore QA team of 10 people'
          ]
        }
      }
    },
    
    atsKeywords: ['QA Lead', 'Test Lead', 'QA Management', 'Test Strategy', 'Quality Metrics', 'Team Leadership', 'Automation', 'Process Improvement']
  },

  // ============================================
  // PERFORMANCE ENGINEER
  // ============================================
  performance_engineer: {
    id: 'performance_engineer',
    title: {
      ru: 'Performance Engineer',
      en: 'Performance Engineer'
    },
    aliases: ['Load Test Engineer', 'Performance Test Engineer'],
    
    skills: {
      core: ['JMeter', 'Gatling', 'k6', 'Performance Analysis', 'Load Testing'],
      advanced: ['APM Tools', 'Profiling', 'Capacity Planning', 'Cloud Performance'],
      soft: ['Analytical thinking', 'Root cause analysis', 'Reporting']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Провёл 50+ load tests, выявив 30 performance bottlenecks',
            'Улучшил response time на 60% (с 2с до 0.8с) под нагрузкой',
            'Построил performance testing framework на k6',
            'Внедрил APM (Datadog), сократив MTTR на 50%'
          ],
          en: [
            'Conducted 50+ load tests, identifying 30 performance bottlenecks',
            'Improved response time by 60% (from 2s to 0.8s) under load',
            'Built performance testing framework on k6',
            'Implemented APM (Datadog), reducing MTTR by 50%'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал performance strategy для системы с 1M+ RPS',
            'Сократил cloud costs на 40% через performance optimization',
            'Построил continuous performance testing в CI/CD',
            'Предотвратил 5 production outages через capacity planning'
          ],
          en: [
            'Designed performance strategy for 1M+ RPS system',
            'Reduced cloud costs by 40% through performance optimization',
            'Built continuous performance testing in CI/CD',
            'Prevented 5 production outages through capacity planning'
          ]
        }
      }
    },
    
    atsKeywords: ['Performance Testing', 'Load Testing', 'JMeter', 'Gatling', 'k6', 'APM', 'Performance Analysis', 'Capacity Planning', 'Profiling']
  }
};

/**
 * Action verbs для QA
 */
export const QA_ACTION_VERBS = {
  ru: {
    testing: ['Протестировал', 'Проверил', 'Провёл', 'Выполнил', 'Обнаружил'],
    automation: ['Автоматизировал', 'Написал', 'Разработал', 'Создал', 'Внедрил'],
    improvement: ['Улучшил', 'Оптимизировал', 'Сократил', 'Повысил', 'Снизил'],
    leadership: ['Руководил', 'Построил', 'Обучил', 'Координировал']
  },
  en: {
    testing: ['Tested', 'Verified', 'Conducted', 'Executed', 'Discovered'],
    automation: ['Automated', 'Wrote', 'Developed', 'Created', 'Implemented'],
    improvement: ['Improved', 'Optimized', 'Reduced', 'Increased', 'Decreased'],
    leadership: ['Led', 'Built', 'Trained', 'Coordinated', 'Managed']
  }
};

export default QA_ROLES;

