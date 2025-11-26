/**
 * AIChatWidget Component
 * Плавающий чат-виджет с AI ассистентом
 */

import React, { useState } from 'react';
import { MessageCircle, Sparkles, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import aiService from '../../services/ai/aiService';

const AIChatWidget = ({ profileContext = null }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai.chatWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Используем реальный AI сервис
      const response = await aiService.chat(input, { profile: profileContext }, i18n.language);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback на мок
      const aiResponse = {
        role: 'assistant',
        content: i18n.language === 'ru' 
          ? `Отличный вопрос! Для описания опыта используйте формулу XYZ: "Достиг [X] по метрике [Y], делая [Z]". Например: "Ускорил загрузку приложения на 40% (с 3с до 1.8с), оптимизировав рендеринг React компонентов."`
          : `Great question! Use the XYZ formula for experience: "Achieved [X] as measured by [Y], by doing [Z]". Example: "Improved app load time by 40% (from 3s to 1.8s) by optimizing React component rendering."`
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const examples = [
    t('ai.example1'),
    t('ai.example2'),
    t('ai.example3')
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
        aria-label="Open AI Chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} />
          <h3 className="font-bold">{t('ai.chat')}</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="hover:bg-white/20 p-1 rounded"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 p-3 rounded-lg text-sm">
              <span className="animate-pulse">{t('ai.thinking')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Example Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs font-semibold text-slate-500 mb-2">{t('ai.exampleQuestions')}:</p>
          <div className="space-y-1">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setInput(ex)}
                className="w-full text-left text-xs p-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-700 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('ai.chatPlaceholder')}
            className="flex-1 p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatWidget;

