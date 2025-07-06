import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
import { useTranslation } from '../lib/useTranslation';
import type { Language } from '../lib/translations';

const languages = [
  { code: 'es', label: 'ES', flag: 'fi fi-es' },
  { code: 'en', label: 'US', flag: 'fi fi-us' },
  { code: 'pt', label: 'BR', flag: 'fi fi-br' },
  { code: 'fr', label: 'FR', flag: 'fi fi-fr' },
] as const;

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const currentLanguage =
    languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  // Mobile version - Carousel selector with arrows
  if (isMobile) {
    const currentIndex = languages.findIndex(lang => lang.code === language);

    const goToPrevious = () => {
      const prevIndex =
        currentIndex === 0 ? languages.length - 1 : currentIndex - 1;
      handleLanguageChange(languages[prevIndex].code as Language);
    };

    const goToNext = () => {
      const nextIndex =
        currentIndex === languages.length - 1 ? 0 : currentIndex + 1;
      handleLanguageChange(languages[nextIndex].code as Language);
    };

    return (
      <div className="fixed right-4 top-2 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-2 py-1 backdrop-blur-md"
        >
          {/* Left Arrow */}
          <motion.button
            onClick={goToPrevious}
            whileTap={{ scale: 0.8 }}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            aria-label="Previous language"
          >
            <svg
              className="h-3 w-3 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Current Flag */}
          <motion.div
            key={language}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
          >
            <span className={`${currentLanguage.flag} text-lg`} />
          </motion.div>

          {/* Right Arrow */}
          <motion.button
            onClick={goToNext}
            whileTap={{ scale: 0.8 }}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
            aria-label="Next language"
          >
            <svg
              className="h-3 w-3 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Desktop version - Original dropdown
  return (
    <div className="fixed right-4 top-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-3 py-2 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30"
      >
        <span className={`${currentLanguage.flag} text-xl`}></span>
        <span className="ml-2 text-xs font-bold">{currentLanguage.label}</span>
        <motion.svg
          className="h-4 w-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 overflow-hidden rounded-lg border border-white/30 bg-white/20 backdrop-blur-md"
          >
            {languages.map(lang => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as Language)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-white transition-colors duration-200 ${
                  language === lang.code ? 'bg-white/30' : 'hover:bg-white/20'
                }`}
                aria-label={lang.label}
              >
                <span className={`${lang.flag} text-xl`}></span>
                <span className="ml-2 text-xs font-bold">{lang.label}</span>
                <div className="ml-auto">
                  {language === lang.code ? (
                    <motion.div
                      layoutId="activeIndicator"
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full border border-white/50"></div>
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
