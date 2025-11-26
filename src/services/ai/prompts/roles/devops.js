/**
 * DevOps & Infrastructure Roles
 * DevOps Engineer, SRE, Platform Engineer, Cloud Engineer, etc.
 */

export const DEVOPS_ROLES = {
  // ============================================
  // DEVOPS ENGINEER
  // ============================================
  devops_engineer: {
    id: 'devops_engineer',
    title: {
      ru: 'DevOps Engineer',
      en: 'DevOps Engineer'
    },
    aliases: ['DevOps', 'Infrastructure Engineer', 'Build Engineer'],
    
    skills: {
      core: ['CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'AWS/GCP/Azure', 'Linux'],
      advanced: ['GitOps', 'Service Mesh', 'Monitoring', 'IaC', 'Security'],
      soft: ['Automation mindset', 'Collaboration', 'Problem-solving']
    },
    
    levels: {
      junior: {
        achievements: {
          ru: [
            'Настроил CI/CD pipeline для 10 микросервисов',
            'Написал 50+ Terraform modules для AWS инфраструктуры',
            'Контейнеризовал 15 приложений в Docker',
            'Сократил время деплоя с 2 часов до 15 минут'
          ],
          en: [
            'Set up CI/CD pipeline for 10 microservices',
            'Wrote 50+ Terraform modules for AWS infrastructure',
            'Containerized 15 applications with Docker',
            'Reduced deployment time from 2 hours to 15 minutes'
          ]
        }
      },
      middle: {
        achievements: {
          ru: [
            'Внедрил GitOps с ArgoCD для 30 сервисов',
            'Построил Kubernetes platform для 5 команд разработки',
            'Снизил cloud costs на 40% ($150K/год) через optimization',
            'Достиг 99.95% uptime для production систем'
          ],
          en: [
            'Implemented GitOps with ArgoCD for 30 services',
            'Built Kubernetes platform for 5 development teams',
            'Reduced cloud costs by 40% ($150K/year) through optimization',
            'Achieved 99.95% uptime for production systems'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал multi-cloud архитектуру для disaster recovery',
            'Внедрил Platform Engineering практики для 100+ разработчиков',
            'Сократил MTTR с 4 часов до 15 минут через automation',
            'Построил DevOps team из 6 инженеров'
          ],
          en: [
            'Architected multi-cloud infrastructure for disaster recovery',
            'Implemented Platform Engineering practices for 100+ developers',
            'Reduced MTTR from 4 hours to 15 minutes through automation',
            'Built DevOps team of 6 engineers'
          ]
        }
      }
    },
    
    atsKeywords: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GCP', 'Azure', 'Jenkins', 'GitLab CI', 'ArgoCD', 'Ansible', 'Linux', 'IaC']
  },

  // ============================================
  // SITE RELIABILITY ENGINEER (SRE)
  // ============================================
  sre: {
    id: 'sre',
    title: {
      ru: 'Site Reliability Engineer',
      en: 'Site Reliability Engineer'
    },
    aliases: ['SRE', 'Reliability Engineer', 'Production Engineer'],
    
    skills: {
      core: ['Linux', 'Python/Go', 'Monitoring', 'Incident Management', 'SLOs/SLIs'],
      advanced: ['Chaos Engineering', 'Capacity Planning', 'Performance Tuning', 'Automation'],
      soft: ['On-call', 'Postmortem culture', 'Cross-team collaboration']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Внедрил SLO-based approach, повысив reliability с 99.5% до 99.95%',
            'Построил observability stack (Prometheus, Grafana, Loki)',
            'Сократил MTTR с 2 часов до 20 минут',
            'Автоматизировал 80% рутинных operational tasks'
          ],
          en: [
            'Implemented SLO-based approach, improving reliability from 99.5% to 99.95%',
            'Built observability stack (Prometheus, Grafana, Loki)',
            'Reduced MTTR from 2 hours to 20 minutes',
            'Automated 80% of routine operational tasks'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал SRE practices для организации из 200+ инженеров',
            'Внедрил chaos engineering, выявив 15 failure modes до production',
            'Достиг 99.99% availability для критичных сервисов ($50M revenue)',
            'Построил SRE team из 8 человек и on-call rotation'
          ],
          en: [
            'Designed SRE practices for 200+ engineer organization',
            'Implemented chaos engineering, identifying 15 failure modes before production',
            'Achieved 99.99% availability for critical services ($50M revenue)',
            'Built SRE team of 8 and established on-call rotation'
          ]
        }
      }
    },
    
    atsKeywords: ['SRE', 'Site Reliability', 'Monitoring', 'Observability', 'Prometheus', 'Grafana', 'Incident Management', 'SLO', 'SLI', 'Chaos Engineering', 'On-call', 'Linux', 'Python', 'Go']
  },

  // ============================================
  // PLATFORM ENGINEER
  // ============================================
  platform_engineer: {
    id: 'platform_engineer',
    title: {
      ru: 'Platform Engineer',
      en: 'Platform Engineer'
    },
    aliases: ['Platform Developer', 'Internal Developer Platform Engineer'],
    
    skills: {
      core: ['Kubernetes', 'IaC', 'CI/CD', 'Developer Experience', 'Internal Tools'],
      advanced: ['Service Mesh', 'GitOps', 'Self-service Platforms', 'Backstage'],
      soft: ['Developer empathy', 'Product thinking', 'Documentation']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Построил Internal Developer Platform для 50 разработчиков',
            'Создал self-service provisioning, сократив время setup с 2 дней до 10 минут',
            'Внедрил golden paths, ускорив onboarding на 60%',
            'Разработал 20+ reusable Helm charts'
          ],
          en: [
            'Built Internal Developer Platform for 50 developers',
            'Created self-service provisioning, reducing setup time from 2 days to 10 minutes',
            'Implemented golden paths, accelerating onboarding by 60%',
            'Developed 20+ reusable Helm charts'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал platform architecture для 200+ микросервисов',
            'Внедрил Backstage, объединив 10 внутренних tools',
            'Сократил cognitive load разработчиков на 50%',
            'Построил Platform team из 5 инженеров'
          ],
          en: [
            'Architected platform for 200+ microservices',
            'Implemented Backstage, consolidating 10 internal tools',
            'Reduced developer cognitive load by 50%',
            'Built Platform team of 5 engineers'
          ]
        }
      }
    },
    
    atsKeywords: ['Platform Engineering', 'Kubernetes', 'Developer Experience', 'Internal Developer Platform', 'Backstage', 'GitOps', 'IaC', 'Self-service']
  },

  // ============================================
  // CLOUD ENGINEER
  // ============================================
  cloud_engineer: {
    id: 'cloud_engineer',
    title: {
      ru: 'Cloud Engineer',
      en: 'Cloud Engineer'
    },
    aliases: ['Cloud Architect', 'AWS Engineer', 'GCP Engineer', 'Azure Engineer'],
    
    skills: {
      core: ['AWS/GCP/Azure', 'Terraform', 'Networking', 'Security', 'Cost Optimization'],
      advanced: ['Multi-cloud', 'FinOps', 'Landing Zones', 'Well-Architected Framework'],
      soft: ['Architecture thinking', 'Vendor management', 'Documentation']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Мигрировал 50 сервисов в AWS с on-premise',
            'Внедрил AWS Landing Zone для 10 accounts',
            'Снизил cloud costs на 35% через Reserved Instances и optimization',
            'Получил 3 AWS сертификации (Solutions Architect, DevOps, Security)'
          ],
          en: [
            'Migrated 50 services to AWS from on-premise',
            'Implemented AWS Landing Zone for 10 accounts',
            'Reduced cloud costs by 35% through Reserved Instances and optimization',
            'Obtained 3 AWS certifications (Solutions Architect, DevOps, Security)'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Спроектировал multi-region архитектуру с RPO < 1 min',
            'Построил FinOps практику, сэкономив $1M/год',
            'Внедрил cloud security baseline для 100+ accounts',
            'Руководил командой из 5 cloud инженеров'
          ],
          en: [
            'Designed multi-region architecture with RPO < 1 min',
            'Built FinOps practice, saving $1M/year',
            'Implemented cloud security baseline for 100+ accounts',
            'Led team of 5 cloud engineers'
          ]
        }
      }
    },
    
    atsKeywords: ['Cloud', 'AWS', 'GCP', 'Azure', 'Terraform', 'CloudFormation', 'Networking', 'Security', 'Cost Optimization', 'FinOps', 'Multi-cloud', 'Solutions Architect']
  },

  // ============================================
  // SECURITY ENGINEER
  // ============================================
  security_engineer: {
    id: 'security_engineer',
    title: {
      ru: 'Security Engineer',
      en: 'Security Engineer'
    },
    aliases: ['AppSec Engineer', 'DevSecOps Engineer', 'Cybersecurity Engineer'],
    
    skills: {
      core: ['Application Security', 'SAST/DAST', 'Penetration Testing', 'Security Audits'],
      advanced: ['Threat Modeling', 'Security Architecture', 'Compliance (SOC2, GDPR)', 'Incident Response'],
      soft: ['Risk communication', 'Security awareness training', 'Cross-team influence']
    },
    
    levels: {
      middle: {
        achievements: {
          ru: [
            'Внедрил SAST/DAST в CI/CD, выявив 200+ уязвимостей',
            'Провёл 20+ security assessments для новых фич',
            'Достиг SOC 2 Type II compliance',
            'Обучил 100+ разработчиков secure coding practices'
          ],
          en: [
            'Implemented SAST/DAST in CI/CD, identifying 200+ vulnerabilities',
            'Conducted 20+ security assessments for new features',
            'Achieved SOC 2 Type II compliance',
            'Trained 100+ developers on secure coding practices'
          ]
        }
      },
      senior: {
        achievements: {
          ru: [
            'Построил Application Security program с нуля',
            'Снизил critical vulnerabilities на 90% за год',
            'Внедрил bug bounty program, выявивший 50+ issues',
            'Руководил security incident response для 5 incidents'
          ],
          en: [
            'Built Application Security program from scratch',
            'Reduced critical vulnerabilities by 90% in one year',
            'Implemented bug bounty program, identifying 50+ issues',
            'Led security incident response for 5 incidents'
          ]
        }
      }
    },
    
    atsKeywords: ['Security', 'AppSec', 'DevSecOps', 'SAST', 'DAST', 'Penetration Testing', 'Vulnerability Assessment', 'SOC2', 'GDPR', 'Threat Modeling', 'OWASP', 'Security Architecture']
  }
};

/**
 * Action verbs для DevOps
 */
export const DEVOPS_ACTION_VERBS = {
  ru: {
    infrastructure: ['Построил', 'Спроектировал', 'Развернул', 'Мигрировал', 'Масштабировал'],
    automation: ['Автоматизировал', 'Внедрил', 'Настроил', 'Оптимизировал', 'Интегрировал'],
    reliability: ['Обеспечил', 'Достиг', 'Повысил', 'Снизил', 'Предотвратил'],
    leadership: ['Руководил', 'Возглавил', 'Координировал', 'Обучил']
  },
  en: {
    infrastructure: ['Built', 'Designed', 'Deployed', 'Migrated', 'Scaled', 'Architected'],
    automation: ['Automated', 'Implemented', 'Configured', 'Optimized', 'Integrated'],
    reliability: ['Ensured', 'Achieved', 'Improved', 'Reduced', 'Prevented'],
    leadership: ['Led', 'Headed', 'Coordinated', 'Trained', 'Managed']
  }
};

export default DEVOPS_ROLES;

