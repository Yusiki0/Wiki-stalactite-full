import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Synopsis } from './components/Synopsis';
import { Protagonists } from './components/Protagonists';
import { Starters } from './components/Starters';
import { Screenshots } from './components/Screenshots';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import './styles/animations.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize the intersection observer for fade animations
    const faders = document.querySelectorAll('.fade');
    const options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);
    
    faders.forEach(fader => observer.observe(fader));

    // Check if we should show FAQ page based on URL
    const path = window.location.pathname;
    setShowFAQ(path === '/faq');

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      setShowFAQ(window.location.pathname === '/faq');
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', () => {});
    };
  }, [scrolled]);

  return (
    <div className="app">
      <Header scrolled={scrolled} />
      {showFAQ ? (
        <FAQ />
      ) : (
        <main>
          <Hero />
          <About />
          <Synopsis />
          <Protagonists />
          <Starters />
          <Screenshots />
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;