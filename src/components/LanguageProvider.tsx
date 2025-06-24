import React from 'react';
import { LanguageContext, useLanguageProvider } from '../lib/useTranslation';
import type { Language } from '../lib/translations';

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'es' 
}) => {
  const languageProvider = useLanguageProvider(initialLanguage);
  
  return (
    <LanguageContext.Provider value={languageProvider}>
      {children}
    </LanguageContext.Provider>
  );
}; 