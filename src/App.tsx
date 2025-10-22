import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { CreditsPage } from './components/CreditsPage';
import './styles/animations.css';

function Home() {
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
      <div className="app">
        <Header scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/credits" element={<CreditsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
