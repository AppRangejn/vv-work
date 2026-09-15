import { mockJobs } from '../data/mockJobs';
import type { Job } from '../types/job';

const getRandomDelay = () => Math.floor(Math.random() * (800 - 300 + 1)) + 300;

export const fetchJobsByPartner = async (slug: string): Promise<Job[]> => {
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  if (Math.random() < 0.15) {
    throw new Error('NETWORK_ERROR');
  }

  if (!slug || slug === 'all') {
    return mockJobs;
  }

  return mockJobs.filter((job) => job.partnerSlug === slug);
};