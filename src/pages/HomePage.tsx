import useLanguage from '../hooks/useLanguage';

function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <section>
        <div className="py-16 text-center">
          <h1>
            {t.heroTitle} <br />
            <span>{t.heroHighlight}</span>
          </h1>
          <p>
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl py-10">
          <h2>{t.categoriesTitle}</h2>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl py-10">
          <h2>{t.employersTitle}</h2>
        </div>
      </section>
    </div>
  );
}

export default HomePage;