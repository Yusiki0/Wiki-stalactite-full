import '../styles/hero.css';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

export const Hero = () => {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const intl = useIntl();
  const baseUrl = `/${locale}`;

  const handleDiscover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = `${baseUrl}#apropos`;
    const [path, hash] = href.split('#');
    navigate(path);
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`${baseUrl}/faq`);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="fade">{intl.formatMessage({ id: 'hero.title' })}</h1>
        <p className="fade">{intl.formatMessage({ id: 'hero.subtitle' })}</p>
        <div className="hero-buttons fade">
          <a href={`${baseUrl}#apropos`} className="hero-button primary" onClick={handleDiscover}>{intl.formatMessage({ id: 'hero.ctaDiscover' })}</a>
          <a href={`${baseUrl}/faq`} className="hero-button secondary" onClick={handleFAQ}>{intl.formatMessage({ id: 'hero.ctaFAQ' })}</a>
        </div>
      </div>
    </section>
  );
};