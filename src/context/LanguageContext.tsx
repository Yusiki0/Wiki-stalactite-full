import React, { createContext, useContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import frMessages from '../translations/fr';
import enMessages from '../translations/en';

type Locale = 'fr' | 'en';
type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages = {
  fr: frMessages,
  en: enMessages,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [locale, setLocale] = useState<Locale>(() => 'fr');

  // On mount: determine locale from path (/fr or /en), localStorage, or navigator.
  useEffect(() => {
    const pathLocale = location.pathname.split('/')[1];

    // If path contains a locale, use it
    if (pathLocale === 'fr' || pathLocale === 'en') {
      setLocale(pathLocale as Locale);
      return;
    }

    // If user previously selected a locale, use it
    const saved = window.localStorage.getItem('site-locale');
    if (saved === 'fr' || saved === 'en') {
      const savedLocale = saved as Locale;
      setLocale(savedLocale);
      // ensure URL contains the locale prefix
      if (location.pathname === '/' || !location.pathname.startsWith(`/${savedLocale}`)) {
        navigate(`/${savedLocale}${location.pathname}`);
      }
      return;
    }

    // Otherwise detect from browser
    const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
    const detected: Locale = navLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
    setLocale(detected);
    if (location.pathname === '/' || !location.pathname.startsWith(`/${detected}`)) {
      navigate(`/${detected}${location.pathname}`);
    }
  // We only want to run this on first mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    window.localStorage.setItem('site-locale', newLocale);
    const currentPath = location.pathname;
    // remove existing /fr or /en prefix
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}` || `/${newLocale}`;
    navigate(newPath);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="fr">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}