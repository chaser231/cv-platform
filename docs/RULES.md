# Правила разработки CV платформы

## Общие принципы

### 1. Код-стайл и архитектура
- **Компонентный подход**: Каждый UI блок — отдельный React компонент
- **Функциональные компоненты**: Только function components с hooks (без классов)
- **Props drilling минимизация**: При росте состояния переход на Context API
- **Читаемость > Краткость**: Понятные имена переменных и функций

### 2. Именование

#### Компоненты
```javascript
// ✅ Правильно - PascalCase
const ResumePreview = ({ data }) => { ... }
const AIGenerateButton = () => { ... }

// ❌ Неправильно
const resumePreview = () => { ... }
```

#### Функции и переменные
```javascript
// ✅ Правильно - camelCase, глаголы для функций
const handleAIAction = () => { ... }
const isProcessingAI = false;

// ❌ Неправильно
const AIAction = () => { ... }
const processing_ai = false;
```

#### Файлы
- Компоненты: `PascalCase.jsx` (например, `ResumePreview.jsx`)
- Утилиты: `camelCase.js` (например, `formatDate.js`)
- Константы: `UPPER_SNAKE_CASE.js` (например, `API_CONFIG.js`)

### 3. Структура файлов

```
/src
  /components
    /common          # Переиспользуемые UI компоненты
    /layouts         # Layout компоненты (Sidebar, Header)
    /features        # Фича-специфичные компоненты
      /profile
      /jobs
      /settings
  /hooks             # Custom React hooks
  /utils             # Вспомогательные функции
  /constants         # Константы и конфиги
  /services          # API интеграции
  /styles            # Глобальные стили
  /assets            # Изображения, иконки, шрифты
```

### 4. Управление состоянием

#### Локальное состояние
```javascript
// ✅ useState для простого локального состояния
const [isOpen, setIsOpen] = useState(false);
```

#### Поднятие состояния (Lifting State Up)
```javascript
// ✅ Состояние в родителе, если нужно нескольким детям
const App = () => {
  const [profileData, setProfileData] = useState(initialData);
  return (
    <>
      <Editor data={profileData} onChange={setProfileData} />
      <Preview data={profileData} />
    </>
  );
};
```

#### Context API (для глобального состояния)
```javascript
// ✅ Когда состояние нужно на многих уровнях
const ProfileContext = createContext();
```

### 5. AI функциональность

#### Моки во время разработки
```javascript
// ✅ Симуляция AI с setTimeout
const handleAIAction = () => {
  setIsProcessing(true);
  setTimeout(() => {
    setIsProcessing(false);
    // Update data
  }, 1500);
};
```

#### Продакшн AI интеграция
```javascript
// ✅ Реальные API вызовы
const improveText = async (text, type) => {
  try {
    const response = await fetch('/api/ai/improve', {
      method: 'POST',
      body: JSON.stringify({ text, type })
    });
    return await response.json();
  } catch (error) {
    // Handle error
  }
};
```

### 6. Стилизация (Tailwind CSS)

#### Правила использования
```javascript
// ✅ Utility classes в JSX
<div className="flex items-center space-x-2 px-4 py-2">

// ✅ Условные стили
className={`base-classes ${condition ? 'true-classes' : 'false-classes'}`}

// ❌ Избегать inline styles (кроме dynamic values)
style={{ color: userColor }} // OK для динамики
style={{ padding: '10px' }}  // НЕТ, используй Tailwind
```

#### Адаптивность
```javascript
// ✅ Mobile-first подход
<div className="w-full md:w-1/2 lg:w-1/3">
```

### 7. Производительность

#### Мемоизация
```javascript
// ✅ useMemo для тяжелых вычислений
const sortedData = useMemo(() => 
  data.sort((a, b) => a.date - b.date), 
  [data]
);

// ✅ useCallback для функций, передаваемых в дочерние компоненты
const handleChange = useCallback((value) => {
  setData(prev => ({ ...prev, value }));
}, []);
```

#### Lazy loading
```javascript
// ✅ Отложенная загрузка больших компонентов
const PDFGenerator = lazy(() => import('./PDFGenerator'));
```

### 8. Обработка ошибок

```javascript
// ✅ Try-catch для async операций
try {
  await saveProfile(data);
  showSuccessToast();
} catch (error) {
  console.error('Save failed:', error);
  showErrorToast(error.message);
}

// ✅ Error boundaries для React компонентов
class ErrorBoundary extends React.Component { ... }
```

### 9. Доступность (A11y)

```javascript
// ✅ Семантичные HTML теги
<button onClick={...}>Сохранить</button>  // не <div>

// ✅ ARIA labels где необходимо
<button aria-label="Закрыть модальное окно">×</button>

// ✅ Keyboard navigation
<input onKeyDown={(e) => e.key === 'Enter' && submit()} />
```

### 10. Комментарии

```javascript
// ✅ Объясняющие комментарии для сложной логики
// Convert experience to XYZ format: "Accomplished [X] by doing [Y]..."
const formatExperienceWithXYZ = (exp) => { ... }

// ❌ Избыточные комментарии
// Set loading to true
setLoading(true);  // Не нужно, и так понятно
```

## Специфичные правила для CV Platform

### 1. Работа с профилем

#### Неизменяемость (Immutability)
```javascript
// ✅ Всегда создавать новые объекты
setProfileData(prev => ({
  ...prev,
  experience: prev.experience.map(exp =>
    exp.id === id ? { ...exp, description: newDesc } : exp
  )
}));

// ❌ Мутация состояния
profileData.experience[0].description = newDesc; // НЕТ!
```

### 2. AI кнопки

```javascript
// ✅ Единообразный компонент
<AIGenerateButton 
  isGenerating={isProcessing}
  onGenerate={() => handleAI('summary')}
  label="Переписать профессионально"
/>
```

### 3. Resume Preview (A4 формат)

```javascript
// ✅ Строгое соблюдение размеров A4
<div 
  className="w-[210mm] min-h-[297mm] p-[15mm]"
  style={{ fontFamily: 'Inter, sans-serif' }}
>
```

### 4. Валидация данных

```javascript
// ✅ Проверка перед сохранением
const validateProfile = (data) => {
  const errors = {};
  if (!data.personalInfo.fullName) errors.fullName = 'Обязательное поле';
  if (!data.personalInfo.email.includes('@')) errors.email = 'Невалидный email';
  return errors;
};
```

### 5. Экспорт в PDF

```javascript
// ✅ Используем библиотеку для генерации PDF
import html2pdf from 'html2pdf.js';

const exportToPDF = (element) => {
  const opt = {
    margin: 0,
    filename: `${profileData.personalInfo.fullName}_CV.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
};
```

## Git и версионирование

### Commits
```bash
# ✅ Понятные commit messages
feat: Add AI improvement button for experience section
fix: Resume preview not updating on profile change
style: Update sidebar colors to match design
docs: Add setup instructions to README

# ❌ Плохие messages
update
fix bug
changes
```

### Branches
```bash
main              # Продакшн-готовый код
develop           # Разработка
feature/...       # Новые фичи
fix/...           # Баг-фиксы
```

## Тестирование (TODO для будущего)

```javascript
// Unit tests для утилит
test('formatExperience should return XYZ format', () => {
  // ...
});

// Integration tests для компонентов
test('EditorForm updates profile on input change', () => {
  // ...
});
```

## Документация кода

```javascript
/**
 * Improves experience description using AI
 * @param {string} description - Original description
 * @param {string} jobContext - Context from job posting (optional)
 * @returns {Promise<string>} Improved description in XYZ format
 */
const improveExperience = async (description, jobContext) => {
  // ...
};
```

## Безопасность

- **Никогда не коммитить** API ключи (использовать `.env`)
- **Валидация** всех пользовательских вводов
- **Санитизация** данных перед отправкой в AI
- **Rate limiting** для AI запросов

## Производительность и оптимизация

- **Debounce** для live preview обновлений
- **Виртуализация** для длинных списков (react-window)
- **Code splitting** для больших бандлов
- **Кэширование** AI ответов (один и тот же текст → один результат)

## Локализация (i18n) - будущее

```javascript
// Подготовка к мультиязычности
const t = (key) => translations[currentLang][key];
<button>{t('buttons.save')}</button>
```

