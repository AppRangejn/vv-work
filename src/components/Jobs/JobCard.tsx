import { Link } from 'react-router-dom';
import type { Job } from '../../types/job';
import useLanguage from '../../hooks/useLanguage';
import { categories } from '../../data/categories';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const { lang, t } = useLanguage();

  const matchedCategory = categories.find((cat) => cat.id === job.category);
  const categoryLabel = matchedCategory ? t[matchedCategory.translationKey] : job.category;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-xs">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600">
            {categoryLabel}
          </span>
          <span className="text-base font-black tracking-tight text-zinc-900">
            {job.salary}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600 line-clamp-2">
          {job.title[lang]}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          <span className="font-semibold text-zinc-800">{job.partnerName}</span>
          <span className="text-zinc-300" aria-hidden="true">•</span>
          <span>{job.city[lang]}, {job.country[lang]}</span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-zinc-600 line-clamp-3">
          {job.description[lang]}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-zinc-400">
          <svg className="h-3.5 w-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {t.verifiedBadge}
        </span>

        <Link
          to={`/contacts?jobId=${job.id}`}
          aria-label={`${t.applyBtn}: ${job.title[lang]}`}
          className="font-bold text-blue-600 transition group-hover:text-blue-700 hover:underline"
        >
          {t.applyBtn} →
        </Link>
      </div>
    </article>
  );
}

export default JobCard;