/**
 * fal.ai Provider
 * Primary AI provider - самый экономичный вариант
 * 
 * Документация: https://fal.ai/docs
 */

const FAL_API_URL = 'https://fal.run';

// Маппинг моделей fal.ai
const FAL_MODELS = {
  // Быстрые и дешёвые (для простых задач)
  'llama-3b': 'fal-ai/llavav15-13b', // Для парсинга
  
  // Средние (баланс цена/качество)
  'llama-8b': 'fal-ai/any-llm', // Универсальная модель
  
  // Качественные (для сложных задач)
  'claude-haiku': 'fal-ai/any-llm', // Claude через any-llm
  'claude-sonnet': 'fal-ai/any-llm', // Claude Sonnet
  
  // Default
  'default': 'fal-ai/any-llm'
};

// Конфигурация моделей для any-llm
const MODEL_CONFIGS = {
  'llama-3b': {
    model: 'meta-llama/llama-3.2-3b-instruct',
    max_tokens: 1024
  },
  'llama-8b': {
    model: 'meta-llama/llama-3.1-8b-instruct',
    max_tokens: 2048
  },
  'claude-haiku': {
    model: 'anthropic/claude-3-haiku-20240307',
    max_tokens: 2048
  },
  'claude-sonnet': {
    model: 'anthropic/claude-3-5-sonnet-20241022',
    max_tokens: 4096
  }
};

/**
 * Класс для работы с fal.ai API
 */
class FalProvider {
  constructor() {
    this.apiKey = import.meta.env.VITE_FAL_API_KEY;
    this.enabled = import.meta.env.VITE_FAL_ENABLED === 'true';
    this.baseUrl = FAL_API_URL;
  }

  /**
   * Проверка доступности провайдера
   */
  isAvailable() {
    return this.enabled && !!this.apiKey;
  }

  /**
   * Основной метод для вызова AI
   * @param {string} systemPrompt - Системный промпт
   * @param {string} userInput - Пользовательский ввод
   * @param {Object} options - Дополнительные опции
   */
  async complete(systemPrompt, userInput, options = {}) {
    const {
      model = 'llama-8b',
      temperature = 0.7,
      maxTokens = 1024,
      timeout = 30000
    } = options;

    if (!this.isAvailable()) {
      throw new Error('fal.ai provider is not configured');
    }

    const modelConfig = MODEL_CONFIGS[model] || MODEL_CONFIGS['llama-8b'];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseUrl}/fal-ai/any-llm`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: modelConfig.model,
          prompt: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`,
          max_tokens: maxTokens || modelConfig.max_tokens,
          temperature,
          system_prompt: systemPrompt
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`fal.ai API error: ${response.status} - ${error.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      return {
        content: data.output || data.text || data.response || '',
        model: modelConfig.model,
        provider: 'fal',
        usage: {
          inputTokens: data.usage?.input_tokens || this._estimateTokens(systemPrompt + userInput),
          outputTokens: data.usage?.output_tokens || this._estimateTokens(data.output || ''),
          totalTokens: data.usage?.total_tokens || 0
        }
      };

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('fal.ai request timeout');
      }
      throw error;
    }
  }

  /**
   * Streaming completion (для чата)
   */
  async *stream(systemPrompt, userInput, options = {}) {
    const {
      model = 'llama-8b',
      temperature = 0.7,
      maxTokens = 1024
    } = options;

    if (!this.isAvailable()) {
      throw new Error('fal.ai provider is not configured');
    }

    const modelConfig = MODEL_CONFIGS[model] || MODEL_CONFIGS['llama-8b'];

    const response = await fetch(`${this.baseUrl}/fal-ai/any-llm`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelConfig.model,
        prompt: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`,
        max_tokens: maxTokens || modelConfig.max_tokens,
        temperature,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`fal.ai streaming error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        yield chunk;
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Примерный подсчёт токенов (4 символа ≈ 1 токен)
   */
  _estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Расчёт стоимости запроса
   */
  calculateCost(inputTokens, outputTokens, model = 'llama-8b') {
    // Цены fal.ai (примерные, на основе их документации)
    const pricing = {
      'llama-3b': { input: 0.00005, output: 0.00010 }, // per 1K tokens
      'llama-8b': { input: 0.00010, output: 0.00020 },
      'claude-haiku': { input: 0.00025, output: 0.00125 },
      'claude-sonnet': { input: 0.00300, output: 0.01500 }
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
export const falProvider = new FalProvider();
export default falProvider;

