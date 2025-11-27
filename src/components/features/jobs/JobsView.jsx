/**
 * JobsView Component
 * Контейнер для раздела "Мои отклики" - список + создание/редактирование
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TailoredResumesList from './TailoredResumesList';
import JobTailoringView from './JobTailoringView';
import ResumeDetailView from './ResumeDetailView';

const JobsView = ({ masterProfile, onSaveTailoredResume }) => {
  const { i18n } = useTranslation();
  
  // Режимы: 'list' | 'create' | 'view' | 'edit'
  const [mode, setMode] = useState('list');
  const [selectedResume, setSelectedResume] = useState(null);

  // Создать новый отклик
  const handleCreateNew = () => {
    setSelectedResume(null);
    setMode('create');
  };

  // Просмотр резюме
  const handleView = (resume) => {
    setSelectedResume(resume);
    setMode('view');
  };

  // Редактирование резюме
  const handleEdit = (resume) => {
    setSelectedResume(resume);
    setMode('edit');
  };

  // Вернуться к списку
  const handleBackToList = () => {
    setSelectedResume(null);
    setMode('list');
  };

  // Сохранить и вернуться
  const handleSaveAndBack = (resume) => {
    onSaveTailoredResume(resume);
    handleBackToList();
  };

  // Режим списка
  if (mode === 'list') {
    return (
      <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <TailoredResumesList 
            onCreateNew={handleCreateNew}
            onView={handleView}
            onEdit={handleEdit}
          />
        </div>
      </div>
    );
  }

  // Режим создания
  if (mode === 'create') {
    return (
      <JobTailoringView 
        onBack={handleBackToList}
        onSaveTailoredResume={handleSaveAndBack}
        masterProfile={masterProfile}
      />
    );
  }

  // Режим просмотра/редактирования
  if (mode === 'view' || mode === 'edit') {
    return (
      <ResumeDetailView
        resume={selectedResume}
        mode={mode}
        onBack={handleBackToList}
        onEdit={() => setMode('edit')}
        masterProfile={masterProfile}
      />
    );
  }

  return null;
};

export default JobsView;

