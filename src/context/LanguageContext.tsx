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
  const [locale, setLocale] = useState<Locale>(() => {
    const pathLocale = location.pathname.split('/')[1];
    return (pathLocale === 'en' ? 'en' : 'fr') as Locale;
  });

  useEffect(() => {
    const pathLocale = location.pathname.split('/')[1];
    if (pathLocale !== locale && pathLocale !== '') {
      setLocale(pathLocale as Locale);
    }
  }, [location.pathname]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    const currentPath = location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '');
    const newPath = newLocale === 'fr' ? pathWithoutLocale : `/en${pathWithoutLocale}`;
    navigate(newPath || '/');
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