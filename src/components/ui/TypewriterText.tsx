import React, { useEffect, useState } from "react";
import { useTranslation } from "../../lib/useTranslation";

interface TypewriterTextProps {
  className?: string;
  typingSpeed?: number; // ms por letra
  pause?: number; // ms entre frases
  isVisible?: boolean; // Nuevo prop para controlar visibilidad
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  className = "",
  typingSpeed = 70,
  pause = 1000,
  isVisible = true, // Por defecto visible para retrocompatibilidad
}) => {
  const { t } = useTranslation();
  const typewriterWords = t.typewriter.words;
  
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "clearing">("typing");
  const [isPaused, setIsPaused] = useState(false);

  // Efecto para manejar la pausa/reanudación basada en visibilidad
  useEffect(() => {
    if (!isVisible && !isPaused) {
      // Pausar suavemente cuando no es visible
      const pauseTimeout = setTimeout(() => setIsPaused(true), 300);
      return () => clearTimeout(pauseTimeout);
    } else if (isVisible && isPaused) {
      // Reanudar suavemente cuando vuelve a ser visible
      const resumeTimeout = setTimeout(() => setIsPaused(false), 100);
      return () => clearTimeout(resumeTimeout);
    }
  }, [isVisible, isPaused]);

  // Efecto principal del typewriter
  useEffect(() => {
    // No ejecutar si está pausado
    if (isPaused) return;

    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayed.length < typewriterWords[currentWord].length) {
        timeout = setTimeout(() => {
          setDisplayed(typewriterWords[currentWord].slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => {
        setDisplayed("");
        setPhase("clearing");
      }, pause);
    } else if (phase === "clearing") {
      setPhase("typing");
      setCurrentWord((prev) => (prev + 1) % typewriterWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, currentWord, typingSpeed, pause, isPaused, typewriterWords]);

  return (
    <span
      className={`inline-block border-r-2 border-orange-400 pr-1 font-mono whitespace-nowrap align-middle ${className} transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 transform-none' : 'opacity-70 transform scale-95'
      } ${isPaused ? 'animate-pulse' : 'animate-blink-caret'}`}
      style={{ 
        minHeight: "1em",
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
      }}
    >
      {displayed}
    </span>
  );
}; 