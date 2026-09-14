import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="mx-auto flex max-w-6xl justify-between py-10">
        <div>
          <Link to="/">
            VV Work
          </Link>
          <p>{t.footerDesc}</p>
        </div>

        <div>
          <h4>{t.forCandidates}</h4>
          <ul>
            <li>
              <Link to="/partners/all">{t.navJobs}</Link>
            </li>
            <li>
              <Link to="/#categories">Категорії</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>{t.forEmployers}</h4>
          <ul>
            <li>
              <Link to="/#for-employers">{t.findEmployee}</Link>
            </li>
            <li>
              <Link to="/contacts">{t.navContacts}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>{t.navContacts}</h4>
          <p>support@vvwork.eu</p>
          <p>0800 (44) 000-00-00</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;