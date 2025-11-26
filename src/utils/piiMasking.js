/**
 * PII Masking Utility
 * Защищает личные данные перед отправкой в LLM
 */

// Регулярные выражения для обнаружения PII
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}\b/g,
  // Российские номера: +7 (999) 123-45-67, 8-999-123-45-67, и т.д.
  phoneRu: /(\+?7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}\b/g,
  // Адреса (упрощенно)
  address: /\d+\s+[A-Za-zА-Яа-я\s]+,\s*[A-Za-zА-Яа-я\s]+,\s*\d{5,6}\b/g
};

// Токены для замены
const PII_TOKENS = {
  email: '[PII_EMAIL]',
  phone: '[PII_PHONE]',
  address: '[PII_ADDRESS]'
};

/**
 * Маскирует PII в тексте
 * @param {string} text - Исходный текст
 * @returns {{ masked: string, mapping: Object }} - Замаскированный текст и карта замен
 */
export function maskPII(text) {
  if (!text) return { masked: '', mapping: {} };
  
  let masked = text;
  const mapping = {};
  
  // Маскируем email
  const emails = text.match(PII_PATTERNS.email) || [];
  emails.forEach((email, index) => {
    const token = `${PII_TOKENS.email}_${index}`;
    mapping[token] = email;
    masked = masked.replace(email, token);
  });
  
  // Маскируем телефоны (сначала российские, потом общие)
  const phonesRu = text.match(PII_PATTERNS.phoneRu) || [];
  phonesRu.forEach((phone, index) => {
    const token = `${PII_TOKENS.phone}_${index}`;
    mapping[token] = phone;
    masked = masked.replace(phone, token);
  });
  
  const phones = masked.match(PII_PATTERNS.phone) || [];
  phones.forEach((phone, index) => {
    const token = `${PII_TOKENS.phone}_${phonesRu.length + index}`;
    mapping[token] = phone;
    masked = masked.replace(phone, token);
  });
  
  // Маскируем адреса
  const addresses = text.match(PII_PATTERNS.address) || [];
  addresses.forEach((address, index) => {
    const token = `${PII_TOKENS.address}_${index}`;
    mapping[token] = address;
    masked = masked.replace(address, token);
  });
  
  return { masked, mapping };
}

/**
 * Восстанавливает PII из замаскированного текста
 * @param {string} masked - Замаскированный текст
 * @param {Object} mapping - Карта замен из maskPII
 * @returns {string} - Восстановленный текст
 */
export function unmaskPII(masked, mapping) {
  if (!masked || !mapping) return masked;
  
  let unmasked = masked;
  
  // Восстанавливаем все токены
  Object.entries(mapping).forEach(([token, original]) => {
    unmasked = unmasked.replace(new RegExp(token, 'g'), original);
  });
  
  return unmasked;
}

/**
 * Проверяет, содержит ли текст PII
 * @param {string} text - Текст для проверки
 * @returns {boolean}
 */
export function containsPII(text) {
  if (!text) return false;
  
  return (
    PII_PATTERNS.email.test(text) ||
    PII_PATTERNS.phoneRu.test(text) ||
    PII_PATTERNS.phone.test(text) ||
    PII_PATTERNS.address.test(text)
  );
}

/**
 * Пример использования:
 * 
 * // Перед отправкой в AI
 * const { masked, mapping } = maskPII(userText);
 * const aiResponse = await callAI(masked);
 * 
 * // После получения ответа
 * const finalText = unmaskPII(aiResponse, mapping);
 */





