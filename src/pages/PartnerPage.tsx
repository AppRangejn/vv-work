import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchJobsByPartner } from '../services/api';
import type { Job } from '../types/job';
import useLanguage from '../hooks/useLanguage';
import useDebounce from '../hooks/useDebounce';
import { categories } from '../data/categories';

function PartnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang, t } = useLanguage();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const selectedCategory = searchParams.get('category') || 'all';

  const loadJobs = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchJobsByPartner(slug || 'all');
      setJobs(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchJobsByPartner(slug || 'all')
      .then((data) => {
        if (isMounted) setJobs(data);
      })
      .catch(() => {
        if (isMounted) setIsError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        selectedCategory === 'all' || job.category === selectedCategory;

      const currentTitle = job.title[lang].toLowerCase();
      const matchesSearch = currentTitle.includes(
        debouncedSearchTerm.trim().toLowerCase()
      );

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

  const pageTitle =
    !slug || slug === 'all'
      ? t.allJobsTitle
      : `${t.partnerJobsTitle}: ${slug}`;

  return (
    <main className="mx-auto max-w-6xl py-8">
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="border p-2 sm:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 sm:w-1/2"
        >
          <option value="all">{t.allCategories}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat[lang]}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-4">
          <div className="border p-4">{t.loadingText}</div>
          <div className="border p-4">{t.loadingText}</div>
          <div className="border p-4">{t.loadingText}</div>
        </div>
      )}

      {!isLoading && isError && (
        <div className="border p-4 text-center">
          <p>{t.loadError}</p>
          <button
            type="button"
            onClick={loadJobs}
            className="mt-4 border px-4 py-2"
          >
            {t.retryBtn}
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-4">
          {filteredJobs.length === 0 ? (
            <p>{t.noJobsFound}</p>
          ) : (
            filteredJobs.map((job) => (
              <article key={job.id} className="border p-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">{job.title[lang]}</h2>
                  <span>{job.salary}</span>
                </div>
                <p className="mt-1 text-sm">
                  {job.partnerName} • {job.city[lang]}, {job.country[lang]}
                </p>
                <p className="mt-2">{job.description[lang]}</p>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default PartnerPage;