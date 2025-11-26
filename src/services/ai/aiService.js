/**
 * AI Service
 * Централизованный сервис для работы с AI API
 * Использует fal.ai как primary и Replicate как fallback
 */

import { maskPII, unmaskPII } from '../../utils/piiMasking';
import { aiRouter } from './aiRouter';
import prompts from './prompts';

// Режим работы
const MOCK_ENABLED = import.meta.env.VITE_AI_MOCK_MODE === 'true';
const MOCK_DELAY = 1500;

/**
 * Мок для AI ответа (для разработки без API ключей)
 */
function mockAIResponse(type, input, locale) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'improve_bullet':
          resolve({
            content: locale === 'ru' 
              ? "Разработал и внедрил масштабируемую REST API на FastAPI, что сократило время отклика на 40% (с 500мс до 300мс) и увеличило пропускную способность системы до 2000 запросов/сек."
              : "Designed and implemented scalable REST API using FastAPI, reducing response time by 40% (from 500ms to 300ms) and increasing system throughput to 2,000 requests/sec.",
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        case 'improve_summary':
          resolve({
            content: locale === 'ru'
              ? "Высококвалифицированный Full Stack разработчик с 5+ годами опыта в создании масштабируемых веб-приложений. Эксперт в экосистеме JavaScript (React, Node.js) и облачных архитектурах AWS. Успешно руководил командой из 3 человек, повысив производительность разработки на 30%. Страстный сторонник чистого кода, TDD и best practices."
              : "Highly qualified Full Stack Developer with 5+ years of experience building scalable web applications. Expert in JavaScript ecosystem (React, Node.js) and AWS cloud architectures. Successfully led a team of 3, increasing development productivity by 30%. Passionate advocate of clean code, TDD, and best practices.",
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        case 'parse_job':
          resolve({
            content: JSON.stringify({
              role: "Senior Backend Developer",
              seniority: "Senior",
              company: "TechCorp",
              location: "Remote",
              salary: { min: 200000, max: 350000, currency: "RUB" },
              hardSkills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
              softSkills: ["Leadership", "Communication", "Problem-solving"],
              mustHave: ["Python", "FastAPI", "PostgreSQL"],
              niceToHave: ["Docker", "AWS", "CI/CD"],
              responsibilities: ["Разработка backend сервисов", "Code review", "Менторинг"],
              benefits: ["ДМС", "Удалённая работа", "Обучение"]
            }),
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        case 'match_score':
          resolve({
            content: JSON.stringify({
              score: 78,
              matchedSkills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
              missingSkills: ["Python", "FastAPI", "AWS"],
              experienceMatch: "Strong",
              seniorityMatch: "Exact",
              recommendations: [
                "Добавьте опыт работы с Python",
                "Укажите проекты с AWS",
                "Выделите лидерский опыт"
              ],
              summary: "Хороший матч по основным навыкам, рекомендуется добавить Python и облачные технологии"
            }),
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'gap_analysis':
          resolve({
            content: JSON.stringify({
              criticalGaps: [
                { gap: "Python", priority: "high", timeToFix: "1-2 месяца", resources: ["Python.org", "Coursera"] },
                { gap: "FastAPI", priority: "high", timeToFix: "2-3 недели", resources: ["FastAPI docs"] }
              ],
              minorGaps: [
                { gap: "AWS", priority: "medium", timeToFix: "1 месяц", resources: ["AWS Free Tier"] }
              ],
              strengths: ["JavaScript экосистема", "Frontend разработка", "Опыт работы в команде"],
              overallReadiness: "Almost Ready",
              actionPlan: [
                "Пройти курс по Python (2 недели)",
                "Создать pet-project на FastAPI (2 недели)",
                "Получить AWS Cloud Practitioner (1 месяц)"
              ]
            }),
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        case 'tailor_resume':
          resolve({
            content: JSON.stringify({
              tailoredSummary: locale === 'ru'
                ? "Backend-ориентированный Full Stack разработчик с опытом создания высоконагруженных API. Экспертиза в JavaScript/TypeScript, готов к переходу на Python/FastAPI. Опыт работы с PostgreSQL и облачными сервисами."
                : "Backend-focused Full Stack Developer with experience building high-load APIs. Expertise in JavaScript/TypeScript, ready to transition to Python/FastAPI. Experience with PostgreSQL and cloud services.",
              reorderedSkills: ["PostgreSQL", "Node.js", "JavaScript", "TypeScript", "Docker", "React"],
              keywordsToAdd: ["REST API", "микросервисы", "высоконагруженные системы"],
              experiencePriority: [
                { id: 1, relevance: "high", suggestions: "Выделить работу с API" }
              ],
              atsScore: 72,
              improvementTips: [
                "Добавить ключевые слова из вакансии",
                "Указать конкретные метрики",
                "Упомянуть опыт с базами данных"
              ]
            }),
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'cover_letter':
          resolve({
            content: locale === 'ru'
              ? `Уважаемый HR-менеджер,

С большим интересом откликаюсь на позицию Senior Backend Developer в вашей компании. Мой 5-летний опыт в разработке масштабируемых веб-приложений и страсть к созданию эффективных backend-решений делают меня идеальным кандидатом.

В TechCorp я разработал REST API, который обрабатывает 2000+ запросов в секунду, сократив время отклика на 40%. Мой опыт работы с PostgreSQL и микросервисной архитектурой позволит мне быстро влиться в вашу команду.

Буду рад обсудить, как мой опыт может принести пользу вашему проекту.

С уважением,
[Имя]`
              : `Dear Hiring Manager,

I am excited to apply for the Senior Backend Developer position at your company. My 5 years of experience building scalable web applications and passion for creating efficient backend solutions make me an ideal candidate.

At TechCorp, I developed a REST API handling 2,000+ requests per second, reducing response time by 40%. My experience with PostgreSQL and microservices architecture will allow me to quickly contribute to your team.

I would welcome the opportunity to discuss how my experience can benefit your project.

Best regards,
[Name]`,
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'suggest_skills':
          resolve({
            content: JSON.stringify([
              { skill: "Python", reason: "Востребован в backend разработке" },
              { skill: "FastAPI", reason: "Современный Python фреймворк" },
              { skill: "Redis", reason: "Дополнит опыт с базами данных" },
              { skill: "Kubernetes", reason: "Следующий шаг после Docker" },
              { skill: "GraphQL", reason: "Альтернатива REST API" }
            ]),
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'chat':
          resolve({
            content: locale === 'ru'
              ? "Отличный вопрос! Для описания опыта работы рекомендую использовать формулу XYZ: 'Достиг [X] по метрике [Y], делая [Z]'. Например: 'Сократил время загрузки страницы на 40% (с 3с до 1.8с), оптимизировав рендеринг React компонентов'. Это показывает конкретный результат и вашу роль в его достижении."
              : "Great question! For describing work experience, I recommend using the XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. For example: 'Reduced page load time by 40% (from 3s to 1.8s) by optimizing React component rendering'. This shows a concrete result and your role in achieving it.",
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        case 'translate':
          resolve({
            content: locale === 'en'
              ? "Developed backend services for high-load systems processing over 1 million requests daily."
              : "Разрабатывал backend сервисы для высоконагруженных систем, обрабатывающих более 1 миллиона запросов в день.",
            provider: 'mock',
            model: 'mock'
          });
          break;
        
        default:
          resolve({
            content: "AI улучшение применено успешно",
            provider: 'mock',
            model: 'mock'
          });
      }
    }, MOCK_DELAY);
  });
}

/**
 * Основной метод для вызова AI
 */
async function callAI(taskType, systemPrompt, userInput, options = {}) {
  const { locale = 'ru' } = options;
  
  // Маскируем PII перед отправкой
  const { masked, mapping } = maskPII(userInput);
  
  let result;
  
  if (MOCK_ENABLED) {
    result = await mockAIResponse(taskType, masked, locale);
  } else {
    // Используем AI Router для реальных запросов
    result = await aiRouter.route(taskType, systemPrompt, masked, options);
  }
  
  // Восстанавливаем PII в ответе
  if (result.content && typeof result.content === 'string') {
    result.content = unmaskPII(result.content, mapping);
  }
  
  return result;
}

/**
 * Парсинг JSON из ответа AI
 */
function parseJSON(content) {
  try {
    // Убираем markdown форматирование если есть
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse AI JSON response:', e);
    return null;
  }
}

/**
 * Экспортируемые методы
 */
export const aiService = {
  /**
   * Улучшить bullet point опыта работы
   */
  improveBullet: async (text, locale = 'ru') => {
    const result = await callAI(
      'improve_bullet',
      prompts.resume.improveBullet(locale),
      text,
      { locale }
    );
    return result.content;
  },

  /**
   * Улучшить bullet point с несколькими вариантами
   */
  improveBulletVariants: async (text, locale = 'ru', count = 3) => {
    const result = await callAI(
      'improve_bullet',
      prompts.resume.improveBulletVariants(locale, count),
      text,
      { locale }
    );
    // Парсим варианты (ожидаем нумерованный список)
    const variants = result.content
      .split('\n')
      .filter(line => line.match(/^\d+\./))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    return variants.length > 0 ? variants : [result.content];
  },
  
  /**
   * Улучшить профессиональное summary
   */
  improveSummary: async (text, locale = 'ru') => {
    const result = await callAI(
      'improve_summary',
      prompts.resume.improveSummary(locale),
      text,
      { locale }
    );
    return result.content;
  },
  
  /**
   * Парсинг job description
   */
  parseJobDescription: async (jdText, locale = 'ru') => {
    const result = await callAI(
      'parse_job',
      prompts.job.parseJob(locale),
      jdText,
      { locale }
    );
    return parseJSON(result.content) || result.content;
  },

  /**
   * Расчёт Match Score
   */
  calculateMatchScore: async (profile, jobDescription, locale = 'ru') => {
    const input = `
CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB DESCRIPTION:
${jobDescription}
`;
    const result = await callAI(
      'match_score',
      prompts.job.matchScore(locale),
      input,
      { locale }
    );
    return parseJSON(result.content) || result.content;
  },

  /**
   * Gap Analysis
   */
  analyzeGaps: async (profile, jobDescription, locale = 'ru') => {
    const input = `
CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB DESCRIPTION:
${jobDescription}
`;
    const result = await callAI(
      'gap_analysis',
      prompts.job.gapAnalysis(locale),
      input,
      { locale }
    );
    return parseJSON(result.content) || result.content;
  },
  
  /**
   * Адаптация резюме под вакансию
   */
  tailorResume: async (profile, jobDescription, locale = 'ru') => {
    const input = `
CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB DESCRIPTION:
${jobDescription}
`;
    const result = await callAI(
      'tailor_resume',
      prompts.tailor.tailorResume(locale),
      input,
      { locale }
    );
    return parseJSON(result.content) || result.content;
  },
  
  /**
   * Генерация cover letter
   */
  generateCoverLetter: async (profile, jobDescription, options = {}) => {
    const { role = 'Developer', company = 'Company', tone = 'formal', locale = 'ru' } = options;
    const input = `
CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB DESCRIPTION:
${jobDescription}
`;
    const result = await callAI(
      'cover_letter',
      prompts.coverLetter.generate(role, company, tone, locale),
      input,
      { locale }
    );
    return result.content;
  },

  /**
   * Предложение навыков
   */
  suggestSkills: async (experience, currentSkills, locale = 'ru') => {
    const input = `
CURRENT EXPERIENCE:
${JSON.stringify(experience, null, 2)}

CURRENT SKILLS:
${currentSkills.join(', ')}
`;
    const result = await callAI(
      'suggest_skills',
      prompts.resume.suggestSkills(locale),
      input,
      { locale }
    );
    return parseJSON(result.content) || [];
  },
  
  /**
   * Перевод текста
   */
  translate: async (text, targetLang) => {
    const result = await callAI(
      'translate',
      prompts.translation.translate(targetLang),
      text,
      { locale: targetLang }
    );
    return result.content;
  },

  /**
   * Чат с AI ассистентом
   */
  chat: async (message, context = {}, locale = 'ru') => {
    const result = await callAI(
      'chat',
      prompts.chat.system(locale, context),
      message,
      { locale }
    );
    return result.content;
  },

  /**
   * Проверка доступности AI
   */
  checkAvailability: () => {
    if (MOCK_ENABLED) {
      return { available: true, mode: 'mock' };
    }
    return {
      available: aiRouter.checkAvailability().anyAvailable,
      ...aiRouter.checkAvailability(),
      mode: 'production'
    };
  },

  /**
   * Получить статистику использования
   */
  getStats: () => {
    return aiRouter.getStats();
  }
};

export default aiService;
