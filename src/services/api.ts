import { mockJobs } from '../data/mockJobs';
import type { Job } from '../types/job';

export interface PartnerInfo {
  slug: string;
  name: string;
  description: {
    ua: string;
    en: string;
  };
}

export const mockPartners: Record<string, PartnerInfo> = {
  uber: {
    slug: 'uber',
    name: 'Uber',
    description: {
      ua: 'Міжнародна технологічна компанія у сфері пасажирських перевезень та доставки.',
      en: 'International tech company specializing in ride-hailing and delivery.',
    },
  },
  dhl: {
    slug: 'dhl',
    name: 'DHL Logistics',
    description: {
      ua: 'Провідний світовий оператор поштових та логістичних послуг по всій Європі.',
      en: 'Leading global postal and logistics service provider across Europe.',
    },
  },
  novus: {
    slug: 'novus',
    name: 'Novus Retail',
    description: {
      ua: 'Мережа сучасних супермаркетів та логістичних розподільчих центрів.',
      en: 'Modern supermarket chain and logistics distribution centers.',
    },
  },
};

const getRandomDelay = () => Math.floor(Math.random() * (800 - 300 + 1)) + 300;

export const fetchJobsByPartner = async (slug: string): Promise<Job[]> => {
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));


  if (Math.random() < 0.2) {
    throw new Error('NETWORK_ERROR');
  }

  if (!slug || slug === 'all') {
    return mockJobs;
  }

  return mockJobs.filter((job) => job.partnerSlug === slug);
};

export const fetchPartnerInfo = async (slug: string): Promise<PartnerInfo | null> => {
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  if (Math.random() < 0.2) {
    throw new Error('NETWORK_ERROR');
  }

  if (!slug || slug === 'all') {
    return null;
  }

  return mockPartners[slug] || {
    slug,
    name: slug.toUpperCase(),
    description: {
      ua: 'Офіційний партнер платформи VV Work.',
      en: 'Official partner of the VV Work platform.',
    },
  };
};

export interface ContactFormData {
  name: string;
  contact: string;
  message?: string;
}

export const submitApplication = async (data: ContactFormData): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  if (!data) {
    throw new Error('INVALID_DATA');
  }


  if (Math.random() < 0.2) {
    throw new Error('SUBMISSION_FAILED');
  }

  return { success: true };
};