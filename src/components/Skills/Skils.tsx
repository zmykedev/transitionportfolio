import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../../lib/useTranslation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const skills = [
  { id: 'react', name: 'React', icon: 'react', color: 'from-blue-400 to-cyan-400' },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'typescript',
    color: 'from-blue-500 to-blue-600',
  },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', color: 'from-green-400 to-green-600' },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'javascript',
    color: 'from-yellow-400 to-yellow-500',
  },
  { id: 'html', name: 'HTML5', icon: 'html', color: 'from-orange-400 to-red-500' },
  { id: 'css', name: 'CSS3', icon: 'css', color: 'from-blue-400 to-blue-600' },
  { id: 'python', name: 'Python', icon: 'python', color: 'from-blue-400 to-yellow-400' },
  { id: 'git', name: 'Git', icon: 'git', color: 'from-orange-500 to-red-500' },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: 'postgresql',
    color: 'from-blue-500 to-blue-600',
  },
  { id: 'docker', name: 'Docker', icon: 'docker', color: 'from-blue-400 to-blue-600' },
  { id: 'aws', name: 'AWS', icon: 'aws', color: 'from-orange-400 to-orange-500' },
  { id: 'nextjs', name: 'Next.js', icon: 'nextjs', color: 'from-gray-700 to-gray-900' },
  { id: 'tailwindcss', name: 'Tailwind', icon: 'tailwindcss', color: 'from-cyan-400 to-blue-500' },
  { id: 'bun', name: 'Bun', icon: 'bun', color: 'from-brown-400 to-brown-600' },
];

export const Skills: React.FC = () => {
  const { t } = useTranslation();
  const skillsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Use requestIdleCallback to avoid blocking main thread
      const initAnimations = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // Title animation
        tl.fromTo(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }
        )
          // Subtitle animation
          .fromTo(
            subtitleRef.current,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.4'
          )
          // Airplane entrance and flight
          .fromTo(
            '.skills-airplane',
            {
              x: -1000,
              opacity: 1,
              rotation: 50,
              scale: 4,
            },
            {
              x: () => window.innerWidth + 100,
              y: -20,
              opacity: 1,
              rotation: 50,
              scale: 2,
              duration: 2,
              ease: 'power2.inOut',
            },
            '-=0.2'
          )
          // Simple fadeout at the end
          .to(
            '.skills-airplane',
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.5'
          );

        // Create more realistic dropping animation for each skill
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
          // Initial state - hidden and positioned above
          gsap.set(card, {
            opacity: 0,
            y: -400,
            x: Math.random() * 60 - 30, // Random horizontal offset
            rotation: Math.random() * 90 - 45, // Random rotation
            scale: 0.1,
          });

          // Calculate drop timing based on airplane's journey
          const dropProgress = (index / (skillCards.length - 1)) * 0.6 + 0.2; // Between 20% and 80% of flight
          const dropDelay = dropProgress * 4; // 5 seconds is airplane duration

          // Dropping animation with physics-like behavior
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotation: 0,
              scale: 1,
              duration: 1,
              ease: 'bounce.out',
              delay: dropDelay,
              onStart: () => {
                // Add a small puff effect when skill appears
                gsap.fromTo(
                  card,
                  { filter: 'blur(2px)' },
                  { filter: 'blur(0px)', duration: 0.3 }
                );
              },
            },
            0.5
          );

          // Add a subtle floating effect after landing
          tl.to(
            card,
            {
              y: 'random(-3, 3)',
              rotation: 'random(-2, 2)',
              duration: 'random(2, 4)',
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: dropDelay + 1.5,
            },
            0.5
          );
        });

        // Bottom text animation - independent from timeline
        gsap.fromTo(
          bottomTextRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: 4, // Solo un pequeño delay inicial
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Enhanced hover animations for individual cards
        skillCards.forEach(card => {
          const icon = card.querySelector('.skill-icon');
          const text = card.querySelector('.skill-text');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.05,
              duration: 0.3,
              ease: 'back.out(1.7)',
            });
            gsap.to(icon, {
              scale: 1.2,
              rotation: 12,
              duration: 0.3,
              ease: 'back.out(1.7)',
            });
            gsap.to(text, {
              y: -2,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(text, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      };

      // Schedule animations during idle time
      if ('requestIdleCallback' in window) {
        requestIdleCallback(initAnimations, { timeout: 1000 });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(initAnimations, 100);
      }
    },
    { scope: skillsRef }
  );

  return (
    <section
      ref={skillsRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64" style={{ transform: 'translate(25%, 25%)' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64" style={{ transform: 'translate(75%, 75%)' }}></div>
      </div>

      {/* Skills Delivery Airplane */}
      <div
        ref={airplaneRef}
        className="skills-airplane pointer-events-none absolute z-20"
        style={{ transform: 'translate(0, 33.33%)' }}
      >
        <div className="relative">
          {/* Airplane */}
          <span className="text-4xl drop-shadow-lg filter sm:text-5xl md:text-6xl">
            ✈️
          </span>

          {/* Airplane trail */}
          <div className="absolute h-0.5 w-8 bg-gradient-to-r from-blue-400/60 to-transparent" style={{ transform: 'translate(-2rem, -50%)' }}></div>
          <div className="absolute h-0.5 w-6 bg-gradient-to-r from-blue-300/40 to-transparent" style={{ transform: 'translate(-3rem, -50%)' }}></div>
          <div className="absolute h-0.5 w-4 bg-gradient-to-r from-blue-200/20 to-transparent" style={{ transform: 'translate(-4rem, -50%)' }}></div>

          {/* Airplane glow */}
          <div className="absolute inset-0 text-4xl opacity-50 blur-sm sm:text-5xl md:text-6xl">
            ✈️
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Section Title */}
        <div className="mb-8 text-center sm:mb-10">
          <h2
            ref={titleRef}
            className="mb-2 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-2xl font-black text-transparent sm:text-3xl md:text-4xl"
          >
            {t.skills.title}
          </h2>
          <p
            ref={subtitleRef}
            className="mx-auto max-w-xl text-sm text-gray-300 sm:text-base"
          >
            {t.skills.subtitle}
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-7 lg:gap-4"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              id={`skill-${skill.id}`}
              className="skill-card group relative"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Skill Card */}
              <div className="relative transform-gpu rounded-xl border border-gray-700/50 bg-gray-800/50 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/70 hover:shadow-2xl sm:p-3">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
                ></div>

                {/* Icon */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-1 sm:mb-2">
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.id}`}
                      alt={`${skill.name} icon`}
                      className="skill-icon h-8 w-8 transition-transform duration-300 sm:h-10 sm:w-10"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {

                        
                        // Fallback to a simple text representation if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'skill-icon-fallback flex h-8 w-8 items-center justify-center rounded bg-gray-700 text-xs font-bold text-white sm:h-10 sm:w-10';
                        fallback.textContent = skill.name.charAt(0).toUpperCase();
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                    {/* Icon Glow */}
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${skill.color} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30`}
                    ></div>
                  </div>

                  {/* Skill Name */}
                  <span className="skill-text text-center text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                    {skill.name}
                  </span>
                </div>

                {/* Animated Border */}
                <div className="group-hover:border-gradient-to-r absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-500 group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div ref={bottomTextRef} className="mt-6 text-center sm:mt-8">
          <p className="text-xs text-gray-400 sm:text-sm">
            {t.skills.bottomText}
          </p>
        </div>
      </div>
    </section>
  );
};
