import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Synopsis } from './components/Synopsis';
import { Protagonists } from './components/Protagonists';
import { Starters } from './components/Starters';
import { Screenshots } from './components/Screenshots';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import { Pokedex } from './components/Pokedex';
import CreditsPage from './components/CreditsPage';
import './styles/animations.css';

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Si un hash est présent dans l'URL, scroller vers l'élément correspondant
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // petit délai pour s'assurer que les sections sont rendues
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <About />
      <Synopsis />
      <Protagonists />
      <Starters />
      <Screenshots />
    </main>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer pour animations
    const faders = document.querySelectorAll('.fade');
    const options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, options);

    faders.forEach(fader => observer.observe(fader));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <div className="app">
          <Header scrolled={scrolled} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fr" element={<Home />} />
            <Route path="/en" element={<Home />} />
            <Route path="/fr/faq" element={<FAQ />} />
            <Route path="/en/faq" element={<FAQ />} />
            <Route path="/fr/pokedex" element={<Pokedex />} />
            <Route path="/en/pokedex" element={<Pokedex />} />
            <Route path="/fr/credits" element={<CreditsPage />} />
            <Route path="/en/credits" element={<CreditsPage />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
