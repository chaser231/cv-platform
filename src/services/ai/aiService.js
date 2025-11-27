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

        case 'improve_project':
          resolve({
            content: locale === 'ru'
              ? "Разработал полнофункциональный веб-сервис с авторизацией, REST API и интеграцией платёжной системы. Реализовал кеширование на Redis, сократив время отклика на 65%. Стек: React, Node.js, PostgreSQL, Docker. Развёрнут на AWS с CI/CD пайплайном."
              : "Built a full-featured web service with authentication, REST API, and payment integration. Implemented Redis caching, reducing response time by 65%. Tech: React, Node.js, PostgreSQL, Docker. Deployed on AWS with CI/CD pipeline.",
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'suggest_tools': {
          // Определяем тип проекта по ключевым словам
          const toolsDesc = input.toLowerCase();
          let toolsSuggestions = [];
          
          // Дизайн-проект
          if (toolsDesc.includes('ui') || toolsDesc.includes('ux') || toolsDesc.includes('дизайн') || toolsDesc.includes('design') || 
              toolsDesc.includes('интерфейс') || toolsDesc.includes('interface') || toolsDesc.includes('прототип') || toolsDesc.includes('prototype') ||
              toolsDesc.includes('figma') || toolsDesc.includes('макет')) {
            toolsSuggestions = [
              { item: "Figma", category: "tool", reason: locale === 'ru' ? "Стандарт индустрии для UI/UX дизайна" : "Industry standard for UI/UX design" },
              { item: "Design System", category: "methodology", reason: locale === 'ru' ? "Для масштабируемости и консистентности" : "For scalability and consistency" },
              { item: "Usability Testing", category: "process", reason: locale === 'ru' ? "Валидация решений с пользователями" : "Validating solutions with users" },
              { item: "User Personas", category: "process", reason: locale === 'ru' ? "Понимание целевой аудитории" : "Understanding target audience" },
              { item: "Design Thinking", category: "methodology", reason: locale === 'ru' ? "Человекоцентричный подход к дизайну" : "Human-centered design approach" }
            ];
          }
          // Продуктовый проект
          else if (toolsDesc.includes('product') || toolsDesc.includes('продукт') || toolsDesc.includes('roadmap') || toolsDesc.includes('метрик') ||
                   toolsDesc.includes('metric') || toolsDesc.includes('a/b') || toolsDesc.includes('гипотез') || toolsDesc.includes('hypothesis') ||
                   toolsDesc.includes('backlog') || toolsDesc.includes('user stor') || toolsDesc.includes('запуск') || toolsDesc.includes('launch')) {
            toolsSuggestions = [
              { item: "RICE", category: "framework", reason: locale === 'ru' ? "Приоритизация фич по импакту" : "Feature prioritization by impact" },
              { item: "Jobs-to-be-Done", category: "framework", reason: locale === 'ru' ? "Понимание потребностей пользователей" : "Understanding user needs" },
              { item: "Amplitude", category: "tool", reason: locale === 'ru' ? "Продуктовая аналитика" : "Product analytics" },
              { item: "A/B Testing", category: "process", reason: locale === 'ru' ? "Валидация гипотез данными" : "Data-driven hypothesis validation" },
              { item: "OKR", category: "framework", reason: locale === 'ru' ? "Выравнивание целей команды" : "Aligning team goals" }
            ];
          }
          // Аналитика/данные
          else if (toolsDesc.includes('анализ') || toolsDesc.includes('analysis') || toolsDesc.includes('dashboard') || toolsDesc.includes('дашборд') ||
                   toolsDesc.includes('sql') || toolsDesc.includes('данн') || toolsDesc.includes('data') || toolsDesc.includes('визуализ') ||
                   toolsDesc.includes('отчёт') || toolsDesc.includes('report')) {
            toolsSuggestions = [
              { item: "SQL", category: "tool", reason: locale === 'ru' ? "Основа работы с данными" : "Foundation for data work" },
              { item: "Tableau", category: "tool", reason: locale === 'ru' ? "Визуализация и дашборды" : "Visualization and dashboards" },
              { item: "Cohort Analysis", category: "methodology", reason: locale === 'ru' ? "Анализ поведения групп пользователей" : "User group behavior analysis" },
              { item: "Python/Pandas", category: "tool", reason: locale === 'ru' ? "Автоматизация аналитики" : "Analytics automation" },
              { item: "Statistical Testing", category: "methodology", reason: locale === 'ru' ? "Статистическая значимость выводов" : "Statistical significance of conclusions" }
            ];
          }
          // По умолчанию — разработка
          else {
            toolsSuggestions = [
              { item: "Docker", category: "tool", reason: locale === 'ru' ? "Контейнеризация и консистентность окружения" : "Containerization and environment consistency" },
              { item: "CI/CD", category: "process", reason: locale === 'ru' ? "Автоматизация деплоя" : "Deployment automation" },
              { item: "Redis", category: "tool", reason: locale === 'ru' ? "Кеширование для производительности" : "Caching for performance" },
              { item: "TypeScript", category: "tool", reason: locale === 'ru' ? "Типизация для надёжности кода" : "Type safety for code reliability" },
              { item: "Jest", category: "tool", reason: locale === 'ru' ? "Модульное тестирование" : "Unit testing" }
            ];
          }
          
          resolve({
            content: JSON.stringify(toolsSuggestions),
            provider: 'mock',
            model: 'mock'
          });
          break;
        }

        case 'chat':
          resolve({
            content: locale === 'ru'
              ? "Отличный вопрос! Для описания опыта работы рекомендую использовать формулу XYZ: 'Достиг [X] по метрике [Y], делая [Z]'. Например: 'Сократил время загрузки страницы на 40% (с 3с до 1.8с), оптимизировав рендеринг React компонентов'. Это показывает конкретный результат и вашу роль в его достижении."
              : "Great question! For describing work experience, I recommend using the XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. For example: 'Reduced page load time by 40% (from 3s to 1.8s) by optimizing React component rendering'. This shows a concrete result and your role in achieving it.",
            provider: 'mock',
            model: 'mock'
          });
          break;

        case 'analyze_resume':
          // Проверяем дубликаты в переданных данных (для реалистичного мока)
          let inputData = {};
          let experience = [];
          const duplicateGroups = [];
          
          try {
            // Пытаемся распарсить, но input может быть поврежден PII маскированием
            const cleanedInput = input
              .replace('RESUME TO ANALYZE:', '')
              .replace(/\[PII_[A-Z_]+\]/g, '"masked"') // Заменяем PII маркеры на валидный JSON
              .trim();
            inputData = JSON.parse(cleanedInput || '{}');
            experience = inputData.experience || [];
          } catch (e) {
            // Если не удалось распарсить, используем пустые данные
            console.log('Mock: Could not parse input, using empty data');
          }
          
          // Проверка дубликатов и пустых записей
          const companyMap = new Map();
          const emptyEntries = [];
          
          experience.forEach(exp => {
            const company = exp.company?.trim();
            const role = exp.role?.trim();
            
            // Пустые записи (без компании и должности)
            if (!company && !role) {
              emptyEntries.push(exp.id);
              return;
            }
            
            // Группировка по компании для поиска дубликатов
            const key = company?.toLowerCase() || '__no_company__';
            if (!companyMap.has(key)) {
              companyMap.set(key, []);
            }
            companyMap.set(key, [...companyMap.get(key), exp.id]);
          });
          
          // Добавляем пустые записи как группу для удаления
          if (emptyEntries.length > 1) {
            duplicateGroups.push({ 
              company: locale === 'ru' ? 'пустые записи' : 'empty entries', 
              ids: emptyEntries,
              isEmpty: true
            });
          }
          
          // Добавляем дубликаты по компании
          companyMap.forEach((ids, company) => {
            if (ids.length > 1 && company !== '__no_company__') {
              duplicateGroups.push({ company, ids });
            }
          });

          const improvements = [
            {
              id: 'summary',
              type: 'summary',
              priority: 'high',
              title: locale === 'ru' ? 'Улучшить Summary' : 'Improve Summary',
              description: locale === 'ru' 
                ? 'Summary слишком общее. Добавьте конкретные достижения и цифры.' 
                : 'Summary is too generic. Add specific achievements and numbers.',
              canAutoFix: true
            },
            {
              id: 'exp1',
              type: 'experience',
              priority: 'medium',
              title: locale === 'ru' ? 'Добавить метрики в опыт' : 'Add metrics to experience',
              description: locale === 'ru'
                ? 'Второй опыт работы не содержит количественных результатов.'
                : 'Second work experience lacks quantitative results.',
              canAutoFix: true,
              targetId: 2
            },
            {
              id: 'title_mismatch',
              type: 'experience',
              priority: 'medium',
              title: locale === 'ru' ? 'Несоответствие текущей позиции и опыта' : 'Position-Experience Mismatch',
              description: locale === 'ru'
                ? 'Указана позиция Senior Full Stack Developer, но опыт работы показывает Middle Frontend Developer. Требуется уточнение профессиональной позиции.'
                : 'Position says Senior Full Stack Developer but experience shows Middle Frontend Developer. Consider clarifying your professional title.',
              canAutoFix: false
            },
            {
              id: 'projects',
              type: 'projects',
              priority: 'medium',
              title: locale === 'ru' ? 'Отсутствие проектов' : 'No Projects',
              description: locale === 'ru'
                ? 'Секция проектов пуста. Рекомендуется добавить личные или коммерческие проекты для усиления резюме.'
                : 'Projects section is empty. Consider adding personal or commercial projects to strengthen your resume.',
              canAutoFix: false
            },
            {
              id: 'skills',
              type: 'skills',
              priority: 'low',
              title: locale === 'ru' ? 'Добавить soft skills' : 'Add soft skills',
              description: locale === 'ru'
                ? 'Рекомендуется добавить 2-3 soft skill для баланса.'
                : 'Consider adding 2-3 soft skills for balance.',
              canAutoFix: false
            }
          ];

          // Добавляем информацию о дубликатах/пустых записях, если они найдены
          if (duplicateGroups.length > 0) {
            duplicateGroups.forEach((group, idx) => {
              const isEmptyGroup = group.isEmpty;
              improvements.unshift({
                id: `duplicates_${idx}`,
                type: 'duplicates',
                priority: 'high',
                title: isEmptyGroup 
                  ? (locale === 'ru' ? 'Удаление пустых записей опыта' : 'Remove Empty Experience Entries')
                  : (locale === 'ru' ? 'Удаление дубликатов опыта работы' : 'Remove Duplicate Experience'),
                description: isEmptyGroup
                  ? (locale === 'ru' 
                      ? `Обнаружено ${group.ids.length} пустых записей опыта работы без компании и должности. Рекомендуется удалить их.`
                      : `Found ${group.ids.length} empty experience entries without company and role. Consider removing them.`)
                  : (locale === 'ru'
                      ? `Обнаружены повторяющиеся записи опыта работы (${group.company}). Необходимо оставить уникальные записи.`
                      : `Duplicate experience entries found (${group.company}). Keep unique entries.`),
                canAutoFix: true,
                duplicateIds: group.ids,
                removeAll: isEmptyGroup // Для пустых записей удаляем все
              });
            });
          }

          resolve({
            content: JSON.stringify({
              overallScore: duplicateGroups.length > 0 ? 65 : 72,
              scores: {
                ats: { score: duplicateGroups.length > 0 ? 60 : 78, label: locale === 'ru' ? 'ATS Совместимость' : 'ATS Compatibility' },
                clarity: { score: duplicateGroups.length > 0 ? 70 : 65, label: locale === 'ru' ? 'Ясность' : 'Clarity' },
                impact: { score: duplicateGroups.length > 0 ? 65 : 70, label: locale === 'ru' ? 'Импакт' : 'Impact' },
                completeness: { score: duplicateGroups.length > 0 ? 55 : 75, label: locale === 'ru' ? 'Полнота' : 'Completeness' }
              },
              strengths: [
                locale === 'ru' ? 'Количественные результаты в описании достижений' : 'Quantitative results in achievements',
                locale === 'ru' ? 'Разнообразный стек технологий' : 'Diverse technology stack',
                locale === 'ru' ? 'Опыт менторства и работы в командах' : 'Mentoring and team experience'
              ],
              improvements,
              atsKeywords: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'],
              missingKeywords: ['CI/CD', 'Agile', 'REST API', 'Git', 'Team Lead', 'Scrum']
            }),
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
    let cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    // Заменяем PII маркеры на валидные JSON значения
    // [PII_PHONE] и подобные могут ломать JSON если попадают в числовые поля
    cleaned = cleaned
      .replace(/\[PII_PHONE\]/g, '"masked_phone"')
      .replace(/\[PII_EMAIL\]/g, '"masked_email"')
      .replace(/\[PII_NAME\]/g, '"masked_name"')
      .replace(/\[PII_ADDRESS\]/g, '"masked_address"')
      .replace(/\[PII_[A-Z_]+\]/g, '"masked"');
    
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse AI JSON response:', e);
    console.error('Content was:', content?.substring(0, 500));
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
   * @param {string} text - Исходный текст
   * @param {string} locale - Язык (ru/en)
   * @param {Object} options - Дополнительные опции
   * @param {string} options.industry - Индустрия (it, finance, marketing)
   * @param {string} options.level - Уровень (junior, middle, senior, lead)
   */
  improveSummary: async (text, locale = 'ru', options = {}) => {
    const { industry = 'it', level = 'middle' } = options;
    const result = await callAI(
      'improve_summary',
      prompts.resume.improveSummary(locale, { industry, level }),
      text,
      { locale }
    );
    return result.content;
  },

  /**
   * Улучшить описание проекта
   * @param {string} text - Описание проекта
   * @param {string} locale - Язык (ru/en)
   */
  improveProject: async (text, locale = 'ru') => {
    try {
      const result = await callAI(
        'improve_project',
        prompts.resume.improveProject(locale),
        text,
        { locale }
      );
      return result.content || text;
    } catch (error) {
      console.error('improveProject error:', error);
      return text; // Возвращаем оригинал при ошибке
    }
  },

  /**
   * Предложить инструменты/методологии для проекта (универсально для разных ролей)
   * @param {string} description - Описание проекта
   * @param {string} locale - Язык (ru/en)
   */
  suggestProjectTools: async (description, locale = 'ru') => {
    const result = await callAI(
      'suggest_tools',
      prompts.resume.suggestProjectTools(locale),
      description,
      { locale }
    );
    
    const parsed = parseJSON(result.content);
    if (parsed) return parsed;
    
    // Fallback: если AI вернул не JSON, определяем тип проекта локально
    const desc = description.toLowerCase();
    
    // Дизайн
    if (desc.includes('ui') || desc.includes('ux') || desc.includes('дизайн') || desc.includes('design') || 
        desc.includes('figma') || desc.includes('интерфейс') || desc.includes('прототип')) {
      return [
        { item: "Figma", category: "tool", reason: locale === 'ru' ? "Стандарт индустрии для UI/UX" : "Industry standard for UI/UX" },
        { item: "Design System", category: "methodology", reason: locale === 'ru' ? "Масштабируемость дизайна" : "Design scalability" },
        { item: "Usability Testing", category: "process", reason: locale === 'ru' ? "Валидация с пользователями" : "User validation" }
      ];
    }
    // Продукт
    if (desc.includes('product') || desc.includes('продукт') || desc.includes('roadmap') || desc.includes('метрик')) {
      return [
        { item: "RICE", category: "framework", reason: locale === 'ru' ? "Приоритизация фич" : "Feature prioritization" },
        { item: "Amplitude", category: "tool", reason: locale === 'ru' ? "Продуктовая аналитика" : "Product analytics" },
        { item: "OKR", category: "framework", reason: locale === 'ru' ? "Целеполагание" : "Goal setting" }
      ];
    }
    // Аналитика
    if (desc.includes('анализ') || desc.includes('analysis') || desc.includes('data') || desc.includes('sql')) {
      return [
        { item: "SQL", category: "tool", reason: locale === 'ru' ? "Работа с данными" : "Data work" },
        { item: "Tableau", category: "tool", reason: locale === 'ru' ? "Визуализация" : "Visualization" },
        { item: "Python/Pandas", category: "tool", reason: locale === 'ru' ? "Автоматизация" : "Automation" }
      ];
    }
    // Разработка (default)
    return [
      { item: "Docker", category: "tool", reason: locale === 'ru' ? "Контейнеризация" : "Containerization" },
      { item: "CI/CD", category: "process", reason: locale === 'ru' ? "Автоматизация деплоя" : "Deployment automation" },
      { item: "TypeScript", category: "tool", reason: locale === 'ru' ? "Типизация кода" : "Type safety" }
    ];
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
   * @param {string} message - Сообщение пользователя
   * @param {Object} context - Контекст
   * @param {Object} context.profile - Профиль пользователя
   * @param {string} context.job - Описание вакансии
   * @param {Array} context.history - История сообщений [{role: 'user'|'assistant', content: string}]
   * @param {string} locale - Язык (ru/en)
   */
  chat: async (message, context = {}, locale = 'ru') => {
    const { profile, job, history = [] } = context;
    
    const result = await callAI(
      'chat',
      prompts.chat.system(locale, { profile, job, history }),
      message,
      { locale }
    );
    return result.content;
  },

  /**
   * Анализ резюме (Health Check)
   * @param {Object} profile - Профиль пользователя
   * @param {string} locale - Язык (ru/en)
   * @returns {Object} Результат анализа с метриками и рекомендациями
   */
  analyzeResume: async (profile, locale = 'ru') => {
    const input = `
RESUME TO ANALYZE:
${JSON.stringify(profile, null, 2)}
`;
    const result = await callAI(
      'analyze_resume',
      prompts.resume.analyzeResume(locale),
      input,
      { locale }
    );
    
    const parsed = parseJSON(result.content);
    if (parsed && parsed.overallScore !== undefined) {
      return parsed;
    }
    
    // Fallback: базовый анализ если AI вернул некорректный ответ
    const hasExperience = profile.experience?.length > 0;
    const hasSkills = profile.skills?.length > 0;
    const hasSummary = profile.summary?.length > 50;
    const hasProjects = profile.projects?.length > 0;
    
    const baseScore = 40 + 
      (hasExperience ? 15 : 0) + 
      (hasSkills ? 15 : 0) + 
      (hasSummary ? 15 : 0) + 
      (hasProjects ? 10 : 0);
    
    return {
      overallScore: Math.min(baseScore, 85),
      scores: {
        ats: { score: hasSkills ? 70 : 50, label: locale === 'ru' ? 'ATS Совместимость' : 'ATS Compatibility' },
        clarity: { score: hasSummary ? 65 : 45, label: locale === 'ru' ? 'Ясность' : 'Clarity' },
        impact: { score: hasExperience ? 60 : 40, label: locale === 'ru' ? 'Импакт' : 'Impact' },
        completeness: { score: baseScore, label: locale === 'ru' ? 'Полнота' : 'Completeness' }
      },
      strengths: [
        hasExperience ? (locale === 'ru' ? 'Указан опыт работы' : 'Work experience listed') : null,
        hasSkills ? (locale === 'ru' ? 'Есть список навыков' : 'Skills listed') : null,
        hasSummary ? (locale === 'ru' ? 'Есть профессиональное резюме' : 'Professional summary present') : null
      ].filter(Boolean),
      improvements: [
        !hasSummary ? {
          id: 'summary',
          type: 'summary',
          priority: 'high',
          title: locale === 'ru' ? 'Добавить Summary' : 'Add Summary',
          description: locale === 'ru' ? 'Профессиональное резюме помогает рекрутерам быстро понять ваш профиль' : 'Professional summary helps recruiters quickly understand your profile',
          canAutoFix: true
        } : null,
        !hasProjects ? {
          id: 'projects',
          type: 'projects',
          priority: 'medium',
          title: locale === 'ru' ? 'Добавить проекты' : 'Add projects',
          description: locale === 'ru' ? 'Проекты демонстрируют практический опыт' : 'Projects demonstrate practical experience',
          canAutoFix: false
        } : null
      ].filter(Boolean),
      atsKeywords: profile.skills?.slice(0, 5) || [],
      missingKeywords: ['Git', 'Agile', 'CI/CD', 'REST API'].filter(kw => !profile.skills?.includes(kw))
    };
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
