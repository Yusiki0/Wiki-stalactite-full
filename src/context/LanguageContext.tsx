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

  // Initialize locale synchronously to avoid flicker and to respect saved selection.
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const pathLocale = window.location.pathname.split('/')[1];
      if (pathLocale === 'fr' || pathLocale === 'en') return pathLocale as Locale;

      const saved = window.localStorage.getItem('site-locale');
      if (saved === 'fr' || saved === 'en') return saved as Locale;

      const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
      return navLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
    } catch (e) {
      return 'fr';
    }
  });

  // Ensure URL contains the locale prefix when missing or incorrect.
  useEffect(() => {
    const pathname = location.pathname;
    const currentPrefix = pathname.split('/')[1];

    // If path already has valid prefix, respect it and sync state if different
    if (currentPrefix === 'fr' || currentPrefix === 'en') {
      if (currentPrefix !== locale) {
        // sync state with URL (user visited a localized URL)
        setLocale(currentPrefix as Locale);
        window.localStorage.setItem('site-locale', currentPrefix);
      }
      return;
    }

    // Otherwise, redirect to the selected locale prefix (replace to avoid history spam)
    const cleanPath = pathname.replace(/^\/(fr|en)/, '');
    navigate(`/${locale}${cleanPath === '/' ? '' : cleanPath}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      window.localStorage.setItem('site-locale', newLocale);
    } catch (e) {
      // ignore storage errors
    }

    const currentPath = location.pathname;
    // remove existing /fr or /en prefix
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
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