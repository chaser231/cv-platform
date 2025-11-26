Информационная Архитектура: AI-First Resume Builder
Этот документ описывает структуру данных и навигацию приложения. Он отвечает на вопросы:
"Где лежит эта кнопка?" и "Как эти данные связаны друг с другом?".
1. Глобальная структура (Sitemap)
Приложение делится на две зоны: Публичная (
Marketing
) и Приватная (Workspace)
.
1.1. Публичная зона
Главная страница (
Landing Page)
:
Hero блок (Value Proposition)
.
Демонстрация "Было/Стало" (слайдер резюме)
.
Pricing
(Free vs Pro)
.
Auth Flow:
Вход / Регистрация.
Восстановление пароля.
Onboarding
(Первичный импорт резюме)
.
1.2. Приватная зона (Workspace)
Здесь пользователь проводит 99% времени. Навигация осуществляется через боковую панель
(Sidebar)
.
1. Dashboard (Главная)
: Обзор активных откликов, статистика просмотров (
в будущем)
,
быстрые действия.
2. Master Profile (Профиль)
: "Источник правды". Редактирование всех навыков и опыта.
3. My Applications (Отклики)
: Список созданных адаптаций под вакансии.
4. Settings: Аккаунт, Подписка, Смена языка интерфейса.
2. Структура сущностей (Data Contexts)
Самый важный момент архитектуры — понимание иерархии данных.
Уровень 1: Master Profile (База знаний пользователя)
Это не резюме в привычном понимании (файл)
. Это база данных опыта пользователя. Она
содержит всё, что пользователь когда-либо делал.
Структура:
Личные данные (Контакты, Фото, Линки)
.
Summary (Общее)
.
Опыт работы (Все места работы, все пулиты)
.
Образование.
Навыки (Полный список тегов)
.
https://gemini.google.com/app/4396a44a1515b8ff 1/3
25.11.2025, 18:29 Google Gemini
Проекты (Pet-projects, Open Source)
.
Уровень 2: Job Application (Контекст вакансии)
Это папка для конкретного отклика.
Входные данные: Текст вакансии (JD)
, Название компании, Роль.
Сгенерированные артефакты:
Tailored Resume: Снимок (Snapshot) из Мастер-профиля + переписанное Summary +
отсортированные навыки.
Cover Letter: Текст письма.
Interview Prep:
(На будущее) Вопросы к собеседованию.
3. Детальная структура страниц (Wireframes Logic)
3.1. Страница "Master Profile Editor" (Split-View)
Экран разделен на две части.
ЛЕВАЯ ПАНЕЛЬ (Input & AI)
:
Навигация по секциям: Табы или аккордеон (
Experience, Skills, etc.
)
.
Формы ввода: Поля для текста.
AI Controls:
Кнопка "Improve" возле каждого текстового поля.
Чат-ассистент (floating button)
для общих вопросов.
Import Button: Загрузка PDF для парсинга.
ПРАВАЯ ПАНЕЛЬ (Preview)
:
Live Render: PDF-документ (
)
A4
.
Interactive Mode: Клик по блоку в PDF скроллит левую панель к нужному полю ввода.
View Settings: Выбор шаблона, шрифтов, цветов.
3.2. Страница "New Application" (Wizard -
> Workspace)
1. Шаг 1
(Ввод)
: Вставка текста вакансии (Paste Job Description)
.
2. Шаг 2
(Анализ)
: Лоадер с отображением процесса ("Ищем ключевые слова...",
"Анализируем опыт...")
.
3. Шаг 3 (Workspace)
: Переход в редактор (аналог п. 3.1
)
, но в контексте этой вакансии.
Отличие: Поля подсвечены цветом, если они были изменены AI под вакансию.
Доп. таб: Cover Letter (редактирование письма)
.
4. Потоки данных (Data Flow Diagram
)
Как информация путешествует по системе:
graph TD
UserInput[Ручной ввод / PDF Import] --> MasterDB[(Master Profile DB)]
https://gemini.google.com/app/4396a44a1515b8ff 2/3
25.11.2025, 18:29 Google Gemini
su
bgraph "Генерация под вакансию (Tailoring)"
JD[Текст Вакансии] -->
AIAgent{AI Agent}
MasterDB -->
AIAgent
AIAgent --> |Анализ и переписывание| TailoredJSON[Tailored Resume JSON]
AIAgent --> |Генерация| CoverLetter[Cover Letter Text]
end
TailoredJSON --> PDFRender[PDF Generator]
PDFRender --> Download[Файл.pdf]
5. Ролевая модель (Permissions)
Guest: Только Лендинг.
Free User:
1 Master Profile.
Доступ к базовому редактору.
Лимит на AI-запросы (например, 3 улучшения в день)
.
Блокировка создания "Job Applications" (Tailoring
)
.
Pro User:
Безлимитные AI-запросы.
Модуль Tailoring
(Адаптация под вакансии)
.
Cover Letter Generator.
6. Навигационная карта (
App Routing
)
Примерные URL пути для Frontend (
Next.js)
:
/ —
Landing
/login , /register
/app — Dashboard (redirects to /app/dashboard)
/app/profile — Редактор Мастер-профиля.
/app/jo
b
s — Список откликов.
/app/jo
b
s/new — Создание нового отклика.
/app/jo
b
s/[id] — Редактор конкретного отклика (Tailored)
.
/app/jo
b
s/[id]/resume — Таб резюме.
/app/jo
b
s/[id]/letter — Таб письма.
/app/settings — Настройки.
https://gemini.google.com/app/4396a44a1515b8ff 