import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // Assuming useGSAP is a custom hook

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://images.visitchile.com/guias_turisticas/255_10410_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/256_10411_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/257_10412_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/258_10414_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/260_10417_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/261_10416_torres_del_paine_puerto_natales.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
  'https://images.visitchile.com/guias_turisticas/8827_Excursiones_PN_Torres_del_PaineCHICA.jpg?w=1920&h=1080&fit=crop&q=80&fm=webp',
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Calculate total scroll distance based on number of images
    const totalScrollDistance = (images.length - 1) * 1000; // 1000px per image transition
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        scrub: 0.5, // Reduced scrub for more responsive control
        anticipatePin: 1, // Prevents jumping
        snap: {
          snapTo: (value) => {
            // Create snap points for each image transition
            const snapPoints = [];
            for (let i = 0; i < images.length; i++) {
              snapPoints.push(i / (images.length - 1));
            }
            
            // Find the closest snap point
            let closest = 0;
            let minDistance = 1;
            
            snapPoints.forEach(point => {
              const distance = Math.abs(value - point);
              if (distance < minDistance) {
                minDistance = distance;
                closest = point;
              }
            });
            
            return closest;
          },
          duration: 0.2, // Faster snapping
          delay: 0,
          ease: "power1.out"
        },
        onUpdate: (self) => {
          // Update progress indicator
          const progress = self.progress;
          const imageIndex = Math.round(progress * (images.length - 1));
          
          // Update progress dots
          const dots = document.querySelectorAll('.progress-dot');
          dots.forEach((dot, index) => {
            const dotElement = dot as HTMLElement;
            if (index === imageIndex) {
              dotElement.style.backgroundColor = 'rgba(255,255,255,0.9)';
            } else {
              dotElement.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }
          });
        }
      }
    });

    // Configurar estado inicial con efectos diferentes para cada imagen
    images.forEach((_, index) => {
      const effects = [
        // Imagen 1: Efecto zoom suave
        { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)' },
        // Imagen 2: Efecto slide desde derecha
        { autoAlpha: 0, scale: 1.1, x: 500, y: 0, rotation: 0, filter: 'brightness(0.9) saturate(1.1)' },
        // Imagen 3: Efecto slide desde abajo
        { autoAlpha: 0, scale: 0.9, x: -500, y: 0, rotation: 0, filter: 'brightness(1.1) saturate(0.9)' },
        // Imagen 4: Efecto rotación
        { autoAlpha: 0, scale: 1.05, x: 500, y: 0, rotation: 0, filter: 'brightness(0.9) saturate(1.1) contrast(1.1)' },
        // Imagen 5: Efecto zoom desde centro
        { autoAlpha: 0, scale: 0.5, x: -500, y: 0, rotation: 0, filter: 'brightness(1) saturate(1.3)' },
        // Imagen 6: Efecto slide diagonal
        { autoAlpha: 0, scale: 1.2, x: 500, y: 0, rotation: 0, filter: 'brightness(0.8) saturate(0.8) sepia(0.2)' },
        // Imagen 7: Efecto flip
        { autoAlpha: 0, scale: 1, x: -500, y: 0, rotation: 0, filter: 'brightness(1.2) saturate(1.1) contrast(0.9)' }
      ];
      
      tl.set(`#image-${index}`, effects[index]);
    });

    // Animar transiciones con efectos únicos y mejor control de timing
    images.forEach((_, index) => {
      if (index < images.length - 1) {
        const nextIndex = index + 1;
        const transitionDuration = 1.0; // Consistent duration for better snapping
        
        // Efectos de salida únicos
        const exitEffects = [
          // Imagen 1: Zoom out con fade
          { autoAlpha: 0, scale: 0.1, x: -100, y: 0, rotation: 0, duration: transitionDuration, ease: "power2.inOut" },
          // Imagen 2: Slide hacia izquierda con rotación
          { autoAlpha: 0, scale: 0.9, x: -200, y: 0, rotation: 0, duration: transitionDuration, ease: "back.in(1.7)" },
          // Imagen 3: Zoom in y fade
          { autoAlpha: 0, scale: 1.3, x: 0, y: 0, rotation: 0, duration: transitionDuration, ease: "power3.out" },
          // Imagen 4: Rotación completa
          { autoAlpha: 0, scale: 0.7, x: 0, y: 0,  duration: transitionDuration, ease: "power2.inOut" },
          // Imagen 5: Slide hacia arriba
          { autoAlpha: 0, scale: 1.1, x: 0, y: -200, duration: transitionDuration },
          // Imagen 6: Zoom out con rotación
          { autoAlpha: 0, scale: 0.6, x: 150, y: 150, rotation: 0, duration: transitionDuration, ease: "power4.out" }
        ];

        // Efectos de entrada únicos
        const enterEffects = [
          // Imagen 2: Slide desde derecha
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration, ease: "power2.out" },
          // Imagen 3: Slide desde abajo
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration, ease: "back.out(1.7)" },
          // Imagen 4: Rotación desde ángulo
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration, ease: "power3.out" },
          // Imagen 5: Zoom desde centro
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration },
          // Imagen 6: Slide diagonal
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration, ease: "power2.inOut" },
          // Imagen 7: Flip desde rotación
          { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0, filter: 'brightness(1) saturate(1)', duration: transitionDuration, ease: "power4.out" }
        ];

        // Aplicar efectos de salida y entrada con mejor timing
        tl.to(`#image-${index}`, exitEffects[index], index);
        tl.to(`#image-${nextIndex}`, enterEffects[index], index + 0.1); // Reduced overlap for cleaner transitions
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-red-800 to-white"
    >
      {/* Título y descripción con glassmorphism */}
      <div className="absolute top-10 left-10 z-20 text-white backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/20">
        <h1 className="text-4xl font-bold mb-2">Torres del Paine</h1>
        <p className="text-lg opacity-90">Patagonia Chilena - Octava Maravilla del Mundo</p>
      </div>

      {/* Indicador de progreso con glassmorphism */}
      <div className="absolute bottom-10 left-10 z-20 text-white backdrop-blur-md bg-black/40 p-2 rounded-lg border border-white/20">
        <p className="text-sm opacity-80">Scroll para explorar las Torres del Paine</p>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-10 right-10 z-20 text-white backdrop-blur-md bg-black/40 p-2 rounded-lg border border-white/20">
        <div className="flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className="progress-dot w-2 h-2 rounded-full bg-white/50 transition-all duration-300"
              style={{
                backgroundColor: index === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>

      {images.map((src, index) => (
        <img
          key={index}
          id={`image-${index}`}
          src={src}
          alt={`Torres del Paine - Imagen ${index + 1}`}
          className="absolute w-full h-full object-contain top-0 left-0"
        />
      ))}
    </div>
  );
}
