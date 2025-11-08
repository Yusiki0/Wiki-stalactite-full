import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import FlagFR from '../assets/flag-fr.svg';
import FlagEN from '../assets/flag-en.svg';

export const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="language-selector" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button
        aria-label="Français"
        title="Français"
        className={`lang-btn ${locale === 'fr' ? 'active' : ''}`}
        onClick={() => setLocale('fr')}
      >
        <img src={FlagFR} alt="FR" className="flag-img" />
      </button>

      <button
        aria-label="English"
        title="English"
        className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
        onClick={() => setLocale('en')}
      >
        <img src={FlagEN} alt="EN" className="flag-img" />
      </button>
    </div>
  );
};