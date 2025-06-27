import { useRef, useState, useEffect, useCallback} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
<<<<<<< HEAD:src/components/Hero.tsx
import { useMediaQuery } from 'usehooks-ts'
import { useAtom } from 'jotai';
import { useTranslation } from "../lib/useTranslation";
import { vsCodeOpenAtom, tooltipEnabledAtom } from "../lib/atoms";
=======
import { useTranslation } from "../../lib/useTranslation";
import { performanceDebugger } from "../../lib/performanceUtils";
>>>>>>> origin:src/components/Hero/Hero.tsx
import { 
  Github, 
  Linkedin, 
  FileDown, 
  Calendar,
} from "lucide-react";


// Registrar plugins
gsap.registerPlugin(useGSAP);

<<<<<<< HEAD:src/components/Hero.tsx
export function Hero() {
  const { t, language } = useTranslation();

  const isMobile = useMediaQuery('(max-width: 768px)');
=======
// Performance monitoring utilities
class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fpsHistory: number[] = [];
  private animationCount = 0;
  private isMonitoring = false;

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.animationCount = 0;
    
    console.log('🚀 Performance monitoring started');
    this.monitorFPS();
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('⏹️ Performance monitoring stopped');
    console.log('📊 Average FPS:', this.getAverageFPS());
    console.log('📈 FPS History:', this.fpsHistory);
  }

  private monitorFPS() {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= this.lastTime + 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.fpsHistory.push(fps);
      
      // Keep only last 60 measurements
      if (this.fpsHistory.length > 60) {
        this.fpsHistory.shift();
      }
      
      // Log FPS drops
      if (fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${fps} FPS`);
        this.logPerformanceIssues();
      } else if (fps < 50) {
        console.log(`📉 Moderate FPS: ${fps} FPS`);
      }
      
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    requestAnimationFrame(() => this.monitorFPS());
  }

  getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 0;
    return Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length);
  }

  getCurrentFPS(): number {
    if (this.fpsHistory.length === 0) return 0;
    return this.fpsHistory[this.fpsHistory.length - 1];
  }

  logPerformanceIssues() {
    console.group('🔍 Performance Analysis');
    
    // Check GSAP animations
    const activeAnimations = gsap.globalTimeline.getChildren();
    console.log('🎬 Active GSAP animations:', activeAnimations.length);
    
    // Check DOM elements
    const totalElements = document.querySelectorAll('*').length;
    console.log('🏗️ Total DOM elements:', totalElements);
    
    // Check for heavy elements
    const heavyElements = document.querySelectorAll('.wave, .vscode-window, .social-buttons');
    console.log('⚖️ Heavy elements count:', heavyElements.length);
    
    // Memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('💾 Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
      });
    }
    
    console.groupEnd();
  }

  trackAnimation() {
    this.animationCount++;
    console.log(`🎭 Animation started (${this.animationCount} total)`);
  }

  trackHeavyOperation(operation: string) {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      if (duration > 16) { // More than 1 frame at 60fps
        console.warn(`🐌 Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
      }
    };
  }
}

// Global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

export default function Hero() {
  const { t } = useTranslation();
>>>>>>> origin:src/components/Hero/Hero.tsx
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const vsCodeRef = useRef<HTMLDivElement>(null);
  const vsCodeIconRef = useRef<HTMLButtonElement>(null);

  // Estado global para el VS Code usando atoms
  const [isVSCodeOpen, setIsVSCodeOpen] = useAtom(vsCodeOpenAtom);
  
  // Estado global para controlar cuándo mostrar el tooltip permanentemente
  const [tooltipEnabled, setTooltipEnabled] = useAtom(tooltipEnabledAtom);

  // Ref para saber si es la primera carga del componente
  const isInitialMount = useRef(true);
  const techStack = t.hero.techStack;

  // // Performance monitoring
  // useEffect(() => {
  //   // Start monitoring when component mounts
  //   performanceMonitor.startMonitoring();
  //   performanceDebugger.startFrameTimeTracking();
    
  //   // Add keyboard shortcut for performance debugging
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     if (e.ctrlKey && e.shiftKey && e.key === 'P') {
  //       e.preventDefault();
  //       console.group('🎯 Performance Debug Info');
  //       console.log('Current FPS:', performanceMonitor.getCurrentFPS());
  //       console.log('Active animations:', gsap.globalTimeline.getChildren().length);
  //       console.log('DOM elements:', document.querySelectorAll('*').length);
  //       console.log('Heavy elements:', document.querySelectorAll('.wave, .vscode-window, .social-buttons').length);
  //       performanceDebugger.analyzeBottlenecks();
  //       console.groupEnd();
  //     }
  //   };
    
  //   document.addEventListener('keydown', handleKeyPress);
    
  //   // Stop monitoring when component unmounts
  //   return () => {
  //     performanceMonitor.stopMonitoring();
  //     performanceDebugger.stopFrameTimeTracking();
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);

  // Función para ejecutar las animaciones de apertura del VS Code
  const executeVSCodeOpenAnimation = useCallback(() => {
    // Verificar que el elemento existe antes de animar
    if (!vsCodeRef.current) {
      console.warn('VSCode ref not available');
      return;
    }

    // Limpiar animaciones previas
    gsap.killTweensOf(vsCodeRef.current);
    gsap.killTweensOf(".code-line");
    gsap.killTweensOf(".cursor-blink");
    
    // VS Code window - estado inicial
    gsap.set(vsCodeRef.current, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      transformOrigin: "center center"
    });
    
    // Animación desde el botón hacia la posición final
    gsap.to(vsCodeRef.current, {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Efecto de typing en las líneas de código
        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length > 0) {
          codeLines.forEach((line, index) => {
            gsap.set(line, { opacity: 0 });
            gsap.to(line, {
              opacity: 1,
              duration: 0.1,
              delay: index * 0.1,
              ease: "none",
              onComplete: () => {
                if (index === codeLines.length - 1) {
                  // Mostrar cursor y comenzar parpadeo después de terminar el código
                  const cursor = document.querySelector('.cursor-blink');
                  if (cursor) {
                    gsap.to(cursor, {
                      opacity: 1,
                      duration: 0.1,
                      delay: 0.5,
                      onComplete: () => {
                        // Iniciar animación de parpadeo
                        gsap.to(cursor, {
                          opacity: 0,
                          duration: 1,
                          repeat: -1,
                          yoyo: true,
                          ease: "power1.inOut",
                        });
                      }
                    });
                  }
                }
              }
            });
          });
        }
      }
    });
  }, []);

  // Effect para reaccionar a cambios en el estado del VS Code (desde el sticky sidebar)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (isVSCodeOpen && vsCodeRef.current) {
      try {
        // Ejecutar animaciones de apertura cuando se abre desde el sticky sidebar
        executeVSCodeOpenAnimation();
      } catch (error) {
        console.warn('Error executing VS Code animation:', error);
      }
    }
  }, [isVSCodeOpen, executeVSCodeOpenAnimation]);

  // Funciones para controlar el VS Code
  const openVSCode = () => {
    if (!isVSCodeOpen) {
      setIsVSCodeOpen(true);
      executeVSCodeOpenAnimation();
    }
  };

  const closeVSCode = () => {
    if (isVSCodeOpen && vsCodeRef.current) {
      setIsVSCodeOpen(false);
      
      // Limpiar todas las animaciones previas
      gsap.killTweensOf(vsCodeRef.current);
      gsap.killTweensOf('.cursor-blink');
      gsap.killTweensOf('.code-line');
      
      // Detener y ocultar cursor
      const cursor = document.querySelector('.cursor-blink');
      if (cursor) {
        gsap.set(cursor, { opacity: 0 });
      }
      
      // Primero ocultar las líneas de código
      const codeLines = document.querySelectorAll('.code-line');
      codeLines.forEach((line, index) => {
        gsap.to(line, {
          opacity: 0,
          duration: 0.05,
          delay: index * 0.02,
          ease: "none"
        });
      });
      
      // Luego cerrar la ventana
      gsap.to(vsCodeRef.current, {
        scale: 0,
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "back.in(1.7)",
      });
    }
  };

  const toggleVSCode = () => {
    if (isVSCodeOpen) {
      closeVSCode();
    } else {
      openVSCode();
    }
  };

  useGSAP(() => {
    
    // Animación del hero-location (greeting + name) - optimizada
    gsap.from(".hero-location", {
      opacity: 0,
      y: -400,
      duration: 1.4,
      ease: "power2.out",
      stagger: 0.2,
    });

  

    // Animación del hero-description - optimizada
    gsap.from(".hero-description", {
      opacity: 0,
      y: -100,
      x: -400,
      duration: 1.4,
      ease: "power2.out",
      delay: 0.2,
    });

    // Animación de botones sociales - optimizada
    gsap.from(".social-buttons", {
      opacity: 0,
      y: 400,
      scale: 0.5,
      duration: 2.8,
      delay: 0.2,
      ease: "bounce.out",
      onComplete: () => {
        
        // Habilitar tooltip después de que termine el bounce
        gsap.delayedCall(0.5, () => {
          setTooltipEnabled(true);
          
          // Agregar clase especial al botón VS Code
          if (vsCodeIconRef.current) {
            vsCodeIconRef.current.classList.add('tip-vscode-enabled');
          }

          
                     // Animación de aparición del robot asistente
           gsap.delayedCall(0.3, () => {
             
                           // Robot aparece desde atrás del botón con secuencia controlada
              gsap.timeline()
                .to('.robot-container', {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  duration: 1.2,
                  ease: "back.out(2)",
                  onComplete: () => {
                    
                    // Robot "flotando" en el aire
                    gsap.to('.robot-body', {
                      y: "-=8",
                      duration: 2.5,
                      ease: "sine.inOut",
                      yoyo: true,
                      repeat: -1
                    });
                    
                    // Rotación sutil del robot como si estuviera "pensando"
                    gsap.to('.robot-body', {
                      rotation: "3",
                      duration: 4,
                      ease: "sine.inOut",
                      yoyo: true,
                      repeat: -1
                    });
                  }
                })
                .to('.speech-bubble', {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                  delay: 0.3
                })
                .to('.speaking-text', {
                  opacity: 1,
                  duration: 0.8
                })
                .to('.speech-bubble', {
                  scale: 1.02,
                  duration: 1.5,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1
                })
               
           });
        });
      }
    });

    // VS Code window - estado inicial
    gsap.set(".vscode-window", {
      scale: 0,
      opacity: 0,
      x: 200,
      y: 200
    });

    // Ocultar líneas de código inicialmente
    gsap.set(".code-line", {
      opacity: 0
    });

    // Detener cualquier animación del cursor y ocultarlo siempre al cambiar idioma
    gsap.killTweensOf(".cursor-blink");
    gsap.set(".cursor-blink", {
      opacity: 0
    });

    // Abrir VS Code automáticamente después de un delay
    gsap.delayedCall(.2, () => {
      if (vsCodeRef.current) {
        setIsVSCodeOpen(true);
        executeVSCodeOpenAnimation();
      }
    });

    // Efecto de ondas en el fondo - optimizado
    const createWaveEffect = () => {
      
      const waves = document.querySelectorAll('.wave');
      
      waves.forEach((wave, index) => {
        gsap.to(wave, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      });
      
    };

    // Efecto de ondas con delay
    gsap.delayedCall(1, createWaveEffect);


    // Animación para las medallas flotantes
    gsap.from(".floating-tag", {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      delay: 1.2
    });

    // Animación del avión
    gsap.fromTo('.airplane-svg', 
        { x: '-20vw', y: '25vh', rotate: 25, scale: 0.8 },
        {
            x: '65vw',
            y: '35vh',
            rotate: -15,
            scale: 2,
            duration: 4,
            delay: 1,
            ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
            onComplete: () => {
                // Floating animation
                gsap.to('.airplane-svg', {
                    y: '+=15',
                    rotate: '+=3',
                    duration: 2.5,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });

                            // Additional flight animation after a delay
            if (isMobile) {
              gsap.delayedCall(.2, () => {
                  // Detener las animaciones de flotación antes de la segunda animación
                  gsap.killTweensOf('.airplane-svg');
                  
                  // Usar 'to' en lugar de 'fromTo' para evitar el salto repentino
                  gsap.to('.airplane-svg', {
                      x: '120vw',
                      y: '20vh',
                      duration: 1,
                      ease: 'power1.inOut',
                      onComplete: () => {
                         gsap.fromTo('.airplane-svg', 
                           { x: '50vw', y: -200, rotate: 140 }, 
                           { y: 750, x: '40vw', duration: 2, ease: 'power2.out', rotate: 120 }
                         );
                       }
                     
                  });
              });
            }
            }
        }
    );

  }, { 
    scope: heroRef,
    dependencies: [t.hero.greeting, t.hero.name, t.hero.location, t.hero.description],
    revertOnUpdate: true
  });

  const vh =   language === 'pt' || language === 'fr' ? 'h-[165vh]' : 'h-[160vh]';

  return (
    <section 
      ref={heroRef}
      className={`${vh} sm:h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8`}
    >
      {/* Efectos de ondas - simplificados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="wave absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl lg:blur-3xl"></div>
      </div>

      {/* Airplane */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
        <span role="img" aria-label="airplane" className="airplane-svg absolute text-6xl">✈️</span>
      </div>

      {/* Main Content - Responsive Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-2 items-center">
        
        {/* Left Side - Content */}
        <div ref={textRef} className="text-center xl:text-left order-1 xl:order-1">
          {/* Greeting */}
          <div>
          <h1 className="hero-location text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 transform-gpu">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {t.hero.greeting}
            </span>{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text">
              {t.hero.name}
            </span> 
          </h1>

          <p className="hero-location text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4">
              {t.hero.location}
            </p>
          </div>
          
          {/* Description */}
          <div className="mb-6 sm:mb-8">
           
            <p className="hero-description text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto xl:mx-0">
              {t.hero.description}
            </p>
            
      
          </div>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="social-buttons flex flex-wrap gap-3 sm:gap-4 justify-center xl:justify-start">
            {/* GitHub */}
            <a
              href="https://github.com/zmykedev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Github className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 hidden sm:inline">{t.hero.github}</span>
              <span className="relative z-10 sm:hidden">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mzapatadvlpr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Linkedin className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 hidden sm:inline">{t.hero.linkedin}</span>
              <span className="relative z-10 sm:hidden">LinkedIn</span>
            </a>

            {/* Download CV */}
            <a
              href="/src/assets/CVMaikolZapata.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FileDown className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 hidden sm:inline">{t.hero.downloadCV}</span>
              <span className="relative z-10 sm:hidden">CV</span>
            </a>

            {/* Schedule Call */}
            <a
              href="https://calendly.com/zmaikol399"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Calendar className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 hidden sm:inline">{t.hero.scheduleCall}</span>
              <span className="relative z-10 sm:hidden">Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/56981514796"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.6-1.72c1.87 1 3.97 1.53 6.2 1.53h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-1.97 0-3.9-.5-5.6-1.44l-.4-.22-3.92 1.02 1.05-3.82-.26-.39c-1.08-1.65-1.65-3.57-1.65-5.56 0-5.67 4.61-10.28 10.28-10.28s10.28 4.61 10.28 10.28-4.61 10.28-10.28 10.28zm5.62-7.67c-.31-.16-1.85-.91-2.13-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.54 1.13 3.03 1.29 3.24.16.21 2.23 3.41 5.41 4.65.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.85-.76 2.11-1.5.26-.74.26-1.37.18-1.5-.08-.13-.28-.21-.59-.37z"/>
              </svg>
              <span className="relative z-10 hidden sm:inline">{t.hero.whatsapp}</span>
              <span className="relative z-10 sm:hidden">WhatsApp</span>
            </a>

                        {/* VSCode - Solo visible en desktop */}
            <div className="relative hidden md:block">
              <button
                ref={vsCodeIconRef}
                onClick={toggleVSCode}
                className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base z-10 ${
                  isVSCodeOpen 
                    ? 'shadow-lg ' 
                    : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="relative z-10 w-5 h-5 sm:w-6 sm:h-6" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.29 4.1L18.37 1.18C18.17 0.98 17.89 0.87 17.6 0.87C17.31 0.87 17.03 0.98 16.83 1.18L2.71 15.3C2.31 15.7 2.31 16.33 2.71 16.73L5.63 19.65C5.83 19.85 6.11 19.96 6.4 19.96C6.69 19.96 6.97 19.85 7.17 19.65L21.29 5.53C21.69 5.13 21.69 4.5 21.29 4.1Z"/>
                </svg>
              </button>

                            {/* Robot Assistant */}
              {tooltipEnabled && (
                <div className={`fixed top-2 right-4 z-50 ${language === 'fr' || language === 'pt' ? 'mt-20' : ''}`}>
                  {/* Robot que sale de atrás */}
                  <div className="robot-container relative opacity-0 scale-0" style={{transform: 'translateX(-40px) translateY(-20px) rotate(-45deg)'}}>
                    {/* Robot */}
                    <div className="robot-body text-4xl transform-gpu" style={{filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'}}>
                      🤖
                    </div>
                    
                    {/* Globo de diálogo */}
                    <div className="speech-bubble absolute -top-8 left-10 bg-white text-gray-800 text-xs font-medium py-2 px-3 rounded-xl shadow-lg border border-gray-200 whitespace-nowrap max-w-xs opacity-0 scale-0">
                     <span className="speaking-text opacity-0">
                          {isVSCodeOpen ? t.hero.vsCode.closeTooltip : t.hero.vsCode.openTooltip}
                         </span>
                      
                      {/* Cola del globo apuntando al robot */}
                      <div className="absolute top-full left-8 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                      </div>
                      
               
                    </div>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Visual Studio Code Interface */}
        <div className="flex justify-center xl:justify-center order-2 xl:order-2 mb-8 xl:mb-0">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            {/* Floating Medals */}
            {techStack.map((tag: string, index: number) => {
              const angle = (index / 10) * 2 * Math.PI - Math.PI / 2; // Start from top
<<<<<<< HEAD:src/components/Hero.tsx
              const left = 50 + 40 * Math.cos(angle);
              const top = 50 + 40 * Math.sin(angle); // Use 40 for vertical radius to create a slight oval shape
=======
              const left = 40 + 30 * Math.cos(angle);
              const top = 40 + 30 * Math.sin(angle); // Use 40 for vertical radius to create a slight oval shape
>>>>>>> origin:src/components/Hero/Hero.tsx
              
              return (
                <div
                  key={index}
                  className={`absolute bg-gray-800/60 backdrop-blur-md text-white font-bold py-2 px-5 rounded-full shadow-lg border border-gray-700/50 transform-gpu floating-tag`}
                  style={{
                    zIndex: -1,
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {tag}
                </div>
              );
            })}

            {/* VS Code Window */}
            <div ref={vsCodeRef} className="vscode-window bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
              {/* VS Code Header */}
              <div className="bg-gray-800 px-3 sm:px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-125 transition-all" onClick={closeVSCode}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm ml-2 truncate">{t.hero.vsCode.fileName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* VS Code Sidebar */}
              <div className="flex">
                <div className="w-6 sm:w-8 pl-2 bg-gray-800 flex flex-col items-center py-2 space-y-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                    </svg>
                  </div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 bg-gray-900">
                  {/* Line Numbers */}
                  <div className="flex">
                    <div className="w-6 sm:w-8 bg-gray-800 text-gray-500 text-xs py-2 px-1 sm:px-2 text-right select-none">
                      <div className="h-5 leading-5">1</div>
                      <div className="h-5 leading-5">2</div>
                      <div className="h-5 leading-5">3</div>
                      <div className="h-5 leading-5">4</div>
                      <div className="h-5 leading-5">5</div>
                      <div className="h-5 leading-5">6</div>
                      <div className="h-5 leading-5">7</div>
                      <div className="h-5 leading-5">8</div>
                      <div className="h-5 leading-5">9</div>
                      <div className="h-5 leading-5">10</div>
                      <div className="h-5 leading-5">11</div>
                      <div className="h-5 leading-5">12</div>
                      <div className="h-5 leading-5">13</div>
                      <div className="h-5 leading-5">14</div>
                      <div className="h-5 leading-5">15</div>
                      <div className="h-5 leading-5">16</div>
                      <div className="h-5 leading-5">17</div>
                      <div className="h-5 leading-5">18</div>
                      <div className="h-5 leading-5">19</div>
                      <div className="h-5 leading-5">20</div>
                      <div className="h-5 leading-5">21</div>
                      <div className="h-5 leading-5">22</div>
                      <div className="h-5 leading-5">23</div>
                    </div>

                    {/* Code Content */}
                    <div className="vscode-content flex-1 p-2 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-purple-400">import</span> <span className="text-blue-400">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-purple-400">import</span> <span className="text-blue-400">classes</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./styles'</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-purple-400">import</span> <span className="text-blue-400">clsx</span> <span className="text-purple-400">from</span> <span className="text-green-400">'clsx'</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <br/>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-gray-500">/**</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-500">@description</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-300">{t.hero.vsCode.description}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-500">@author</span> <span className="text-blue-400">{t.hero.vsCode.author}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-500">@param</span> <span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span> <span className="text-gray-300">- {t.hero.vsCode.buttonIndexComment}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-500">@param</span> <span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span> <span className="text-gray-300">- {t.hero.vsCode.stepEnabledComment}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;* <span className="text-gray-500">@returns</span> <span className="text-blue-400">string</span> <span className="text-gray-300">- {t.hero.vsCode.cssClassesComment}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;*/<span className="text-gray-500"></span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">{t.hero.vsCode.functionName}</span> <span className="text-gray-400">=</span> <span className="text-purple-400">(</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;<span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-gray-400">:</span> <span className="text-blue-400">number</span><span className="text-gray-400">,</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;<span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span><span className="text-gray-400">:</span> <span className="text-blue-400">boolean</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        <span className="text-purple-400">)</span><span className="text-gray-400">:</span> <span className="text-blue-400">string</span> <span className="text-gray-400">=&gt;</span> <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-purple-400">(</span><span className="text-yellow-400">step</span> <span className="text-gray-400">===</span> <span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-purple-400">)</span> <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">classes.button.selected</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">)</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap h-5 leading-5">
                        &nbsp;&nbsp;<span className="text-blue-400">{'}'}</span>
                      </div>
                      <div className="cursor-blink h-5 leading-5">|</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VS Code Status Bar */}
              <div className="bg-gray-800 px-3 sm:px-4 py-1 text-xs text-gray-400 flex justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">{t.hero.vsCode.language}</span>
                  <span>{t.hero.vsCode.lineNumber}</span>
                  {!isVSCodeOpen && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-xs">{t.hero.vsCode.initializing}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">{t.hero.vsCode.encoding}</span>
                  <span className="hidden sm:inline">{t.hero.vsCode.lineEnding}</span>
                  {isVSCodeOpen && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs">{t.hero.vsCode.ready}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
} 