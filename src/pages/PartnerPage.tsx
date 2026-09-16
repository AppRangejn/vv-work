import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchJobsByPartner, fetchPartnerInfo, type PartnerInfo } from '../services/api';
import type { Job } from '../types/job';
import useLanguage from '../hooks/useLanguage';
import useDebounce from '../hooks/useDebounce';
import { categories } from '../data/categories';
import JobCard from '../components/Jobs/JobCard';
import JobCardSkeleton from '../components/Jobs/JobCardSkeleton';
import { ErrorState } from '../components/Common/ErrorState';

function PartnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang, t } = useLanguage();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [partner, setPartner] = useState<PartnerInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState<number>(0);

  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const currentParam = searchParams.get('search') || '';
    const trimmed = debouncedSearchTerm.trim();

    if (trimmed !== currentParam) {
      if (trimmed) {
        searchParams.set('search', trimmed);
      } else {
        searchParams.delete('search');
      }
      setSearchParams(searchParams, { replace: true });
    }
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  useEffect(() => {
    let isMounted = true;
    const currentSlug = slug || 'all';

    Promise.all([
      fetchJobsByPartner(currentSlug),
      fetchPartnerInfo(currentSlug),
    ])
      .then(([jobsData, partnerData]) => {
        if (isMounted) {
          setJobs(jobsData);
          setPartner(partnerData);
          setIsError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug, retryKey]);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = debouncedSearchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesCategory =
        selectedCategory === 'all' || job.category === selectedCategory;

      const currentTitle = job.title[lang].toLowerCase();
      const matchesSearch = !normalizedQuery || currentTitle.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [jobs, selectedCategory, debouncedSearchTerm, lang]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    searchParams.delete('search');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div className="w-full bg-[#f7f9fb] py-8 sm:py-12 lg:py-14 min-h-[calc(100vh-140px)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 sm:mb-8">
          {partner ? (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs sm:p-8">
              <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                {t.partnerProfileBadge}
              </span>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
                {partner.name}
              </h1>
              <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-zinc-600">
                {partner.description[lang]}
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                {!slug || slug === 'all' ? t.allJobsTitle : `${t.partnerJobsTitle}: ${slug}`}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 font-medium">
                {filteredJobs.length} {t.activePositions}
              </p>
            </div>
          )}
        </header>

        <section
          aria-label="Job filters"
          className="mb-8 rounded-2xl border border-zinc-200/80 bg-white p-3 sm:p-4 shadow-2xs"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400" aria-hidden="true">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-2.5 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                aria-label={t.allCategories}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {t[cat.translationKey]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <ErrorState
            message={t.loadError}
            retryText={t.retryBtn}
            onRetry={handleRetry}
          />
        )}

        {!isLoading && !isError && (
          <>
            {filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-2xs">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-700">
                  {t.noJobsFound}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-3 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {t.resetFiltersBtn}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PartnerPage;