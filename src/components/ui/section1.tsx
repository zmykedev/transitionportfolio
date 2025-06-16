import { Section } from "./section";
import { useTransform } from "framer-motion";
import { useScroll } from "framer-motion";
import React from "react";

export function Section1({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: any }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-b from-blue-500 to-blue-300 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
    >
      {children}
    </Section>
  );
} 