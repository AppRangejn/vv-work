import { NavLink } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Logo from '../Common/Logo';

interface NavItem {
  to: string;
  label: string;
  exact?: boolean;
  icon: (className: string) => React.JSX.Element;
}

function Header() {
  const { lang, setLang, t } = useLanguage();

  const navItems: NavItem[] = [
    {
      to: '/',
      label: t.navHome,
      exact: true,
      icon: (cls) => (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/partners/all',
      label: t.navJobs,
      icon: (cls) => (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      to: '/contacts?role=employer',
      label: t.findEmployee,
      icon: (cls) => (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      to: '/contacts',
      label: t.navContacts,
      icon: (cls) => (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center border-b-2 pb-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
      isActive
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-zinc-500 hover:text-zinc-900'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center justify-center py-2 text-[10px] font-medium tracking-tight transition-colors ${
      isActive ? 'text-blue-600 font-semibold' : 'text-zinc-500 hover:text-zinc-900'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <Logo size="md" />

  
          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={desktopNavLinkClass}
              >
                {item.icon('mb-1 h-5 w-5')}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            <button
              type="button"
              onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
              className="flex items-center gap-1.5 text-zinc-600 transition hover:text-zinc-950"
              aria-label="Change interface language"
            >
              <span className="hidden sm:inline font-medium">
                {lang === 'ua' ? 'Українська' : 'English'}
              </span>
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-xs">
                {lang}
              </span>
            </button>

          </div>
        </div>
      </header>

      <nav 
        aria-label="Mobile navigation" 
        className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-zinc-200 bg-white/95 backdrop-blur-md md:hidden shadow-lg pb-safe"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={mobileNavLinkClass}
          >
            {item.icon('h-5 w-5')}
            <span className="mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Header;