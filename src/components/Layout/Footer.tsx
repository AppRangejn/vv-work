import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Logo from '../Common/Logo';
import Modal from '../Common/Modal';

type ModalType = 'privacy' | 'terms' | null;

function Footer() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="border-t border-zinc-200 bg-white pb-20 md:pb-0">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
          {/* Колонка 1: Бренд */}
          <div className="sm:pr-4">
            <Logo size="sm" />
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              {t.footerDesc}
            </p>
          </div>

          {/* Колонка 2: Кандидатам */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.forCandidates}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  to="/partners/all"
                  className="text-zinc-600 transition hover:text-blue-600"
                >
                  {t.navJobs}
                </Link>
              </li>
              <li>
                <Link
                  to="/partners/all"
                  className="text-zinc-600 transition hover:text-blue-600"
                >
                  {t.categoriesTitle}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Роботодавцям */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.forEmployers}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  to="/contacts?role=employer"
                  className="text-zinc-600 transition hover:text-blue-600"
                >
                  {t.findEmployee}
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-zinc-600 transition hover:text-blue-600"
                >
                  {t.navContacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакти */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {t.navContacts}
            </h4>
            <address className="mt-3 space-y-1.5 not-italic text-xs text-zinc-600">
              <p>
                <a
                  href="mailto:support@vvwork.eu"
                  className="transition hover:text-blue-600"
                >
                  support@vvwork.eu
                </a>
              </p>
              <p>
                <a
                  href="tel:+3808004400000"
                  className="font-medium transition hover:text-blue-600"
                >
                  0 800 44 000-00-00
                </a>
              </p>
              <p className="text-[11px] text-zinc-400">
                {t.workingHours}
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-zinc-50 py-4 text-xs text-zinc-500">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} VV WORK. {t.rights}
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="transition hover:text-zinc-900 hover:underline cursor-pointer"
              >
                {t.privacyTitle}
              </button>
              <span className="text-zinc-300">•</span>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="transition hover:text-zinc-900 hover:underline cursor-pointer"
              >
                {t.termsTitle}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={Boolean(activeModal)}
        onClose={closeModal}
        title={activeModal === 'privacy' ? t.privacyTitle : t.termsTitle}
        closeBtnText={t.closeModalBtn}
      >
        <p>{activeModal === 'privacy' ? t.privacyContent : t.termsContent}</p>
      </Modal>
    </>
  );
}

export default Footer;