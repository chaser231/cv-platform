/**
 * TailoredResumesList Component
 * Список адаптированных резюме с действиями
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  Calendar, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  Copy,
  CheckCircle2,
  Clock,
  Send,
  Archive,
  Filter,
  Plus
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '../../../store/useProfileStore';

// Статусы резюме
const RESUME_STATUSES = {
  draft: { labelRu: 'Черновик', labelEn: 'Draft', color: 'slate', icon: Edit2 },
  ready: { labelRu: 'Готово', labelEn: 'Ready', color: 'blue', icon: CheckCircle2 },
  sent: { labelRu: 'Отправлено', labelEn: 'Sent', color: 'purple', icon: Send },
  interview: { labelRu: 'Интервью', labelEn: 'Interview', color: 'amber', icon: Calendar },
  offer: { labelRu: 'Оффер', labelEn: 'Offer', color: 'green', icon: CheckCircle2 },
  rejected: { labelRu: 'Отказ', labelEn: 'Rejected', color: 'red', icon: Archive },
  archived: { labelRu: 'Архив', labelEn: 'Archived', color: 'gray', icon: Archive }
};

const TailoredResumesList = ({ onCreateNew, onView, onEdit }) => {
  const { t, i18n } = useTranslation();
  const { tailoredResumes, deleteTailoredResume, updateTailoredResume } = useProfileStore();
  const [filter, setFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);

  // Фильтрация резюме
  const filteredResumes = filter === 'all' 
    ? tailoredResumes 
    : tailoredResumes.filter(r => r.status === filter);

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return i18n.language === 'ru' ? 'Сегодня' : 'Today';
    if (days === 1) return i18n.language === 'ru' ? 'Вчера' : 'Yesterday';
    if (days < 7) return i18n.language === 'ru' ? `${days} дн. назад` : `${days} days ago`;
    
    return date.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Удаление резюме
  const handleDelete = (id) => {
    const confirmMsg = i18n.language === 'ru' 
      ? 'Удалить это резюме?' 
      : 'Delete this resume?';
    if (confirm(confirmMsg)) {
      deleteTailoredResume(id);
    }
    setOpenMenuId(null);
  };

  // Изменение статуса
  const handleStatusChange = (id, newStatus) => {
    updateTailoredResume(id, { status: newStatus });
    setOpenMenuId(null);
  };

  // Копирование summary
  const handleCopySummary = async (summary) => {
    try {
      await navigator.clipboard.writeText(summary);
      // Можно добавить toast notification
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    setOpenMenuId(null);
  };

  // Получить цвет статуса
  const getStatusStyle = (status) => {
    const statusInfo = RESUME_STATUSES[status] || RESUME_STATUSES.draft;
    const colorMap = {
      slate: 'bg-slate-100 text-slate-700 border-slate-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      amber: 'bg-amber-100 text-amber-700 border-amber-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      gray: 'bg-gray-100 text-gray-500 border-gray-200'
    };
    return colorMap[statusInfo.color] || colorMap.slate;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {i18n.language === 'ru' ? 'Мои отклики' : 'My Applications'}
          </h2>
          <p className="text-sm text-slate-500">
            {i18n.language === 'ru' 
              ? `${tailoredResumes.length} резюме` 
              : `${tailoredResumes.length} resumes`
            }
          </p>
        </div>
        
        <button
          onClick={onCreateNew}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
        >
          <Plus size={18} className="mr-2" />
          {i18n.language === 'ru' ? 'Новый отклик' : 'New Application'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all' 
              ? 'bg-slate-800 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {i18n.language === 'ru' ? 'Все' : 'All'} ({tailoredResumes.length})
        </button>
        {Object.entries(RESUME_STATUSES).slice(0, 5).map(([key, value]) => {
          const count = tailoredResumes.filter(r => r.status === key).length;
          if (count === 0 && key !== 'draft') return null;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === key 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {i18n.language === 'ru' ? value.labelRu : value.labelEn} ({count})
            </button>
          );
        })}
      </div>

      {/* Resume List */}
      {filteredResumes.length > 0 ? (
        <div className="space-y-3">
          {filteredResumes.map((resume) => {
            const statusInfo = RESUME_STATUSES[resume.status] || RESUME_STATUSES.draft;
            const StatusIcon = statusInfo.icon;
            
            return (
              <div 
                key={resume.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                        <Briefcase size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 truncate">
                          {resume.jobTitle || (i18n.language === 'ru' ? 'Позиция' : 'Position')}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {resume.company || (i18n.language === 'ru' ? 'Компания' : 'Company')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Summary Preview */}
                    {resume.tailoredSummary && (
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3 pl-13">
                        {resume.tailoredSummary}
                      </p>
                    )}
                    
                    {/* Meta */}
                    <div className="flex items-center space-x-4 text-xs text-slate-400 pl-13">
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(resume.createdAt)}
                      </span>
                      {resume.coverLetter && (
                        <span className="flex items-center text-purple-500">
                          <FileText size={12} className="mr-1" />
                          Cover Letter
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Right: Status & Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusStyle(resume.status)}`}>
                      <StatusIcon size={12} className="mr-1" />
                      {i18n.language === 'ru' ? statusInfo.labelRu : statusInfo.labelEn}
                    </span>
                    
                    {/* Actions Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === resume.id ? null : resume.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical size={16} className="text-slate-400" />
                      </button>
                      
                      {openMenuId === resume.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                            <button
                              onClick={() => { onView?.(resume); setOpenMenuId(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                            >
                              <Eye size={14} className="mr-2" />
                              {i18n.language === 'ru' ? 'Просмотр' : 'View'}
                            </button>
                            <button
                              onClick={() => { onEdit?.(resume); setOpenMenuId(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                            >
                              <Edit2 size={14} className="mr-2" />
                              {i18n.language === 'ru' ? 'Редактировать' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleCopySummary(resume.tailoredSummary)}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                            >
                              <Copy size={14} className="mr-2" />
                              {i18n.language === 'ru' ? 'Копировать Summary' : 'Copy Summary'}
                            </button>
                            
                            <div className="border-t border-slate-100 my-1" />
                            
                            {/* Status Changes */}
                            <div className="px-4 py-1 text-xs text-slate-400 uppercase">
                              {i18n.language === 'ru' ? 'Статус' : 'Status'}
                            </div>
                            {Object.entries(RESUME_STATUSES).slice(0, 5).map(([key, value]) => (
                              <button
                                key={key}
                                onClick={() => handleStatusChange(resume.id, key)}
                                className={`w-full px-4 py-1.5 text-left text-sm hover:bg-slate-50 flex items-center ${
                                  resume.status === key ? 'text-purple-600 font-medium' : 'text-slate-600'
                                }`}
                              >
                                {resume.status === key && <CheckCircle2 size={12} className="mr-2" />}
                                <span className={resume.status === key ? '' : 'ml-5'}>
                                  {i18n.language === 'ru' ? value.labelRu : value.labelEn}
                                </span>
                              </button>
                            ))}
                            
                            <div className="border-t border-slate-100 my-1" />
                            
                            <button
                              onClick={() => handleDelete(resume.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                            >
                              <Trash2 size={14} className="mr-2" />
                              {i18n.language === 'ru' ? 'Удалить' : 'Delete'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {filter === 'all'
              ? (i18n.language === 'ru' ? 'Нет сохранённых откликов' : 'No saved applications')
              : (i18n.language === 'ru' ? 'Нет откликов с таким статусом' : 'No applications with this status')
            }
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            {i18n.language === 'ru' 
              ? 'Адаптируйте резюме под вакансию и сохраните для отслеживания прогресса' 
              : 'Tailor your resume for a job and save it to track your progress'
            }
          </p>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus size={20} className="mr-2" />
            {i18n.language === 'ru' ? 'Создать первый отклик' : 'Create first application'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TailoredResumesList;
