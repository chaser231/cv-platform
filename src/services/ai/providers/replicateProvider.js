/**
 * Replicate Provider
 * PRIMARY AI provider для CV Platform
 * 
 * Документация: https://replicate.com/docs
 * 
 * Доступные модели (проверено):
 * - anthropic/claude-3.5-haiku (быстрый, дешёвый)
 * - anthropic/claude-3.5-sonnet (качественный)
 * - anthropic/claude-3.7-sonnet (новейший)
 * - openai/gpt-4o-mini (OpenAI через Replicate)
 * - meta/llama-2-70b-chat (Llama 2)
 */

// В development используем proxy через Vite
const isDev = import.meta.env.DEV;
const REPLICATE_API_URL = isDev 
  ? '/api/replicate/v1'
  : 'https://api.replicate.com/v1';

/**
 * Доступные модели на Replicate
 */
const REPLICATE_MODELS = {
  // Claude 3.5 Haiku - быстрый и дешёвый, отлично для простых задач
  'claude-haiku': {
    path: 'anthropic/claude-3.5-haiku',
    maxTokens: 4096
  },
  
  // Claude 3.5 Sonnet - баланс качества и скорости
  'claude-sonnet': {
    path: 'anthropic/claude-3.5-sonnet',
    maxTokens: 4096
  },
  
  // Claude 3.7 Sonnet - новейший, лучшее качество
  'claude-3.7': {
    path: 'anthropic/claude-3.7-sonnet',
    maxTokens: 8192
  },
  
  // GPT-4o Mini через Replicate
  'gpt-4o-mini': {
    path: 'openai/gpt-4o-mini',
    maxTokens: 4096
  },
  
  // Llama 2 70B - open source альтернатива
  'llama-70b': {
    path: 'meta/llama-2-70b-chat',
    maxTokens: 4096
  }
};

// Default модель - Claude Haiku (быстрый и дешёвый)
const DEFAULT_MODEL = 'claude-haiku';

/**
 * Класс для работы с Replicate API
 */
class ReplicateProvider {
  constructor() {
    this.apiKey = import.meta.env.VITE_REPLICATE_API_KEY;
    this.enabled = import.meta.env.VITE_REPLICATE_ENABLED !== 'false';
    this.baseUrl = REPLICATE_API_URL;
    this.debug = import.meta.env.VITE_DEBUG === 'true';
  }

  isAvailable() {
    return this.enabled && !!this.apiKey;
  }

  _log(...args) {
    if (this.debug) {
      console.log('[Replicate]', ...args);
    }
  }

  /**
   * Основной метод для вызова AI
   */
  async complete(systemPrompt, userInput, options = {}) {
    const {
      model = DEFAULT_MODEL,
      temperature = 0.7,
      maxTokens = 1024,
      timeout = 120000
    } = options;

    if (!this.isAvailable()) {
      throw new Error('Replicate provider is not configured');
    }

    const modelConfig = REPLICATE_MODELS[model] || REPLICATE_MODELS[DEFAULT_MODEL];
    
    this._log('Using model:', modelConfig.path);

    try {
      // Формируем input - разный формат для разных моделей
      const input = this._buildInput(modelConfig.path, systemPrompt, userInput, {
        maxTokens: Math.min(maxTokens, modelConfig.maxTokens),
        temperature
      });

      this._log('Input:', JSON.stringify(input, null, 2));

      // Запускаем модель
      const prediction = await this._runModel(modelConfig.path, input, timeout);

      this._log('Prediction completed:', prediction.id);

      // Извлекаем output
      const output = this._extractOutput(prediction.output);

      return {
        content: output,
        model: modelConfig.path,
        provider: 'replicate',
        predictionId: prediction.id,
        usage: {
          inputTokens: prediction.metrics?.input_token_count || this._estimateTokens(systemPrompt + userInput),
          outputTokens: prediction.metrics?.output_token_count || this._estimateTokens(output),
          totalTokens: 0
        }
      };

    } catch (error) {
      console.error('Replicate API error:', error);
      throw error;
    }
  }

  /**
   * Формирование input в зависимости от модели
   */
  _buildInput(modelPath, systemPrompt, userInput, options) {
    const { maxTokens, temperature } = options;

    // Claude модели
    if (modelPath.startsWith('anthropic/')) {
      return {
        prompt: userInput,
        system_prompt: systemPrompt,
        max_tokens: maxTokens,
        temperature: temperature
      };
    }

    // OpenAI модели
    if (modelPath.startsWith('openai/')) {
      return {
        prompt: userInput,
        system_prompt: systemPrompt,
        max_tokens: maxTokens,
        temperature: temperature
      };
    }

    // Llama модели
    if (modelPath.startsWith('meta/')) {
      return {
        prompt: `[INST] <<SYS>>\n${systemPrompt}\n<</SYS>>\n\n${userInput} [/INST]`,
        max_new_tokens: maxTokens,
        temperature: temperature,
        top_p: 0.9
      };
    }

    // Default format
    return {
      prompt: `${systemPrompt}\n\nUser: ${userInput}\n\nAssistant:`,
      max_tokens: maxTokens,
      temperature: temperature
    };
  }

  /**
   * Запуск модели через Official Model API
   */
  async _runModel(modelPath, input, timeout = 120000) {
    // Сначала получаем версию модели
    const modelInfoUrl = `${this.baseUrl}/models/${modelPath}`;
    
    this._log('Getting model info:', modelInfoUrl);

    const modelResponse = await fetch(modelInfoUrl, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!modelResponse.ok) {
      const error = await modelResponse.json().catch(() => ({}));
      throw new Error(`Model not found: ${modelPath}. ${error.detail || ''}`);
    }

    const modelInfo = await modelResponse.json();
    const version = modelInfo.latest_version?.id;

    if (!version) {
      throw new Error(`No version found for model: ${modelPath}`);
    }

    this._log('Using version:', version.substring(0, 20) + '...');

    // Создаём prediction
    const predictionUrl = `${this.baseUrl}/predictions`;
    
    const response = await fetch(predictionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=60' // Ждём до 60 секунд
      },
      body: JSON.stringify({
        version: version,
        input: input
      })
    });

    const data = await response.json();

    if (!response.ok) {
      this._log('API Error:', response.status, data);
      throw new Error(`Replicate API error: ${data.detail || data.error || JSON.stringify(data)}`);
    }

    this._log('Prediction status:', data.status);

    // Если prediction ещё не завершён, ждём
    if (data.status === 'starting' || data.status === 'processing') {
      return await this._waitForPrediction(data.id, timeout);
    }

    if (data.status === 'failed') {
      throw new Error(`Prediction failed: ${data.error}`);
    }

    return data;
  }

  /**
   * Ожидание завершения prediction
   */
  async _waitForPrediction(predictionId, timeout = 120000) {
    const startTime = Date.now();
    const pollInterval = 1000;
    
    this._log('Waiting for prediction:', predictionId);

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
      this._log('Status:', prediction.status);

      if (prediction.status === 'succeeded') {
        return prediction;
      }

      if (prediction.status === 'failed') {
        throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
      }

      if (prediction.status === 'canceled') {
        throw new Error('Prediction was canceled');
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Prediction timeout after ${timeout}ms`);
  }

  /**
   * Извлечение текста из output
   */
  _extractOutput(output) {
    if (!output) return '';
    
    // Массив токенов (Claude, некоторые модели)
    if (Array.isArray(output)) {
      return output.join('');
    }
    
    // Строка
    if (typeof output === 'string') {
      return output;
    }
    
    // Объект с полем text/response/content
    if (typeof output === 'object') {
      return output.text || output.response || output.content || output.generation || JSON.stringify(output);
    }
    
    return String(output);
  }

  _estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Расчёт стоимости
   * Цены: https://replicate.com/pricing
   */
  calculateCost(inputTokens, outputTokens, model = DEFAULT_MODEL) {
    // Примерные цены за 1M tokens
    const pricing = {
      'claude-haiku': { input: 0.25, output: 1.25 },
      'claude-sonnet': { input: 3.00, output: 15.00 },
      'claude-3.7': { input: 3.00, output: 15.00 },
      'gpt-4o-mini': { input: 0.15, output: 0.60 },
      'llama-70b': { input: 0.65, output: 2.75 }
    };

    const price = pricing[model] || pricing[DEFAULT_MODEL];
    
    return {
      inputCost: (inputTokens / 1000000) * price.input,
      outputCost: (outputTokens / 1000000) * price.output,
      totalCost: (inputTokens / 1000000) * price.input + (outputTokens / 1000000) * price.output
    };
  }

  getAvailableModels() {
    return Object.keys(REPLICATE_MODELS);
  }

  async testConnection() {
    if (!this.isAvailable()) {
      return { success: false, error: 'API key not configured' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/models/anthropic/claude-3.5-haiku`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { 
          success: true, 
          model: `${data.owner}/${data.name}`,
          version: data.latest_version?.id?.substring(0, 12)
        };
      } else {
        const error = await response.json().catch(() => ({}));
        return { success: false, error: error.detail || `HTTP ${response.status}` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const replicateProvider = new ReplicateProvider();
export default replicateProvider;
