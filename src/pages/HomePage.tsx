import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import CategoriesList from '../components/Home/CategoriesList';

function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = quickSearch.trim();
    if (query) {
      navigate(`/partners/all?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/partners/all');
    }
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl py-12 text-center">
        <h1 className="text-3xl font-bold">
          {t.heroTitle} <span>{t.heroHighlight}</span>
        </h1>
        <p className="mt-4 text-zinc-600">{t.heroSubtitle}</p>


        <form onSubmit={handleSearchSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 border p-2 text-sm"
          />
          <button type="submit" className="border px-4 py-2 text-sm font-semibold">
            {t.findJob}
          </button>
        </form>

        <div className="mt-4 flex justify-center gap-4 text-sm">
          <Link to="/partners/all" className="underline">
            {t.allJobsTitle}
          </Link>
          <span>•</span>
          <Link to="/contacts?role=employer" className="underline">
            {t.findEmployee}
          </Link>
        </div>
      </section>


      <CategoriesList />


      <section id="for-employers" className="mx-auto max-w-6xl py-12 text-center">
        <h2 className="text-xl font-bold">{t.employersTitle}</h2>
        <p className="mt-2 text-zinc-600">{t.employersText}</p>
        <div className="mt-4">
          <Link to="/contacts?role=employer" className="border px-4 py-2 text-sm font-semibold">
            {t.contactUs}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;