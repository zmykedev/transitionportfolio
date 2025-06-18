import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import type { Language } from '../../lib/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage: Language = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
  };
  
  return (
    <motion.button
      onClick={toggleLanguage}
      data-cursor-text={`Switch to ${language === 'es' ? 'English' : 'Español'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
    >
      <span className="text-lg">
        {language === 'es' ? '🇪🇸' : '🇺🇸'}
      </span>
      <span className="text-sm font-medium">
        {language === 'es' ? 'ES' : 'EN'}
      </span>
    </motion.button>
  );
}; 