import { Section } from "./section";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useTranslation } from "../../lib/useTranslation";
import { 
  Rocket, 
  Wrench, 
  Star,
} from "lucide-react";

export function Section2({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { t } = useTranslation();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);







  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-screen sticky top-0 flex flex-col justify-center items-center text-white overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      


      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating exceptional digital experiences with modern technologies
          </p>
        </motion.div>

        {/* Enhanced About Cards with Skills */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Experience Card */}
          <motion.div 
            key="card-experience"
            className="group relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <Star className="relative w-12 h-12 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-center text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
              {t.about.experience.title}
            </h3>
            <p className="text-gray-300 text-center leading-relaxed mb-6">
              {t.about.experience.description}
            </p>

           
          </motion.div>

          {/* Specialization Card */}
          <motion.div 
            key="card-specialization"
            className="group relative bg-gradient-to-br from-pink-600/20 to-red-600/20 backdrop-blur-lg rounded-2xl p-8 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <Rocket className="relative w-12 h-12 text-pink-300 group-hover:text-pink-200 transition-colors duration-300" />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center text-pink-300 group-hover:text-pink-200 transition-colors duration-300">
              {t.about.specialization.title}
            </h3>
            <p className="text-gray-300 text-center leading-relaxed mb-6">
              {t.about.specialization.description}
            </p>

          
          </motion.div>

          {/* Skills Card */}
          <motion.div 
            key="card-skills"
            className="group relative bg-gradient-to-br from-cyan-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <Wrench className="relative w-12 h-12 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
              {t.about.skills.title}
            </h3>
            <p className="text-gray-300 text-center leading-relaxed mb-6">
              {t.about.skills.description}
            </p>

           
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
} 