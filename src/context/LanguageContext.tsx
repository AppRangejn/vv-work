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
    allJobsTitle: 'Усі вакансії',
    partnerJobsTitle: 'Вакансії',
    loadingText: 'Завантаження...',
    loadError: 'Сталася помилка при завантаженні даних.',
    retryBtn: 'Спробувати ще раз',
    noJobsFound: 'Вакансій не знайдено.',
    searchPlaceholder: 'Пошук за назвою вакансії...',
    allCategories: 'Усі категорії',
    contactsTitle: 'Звʼязатися з нами',
    nameLabel: 'Імʼя',
    contactLabel: 'Телефон або Telegram',
    messageLabel: 'Повідомлення (опційно)',
    submitBtn: 'Надіслати заявку',
    submittingBtn: 'Надсилання...',
    nameError: 'Імʼя має містити мінімум 2 символи',
    contactError: 'Введіть коректний номер телефону (+380...) або нік у Telegram (@username)',
    messageError: 'Повідомлення не може перевищувати 500 символів',
    successMsg: 'Дякуємо! Вашу заявку успішно надіслано.',
    submitErrorMsg: 'Не вдалося надіслати заявку. Спробуйте ще раз.',
    sendAnotherBtn: 'Надіслати ще одну',
    employerContactsTitle: 'Заявка для роботодавців',
    employerNameLabel: 'Компанія / Контактна особа',
    employerMessagePlaceholder: 'Опишіть вимоги до кандидатів, вакансії та кількість працівників...',
    closeModalBtn: 'Зрозуміло',
    privacyTitle: 'Політика конфіденційності',
    privacyContent: 'Платформа VV Work обробляє персональні дані кандидатів і роботодавців виключно з метою працевлаштування та рекрутингу відповідно до законодавства ЄС (GDPR). Ми не передаємо ваші дані стороннім особам без вашої згоди.',
    termsTitle: 'Умови використання',
    termsContent: 'Користуючись платформою VV Work, ви погоджуєтеся надавати правдиву інформацію про вакансії та свій професійний досвід. Платформа є посередником між кандидатами та прямими роботодавцями.',
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
    allJobsTitle: 'All Vacancies',
    partnerJobsTitle: 'Vacancies',
    loadingText: 'Loading...',
    loadError: 'Failed to load jobs data.',
    retryBtn: 'Retry',
    noJobsFound: 'No vacancies found.',
    searchPlaceholder: 'Search jobs by title...',
    allCategories: 'All categories',
    contactsTitle: 'Contact Us',
    nameLabel: 'Name',
    contactLabel: 'Phone or Telegram',
    messageLabel: 'Message (optional)',
    submitBtn: 'Submit Application',
    submittingBtn: 'Submitting...',
    nameError: 'Name must be at least 2 characters long',
    contactError: 'Enter a valid phone number (+...) or Telegram username (@username)',
    messageError: 'Message cannot exceed 500 characters',
    successMsg: 'Thank you! Your application has been submitted successfully.',
    submitErrorMsg: 'Failed to submit application. Please try again.',
    sendAnotherBtn: 'Send another',
    employerContactsTitle: 'Employer Inquiry',
    employerNameLabel: 'Company / Contact Person',
    employerMessagePlaceholder: 'Describe candidate requirements, open positions, and headcount...',
    closeModalBtn: 'Got it',
    privacyTitle: 'Privacy Policy',
    privacyContent: 'VV Work platform processes personal data of candidates and employers strictly for employment and recruitment purposes in compliance with EU regulations (GDPR). We never transfer your data to third parties without consent.',
    termsTitle: 'Terms of Service',
    termsContent: 'By using VV Work, you agree to provide accurate information regarding vacancies and qualifications. The platform acts as a bridge between candidates and direct European employers.',
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