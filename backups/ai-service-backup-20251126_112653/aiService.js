import { maskPII, unmaskPII } from '../../utils/piiMasking';

/**
 * AI Service
 * Централизованный сервис для работы с AI API
 */

// Моки для разработки (будут заменены на реальные API вызовы)
const MOCK_ENABLED = true;
const MOCK_DELAY = 1500; // ms

/**
 * Системные промпты для разных сценариев
 */
const SYSTEM_PROMPTS = {
  improveBullet: (locale = 'ru') => `You are an expert tech recruiter. Rewrite user's bullet points to be impact-oriented using the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Target Language: ${locale === 'ru' ? 'Russian' : 'English'}. Keep it concise and professional.`,
  
  improveSummary: (locale = 'ru') => `You are a professional resume writer. Rewrite the user's professional summary to highlight their key strengths and achievements. Make it compelling and ATS-friendly. Target Language: ${locale === 'ru' ? 'Russian' : 'English'}. Keep it under 150 words.`,
  
  tailorResume: (locale = 'ru') => `Analyze the Job Description provided. Identify top 5 required hard skills and 3 soft skills. Then:
1. Rewrite the candidate's 'Professional Summary' to highlight these specific skills.
2. Re-order skills to put relevant ones first.
Output Language: ${locale === 'ru' ? 'Russian' : 'English'}.`,
  
  generateCoverLetter: (role, company, tone = 'formal', locale = 'ru') => `Write a personalized cover letter for ${role} at ${company}. Connect the user's experience directly to the requirements in the JD. Keep it under 200 words. Tone: ${tone}. Language: ${locale === 'ru' ? 'Russian' : 'English'}.`,
  
  translate: (targetLang) => `Translate the following text to ${targetLang === 'en' ? 'English' : 'Russian'}. Preserve formatting and maintain professional tone.`,
  
  parseJobDescription: (locale = 'ru') => `Analyze this job description and extract:
1. Role and seniority level (Junior/Middle/Senior)
2. Company name
3. Top 5 required technical skills
4. Top 3 soft skills
5. Must-have vs nice-to-have requirements
Output as JSON. Language: ${locale === 'ru' ? 'Russian' : 'English'}.`
};

/**
 * Мок для AI ответа
 */
function mockAIResponse(type, input, locale) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'improveBullet':
          resolve(locale === 'ru' 
            ? "Разработал и внедрил масштабируемую REST API на FastAPI, что сократило время отклика на 40% и увеличило пропускную способность системы на 2000 запросов/сек."
            : "Designed and implemented scalable REST API using FastAPI, reducing response time by 40% and increasing system throughput to 2000 requests/sec.");
        
        case 'improveSummary':
          resolve(locale === 'ru'
            ? "Высококвалифицированный Full Stack разработчик с 5+ годами опыта в создании масштабируемых веб-приложений. Эксперт в экосистеме JavaScript (React, Node.js) и облачных архитектурах. Успешно руководил командой из 3 человек, повысив производительность разработки на 30%. Страстный сторонник чистого кода и best practices."
            : "Highly qualified Full Stack Developer with 5+ years of experience building scalable web applications. Expert in JavaScript ecosystem (React, Node.js) and cloud architectures. Successfully led a team of 3, increasing development productivity by 30%. Passionate advocate of clean code and best practices.");
        
        case 'parseJob':
          resolve({
            role: "Senior Backend Developer",
            seniority: "Senior",
            company: "TechCorp",
            hardSkills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
            softSkills: ["Leadership", "Communication", "Problem-solving"],
            mustHave: ["Python", "FastAPI", "PostgreSQL"],
            niceToHave: ["Docker", "AWS", "CI/CD"],
            matchScore: 85
          });
        
        case 'translate':
          resolve(locale === 'en'
            ? "Developed backend services for high-load systems"
            : "Разрабатывал backend сервисы для высоконагруженных систем");
        
        default:
          resolve("AI улучшение применено успешно");
      }
    }, MOCK_DELAY);
  });
}

/**
 * Вызов реального AI API (заглушка для будущего)
 */
async function callRealAI(systemPrompt, userInput, locale) {
  // TODO: Реализовать реальный вызов OpenAI API
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not found. Using mock response.');
    return mockAIResponse('improveBullet', userInput, locale);
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI API call failed:', error);
    throw error;
  }
}

/**
 * Основной метод для вызова AI
 */
async function callAI(type, input, options = {}) {
  const { locale = 'ru', ...rest } = options;
  
  // Маскируем PII перед отправкой
  const { masked, mapping } = maskPII(input);
  
  let response;
  
  if (MOCK_ENABLED) {
    response = await mockAIResponse(type, masked, locale);
  } else {
    const systemPrompt = SYSTEM_PROMPTS[type](locale, rest);
    response = await callRealAI(systemPrompt, masked, locale);
  }
  
  // Восстанавливаем PII в ответе
  const final = typeof response === 'string' ? unmaskPII(response, mapping) : response;
  
  return final;
}

/**
 * Экспортируемые методы
 */
export const aiService = {
  /**
   * Улучшить bullet point опыта работы
   */
  improveBullet: async (text, locale = 'ru') => {
    return await callAI('improveBullet', text, { locale });
  },
  
  /**
   * Улучшить профессиональное summary
   */
  improveSummary: async (text, locale = 'ru') => {
    return await callAI('improveSummary', text, { locale });
  },
  
  /**
   * Парсинг job description
   */
  parseJobDescription: async (jdText, locale = 'ru') => {
    return await callAI('parseJob', jdText, { locale });
  },
  
  /**
   * Адаптация резюме под вакансию
   */
  tailorResume: async (profile, jobDescription, locale = 'ru') => {
    const input = `Profile: ${JSON.stringify(profile)}\n\nJob Description: ${jobDescription}`;
    return await callAI('tailorResume', input, { locale });
  },
  
  /**
   * Генерация cover letter
   */
  generateCoverLetter: async (profile, jobDescription, options = {}) => {
    const { role, company, tone = 'formal', locale = 'ru' } = options;
    const input = `Profile: ${JSON.stringify(profile)}\n\nJob Description: ${jobDescription}`;
    return await callAI('generateCoverLetter', input, { role, company, tone, locale });
  },
  
  /**
   * Перевод текста
   */
  translate: async (text, targetLang) => {
    return await callAI('translate', text, { locale: targetLang });
  }
};

export default aiService;

