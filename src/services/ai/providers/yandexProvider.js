/**
 * YandexGPT Provider
 * Провайдер для работы с YandexGPT API
 * Отлично подходит для русского языка
 * 
 * Документация: https://cloud.yandex.ru/docs/yandexgpt/
 */

const YANDEX_API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1';

/**
 * Доступные модели YandexGPT
 */
const YANDEX_MODELS = {
  // YandexGPT Lite - быстрая, для простых задач
  'yandexgpt-lite': {
    uri: 'gpt://{folderId}/yandexgpt-lite/latest',
    maxTokens: 2000,
    description: 'Быстрая модель для простых задач'
  },
  
  // YandexGPT - основная модель
  'yandexgpt': {
    uri: 'gpt://{folderId}/yandexgpt/latest',
    maxTokens: 8000,
    description: 'Основная модель, баланс качества и скорости'
  },
  
  // YandexGPT 32K - для длинных текстов
  'yandexgpt-32k': {
    uri: 'gpt://{folderId}/yandexgpt-32k/latest',
    maxTokens: 32000,
    description: 'Для длинных текстов и сложных задач'
  }
};

const DEFAULT_MODEL = 'yandexgpt-lite';

/**
 * Класс для работы с YandexGPT API
 */
class YandexGPTProvider {
  constructor() {
    // API ключ и Folder ID из переменных окружения
    this.apiKey = import.meta.env.VITE_YANDEX_API_KEY;
    this.folderId = import.meta.env.VITE_YANDEX_FOLDER_ID;
    this.enabled = import.meta.env.VITE_YANDEX_ENABLED === 'true';
    this.baseUrl = YANDEX_API_URL;
    this.debug = import.meta.env.VITE_DEBUG === 'true';
  }

  /**
   * Проверка доступности провайдера
   */
  isAvailable() {
    return this.enabled && !!this.apiKey && !!this.folderId;
  }

  _log(...args) {
    if (this.debug) {
      console.log('[YandexGPT]', ...args);
    }
  }

  /**
   * Получить URI модели с подставленным folderId
   */
  _getModelUri(model = DEFAULT_MODEL) {
    const modelConfig = YANDEX_MODELS[model] || YANDEX_MODELS[DEFAULT_MODEL];
    return modelConfig.uri.replace('{folderId}', this.folderId);
  }

  /**
   * Основной метод для вызова AI
   */
  async complete(systemPrompt, userInput, options = {}) {
    const {
      model = DEFAULT_MODEL,
      temperature = 0.7,
      maxTokens = 1024,
      timeout = 60000
    } = options;

    if (!this.isAvailable()) {
      throw new Error('YandexGPT provider is not configured. Check VITE_YANDEX_API_KEY and VITE_YANDEX_FOLDER_ID');
    }

    const modelConfig = YANDEX_MODELS[model] || YANDEX_MODELS[DEFAULT_MODEL];
    const modelUri = this._getModelUri(model);
    
    this._log('Using model:', modelUri);

    try {
      const requestBody = {
        modelUri: modelUri,
        completionOptions: {
          stream: false,
          temperature: temperature,
          maxTokens: String(Math.min(maxTokens, modelConfig.maxTokens))
        },
        messages: [
          {
            role: 'system',
            text: systemPrompt
          },
          {
            role: 'user',
            text: userInput
          }
        ]
      };

      this._log('Request body:', JSON.stringify(requestBody, null, 2));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseUrl}/completion`, {
        method: 'POST',
        headers: {
          'Authorization': `Api-Key ${this.apiKey}`,
          'Content-Type': 'application/json',
          'x-folder-id': this.folderId
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        this._log('API Error:', response.status, errorData);
        throw new Error(
          `YandexGPT API error: ${errorData.error?.message || errorData.message || `HTTP ${response.status}`}`
        );
      }

      const data = await response.json();
      
      this._log('Response:', JSON.stringify(data, null, 2));

      // Извлекаем текст из ответа
      const output = this._extractOutput(data);
      const usage = data.usage || {};

      return {
        content: output,
        model: model,
        provider: 'yandex',
        usage: {
          inputTokens: parseInt(usage.inputTextTokens) || this._estimateTokens(systemPrompt + userInput),
          outputTokens: parseInt(usage.completionTokens) || this._estimateTokens(output),
          totalTokens: parseInt(usage.totalTokens) || 0
        }
      };

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`YandexGPT request timeout after ${timeout}ms`);
      }
      console.error('YandexGPT API error:', error);
      throw error;
    }
  }

  /**
   * Streaming метод (если поддерживается)
   */
  async *stream(systemPrompt, userInput, options = {}) {
    const {
      model = DEFAULT_MODEL,
      temperature = 0.7,
      maxTokens = 1024
    } = options;

    if (!this.isAvailable()) {
      throw new Error('YandexGPT provider is not configured');
    }

    const modelUri = this._getModelUri(model);
    const modelConfig = YANDEX_MODELS[model] || YANDEX_MODELS[DEFAULT_MODEL];

    const requestBody = {
      modelUri: modelUri,
      completionOptions: {
        stream: true,
        temperature: temperature,
        maxTokens: String(Math.min(maxTokens, modelConfig.maxTokens))
      },
      messages: [
        { role: 'system', text: systemPrompt },
        { role: 'user', text: userInput }
      ]
    };

    const response = await fetch(`${this.baseUrl}/completion`, {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${this.apiKey}`,
        'Content-Type': 'application/json',
        'x-folder-id': this.folderId
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`YandexGPT streaming error: ${error.error?.message || response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // YandexGPT отдаёт JSON Lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              const text = data.result?.alternatives?.[0]?.message?.text;
              if (text) {
                yield text;
              }
            } catch (e) {
              // Ignore malformed lines
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Извлечение текста из ответа YandexGPT
   */
  _extractOutput(data) {
    // Структура ответа YandexGPT:
    // { result: { alternatives: [{ message: { role, text }, status }], usage, modelVersion } }
    
    if (data.result?.alternatives?.[0]?.message?.text) {
      return data.result.alternatives[0].message.text;
    }
    
    // Fallback для других форматов
    if (data.text) return data.text;
    if (data.response) return data.response;
    if (data.content) return data.content;
    
    return '';
  }

  /**
   * Оценка количества токенов (приблизительно)
   */
  _estimateTokens(text) {
    if (!text) return 0;
    // Для русского языка примерно 1.5 токена на слово
    const words = text.split(/\s+/).length;
    return Math.ceil(words * 1.5);
  }

  /**
   * Расчёт стоимости
   * Цены: https://cloud.yandex.ru/docs/yandexgpt/pricing
   * Примерно 0.2₽ за 1000 токенов (генерация)
   */
  calculateCost(inputTokens, outputTokens, model = DEFAULT_MODEL) {
    // Цены в рублях за 1000 токенов
    const pricing = {
      'yandexgpt-lite': { input: 0.02, output: 0.02 },  // ~0.02₽/1K
      'yandexgpt': { input: 0.20, output: 0.20 },       // ~0.20₽/1K
      'yandexgpt-32k': { input: 0.20, output: 0.20 }    // ~0.20₽/1K
    };

    const price = pricing[model] || pricing[DEFAULT_MODEL];
    
    // Конвертация в USD (примерный курс 90₽/$)
    const rubToUsd = 1 / 90;
    
    return {
      inputCost: (inputTokens / 1000) * price.input * rubToUsd,
      outputCost: (outputTokens / 1000) * price.output * rubToUsd,
      totalCost: ((inputTokens + outputTokens) / 1000) * price.output * rubToUsd,
      currency: 'RUB',
      inputCostRub: (inputTokens / 1000) * price.input,
      outputCostRub: (outputTokens / 1000) * price.output,
      totalCostRub: ((inputTokens + outputTokens) / 1000) * price.output
    };
  }

  /**
   * Получить список доступных моделей
   */
  getAvailableModels() {
    return Object.keys(YANDEX_MODELS);
  }

  /**
   * Тест подключения
   */
  async testConnection() {
    if (!this.isAvailable()) {
      return { 
        success: false, 
        error: 'YandexGPT not configured. Set VITE_YANDEX_API_KEY, VITE_YANDEX_FOLDER_ID, and VITE_YANDEX_ENABLED=true' 
      };
    }

    try {
      const response = await this.complete(
        'You are a helpful assistant.',
        'Say "OK" if you can hear me.',
        { model: 'yandexgpt-lite', maxTokens: 10 }
      );

      if (response.content) {
        return { 
          success: true, 
          model: response.model,
          response: response.content.substring(0, 50)
        };
      } else {
        return { success: false, error: 'Empty response' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const yandexProvider = new YandexGPTProvider();
export default yandexProvider;

