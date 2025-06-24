import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../lib/useTranslation';
import type { Language } from '../lib/translations';

const languages = [
  { code: 'es', label: 'ES', flag: 'fi fi-es' },
  { code: 'en', label: 'US', flag: 'fi fi-us' },
  { code: 'pt', label: 'BR', flag: 'fi fi-br' },
  { code: 'fr', label: 'FR', flag: 'fi fi-fr' }
] as const;

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
      >
        <span className={`${currentLanguage.flag} text-xl`}></span>
        <span className="text-xs font-bold ml-2">{currentLanguage.label}</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 overflow-hidden"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as Language)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-3 text-white font-medium transition-colors duration-200 ${
                  language === lang.code ? 'bg-white/30' : 'hover:bg-white/20'
                }`}
                aria-label={lang.label}
              >
                <span className={`${lang.flag} text-xl`}></span>
                <span className="text-xs font-bold ml-2">{lang.label}</span>
                <div className="ml-auto">
                  {language === lang.code ? (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  ) : (
                    <div className="w-2 h-2 border border-white/50 rounded-full"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 