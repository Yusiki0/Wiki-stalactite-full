import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import '../styles/header.css';

interface HeaderProps {
  scrolled: boolean;
}

export const Header = ({ scrolled }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id') || '';
        if (sectionTop < 100 && sectionTop > -300) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    // Si c'est une route interne (commence par /), utiliser navigate pour conserver SPA behaviour
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      setMobileMenuOpen(false);
      return;
    }

    // Si c'est une ancre locale (ex: #apropos), naviguer sur la même page
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.replace('#', ''));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }

    setMobileMenuOpen(false);
  };

  const { locale } = useLanguage();
  const intl = useIntl();
  const navigate = useNavigate();
  // Always prefix routes with the locale so URLs are /fr/... or /en/...
  const baseUrl = `/${locale}`;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img
            src="https://i.postimg.cc/BZyjwF6d/image-logo.png"
            alt="Pokémon Stalactite logo"
          />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a
            href={`${baseUrl}#apropos`}
            className={activeLink === 'apropos' ? 'active' : ''}
            onClick={handleNavClick}
          >
            {intl.formatMessage({ id: 'nav.about' })}
          </a>
          <a
            href={`${baseUrl}#synopsis`}
            className={activeLink === 'synopsis' ? 'active' : ''}
            onClick={handleNavClick}
          >
            {intl.formatMessage({ id: 'nav.synopsis' })}
          </a>
          <a
            href={`${baseUrl}#protagonistes`}
            className={activeLink === 'protagonistes' ? 'active' : ''}
            onClick={handleNavClick}
          >
            {intl.formatMessage({ id: 'nav.protagonists' })}
          </a>
          <a
            href={`${baseUrl}#starters`}
            className={activeLink === 'starters' ? 'active' : ''}
            onClick={handleNavClick}
          >
            {intl.formatMessage({ id: 'nav.starters' })}
          </a>
          <a
            href={`${baseUrl}#screenshots`}
            className={activeLink === 'screenshots' ? 'active' : ''}
            onClick={handleNavClick}
          >
            {intl.formatMessage({ id: 'nav.screenshots' })}
          </a>
          <a href={`${baseUrl}/pokedex`} onClick={handleNavClick}>
            {intl.formatMessage({ id: 'nav.pokedex' })}
          </a>
          <a
            href={`${baseUrl}#reseaux`}
            className={activeLink === 'reseaux' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Réseaux
          </a>
          <a href={`${baseUrl}/faq`} onClick={handleNavClick}>
            {intl.formatMessage({ id: 'nav.faq' })}
          </a>
          <a href={`${baseUrl}/credits`} onClick={handleNavClick}>
            {intl.formatMessage({ id: 'nav.credits' })}
          </a>
        </nav>
      </div>
    </header>
  );
};
