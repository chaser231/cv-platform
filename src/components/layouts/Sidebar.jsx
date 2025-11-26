/**
 * Sidebar Component
 * Боковая панель навигации приложения
 */

import React from 'react';
import { User, Briefcase, Settings, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeTab, setActiveTab, aiTokensUsed }) => {
  const { t, i18n } = useTranslation();
  
  const menuItems = [
    { id: 'master', label: t('sidebar.masterProfile'), icon: User },
    { id: 'jobs', label: t('sidebar.myApplications'), icon: Briefcase },
    { id: 'settings', label: t('sidebar.settings'), icon: Settings },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
          <span className="text-white font-bold text-lg tracking-tight">CV Platform</span>
        </div>
        
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
        >
          <Globe size={16} />
          <span className="font-medium">{i18n.language.toUpperCase()}</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-400">{i18n.language === 'ru' ? 'EN' : 'RU'}</span>
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
            <div>
              <div className="text-white text-sm font-medium">{t('sidebar.proPlan')}</div>
              <div className="text-xs text-slate-400">Free Plan</div>
            </div>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-blue-500"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>{t('sidebar.tokensUsed')}</span>
            <span>{aiTokensUsed} / 1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

