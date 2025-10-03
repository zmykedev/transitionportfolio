import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './components/LanguageProvider';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Hero } from './components/Hero/Hero';
import WaterEffect from './components/Watter-Effect';
import StickyMiniSidebar from './components/StickyMiniSidebar';
import { Skills } from './components/Skills/Skils';
import { Works } from './components/Works/Works';
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
            <MagicScroll items={[
              {
                id: 1,
                title: 'Proyecto 1',
                description: 'Descripción del primer proyecto',
                color: 'from-purple-500 to-pink-500',
                icon: '🚀',
              },
              {
                id: 2,
                title: 'Proyecto 2',
                description: 'Descripción del segundo proyecto',
                color: 'from-blue-500 to-cyan-500',
                icon: '⚡',
              },
              {
                id: 3,
                title: 'Proyecto 3',
                description: 'Descripción del tercer proyecto',
                color: 'from-green-500 to-emerald-500',
                icon: '🎨',
              },
              {
                id: 4,
                title: 'Proyecto 4',
                description: 'Descripción del cuarto proyecto',
                color: 'from-orange-500 to-red-500',
                icon: '🔥',
              },
              {
                id: 5,
                title: 'Proyecto 5',
                description: 'Descripción del quinto proyecto',
                color: 'from-indigo-500 to-purple-500',
                icon: '✨',
              },
              {
                id: 6,
                title: 'Proyecto 6',
                description: 'Descripción del sexto proyecto',
                color: 'from-yellow-500 to-amber-500',
                icon: '🌟',
              },
            ]} />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}
