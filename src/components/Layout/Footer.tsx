import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

type ModalType = 'privacy' | 'terms' | null;

function Footer() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 py-10">
          <div className="max-w-xs">
            <Link to="/" className="text-xl font-bold">
              VV Work
            </Link>
            <p className="mt-2 text-sm">{t.footerDesc}</p>
          </div>

          <div>
            <h4 className="font-semibold">{t.forCandidates}</h4>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              <li>
                <Link to="/partners/all">{t.navJobs}</Link>
              </li>
              <li>
                <Link to="/partners/all">{t.categoriesTitle}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">{t.forEmployers}</h4>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              <li>
                <Link to="/contacts?role=employer">{t.findEmployee}</Link>
              </li>
              <li>
                <Link to="/contacts">{t.navContacts}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">{t.navContacts}</h4>
            <address className="mt-2 not-italic text-sm">
              <p>
                <a href="mailto:support@vvwork.eu">support@vvwork.eu</a>
              </p>
              <p className="mt-1">
                <a href="tel:+3808004400000">0800 (44) 000-00-00</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t py-4 text-xs">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
            <p>© {new Date().getFullYear()} VV Work. {t.rights}</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="hover:underline"
              >
                {t.privacyTitle}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="hover:underline"
              >
                {t.termsTitle}
              </button>
            </div>
          </div>
        </div>
      </footer>


      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md border bg-white p-6 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold">
              {activeModal === 'privacy' ? t.privacyTitle : t.termsTitle}
            </h3>
            <p className="mt-4 text-sm text-zinc-700">
              {activeModal === 'privacy' ? t.privacyContent : t.termsContent}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="border px-4 py-2 text-sm font-semibold"
              >
                {t.closeModalBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;