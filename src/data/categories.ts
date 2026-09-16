import type { Translations } from '../context/LanguageContext';

export interface CategoryItem {
  id: string;
  translationKey: keyof Translations;
}

export const categories: CategoryItem[] = [
  { id: 'logistics', translationKey: 'catLogistics' },
  { id: 'production', translationKey: 'catProduction' },
  { id: 'construction', translationKey: 'catConstruction' },
  { id: 'hospitality', translationKey: 'catHospitality' },
  { id: 'agriculture', translationKey: 'catAgriculture' },
  { id: 'transport', translationKey: 'catTransport' },
];