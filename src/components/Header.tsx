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

    e.preventDefault();

    // Séparer path et hash (si présent)
    const [pathPart, hashPart] = href.split('#');

    // Naviguer vers la route en incluant le hash dans l'URL ;
    // la page (Home) se chargera et scrollera vers l'élément via l'effet dans App/Home.
    const target = `${pathPart}${hashPart ? `#${hashPart}` : ''}`;

    // If we're coming from a different pathname, do a full reload so the page is rendered fresh.
    const currentPath = window.location.pathname.replace(/\/$/, '');
    const normalizedTargetPath = (pathPart || '/').replace(/\/$/, '');

    try {
      if (normalizedTargetPath !== currentPath) {
        // Full page navigation to ensure the Home page and sections are fully mounted.
        window.location.href = target;
      } else {
        // Same page: use SPA navigation so React Router handles hash change and our effect will scroll.
        navigate(target);
      }
    } catch (e) {
      // Fallback to SPA navigate
      navigate(target);
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
        {/* Flags on desktop at far left */}
        <div className="hidden md:flex items-center absolute left-4">
          <LanguageSelector />
        </div>

        <div className="logo">
          <img
            src="https://i.postimg.cc/BZyjwF6d/image-logo.png"
            alt="Pokémon Stalactite logo"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile flags: visible on small screens */}
          <div className="md:hidden">
            <LanguageSelector />
          </div>

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
            {intl.formatMessage({ id: 'nav.socials' })}
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
