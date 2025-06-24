import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  Github, 
  ExternalLink, 
  ArrowRight
} from "lucide-react";
import { useTranslation } from "../lib/useTranslation";

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Efecto de portal para el título
      const createPortalEffect = () => {
        const title = document.querySelector('.projects-title');
        if (!title) return;

        // Crear efecto de portal
        const portal = document.createElement('div');
        portal.className = 'portal-effect';
        portal.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: -1;
        `;
        title.appendChild(portal);

        gsap.to(portal, {
          width: 300,
          height: 300,
          opacity: 0,
          duration: 2,
          ease: "power2.out"
        });
      };

      // Animación del título con efecto de portal
      gsap.fromTo(".projects-title",
        { 
          opacity: 0, 
          y: 50,
          scale: 0,
          rotation: 720
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createPortalEffect
        }
      );

      // Efecto de energía para las project cards
      const createEnergyEffect = () => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card) => {
          // Crear líneas de energía
          for (let i = 0; i < 5; i++) {
            const energyLine = document.createElement('div');
            energyLine.className = 'energy-line';
            energyLine.style.cssText = `
              position: absolute;
              width: 2px;
              height: 0;
              background: linear-gradient(to bottom, transparent, #8b5cf6, transparent);
              top: 0;
              left: ${20 + i * 15}%;
              pointer-events: none;
              opacity: 0;
            `;
            card.appendChild(energyLine);

            gsap.to(energyLine, {
              height: '100%',
              opacity: 1,
              duration: 1,
              delay: i * 0.1,
              ease: "power2.out"
            });
          }

          // Crear partículas de energía
          for (let i = 0; i < 15; i++) {
            const energyParticle = document.createElement('div');
            energyParticle.className = 'energy-particle';
            energyParticle.style.cssText = `
              position: absolute;
              width: 3px;
              height: 3px;
              background: #8b5cf6;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              pointer-events: none;
              opacity: 0;
            `;
            card.appendChild(energyParticle);

            gsap.set(energyParticle, { opacity: 0, scale: 0 });
            gsap.to(energyParticle, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: i * 0.05
            });
            gsap.to(energyParticle, {
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
              opacity: 0,
              scale: 0,
              duration: 1.5,
              delay: 0.5 + i * 0.05,
              ease: "power2.out"
            });
          }
        });
      };

      // Animación de las project cards con efecto de energía
      gsap.fromTo(".project-card",
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationX: 90,
          rotationY: 45,
          z: -100
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createEnergyEffect
        }
      );

      // Efecto de distorsión en hover para las imágenes
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', () => {
          // Efecto de distorsión en la imagen
          gsap.to(image, {
            duration: 0.3,
            scale: 1.1,
            rotation: 2,
            filter: "brightness(1.2) contrast(1.1)",
            ease: "power2.out"
          });

          // Efecto de energía en el overlay
          gsap.to(overlay, {
            duration: 0.3,
            opacity: 1,
            scale: 1.05,
            ease: "power2.out"
          });

          // Efecto de elevación 3D
          gsap.to(card, {
            duration: 0.3,
            scale: 1.05,
            rotationY: 5,
            rotationX: 5,
            z: 50,
            ease: "power2.out"
          });

          // Crear efecto de chispas
          for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.cssText = `
              position: absolute;
              width: 2px;
              height: 2px;
              background: #f59e0b;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              pointer-events: none;
            `;
            card.appendChild(spark);

            gsap.fromTo(spark, 
              { opacity: 1, scale: 0 },
              {
                opacity: 0,
                scale: 1,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                duration: 0.8,
                ease: "power2.out"
              }
            );
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            filter: "brightness(1) contrast(1)",
            ease: "power2.out"
          });

          gsap.to(overlay, {
            duration: 0.3,
            opacity: 0,
            scale: 1,
            ease: "power2.out"
          });

          gsap.to(card, {
            duration: 0.3,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            ease: "power2.out"
          });
        });

        // Efecto de seguimiento del mouse 3D
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;

          gsap.to(card, {
            duration: 0.1,
            rotationX: rotateX,
            rotationY: rotateY,
            ease: "power2.out"
          });
        });
      });

      // Efecto de ondas de energía en el fondo
      const createEnergyWaves = () => {
        const container = projectsRef.current;
        if (!container) return;

        for (let i = 0; i < 3; i++) {
          const wave = document.createElement('div');
          wave.className = 'energy-wave';
          wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(139, 92, 246, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          `;
          container.appendChild(wave);

          gsap.to(wave, {
            width: 800 + i * 200,
            height: 800 + i * 200,
            opacity: 0,
            duration: 3,
            delay: i * 0.5,
            repeat: -1,
            ease: "power2.out"
          });
        }
      };

      createEnergyWaves();

    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={projectsRef}
      className="min-h-screen flex flex-col justify-center items-center relative py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="projects-title text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent relative">
            {t.projects.featuredProjects}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.projects.showcaseDescription}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((project) => (
            <div
              key={project.id}
              className="project-card group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 cursor-pointer transform-gpu"
              style={{ perspective: "1000px" }}
            >
              {/* Project Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={`https://via.placeholder.com/400x250/1f2937/ffffff?text=${project.title}`}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Overlay with links */}
                <div className="project-overlay absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-purple-400 font-medium">
                    Full Stack
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-700/50 text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-600/50 hover:border-purple-400/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="pt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 group-hover:gap-3"
                  >
                    {t.projects.viewProject}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 