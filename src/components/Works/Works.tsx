import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../../lib/useTranslation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  url: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'web' | 'mobile' | 'ai' | 'ecommerce';
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'TouristGo - Travel Companion App',
    description: 'Travel companion application that offers personalized itineraries, local recommendations and planning tools for travelers. Designed to enhance travel experience with maps integration and interactive guides.',
    tech: ['Golang', 'React JS', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    url: 'https://tourist-golang.netlify.app/',
    date: '2024',
    status: 'completed',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Copilot Kit App - Next.js',
    description: 'Application built with Next.js to easily integrate AI in frontend and backend. Uses Copilot Kit to generate dynamic visual actions based on AI, providing an interactive and adaptable experience.',
    tech: ['Next.js', 'Copilot Kit', 'OpenAI API', 'React', 'TypeScript'],
    url: '#',
    date: '2024',
    status: 'completed',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Sticker Seller App',
    description: 'Comprehensive platform for managing a sticker business. Digitizes key processes like creation, administration and order tracking, inventory management, and marketing campaigns management.',
    tech: ['React', 'Tailwind', 'TypeScript', 'Node.js', 'PostgreSQL'],
    url: '#',
    date: '2023',
    status: 'completed',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website showcasing my work and skills. Built with cutting-edge technologies and featuring smooth animations and interactive elements.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite'],
    url: '#',
    date: '2024',
    status: 'in-progress',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'AI-Powered Task Manager',
    description: 'Intelligent task management application that uses AI to prioritize tasks, suggest optimal work schedules, and provide productivity insights.',
    tech: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    url: '#',
    date: '2024',
    status: 'planned',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80'
  }
];

export const Works: React.FC = () => {
  const { t } = useTranslation();
  const worksRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const initAnimations = () => {
        // Main timeline for section entrance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: worksRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // Title and subtitle animations
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
          );

        // Timeline items animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          gsap.set(item, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            y: 30,
            scale: 0.9,
          });

          tl.to(
            item,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            },
            `-=${0.3}`
          );

          // Scroll-triggered hide animation for each card
          ScrollTrigger.create({
            trigger: item,
            start: 'top top+=100',
            end: 'top top-=200',
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(item, {
                y: -150 * progress,
                opacity: 1 - progress,
                scale: 1 - (progress * 0.2),
                duration: 0.1,
              });
              
              // Animar el dot también
              const dot = item.querySelector('.timeline-dot');
              if (dot) {
                gsap.to(dot, {
                  y: -150 * progress,
                  scale: 1 - (progress * 0.5),
                  opacity: 1 - progress,
                  duration: 0.1,
                });
              }
            },
          });
        });

        // Bottom text animation
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
            delay: 0.5,
            scrollTrigger: {
              trigger: worksRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Hover animations for project cards
        timelineItems.forEach(item => {
          const card = item.querySelector('.project-card');
          const image = item.querySelector('.project-image');
          const techTags = item.querySelectorAll('.tech-tag');

          item.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(image, {
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(techTags, {
              y: -2,
              duration: 0.2,
              ease: 'power2.out',
              stagger: 0.05,
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(image, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(techTags, {
              y: 0,
              duration: 0.2,
              ease: 'power2.out',
              stagger: 0.05,
            });
          });
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(initAnimations, { timeout: 1000 });
      } else {
        setTimeout(initAnimations, 100);
      }
    },
    { scope: worksRef }
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return '🌐';
      case 'mobile':
        return '📱';
      case 'ai':
        return '🤖';
      case 'ecommerce':
        return '🛒';
      default:
        return '💻';
    }
  };

  return (
    <section
      ref={worksRef}
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64" style={{ transform: 'translate(25%, 25%)' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64" style={{ transform: 'translate(75%, 75%)' }}></div>
        <div className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64" style={{ transform: 'translate(50%, 80%)' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-3xl font-black text-transparent sm:text-4xl md:text-5xl"
          >
            {t.works.title}
          </h2>
          <p
            ref={subtitleRef}
            className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg"
          >
            {t.works.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-green-500/50"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg ring-4 ring-gray-900/50"></div>

                {/* Project Card */}
                <div className={`w-full max-w-md ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className="project-card group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/70 hover:shadow-2xl">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>

                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image h-full w-full object-cover transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status === 'completed' ? '✅ Completed' : 
                           project.status === 'in-progress' ? '🚧 In Progress' : '📋 Planned'}
                        </span>
                      </div>

                      {/* Category Icon */}
                      <div className="absolute top-4 left-4">
                        <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-400">{project.date}</span>
                      </div>

                      <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="tech-tag rounded-full bg-gray-700/50 px-3 py-1 text-xs font-medium text-gray-300 transition-all duration-300 hover:bg-gray-600/50 hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 hover:shadow-lg"
                      >
                        {t.works.viewProject}
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div ref={bottomTextRef} className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            {t.works.bottomText}
          </p>
        </div>
      </div>
    </section>
  );
};