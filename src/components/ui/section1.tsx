import { Section } from "./section";
import { motion, useTransform } from "framer-motion";
import React, { useMemo, useCallback, memo } from "react";
import type { MotionValue } from "framer-motion";
import { FileDown, Linkedin, Calendar, Github } from "lucide-react";
import { TypewriterText } from "./TypewriterText";
import { useTranslation } from "../../lib/useTranslation";

// Componente memoizado para cada botón
const ActionButton = memo(({ 
  href, 
  icon: Icon, 
  label, 
  gradient, 
  hoverGradient, 
  download, 
  index 
}: {
  href: string;
  icon: React.ComponentType<any>;
  label: string;
  gradient: string;
  hoverGradient: string;
  download?: boolean;
  index: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    download={download}
    initial={{ opacity: 0, y: 30, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.6, delay: 1.4 + index * 0.1, ease: "backOut" }}
    whileHover={{ 
      scale: 1.05, 
      y: -5,
      rotateX: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    }}
    whileTap={{ scale: 0.95, rotateX: -5 }}
    className={`group relative flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r ${gradient} text-white font-bold rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl text-sm md:text-base lg:text-lg overflow-hidden transform-gpu`}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Button background effect */}
    <div className={`absolute inset-0 bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    
    <Icon className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
    <span className="relative z-10">{label}</span>
  </motion.a>
));

ActionButton.displayName = 'ActionButton';

export function Section1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { t } = useTranslation();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  


  // Memoizar la configuración de botones para evitar re-renders
  const buttonConfigs = useMemo(() => [
    { 
      href: "https://github.com/zmykedev", 
      icon: Github, 
      gradient: "from-gray-700 to-gray-900", 
      hoverGradient: "from-gray-800 to-black",
      key: "github"
    },
    { 
      href: "https://www.linkedin.com/in/mzapatadvlpr/", 
      icon: Linkedin, 
      gradient: "from-blue-500 to-blue-700", 
      hoverGradient: "from-blue-600 to-blue-800",
      key: "linkedin"
    },
    { 
      href: "/src/assets/CVMaikolZapata.pdf", 
      icon: FileDown, 
      gradient: "from-gray-500 to-gray-700", 
      hoverGradient: "from-gray-600 to-gray-800", 
      download: true,
      key: "downloadCV"
    },
    { 
      href: "https://calendly.com/zmaikol399", 
      icon: Calendar, 
      gradient: "from-purple-500 to-purple-700", 
      hoverGradient: "from-purple-600 to-purple-800",
      key: "scheduleCall"
    }
  ], []);

  // Función memoizada para obtener la etiqueta traducida
  const getButtonLabel = useCallback((key: string) => {
    switch(key) {
      case 'github': return t.hero.github;
      case 'linkedin': return t.hero.linkedin;
      case 'downloadCV': return t.hero.downloadCV;
      case 'scheduleCall': return t.hero.scheduleCall;
      default: return '';
    }
  }, [t.hero.github, t.hero.linkedin, t.hero.downloadCV, t.hero.scheduleCall]);

 
  
  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-b from-blue-500 to-blue-300 h-screen sticky top-0 flex flex-col justify-center items-center text-white overflow-hidden"
    >


      {/* Professional Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/6 left-1/6 w-72 h-72 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 120, 240, 360],
            x: [0, 20, -20, 0],
            y: [0, -10, 10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/6 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-300/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 240, 120, 0],
            x: [0, -15, 15, 0],
            y: [0, 15, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-amber-300/15 to-orange-400/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

  

      <motion.div
        className="relative z-10 text-center w-full h-full flex flex-col justify-center items-center px-6 md:px-8 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Hero Content - Flex grow para llenar espacio */}
        <div className="flex-1 flex flex-col justify-center items-center max-w-7xl w-full">
          {/* Professional Background Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
          >
            <span className="text-[15vw] font-black text-white select-none tracking-wider">{t.hero.backgroundText}</span>
          </motion.div>

       

          <motion.h1 
            className="relative text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 lg:mb-12"
            initial={{ scale: 0.8, rotateX: -15 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
                className="leading-tight transform-gpu"
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {t.hero.greeting}
                </span>{" "}
                <motion.span 
                  className="inline-block text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255,215,0,0.5)",
                      "0 0 40px rgba(255,215,0,0.8)", 
                      "0 0 20px rgba(255,215,0,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t.hero.name}
                </motion.span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "backOut" }}
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem] relative"
              >
                {/* Glowing background for typewriter */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-xl rounded-lg" />
                
                {/* Code Brackets with TypewriterText */}
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  {/* Opening Bracket */}
                  <motion.span
                    className="text-cyan-400 font-mono font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 20px rgba(34, 211, 238, 0.8)"
                    }}
                  >
                    &lt;
                  </motion.span>

                  {/* TypewriterText Container */}
                  <div className="flex-1 text-center">
                    <TypewriterText 
                      className="relative text-orange-300 font-mono font-bold tracking-wide" 
                    />
                  </div>

                  {/* Closing Bracket */}
                  <motion.span
                    className="text-cyan-400 font-mono font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 20px rgba(34, 211, 238, 0.8)"
                    }}
                  >
                    /&gt;
                  </motion.span>
                </div>

                {/* Subtle code glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 blur-sm opacity-50" />
              </motion.div>
            </div>
          </motion.h1>

          {/* Enhanced Buttons with better animations */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 mt-8 md:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {buttonConfigs.map((button, index) => (
              <ActionButton
                key={button.key}
                href={button.href}
                icon={button.icon}
                label={getButtonLabel(button.key)}
                gradient={button.gradient}
                hoverGradient={button.hoverGradient}
                download={button.download}
                index={index}
              />
            ))}
          </motion.div>

     
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 pb-6 md:pb-8 lg:pb-10"
          style={{ 
            y: useTransform(scrollYProgress, [0, 0.3], [0, -50]),
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
          }}
        >

          <motion.div
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
} 