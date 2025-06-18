import { Section } from "./section";
import { motion, useTransform } from "framer-motion";
import React from "react";
import type { MotionValue } from "framer-motion";
import { FileDown, Linkedin, Calendar } from "lucide-react";
import { TypewriterText } from "./TypewriterText";
import { useTranslation } from "../../lib/useTranslation";

export function Section1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { t } = useTranslation();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  // Controlar la visibilidad del TypewriterText basado en el scroll
  // Cuando scrollYProgress > 0.3, consideramos que la sección está saliendo de vista
  const typewriterVisibility = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, 0, 0]
  );
  
  // Convertir el MotionValue a boolean para el TypewriterText
  const [isTypewriterVisible, setIsTypewriterVisible] = React.useState(true);
  
  React.useEffect(() => {
    const unsubscribe = typewriterVisibility.on("change", (value) => {
      setIsTypewriterVisible(value > 0.5);
    });
    
    return unsubscribe;
  }, [typewriterVisibility]);
  
  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-b from-blue-500 to-blue-300 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            <div className="flex flex-col">
              {t.hero.greeting} <span className="inline-block text-yellow-400">{t.hero.name}</span>
              <TypewriterText 
                className="flex-row ml-2" 
                isVisible={isTypewriterVisible}
              />
            </div>
          </h1>

          <motion.div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.a
              href="https://www.linkedin.com/in/mzapatadvlpr/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Connect with me!"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              {t.hero.linkedin}
            </motion.a>

            <motion.a
              href="/src/assets/CVMaikolZapata.pdf"
              download
              data-cursor-text="Download PDF"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              {t.hero.downloadCV}
            </motion.a>

            <motion.a
              href="https://calendly.com/zmaikol399"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Book a call"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t.hero.scheduleCall}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
} 