import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import CategoriesList from '../components/Home/CategoriesList';
import { categories } from '../data/categories';

function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const query = quickSearch.trim();
    if (query) {
      params.set('search', query);
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    const queryString = params.toString();
    navigate(queryString ? `/partners/all?${queryString}` : '/partners/all');
  };

  return (
    <div className="w-full bg-white">
      <section className="border-b border-zinc-200 bg-zinc-50 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {t.heroTitle} <span className="text-blue-600">{t.heroHighlight}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-zinc-600">
            {t.heroSubtitle}
          </p>

          <form
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Quick job search"
            className="mx-auto mt-6 sm:mt-8 flex max-w-3xl flex-col rounded-lg border border-zinc-300 bg-white shadow-xs transition-shadow focus-within:border-zinc-400 focus-within:shadow-sm sm:flex-row sm:items-stretch sm:divide-x sm:divide-zinc-200"
          >
            <div className="flex flex-1 items-center px-3.5 py-2.5 sm:py-2">
              <span className="mr-2 text-zinc-400 shrink-0" aria-hidden="true">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <div className="h-px w-full bg-zinc-200 sm:hidden" />

            <div className="flex items-center px-3.5 py-2.5 sm:w-64 sm:py-2">
              <span className="mr-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                {t.sphereLabel}
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label={t.allCategories}
                className="w-full bg-transparent text-sm text-zinc-800 cursor-pointer focus:outline-none"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {t[cat.translationKey]}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700 active:bg-blue-800 sm:w-auto sm:shrink-0 sm:rounded-r-md cursor-pointer"
            >
              {t.findJob}
            </button>
          </form>
        </div>
      </section>

      <CategoriesList />

      <section id="for-employers" className="border-t border-zinc-200 bg-zinc-50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 md:flex-row md:items-center shadow-2xs">
            <div className="max-w-xl">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                {t.employersTitle}
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                {t.employersText}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/contacts?role=employer')}
              className="w-full shrink-0 rounded-lg bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800 active:scale-[0.99] sm:w-auto cursor-pointer"
            >
              {t.findEmployee}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;