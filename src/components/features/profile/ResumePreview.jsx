/**
 * ResumePreview Component
 * A4 превью резюме в реальном времени
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const ResumePreview = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-slate-100 p-8 overflow-y-auto h-full">
      <div className="flex justify-center min-h-full">
        <div 
          className="bg-white shadow-2xl w-[210mm] p-[15mm] text-slate-800 transition-all duration-300 ease-in-out origin-top transform scale-[0.85] lg:scale-100 my-8"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            minHeight: '297mm',
            paddingBottom: '15mm',
            height: 'auto'
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-6 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900">
              {data.personalInfo.fullName}
            </h1>
            <p className="text-lg text-blue-600 font-medium mt-1">
              {data.personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
              <span>{data.personalInfo.email}</span>
              <span>•</span>
              <span>{data.personalInfo.phone}</span>
              <span>•</span>
              <span>{data.personalInfo.location}</span>
              <span>•</span>
              <span className="text-blue-600">{data.personalInfo.links}</span>
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t('profile.summary')}
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                {t('profile.experience')}
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-sm text-slate-500 font-medium">{exp.dates}</span>
                    </div>
                    <div className="text-blue-600 text-sm font-semibold mb-2">{exp.company}</div>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t('profile.skills')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                {t('profile.projects')}
              </h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-slate-900 text-sm">{project.name}</h3>
                    {project.link && (
                      <div className="text-blue-600 text-xs mb-1">{project.link}</div>
                    )}
                    <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                {t('profile.education')}
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-700">{edu.degree}</span>
                    <span className="text-slate-500">{edu.dates}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t('profile.languages')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center space-x-2">
                    <span className="font-medium text-sm text-slate-900">{lang.language}</span>
                    <span className="text-slate-400">—</span>
                    <span className="text-xs text-slate-600 capitalize">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

