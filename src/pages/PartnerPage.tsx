import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobsByPartner } from '../services/api';
import type { Job } from '../types/job';
import useLanguage from '../hooks/useLanguage';

function PartnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

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

  const pageTitle =
    !slug || slug === 'all'
      ? t.allJobsTitle
      : `${t.partnerJobsTitle}: ${slug}`;

  return (
    <main className="mx-auto max-w-6xl py-8">
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>


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
          {jobs.length === 0 ? (
            <p>{t.noJobsFound}</p>
          ) : (
            jobs.map((job) => (
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