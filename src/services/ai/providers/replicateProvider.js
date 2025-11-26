/**
 * Replicate Provider
 * Backup AI provider - большой выбор моделей
 * 
 * Документация: https://replicate.com/docs
 */

const REPLICATE_API_URL = 'https://api.replicate.com/v1';

// Маппинг моделей Replicate
const REPLICATE_MODELS = {
  // Meta Llama модели
  'llama-3b': 'meta/llama-3.2-3b-instruct',
  'llama-8b': 'meta/llama-3.1-8b-instruct',
  'llama-70b': 'meta/llama-3.1-70b-instruct',
  'llama-405b': 'meta/llama-3.1-405b-instruct',
  
  // Mistral модели
  'mistral-7b': 'mistralai/mistral-7b-instruct-v0.2',
  'mixtral-8x7b': 'mistralai/mixtral-8x7b-instruct-v0.1',
  
  // Default
  'default': 'meta/llama-3.1-8b-instruct'
};

/**
 * Класс для работы с Replicate API
 */
class ReplicateProvider {
  constructor() {
    this.apiKey = import.meta.env.VITE_REPLICATE_API_KEY;
    this.enabled = import.meta.env.VITE_REPLICATE_ENABLED === 'true';
    this.baseUrl = REPLICATE_API_URL;
  }

  /**
   * Проверка доступности провайдера
   */
  isAvailable() {
    return this.enabled && !!this.apiKey;
  }

  /**
   * Основной метод для вызова AI
   */
  async complete(systemPrompt, userInput, options = {}) {
    const {
      model = 'llama-8b',
      temperature = 0.7,
      maxTokens = 1024,
      timeout = 60000 // Replicate может быть медленнее
    } = options;

    if (!this.isAvailable()) {
      throw new Error('Replicate provider is not configured');
    }

    const modelId = REPLICATE_MODELS[model] || REPLICATE_MODELS['default'];

    try {
      // Шаг 1: Создать prediction
      const prediction = await this._createPrediction(modelId, {
        prompt: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`,
        max_tokens: maxTokens,
        temperature,
        system_prompt: systemPrompt
      });

      // Шаг 2: Ждать результат
      const result = await this._waitForPrediction(prediction.id, timeout);

      // Шаг 3: Извлечь ответ
      const output = Array.isArray(result.output) 
        ? result.output.join('') 
        : result.output;

      return {
        content: output || '',
        model: modelId,
        provider: 'replicate',
        usage: {
          inputTokens: this._estimateTokens(systemPrompt + userInput),
          outputTokens: this._estimateTokens(output || ''),
          totalTokens: 0
        },
        metrics: result.metrics || {}
      };

    } catch (error) {
      throw new Error(`Replicate error: ${error.message}`);
    }
  }

  /**
   * Создание prediction
   */
  async _createPrediction(model, input) {
    const response = await fetch(`${this.baseUrl}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: await this._getModelVersion(model),
        input
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to create prediction: ${error.detail || response.status}`);
    }

    return response.json();
  }

  /**
   * Ожидание завершения prediction
   */
  async _waitForPrediction(predictionId, timeout) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const response = await fetch(`${this.baseUrl}/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get prediction: ${response.status}`);
      }

      const prediction = await response.json();

      if (prediction.status === 'succeeded') {
        return prediction;
      }

      if (prediction.status === 'failed') {
        throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
      }

      if (prediction.status === 'canceled') {
        throw new Error('Prediction was canceled');
      }

      // Ждём 1 секунду перед следующей проверкой
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('Prediction timeout');
  }

  /**
   * Получение версии модели
   */
  async _getModelVersion(model) {
    // Для упрощения используем latest версию
    // В production лучше кешировать версии
    const response = await fetch(`${this.baseUrl}/models/${model}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get model: ${response.status}`);
    }

    const data = await response.json();
    return data.latest_version?.id;
  }

  /**
   * Streaming completion
   */
  async *stream(systemPrompt, userInput, options = {}) {
    const {
      model = 'llama-8b',
      temperature = 0.7,
      maxTokens = 1024
    } = options;

    if (!this.isAvailable()) {
      throw new Error('Replicate provider is not configured');
    }

    const modelId = REPLICATE_MODELS[model] || REPLICATE_MODELS['default'];

    // Создаём prediction с stream
    const prediction = await this._createPrediction(modelId, {
      prompt: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`,
      max_tokens: maxTokens,
      temperature,
      stream: true
    });

    // Читаем stream
    if (prediction.urls?.stream) {
      const response = await fetch(prediction.urls.stream, {
        headers: {
          'Accept': 'text/event-stream'
        }
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data && data !== '[DONE]') {
                yield data;
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    }
  }

  /**
   * Примерный подсчёт токенов
   */
  _estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Расчёт стоимости
   */
  calculateCost(inputTokens, outputTokens, model = 'llama-8b') {
    // Цены Replicate (per 1M tokens, конвертируем в per 1K)
    const pricing = {
      'llama-3b': { input: 0.00005, output: 0.00010 },
      'llama-8b': { input: 0.00010, output: 0.00020 },
      'llama-70b': { input: 0.00065, output: 0.00275 },
      'llama-405b': { input: 0.00500, output: 0.01500 },
      'mistral-7b': { input: 0.00010, output: 0.00020 },
      'mixtral-8x7b': { input: 0.00030, output: 0.00100 }
    };

    const price = pricing[model] || pricing['llama-8b'];
    
    return {
      inputCost: (inputTokens / 1000) * price.input,
      outputCost: (outputTokens / 1000) * price.output,
      totalCost: (inputTokens / 1000) * price.input + (outputTokens / 1000) * price.output
    };
  }
}

// Экспорт singleton
export const replicateProvider = new ReplicateProvider();
export default replicateProvider;

