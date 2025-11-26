/**
 * AI Router
 * Умный роутинг между AI провайдерами с fallback
 */

import { falProvider } from './providers/falProvider';
import { replicateProvider } from './providers/replicateProvider';

/**
 * Конфигурация роутинга для разных типов задач
 */
const ROUTING_CONFIG = {
  // Улучшение summary - средняя сложность
  'improve_summary': {
    primary: { provider: 'fal', model: 'claude-haiku' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 15000,
    maxRetries: 2
  },
  
  // Улучшение bullet point - простая задача
  'improve_bullet': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 10000,
    maxRetries: 2
  },
  
  // Парсинг вакансии - простая задача
  'parse_job': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 15000,
    maxRetries: 2
  },
  
  // Match Score - средняя сложность
  'match_score': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 15000,
    maxRetries: 2
  },
  
  // Gap Analysis - сложная задача
  'gap_analysis': {
    primary: { provider: 'fal', model: 'claude-haiku' },
    fallback: { provider: 'replicate', model: 'llama-70b' },
    timeout: 20000,
    maxRetries: 2
  },
  
  // Resume Tailor - сложная задача
  'tailor_resume': {
    primary: { provider: 'fal', model: 'claude-haiku' },
    fallback: { provider: 'replicate', model: 'llama-70b' },
    timeout: 25000,
    maxRetries: 2
  },
  
  // Cover Letter - требует качества
  'cover_letter': {
    primary: { provider: 'fal', model: 'claude-sonnet' },
    fallback: { provider: 'fal', model: 'claude-haiku' },
    timeout: 30000,
    maxRetries: 2
  },
  
  // Перевод - средняя сложность
  'translate': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 15000,
    maxRetries: 2
  },
  
  // Чат - быстрый ответ
  'chat': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 20000,
    maxRetries: 1
  },
  
  // Предложение навыков - простая задача
  'suggest_skills': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 15000,
    maxRetries: 2
  },
  
  // Default
  'default': {
    primary: { provider: 'fal', model: 'llama-8b' },
    fallback: { provider: 'replicate', model: 'llama-8b' },
    timeout: 20000,
    maxRetries: 2
  }
};

/**
 * Получить провайдер по имени
 */
function getProvider(name) {
  switch (name) {
    case 'fal':
      return falProvider;
    case 'replicate':
      return replicateProvider;
    default:
      return falProvider;
  }
}

/**
 * AI Router класс
 */
class AIRouter {
  constructor() {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      fallbackUsed: 0,
      totalCost: 0,
      byProvider: {
        fal: { requests: 0, cost: 0 },
        replicate: { requests: 0, cost: 0 }
      }
    };
  }

  /**
   * Основной метод роутинга
   * @param {string} taskType - Тип задачи (improve_summary, parse_job, etc.)
   * @param {string} systemPrompt - Системный промпт
   * @param {string} userInput - Пользовательский ввод
   * @param {Object} options - Дополнительные опции
   */
  async route(taskType, systemPrompt, userInput, options = {}) {
    const config = ROUTING_CONFIG[taskType] || ROUTING_CONFIG['default'];
    const { temperature = 0.7, maxTokens } = options;

    this.stats.totalRequests++;

    // Попытка через primary провайдер
    const primaryProvider = getProvider(config.primary.provider);
    
    if (primaryProvider.isAvailable()) {
      try {
        const result = await this._callWithRetry(
          primaryProvider,
          systemPrompt,
          userInput,
          {
            model: config.primary.model,
            temperature,
            maxTokens,
            timeout: config.timeout
          },
          config.maxRetries
        );

        this._updateStats(config.primary.provider, result);
        return result;

      } catch (primaryError) {
        console.warn(`Primary provider (${config.primary.provider}) failed:`, primaryError.message);
        
        // Fallback на backup провайдер
        return await this._tryFallback(config, systemPrompt, userInput, options);
      }
    }

    // Если primary недоступен, сразу fallback
    return await this._tryFallback(config, systemPrompt, userInput, options);
  }

  /**
   * Fallback на backup провайдер
   */
  async _tryFallback(config, systemPrompt, userInput, options) {
    const { temperature = 0.7, maxTokens } = options;
    const fallbackProvider = getProvider(config.fallback.provider);

    if (!fallbackProvider.isAvailable()) {
      this.stats.failedRequests++;
      throw new Error('No AI providers available');
    }

    this.stats.fallbackUsed++;

    try {
      const result = await this._callWithRetry(
        fallbackProvider,
        systemPrompt,
        userInput,
        {
          model: config.fallback.model,
          temperature,
          maxTokens,
          timeout: config.timeout
        },
        config.maxRetries
      );

      this._updateStats(config.fallback.provider, result);
      return result;

    } catch (fallbackError) {
      this.stats.failedRequests++;
      throw new Error(`All AI providers failed: ${fallbackError.message}`);
    }
  }

  /**
   * Вызов с retry логикой
   */
  async _callWithRetry(provider, systemPrompt, userInput, options, maxRetries) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await provider.complete(systemPrompt, userInput, options);
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);
        
        if (attempt < maxRetries) {
          // Экспоненциальный backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    throw lastError;
  }

  /**
   * Обновление статистики
   */
  _updateStats(providerName, result) {
    this.stats.successfulRequests++;
    
    if (result.usage) {
      const provider = getProvider(providerName);
      const cost = provider.calculateCost(
        result.usage.inputTokens,
        result.usage.outputTokens,
        result.model
      );

      this.stats.totalCost += cost.totalCost;
      this.stats.byProvider[providerName].requests++;
      this.stats.byProvider[providerName].cost += cost.totalCost;
    }
  }

  /**
   * Streaming роутинг
   */
  async *routeStream(taskType, systemPrompt, userInput, options = {}) {
    const config = ROUTING_CONFIG[taskType] || ROUTING_CONFIG['default'];
    const { temperature = 0.7, maxTokens } = options;

    const primaryProvider = getProvider(config.primary.provider);

    if (primaryProvider.isAvailable()) {
      try {
        yield* primaryProvider.stream(systemPrompt, userInput, {
          model: config.primary.model,
          temperature,
          maxTokens
        });
        return;
      } catch (error) {
        console.warn('Primary stream failed, trying fallback');
      }
    }

    const fallbackProvider = getProvider(config.fallback.provider);
    yield* fallbackProvider.stream(systemPrompt, userInput, {
      model: config.fallback.model,
      temperature,
      maxTokens
    });
  }

  /**
   * Получить статистику
   */
  getStats() {
    return {
      ...this.stats,
      successRate: this.stats.totalRequests > 0
        ? (this.stats.successfulRequests / this.stats.totalRequests * 100).toFixed(2) + '%'
        : '0%',
      fallbackRate: this.stats.totalRequests > 0
        ? (this.stats.fallbackUsed / this.stats.totalRequests * 100).toFixed(2) + '%'
        : '0%'
    };
  }

  /**
   * Сброс статистики
   */
  resetStats() {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      fallbackUsed: 0,
      totalCost: 0,
      byProvider: {
        fal: { requests: 0, cost: 0 },
        replicate: { requests: 0, cost: 0 }
      }
    };
  }

  /**
   * Проверка доступности провайдеров
   */
  checkAvailability() {
    return {
      fal: falProvider.isAvailable(),
      replicate: replicateProvider.isAvailable(),
      anyAvailable: falProvider.isAvailable() || replicateProvider.isAvailable()
    };
  }
}

// Экспорт singleton
export const aiRouter = new AIRouter();
export default aiRouter;

