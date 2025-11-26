/**
 * Few-shot examples for Summary in English
 * Good and bad examples for AI training
 */

export const SUMMARY_EXAMPLES_EN = {
  /**
   * IT / Software Development
   */
  it: [
    {
      level: 'junior',
      bad: 'Entry-level developer looking for opportunities. I know JavaScript and want to grow.',
      good: 'Frontend Developer with 1.5 years of commercial experience in the React ecosystem. Contributed to 3 web applications serving 10K+ users. Proficient in TypeScript, React, and Redux. Actively pursuing best practices in testing and architectural patterns.',
      why: 'Specific numbers, technologies, focus on results instead of wishes'
    },
    {
      level: 'middle',
      bad: 'Experienced developer with good skills. Worked at several companies. Team player.',
      good: 'Full Stack Developer with 4+ years building high-performance web applications. Optimized API performance in my last project, reducing response time by 60% (800ms → 300ms). Expert in Node.js, React, and PostgreSQL. Successfully mentored 2 junior developers.',
      why: 'Concrete improvement metrics, tech stack, leadership experience'
    },
    {
      level: 'senior',
      bad: 'Senior developer with extensive experience. Worked on large projects. Know many technologies.',
      good: 'Senior Backend Engineer with 8+ years designing distributed systems. Architected a microservices platform processing 50M+ daily requests. Led a team of 6 engineers, improving velocity by 35%. Expert in Go, Kubernetes, and AWS. Speaker at 3 tech conferences.',
      why: 'System scale, leadership, public expertise, specific numbers'
    },
    {
      level: 'lead',
      bad: 'Tech Lead with team management experience. Understand architecture and processes.',
      good: 'Engineering Manager / Tech Lead with 10+ years in product development. Scaled engineering team from 3 to 15 engineers in 2 years. Implemented CI/CD practices, reducing time-to-production from 2 weeks to 2 days. Full ownership from architecture to production deployment.',
      why: 'Team growth, process improvements with metrics, business impact'
    }
  ],

  /**
   * Data Science / Analytics
   */
  data: [
    {
      level: 'middle',
      bad: 'Data Scientist with machine learning experience. Work with Python and various libraries.',
      good: 'Data Scientist with 3+ years in predictive analytics for e-commerce. Built ML recommendation model that increased conversion by 23% (+$2M annual revenue). Expert in Python, TensorFlow, and SQL. Published in 2 peer-reviewed journals.',
      why: 'Business metrics, revenue impact, scientific publications'
    }
  ],

  /**
   * DevOps / SRE
   */
  devops: [
    {
      level: 'senior',
      bad: 'DevOps engineer with cloud and container experience.',
      good: 'Senior DevOps Engineer with 6+ years building Cloud-Native infrastructure. Migrated monolith to Kubernetes, reducing infrastructure costs by 40% ($500K/year savings). Achieved 99.95% uptime for critical services. AWS Solutions Architect certified.',
      why: 'Cost savings, SLA metrics, certifications'
    }
  ],

  /**
   * Product / Project Management
   */
  product: [
    {
      level: 'middle',
      bad: 'Product Manager with IT product experience. Good at working with teams and stakeholders.',
      good: 'Product Manager with 4+ years in B2B SaaS. Launched 2 products from 0 to $1M ARR within 18 months. Managed product roadmap for 50K+ active users. Expert in discovery processes, A/B testing, and data-driven decisions.',
      why: 'Business metrics (ARR), product scale, specific methodologies'
    }
  ]
};

/**
 * Common anti-patterns for English Summary
 */
export const ANTI_PATTERNS_EN = [
  'Hard-working, detail-oriented team player', // Clichés without proof
  'Seeking opportunities to grow', // Self-focused, not value-focused
  'Worked at big companies', // No specifics
  'Know many technologies', // Without listing them
  'Extensive experience', // No numbers
  'Successfully completed tasks', // Vague
  'Fast learner', // Cliché
  'Ready for new challenges', // Empty phrase
  'Passionate about technology', // Overused
  'Results-driven professional', // Generic
];

/**
 * Strong action verbs for English Summary
 */
export const ACTION_VERBS_EN = {
  leadership: ['Led', 'Managed', 'Directed', 'Mentored', 'Built', 'Scaled'],
  achievement: ['Achieved', 'Increased', 'Reduced', 'Optimized', 'Improved', 'Boosted'],
  creation: ['Developed', 'Designed', 'Implemented', 'Created', 'Launched', 'Architected'],
  expertise: ['Expert in', 'Specialized in', 'Proficient in', 'Deep expertise in']
};

/**
 * ATS-friendly keywords by role
 */
export const ATS_KEYWORDS = {
  frontend: ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Webpack', 'Performance Optimization'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'REST API', 'GraphQL', 'Microservices', 'PostgreSQL', 'MongoDB', 'Redis'],
  fullstack: ['Full Stack', 'End-to-End', 'Frontend', 'Backend', 'API Design', 'Database Design', 'Cloud Services'],
  devops: ['CI/CD', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'Infrastructure as Code', 'Monitoring'],
  data: ['Machine Learning', 'Data Analysis', 'Python', 'SQL', 'TensorFlow', 'PyTorch', 'Data Pipeline', 'ETL', 'Visualization'],
  product: ['Product Management', 'Roadmap', 'Agile', 'Scrum', 'User Research', 'A/B Testing', 'Metrics', 'Stakeholder Management']
};

export default SUMMARY_EXAMPLES_EN;

