import { useEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageProvider } from "./components/LanguageProvider";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

// Lazy load the Hero component
const Hero = lazy(() => import("./components/Hero").then(module => ({ default: module.Hero })));

// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Loading component for Hero
const HeroLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Cargando...</p>
    </div>
  </div>
);

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
        
        {/* Hero Section with Lazy Loading */}
        <Suspense fallback={<HeroLoading />}>
          <Hero />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}
