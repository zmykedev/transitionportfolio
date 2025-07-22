import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useTranslation } from '../lib/useTranslation';

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple title animation
      gsap.fromTo(
        '.projects-title',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Simple cards animation
      gsap.fromTo(
        '.project-card',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={projectsRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="projects-title relative mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
            {t.projects.featuredProjects}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {t.projects.showcaseDescription}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map(project => (
            <div
              key={project.id}
              className="project-card group relative cursor-pointer rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-lg transition-all duration-300 hover:border-purple-500/50 hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={`https://via.placeholder.com/400x250/1f2937/ffffff?text=${encodeURIComponent(project.title)}`}
                  alt={project.title}
                  className="h-48 w-full object-cover transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onError={(e) => {
                    // Fallback to a gradient background if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'h-48 w-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center';
                    fallback.innerHTML = `<span class="text-white text-lg font-semibold">${project.title}</span>`;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Overlay with links */}
                <div className="project-overlay absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-purple-600 p-3 text-white transition-colors duration-300 hover:scale-110 hover:bg-purple-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-slate-700 p-3 text-white transition-colors duration-300 hover:scale-110 hover:bg-slate-600"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-purple-400">
                    Full Stack
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-purple-300">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300 transition-colors duration-300 hover:border-purple-400/50"
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
                    className="inline-flex items-center gap-2 font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300 group-hover:gap-3"
                  >
                    {t.projects.viewProject}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
