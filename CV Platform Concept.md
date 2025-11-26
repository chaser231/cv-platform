Концепция продукта: AI-First IT Resume Builder
1. Цель продукта
Создать лучший инструмент для IT-специалистов (Dev, QA, PM
,
Design, Analytics)
, позволяющий
генерировать резюме мирового уровня (FAANG-ready)
. Сервис использует генеративный ИИ для
глубокой переработки опыта, перевода на английский и адаптации под конкретные вакансии в
реальном времени.
Ключевое отличие: Не просто "конструктор", а "AI-карьерный консультант", который понимает
разницу между Java и JavaScript и знает, что важно для Senior PM.
2. Скоуп продукта (
MVP)
2.1. Целевая аудитория (IT Sector)
Software Engineers:
Backend, Frontend, Fullstack,
Mobile, Embedded.
Management: Product Managers, Project Managers, Team Leads, CTOs.
Data:
Data Scientists,
Data Analysts,
D
.
E
Design: UI/UX, Product Designers.
2.2. Альтернатива Визарду: UX-концепция "Split-View Context"
Вместо жесткого пошагового визарда предлагается Двухпанельный редактор:
Левая панель (
Master Profile)
: "Источник правды". Здесь хранятся все факты, полный опыт,
все скиллы. Пользователь редактирует данные или чатится с AI.
Правая панель (Tailored Preview)
: Результат генерации. Здесь отображается конкретная
версия резюме (например, "Версия для Backend Java" или "Версия под вакансию в Google")
.
Command Bar (Cmd+K
)
: Быстрый доступ к AI-функциям.
2.3. Основные модули
1. Smart Profile & Input:
Парсинг старого CV (PDF/Docx)
.
Мастер-профиль с историей работы.
2. AI-Core (Generative Features)
:
Bullet Point Refiner: Улучшение формулировок (XYZ formula)
.
Language Switcher: Полная поддержка генерации на RU и EN.
3. Vacancy Tailor & Retention Loop (Киллер-фича)
:
Пользователь вставляет текст вакансии.
AI анализирует совпадения и переписывает Summary и Skills специально под эту
вакансию, подсвечивая нужный опыт.
Создается отдельная версия резюме (не затрагивая мастер-профиль)
.
https://gemini.google.com/app/4396a44a1515b8ff 1/4
25.11.2025, 18:30 Google Gemini
4. Cover Letter Generator:
Автоматическая генерация сопроводительного письма на основе пары "Резюме +
Вакансия".
Настройка тона (Formal, Casual, Enthusiastic)
.
5. Экспорт:
PDF (
LaTeX-style,
Modern)
.
3. Сценарии использования AI и Системные промпты
Сценарий А: "Улучшение достижений"
System Prompt:
"You are an expert tech recruiter. Rewrite user's bullet points to be impact-oriented
using the XYZ formula. Target Language:
{User_Selected_Language (RU/EN
)}
. Keep it
concise."
Сценарий Б: "Адаптация под вакансию (Tailoring
)"
Задача: Пересобрать резюме под конкретный Job Description (JD)
.
System Prompt:
"Analyze the Job Description provided below. Identify top 5 required hard skills and 3
soft skills.
1. Rewrite the candidate's 'Professional Summary' to highlight these specific skills.
2. Re-order skills in the 'Skills' section to put relevant ones first.
Output Language:
{User_Selected_Language}
."
Сценарий В: "Генерация Cover Letter"
Задача: Написать письмо, которое повысит конверсию.
System Prompt:
"Write a personalized cover letter for {Role} at {Company}
. Connect the user's
experience in {
Key_Project} directly to the requirements in the JD
. Keep it under 200
words. Tone: Professional yet passionate. Language:
{User_Selected_Language}
."
4. Экономика продукта (Unit Economics)
Для расчета точки сходимости мы учитываем прямые расходы на генерацию (COGS)
, стоимость
привлечения (CAC) и постоянные операционные расходы (OpEx)
.
4.1. Переменные расходы на одного активного пользователя (COGS)
Рассчитаем "тяжелый" сценарий использования: Создание резюме с нуля + 10 откликов на
вакансии в месяц.
А. Создание Мастер-Резюме (Разово)
: | Операция | Модель | Токены (Вход/Выход) | Стоимость |
| :--- | :--- | :--- | :--- | | Парсинг старого PDF | GPT-4o | 3k / 1k | $0.025 | | Генерация структуры и
https://gemini.google.com/app/4396a44a1515b8ff 2/4
25.11.2025, 18:30 Google Gemini
Summary | GPT-4o | 2k / 0.5k | $0.015 | | Улучшение опыта (Refining
) x5 | GPT-4o-mini | 5k / 2k |
$0.003 | | Перевод EN <-
> RU | GPT-4o-mini | 3k / 3k | $0.002 | | Итого Создание: | | | ~$0.045 |
Б. Адаптация и Отклики (Ежемесячно, 10 шт)
: | Операция | Кол-во | Стоимость за ед. | Итого | |
:--- | :--- | :--- | :--- | | Анализ вакансии (JD) | 10 | $0.0005 | $0.005 | | Tailoring
(Summary+Skills) | 10
| $0.0175 | $0.175 | | Cover Letter Generation | 10 | $0.0185 | $0.185 | | Итого Отклики: | | | ~$0.365 |
В. Инфраструктура (на 1 юзера)
:
Хостинг (Vercel/AWS)
, База данных, S3, PDF Render:
~$0.05
TOTAL COGS (Себестоимость обслуживания)
:
~$0.46 / месяц
4.2. Привлечение и Конверсия (CAC)
IT-рынок конкурентный. Предположим каналы: SEO, Content (Habr/VC/Medium
)
,
Direct Ads.
CPC (Cost Per Click
)
в IT: $1.00 - $3.00
(Google Ads/LinkedIn оч. дорого)
.
Конверсия в регистрацию: 15% (лендинг)
.
Конверсия в оплату (Pro)
: 3% (стандарт SaaS)
.
Расчет CAC для платного канала: Если CPC $1.50 -
> Стоимость регистрации (CPA
CAC (Paying User) = $333 (Это слишком дорого)
.
) = $10.00 -
>
Стратегия MVP: Упор на органику, SEO и "Watermark Growth" (
бесплатный PDF с водяным
знаком)
.
Целевой Blended CAC:$15 - $20.
4.3. Операционные расходы (OpEx - Fixed Monthly)
Расходы, которые не зависят от числа пользователей (на старте)
:
Домен и почта: $10
API Подписки (SearchApi, etc)
: $50
Бухгалтерия/Банк: $50
Итого OpEx:
~$110/мес (
без учета ФОТ основателей)
.
4.4. Точка сходимости (Unit Economics)
Предположим модель подписки Pro: $9.90 / месяц.
1. Выручка (
ARPU)
: $9.90
2. Маржинальная прибыль (Contribution Margin)
: $9.90
(Price)
- $0.46 (COGS)
- 3%
(Эквайринг ~$0.30
) = $9.14
3. Окупаемость трафика (ROAS)
: Если CAC = $20, то нам нужно, чтобы пользователь прожил
2.2 месяца (
LTV > $20
)
. Для карьерных сервисов средний срок жизни ~2-3 месяца (пока
ищут работу)
.
Вывод: Экономика сходится, если CAC < $27 (при LTV 3 месяца)
. Если мы привлекаем
пользователей органически (CAC ~$0
)
, то каждый пользователь приносит $9.14 чистой прибыли
в месяц, покрывая OpEx (
$110
) уже с 12-го платящего клиента.
https://gemini.google.com/app/4396a44a1515b8ff 3/4
25.11.2025, 18:30 Google Gemini
5. Технические требования и ограничения
5.1. Архитектура
Frontend: Next.js + Zustand.
Backend: Python (FastAPI)
. Python идеален для работы с текстом и интеграции с AI.
Database: PostgreSQL
(User Data) + S3 (хранение сгенерированных PDF)
.
5.2. Работа с поиском и данными
Агрегаторы поиска (SerpApi / SearchApi
)
:
Используем их вместо прямой интеграции с Google/Yandex. Это решает проблему капчи
и ротации прокси.
Use Case: "Найди ключевые ценности компании {Company Name}
, чтобы упомянуть их в
Cover Letter".
Парсинг вакансий:
План А (Надежный)
: Пользователь копирует текст вакансии (Ctrl+C -
> Ctrl+V)
. Работает
всегда.
План Б (Удобный)
: Пользователь кидает ссылку. Бэкенд пробует скачать HTML. Если
получает 403 (Cloudflare/Anti-bot на HH/LinkedIn)
, фолбек на План А. Не тратим ресурсы
MVP на обход защит LinkedIn.
5.3. Локализация
'en')
.
Весь интерфейс и системные промпты должны поддерживать переменную lo
cale ('ru' |
Генерация контента строго следует выбранному языку.
5.4. Аналитика (Product Metrics)
Для контроля экономики необходимо внедрить трекинг событий:
ai_token_usage — сколько токенов потратил конкретный юзер (чтобы выявлять аномалии)
.
su
scription_c
b
onversion — конверсия из Free в Pro.
generation_laten
cy —
время ожидания генерации (
влияет на отвал)
.
6. План разработки (
MVP Roadmap)
1. Неделя 1: База данных, Auth, базовый UI "Split-View".
2. Неделя 2: CRUD резюме, ручное заполнение.
3. Неделя 3: Интеграция LLM
(Промпты для улучшений + Свитчер языков)
.
4. Неделя 4: Реализация "Tailoring Mode" (
вставка текста вакансии -
> переписывание
Summary)
.
5. Неделя 5: Генератор Cover Letter.
6. Неделя 6: Экспорт PDF и релиз.
https://gemini.google.com/app/4396a44a1515b8ff 