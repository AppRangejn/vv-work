import type { Language } from '../context/LanguageContext';

export type JobCategory =
  | 'construction'
  | 'production'
  | 'logistics'
  | 'hospitality'
  | 'it'
  | 'transport'
  | 'other';

export type LocalizedText = Record<Language, string>;

export interface Job {
  id: string;
  partnerSlug: string;
  partnerName: string;
  title: LocalizedText;
  category: JobCategory;
  city: LocalizedText;
  country: LocalizedText;
  salary: string;
  description: LocalizedText;
  requirements: Record<Language, string[]>;
}