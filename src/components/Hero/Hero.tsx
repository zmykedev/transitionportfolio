import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'usehooks-ts';
import { useAtom } from 'jotai';
import { useTranslation } from '../../lib/useTranslation';
import { vsCodeOpenAtom } from '../../lib/atoms';
import { Github, Linkedin, FileDown, Calendar } from 'lucide-react';


// Registrar plugins
gsap.registerPlugin(useGSAP);

export function Hero() {
  const { t } = useTranslation();

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const vsCodeRef = useRef<HTMLDivElement>(null);
  const vsCodeIconRef = useRef<HTMLButtonElement>(null);



  // Estado global para el VS Code usando atoms
  const [isVSCodeOpen, setIsVSCodeOpen] = useAtom(vsCodeOpenAtom);



  // Ref para saber si es la primera carga del componente
  const isInitialMount = useRef(true);

  // Función para ejecutar las animaciones de apertura del VS Code
  const executeVSCodeOpenAnimation = useCallback(() => {
    // Verificar que el elemento existe antes de animar
    if (!vsCodeRef.current) {
      console.warn('VSCode ref not available');
      return;
    }

    try {
      // Limpiar animaciones previas con validación
      if (vsCodeRef.current) {
        gsap.killTweensOf(vsCodeRef.current);
      }

      const codeLines = document.querySelectorAll('.code-line');
      if (codeLines.length > 0) {
        gsap.killTweensOf('.code-line');
      }

      const cursorBlink = document.querySelector('.cursor-blink');
      if (cursorBlink) {
        gsap.killTweensOf('.cursor-blink');
      }
    } catch (error) {
      console.warn('Error al limpiar animaciones VS Code:', error);
    }

    // VS Code window - estado inicial
    gsap.set(vsCodeRef.current, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      transformOrigin: 'center center',
    });

    // Animación desde el botón hacia la posición final
    gsap.to(vsCodeRef.current, {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
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
              ease: 'none',
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
                          ease: 'power1.inOut',
                        });
                      },
                    });
                  }
                }
              },
            });
          });
        }
      },
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

      try {
        // Limpiar todas las animaciones previas con validación
        if (vsCodeRef.current) {
          gsap.killTweensOf(vsCodeRef.current);
        }

        const cursorBlink = document.querySelector('.cursor-blink');
        if (cursorBlink) {
          gsap.killTweensOf('.cursor-blink');
          gsap.set(cursorBlink, { opacity: 0 });
        }

        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length > 0) {
          gsap.killTweensOf('.code-line');

          // Primero ocultar las líneas de código
          codeLines.forEach((line, index) => {
            gsap.to(line, {
              opacity: 0,
              duration: 0.05,
              delay: index * 0.02,
              ease: 'none',
            });
          });
        }

        // Luego cerrar la ventana
        gsap.to(vsCodeRef.current, {
          scale: 0,
          opacity: 0,
          x: 0,
          y: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'back.in(1.7)',
        });
      } catch (error) {
        console.warn('Error al cerrar VS Code:', error);
      }
    }
  };

  const toggleVSCode = () => {
    if (isVSCodeOpen) {
      closeVSCode();
    } else {
      openVSCode();
    }
  };

  useGSAP(
    () => {
      // Single unified animation for entire left block using stagger - maximum performance
      gsap.from('.left-content-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
       
      });

      // VS Code window - initial hidden state
      gsap.set('.vscode-window', {
        scale: 0.9,
        opacity: 0,
        y: 20,
      });

      // Code lines - initial hidden state
      gsap.set('.code-line', {
        opacity: 0,
        x: 0, // Respeta el padding del contenedor
      });

      // Cursor - initial hidden state
      gsap.set('.cursor-blink', {
        opacity: 0,
      });

      // VS Code independent appearance - 0.5 second delay
      gsap.delayedCall(0.1, () => {
        if (vsCodeRef.current) {
          setIsVSCodeOpen(true);
          
          // Smooth VS Code appearance animation
          gsap.fromTo(vsCodeRef.current, {
            scale: 0.9,
            opacity: 0,
            y: 20,
          }, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              // Show code lines with a subtle stagger
              gsap.fromTo('.code-line', {
                opacity: 0,
                x: 0,
              }, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
              });
              
              // Start cursor blink after code lines appear
              gsap.delayedCall(0.3, () => {
                gsap.to('.cursor-blink', {
                  opacity: 0,
                  duration: 1,
                  repeat: -1,
                  yoyo: true,
                  ease: 'power1.inOut',
                });
              });
            },
          });
        }
      });

      // Airplane landing on planet animation
      const airplaneElement = document.querySelector('.airplane-svg');
      if (airplaneElement) {
        try {
          // Create airplane landing sequence
          const airplaneTimeline = gsap.timeline({
            delay: 5, // Start 5 seconds after planet appears
          });

                                  airplaneTimeline
              // 1. Airplane approaches from left
              .fromTo('.airplane-svg', 
                { 
                  x: '-20vw', 
                  y: '45vh', 
                  rotate: 50, 
                  scale: 0.8,
                  opacity: 1
                },
                {
                  x: '55vw',
                  y: '45vh',
                  rotate: 45,
                  scale: 1.2,
                  duration: 3,
                  ease: 'power2.out'
                }
              )
              // 2. Airplane lands on planet (gets smaller)
              .to('.airplane-svg', {
                x: '60vw',
                y: '40vh',
                rotate: 0,
                scale: 0.5,
                duration: 1.5,
                ease: 'power2.inOut'
              })
              // 3. Airplane stays on planet briefly
              .to('.airplane-svg', {
                duration: 1,
                ease: 'none'
              })
              // 4. Airplane takes off (gets bigger)
              .to('.airplane-svg', {
                x: '65vw',
                y: '28vh',
                rotate: 25,
                scale: 1.5,
                duration: 1.5,
                ease: 'power2.out'
              })
            // 5. Airplane flies away to the right
            .to('.airplane-svg', {
              x: '120vw',
              y: '15vh',
              rotate: 35,
              scale: 0.6,
              duration: 3,
              ease: 'power2.in'
            });

        } catch (error) {
          console.warn('Error en animación del avión:', error);
        }
      }
    },
    {
      scope: heroRef,
      dependencies: [
        t.hero.greeting,
        t.hero.name,
        t.hero.location,
        t.hero.description,
      ],
      revertOnUpdate: true,
    }
  );

  // Cleanup function para cuando se desmonte el componente
  useEffect(() => {
    return () => {
      try {
        // Limpiar todas las animaciones al desmontar
        const airplaneElement = document.querySelector('.airplane-svg');
        if (airplaneElement) {
          gsap.killTweensOf('.airplane-svg');
        }

        // Limpiar delayed calls y timelines
        gsap.globalTimeline.killTweensOf('.airplane-svg');

        // Limpiar animaciones de ondas
        const waves = document.querySelectorAll('.wave');
        if (waves.length > 0) {
          gsap.killTweensOf('.wave');
        }


      } catch (error) {
        console.warn('Error al limpiar animaciones en desmontaje:', error);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 sm:px-6 lg:px-8"
    >
      {/* Efectos de ondas - simplificados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave absolute h-48 w-48 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-2xl sm:h-64 sm:w-64 lg:h-96 lg:w-96 lg:blur-3xl" style={{ transform: 'translate(25%, 25%)' }}></div>
        <div className="wave absolute h-48 w-48 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-2xl sm:h-64 sm:w-64 lg:h-96 lg:w-96 lg:blur-3xl" style={{ transform: 'translate(75%, 75%)' }}></div>
      </div>

      {/* Airplane */}
      <div className="absolute z-[5] h-full w-full" style={{ transform: 'translate(0, 0)' }}>
        <span
          role="img"
          aria-label="airplane"
          className="airplane-svg absolute text-6xl"
        >
          ✈️
        </span>
      </div>

      {/* Main Content - Responsive Grid Layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:gap-12 xl:grid-cols-2 xl:gap-2" style={{ contain: 'layout' }}>
        {/* Left Side - Content */}
        <div
          ref={textRef}
          className="order-1 text-center mt-[42px] xl:order-1 xl:text-left xl:mt-0"
        >
          {/* Greeting */}
          <div className="left-content-item">
            <h1 className="mb-4 transform-gpu text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {t.hero.greeting}
              </span>{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>

            <h2 className="text-md mb-3 text-gray-300 sm:mb-4 sm:text-xl md:text-2xl">
              {t.hero.location}
            </h2>
          </div>

          {/* Description */}
          <div className="left-content-item mb-6 sm:mb-8">
            <p className="mx-auto max-w-lg rounded-xl border border-white/10 bg-gradient-to-r from-yellow-200/30 via-pink-200/20 to-blue-200/30 px-5 py-4 text-base font-semibold leading-relaxed text-gray-100 shadow-lg backdrop-blur-md sm:text-lg xl:mx-0">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text font-extrabold text-transparent">
                {t.hero.description}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div
            ref={buttonsRef}
            className="left-content-item flex flex-wrap justify-center gap-3 sm:gap-4 xl:justify-start"
          >
            {/* GitHub */}
            <a
              href="https://github.com/zmykedev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-gray-800 hover:to-black hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
            >
              <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <Github className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5" />
              <span className="relative z-10 hidden sm:inline">
                {t.hero.github}
              </span>
              <span className="relative z-10 sm:hidden">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mzapatadvlpr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-blue-600 hover:to-blue-800 hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
            >
              <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <Linkedin className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5" />
              <span className="relative z-10 hidden sm:inline">
                {t.hero.linkedin}
              </span>
              <span className="relative z-10 sm:hidden">LinkedIn</span>
            </a>

            {/* Download CV */}
            <a
              href="/src/assets/MaikolZapata2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group relative flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gray-500 to-gray-700 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-gray-600 hover:to-gray-800 hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
            >
              <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <FileDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5" />
              <span className="relative z-10 hidden sm:inline">
                {t.hero.downloadCV}
              </span>
              <span className="relative z-10 sm:hidden">CV</span>
            </a>

            {/* Schedule Call */}
            <a
              href="https://calendly.com/zmaikol399"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-purple-600 hover:to-purple-800 hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
            >
              <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <Calendar className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5" />
              <span className="relative z-10 hidden sm:inline">
                {t.hero.scheduleCall}
              </span>
              <span className="relative z-10 sm:hidden">Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/56981514796"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-green-400 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-green-500 hover:to-green-700 hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
            >
              <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 sm:h-5 sm:w-5"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.6-1.72c1.87 1 3.97 1.53 6.2 1.53h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-1.97 0-3.9-.5-5.6-1.44l-.4-.22-3.92 1.02 1.05-3.82-.26-.39c-1.08-1.65-1.65-3.57-1.65-5.56 0-5.67 4.61-10.28 10.28-10.28s10.28 4.61 10.28 10.28-4.61 10.28-10.28 10.28zm5.62-7.67c-.31-.16-1.85-.91-2.13-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.54 1.13 3.03 1.29 3.24.16.21 2.23 3.41 5.41 4.65.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.85-.76 2.11-1.5.26-.74.26-1.37.18-1.5-.08-.13-.28-.21-.59-.37z" />
              </svg>
              <span className="relative z-10 hidden sm:inline">
                {t.hero.whatsapp}
              </span>
              <span className="relative z-10 sm:hidden">WhatsApp</span>
            </a>

            {/* VSCode - Solo visible en desktop */}
            <div className="relative hidden md:block">
              <button
                ref={vsCodeIconRef}
                onClick={toggleVSCode}
                className={`group relative z-10 flex transform-gpu items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:from-blue-700 hover:to-blue-900 hover:shadow-2xl sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base ${
                  isVSCodeOpen ? 'shadow-lg' : ''
                }`}
              >
                <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                <svg
                  className="relative z-10 h-5 w-5 sm:h-6 sm:w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.29 4.1L18.37 1.18C18.17 0.98 17.89 0.87 17.6 0.87C17.31 0.87 17.03 0.98 16.83 1.18L2.71 15.3C2.31 15.7 2.31 16.33 2.71 16.73L5.63 19.65C5.83 19.85 6.11 19.96 6.4 19.96C6.69 19.96 6.97 19.85 7.17 19.65L21.29 5.53C21.69 5.13 21.69 4.5 21.29 4.1Z" />
                </svg>
              </button>

              
            </div>
          </div>
        </div>

        {/* Right Side - Visual Studio Code Interface */}
        <div className="order-2 mb-8 flex justify-center xl:order-2 xl:mb-0 xl:justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">

            {/* Planet Earth Animation - Behind VS Code */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: -1 }}>
              {!isVSCodeOpen && (
                <div className="planet-container">
                  <div className="night"></div>
                  <div className="day"></div>
                  <div className="clouds"></div>
                  <div className="inner-shadow"></div>
                </div>
              )}
            </div>

            {/* VS Code Window */}
            <div
              ref={vsCodeRef}
              className="vscode-window overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-2xl"
              style={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            >
              {/* VS Code Header */}
              <div className="flex items-center justify-between bg-gray-800 px-3 py-2 sm:px-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 cursor-pointer rounded-full bg-red-500 transition-all hover:brightness-125 sm:h-3 sm:w-3"
                      onClick={closeVSCode}
                    ></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
                  </div>
                  <span className="ml-2 truncate text-xs text-gray-400 sm:text-sm">
                    {t.hero.vsCode.fileName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 text-gray-500 sm:h-4 sm:w-4">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* VS Code Sidebar */}
              <div className="flex">
                <div className="flex w-6 flex-col items-center space-y-2 bg-gray-800 py-2 pl-2 sm:w-8">
                  <div className="h-4 w-4 text-blue-500 sm:h-6 sm:w-6">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="h-4 w-4 text-gray-500 sm:h-6 sm:w-6">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <div className="h-4 w-4 text-gray-500 sm:h-6 sm:w-6">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 bg-gray-900">
                  {/* Line Numbers */}
                  <div className="flex">
                    <div className="w-6 select-none bg-gray-800 px-1 py-2 text-right text-xs text-gray-500 sm:w-8 sm:px-2">
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
                    <div className="vscode-content flex-1 overflow-x-auto font-mono text-xs text-gray-300 sm:text-sm" style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '8px', paddingBottom: '8px' }}>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-purple-400">import</span>{' '}
                        <span className="text-blue-400">React</span>{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-green-400">'react'</span>
                        <span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-purple-400">import</span>{' '}
                        <span className="text-blue-400">classes</span>{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-green-400">'./styles'</span>
                        <span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-purple-400">import</span>{' '}
                        <span className="text-blue-400">clsx</span>{' '}
                        <span className="text-purple-400">from</span>{' '}
                        <span className="text-green-400">'clsx'</span>
                        <span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <br />
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-gray-500">/**</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;*{' '}
                        <span className="text-gray-500">@description</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;*{' '}
                        <span className="text-gray-300">
                          {t.hero.vsCode.description}
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;* <span className="text-gray-500">@author</span>{' '}
                        <span className="text-blue-400">
                          {t.hero.vsCode.author}
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;* <span className="text-gray-500">@param</span>{' '}
                        <span className="text-yellow-400">
                          {t.hero.vsCode.paramIndex}
                        </span>{' '}
                        <span className="text-gray-300">
                          - {t.hero.vsCode.buttonIndexComment}
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;* <span className="text-gray-500">@param</span>{' '}
                        <span className="text-yellow-400">
                          {t.hero.vsCode.paramIsStepEnabled}
                        </span>{' '}
                        <span className="text-gray-300">
                          - {t.hero.vsCode.stepEnabledComment}
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;* <span className="text-gray-500">@returns</span>{' '}
                        <span className="text-blue-400">string</span>{' '}
                        <span className="text-gray-300">
                          - {t.hero.vsCode.cssClassesComment}
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;*/<span className="text-gray-500"></span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-blue-400">
                          {t.hero.vsCode.functionName}
                        </span>{' '}
                        <span className="text-gray-400">=</span>{' '}
                        <span className="text-purple-400">(</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;
                        <span className="text-yellow-400">
                          {t.hero.vsCode.paramIndex}
                        </span>
                        <span className="text-gray-400">:</span>{' '}
                        <span className="text-blue-400">number</span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;
                        <span className="text-yellow-400">
                          {t.hero.vsCode.paramIsStepEnabled}
                        </span>
                        <span className="text-gray-400">:</span>{' '}
                        <span className="text-blue-400">boolean</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        <span className="text-purple-400">)</span>
                        <span className="text-gray-400">:</span>{' '}
                        <span className="text-blue-400">string</span>{' '}
                        <span className="text-gray-400">=&gt;</span>{' '}
                        <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;<span className="text-purple-400">if</span>{' '}
                        <span className="text-purple-400">(</span>
                        <span className="text-yellow-400">step</span>{' '}
                        <span className="text-gray-400">===</span>{' '}
                        <span className="text-yellow-400">
                          {t.hero.vsCode.paramIndex}
                        </span>
                        <span className="text-purple-400">)</span>{' '}
                        <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-purple-400">return</span>{' '}
                        <span className="text-blue-400">clsx</span>
                        <span className="text-purple-400">(</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-yellow-400">
                          classes.button.root
                        </span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-yellow-400">
                          classes.button.selected
                        </span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-purple-400">)</span>
                        <span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line h-5 whitespace-nowrap leading-5">
                        &nbsp;&nbsp;<span className="text-blue-400">{'}'}</span>
                      </div>
                      <div className="cursor-blink h-5 leading-5">|</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VS Code Status Bar */}
              <div className="flex justify-between bg-gray-800 px-3 py-1 text-xs text-gray-400 sm:px-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">
                    {t.hero.vsCode.language}
                  </span>
                  <span>{t.hero.vsCode.lineNumber}</span>
                  {!isVSCodeOpen && (
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                      <span className="text-xs text-blue-400">
                        {t.hero.vsCode.initializing}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">
                    {t.hero.vsCode.encoding}
                  </span>
                  <span className="hidden sm:inline">
                    {t.hero.vsCode.lineEnding}
                  </span>
                  {isVSCodeOpen && (
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-400">
                        {t.hero.vsCode.ready}
                      </span>
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
