import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number; // ms por letra
  pause?: number; // ms entre frases
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  className = "",
  typingSpeed = 70,
  pause = 1000, // 1 segundo por defecto
}) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "clearing">("typing");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayed.length < words[currentWord].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[currentWord].slice(0, displayed.length + 1));
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
      setCurrentWord((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, words, currentWord, typingSpeed, pause]);

  return (
    <span
      className={`inline-block border-r-2 border-orange-400 pr-1 font-mono whitespace-nowrap align-middle ${className} animate-blink-caret`}
      style={{ minHeight: "1em" }}
    >
      {displayed}
    </span>
  );
}; 