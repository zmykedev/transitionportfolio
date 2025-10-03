import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MagicScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeTab, setActiveTab] = React.useState<{[key: number]: string}>({});

  useEffect(() => {
    const items = itemsRef.current;
    const container = containerRef.current;
    
    if (!container || items.length === 0) return;
    
   


    // Simple ScrollTrigger - show clouds appearing from below
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: 'top 10%',
      end: 'bottom bottom',
      scrub: false,
      once: true,
      onEnter: () => {
        // Create timeline for sequential animation
        const tl = gsap.timeline();
        
        // Step 1: Clouds appear from left
        tl.fromTo('.cloud', 
          { x: -300, opacity: 0.1 },
          { 
            x: 0, 
            opacity: 1,
            duration: .7, 
            ease: "power2.out",
          }
        )
        .fromTo(
            '.airplane',
            {
              x: 1200,
              y: 0,
              opacity: 1,
              rotation: 220,
              scale: 10,
            },
            {
              x: -20,
              y: 0,
              opacity: 1,
              scale: 2,
              duration: 2.5,
              ease: 'power2.inOut',
            },
            '-=0.2'
          )

          // Animate the banner
        .fromTo('.airplane-banner',
          {
            opacity: 0,
            scale: 0,
            x: -300,
            y: 0,
            rotate: 0,
          },
          {
            opacity: 1,
            scale: 1,
            x: -50,
            y: -90,
            rotate: 140,
            duration: 0.5,
            ease: "back.out(1.7)"
          }, "-=4.5"
        )

          tl.to('.airplane', {
            x: -1000,        // nueva posición X
            y: 0,        // nueva posición Y
            rotation: 220, // nueva rotación
            scale: 1,      // nuevo tamaño
            duration: 1,
            ease: 'power2.inOut',
          })
            
         
        
        
        // Step 3: Clouds disappear to the left
        .to('.cloud', 
          { 
            x: -300, 
            opacity: 0, 
            duration: .2, 
            ease: "power2.in",
            stagger: 0.1
          }, "-=0.5"
        )
        // Step 4: Cards appear behind where clouds were
        .fromTo('.cards-container',
          { opacity: 0, scale: 1 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: .1, 
            ease: "back.out(1.7)"
          }, "-=0.1"
        )
        // Step 5: Each card grows from center
        .fromTo('.magic-item',
          { 
            opacity: 0, 
            scale: 0,
            width: "100px",
            height: "100px",
            transformOrigin: "center center"
          },
          { 
            opacity: 1, 
            scale: 1,
            width: "400px",
            height: "240px",
            duration: 0.050, 
            ease: "back.out(1.7)",
            stagger: 0.0980
          }, "-=0.5"
        );
       
   
        
      },
      onLeave: () => {
        // Reverse animation when scrolling back
        gsap.to('.cards-container', { opacity: 0, scale: 0.8, duration: 0.5 });
        gsap.to('.cards-container .grid', { gap: "24px", duration: 0.3 });
        gsap.to('.magic-item', { width: "auto", height: "auto", duration: 0.3 });
        gsap.to('.airplane', { x: -300, opacity: 0, duration: 0.5 });
        gsap.to('.cloud', { x: -300, opacity: 0, duration: 0.5, stagger: 0.1 });
      }
    });

    return () => {
      // Only kill the specific ScrollTrigger for this component
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  const magicItems = [
    { 
      id: 1, 
      title: 'CMPC', 
      description: 'Gestor de libros completo con sistema de gestión de contenido y administración', 
      color: 'from-blue-500 to-cyan-500',
      icon: '📚',
      tech: '@nestjs, @google-cloud, @react, @antdesign, @tailwindcss',
      deployLink: 'https://cmpc-books.netlify.app/',
      repoLink: 'https://github.com/zmykedev/cmpc-fullstack',
      readmeContent: [
        '## Installation',
        '```bash',
        'pnpm install',
        'pnpm run start:dev',
        '```'
      ]
    },
    { 
      id: 2, 
      title: 'ImageCreator', 
      description: 'Editor de imágenes avanzado sin necesidad de prompts, con IA integrada', 
      color: 'from-purple-500 to-pink-500',
      icon: '🎨',
      tech: '@nestjs, @google/genai, @google-cloud, @react, @tailwindcss',
      deployLink: null,
      repoLink: 'https://github.com/zmykedev/nestjs',
      readmeContent: [
        '## Installation',
        '```bash',
        'pnpm install',
        'pnpm run dev',
        '```'
      ]
    },
    { 
      id: 3, 
      title: 'Tourist Go', 
      description: 'Aplicación de turismo con guías locales y recomendaciones personalizadas', 
      color: 'from-green-500 to-emerald-500',
      icon: '🗺️',
      tech: '@golang, @postgres, @react, @tailwindcss, @motion',
      deployLink: 'https://tourist-golang.netlify.app/',
      repoLink: 'https://github.com/zmykedev/golang-backend',
      readmeContent: [
        '## Installation',
        '```bash',
        'go mod download',
        'go run main.go',
        '```'
      ]
    },
    { 
      id: 4, 
      title: 'portfolio', 
      description: 'Portfolio personal con animaciones avanzadas y efectos visuales utiles para la experiencia del usuario', 
      color: 'from-orange-500 to-red-500',
      icon: '💼',
      tech: '@react, @gsap, @tailwindcss, @clsx, @i18next',
      deployLink: null,
      repoLink: 'https://github.com/zmykedev/transitionportfolio',
      readmeContent: [
        '## Installation',
        '```bash',
        'pnpm install',
        'pnpm run dev',
        '```'
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="magic-scroll-section relative min-h-[100vh] w-full"
      style={{ 
        isolation: 'isolate',
        contain: 'layout style paint',
        zIndex: 1
      }}
    >
      {/* Fixed container that doesn't move */}
      <div 
        className="magic-scroll-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4"
        style={{ 
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      >
    
        {/* Clouds and Airplane */}
        <div className="relative w-full h-[700px] overflow-hidden">
          {/* 4 Clouds - Grid Layout */}

          <div className='flex justify-center items-center'>
            <div className="flex flex-col h-full justify-center items-center">
              {/* Primera fila */}
              <div className="flex justify-center items-center mb-8  h-[300px]">
                <div className="cloud text-[300px]" style={{ opacity: 0 }}>☁️</div>
                <div className="cloud text-[300px]" style={{ opacity: 0 }}>☁️</div>
              </div>
              {/* Segunda fila */}
              <div className="flex justify-center items-center h-[300px]">
                <div className="cloud text-[300px]" style={{ opacity: 0 }}>☁️</div>
                <div className="cloud text-[300px]" style={{ opacity: 0 }}>☁️</div>
              </div>
              <div className="cloud text-[300px] absolute left-[650px] bottom-[400px] transform -translate-x-1/2 translate-y-1/2" style={{ opacity: 0 }}>☁️</div>

            </div></div>
        
          {/* Airplane */}
          <div className="airplane absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Airplane */}
              <span className="text-6xl drop-shadow-lg filter">
                ✈️
              </span>
         
              {/* Airplane glow */}
              <div className="absolute inset-0 text-6xl opacity-50 blur-sm">
                ✈️
              </div>
              
              {/* Banner "PROYECTOS" */}
              <div className="airplane-banner absolute top-[164px] right-[2px] transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white/20">
                <div className="text-sm font-bold ">PROYECTOS</div>
              </div>
            </div>
        </div>

          {/* Cards */}
          <div className="cards-container absolute inset-0 flex justify-center items-center" style={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-[20px]">
              {magicItems.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
                  className="magic-item group relative overflow-hidden rounded-3xl border border-gray-700/30 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 50%, rgba(17, 24, 39, 0.8) 100%),
                      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)
                    `, 
                    width: '400px',
                    height: '240px'
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>
                  
   

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                  
                  {/* VS Code Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    {/* Window Controls */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    {/* File Name */}
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-blue-400">{item.icon}</span>
                      <span className="font-mono">{item.title.toLowerCase()}.js</span>
                    </div>
                    
                    {/* VS Code Icon */}
                    <div className="w-4 h-4">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a1.003 1.003 0 0 0-1.276.057L.327 7.261A1.003 1.003 0 0 0 .325 8.74L3.899 12 .325 15.26a1.003 1.003 0 0 0 .002 1.479L1.65 17.94a1.003 1.003 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861l-8.716-7.95 8.716-7.95v15.9z"/>
                      </svg>
                    </div>
                  </div>

                  {/* VS Code Sidebar */}
                  <div className="flex">
                    <div className="w-0 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-3">
                     
                </div>
                
                    {/* VS Code Main Content */}
                    <div className="flex-1 bg-gray-900 relative z-10">
                      {/* File Tabs */}
                      <div className="flex bg-gray-800 border-b border-gray-700 relative z-20">
                        <button 
                          onClick={() => setActiveTab({...activeTab, [item.id]: 'main'})}
                          className={`px-4 py-2 border-r border-gray-700 text-sm font-mono transition-colors duration-200 ${
                            activeTab[item.id] === 'main' || !activeTab[item.id]
                              ? 'bg-gray-900 text-gray-300' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {item.title.toLowerCase()}.js
                        </button>
                        <div 
                          onClick={() => {
                            console.log('Clicking package.json for item:', item.id);
                            setActiveTab({...activeTab, [item.id]: 'package'});
                          }}
                          className={`px-4 py-2 border-r border-gray-700 text-sm font-mono transition-colors duration-200 cursor-pointer ${
                            activeTab[item.id] === 'package' 
                              ? 'bg-gray-900 text-gray-300' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                          style={{ zIndex: 30, position: 'relative' }}
                        >
                          package.json
                        </div>
                        <button 
                          onClick={() => setActiveTab({...activeTab, [item.id]: 'readme'})}
                          className={`px-4 py-2 text-sm font-mono transition-colors duration-200 ${
                            activeTab[item.id] === 'readme'
                              ? 'bg-gray-900 text-gray-300' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          README.md
                        </button>
                      </div>

                      {/* Code Editor Area */}
                      <div className=" font-mono text-sm">
                        {/* Line Numbers */}
                        <div className="flex">
                          <div className="w-8 text-gray-600 text-center pr-2 select-none">
                            {activeTab[item.id] === 'package' ? (
                              <>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                              </>
                            ) : activeTab[item.id] === 'readme' ? (
                              <>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                              
                              </>
                            ) : (
                              <>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                              </>
                            )}
              </div>

                          {/* Code Content */}
                          <div className="flex-1 text-gray-300">
                            {activeTab[item.id] === 'package' ? (
                              <>
                                <div><span className="text-gray-500">{'{'}</span></div>
                                <div className="pl-2"><span className="text-green-400">"dependencies"</span><span className="text-gray-500">:</span> <span className="text-gray-500">{'{'}</span></div>
                                {item.tech.split(', ').map((tech, techIndex) => (
                                  <div key={techIndex} className="pl-4">
                                    <span className="text-green-400">"{tech.toLowerCase()}"</span><span className="text-gray-500">:</span> <span className="text-green-400">"latest"</span>
                                    {techIndex < item.tech.split(', ').length - 1 && <span className="text-gray-500">,</span>}
                                  </div>
                                ))}
                              </>
                            ) : activeTab[item.id] === 'readme' ? (
                              <>
                                {item.readmeContent.map((line, lineIndex) => (
                                  <div key={lineIndex}>
                                    {line.startsWith('##') ? (
                                      <span className="text-blue-400">{line}</span>
                                    ) : line.startsWith('-') ? (
                                      <div className="pl-2">
                                        <span className="text-gray-500">-</span> <span className="text-yellow-300">{line.substring(1)}</span>
                                      </div>
                                    ) : line.startsWith('```') ? (
                                      <span className="text-gray-500">{line}</span>
                                    ) : line === '' ? (
                                      <div></div>
                                    ) : (
                                      <span className="text-white">{line}</span>
                                    )}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <>
                                <div><span className="text-blue-400">const</span> <span className="text-yellow-300">{item.title.toLowerCase()}</span> <span className="text-gray-500">=</span> <span className="text-green-400">()</span> <span className="text-gray-500">=&gt;</span> <span className="text-gray-500">{'{'}</span></div>
                                <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-gray-500">(</span></div>
                                <div className="pl-8"><span className="text-gray-500">&lt;</span><span className="text-red-400">div</span> <span className="text-yellow-300">className</span><span className="text-gray-500">=</span><span className="text-green-400">"project"</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-red-400">h1</span><span className="text-gray-500">&gt;</span><span className="text-white">{item.title}</span><span className="text-gray-500">&lt;/</span><span className="text-red-400">h1</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-red-400">p</span><span className="text-gray-500">&gt;</span><span className="text-white">{item.description}</span><span className="text-gray-500">&lt;/</span><span className="text-red-400">p</span><span className="text-gray-500">&gt;</span></div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Bar */}
                      <div className="flex items-center justify-between px-4 bg-blue-600 text-white text-xs">
                        <div className="flex items-center gap-4">
                          <span>main</span>
                          <span>UTF-8</span>
                          <span>JavaScript</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>Ln 10, Col 1</span>
                          <span>Spaces: 2</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Live Server Icon */}
                          <a 
                            href={item.deployLink || undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-blue-700 rounded transition-colors duration-200"
                            title="Live Server"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </a>
                          {/* GitHub Icon */}
                          <a 
                            href={item.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-blue-700 rounded transition-colors duration-200"
                            title="GitHub Repository"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-3xl"></div>
            </div>
          ))}
        </div>
          </div>
        </div>

       
      </div>

      {/* Background effects - isolated to this component */}
      <div 
        className="magic-scroll-bg fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: -1,
          isolation: 'isolate'
        }}
      >
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" style={{ transform: 'translate(25%, 25%)' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" style={{ transform: 'translate(75%, 75%)' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl" style={{ transform: 'translate(50%, 80%)' }}></div>
      </div>
    </section>
  );
};