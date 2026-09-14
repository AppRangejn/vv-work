import { NavLink, Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

function Header() {
  const { setLang, t } = useLanguage(); 

  return (
    <header>
      <div className="mx-auto flex max-w-6xl justify-between py-5">
        <Link to="/">
          VV Work
        </Link>

        <nav className="flex gap-6">
          <NavLink to="/">
            {t.navHome}
          </NavLink>

          <NavLink to="/partners/all">
            {t.navJobs}
          </NavLink>

          <NavLink to="/contacts">
            {t.navContacts}
          </NavLink>

          <Link to="/#for-employers">
            {t.findEmployee}
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setLang('ua')}
            >
              UA
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;