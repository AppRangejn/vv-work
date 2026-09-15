export type JobCategory =
  | 'construction'
  | 'production'
  | 'logistics'
  | 'hospitality'
  | 'it'
  | 'drivers'
  | 'other';

export interface LocalizedText {
  ua: string;
  en: string;
}

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
  requirements: {
    ua: string[];
    en: string[];
  };
}