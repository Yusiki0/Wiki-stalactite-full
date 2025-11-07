import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import FlagFR from '../assets/flag-fr.svg';
import FlagEN from '../assets/flag-en.svg';

export const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Français"
        title="Français"
        className={`p-1 rounded ${
          locale === 'fr' ? 'bg-blue-600' : 'bg-transparent hover:bg-slate-100'
        }`}
        onClick={() => setLocale('fr')}
      >
        <img src={FlagFR} alt="FR" className="w-6 h-4 block" />
      </button>

      <button
        aria-label="English"
        title="English"
        className={`p-1 rounded ${
          locale === 'en' ? 'bg-blue-600' : 'bg-transparent hover:bg-slate-100'
        }`}
        onClick={() => setLocale('en')}
      >
        <img src={FlagEN} alt="EN" className="w-6 h-4 block" />
      </button>
    </div>
  );
};