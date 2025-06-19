import { Section } from "./section";
import { motion, useScroll, useTransform } from "framer-motion";
import  { useRef } from "react";
import { useTranslation } from "../../lib/useTranslation";

export function Section3({ isMobile }: { isMobile: boolean }) {
  const { t } = useTranslation();
  const projects = t.projects.items;
  
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, isMobile ? 0.6 : 0.8], ["60%", "-35%"]);

  return (
    <Section
      ref={targetRef}
      className="bg-gradient-to-b from-green-400 to-teal-600 relative h-[1000vh] text-white"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden w-full">
        <motion.div
          style={{ x }}
          className="flex gap-8 px-8 py-12 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-300"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative w-[280px] md:w-[320px] lg:w-[360px] h-[400px] bg-gradient-to-br from-white to-gray-100 text-black rounded-3xl shadow-2xl p-6 hover:scale-105 transition-transform snap-start"
            >
              <h3 className="text-2xl font-bold text-center text-teal-700 group-hover:text-teal-500">
                {project.title}
              </h3>
              <p className="mt-4 text-sm text-gray-700 text-justify leading-1">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-teal-200 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  {t.projects.viewProject}
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
} 