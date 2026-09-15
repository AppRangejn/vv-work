import { createContext, useState, type ReactNode } from 'react';

export type Language = 'ua' | 'en';

const translations = {
  ua: {
    navHome: 'Головна',
    navJobs: 'Вакансії',
    navEmployers: 'Роботодавцям',
    navContacts: 'Контакти',
    findJob: 'Знайти роботу',
    findEmployee: 'Знайти працівника',
    heroTitle: 'Знайди роботу. Знайди працівника.',
    heroHighlight: 'Працюй у Європі.',
    heroSubtitle: 'Платформа прямих контактів між роботодавцями та шукачами без зайвих посередників.',
    footerDesc: 'Платформа для пошуку надійної роботи та перевірених працівників у Європі.',
    rights: 'Всі права захищені.',
    forCandidates: 'Кандидатам',
    forEmployers: 'Роботодавцям',
    categoriesTitle: 'Популярні категорії',
    employersTitle: 'Потрібні працівники?',
    employersText: 'Звʼяжіться з нами для розміщення вакансій.',
    contactUs: 'Контакти',
  },
  en: {
    navHome: 'Home',
    navJobs: 'Jobs',
    navEmployers: 'Employers',
    navContacts: 'Contacts',
    findJob: 'Find Job',
    findEmployee: 'Hire Talent',
    heroTitle: 'Find jobs. Hire specialists.',
    heroHighlight: 'Work across Europe.',
    heroSubtitle: 'Direct connection platform between candidates and verified European employers.',
    footerDesc: 'Platform for finding reliable jobs and verified employees across Europe.',
    rights: 'All rights reserved.',
    forCandidates: 'For Candidates',
    forEmployers: 'For Employers',
    categoriesTitle: 'Popular Categories',
    employersTitle: 'Need Employees?',
    employersText: 'Contact us to post your job openings.',
    contactUs: 'Contacts',
  },
} satisfies Record<Language, unknown>;

export type Translations = typeof translations.ua;

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined); // eslint-disable-line

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ua');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;