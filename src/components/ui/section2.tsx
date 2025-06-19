import { Section } from "./section";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";

export function Section2({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { t } = useTranslation();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  
  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-b from-red-400 to-red-600 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Tarjeta 3D 1 - Experiencia */}
        <motion.div className="group relative bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
          <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
            {t.about.experience.title}
          </h3>
          <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
            {t.about.experience.description}
          </p>
        </motion.div>

        {/* Tarjeta 3D 2 - Especialización */}
        <motion.div className="group relative bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
          <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
            {t.about.specialization.title}
          </h3>
          <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
            {t.about.specialization.description}
          </p>
        </motion.div>

        {/* Tarjeta 3D 3 - Habilidades */}
        <motion.div className="group relative bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-3xl p-6 shadow-2xl cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
          <h3 className="text-2xl font-extrabold mb-4 text-center group-hover:text-yellow-300">
            {t.about.skills.title}
          </h3>
          <p className="text-sm text-white text-center leading-relaxed group-hover:text-yellow-100">
            {t.about.skills.description}
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
} 