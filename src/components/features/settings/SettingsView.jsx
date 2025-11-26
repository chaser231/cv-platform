/**
 * SettingsView Component
 * Страница настроек пользователя
 */

import React, { useState } from 'react';
import { User, Settings, Sparkles, Wand2, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SettingsView = ({ aiTokensUsed, onResetData }) => {
  const { t, i18n } = useTranslation();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      onResetData();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('settings.accountSettings')}</h1>
        <p className="text-slate-500 mb-8">{t('settings.account')}</p>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-600" />
            {t('settings.profile')}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('settings.email')}</label>
              <input 
                type="email"
                disabled
                value="user@example.com"
                className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-slate-500"
              />
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {t('settings.changePassword')}
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Sparkles size={20} className="mr-2 text-purple-600" />
            {t('settings.subscription')}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">{t('settings.currentPlan')}</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{t('settings.freePlan')}</div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
              {t('settings.upgradeToPro')}
            </button>
          </div>
        </div>

        {/* AI Usage Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Wand2 size={20} className="mr-2 text-blue-600" />
            {t('settings.aiUsage')}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">{t('settings.requestsToday')}</span>
              <span className="text-2xl font-bold text-blue-600">{aiTokensUsed} / 3</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all" 
                style={{ width: `${Math.min((aiTokensUsed / 3) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500">
              {aiTokensUsed >= 3 
                ? (i18n.language === 'ru' ? '⚠️ Лимит исчерпан. Обновится завтра.' : '⚠️ Limit reached. Resets tomorrow.')
                : (i18n.language === 'ru' ? `Осталось ${3 - aiTokensUsed} запросов` : `${3 - aiTokensUsed} requests remaining`)
              }
            </p>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Globe size={20} className="mr-2 text-green-600" />
            {t('settings.language')}
          </h2>
          <select 
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
            <Settings size={20} className="mr-2" />
            {t('settings.resetData')}
          </h2>
          <p className="text-sm text-slate-600 mb-4">{t('settings.resetDataWarning')}</p>
          <button 
            onClick={handleReset}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              showResetConfirm 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'border border-red-300 text-red-600 hover:bg-red-50'
            }`}
          >
            {showResetConfirm 
              ? (i18n.language === 'ru' ? 'Подтвердить удаление' : 'Confirm deletion')
              : t('settings.resetData')
            }
          </button>
          {showResetConfirm && (
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="ml-3 px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              {t('common.cancel')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

