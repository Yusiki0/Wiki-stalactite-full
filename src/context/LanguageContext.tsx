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

  // Helper: detect preferred locale from navigator languages
  const detectFromNavigator = (): Locale => {
    try {
      const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
      for (const l of langs) {
        if (!l) continue;
        const code = l.toLowerCase();
        if (code.startsWith('fr')) return 'fr';
        if (code.startsWith('en')) return 'en';
      }
    } catch (e) {
      // ignore
    }
    return 'fr';
  };

  // Initialize locale synchronously (path > localStorage > navigator > fallback)
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const segments = window.location.pathname.split('/').filter(Boolean);
      const pathLocale = segments[0];
      if (pathLocale === 'fr' || pathLocale === 'en') return pathLocale as Locale;

      const saved = window.localStorage.getItem('site-locale');
      if (saved === 'fr' || saved === 'en') return saved as Locale;

      return detectFromNavigator();
    } catch (e) {
      return 'fr';
    }
  });

  // Ensure URL contains the locale prefix when missing or incorrect.
  useEffect(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const pathLocale = segments[0];

    // If URL has a valid locale prefix, sync state (but don't navigate)
    if (pathLocale === 'fr' || pathLocale === 'en') {
      if (pathLocale !== locale) {
        setLocale(pathLocale as Locale);
        try {
          window.localStorage.setItem('site-locale', pathLocale);
        } catch (e) {
          // ignore
        }
      }
      return;
    }

    // No locale in URL: redirect to the chosen locale while preserving the path (use replace)
    const cleanPath = pathname === '/' ? '' : pathname;
    navigate(`/${locale}${cleanPath}`, { replace: true });
  }, [location.pathname, locale, navigate]);

  const handleSetLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    try {
      window.localStorage.setItem('site-locale', newLocale);
    } catch (e) {
      // ignore storage errors
    }

    const segments = location.pathname.split('/').filter(Boolean);
    // remove existing locale prefix if present
    const rest = segments.slice(1).length ? '/' + segments.slice(1).join('/') : '';
    const newPath = `/${newLocale}${rest}` || `/${newLocale}`;
    navigate(newPath, { replace: true });
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