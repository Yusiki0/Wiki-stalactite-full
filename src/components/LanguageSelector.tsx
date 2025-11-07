import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-2 py-1 rounded ${
          locale === 'fr'
            ? 'bg-blue-600 text-white'
            : 'bg-transparent text-slate-700 hover:bg-slate-100'
        }`}
        onClick={() => setLocale('fr')}
      >
        FR
      </button>
      <button
        className={`px-2 py-1 rounded ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-transparent text-slate-700 hover:bg-slate-100'
        }`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
};