# API Specification - CV Platform Backend

**Version**: 1.0.0  
**Base URL**: `https://api.cvplatform.io/v1` (production)  
**Base URL**: `http://localhost:3001/v1` (development)

---

## 🔐 Authentication

Все приватные endpoints требуют JWT токен в заголовке:

```
Authorization: Bearer <jwt_token>
```

---

## 📋 Endpoints

### **Authentication**

#### POST `/auth/register`
Регистрация нового пользователя

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "Иван Иванов"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Иван Иванов",
    "subscriptionTier": "free"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST `/auth/login`
Вход пользователя

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "user": { /* ... */ },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST `/auth/refresh`
Обновление access токена

**Request:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "new_jwt_token"
}
```

#### POST `/auth/google`
OAuth вход через Google

**Request:**
```json
{
  "googleToken": "google_id_token"
}
```

**Response:** `200 OK` (аналогично `/auth/login`)

---

### **User Management**

#### GET `/users/me`
Получить текущего пользователя

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "Иван Иванов",
  "subscriptionTier": "pro",
  "aiTokensUsed": 450,
  "aiTokensLimit": 1000,
  "createdAt": "2025-01-01T00:00:00Z"
}
```

#### PUT `/users/me`
Обновить профиль пользователя

**Request:**
```json
{
  "fullName": "Новое Имя",
  "email": "newemail@example.com"
}
```

**Response:** `200 OK` (обновленный user)

#### DELETE `/users/me`
Удалить аккаунт (GDPR compliance)

**Response:** `204 No Content`

---

### **Master Profile**

#### GET `/profile/master`
Получить мастер-профиль

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "userId": "user_uuid",
  "personalInfo": {
    "fullName": "Иван Иванов",
    "title": "Senior Backend Developer",
    "email": "ivan@example.com",
    "phone": "+7 (999) 123-45-67",
    "location": "Москва, Россия",
    "links": "github.com/ivan",
    "photo": "https://storage.com/photo.jpg"
  },
  "summary": "Опытный разработчик...",
  "experience": [
    {
      "id": 1,
      "company": "TechCorp",
      "role": "Backend Developer",
      "dates": "2020-2023",
      "description": "Разрабатывал API...",
      "achievements": ["Улучшил производительность на 40%"]
    }
  ],
  "skills": ["Python", "FastAPI", "PostgreSQL"],
  "education": [/* ... */],
  "projects": [
    {
      "id": 1,
      "name": "OpenSource Project",
      "description": "Библиотека для...",
      "technologies": ["Python", "Docker"],
      "link": "github.com/project",
      "dates": "2023"
    }
  ],
  "certifications": [
    {
      "id": 1,
      "name": "AWS Certified",
      "issuer": "Amazon",
      "date": "2023-06",
      "link": "verify.com/cert"
    }
  ],
  "languages": [
    {
      "id": 1,
      "language": "English",
      "level": "fluent"
    }
  ],
  "updatedAt": "2025-11-25T12:00:00Z"
}
```

#### PUT `/profile/master`
Обновить мастер-профиль

**Request:** (любые поля из структуры выше)
```json
{
  "summary": "Новое summary",
  "experience": [/* обновленный массив */]
}
```

**Response:** `200 OK` (обновленный профиль)

#### POST `/profile/parse`
Парсинг PDF/DOCX резюме

**Request:** `multipart/form-data`
```
file: <pdf_or_docx_file>
locale: "ru" | "en"
```

**Response:** `200 OK`
```json
{
  "parsed": {
    "personalInfo": { /* извлеченные данные */ },
    "summary": "...",
    "experience": [/* ... */],
    "skills": ["..."],
    "education": [/* ... */]
  },
  "confidence": 0.85, // Уверенность парсера (0-1)
  "warnings": ["Не удалось извлечь телефон"]
}
```

---

### **Job Applications**

#### GET `/jobs`
Список откликов пользователя

**Query params:**
- `status` (optional): `draft`, `applied`, `screening`, `interview`, `offer`, `rejected`
- `limit` (default: 20)
- `offset` (default: 0)

**Response:** `200 OK`
```json
{
  "jobs": [
    {
      "id": "uuid",
      "companyName": "Google",
      "jobTitle": "Senior Backend Developer",
      "status": "applied",
      "matchScore": 85,
      "createdAt": "2025-11-20T10:00:00Z",
      "appliedAt": "2025-11-21T14:00:00Z"
    }
  ],
  "total": 10,
  "limit": 20,
  "offset": 0
}
```

#### POST `/jobs/create`
Создать новый отклик

**Request:**
```json
{
  "companyName": "Google",
  "jobTitle": "Senior Backend Developer",
  "jobDescription": "We are looking for...",
  "jobUrl": "https://careers.google.com/job123"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "companyName": "Google",
  "jobTitle": "Senior Backend Developer",
  "status": "draft",
  "createdAt": "2025-11-25T12:00:00Z"
}
```

#### GET `/jobs/:id`
Детали конкретного отклика

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "userId": "user_uuid",
  "companyName": "Google",
  "jobTitle": "Senior Backend Developer",
  "jobDescription": "Full JD text...",
  "jobUrl": "https://...",
  "status": "applied",
  
  // AI Analysis
  "extractedSkills": ["Python", "FastAPI", "Docker"],
  "extractedKeywords": ["microservices", "cloud", "api"],
  "matchScore": 85,
  
  // Generated artifacts
  "tailoredResume": {
    "summary": "Переписанное summary под вакансию",
    "skills": ["Python", "FastAPI", /* отсортированные */],
    "experience": [/* отфильтрованный */],
    "overrides": { /* изменения */ }
  },
  
  "coverLetter": {
    "content": "Dear Hiring Manager...",
    "tone": "formal",
    "generatedAt": "2025-11-25T12:30:00Z"
  },
  
  "notes": "Пользовательские заметки",
  "createdAt": "2025-11-20T10:00:00Z",
  "updatedAt": "2025-11-25T12:00:00Z",
  "appliedAt": "2025-11-21T14:00:00Z"
}
```

#### PUT `/jobs/:id`
Обновить отклик

**Request:**
```json
{
  "status": "applied",
  "notes": "Отправил резюме",
  "appliedAt": "2025-11-25T15:00:00Z"
}
```

**Response:** `200 OK` (обновленный job)

#### DELETE `/jobs/:id`
Удалить отклик

**Response:** `204 No Content`

---

### **AI Services**

#### POST `/ai/analyze-job`
Анализ job description

**Request:**
```json
{
  "jobDescription": "We are looking for Senior Python Developer...",
  "locale": "ru"
}
```

**Response:** `200 OK`
```json
{
  "role": "Senior Python Developer",
  "seniority": "senior",
  "companyName": "TechCorp", // если упомянута в JD
  "hardSkills": ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
  "softSkills": ["Leadership", "Communication", "Problem-solving"],
  "mustHave": ["Python", "FastAPI", "PostgreSQL"],
  "niceToHave": ["Docker", "AWS", "Kubernetes"],
  "keywords": ["microservices", "rest api", "cloud"],
  "estimatedMatchScore": 85 // на основе мастер-профиля
}
```

#### POST `/ai/generate-summary`
Генерация Summary под вакансию

**Request:**
```json
{
  "masterProfileId": "uuid",
  "jobDescription": "JD text...",
  "locale": "ru"
}
```

**Response:** `200 OK`
```json
{
  "summary": "Высококвалифицированный Backend разработчик...",
  "tokensUsed": 150
}
```

#### POST `/ai/refine-bullet`
Улучшение конкретного пункта опыта

**Request:**
```json
{
  "text": "Разрабатывал API",
  "context": "Backend Developer", // роль для контекста
  "locale": "ru"
}
```

**Response:** `200 OK`
```json
{
  "original": "Разрабатывал API",
  "improved": "Спроектировал и внедрил RESTful API на FastAPI, сократив время отклика на 40% и увеличив пропускную способность до 2000 req/sec.",
  "alternatives": [
    "Вариант 2...",
    "Вариант 3..."
  ],
  "tokensUsed": 80
}
```

#### POST `/ai/cover-letter`
Генерация сопроводительного письма

**Request:**
```json
{
  "masterProfileId": "uuid",
  "jobDescription": "JD text...",
  "companyName": "Google",
  "role": "Senior Backend Developer",
  "tone": "formal", // "formal" | "casual" | "enthusiastic"
  "locale": "en"
}
```

**Response:** `200 OK`
```json
{
  "coverLetter": "Dear Hiring Manager,\n\nI am excited...",
  "wordCount": 185,
  "tokensUsed": 200
}
```

#### POST `/ai/translate`
Перевод контента

**Request:**
```json
{
  "text": "Разрабатывал backend сервисы",
  "targetLang": "en"
}
```

**Response:** `200 OK`
```json
{
  "original": "Разрабатывал backend сервисы",
  "translated": "Developed backend services",
  "sourceLang": "ru",
  "targetLang": "en",
  "tokensUsed": 20
}
```

---

### **Subscription & Billing**

#### GET `/subscription`
Информация о подписке

**Response:** `200 OK`
```json
{
  "tier": "pro",
  "status": "active",
  "aiTokensUsed": 450,
  "aiTokensLimit": 1000,
  "jobTailoringEnabled": true,
  "templatesAvailable": ["modern", "latex", "classic"],
  "watermark": false,
  "billingPeriodStart": "2025-11-01T00:00:00Z",
  "billingPeriodEnd": "2025-12-01T00:00:00Z",
  "nextBillingDate": "2025-12-01T00:00:00Z",
  "amount": 9.90,
  "currency": "USD"
}
```

#### POST `/subscription/upgrade`
Обновление подписки

**Request:**
```json
{
  "tier": "pro",
  "paymentMethodId": "stripe_pm_id"
}
```

**Response:** `200 OK`
```json
{
  "subscription": { /* обновленная подписка */ },
  "invoice": {
    "id": "inv_123",
    "amount": 9.90,
    "status": "paid"
  }
}
```

---

## 🔒 Rate Limiting

**Limits:**
- **AI endpoints**: 50 requests/minute per user
- **Other endpoints**: 100 requests/minute per user

**Response при превышении:** `429 Too Many Requests`
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60 // seconds
}
```

---

## ❌ Error Responses

**Стандартный формат ошибки:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid"
    }
  }
}
```

**Коды ошибок:**
- `400` - Bad Request (валидация)
- `401` - Unauthorized (нет/невалидный токен)
- `403` - Forbidden (недостаточно прав)
- `404` - Not Found
- `409` - Conflict (email уже существует)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## 🛠️ Implementation Notes

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  ai_tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Master Profiles table
CREATE TABLE master_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  personal_info JSONB,
  summary TEXT,
  experience JSONB,
  skills JSONB,
  education JSONB,
  projects JSONB,
  certifications JSONB,
  languages JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  job_title VARCHAR(255),
  job_description TEXT,
  job_url TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  extracted_skills JSONB,
  extracted_keywords JSONB,
  match_score INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  applied_at TIMESTAMP
);

-- Tailored Resumes table
CREATE TABLE tailored_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  base_profile_id UUID REFERENCES master_profiles(id),
  overrides JSONB, -- только измененные поля
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Cover Letters table
CREATE TABLE cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  content TEXT,
  tone VARCHAR(50),
  generated_at TIMESTAMP DEFAULT NOW()
);
```

### Tech Stack (Backend)

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Database**: PostgreSQL 15+
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Auth**: python-jose (JWT)
- **Validation**: Pydantic v2
- **AI**: OpenAI SDK, Anthropic SDK
- **PDF Parsing**: pdfplumber, python-docx
- **Storage**: AWS S3 (boto3) или Supabase Storage
- **Deploy**: Docker, AWS ECS / Railway / Fly.io

---

**Дата создания**: 25 ноября 2025  
**Версия**: 1.0.0

