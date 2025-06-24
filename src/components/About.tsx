import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "../lib/useTranslation";
import { 
  Rocket, 
  Wrench, 
  Star,
  Code,
  Database,
  Server
} from "lucide-react";

export function About() {
  const { t } = useTranslation();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Efecto de ondas de sonido en el título
      const createSoundWaves = () => {
        const title = document.querySelector('.about-title');
        if (!title) return;

        // Crear ondas de sonido
        for (let i = 0; i < 5; i++) {
          const wave = document.createElement('div');
          wave.className = 'sound-wave';
          wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          `;
          title.appendChild(wave);

          gsap.to(wave, {
            width: 200 + i * 50,
            height: 200 + i * 50,
            opacity: 0,
            duration: 2,
            delay: i * 0.2,
            repeat: -1,
            ease: "power2.out"
          });
        }
      };

      // Animación del título con efecto de explosión
      gsap.fromTo(".about-title",
        { 
          opacity: 0, 
          y: 50,
          scale: 0,
          rotation: 360
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createSoundWaves
        }
      );

      // Efecto de morphing para las cards
      const createMorphingCards = () => {
        const cards = document.querySelectorAll('.about-card');
        cards.forEach((card, index) => {
          // Crear partículas que salen de las cards
          for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'card-particle';
            particle.style.cssText = `
              position: absolute;
              width: 4px;
              height: 4px;
              background: ${['#8b5cf6', '#ec4899', '#06b6d4'][index % 3]};
              border-radius: 50%;
              top: 50%;
              left: 50%;
              pointer-events: none;
            `;
            card.appendChild(particle);

            gsap.set(particle, { opacity: 0, scale: 0 });
            gsap.to(particle, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: i * 0.1
            });
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 0,
              scale: 0,
              duration: 1,
              delay: 0.5 + i * 0.1,
              ease: "power2.out"
            });
          }
        });
      };

      // Animación de las cards con efecto 3D
      gsap.fromTo(".about-card",
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationX: 90,
          rotationY: 45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-cards",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createMorphingCards
        }
      );

      // Efecto de hover 3D para las cards
      const cards = document.querySelectorAll('.about-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            duration: 0.3,
            scale: 1.05,
            rotationY: 5,
            rotationX: 5,
            z: 50,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            duration: 0.3,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            ease: "power2.out"
          });
        });

        // Efecto de seguimiento del mouse
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            duration: 0.1,
            rotationX: rotateX,
            rotationY: rotateY,
            ease: "power2.out"
          });
        });
      });

      // Efecto de ondas en las skills
      const createSkillWaves = () => {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach((bar, index) => {
          const wave = document.createElement('div');
          wave.className = 'skill-wave';
          wave.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
            transform: translateX(-100%);
          `;
          bar.appendChild(wave);

          gsap.to(wave, {
            x: '100%',
            duration: 2,
            delay: index * 0.2,
            repeat: -1,
            ease: "power2.inOut"
          });
        });
      };

      // Animación de las skills con efecto de llenado
      gsap.fromTo(".skill-item",
        { 
          opacity: 0, 
          x: -50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          onComplete: createSkillWaves
        }
      );

      // Animación de las barras de progreso
      gsap.fromTo(".skill-progress",
        { width: 0 },
        {
          width: (i, target) => target.dataset.progress + "%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Efecto de partículas flotantes en el fondo
      const createFloatingParticles = () => {
        const container = aboutRef.current;
        if (!container) return;

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'floating-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.3;
            pointer-events: none;
          `;
          container.appendChild(particle);

          gsap.to(particle, {
            y: -100,
            x: Math.random() * 50 - 25,
            rotation: Math.random() * 360,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5
          });
        }
      };

      createFloatingParticles();

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const aboutCards = [
    {
      icon: Star,
      title: t.about.experience.title,
      description: t.about.experience.description,
      color: "purple"
    },
    {
      icon: Rocket,
      title: t.about.specialization.title,
      description: t.about.specialization.description,
      color: "pink"
    },
    {
      icon: Wrench,
      title: t.about.skills.title,
      description: t.about.skills.description,
      color: "cyan"
    }
  ];

  const skills = [
    { name: "JavaScript", icon: Code, level: 95 },
    { name: "React", icon: Code, level: 90 },
    { name: "Node.js", icon: Server, level: 85 },
    { name: "TypeScript", icon: Code, level: 88 },
    { name: "MongoDB", icon: Database, level: 80 },
    { name: "PostgreSQL", icon: Database, level: 75 }
  ];

  return (
    <section 
      ref={aboutRef}
      className="min-h-screen flex flex-col justify-center items-center relative py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <h2 className="about-title text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent relative">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* About Cards */}
        <div className="about-cards grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {aboutCards.map((card, index) => (
            <div
              key={card.title}
              className={`about-card group relative bg-gradient-to-br from-${card.color}-600/20 to-${card.color}-800/20 backdrop-blur-lg rounded-2xl p-8 border border-${card.color}-500/20 hover:border-${card.color}-400/40 transition-all duration-500 hover:scale-105 transform-gpu`}
              style={{ perspective: "1000px" }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className={`absolute inset-0 bg-${card.color}-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  <card.icon className={`relative w-12 h-12 text-${card.color}-300 group-hover:text-${card.color}-200 transition-colors duration-300`} />
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 text-center text-${card.color}-300 group-hover:text-${card.color}-200 transition-colors duration-300`}>
                {card.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {t.about.technicalSkills}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <skill.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="skill-bar w-full bg-slate-700 rounded-full h-2 relative overflow-hidden">
                  <div 
                    className="skill-progress bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out relative"
                    data-progress={skill.level}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 