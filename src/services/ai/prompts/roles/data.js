/**
 * Data Roles
 * Data Analyst, Data Scientist, ML Engineer, Data Engineer, BI Analyst, etc.
 */

export const DATA_ROLES = {
  // ============================================
  // DATA ANALYST
  // ============================================
  data_analyst: {
    id: 'data_analyst',
    title: {
      ru: 'Data Analyst',
      en: 'Data Analyst'
    },
    aliases: ['Analytics Analyst', 'Product Analyst', 'Business Analyst (Data)'],
    
    skills: {
      core: ['SQL', 'Python', 'Excel', 'Data Visualization', 'Tableau', 'Looker'],
      advanced: ['Statistical Analysis', 'A/B Testing', 'Cohort Analysis', 'Predictive Modeling'],
      soft: ['Data storytelling', 'Business acumen', 'Stakeholder communication']
    },
    
    levels: {
      junior: {
        focus: ['SQL queries', 'Dashboard creation', 'Ad-hoc analysis', 'Data cleaning'],
        achievements: {
          ru: [
            'Создал 20+ дашбордов в Tableau для отслеживания ключевых метрик',
            'Автоматизировал 10 еженедельных отчётов, сэкономив 15 часов/неделю',
            'Провёл анализ воронки, выявив 3 точки оттока пользователей',
            'Написал 100+ SQL запросов для ad-hoc анализа'
          ],
          en: [
            'Built 20+ Tableau dashboards for key metrics tracking',
            'Automated 10 weekly reports, saving 15 hours/week',
            'Conducted funnel analysis, identifying 3 user drop-off points',
            'Wrote 100+ SQL queries for ad-hoc analysis'
          ]
        }
      },
      middle: {
        focus: ['Deep-dive analysis', 'A/B testing', 'Metrics definition', 'Cross-team projects'],
        achievements: {
          ru: [
            'Проанализировал 50+ A/B тестов, выявив инсайты на $2M выручки',
            'Внедрил систему product-метрик для 3 команд',
            'Построил модель прогнозирования churn с точностью 85%',
            'Обучил 5 менеджеров self-service аналитике'
          ],
          en: [
            'Analyzed 50+ A/B tests, identifying insights worth $2M revenue',
            'Implemented product metrics framework for 3 teams',
            'Built churn prediction model with 85% accuracy',
            'Trained 5 managers on self-service analytics'
          ]
        }
      },
      senior: {
        focus: ['Analytics strategy', 'Team leadership', 'Complex analysis', 'Executive reporting'],
        achievements: {
          ru: [
            'Построил аналитическую функцию с 5 аналитиками',
            'Внедрил data-driven культуру, увеличив использование данных на 200%',
            'Разработал фреймворк метрик, ставший стандартом для 10 команд',
            'Выявил инсайты, приведшие к $10M дополнительной выручки'
          ],
          en: [
            'Built analytics function with 5 analysts',
            'Established data-driven culture, increasing data usage by 200%',
            'Developed metrics framework adopted by 10 teams',
            'Identified insights leading to $10M additional revenue'
          ]
        }
      }
    },
    
    atsKeywords: ['SQL', 'Python', 'Tableau', 'Looker', 'Power BI', 'Data Analysis', 'A/B Testing', 'Statistical Analysis', 'Data Visualization', 'Excel', 'Google Analytics', 'Amplitude', 'Mixpanel', 'ETL', 'Data Modeling']
  },

  // ============================================
  // DATA SCIENTIST
  // ============================================
  data_scientist: {
    id: 'data_scientist',
    title: {
      ru: 'Data Scientist',
      en: 'Data Scientist'
    },
    aliases: ['ML Scientist', 'Applied Scientist', 'Research Scientist'],
    
    skills: {
      core: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'PyTorch'],
      advanced: ['Deep Learning', 'NLP', 'Computer Vision', 'A/B Testing', 'Causal Inference'],
      soft: ['Research mindset', 'Communication', 'Business translation']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Разработал модель классификации с precision 92%',
            'Создал feature engineering pipeline для 20 признаков',
            'Провёл EDA для 10+ датасетов',
            'Внедрил 3 ML-модели в production'
          ],
          en: [
            'Developed classification model with 92% precision',
            'Built feature engineering pipeline for 20 features',
            'Conducted EDA for 10+ datasets',
            'Deployed 3 ML models to production'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Разработал рекомендательную систему, увеличившую CTR на 40%',
            'Построил NLP-модель для анализа отзывов с accuracy 88%',
            'Внедрил A/B тестирование ML-моделей с proper statistical analysis',
            'Сократил время инференса модели с 500мс до 50мс'
          ],
          en: [
            'Built recommendation system that increased CTR by 40%',
            'Developed NLP model for review analysis with 88% accuracy',
            'Implemented A/B testing for ML models with proper statistical analysis',
            'Reduced model inference time from 500ms to 50ms'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал ML-платформу для 10+ data scientists',
            'Разработал модель fraud detection, сэкономившую $5M/год',
            'Внедрил MLOps практики, сократив time-to-production на 70%',
            'Опубликовал 3 статьи на ML-конференциях (NeurIPS, ICML)'
          ],
          en: [
            'Architected ML platform for 10+ data scientists',
            'Built fraud detection model saving $5M/year',
            'Implemented MLOps practices, reducing time-to-production by 70%',
            'Published 3 papers at ML conferences (NeurIPS, ICML)'
          ]
        }
      }
    },
    
    atsKeywords: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Statistical Modeling', 'A/B Testing', 'Feature Engineering', 'MLOps', 'Scikit-learn', 'Data Science']
  },

  // ============================================
  // ML ENGINEER
  // ============================================
  ml_engineer: {
    id: 'ml_engineer',
    title: {
      ru: 'ML Engineer',
      en: 'ML Engineer'
    },
    aliases: ['Machine Learning Engineer', 'MLOps Engineer', 'AI Engineer'],
    
    skills: {
      core: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'MLOps'],
      advanced: ['Model Serving', 'Feature Store', 'ML Pipelines', 'Model Monitoring'],
      soft: ['Bridge between DS and Engineering', 'System thinking']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Внедрил 10+ ML моделей в production с SLA 99.9%',
            'Построил ML pipeline, сократив время от эксперимента до production с 4 недель до 3 дней',
            'Оптимизировал инференс, снизив latency с 200мс до 20мс',
            'Создал feature store для 100+ фич, используемых 5 командами'
          ],
          en: [
            'Deployed 10+ ML models to production with 99.9% SLA',
            'Built ML pipeline reducing experiment-to-production time from 4 weeks to 3 days',
            'Optimized inference, reducing latency from 200ms to 20ms',
            'Created feature store for 100+ features used by 5 teams'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал ML-инфраструктуру, обслуживающую 1M+ predictions/day',
            'Внедрил A/B тестирование моделей, увеличив скорость экспериментов на 300%',
            'Построил систему мониторинга model drift, предотвратив 5 incidents',
            'Масштабировал training pipeline до 1TB данных'
          ],
          en: [
            'Architected ML infrastructure serving 1M+ predictions/day',
            'Implemented model A/B testing, increasing experimentation speed by 300%',
            'Built model drift monitoring system, preventing 5 incidents',
            'Scaled training pipeline to handle 1TB of data'
          ]
        }
      }
    },
    
    atsKeywords: ['MLOps', 'Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'Model Serving', 'Feature Store', 'CI/CD', 'Kubeflow', 'MLflow', 'SageMaker']
  },

  // ============================================
  // DATA ENGINEER
  // ============================================
  data_engineer: {
    id: 'data_engineer',
    title: {
      ru: 'Data Engineer',
      en: 'Data Engineer'
    },
    aliases: ['Analytics Engineer', 'ETL Developer', 'Big Data Engineer'],
    
    skills: {
      core: ['SQL', 'Python', 'Spark', 'Airflow', 'Data Warehousing', 'ETL'],
      advanced: ['Kafka', 'Flink', 'dbt', 'Snowflake', 'Databricks', 'Data Modeling'],
      soft: ['System design', 'Data architecture', 'Documentation']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Построил ETL pipeline обрабатывающий 10TB данных в день',
            'Внедрил dbt, сократив время разработки data models на 50%',
            'Создал 50+ Airflow DAGs для автоматизации data workflows',
            'Оптимизировал Spark jobs, снизив время обработки с 4 часов до 30 минут'
          ],
          en: [
            'Built ETL pipeline processing 10TB data daily',
            'Implemented dbt, reducing data model development time by 50%',
            'Created 50+ Airflow DAGs for data workflow automation',
            'Optimized Spark jobs, reducing processing time from 4 hours to 30 minutes'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал data lakehouse архитектуру для 100+ источников данных',
            'Внедрил real-time data pipeline на Kafka, обрабатывающий 1M events/sec',
            'Снизил затраты на data infrastructure на 40% ($200K/год)',
            'Построил data platform для 50+ аналитиков и data scientists'
          ],
          en: [
            'Architected data lakehouse for 100+ data sources',
            'Built real-time data pipeline on Kafka processing 1M events/sec',
            'Reduced data infrastructure costs by 40% ($200K/year)',
            'Built data platform for 50+ analysts and data scientists'
          ]
        }
      }
    },
    
    atsKeywords: ['Data Engineering', 'SQL', 'Python', 'Spark', 'Airflow', 'ETL', 'Data Warehousing', 'Snowflake', 'BigQuery', 'Redshift', 'Kafka', 'dbt', 'Data Modeling', 'Databricks']
  },

  // ============================================
  // BI ANALYST
  // ============================================
  bi_analyst: {
    id: 'bi_analyst',
    title: {
      ru: 'BI Analyst',
      en: 'BI Analyst'
    },
    aliases: ['Business Intelligence Analyst', 'BI Developer', 'Reporting Analyst'],
    
    skills: {
      core: ['SQL', 'Tableau', 'Power BI', 'Looker', 'Data Modeling', 'ETL'],
      advanced: ['DAX', 'LookML', 'Dimensional Modeling', 'Data Governance'],
      soft: ['Business partnering', 'Requirements gathering', 'Training']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Создал 30+ дашбордов для C-level executives',
            'Внедрил self-service BI, снизив количество ad-hoc запросов на 60%',
            'Разработал data model для 5 бизнес-доменов',
            'Обучил 50+ пользователей работе с BI-инструментами'
          ],
          en: [
            'Built 30+ dashboards for C-level executives',
            'Implemented self-service BI, reducing ad-hoc requests by 60%',
            'Developed data model for 5 business domains',
            'Trained 50+ users on BI tools'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Возглавил BI Center of Excellence с 5 аналитиками',
            'Внедрил единый semantic layer для всей компании',
            'Снизил время получения отчётов с 2 дней до 2 часов',
            'Построил data governance framework для 100+ датасетов'
          ],
          en: [
            'Led BI Center of Excellence with 5 analysts',
            'Implemented company-wide semantic layer',
            'Reduced report delivery time from 2 days to 2 hours',
            'Built data governance framework for 100+ datasets'
          ]
        }
      }
    },
    
    atsKeywords: ['Business Intelligence', 'SQL', 'Tableau', 'Power BI', 'Looker', 'Data Visualization', 'Reporting', 'Data Modeling', 'DAX', 'ETL', 'Self-service BI']
  }
};

/**
 * Action verbs для Data
 */
export const DATA_ACTION_VERBS = {
  ru: {
    analysis: ['Проанализировал', 'Исследовал', 'Выявил', 'Измерил', 'Оценил'],
    building: ['Построил', 'Разработал', 'Создал', 'Внедрил', 'Спроектировал'],
    optimization: ['Оптимизировал', 'Улучшил', 'Ускорил', 'Автоматизировал'],
    delivery: ['Доставил', 'Обеспечил', 'Предоставил', 'Масштабировал']
  },
  en: {
    analysis: ['Analyzed', 'Researched', 'Identified', 'Measured', 'Evaluated'],
    building: ['Built', 'Developed', 'Created', 'Implemented', 'Architected'],
    optimization: ['Optimized', 'Improved', 'Accelerated', 'Automated', 'Streamlined'],
    delivery: ['Delivered', 'Enabled', 'Provided', 'Scaled', 'Launched']
  }
};

export default DATA_ROLES;

