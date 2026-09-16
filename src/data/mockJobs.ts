import type { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    id: '1',
    partnerSlug: 'dhl-logistics',
    partnerName: 'DHL Logistics',
    title: {
      ua: 'Комплектувальник товарів на склад',
      en: 'Warehouse Order Picker',
    },
    category: 'logistics',
    city: { ua: 'Вроцлав', en: 'Wroclaw' },
    country: { ua: 'Польща', en: 'Poland' },
    salary: '25 PLN/год',
    description: {
      ua: 'Збір замовлень за допомогою сканера, пакування готової продукції.',
      en: 'Order picking with handheld scanners, packaging finished goods.',
    },
    requirements: {
      ua: ['Уважність', 'Готовність до позмінної роботи'],
      en: ['Attention to detail', 'Willingness to work shifts'],
    },
  },
  {
    id: '2',
    partnerSlug: 'skoda-auto',
    partnerName: 'Škoda Auto',
    title: {
      ua: 'Оператор верстатів CNC',
      en: 'CNC Machine Operator',
    },
    category: 'production',
    city: { ua: 'Млада Болеслав', en: 'Mlada Boleslav' },
    country: { ua: 'Чехія', en: 'Czech Republic' },
    salary: '1850 €/міс',
    description: {
      ua: 'Обслуговування токарних та фрезерних верстатів із ЧПК.',
      en: 'Operation of CNC lathe and milling machines.',
    },
    requirements: {
      ua: ['Досвід від 1 року', 'Вміння читати креслення'],
      en: ['1+ year experience', 'Blueprint reading skills'],
    },
  },
  {
    id: '3',
    partnerSlug: 'bau-group',
    partnerName: 'BauGroup GmbH',
    title: {
      ua: 'Електромонтажник обʼєктів',
      en: 'Industrial Electrician',
    },
    category: 'construction',
    city: { ua: 'Берлін', en: 'Berlin' },
    country: { ua: 'Німеччина', en: 'Germany' },
    salary: '2400 €/міс',
    description: {
      ua: 'Прокладання кабельних трас та монтаж щитових.',
      en: 'Laying cable lines and installing electrical panels.',
    },
    requirements: {
      ua: ['Профільна освіта', 'Допуск до робіт'],
      en: ['Relevant certification', 'Safety clearance'],
    },
  },
  {
    id: '4',
    partnerSlug: 'dhl-logistics',
    partnerName: 'DHL Logistics',
    title: {
      ua: 'Водій навантажувача',
      en: 'Forklift Driver',
    },
    category: 'transport',
    city: { ua: 'Познань', en: 'Poznan' },
    country: { ua: 'Польща', en: 'Poland' },
    salary: '28 PLN/год',
    description: {
      ua: 'Переміщення вантажів по складу, завантаження фур.',
      en: 'Relocating pallets across warehouse, truck loading.',
    },
    requirements: {
      ua: ['Права UDT', 'Досвід від 6 місяців'],
      en: ['UDT license', '6+ months experience'],
    },
  },
];