import { useEffect, useRef } from "react";
import { Section } from "./components/ui/section";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useMediaQuery } from "react-responsive";
import { Typewriter } from "react-simple-typewriter";

import { FileDown, Linkedin, Calendar } from "lucide-react";
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

  const Section1 = ({ children }: { children: React.ReactNode }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
    return (
      <Section
        style={{ scale, rotate }}
        className="bg-gradient-to-b from-blue-500 to-blue-300 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
      >
        {children}{" "}
      </Section>
    );
  };

  const Section2 = ({ children }: { children: React.ReactNode }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
    return (
      <Section
        style={{ scale, rotate }}
        className="bg-gradient-to-b from-red-400 to-red-600 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
      >
        {children}{" "}
      </Section>
    );
  };

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

  const Section3 = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end end"],
    });

    const x = useTransform(
      scrollYProgress,
      [0, isMobile ? 0.6 : 0.8],
      ["60%", "-35%"]
    );

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
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-teal-200 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>
    );
  };

  function SmoothScrollWithLight() {
    const containerRef = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }, []);

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (lightRef.current) {
          const light = lightRef.current as HTMLDivElement;
          light.style.transform = `translate(${event.clientX - 80}px, ${event.clientY - 80}px)`;

          // Actualizar opacidad de elementos reveladores
          const revealElements = document.querySelectorAll(".light-reveal");
          revealElements.forEach((element) => {
            const el = element as HTMLElement;
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calcular distancia al cursor
            const distance = Math.hypot(
              event.clientX - centerX,
              event.clientY - centerY
            );

            // Ajustar opacidad basado en la proximidad
            const maxDistance = 250;
            const opacity = Math.max(0, 1 - distance / maxDistance);
            el.style.opacity = opacity.toString();
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <div
        ref={containerRef}
        className="relative h-[100vh] bg-black overflow-hidden"
      >
        {/* Luz principal que sigue el mouse */}
        <div
          ref={lightRef}
          className="absolute w-40 h-40 bg-yellow-200 rounded-full opacity-50 pointer-events-none blur-3xl transition-transform duration-[50ms] ease-out"
        />

        {/* Texto principal */}
        <span className="flex justify-center pt-40 light-reveal text-white text-xl font-semibold">
          How I made the light effect?
        </span>

        <div className="text-white flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-black hover:text-white">
            Lenis + Light Effect
          </h1>
        </div>

        {/* Muchos elementos light-reveal aleatorios */}
        {Array.from({ length: 200 }).map((_, i) => {
          const top = `${Math.floor(Math.random() * 100)}%`;
          const left = `${Math.floor(Math.random() * 100)}%`;
          const size = `${Math.floor(Math.random() * 24) + 8}px`; // entre 8px y 32px
          const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-pink-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-cyan-500",
            "bg-yellow-500",
            "bg-rose-500",
            "bg-lime-500",
            "bg-fuchsia-500",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <div
              key={`light-${i}`}
              className={`light-reveal absolute rounded-full opacity-0 transition-opacity duration-300 ${color}`}
              style={{
                top,
                left,
                width: size,
                height: size,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <main ref={container} className="relative h-[200vh] ">
        {/* Primera sección */}
        <Section1>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white">
              <h1 className=" text-4xl md:text-6xl font-bold">
                Hola, soy <span className="text-yellow-400">Myke</span>
                <h1>
                  {" "}
                  <Typewriter
                    words={[
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
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h1>
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
        <Section2>
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
        <Section3 />
        {isDesktop && <SmoothScrollWithLight />}
      </main>
    </>
  );
}
