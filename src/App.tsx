import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageProvider } from "./components/LanguageProvider";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Hero } from "./components/Hero";
import { MyStack } from "./components/My-Stack";


// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <LanguageProvider initialLanguage="es">
      <div ref={appRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <LanguageSwitcher />
        
        {/* Hero Section */}
        <Hero />
        
        
        {/* About Section */}
        <MyStack />

    
      </div>
    </LanguageProvider>
  );
}
