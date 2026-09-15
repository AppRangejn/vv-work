import { Link } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import CategoriesList from '../components/Home/CategoriesList';

function HomePage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="mx-auto max-w-6xl py-12 text-center">
        <h1 className="text-3xl font-bold">
          {t.heroTitle} <span>{t.heroHighlight}</span>
        </h1>
        <p className="mt-4">{t.heroSubtitle}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/partners/all" className="border px-4 py-2">
            {t.findJob}
          </Link>
          <Link to="/contacts" className="border px-4 py-2">
            {t.findEmployee}
          </Link>
        </div>
      </section>

      <CategoriesList />

      <section id="for-employers" className="mx-auto max-w-6xl py-12 text-center">
        <h2 className="text-xl font-bold">{t.employersTitle}</h2>
        <p className="mt-2">{t.employersText}</p>
        <div className="mt-4">
          <Link to="/contacts" className="border px-4 py-2">
            {t.contactUs}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;