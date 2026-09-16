import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../Common/ScrollToTop';

function Layout() {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    let title = t.pageTitleDefault;

    if (location.pathname === '/') {
      title = t.pageTitleHome;
    } else if (location.pathname.startsWith('/partners')) {
      title = t.pageTitleJobs;
    } else if (location.pathname.startsWith('/contacts')) {
      title = t.pageTitleContacts;
    }

    document.title = title;
  }, [location.pathname, t]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased pb-16 md:pb-0">
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;