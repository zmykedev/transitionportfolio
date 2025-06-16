import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useMediaQuery } from "react-responsive";

import { FileDown, Linkedin, Calendar } from "lucide-react";
import { Section1 } from "./components/ui/section1";
import { Section2 } from "./components/ui/section2";
import { Section3 } from "./components/ui/section3";
import { TypewriterText } from "./components/ui/TypewriterText";

export default function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: DOMHighResTimeStamp): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const container = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const projects = [
    {
      id: 1,
      title: "FastKit - Component Library",
      description:
        "Librería de componentes reutilizables, métodos y hooks optimizados para proyectos frontend. Diseñada para acelerar el desarrollo de aplicaciones modernas, con una arquitectura flexible que permite la integración con herramientas como Vite y Storybook.",
      tech: [
        "React",
        "TypeScript",
        "Vite",
        "Storybook",
        "Tailwind",
        "Framer Motion",
      ],
    },
    {
      id: 2,
      title: "Copilot Kit App - Next.js",
      description:
        "Aplicación creada con Next.js para integrar IA fácilmente en frontend y backend. Utiliza Copilot Kit para generar acciones visuales dinámicas basadas en IA, proporcionando una experiencia interactiva y adaptable según el análisis de datos y respuestas del modelo.",
      tech: ["Next.js", "Copilot Kit", "OpenAI API", "React", "TypeScript"],
    },
    {
      id: 3,
      title: "Sticker Seller App",
      description:
        "Plataforma integral para la gestión de una empresa de stickers. Digitaliza procesos clave como la creación, administración y seguimiento de pedidos, manejo de inventario, y gestión de campañas de marketing, todo en una sola plataforma.",
      tech: ["React", "Tailwind", "TypeScript"],
    },
  ];



  const typewriterWords = useMemo(() => [
    "React Developer",
    "Bug Killer",
    "Tailwind CSS Dynamic",
    "State Management Master",
    "Framer Motion Lover",
    "Pixel Perfect UI",
    "Frontend Architect",
    "TypeScript Addict",
    "Design System Engineer",
    "Component-Driven Development",
    "Lenis Smooth Scroller",
    "Reusable Code Advocate",
    "UI Performance Obsessed",
    "Headless UI Fan",
  ], []);



  return (
    
      <main ref={container} className="relative h-[200vh] ">
        {/* Primera sección */}
        <Section1 scrollYProgress={scrollYProgress}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white">
            
          
                <h1 className="text-4xl md:text-6xl font-bold">
                  <div className="flex flex-col">
                  Hola, soy <span className="text-yellow-400">Myke</span>

                  <TypewriterText words={typewriterWords} className="flex-row ml-2" />
                  </div>
                </h1>



              <motion.div className="flex flex-wrap justify-center gap-4 mt-6">
                <motion.a
                  href="https://www.linkedin.com/in/mzapatadvlpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </motion.a>

                <motion.a
                  href="/src/assets/CVMaikolZapata.pdf"
                  download
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  <FileDown className="w-4 h-4" />
                  Descargar CV
                </motion.a>

                <motion.a
                  href="https://calendly.com/zmaikol399"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar reunión
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </Section1>

        {/* Segunda sección */}
        <Section2 scrollYProgress={scrollYProgress}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Tarjeta 3D 1 */}
            <motion.div className="group relative bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
              <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
                🌟 Experiencia
              </h3>
              <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
                Más de 4 años desarrollando aplicaciones escalables con
                tecnologías modernas como React y Next.js.
              </p>
            </motion.div>

            {/* Tarjeta 3D 2 */}
            <motion.div className="group relative bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
              <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
                🚀 Especialización
              </h3>
              <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
                Desarrollo frontend con foco en accesibilidad, rendimiento y
                experiencia del usuario.
              </p>
            </motion.div>

            {/* Tarjeta 3D 3 */}
            <motion.div className="group relative bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
              <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
                🛠️ Habilidades
              </h3>
              <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
                Integración de APIs REST y GraphQL, y desarrollo de interfaces
                modernas con TypeScript y Tailwind CSS.
              </p>
            </motion.div>
          </motion.div>
        </Section2>
        {/* Tercera sección */}
        <Section3 isMobile={isMobile} projects={projects} />
   
      </main>
    
  );
}
