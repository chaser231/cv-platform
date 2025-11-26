/**
 * Engineering Roles
 * Все роли разработчиков: Frontend, Backend, Full Stack, Mobile, etc.
 */

export const ENGINEERING_ROLES = {
  // ============================================
  // FRONTEND DEVELOPER
  // ============================================
  frontend: {
    id: 'frontend',
    title: {
      ru: 'Frontend-разработчик',
      en: 'Frontend Developer'
    },
    aliases: ['Frontend Engineer', 'UI Developer', 'Web Developer', 'React Developer', 'Vue Developer'],
    
    skills: {
      core: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vue', 'Angular'],
      advanced: ['Next.js', 'Redux', 'GraphQL', 'Webpack', 'Vite', 'Testing Library', 'Cypress'],
      soft: ['Collaboration with designers', 'Code review', 'Mentoring']
    },
    
    levels: {
      junior: {
        focus: ['Вёрстка по макетам', 'Базовая логика компонентов', 'Исправление багов'],
        metrics: ['Количество задач/спринт', 'Время на задачу', 'Покрытие тестами'],
        achievements: {
          ru: [
            'Сверстал 20+ страниц по макетам Figma с pixel-perfect точностью',
            'Разработал 15 переиспользуемых React компонентов для UI-библиотеки',
            'Сократил время загрузки главной страницы на 30% (с 3с до 2.1с)',
            'Внедрил TypeScript в 3 legacy-модуля, устранив 50+ потенциальных ошибок'
          ],
          en: [
            'Built 20+ pixel-perfect pages from Figma designs',
            'Developed 15 reusable React components for UI library',
            'Reduced main page load time by 30% (from 3s to 2.1s)',
            'Migrated 3 legacy modules to TypeScript, eliminating 50+ potential bugs'
          ]
        }
      },
      middle: {
        focus: ['Архитектура компонентов', 'Оптимизация производительности', 'Code review'],
        metrics: ['Core Web Vitals', 'Bundle size', 'Test coverage', 'PR turnaround'],
        achievements: {
          ru: [
            'Оптимизировал рендеринг списков, сократив время FCP с 2.5с до 1.2с для 10K+ элементов',
            'Внедрил систему дизайн-токенов, ускорив разработку UI на 40%',
            'Провёл 200+ code review, выявив 30+ критичных проблем до production',
            'Разработал архитектуру микрофронтендов для 5 независимых команд'
          ],
          en: [
            'Optimized list rendering, reducing FCP from 2.5s to 1.2s for 10K+ items',
            'Implemented design token system, accelerating UI development by 40%',
            'Conducted 200+ code reviews, catching 30+ critical issues before production',
            'Architected micro-frontend solution for 5 independent teams'
          ]
        }
      },
      senior: {
        focus: ['Техническая стратегия', 'Менторство', 'Cross-team collaboration'],
        metrics: ['Team velocity', 'Developer experience', 'Technical debt reduction'],
        achievements: {
          ru: [
            'Спроектировал и внедрил новую архитектуру фронтенда, сократив время разработки фич на 50%',
            'Менторил 4 junior разработчиков, 2 из которых выросли до middle за 10 месяцев',
            'Сократил bundle size на 60% (с 2.5MB до 1MB), улучшив LCP на 40%',
            'Возглавил миграцию с legacy jQuery на React, переписав 100K строк кода за 6 месяцев'
          ],
          en: [
            'Architected and implemented new frontend architecture, reducing feature development time by 50%',
            'Mentored 4 junior developers, 2 promoted to mid-level within 10 months',
            'Reduced bundle size by 60% (from 2.5MB to 1MB), improving LCP by 40%',
            'Led migration from legacy jQuery to React, rewriting 100K LOC in 6 months'
          ]
        }
      }
    },
    
    atsKeywords: ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML5', 'Redux', 'GraphQL', 'REST API', 'Webpack', 'Jest', 'Cypress', 'Performance Optimization', 'Responsive Design', 'Accessibility', 'WCAG', 'Core Web Vitals']
  },

  // ============================================
  // BACKEND DEVELOPER
  // ============================================
  backend: {
    id: 'backend',
    title: {
      ru: 'Backend-разработчик',
      en: 'Backend Developer'
    },
    aliases: ['Backend Engineer', 'Server-side Developer', 'API Developer', 'Node.js Developer', 'Python Developer', 'Java Developer', 'Go Developer'],
    
    skills: {
      core: ['Python', 'Java', 'Node.js', 'Go', 'SQL', 'REST API', 'PostgreSQL', 'MongoDB'],
      advanced: ['Microservices', 'Kafka', 'Redis', 'Docker', 'Kubernetes', 'gRPC', 'GraphQL'],
      soft: ['System design', 'Code review', 'Documentation']
    },
    
    levels: {
      junior: {
        focus: ['CRUD операции', 'Простые API endpoints', 'Юнит-тесты'],
        metrics: ['Endpoints разработано', 'Покрытие тестами', 'Время на задачу'],
        achievements: {
          ru: [
            'Разработал 30+ REST API endpoints для мобильного приложения',
            'Написал 100+ unit-тестов, достигнув 80% покрытия кода',
            'Оптимизировал 10 медленных SQL-запросов, ускорив их в 3 раза',
            'Создал систему логирования, упростившую отладку на 50%'
          ],
          en: [
            'Developed 30+ REST API endpoints for mobile application',
            'Wrote 100+ unit tests, achieving 80% code coverage',
            'Optimized 10 slow SQL queries, improving speed by 3x',
            'Built logging system that simplified debugging by 50%'
          ]
        }
      },
      middle: {
        focus: ['Проектирование сервисов', 'Оптимизация производительности', 'Интеграции'],
        metrics: ['RPS', 'Latency (p95/p99)', 'Error rate', 'Uptime'],
        achievements: {
          ru: [
            'Спроектировал и реализовал микросервис обработки платежей с 99.99% uptime',
            'Оптимизировал API, сократив latency p99 с 500мс до 100мс при нагрузке 5K RPS',
            'Внедрил кэширование на Redis, снизив нагрузку на БД на 70%',
            'Разработал систему миграций, позволившую делать zero-downtime deployments'
          ],
          en: [
            'Designed and implemented payment processing microservice with 99.99% uptime',
            'Optimized API, reducing p99 latency from 500ms to 100ms at 5K RPS',
            'Implemented Redis caching, reducing database load by 70%',
            'Built migration system enabling zero-downtime deployments'
          ]
        }
      },
      senior: {
        focus: ['Архитектура систем', 'Масштабирование', 'Техническое лидерство'],
        metrics: ['System reliability', 'Cost efficiency', 'Team productivity'],
        achievements: {
          ru: [
            'Спроектировал распределённую систему, обрабатывающую 100M+ событий в день',
            'Провёл рефакторинг монолита в 15 микросервисов, сократив time-to-market на 60%',
            'Оптимизировал инфраструктуру, сократив затраты на AWS на $500K/год',
            'Внедрил event-driven архитектуру на Kafka, обеспечив масштабирование до 50K TPS'
          ],
          en: [
            'Architected distributed system processing 100M+ events daily',
            'Led monolith to microservices migration (15 services), reducing time-to-market by 60%',
            'Optimized infrastructure, reducing AWS costs by $500K/year',
            'Implemented event-driven architecture on Kafka, enabling scaling to 50K TPS'
          ]
        }
      }
    },
    
    atsKeywords: ['Python', 'Java', 'Node.js', 'Go', 'Rust', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'REST API', 'GraphQL', 'gRPC', 'Microservices', 'Event-driven', 'SOLID', 'DDD']
  },

  // ============================================
  // FULL STACK DEVELOPER
  // ============================================
  fullstack: {
    id: 'fullstack',
    title: {
      ru: 'Full Stack разработчик',
      en: 'Full Stack Developer'
    },
    aliases: ['Full Stack Engineer', 'Software Engineer', 'Web Developer'],
    
    skills: {
      core: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
      advanced: ['Next.js', 'GraphQL', 'Docker', 'AWS', 'CI/CD', 'Redis'],
      soft: ['End-to-end ownership', 'Cross-functional collaboration']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Разработал полноценное веб-приложение (React + Node.js) с нуля до production',
            'Создал 5 CRUD-модулей с frontend и backend частью',
            'Интегрировал 3 внешних API (Stripe, SendGrid, Twilio)'
          ],
          en: [
            'Built complete web application (React + Node.js) from scratch to production',
            'Created 5 CRUD modules with frontend and backend components',
            'Integrated 3 external APIs (Stripe, SendGrid, Twilio)'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Разработал и запустил B2B SaaS платформу с 1000+ активных пользователей',
            'Создал real-time систему уведомлений на WebSocket, обслуживающую 10K+ соединений',
            'Внедрил SSR на Next.js, улучшив SEO-метрики на 150%'
          ],
          en: [
            'Built and launched B2B SaaS platform with 1000+ active users',
            'Created real-time notification system on WebSocket, serving 10K+ connections',
            'Implemented SSR with Next.js, improving SEO metrics by 150%'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Архитектор и единственный разработчик MVP, привлёкшего $2M инвестиций',
            'Построил платформу с 50K+ MAU, обрабатывающую $1M+ транзакций/месяц',
            'Создал внутреннюю low-code платформу, сократившую время разработки на 70%'
          ],
          en: [
            'Sole architect and developer of MVP that raised $2M funding',
            'Built platform with 50K+ MAU, processing $1M+ transactions/month',
            'Created internal low-code platform, reducing development time by 70%'
          ]
        }
      }
    },
    
    atsKeywords: ['Full Stack', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'REST API', 'GraphQL', 'Next.js', 'CI/CD']
  },

  // ============================================
  // MOBILE DEVELOPER
  // ============================================
  mobile: {
    id: 'mobile',
    title: {
      ru: 'Mobile-разработчик',
      en: 'Mobile Developer'
    },
    aliases: ['iOS Developer', 'Android Developer', 'React Native Developer', 'Flutter Developer'],
    
    skills: {
      core: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Mobile UI/UX'],
      advanced: ['SwiftUI', 'Jetpack Compose', 'Push notifications', 'In-app purchases', 'Analytics'],
      soft: ['Platform guidelines', 'App Store optimization']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Разработал 3 мобильных приложения, опубликованных в App Store/Google Play',
            'Реализовал 20+ экранов по дизайн-макетам с анимациями',
            'Интегрировал push-уведомления и аналитику (Firebase)'
          ],
          en: [
            'Developed 3 mobile apps published on App Store/Google Play',
            'Implemented 20+ screens from design mockups with animations',
            'Integrated push notifications and analytics (Firebase)'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Разработал приложение с 100K+ загрузок и рейтингом 4.8 в App Store',
            'Оптимизировал производительность, сократив crash rate с 2% до 0.1%',
            'Внедрил offline-режим с синхронизацией данных'
          ],
          en: [
            'Built app with 100K+ downloads and 4.8 App Store rating',
            'Optimized performance, reducing crash rate from 2% to 0.1%',
            'Implemented offline mode with data synchronization'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Возглавил разработку приложения с 1M+ DAU и $10M+ годовой выручки',
            'Спроектировал кросс-платформенную архитектуру, сократив time-to-market на 50%',
            'Снизил время cold start с 3с до 0.8с через оптимизацию startup flow'
          ],
          en: [
            'Led development of app with 1M+ DAU and $10M+ annual revenue',
            'Architected cross-platform solution, reducing time-to-market by 50%',
            'Reduced cold start time from 3s to 0.8s through startup optimization'
          ]
        }
      }
    },
    
    atsKeywords: ['iOS', 'Android', 'Swift', 'Kotlin', 'React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose', 'App Store', 'Google Play', 'Push Notifications', 'In-App Purchases', 'Core Data', 'Room']
  },

  // ============================================
  // EMBEDDED / SYSTEMS DEVELOPER
  // ============================================
  embedded: {
    id: 'embedded',
    title: {
      ru: 'Embedded/Systems разработчик',
      en: 'Embedded/Systems Developer'
    },
    aliases: ['Embedded Engineer', 'Firmware Developer', 'Systems Programmer', 'IoT Developer'],
    
    skills: {
      core: ['C', 'C++', 'Rust', 'RTOS', 'Linux Kernel', 'Assembly'],
      advanced: ['ARM', 'RISC-V', 'Device Drivers', 'Communication Protocols', 'Hardware Debug'],
      soft: ['Hardware-software integration', 'Low-level optimization']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Разработал firmware для 3 IoT-устройств на STM32',
            'Написал драйверы для 5 периферийных устройств',
            'Оптимизировал энергопотребление на 30%'
          ],
          en: [
            'Developed firmware for 3 IoT devices on STM32',
            'Wrote drivers for 5 peripheral devices',
            'Optimized power consumption by 30%'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал архитектуру firmware для линейки из 10 устройств',
            'Сократил время boot на 70% через оптимизацию startup sequence',
            'Разработал OTA update систему с 99.9% success rate'
          ],
          en: [
            'Architected firmware for product line of 10 devices',
            'Reduced boot time by 70% through startup sequence optimization',
            'Built OTA update system with 99.9% success rate'
          ]
        }
      }
    },
    
    atsKeywords: ['C', 'C++', 'Rust', 'Embedded', 'RTOS', 'FreeRTOS', 'Linux Kernel', 'ARM', 'RISC-V', 'IoT', 'Firmware', 'Device Drivers', 'I2C', 'SPI', 'UART', 'CAN']
  }
};

/**
 * Action verbs для Engineering
 */
export const ENGINEERING_ACTION_VERBS = {
  ru: {
    creation: ['Разработал', 'Создал', 'Спроектировал', 'Реализовал', 'Построил', 'Написал'],
    optimization: ['Оптимизировал', 'Ускорил', 'Улучшил', 'Рефакторил', 'Масштабировал'],
    leadership: ['Возглавил', 'Руководил', 'Менторил', 'Координировал', 'Обучил'],
    problem_solving: ['Решил', 'Устранил', 'Диагностировал', 'Отладил', 'Исследовал']
  },
  en: {
    creation: ['Developed', 'Built', 'Designed', 'Implemented', 'Architected', 'Created'],
    optimization: ['Optimized', 'Improved', 'Enhanced', 'Refactored', 'Scaled', 'Accelerated'],
    leadership: ['Led', 'Managed', 'Mentored', 'Coordinated', 'Trained', 'Guided'],
    problem_solving: ['Solved', 'Fixed', 'Debugged', 'Diagnosed', 'Investigated', 'Resolved']
  }
};

export default ENGINEERING_ROLES;

