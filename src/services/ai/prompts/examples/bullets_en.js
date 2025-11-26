/**
 * Few-shot examples for Bullet Points in English
 * XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]
 */

export const BULLET_EXAMPLES_EN = {
  /**
   * Development / Engineering
   */
  development: [
    {
      before: 'Developed API for mobile application',
      after: 'Designed and implemented REST API for mobile app with 50K+ DAU, reducing response time by 60% (from 500ms to 200ms) through PostgreSQL query optimization',
      focus: 'Added: scale (50K DAU), metric (60%), how achieved (SQL optimization)'
    },
    {
      before: 'Worked on improving website performance',
      after: 'Optimized critical endpoints, reducing average response time from 800ms to 200ms (75%), which increased checkout conversion by 12%',
      focus: 'Specific before/after numbers, business impact'
    },
    {
      before: 'Wrote unit tests for the project',
      after: 'Implemented TDD practices and wrote 200+ unit tests, increasing code coverage from 30% to 85% and reducing production bugs by 40%',
      focus: 'Quantitative results, quality impact'
    },
    {
      before: 'Refactored legacy code',
      after: 'Refactored legacy module (15K LOC), reducing technical debt by 60% and improving build time from 10 to 3 minutes',
      focus: 'Scope of work, measurable improvements'
    },
    {
      before: 'Developed microservices',
      after: 'Architected and implemented 5 microservices in Go, handling 10K RPS with latency < 50ms',
      focus: 'Quantity, technology, performance metrics'
    }
  ],

  /**
   * Leadership / Management
   */
  leadership: [
    {
      before: 'Led a team of developers',
      after: 'Led team of 5 engineers, implementing code review practices and reducing production bugs by 40%',
      focus: 'Team size, specific action, result'
    },
    {
      before: 'Conducted code reviews',
      after: 'Performed 500+ code reviews annually, identifying 30+ critical vulnerabilities before production',
      focus: 'Volume of work, security impact'
    },
    {
      before: 'Mentored junior developers',
      after: 'Mentored 3 junior developers, with 2 receiving promotions to mid-level within 8 months',
      focus: 'Number of people, concrete mentoring outcome'
    },
    {
      before: 'Participated in hiring new employees',
      after: 'Conducted 40+ technical interviews, hiring 8 engineers (100% retention rate in first year)',
      focus: 'Interview count, hiring outcome, retention'
    }
  ],

  /**
   * DevOps / Infrastructure
   */
  devops: [
    {
      before: 'Set up CI/CD',
      after: 'Implemented CI/CD pipeline on GitLab, reducing deployment time from 2 hours to 15 minutes and increasing release frequency from 1 to 10 per week',
      focus: 'Before/after time, release frequency'
    },
    {
      before: 'Worked with Kubernetes',
      after: 'Migrated 20 services to Kubernetes, reducing infrastructure costs by 35% ($100K/year) while improving reliability to 99.9%',
      focus: 'Migration scale, cost savings, SLA'
    },
    {
      before: 'Monitored systems',
      after: 'Built monitoring system using Prometheus/Grafana, reducing MTTR from 4 hours to 30 minutes',
      focus: 'Tech stack, MTTR metric'
    }
  ],

  /**
   * Product / Analytics
   */
  product: [
    {
      before: 'Analyzed data for product',
      after: 'Conducted A/B testing for 15 features, identifying 3 solutions that increased retention by 25%',
      focus: 'Number of tests, concrete result'
    },
    {
      before: 'Worked with product metrics',
      after: 'Built product metrics dashboard, reducing time for data-driven decisions from 2 days to 2 hours',
      focus: 'Specific deliverable, time savings'
    }
  ]
};

/**
 * Strong action verbs for English (by category)
 */
export const ACTION_VERBS_BULLETS_EN = {
  creation: [
    'Developed', 'Designed', 'Created', 'Built', 
    'Implemented', 'Deployed', 'Launched', 'Architected'
  ],
  improvement: [
    'Optimized', 'Improved', 'Accelerated', 'Modernized',
    'Automated', 'Streamlined', 'Refactored', 'Enhanced'
  ],
  reduction: [
    'Reduced', 'Decreased', 'Minimized', 'Eliminated', 'Cut'
  ],
  growth: [
    'Increased', 'Boosted', 'Scaled', 'Expanded', 'Doubled', 'Grew'
  ],
  leadership: [
    'Led', 'Managed', 'Directed', 'Mentored',
    'Trained', 'Hired', 'Built team of'
  ],
  analysis: [
    'Analyzed', 'Researched', 'Identified', 'Evaluated', 'Tested', 'Assessed'
  ]
};

/**
 * XYZ templates for different achievement types
 */
export const XYZ_TEMPLATES_EN = {
  performance: '[Verb] [what], [improvement metric] (from X to Y), by [how]',
  scale: '[Verb] [system/product] serving [scale: users/RPS/data volume]',
  cost: '[Verb] [what], reducing costs by [%/$] through [how]',
  team: '[Verb] team of [N] engineers, [team outcome]',
  quality: '[Verb] [practice/process], [quality metric: bugs, coverage, SLA]'
};

/**
 * ATS-friendly metrics to include
 */
export const ATS_METRICS_EN = {
  performance: ['response time', 'latency', 'throughput', 'RPS', 'load time', 'uptime'],
  business: ['revenue', 'conversion', 'retention', 'CAC', 'LTV', 'NPS', 'DAU', 'MAU'],
  engineering: ['code coverage', 'deployment frequency', 'MTTR', 'bug rate', 'tech debt'],
  scale: ['users', 'requests', 'transactions', 'data volume', 'servers', 'services']
};

export default BULLET_EXAMPLES_EN;

