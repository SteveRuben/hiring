"use client"

import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { translations } from './translations';

type Language = 'en' | 'fr';

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const defaultContext: I18nContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
};

export const I18nContext = createContext<I18nContextType>(defaultContext);

const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'prep-ai-language';

// Utilisation de PropsWithChildren pour typer correctement les props
export const I18nProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }

    return value || key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t
  };

  return ( 
    // @ts-ignore
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};