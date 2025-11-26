/**
 * AI Router
 * Умный роутинг между AI провайдерами с fallback
 * v2.0 - Добавлена поддержка YandexGPT для русского языка
 */

import { falProvider } from './providers/falProvider';
import { replicateProvider } from './providers/replicateProvider';
import { yandexProvider } from './providers/yandexProvider';
import { detectLanguage, shouldUseYandexGPT } from './utils/languageDetector';

/**
 * Конфигурация роутинга для разных типов задач
 * 
 * Доступные модели:
 * Replicate:
 * - claude-haiku: anthropic/claude-3.5-haiku (быстрый, дешёвый) - DEFAULT
 * - claude-sonnet: anthropic/claude-3.5-sonnet (качественный)
 * - claude-3.7: anthropic/claude-3.7-sonnet (новейший)
 * - gpt-4o-mini: openai/gpt-4o-mini (OpenAI)
 * 
 * YandexGPT (для русского языка):
 * - yandexgpt-lite: быстрая модель
 * - yandexgpt: основная модель
 * - yandexgpt-32k: для длинных текстов
 */
const ROUTING_CONFIG = {
  // Улучшение summary - Claude Haiku или YandexGPT для русского
  'improve_summary': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt-lite' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Улучшение bullet point - Claude Haiku
  'improve_bullet': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt-lite' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Парсинг вакансии - Claude Haiku (хорош для JSON)
  'parse_job': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Match Score - Claude Haiku
  'match_score': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Gap Analysis - Claude Sonnet (нужно качество)
  'gap_analysis': {
    primary: { provider: 'replicate', model: 'claude-sonnet' },
    russian: { provider: 'yandex', model: 'yandexgpt' },
    fallback: { provider: 'replicate', model: 'claude-haiku' },
    timeout: 180000,
    maxRetries: 2
  },
  
  // Resume Tailor - Claude Sonnet
  'tailor_resume': {
    primary: { provider: 'replicate', model: 'claude-sonnet' },
    russian: { provider: 'yandex', model: 'yandexgpt' },
    fallback: { provider: 'replicate', model: 'claude-haiku' },
    timeout: 180000,
    maxRetries: 2
  },
  
  // Cover Letter - Claude 3.7 (лучшее качество)
  'cover_letter': {
    primary: { provider: 'replicate', model: 'claude-3.7' },
    russian: { provider: 'yandex', model: 'yandexgpt' },
    fallback: { provider: 'replicate', model: 'claude-sonnet' },
    timeout: 180000,
    maxRetries: 2
  },
  
  // Перевод - Claude Haiku
  'translate': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Чат - Claude Haiku (быстрый ответ)
  'chat': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt-lite' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 1
  },
  
  // Предложение навыков - Claude Haiku
  'suggest_skills': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt-lite' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
    maxRetries: 2
  },
  
  // Default - Claude Haiku
  'default': {
    primary: { provider: 'replicate', model: 'claude-haiku' },
    russian: { provider: 'yandex', model: 'yandexgpt-lite' },
    fallback: { provider: 'replicate', model: 'gpt-4o-mini' },
    timeout: 120000,
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
    case 'yandex':
      return yandexProvider;
    default:
      return replicateProvider;
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
      yandexUsed: 0,
      totalCost: 0,
      byProvider: {
        fal: { requests: 0, cost: 0 },
        replicate: { requests: 0, cost: 0 },
        yandex: { requests: 0, cost: 0 }
      }
    };
  }

  /**
   * Определить оптимальный провайдер для запроса
   */
  _selectProvider(config, userInput, options = {}) {
    const { locale = 'en', forceProvider = null } = options;

    // Принудительный выбор провайдера
    if (forceProvider) {
      return config.primary; // Use primary config with forced provider
    }

    // Проверяем, есть ли конфигурация для русского языка
    if (config.russian && locale === 'ru') {
      const russianProvider = getProvider(config.russian.provider);
      
      // Если YandexGPT доступен и текст на русском
      if (russianProvider.isAvailable()) {
        const detectedLang = detectLanguage(userInput);
        
        if (detectedLang === 'ru') {
          this._log('Detected Russian text, using YandexGPT');
          return config.russian;
        }
      }
    }

    // По умолчанию используем primary
    return config.primary;
  }

  _log(...args) {
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('[AIRouter]', ...args);
    }
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
    const { temperature = 0.7, maxTokens, locale = 'en' } = options;

    this.stats.totalRequests++;

    // Выбираем оптимальный провайдер
    const selectedConfig = this._selectProvider(config, userInput, options);
    const provider = getProvider(selectedConfig.provider);

    this._log(`Task: ${taskType}, Provider: ${selectedConfig.provider}, Model: ${selectedConfig.model}`);

    // Попытка через выбранный провайдер
    if (provider.isAvailable()) {
      try {
        const result = await this._callWithRetry(
          provider,
          systemPrompt,
          userInput,
          {
            model: selectedConfig.model,
            temperature,
            maxTokens,
            timeout: config.timeout
          },
          config.maxRetries
        );

        this._updateStats(selectedConfig.provider, result);
        
        // Отмечаем использование YandexGPT
        if (selectedConfig.provider === 'yandex') {
          this.stats.yandexUsed++;
        }
        
        return result;

      } catch (primaryError) {
        console.warn(`Provider (${selectedConfig.provider}) failed:`, primaryError.message);
        
        // Fallback на backup провайдер
        return await this._tryFallback(config, systemPrompt, userInput, options);
      }
    }

    // Если выбранный провайдер недоступен, сразу fallback
    this._log(`Provider ${selectedConfig.provider} not available, trying fallback`);
    return await this._tryFallback(config, systemPrompt, userInput, options);
  }

  /**
   * Fallback на backup провайдер
   */
  async _tryFallback(config, systemPrompt, userInput, options) {
    const { temperature = 0.7, maxTokens } = options;
    const fallbackProvider = getProvider(config.fallback.provider);

    if (!fallbackProvider.isAvailable()) {
      // Если fallback тоже недоступен, пробуем primary (если это не тот же провайдер)
      const primaryProvider = getProvider(config.primary.provider);
      
      if (primaryProvider.isAvailable() && config.primary.provider !== config.fallback.provider) {
        this.stats.fallbackUsed++;
        
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
            1
          );
          
          this._updateStats(config.primary.provider, result);
          return result;
        } catch (error) {
          this.stats.failedRequests++;
          throw new Error(`All AI providers failed: ${error.message}`);
        }
      }
      
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
    const { temperature = 0.7, maxTokens, locale = 'en' } = options;

    // Выбираем провайдер
    const selectedConfig = this._selectProvider(config, userInput, options);
    const provider = getProvider(selectedConfig.provider);

    if (provider.isAvailable() && provider.stream) {
      try {
        yield* provider.stream(systemPrompt, userInput, {
          model: selectedConfig.model,
          temperature,
          maxTokens
        });
        return;
      } catch (error) {
        console.warn('Primary stream failed, trying fallback');
      }
    }

    // Fallback
    const fallbackProvider = getProvider(config.fallback.provider);
    if (fallbackProvider.stream) {
    yield* fallbackProvider.stream(systemPrompt, userInput, {
      model: config.fallback.model,
      temperature,
      maxTokens
    });
    }
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
        : '0%',
      yandexRate: this.stats.totalRequests > 0
        ? (this.stats.yandexUsed / this.stats.totalRequests * 100).toFixed(2) + '%'
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
      yandexUsed: 0,
      totalCost: 0,
      byProvider: {
        fal: { requests: 0, cost: 0 },
        replicate: { requests: 0, cost: 0 },
        yandex: { requests: 0, cost: 0 }
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
      yandex: yandexProvider.isAvailable(),
      anyAvailable: falProvider.isAvailable() || replicateProvider.isAvailable() || yandexProvider.isAvailable()
    };
  }

  /**
   * Тест всех провайдеров
   */
  async testAllProviders() {
    const results = {};
    
    if (replicateProvider.isAvailable()) {
      results.replicate = await replicateProvider.testConnection();
    } else {
      results.replicate = { success: false, error: 'Not configured' };
    }
    
    if (yandexProvider.isAvailable()) {
      results.yandex = await yandexProvider.testConnection();
    } else {
      results.yandex = { success: false, error: 'Not configured' };
    }
    
    if (falProvider.isAvailable()) {
      results.fal = await falProvider.testConnection?.() || { success: false, error: 'Test not implemented' };
    } else {
      results.fal = { success: false, error: 'Not configured' };
    }
    
    return results;
  }
}

// Экспорт singleton
export const aiRouter = new AIRouter();
export default aiRouter;
