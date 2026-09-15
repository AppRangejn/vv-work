export interface CategoryItem {
  id: string;
  ua: string;
  en: string;
}

export const categories: CategoryItem[] = [
  { id: 'logistics', ua: 'Логістика та склади', en: 'Logistics & Warehouses' },
  { id: 'production', ua: 'Виробництво та заводи', en: 'Manufacturing & Plants' },
  { id: 'construction', ua: 'Будівництво та монтаж', en: 'Construction & Installation' },
  { id: 'hospitality', ua: 'Готельно-ресторанна справа', en: 'Hospitality & HoReCa' },
  { id: 'agriculture', ua: 'Сільське господарство', en: 'Agriculture & Farming' },
  { id: 'transport', ua: 'Транспорт та водії', en: 'Transport & Driving' },
];