import { Section } from "./section";
import { MotionValue, useTransform } from "framer-motion";
import React from "react";

export function Section2({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  return (
    <Section
      style={{ scale, rotate }}
      className="bg-gradient-to-b from-red-400 to-red-600 h-screen sticky top-0 flex flex-col justify-center items-center text-white"
    >
      {children}
    </Section>
  );
} 