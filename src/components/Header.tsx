import { useState, useEffect } from 'react';
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
    if (href?.startsWith('#')) {
      e.preventDefault();
      window.location.href = href;
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src="https://i.postimg.cc/BZyjwF6d/image-logo.png" alt="Pokémon Stalactite logo" />
        </div>
        
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a 
            href="https://pokemon-stalactite.fr#apropos" 
            className={activeLink === 'apropos' ? 'active' : ''}
            onClick={handleNavClick}
          >
            À propos
          </a>
          <a 
            href="https://pokemon-stalactite.fr#synopsis" 
            className={activeLink === 'synopsis' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Synopsis
          </a>
          <a 
            href="https://pokemon-stalactite.fr#protagonistes" 
            className={activeLink === 'protagonistes' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Protagonistes
          </a>
          <a 
            href="https://pokemon-stalactite.fr#starters" 
            className={activeLink === 'starters' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Starters
          </a>
          <a 
            href="https://pokemon-stalactite.fr#screenshots" 
            className={activeLink === 'screenshots' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Screenshots
          </a>
          <a 
            href="https://pokemon-stalactite.fr#reseaux" 
            className={activeLink === 'reseaux' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Réseaux
          </a>
          <a 
            href="https://pokemon-stalactite.fr#pokedex" 
            className={activeLink === 'pokedex' ? 'active' : ''}
            onClick={handleNavClick}
          >
            Réseaux
          </a>
          
          <a href="/faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
