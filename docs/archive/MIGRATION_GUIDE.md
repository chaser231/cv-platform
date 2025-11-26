# 🔄 Руководство по миграции на обновленную архитектуру

**Дата**: 25 ноября 2025  
**Версия**: 0.1.0 → 0.2.0

---

## 📋 Что изменилось

### 1. **Добавлены новые зависимости**

```bash
npm install
```

**Новые пакеты:**
- `zustand` (^4.5.0) - State management
- `i18next` (^23.15.0) - Интернационализация
- `react-i18next` (^14.1.0) - React интеграция для i18n
- `@react-pdf/renderer` (^3.4.4) - Генерация PDF на клиенте
- `date-fns` (^3.0.0) - Работа с датами
- `clsx` (^2.1.1) - Условные классы

### 2. **Новая структура папок**

```
src/
├── components/          # UI компоненты
│   ├── common/         # Переиспользуемые (Button, Input, Modal)
│   ├── features/       # Фича-специфичные
│   │   ├── profile/   # Компоненты профиля
│   │   ├── jobs/      # Компоненты откликов
│   │   └── settings/  # Настройки
│   └── layouts/        # Layout компоненты (Sidebar, Header)
├── hooks/              # Custom React hooks
├── utils/              # Утилиты (piiMasking.js)
├── services/           # API интеграции
│   ├── ai/            # AI сервисы (aiService.js)
│   └── api/           # Backend API клиент
├── constants/          # Константы (index.js)
├── locales/            # Переводы (ru.json, en.json)
├── store/              # Zustand stores (useProfileStore.js)
├── types/              # TypeScript types (будущее)
├── i18n.js            # Конфигурация i18n
├── main.jsx           # Entry point
└── index.css          # Глобальные стили
```

### 3. **Мультиязычность (RU/EN)**

Добавлена полная поддержка двух языков:

**Файлы:**
- `src/locales/ru.json` - Русские переводы
- `src/locales/en.json` - Английские переводы
- `src/i18n.js` - Конфигурация i18next

**Использование в компонентах:**
```javascript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('sidebar.masterProfile')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### 4. **Zustand Store для состояния**

Вместо `useState` в App.jsx теперь используется Zustand:

**Файл:** `src/store/useProfileStore.js`

**Использование:**
```javascript
import { useProfileStore } from './store/useProfileStore';

function Component() {
  const { masterProfile, updateSummary } = useProfileStore();
  
  return (
    <textarea 
      value={masterProfile.summary}
      onChange={(e) => updateSummary(e.target.value)}
    />
  );
}
```

**Преимущества:**
- Автоматическое сохранение в localStorage
- Глобальное состояние без prop drilling
- Лучшая производительность (no re-renders)

### 5. **PII Masking (Безопасность)**

Добавлена система маскировки личных данных:

**Файл:** `src/utils/piiMasking.js`

**Использование:**
```javascript
import { maskPII, unmaskPII } from './utils/piiMasking';

// Перед отправкой в AI
const { masked, mapping } = maskPII(userText);
const aiResponse = await callAI(masked);

// После получения ответа
const finalText = unmaskPII(aiResponse, mapping);
```

**Что маскируется:**
- Email → `[PII_EMAIL]`
- Phone → `[PII_PHONE]`
- Address → `[PII_ADDRESS]`

### 6. **AI Service (Централизованный)**

Все AI вызовы теперь через единый сервис:

**Файл:** `src/services/ai/aiService.js`

**Методы:**
```javascript
import aiService from './services/ai/aiService';

// Улучшить bullet point
const improved = await aiService.improveBullet(text, 'ru');

// Улучшить summary
const summary = await aiService.improveSummary(text, 'en');

// Парсинг job description
const parsed = await aiService.parseJobDescription(jdText, 'ru');

// Генерация cover letter
const letter = await aiService.generateCoverLetter(
  profile, 
  jobDescription, 
  { role: 'Senior Dev', company: 'Google', tone: 'formal', locale: 'en' }
);

// Перевод
const translated = await aiService.translate(text, 'en');
```

**Особенности:**
- Автоматический PII Masking
- Поддержка RU/EN через параметр `locale`
- Моки для разработки (переключается флагом)
- Готово к интеграции с OpenAI/Claude API

### 7. **Константы**

Все магические строки вынесены в константы:

**Файл:** `src/constants/index.js`

```javascript
import { 
  SUPPORTED_LOCALES, 
  JOB_APPLICATION_STATUS,
  SUBSCRIPTION_PLANS,
  PLAN_LIMITS
} from './constants';

// Использование
const locale = SUPPORTED_LOCALES.RU;
const status = JOB_APPLICATION_STATUS.APPLIED;
```

### 8. **Переменные окружения**

Обновлен `env.example`:

```bash
# Скопируйте в .env.local
cp env.example .env.local

# Отредактируйте значения
nano .env.local
```

**Новые переменные:**
- `VITE_OPENAI_API_KEY` - OpenAI API ключ
- `VITE_CLAUDE_API_KEY` - Claude API ключ
- `VITE_DEFAULT_LOCALE` - Язык по умолчанию (ru/en)
- `VITE_ENABLE_AI` - Включить реальный AI (false = моки)
- `VITE_ENABLE_PII_MASKING` - Включить PII маскировку
- `VITE_FREE_PLAN_AI_REQUESTS_PER_DAY` - Лимит для Free плана

---

## 🚀 Пошаговая миграция

### Шаг 1: Установка зависимостей

```bash
# Удалите старые
rm -rf node_modules package-lock.json

# Установите новые
npm install
```

### Шаг 2: Обновление main.jsx

Добавьте i18n провайдер:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.jsx';
import './index.css';
import './i18n'; // ← Добавить!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Шаг 3: Миграция состояния в App.jsx

**Было:**
```javascript
const [profileData, setProfileData] = useState(initialMasterProfile);
```

**Стало:**
```javascript
import { useProfileStore } from './store/useProfileStore';

function App() {
  const { masterProfile, updateSummary, addExperience } = useProfileStore();
  
  // Используем методы store вместо setState
}
```

### Шаг 4: Добавление мультиязычности

**Было:**
```javascript
<h1>Мастер-профиль</h1>
```

**Стало:**
```javascript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('sidebar.masterProfile')}</h1>;
}
```

### Шаг 5: Интеграция AI Service

**Было:**
```javascript
const handleAIAction = () => {
  setIsProcessing(true);
  setTimeout(() => {
    setIsProcessing(false);
    setProfileData(prev => ({ ...prev, summary: "улучшено" }));
  }, 1500);
};
```

**Стало:**
```javascript
import aiService from './services/ai/aiService';
import { useProfileStore } from './store/useProfileStore';

const { isProcessingAI, setAIProcessing, updateSummary } = useProfileStore();

const handleAIAction = async () => {
  setAIProcessing(true);
  try {
    const improved = await aiService.improveSummary(
      masterProfile.summary, 
      'ru' // или i18n.language
    );
    updateSummary(improved);
  } catch (error) {
    console.error('AI error:', error);
  } finally {
    setAIProcessing(false);
  }
};
```

---

## 🔥 Критически важные изменения

### 1. **Language Switcher обязателен**

Добавьте переключатель языка в Settings или Sidebar:

```javascript
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <select 
      value={i18n.language} 
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}
```

### 2. **PII Masking всегда включен**

Все AI вызовы автоматически маскируют PII. Не нужно делать вручную.

### 3. **Persist в Zustand**

Данные автоматически сохраняются в localStorage. Очистка:

```javascript
// В useProfileStore есть метод
const { resetProfile } = useProfileStore();
resetProfile(); // Очистит профиль и токены
```

---

## 📊 Новая структура данных

### Master Profile (расширенная)

```javascript
{
  personalInfo: { /* ... */ },
  summary: string,
  experience: [{ /* ... */ }],
  skills: string[],
  education: [{ /* ... */ }],
  
  // ⬇️ НОВЫЕ СЕКЦИИ
  projects: [{
    id: number,
    name: string,
    description: string,
    technologies: string[],
    link: string,
    dates: string
  }],
  
  certifications: [{
    id: number,
    name: string,
    issuer: string,
    date: string,
    link: string
  }],
  
  languages: [{
    id: number,
    language: string, // "English", "Russian"
    level: string // "native", "fluent", "intermediate"
  }]
}
```

### Методы Zustand Store

```javascript
// Опыт работы
addExperience(exp)
updateExperience(id, updates)
deleteExperience(id)

// Проекты (НОВОЕ)
addProject(proj)
updateProject(id, updates)
deleteProject(id)

// Языки (НОВОЕ)
addLanguage(lang)
updateLanguage(id, updates)
deleteLanguage(id)

// AI
setAIProcessing(bool)
incrementAITokens(amount)
```

---

## 🎯 Следующие шаги

### Сейчас (приоритет 1):

1. **Обновите App.jsx**
   - Замените useState на useProfileStore
   - Добавьте useTranslation для текстов
   - Интегрируйте aiService для AI кнопок

2. **Добавьте новые секции UI:**
   - Projects (Pet-projects, Open Source)
   - Certifications
   - Languages

3. **Добавьте Language Switcher**
   - В Settings или Sidebar
   - RU ↔ EN переключение

### Скоро (приоритет 2):

4. **Разбейте App.jsx на модули**
   - Вынесите компоненты в `src/components/`
   - Sidebar → `src/components/layouts/Sidebar.jsx`
   - EditorForm → `src/components/features/profile/EditorForm.jsx`

5. **Добавьте PDF экспорт**
   - Используйте `@react-pdf/renderer`
   - Реализуйте watermark для Free плана

### В будущем (приоритет 3):

6. **Backend API**
   - FastAPI на Python
   - PostgreSQL / Supabase
   - Authentication (JWT)

7. **Next.js миграция**
   - App Router
   - Server Components
   - API Routes

---

## 🆘 Troubleshooting

### Ошибка: "Cannot find module 'zustand'"

```bash
npm install zustand
```

### Ошибка: "i18n is not defined"

Проверьте, что `./i18n` импортирован в `main.jsx`:

```javascript
import './i18n'; // Должно быть!
```

### Переводы не работают

1. Проверьте, что файлы `ru.json` и `en.json` в `src/locales/`
2. Убедитесь, что ключи совпадают
3. Очистите кэш браузера

### AI моки не возвращают данные

В `aiService.js` проверьте:
```javascript
const MOCK_ENABLED = true; // Должно быть true для разработки
```

---

## 📖 Дополнительные ресурсы

- [Zustand документация](https://github.com/pmndrs/zustand)
- [i18next документация](https://www.i18next.com/)
- [react-i18next документация](https://react.i18next.com/)
- [@react-pdf/renderer](https://react-pdf.org/)

---

## ✅ Чеклист миграции

- [ ] Установлены новые зависимости (`npm install`)
- [ ] Создана структура папок (`src/components`, `src/store`, и т.д.)
- [ ] Добавлен `i18n.js` и локализации (`ru.json`, `en.json`)
- [ ] Создан `useProfileStore.js` (Zustand)
- [ ] Создан `aiService.js` (AI интеграция)
- [ ] Создан `piiMasking.js` (безопасность)
- [ ] Обновлен `main.jsx` (добавлен `import './i18n'`)
- [ ] App.jsx использует Zustand вместо useState
- [ ] App.jsx использует `t()` вместо хардкода текстов
- [ ] Добавлен Language Switcher
- [ ] Протестирована смена языка
- [ ] Протестированы AI моки
- [ ] Добавлены секции Projects, Languages в UI

---

**Готово к разработке! 🚀**

*Создано: 25 ноября 2025*





