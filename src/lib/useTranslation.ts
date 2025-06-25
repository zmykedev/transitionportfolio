import { useState, createContext, useContext } from 'react';
import { translations, Language } from './translations';

// Context para el idioma
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    // Fallback si no hay contexto (para retrocompatibilidad)
    return {
      t: translations.es,
      language: 'es' as Language,
      setLanguage: (_lang: Language) => {
        console.warn('setLanguage called without LanguageProvider context');
      },
    };
  }
  
  return context;
};

// Hook para crear el provider
export const useLanguageProvider = (initialLanguage: Language = 'es') => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  return {
    language,
    setLanguage,
    t: translations[language],
  };
};

// Helper function para acceder a traducciones anidadas
export const getNestedTranslation = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}; 