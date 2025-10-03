import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './components/LanguageProvider';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Hero } from './components/Hero/Hero';
import WaterEffect from './components/Watter-Effect';
import StickyMiniSidebar from './components/StickyMiniSidebar';
import { Skills } from './components/Skills/Skils';
import { MagicScroll } from './components/MagicScroll';

// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [showHero, setShowHero] = useState(false);
  const [showWaterEffect, setShowWaterEffect] = useState(true);

  // Control timing for WaterEffect and Hero
  useEffect(() => {
    // Show WaterEffect first
    setShowWaterEffect(true);

    // After 4 seconds (2s drop + 2s wave), hide WaterEffect and show Hero
    const timer = setTimeout(() => {
      setShowWaterEffect(false);
      setShowHero(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider initialLanguage="es">
      <div
        ref={appRef}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Water Effect - shows first */}
        {showWaterEffect && <WaterEffect />}

        <StickyMiniSidebar />
        {/* Main content - shows after WaterEffect */}
        {showHero && (
          <>
            <LanguageSwitcher />
            <Hero />
            <Skills />
            <MagicScroll />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}
