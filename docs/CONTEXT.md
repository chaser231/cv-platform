# Контекст CV платформы

## Описание проекта

**CV Platform** — это интеллектуальная платформа для создания, адаптации и оптимизации резюме с использованием AI технологий.

### Цель проекта
Помочь соискателям создавать профессиональные резюме, адаптированные под конкретные вакансии, с максимальной вероятностью прохождения ATS (Applicant Tracking Systems) фильтров.

## Ключевые концепции

### 1. Мастер-профиль
- **Определение**: Единый источник правды для всех данных соискателя
- **Содержит**:
  - Личную информацию (ФИО, контакты, локация)
  - Профессиональное саммари (краткое резюме опыта)
  - Опыт работы (детальное описание позиций)
  - Навыки (технические и софт скиллы)
  - Образование
- **Функциональность**: Редактируется один раз, используется для генерации множества адаптированных версий

### 2. Адаптация под вакансию (Job Tailoring)
- **Процесс**:
  1. Пользователь вставляет описание вакансии (Job Description)
  2. AI анализирует требования вакансии
  3. Система извлекает ключевые навыки и требования
  4. Генерируется адаптированная версия резюме с акцентом на релевантный опыт
- **Результат**: Резюме, оптимизированное для конкретной позиции

### 3. AI-улучшения
- **XYZ формула**: Превращение базовых описаний в формат "Accomplished [X] as measured by [Y], by doing [Z]"
- **Профессионализация текста**: Переписывание summary в профессиональном стиле
- **ATS-оптимизация**: Включение ключевых слов из вакансии

### 4. ATS (Applicant Tracking System)
- **Что это**: Системы автоматической фильтрации резюме
- **Проблема**: Многие резюме отсеиваются автоматически до попадания к HR
- **Решение**: Платформа анализирует JD и добавляет релевантные ключевые слова

## Технологический стек

### Frontend (MVP - текущее)
- **React 18**: Современный UI с hooks
- **Tailwind CSS**: Utility-first CSS фреймворк
- **Lucide React**: Набор иконок
- **Vite**: Build tool для быстрой разработки

### Frontend (Планируемое)
- **Next.js 14+**: App Router для SSR и маршрутизации
- **TypeScript**: Типизация для надежности кода
- **Zustand**: Легковесный state management (альтернатива Redux)
- **@react-pdf/renderer**: Генерация PDF на клиенте
- **Command Bar (Cmd+K)**: Быстрый доступ к AI-функциям

### Backend (Планируемое)
- **FastAPI (Python)**: Backend API для AI операций
  - Причина выбора: Мощные библиотеки для AI (LangChain, OpenAI SDK)
  - Парсинг PDF (PyPDF2, pdfplumber)
- **PostgreSQL**: Основная БД (через Supabase или Managed)
- **AWS S3 / Supabase Storage**: Хранение загруженных файлов и генерированных PDF

### Структура приложения
```
App.jsx
├── Sidebar - Навигация по разделам
├── MasterProfile View (activeTab === 'master')
│   ├── EditorForm - Форма редактирования профиля
│   └── ResumePreview - Живой предпросмотр A4 документа
├── JobTailoring View (activeTab === 'jobs')
│   └── Анализ вакансии и генерация адаптированного резюме
└── Settings View (activeTab === 'settings')
```

## Архитектура данных

### Структура Master Profile
```javascript
{
  personalInfo: {
    fullName: string,
    title: string,
    email: string,
    phone: string,
    location: string,
    links: string,
    photo: string (URL) // опционально
  },
  summary: string,
  experience: [{
    id: number,
    company: string,
    role: string,
    dates: string,
    description: string, // или bullets: string[]
    achievements: string[] // форматированные достижения (XYZ)
  }],
  skills: string[], // или { name: string, category: string, level: string }[]
  education: [{
    id: number,
    institution: string,
    degree: string,
    dates: string,
    description: string // опционально
  }],
  projects: [{ // Pet-projects, Open Source
    id: number,
    name: string,
    description: string,
    technologies: string[],
    link: string,
    dates: string
  }],
  certifications: [{ // опционально
    id: number,
    name: string,
    issuer: string,
    date: string,
    link: string
  }],
  languages: [{ // для международного рынка
    language: string, // "English", "Russian"
    level: string // "Native", "Fluent", "Intermediate"
  }]
}
```

### Структура Job Application (Tailored Resume)
```javascript
{
  id: string,
  userId: string,
  masterProfileId: string,
  
  // Входные данные вакансии
  jobDescription: string, // Полный текст JD
  companyName: string,
  jobTitle: string,
  jobUrl: string, // опционально
  
  // Анализ AI
  extractedSkills: string[], // Навыки из вакансии
  extractedKeywords: string[],
  matchScore: number, // 0-100, соответствие профилю
  
  // Сгенерированные артефакты
  tailoredResume: {
    // Переписанное Summary
    summary: string,
    
    // Переранжированные навыки (релевантные вперед)
    skills: string[],
    
    // Отфильтрованный/переупорядоченный опыт
    experience: [...],
    
    // Overrides - изменения, не влияющие на Master Profile
    overrides: {
      [fieldPath]: newValue
    }
  },
  
  coverLetter: {
    content: string,
    tone: "formal" | "casual" | "enthusiastic",
    generatedAt: timestamp
  },
  
  // Метаданные
  status: "draft" | "applied" | "screening" | "interview" | "offer" | "rejected",
  createdAt: timestamp,
  updatedAt: timestamp,
  appliedAt: timestamp, // когда отправили
  notes: string // пользовательские заметки
}
```

## Пользовательский опыт (UX)

### Основной workflow

#### 1. Онбординг (Первый вход)
**Цель**: Получить максимально полные данные с минимальными усилиями

**Варианты:**
- **Вариант А (Быстрый)**: 
  - Drag & Drop старого резюме (PDF/DOCX)
  - Backend парсит текст и заполняет поля
  - Пользователь проверяет и корректирует
  
- **Вариант Б (С нуля)**:
  - Пустые формы
  - Постепенное заполнение с подсказками AI

#### 2. Создание/Редактирование мастер-профиля
**Split-View режим:**
- **Левая панель (Input)**: Формы ввода
  - Навигация по секциям (табы/аккордеон)
  - AI-кнопки "✨ Improve" возле каждого поля
  - Import Button для загрузки PDF
  - Floating chat-ассистент (Cmd+K) для вопросов
  
- **Правая панель (Preview)**:
  - Live render PDF (A4 формат)
  - Interactive Mode: клик по блоку в PDF скроллит к полю
  - View Settings: выбор шаблона, шрифтов, цветов
  - Мгновенное обновление (<500ms debounce)

**AI-триггеры:**
- Пользователь пишет "Разрабатывал API" → нажимает "✨ Improve"
- AI заменяет на: "Designed and implemented RESTful APIs using FastAPI, reducing response time by 20%"

#### 3. Создание отклика на вакансию (Wizard → Workspace)
**Wizard 3 шага:**

**Шаг 1 (Ввод):**
- Вставка текста вакансии (Paste Job Description)
- Или URL вакансии (если поддерживается парсинг)
- Указание компании и позиции

**Шаг 2 (Анализ AI):**
- Loader с процессом:
  - "Ищем ключевые слова..."
  - "Анализируем ваш опыт..."
  - "Подбираем релевантные достижения..."
- Показ extracted keywords и match score

**Шаг 3 (Workspace):**
- Аналог Split-View редактора
- Отличие: Измененные AI поля подсвечены цветом
- Дополнительный таб: Cover Letter
- Gap Analysis: показ недостающих навыков из JD

#### 4. Экспорт
- **PDF Generation**: 
  - Контроль Page Breaks (блоки опыта не разрываются)
  - Шаблоны: LaTeX-style, Modern, Classic
  - Preview перед скачиванием
- **Форматы**: PDF (основной), DOCX (для редактирования)

### Дизайн принципы

#### UI/UX Концепция: "Split-View Context"
Вместо жесткого визарда — двухпанельный редактор:
- **Левая панель (Master Profile)**: Источник правды, все факты
- **Правая панель (Tailored Preview)**: Результат генерации для конкретной вакансии

#### Ключевые принципы:
- **Dark sidebar**: Премиальный вид, фокус на контенте
- **Split-screen**: Редактор слева, превью справа - мгновенная обратная связь
- **AI как помощник**: Ненавязчивые кнопки улучшения в контексте
- **Command Bar (Cmd+K)**: Быстрый доступ к AI-функциям
- **Минимум кликов**: Прямой путь от идеи до готового документа
- **Real-time preview**: Любое изменение мгновенно отражается в PDF
- **Interactive elements**: Клик по PDF → переход к редактированию поля

## AI интеграция (будущее)

### Текущее состояние
- Моки AI функциональности с setTimeout

### Планируемая интеграция

#### AI Модели
- **OpenAI GPT-4o**: Основная модель для генерации
- **GPT-4o-mini**: Для быстрых/дешевых операций (перевод, простые улучшения)
- **Claude API**: Альтернатива для анализа вакансий

#### Ключевые AI-функции

**1. Bullet Point Refiner**
- Улучшение формулировок опыта работы
- Применение XYZ формулы: "Accomplished [X] as measured by [Y], by doing [Z]"
- Добавление Action Verbs и Metrics
- При выделении буллита - предложение 3 вариантов

**2. Language Switcher (RU ↔ EN)**
- Полный перевод контента с сохранением форматирования
- Переменная `locale: 'ru' | 'en'` для всех промптов
- Весь интерфейс поддерживает оба языка
- AI генерирует строго на выбранном языке

**3. Job Description Parser**
- Извлечение: Role, Company, Required Hard Skills, Required Soft Skills
- Определение уровня позиции (Junior/Middle/Senior)
- Выделение must-have vs nice-to-have навыков

**4. Gap Analysis** (Future)
- Сравнение требований вакансии с профилем
- Подсветка недостающих навыков ("Missing Skills")
- Рекомендации по улучшению профиля

**5. Cover Letter Generator**
- Автогенерация на основе Резюме + Вакансия
- Настройка тона: **Formal**, **Casual**, **Enthusiastic**
- Персонализация под компанию (упоминание ценностей)
- Лимит: 150-200 слов

#### Системные Промпты

**Сценарий A: Улучшение достижений**
```
System: "You are an expert tech recruiter. Rewrite user's bullet points 
to be impact-oriented using the XYZ formula. Target Language: {locale}. 
Keep it concise."

User: "Разрабатывал API"

## Бизнес-модель и Экономика

### Unit Economics (Юнит-экономика)

**COGS (Себестоимость обслуживания)**: ~$0.46/месяц на пользователя

Расчет для "тяжелого" сценария (создание резюме + 10 откликов/месяц):
- Создание мастер-резюме (разово): $0.045
  - Парсинг PDF (GPT-4o): $0.025
  - Генерация структуры: $0.015
  - Улучшение опыта x5 (GPT-4o-mini): $0.003
  - Перевод EN↔RU: $0.002
- Адаптация и отклики (10 шт): $0.365
  - Анализ вакансии (JD): $0.005
  - Tailoring (Summary+Skills): $0.175
  - Cover Letter Generation: $0.185
- Инфраструктура (хостинг, БД, S3): $0.05

### Тарифные планы

#### Free Plan
- **Цена**: $0
- **Ограничения**:
  - 1 мастер-профиль
  - Базовый редактор
  - Лимит AI-запросов: 3 улучшения в день
  - **Блокировка** Job Tailoring (адаптация под вакансии)
  - Watermark на PDF (для virality)

#### Pro Plan
- **Цена**: $9.90/месяц
- **Возможности**:
  - Безлимитные AI-запросы
  - Модуль Job Tailoring
  - Cover Letter Generator
  - Множественные шаблоны
  - Без watermark
  - Priority support
  - **Маржинальная прибыль**: $9.14/месяц (после COGS и эквайринга)

#### Enterprise Plan (Future)
- **Цена**: Custom
- **Возможности**:
  - API доступ
  - Массовая обработка кандидатов
  - White-label для HR агентств
  - Интеграция с корпоративными ATS

### Экономика сходимости

**LTV (Lifetime Value)**: $9.90 × 2.5 месяца = ~$25
- Средний срок жизни карьерного сервиса: 2-3 месяца (пока ищут работу)

**CAC (Customer Acquisition Cost)**: Целевой $15-20
- При органике (SEO, content): $0-5
- При платном трафике: до $20
- **Критично**: CAC < $27 для рентабельности

**Точка безубыточности**: 12 платящих клиентов покрывают OpEx ($110/мес)

### Growth Strategy (Рост)

**Watermark Growth**:
- Free версия генерирует PDF с watermark "Made with CVPlatform.io"
- Создает viral loop через сети рекрутеров
- Conversion в Pro: когда пользователь видит результат

**Content Marketing**:
- SEO-оптимизация (Habr, VC.ru, Medium)
- Гайды по составлению резюме для IT
- Кейсы успешных кандидатов

**Referral Program** (Future):
- Приведи друга → получи месяц Pro бесплатно

## Терминология

- **Master Profile**: Мастер-профиль, основной профиль пользователя
- **Job Tailoring**: Адаптация резюме под вакансию
- **ATS**: Applicant Tracking System - система отслеживания кандидатов
- **XYZ Formula**: Формула описания достижений (Accomplished X measured by Y by doing Z)
- **JD**: Job Description - описание вакансии
- **Summary**: Краткое профессиональное резюме в начале CV
- **Cover Letter**: Сопроводительное письмо

## Навигация и Роутинг (Будущее)

### Структура приложения

**Публичная зона (Marketing):**
- `/` — Landing Page (Hero, Demo, Pricing)
- `/login` — Вход
- `/register` — Регистрация
- `/forgot-password` — Восстановление пароля

**Приватная зона (Workspace):**
- `/app` — Редирект на `/app/dashboard`
- `/app/dashboard` — Dashboard (обзор откликов, статистика)
- `/app/profile` — Редактор Мастер-профиля (Split-View)
- `/app/jobs` — Список откликов (My Applications)
- `/app/jobs/new` — Wizard создания нового отклика
- `/app/jobs/[id]` — Редактор конкретного отклика
  - `/app/jobs/[id]/resume` — Таб: Resume
  - `/app/jobs/[id]/letter` — Таб: Cover Letter
  - `/app/jobs/[id]/prep` — Таб: Interview Prep (Future)
- `/app/settings` — Настройки
  - Аккаунт
  - Подписка (Billing)
  - Смена языка интерфейса (RU/EN)
  - Экспорт/Импорт данных

### Sidebar Navigation
1. **Dashboard** — Главная (статистика)
2. **Master Profile** — Профиль (источник правды)
3. **My Applications** — Отклики (список вакансий)
4. **Settings** — Настройки

---

## Безопасность и Приватность

### PII Masking (Privacy)
**Проблема**: Отправка личных данных в LLM может нарушить приватность

**Решение**: 
- Перед отправкой данных в AI, система автоматически заменяет:
  - Email → `[PII_EMAIL]`
  - Телефон → `[PII_PHONE]`
  - Адрес → `[PII_ADDRESS]`
- После получения ответа от AI, токены заменяются обратно

**Модуль**: `PII_Scrubber` на backend

### Rate Limiting
- **Ограничение**: 50 AI-запросов в минуту на пользователя
- **Цель**: Избежать скликивания бюджета OpenAI
- **Реализация**: Middleware на FastAPI

### GDPR Compliance
- **Право на забвение**: Пользователь может удалить аккаунт → все данные удаляются из БД
- **Data Retention**: Резервные копии хранятся 30 дней, затем удаляются
- **Export**: Пользователь может экспортировать свои данные в JSON

### Client-Side PDF Rendering
- **Преимущество**: Рендеринг PDF происходит на клиенте (`@react-pdf/renderer`)
- **Безопасность**: Финальный PDF не обязательно передавать на backend
- **Приватность**: Резюме остается на устройстве пользователя (опционально)

---

## Будущие фичи (roadmap)

1. **Множественные шаблоны CV** (LaTeX-style, Modern, Classic)
2. **Автоматическая генерация Cover Letter** с настройкой тона
3. **Управление откликами** (Dashboard с трекингом статусов)
4. **Интеграция с job boards** (LinkedIn, HH.ru, Indeed)
5. **Экспорт в JSON Resume** стандарт
6. **Мультиязычность** (RU/EN переключение с AI-переводом)
7. **Кастомные секции** (Projects, Certifications, Publications)
8. **Gap Analysis** — показ недостающих навыков
9. **Interview Prep** — подготовка вопросов к собеседованию
10. **Company Research** — автоматический сбор инфо о компании

