import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Français"
        title="Français"
        className={`px-2 py-1 rounded text-xl ${
          locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-transparent hover:bg-slate-100'
        }`}
        onClick={() => setLocale('fr')}
      >
        {/* Drapeau français */}
        <span role="img" aria-hidden>🇫🇷</span>
      </button>

      <button
        aria-label="English"
        title="English"
        className={`px-2 py-1 rounded text-xl ${
          locale === 'en' ? 'bg-blue-600 text-white' : 'bg-transparent hover:bg-slate-100'
        }`}
        onClick={() => setLocale('en')}
      >
        {/* Drapeau anglais (UK). Vous pouvez remplacer par 🇺🇸 si vous préférez */}
        <span role="img" aria-hidden>🇬🇧</span>
      </button>
    </div>
  );
};