/**
 * AIChatWidget Component
 * Плавающий чат-виджет с AI ассистентом
 * 
 * v2 - с историей контекста, retry и улучшенной обработкой ошибок
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles, Send, X, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../services/ai/aiService';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const AIChatWidget = ({ profileContext = null, jobContext = null }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai.chatWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Retry логика
  const sendWithRetry = async (message, retries = MAX_RETRIES) => {
    try {
      // Передаём полный контекст включая историю
      const response = await aiService.chat(
        message, 
        { 
          profile: profileContext, 
          job: jobContext,
          history: messages.slice(-10) // Последние 10 сообщений для контекста
        }, 
        i18n.language
      );
      return response;
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return sendWithRetry(message, retries - 1);
      }
      throw err;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await sendWithRetry(input);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to get response');
      
      // Добавляем сообщение об ошибке в чат
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: i18n.language === 'ru' 
          ? '😔 Извините, произошла ошибка. Попробуйте ещё раз или перефразируйте вопрос.'
          : '😔 Sorry, an error occurred. Please try again or rephrase your question.',
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Повторная отправка последнего сообщения
  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      // Удаляем сообщение об ошибке
      setMessages(prev => prev.filter(m => !m.isError));
      setInput(lastUserMessage.content);
    }
  };

  // Очистка чата
  const handleClear = () => {
    setMessages([{ role: 'assistant', content: t('ai.chatWelcome') }]);
    setError(null);
  };

  const examples = [
    t('ai.example1'),
    t('ai.example2'),
    t('ai.example3')
  ];

  // Форматирование сообщения с поддержкой markdown-like
  const formatMessage = (content) => {
    // Простое форматирование для списков
    return content.split('\n').map((line, i) => {
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={i} className="ml-4">{line.substring(2)}</li>;
      }
      if (line.match(/^\d+\.\s/)) {
        return <li key={i} className="ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      return <p key={i} className={line ? '' : 'h-2'}>{line}</p>;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 group"
        aria-label="Open AI Chat"
      >
        <MessageCircle size={24} />
        {/* Пульсирующий индикатор */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} />
          <div>
            <h3 className="font-bold">{t('ai.chat')}</h3>
            <p className="text-xs text-purple-200">
              {i18n.language === 'ru' ? 'Карьерный коуч' : 'Career Coach'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleClear}
            className="hover:bg-white/20 p-1.5 rounded text-xs"
            title={i18n.language === 'ru' ? 'Очистить чат' : 'Clear chat'}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => setIsOpen(false)} 
            className="hover:bg-white/20 p-1.5 rounded"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : msg.isError 
                  ? 'bg-red-50 text-red-800 rounded-bl-none border border-red-200'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              <div className="space-y-1">
                {typeof msg.content === 'string' ? formatMessage(msg.content) : msg.content}
              </div>
              {msg.isError && (
                <button 
                  onClick={handleRetry}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 flex items-center"
                >
                  <RefreshCw size={12} className="mr-1" />
                  {i18n.language === 'ru' ? 'Попробовать снова' : 'Try again'}
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 p-3 rounded-lg text-sm rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
                <span className="text-slate-500 text-xs">{t('ai.thinking')}</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Example Questions - показываем только если мало сообщений */}
      {messages.length <= 2 && !isTyping && (
        <div className="px-4 pb-2 border-t border-slate-100 pt-2">
          <p className="text-xs font-semibold text-slate-500 mb-2">{t('ai.exampleQuestions')}:</p>
          <div className="space-y-1">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setInput(ex)}
                className="w-full text-left text-xs p-2 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 rounded text-slate-600 transition-colors truncate"
              >
                💬 {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Context indicator */}
      {profileContext && (
        <div className="px-4 py-1 bg-purple-50 text-xs text-purple-600 flex items-center">
          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
          {i18n.language === 'ru' 
            ? `Контекст: ${profileContext.personalInfo?.title || 'Ваш профиль'}`
            : `Context: ${profileContext.personalInfo?.title || 'Your profile'}`
          }
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={t('ai.chatPlaceholder')}
            disabled={isTyping}
            className="flex-1 p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 text-center">
          {i18n.language === 'ru' 
            ? 'AI может ошибаться. Проверяйте важную информацию.'
            : 'AI can make mistakes. Verify important information.'
          }
        </p>
      </div>
    </div>
  );
};

export default AIChatWidget;
