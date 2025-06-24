import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useTranslation } from "../lib/useTranslation";
import { 
  Github, 
  Linkedin, 
  FileDown, 
  Calendar,
} from "lucide-react";

// Registrar plugins
gsap.registerPlugin(TextPlugin, MorphSVGPlugin);

export function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crear partículas flotantes
      const createParticles = () => {
        const particlesContainer = particlesRef.current;
        if (!particlesContainer) return;

        // Limpiar partículas existentes
        particlesContainer.innerHTML = '';

        // Crear partículas responsivas (menos en móvil)
        const particleCount = window.innerWidth < 768 ? 20 : window.innerWidth < 1024 ? 35 : 50;
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            pointer-events: none;
          `;
          particlesContainer.appendChild(particle);

          // Animación individual de cada partícula
          gsap.set(particle, { opacity: 0, scale: 0 });
          gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.3,
            scale: 1,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            ease: "power2.out"
          });

          // Animación flotante continua
          gsap.to(particle, {
            y: -100 - Math.random() * 200,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5
          });
        }
      };

      // Timeline principal con efectos increíbles
      const tl = gsap.timeline();

      // Efecto de distorsión inicial
      tl.to(heroRef.current, {
        duration: 0.1,
        skewX: 10,
        skewY: 5,
        ease: "power2.inOut"
      })
      .to(heroRef.current, {
        duration: 0.3,
        skewX: 0,
        skewY: 0,
        ease: "power2.out"
      });

      // Animación del nombre con efecto de escritura
      tl.to(".hero-name", {
        duration: 2,
        text: t.hero.name,
        ease: "none",
        delay: 0.5
      }, "-=0.5");

      // Efecto de partículas
      tl.call(createParticles, [], 0.5);

      // Animación de los botones con efecto de explosión
      if (buttonsRef.current?.children) {
        tl.fromTo(buttonsRef.current.children,
          { 
            opacity: 0, 
            y: 50, 
            scale: 0,
            rotation: 180
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotation: 0,
            duration: 1, 
            stagger: 0.1,
            ease: "back.out(1.7)"
          },
          "-=0.5"
        );
      }

      // Animación del scroll indicator con efecto de rebote infinito
      tl.fromTo(".scroll-indicator",
        { 
          opacity: 0, 
          y: 20,
          scale: 0,
          rotation: 360
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        },
        "-=0.3"
      );

      // Animación continua del scroll indicator con efecto de rebote
      gsap.to(".scroll-indicator", {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Efecto de ondas en el fondo
      const createWaveEffect = () => {
        const waves = document.querySelectorAll('.wave');
        waves.forEach((wave, index) => {
          gsap.to(wave, {
            y: -20,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
          });
        });
      };

      tl.call(createWaveEffect, [], 1);

      // Typewriter animation
      const typewriterElement = typewriterRef.current;
      if (typewriterElement && t.typewriter?.words) {
        let currentWordIndex = 0;
        
        const typeNextWord = () => {
          const currentWord = t.typewriter.words[currentWordIndex];
          
          // Type the word
          gsap.to(typewriterElement, {
            duration: 2,
            text: currentWord,
            ease: "none",
            onComplete: () => {
              // Wait a bit, then delete
              gsap.delayedCall(1.5, () => {
                gsap.to(typewriterElement, {
                  duration: 1,
                  text: "",
                  ease: "none",
                  onComplete: () => {
                    // Move to next word
                    currentWordIndex = (currentWordIndex + 1) % t.typewriter.words.length;
                    typeNextWord();
                  }
                });
              });
            }
          });
        };
        
        // Start the typewriter effect
        tl.call(typeNextWord, [], 2);
      }

      // Typing animation for VS Code
      const codeLines = document.querySelectorAll('.typing-line');
      codeLines.forEach((line) => {
        // Show code immediately instead of typing animation
        gsap.set(line, { opacity: 1 });
      });

      // Blinking cursor animation
      gsap.to('.cursor-blink', {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1
      });

    }, heroRef);

    return () => ctx.revert();
  }, [t.hero.name, t.typewriter?.words]);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zmykedev",
      label: t.hero.github,
      gradient: "from-gray-700 to-gray-900",
      hoverGradient: "from-gray-800 to-black"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mzapatadvlpr/",
      label: t.hero.linkedin,
      gradient: "from-blue-500 to-blue-700",
      hoverGradient: "from-blue-600 to-blue-800"
    },
    {
      icon: FileDown,
      href: "/src/assets/CVMaikolZapata.pdf",
      label: t.hero.downloadCV,
      gradient: "from-gray-500 to-gray-700",
      hoverGradient: "from-gray-600 to-gray-800",
      download: true
    },
    {
      icon: Calendar,
      href: "https://calendly.com/zmaikol399",
      label: t.hero.scheduleCall,
      gradient: "from-purple-500 to-purple-700",
      hoverGradient: "from-purple-600 to-purple-800"
    },
    {
      icon: (props: any) => (
        // Simple WhatsApp SVG icon
        <svg {...props} viewBox="0 0 32 32" fill="currentColor" width="1.2em" height="1.2em">
          <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.6-1.72c1.87 1 3.97 1.53 6.2 1.53h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-1.97 0-3.9-.5-5.6-1.44l-.4-.22-3.92 1.02 1.05-3.82-.26-.39c-1.08-1.65-1.65-3.57-1.65-5.56 0-5.67 4.61-10.28 10.28-10.28s10.28 4.61 10.28 10.28-4.61 10.28-10.28 10.28zm5.62-7.67c-.31-.16-1.85-.91-2.13-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.54 1.13 3.03 1.29 3.24.16.21 2.23 3.41 5.41 4.65.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.85-.76 2.11-1.5.26-.74.26-1.37.18-1.5-.08-.13-.28-.21-.59-.37z"/>
        </svg>
      ),
      href: "https://wa.me/56981514796",
      label: t.hero.whatsapp,
      gradient: "from-green-400 to-green-600",
      hoverGradient: "from-green-500 to-green-700"
    }
  ];

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
    >
      {/* Partículas flotantes */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Efectos de ondas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="wave absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="wave absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl lg:blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Content - Responsive Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
        
        {/* Left Side - Content */}
        <div ref={textRef} className="text-center xl:text-left order-2 xl:order-1">
          {/* Greeting */}
          <h1 className="hero-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 transform-gpu">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {t.hero.greeting}
            </span>{" "}
            <span className="hero-name text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text"></span>
          </h1>
          
          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <p className="hero-text text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4">
              {t.hero.location}
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto xl:mx-0">
              {t.hero.description}
            </p>
            
            {/* Typewriter Effect */}
            <div className="mt-4 sm:mt-6">
              <div 
                ref={typewriterRef}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center xl:justify-start"
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-3 sm:gap-4 justify-center xl:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                download={link.download}
                className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r ${link.gradient} hover:${link.hoverGradient} text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transform-gpu overflow-hidden text-sm sm:text-base`}
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <link.icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10 hidden sm:inline">{link.label}</span>
                <span className="relative z-10 sm:hidden">{link.label.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Visual Studio Code Interface */}
        <div className="flex justify-center xl:justify-end order-1 xl:order-2 mb-8 xl:mb-0">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            {/* VS Code Window */}
            <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
              {/* VS Code Header */}
              <div className="bg-gray-800 px-3 sm:px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
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
                <div className="w-6 sm:w-8 bg-gray-800 flex flex-col items-center py-2 space-y-2">
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
                    <div className="w-8 sm:w-12 bg-gray-800 text-gray-500 text-xs py-2 px-1 sm:px-2 text-right select-none">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                      <div>9</div>
                      <div>10</div>
                      <div>11</div>
                      <div>12</div>
                      <div>13</div>
                      <div>14</div>
                      <div>15</div>
                      <div>16</div>
                      <div>17</div>
                      <div>18</div>
                      <div>19</div>
                      <div>20</div>
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 p-2 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
                      <div className="typing-line whitespace-nowrap">
                        <span className="text-gray-500">/**</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-500">@description</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-300">{t.hero.vsCode.description}</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-500">@author</span> <span className="text-blue-400">{t.hero.vsCode.author}</span><span className="text-gray-500">.</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;*/<span className="text-gray-500">;</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">{t.hero.vsCode.functionName}</span> <span className="text-gray-400">=</span> <span className="text-purple-400">(</span><span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-gray-400">:</span> <span className="text-blue-400">number</span><span className="text-gray-400">,</span> <span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span><span className="text-gray-400">:</span> <span className="text-blue-400">boolean</span><span className="text-purple-400">)</span> <span className="text-gray-400">=&gt;</span> <span className="text-blue-400">{'{'}</span>
                        <span className="text-gray-500"></span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-purple-400">(</span><span className="text-yellow-400">step</span> <span className="text-gray-400">===</span> <span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-purple-400">)</span> <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.selected</span><span className="text-purple-400">)</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-blue-400">{'}'}</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        <br/>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">?</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.normal</span><span className="text-purple-400">)</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">:</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.disabled</span><span className="text-purple-400">)</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="typing-line whitespace-nowrap">
                        <span className="text-blue-400">{'}'}</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="cursor-blink">|</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VS Code Status Bar */}
              <div className="bg-gray-800 px-3 sm:px-4 py-1 text-xs text-gray-400 flex justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">{t.hero.vsCode.language}</span>
                  <span>{t.hero.vsCode.lineNumber}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline">{t.hero.vsCode.encoding}</span>
                  <span className="hidden sm:inline">{t.hero.vsCode.lineEnding}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 