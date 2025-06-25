import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "../lib/useTranslation";
import { 
  Github, 
  Linkedin, 
  FileDown, 
  Calendar,
} from "lucide-react";

// Registrar plugins
gsap.registerPlugin(useGSAP);

export function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const vsCodeRef = useRef<HTMLDivElement>(null);
  const vsCodeIconRef = useRef<HTMLButtonElement>(null);

  // Estado para el VS Code
  const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);

  // Funciones para controlar el VS Code
  const openVSCode = () => {
    if (!isVSCodeOpen) {
      setIsVSCodeOpen(true);
      
      // Animación simplificada para mejor rendimiento
      gsap.to(vsCodeRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const closeVSCode = () => {
    if (isVSCodeOpen) {
      setIsVSCodeOpen(false);
      
      gsap.to(vsCodeRef.current, {
        scale: 0,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in"
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
      y: -100,
      duration: 0.6,
      ease: "power2.out"
    });

    // Animación del hero-description - optimizada
    gsap.from(".hero-description", {
      opacity: 0,
      x: 100,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });

    // Animación de botones sociales - optimizada
    gsap.from(".social-buttons", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.4
    });

    // VS Code window - estado inicial
    gsap.set(".vscode-window", {
      scale: 0,
      opacity: 0,
      y: 20
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
          delay: index * 0.2
        });
      });
    };

    // Efecto de ondas con delay
    gsap.delayedCall(1, createWaveEffect);

    // Blinking cursor animation - optimizado
    gsap.to('.cursor-blink', {
      opacity: 0,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });

  }, { 
    scope: heroRef,
    dependencies: [t.hero.greeting, t.hero.name, t.hero.location, t.hero.description]
  });

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
    >
      {/* Efectos de ondas - simplificados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="wave absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl lg:blur-3xl"></div>
      </div>

      {/* Main Content - Responsive Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-2 items-center">
        
        {/* Left Side - Content */}
        <div ref={textRef} className="text-center xl:text-left order-2 xl:order-1">
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
          </div>
        </div>

        {/* Right Side - Visual Studio Code Interface */}
        <div className="flex justify-center xl:justify-end order-1 xl:order-2 mb-8 xl:mb-0">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
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
                    <div className="vscode-content flex-1 p-2 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
                      <div className="code-line typing-line whitespace-nowrap">
                        <span className="text-gray-500">/**</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-500">@description</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-300">{t.hero.vsCode.description}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;* <span className="text-gray-500">@author</span> <span className="text-blue-400">{t.hero.vsCode.author}</span><span className="text-gray-500">.</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;*/<span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">{t.hero.vsCode.functionName}</span> <span className="text-gray-400">=</span> <span className="text-purple-400">(</span><span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-gray-400">:</span> <span className="text-blue-400">number</span><span className="text-gray-400">,</span> <span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span><span className="text-gray-400">:</span> <span className="text-blue-400">boolean</span><span className="text-purple-400">)</span> <span className="text-gray-400">=&gt;</span> <span className="text-blue-400">{'{'}</span>
                        <span className="text-gray-500"></span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-purple-400">(</span><span className="text-yellow-400">step</span> <span className="text-gray-400">===</span> <span className="text-yellow-400">{t.hero.vsCode.paramIndex}</span><span className="text-purple-400">)</span> <span className="text-blue-400">{'{'}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.selected</span><span className="text-purple-400">)</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-blue-400">{'}'}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        <br/>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-400">{t.hero.vsCode.paramIsStepEnabled}</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">?</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.normal</span><span className="text-purple-400">)</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">:</span> <span className="text-blue-400">clsx</span><span className="text-purple-400">(</span><span className="text-yellow-400">classes.button.root</span><span className="text-gray-400">,</span> <span className="text-yellow-400">classes.button.disabled</span><span className="text-purple-400">)</span><span className="text-gray-500">;</span>
                      </div>
                      <div className="code-line typing-line whitespace-nowrap">
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

            {/* Taskbar Button */}
            <div className="mt-4 flex justify-center">
              <button
                ref={vsCodeIconRef}
                onClick={toggleVSCode}
                className={`taskbar-icon p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isVSCodeOpen 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={isVSCodeOpen ? "Close VS Code" : "Open VS Code"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.29 4.1L18.37 1.18C18.17 0.98 17.89 0.87 17.6 0.87C17.31 0.87 17.03 0.98 16.83 1.18L2.71 15.3C2.31 15.7 2.31 16.33 2.71 16.73L5.63 19.65C5.83 19.85 6.11 19.96 6.4 19.96C6.69 19.96 6.97 19.85 7.17 19.65L21.29 5.53C21.69 5.13 21.69 4.5 21.29 4.1Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 