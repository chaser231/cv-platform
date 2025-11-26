import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Регистрация шрифтов Roboto с поддержкой кириллицы через CDN
// Roboto поддерживает латиницу, кириллицу и другие символы
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

// Примечание: В production рекомендуется:
// 1. Скачать шрифты локально в /public/fonts/
// 2. Использовать src: '/fonts/Roboto-Regular.ttf'
// 3. Это улучшит скорость загрузки и надёжность

// Стили для PDF документа (A4 формат)
const styles = StyleSheet.create({
  page: {
    padding: 40, // ~15mm
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1e293b',
    flexDirection: 'column'
  },
  
  // Header секция
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 2,
    borderBottomColor: '#1e293b'
  },
  fullName: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#0f172a',
    marginBottom: 4
  },
  title: {
    fontSize: 14,
    color: '#2563eb',
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 8
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#475569',
    gap: 8
  },
  contactItem: {
    marginRight: 8
  },
  
  // Секции
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#64748b',
    marginBottom: 8
  },
  
  // Summary
  summaryText: {
    fontSize: 9,
    lineHeight: 1.6,
    textAlign: 'justify',
    color: '#334155'
  },
  
  // Experience
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  experienceRole: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0f172a'
  },
  experienceDates: {
    fontSize: 8,
    color: '#64748b',
    fontFamily: 'Roboto',
    fontWeight: 700
  },
  experienceCompany: {
    fontSize: 9,
    color: '#2563eb',
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 4
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155'
  },
  
  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  skillItem: {
    backgroundColor: '#f1f5f9',
    padding: '4 8',
    borderRadius: 3,
    fontSize: 8,
    color: '#334155',
    border: 1,
    borderColor: '#e2e8f0'
  },
  
  // Projects
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2
  },
  projectLink: {
    fontSize: 7,
    color: '#2563eb',
    marginBottom: 3
  },
  projectDescription: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#334155'
  },
  
  // Education
  educationItem: {
    marginBottom: 8,
  },
  educationInstitution: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2
  },
  educationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8
  },
  educationDegree: {
    color: '#334155'
  },
  educationDates: {
    color: '#64748b'
  },
  
  // Languages
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 8
  },
  languageName: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0f172a',
    marginRight: 4
  },
  languageLevel: {
    color: '#64748b'
  },
  
  // Watermark для Free плана
  watermark: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 7,
    color: '#94a3b8',
    opacity: 0.7
  }
});

const PDFDocument = ({ data, showWatermark = true }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* Header - только на первой странице */}
      <View style={styles.header} wrap={false}>
        <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          {data.personalInfo.email && (
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          )}
          {data.personalInfo.phone && (
            <>
              <Text>•</Text>
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            </>
          )}
          {data.personalInfo.location && (
            <>
              <Text>•</Text>
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            </>
          )}
          {data.personalInfo.links && (
            <>
              <Text>•</Text>
              <Text style={[styles.contactItem, { color: '#2563eb' }]}>{data.personalInfo.links}</Text>
            </>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceRole}>{exp.role}</Text>
                <Text style={styles.experienceDates}>{exp.dates}</Text>
              </View>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.projectItem} wrap={false}>
              <Text style={styles.projectName}>{project.name}</Text>
              {project.link && (
                <Text style={styles.projectLink}>{project.link}</Text>
              )}
              <Text style={styles.projectDescription}>{project.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem} wrap={false}>
              <Text style={styles.educationInstitution}>{edu.institution}</Text>
              <View style={styles.educationDetails}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationDates}>{edu.dates}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesContainer}>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <Text>—</Text>
                <Text style={styles.languageLevel}> {lang.level}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Watermark для Free плана - на каждой странице */}
      {showWatermark && (
        <Text style={styles.watermark} fixed>
          Made with CVPlatform.io
        </Text>
      )}
    </Page>
  </Document>
);

export default PDFDocument;

