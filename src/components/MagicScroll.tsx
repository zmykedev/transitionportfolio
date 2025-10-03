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
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
      onEnter: () => {
        // Create timeline for sequential animation
        const tl = gsap.timeline();
        
        // Step 1: Clouds appear from below
        tl.fromTo('.cloud', 
          { y: 200, opacity: 0 },
          { 
            y: 0, 
                opacity: 1,
            duration: 0.6, 
            ease: "power2.out",
            stagger: 0.3
          }
        )
        .fromTo(
            '.airplane',
            {
              x: 1200,
              y: -490,
              opacity: 1,
              rotation: 200,
              scale: 4,
            },
            {
              x: -200,
              y: 500,
              opacity: 1,
              scale: 2,
              duration: .9,
              ease: 'power2.inOut',
            },
            '-=0.2'
          )
        // Step 3: Clouds disappear
        .to('.cloud', 
          { 
            y: -200, 
            opacity: 0, 
            duration: 2, 
            ease: "power2.in",
            stagger: 0.1
          }, "-=0.5"
        )
        // Step 4: Cards appear behind where clouds were
        .fromTo('.cards-container',
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            ease: "back.out(1.7)"
          }, "-=0.3"
        );
         // Animate each card with different size and add gap
         tl.to('.cards-container .grid', {
             gap: "50px",
             duration: 0.5,
             ease: "power2.out"
           }, "-=0.3")
         .to('.magic-item', {
             width: (i) => {
               const widths = ['500px', '500px', '500px', '500px'];
               return widths[i % widths.length];
             },
             height: (i) => {
             const heights = ['300px', '300px', '300px', '300px'];
               return heights[i % heights.length];
             },
             duration: .2,
             ease: "power2.out",
             stagger: 0.2
           }, "-=0.1");
          
  
        
      },
      onLeave: () => {
        // Reverse animation when scrolling back
        gsap.to('.cards-container', { opacity: 0, scale: 0.8, duration: 0.5 });
        gsap.to('.cards-container .grid', { gap: "24px", duration: 0.3 });
        gsap.to('.magic-item', { width: "auto", height: "auto", duration: 0.3 });
        gsap.to('.airplane', { x: -300, opacity: 0, duration: 0.5 });
        gsap.to('.cloud', { y: 200, opacity: 0, duration: 0.5, stagger: 0.1 });
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
      tech: 'React, Node.js, MongoDB',
      deployLink: 'https://cmpc-deploy.vercel.app',
      repoLink: 'https://github.com/tu-usuario/cmpc'
    },
    { 
      id: 2, 
      title: 'Editor de Imágenes', 
      description: 'Editor de imágenes avanzado sin necesidad de prompts, con IA integrada', 
      color: 'from-purple-500 to-pink-500',
      icon: '🎨',
      tech: 'React, AI, Canvas API',
      deployLink: 'https://image-editor-deploy.vercel.app',
      repoLink: 'https://github.com/tu-usuario/image-editor'
    },
    { 
      id: 3, 
      title: 'Tourist Go', 
      description: 'Aplicación de turismo con guías locales y recomendaciones personalizadas', 
      color: 'from-green-500 to-emerald-500',
      icon: '🗺️',
      tech: 'React Native, Maps API',
      deployLink: 'https://tourist-go-deploy.vercel.app',
      repoLink: 'https://github.com/tu-usuario/tourist-go'
    },
    { 
      id: 4, 
      title: 'Portfolio', 
      description: 'Portfolio personal con animaciones avanzadas y efectos visuales', 
      color: 'from-orange-500 to-red-500',
      icon: '💼',
      tech: 'React, GSAP, Tailwind',
      deployLink: 'https://portfolio-deploy.vercel.app',
      repoLink: 'https://github.com/tu-usuario/portfolio'
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
                <div className="cloud text-[400px] first">☁️</div>
                <div className="cloud text-[400px]">☁️</div>
              </div>
              {/* Segunda fila */}
              <div className="flex justify-center items-center h-[300px]">
                <div className="cloud text-[400px]">☁️</div>
                <div className="cloud text-[400px]">☁️</div>
              </div>
            </div></div>
        
          {/* Airplane */}
          <div className="airplane absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Airplane */}
              <span className="text-6xl drop-shadow-lg filter">
                ✈️
              </span>
              {/* Airplane trail */}
              <div className="absolute h-0.5 w-8 bg-gradient-to-r from-blue-400/60 to-transparent" style={{ transform: 'translate(-2rem, -50%)' }}></div>
              <div className="absolute h-0.5 w-6 bg-gradient-to-r from-blue-300/40 to-transparent" style={{ transform: 'translate(-3rem, -50%)' }}></div>
              <div className="absolute h-0.5 w-4 bg-gradient-to-r from-blue-200/20 to-transparent" style={{ transform: 'translate(-4rem, -50%)' }}></div>
              {/* Airplane glow */}
              <div className="absolute inset-0 text-6xl opacity-50 blur-sm">
                ✈️
              </div>
            </div>
        </div>

          {/* Cards */}
          <div className="cards-container absolute inset-0 flex justify-center items-center" style={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-[200px]">
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
                    `
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>
                  
                  {/* Floating Particles Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ top: '60%', right: '15%', animationDelay: '1s' }}></div>
                    <div className="absolute w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse" style={{ bottom: '30%', left: '20%', animationDelay: '2s' }}></div>
                  </div>

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
                    <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-3">
                     
                </div>
                
                    {/* VS Code Main Content */}
                    <div className="flex-1 bg-gray-900">
                      {/* File Tabs */}
                      <div className="flex bg-gray-800 border-b border-gray-700">
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
                        <button 
                          onClick={() => setActiveTab({...activeTab, [item.id]: 'package'})}
                          className={`px-4 py-2 border-r border-gray-700 text-sm font-mono transition-colors duration-200 ${
                            activeTab[item.id] === 'package' 
                              ? 'bg-gray-900 text-gray-300' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          package.json
                        </button>
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
                      <div className="p-2 font-mono text-sm">
                        {/* Line Numbers */}
                        <div className="flex">
                          <div className="w-8 text-gray-600 text-right pr-2 select-none">
                            {activeTab[item.id] === 'package' ? (
                              <>
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
                                <div>8</div>
                                <div>9</div>
                                <div>10</div>
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
                                <div>8</div>
                                <div>9</div>
                              </>
                            )}
                          </div>
                          
                          {/* Code Content */}
                          <div className="flex-1 text-gray-300">
                            {activeTab[item.id] === 'package' ? (
                              <>
                                <div><span className="text-gray-500">{'{'}</span></div>
                                <div className="pl-2"><span className="text-green-400">"name"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{item.title.toLowerCase()}"</span><span className="text-gray-500">,</span></div>
                                <div className="pl-2"><span className="text-green-400">"version"</span><span className="text-gray-500">:</span> <span className="text-green-400">"1.0.0"</span><span className="text-gray-500">,</span></div>
                                <div className="pl-2"><span className="text-green-400">"description"</span><span className="text-gray-500">:</span> <span className="text-green-400">"{item.description}"</span><span className="text-gray-500">,</span></div>
                                <div className="pl-2"><span className="text-green-400">"main"</span><span className="text-gray-500">:</span> <span className="text-green-400">"index.js"</span><span className="text-gray-500">,</span></div>
                                <div className="pl-2"><span className="text-green-400">"scripts"</span><span className="text-gray-500">:</span> <span className="text-gray-500">{'{'}</span></div>
                                <div className="pl-4"><span className="text-green-400">"start"</span><span className="text-gray-500">:</span> <span className="text-green-400">"react-scripts start"</span><span className="text-gray-500">,</span></div>
                                <div className="pl-4"><span className="text-green-400">"build"</span><span className="text-gray-500">:</span> <span className="text-green-400">"react-scripts build"</span></div>
                                <div className="pl-2"><span className="text-gray-500">{'}'}</span><span className="text-gray-500">,</span></div>
                                <div className="pl-2"><span className="text-green-400">"dependencies"</span><span className="text-gray-500">:</span> <span className="text-gray-500">{'{'}</span></div>
                                {item.tech.split(', ').map((tech, techIndex) => (
                                  <div key={techIndex} className="pl-4">
                                    <span className="text-green-400">"{tech.toLowerCase()}"</span><span className="text-gray-500">:</span> <span className="text-green-400">"latest"</span>
                                    {techIndex < item.tech.split(', ').length - 1 && <span className="text-gray-500">,</span>}
                                  </div>
                                ))}
                                <div className="pl-2"><span className="text-gray-500">{'}'}</span></div>
                                <div><span className="text-gray-500">{'}'}</span></div>
                              </>
                            ) : activeTab[item.id] === 'readme' ? (
                              <>
                                <div><span className="text-blue-400"># {item.title}</span></div>
                                <div></div>
                                <div><span className="text-white">{item.description}</span></div>
                                <div></div>
                                <div><span className="text-blue-400">## Tecnologías</span></div>
                                <div></div>
                                {item.tech.split(', ').map((tech, techIndex) => (
                                  <div key={techIndex} className="pl-2">
                                    <span className="text-gray-500">-</span> <span className="text-yellow-300">{tech}</span>
                                  </div>
                                ))}
                                <div></div>
                                <div><span className="text-blue-400">## Instalación</span></div>
                                <div></div>
                                <div><span className="text-gray-500">```bash</span></div>
                                <div><span className="text-white">npm install</span></div>
                                <div><span className="text-white">npm start</span></div>
                                <div><span className="text-gray-500">```</span></div>
                              </>
                            ) : (
                              <>
                                <div><span className="text-blue-400">const</span> <span className="text-yellow-300">{item.title.toLowerCase()}</span> <span className="text-gray-500">=</span> <span className="text-green-400">()</span> <span className="text-gray-500">=&gt;</span> <span className="text-gray-500">{'{'}</span></div>
                                <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-gray-500">(</span></div>
                                <div className="pl-8"><span className="text-gray-500">&lt;</span><span className="text-red-400">div</span> <span className="text-yellow-300">className</span><span className="text-gray-500">=</span><span className="text-green-400">"project"</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-red-400">h1</span><span className="text-gray-500">&gt;</span><span className="text-white">{item.title}</span><span className="text-gray-500">&lt;/</span><span className="text-red-400">h1</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-red-400">p</span><span className="text-gray-500">&gt;</span><span className="text-white">{item.description}</span><span className="text-gray-500">&lt;/</span><span className="text-red-400">p</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-8"><span className="text-gray-500">&lt;/</span><span className="text-red-400">div</span><span className="text-gray-500">&gt;</span></div>
                                <div className="pl-4"><span className="text-gray-500">);</span></div>
                                <div><span className="text-gray-500">{'}'}</span><span className="text-gray-500">;</span></div>
                                <div></div>
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
                            href={item.deployLink}
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