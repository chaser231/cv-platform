/**
 * Components Barrel Export
 * Центральная точка экспорта всех компонентов
 */

// Layouts
export { Sidebar } from './layouts';

// Common
export { AIVariantsSelector, AIGenerateButton, AIChatWidget } from './common';

// Features - Profile
export { EditorForm, ResumePreview } from './features/profile';

// Features - Settings
export { SettingsView } from './features/settings';

// Features - Jobs
export { JobsView, JobTailoringView, TailoredResumesList } from './features/jobs';

// PDF
export { default as PDFDocument } from './PDFDocument';

