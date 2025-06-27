import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageProvider } from "./components/LanguageProvider";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import {Hero} from "./components/Hero";
import WaterEffect from "./components/Watter-Effect";
import StickyMiniSidebar from "./components/StickyMiniSidebar";

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
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Configuración global de GSAP
    gsap.set(".fade-in", { opacity: 0, y: 50 });
    gsap.set(".slide-in-left", { opacity: 0, x: -100 });
    gsap.set(".slide-in-right", { opacity: 0, x: 100 });
    gsap.set(".scale-in", { opacity: 0, scale: 0.8 });

    // Animaciones de entrada
    const tl = gsap.timeline();
    
    tl.to(".fade-in", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // ScrollTrigger para animaciones al hacer scroll
    ScrollTrigger.batch(".animate-on-scroll", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: 50,
          duration: 0.3
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: 50,
          duration: 0.3
        });
      }
    });

    // Cleanup
    return () => {
      // Limpiar ScrollTriggers de forma segura
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        try {
          trigger.kill();
        } catch (error) {
          console.warn('Error killing ScrollTrigger:', error);
        }
      });
    };
  }, []);

  return (
    <LanguageProvider initialLanguage="es">
      <div ref={appRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Water Effect - shows first */}
        {showWaterEffect && <WaterEffect />}
        
        <StickyMiniSidebar />
        {/* Main content - shows after WaterEffect */}
        {showHero && (
          <>
            <LanguageSwitcher />
            <Hero />
          </>
        )}
        
   
      </div>
    </LanguageProvider>
  );
}
