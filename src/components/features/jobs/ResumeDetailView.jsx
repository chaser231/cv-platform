/**
 * ResumeDetailView Component
 * Просмотр и редактирование сохранённого адаптированного резюме
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Briefcase, 
  Calendar, 
  FileText, 
  Copy, 
  Edit2, 
  CheckCircle2,
  Save,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '../../../store/useProfileStore';

const ResumeDetailView = ({ resume, mode, onBack, onEdit, masterProfile }) => {
  const { i18n } = useTranslation();
  const { updateTailoredResume } = useProfileStore();
  
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [editedSummary, setEditedSummary] = useState(resume?.tailoredSummary || '');
  const [editedCoverLetter, setEditedCoverLetter] = useState(resume?.coverLetter || '');
  const [editedJobTitle, setEditedJobTitle] = useState(resume?.jobTitle || '');
  const [editedCompany, setEditedCompany] = useState(resume?.company || '');
  const [copied, setCopied] = useState(null);
  const [saved, setSaved] = useState(false);

  if (!resume) {
    return (
      <div className="flex-1 bg-slate-50 p-8 flex items-center justify-center">
        <p className="text-slate-500">
          {i18n.language === 'ru' ? 'Резюме не найдено' : 'Resume not found'}
        </p>
      </div>
    );
  }

  // Копирование в буфер
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Сохранение изменений
  const handleSave = () => {
    updateTailoredResume(resume.id, {
      tailoredSummary: editedSummary,
      coverLetter: editedCoverLetter,
      jobTitle: editedJobTitle,
      company: editedCompany
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setIsEditing(false);
  };

  // Отмена редактирования
  const handleCancel = () => {
    setEditedSummary(resume.tailoredSummary || '');
    setEditedCoverLetter(resume.coverLetter || '');
    setEditedJobTitle(resume.jobTitle || '');
    setEditedCompany(resume.company || '');
    setIsEditing(false);
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === 'ru' ? 'ru-RU' : 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronRight className="rotate-180 mr-1" size={20} />
          {i18n.language === 'ru' ? 'К списку откликов' : 'Back to applications'}
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                <Briefcase size={28} />
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={editedJobTitle}
                      onChange={(e) => setEditedJobTitle(e.target.value)}
                      className="text-xl font-bold text-slate-800 border border-slate-300 rounded px-2 py-1 w-full"
                      placeholder={i18n.language === 'ru' ? 'Должность' : 'Position'}
                    />
                    <input
                      value={editedCompany}
                      onChange={(e) => setEditedCompany(e.target.value)}
                      className="text-slate-500 border border-slate-300 rounded px-2 py-1 w-full"
                      placeholder={i18n.language === 'ru' ? 'Компания' : 'Company'}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-slate-800">
                      {resume.jobTitle || (i18n.language === 'ru' ? 'Позиция' : 'Position')}
                    </h1>
                    <p className="text-slate-500">
                      {resume.company || (i18n.language === 'ru' ? 'Компания' : 'Company')}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center text-sm"
                  >
                    <X size={16} className="mr-1" />
                    {i18n.language === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Save size={16} className="mr-1" />
                    {i18n.language === 'ru' ? 'Сохранить' : 'Save'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center text-sm"
                >
                  <Edit2 size={16} className="mr-1" />
                  {i18n.language === 'ru' ? 'Редактировать' : 'Edit'}
                </button>
              )}
            </div>
          </div>
          
          {/* Meta */}
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {i18n.language === 'ru' ? 'Создано: ' : 'Created: '} 
              {formatDate(resume.createdAt)}
            </span>
            {saved && (
              <span className="flex items-center text-green-600">
                <CheckCircle2 size={14} className="mr-1" />
                {i18n.language === 'ru' ? 'Сохранено!' : 'Saved!'}
              </span>
            )}
          </div>
        </div>

        {/* Tailored Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 flex items-center">
              <FileText size={18} className="mr-2 text-purple-600" />
              {i18n.language === 'ru' ? 'Адаптированное Summary' : 'Tailored Summary'}
            </h2>
            {!isEditing && (
              <button
                onClick={() => handleCopy(resume.tailoredSummary, 'summary')}
                className="text-sm text-slate-500 hover:text-slate-700 flex items-center"
              >
                {copied === 'summary' ? (
                  <>
                    <CheckCircle2 size={14} className="mr-1 text-green-600" />
                    {i18n.language === 'ru' ? 'Скопировано!' : 'Copied!'}
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" />
                    {i18n.language === 'ru' ? 'Копировать' : 'Copy'}
                  </>
                )}
              </button>
            )}
          </div>
          
          {isEditing ? (
            <textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="w-full p-4 border border-slate-300 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-purple-500 outline-none"
              rows={5}
            />
          ) : (
            <div className="p-4 bg-purple-50 rounded-lg text-sm text-slate-700 leading-relaxed border border-purple-100">
              {resume.tailoredSummary || (i18n.language === 'ru' ? 'Нет summary' : 'No summary')}
            </div>
          )}
        </div>

        {/* Cover Letter */}
        {(resume.coverLetter || isEditing) && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center">
                <FileText size={18} className="mr-2 text-blue-600" />
                Cover Letter
              </h2>
              {!isEditing && resume.coverLetter && (
                <button
                  onClick={() => handleCopy(resume.coverLetter, 'cover')}
                  className="text-sm text-slate-500 hover:text-slate-700 flex items-center"
                >
                  {copied === 'cover' ? (
                    <>
                      <CheckCircle2 size={14} className="mr-1 text-green-600" />
                      {i18n.language === 'ru' ? 'Скопировано!' : 'Copied!'}
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" />
                      {i18n.language === 'ru' ? 'Копировать' : 'Copy'}
                    </>
                  )}
                </button>
              )}
            </div>
            
            {isEditing ? (
              <textarea
                value={editedCoverLetter}
                onChange={(e) => setEditedCoverLetter(e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none font-serif"
                rows={10}
                placeholder={i18n.language === 'ru' ? 'Добавить cover letter...' : 'Add cover letter...'}
              />
            ) : (
              <div className="p-4 bg-blue-50 rounded-lg text-sm text-slate-700 leading-relaxed border border-blue-100 font-serif whitespace-pre-wrap">
                {resume.coverLetter}
              </div>
            )}
          </div>
        )}

        {/* Job Description (collapsed) */}
        {resume.jobDescription && (
          <details className="bg-white rounded-xl border border-slate-200 p-6">
            <summary className="font-semibold text-slate-800 cursor-pointer hover:text-slate-600">
              {i18n.language === 'ru' ? '📋 Описание вакансии' : '📋 Job Description'}
            </summary>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-600 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
              {resume.jobDescription}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default ResumeDetailView;

