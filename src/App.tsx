import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { useMediaQuery } from "react-responsive";

import { Section1 } from "./components/ui/section1";
import { Section2 } from "./components/ui/section2";
import { Section3 } from "./components/ui/section3";
import { LanguageProvider } from "./components/ui/LanguageProvider";
import { LanguageSwitcher } from "./components/ui/LanguageSwitcher";

export default function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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

  return (
    <LanguageProvider initialLanguage="es">
      <LanguageSwitcher />
      <main ref={container} className="relative h-[200vh] ">
        {/* Primera sección */}
        <Section1 scrollYProgress={scrollYProgress} />

        {/* Segunda sección */}
        <Section2 scrollYProgress={scrollYProgress} />

        {/* Tercera sección */}
        <Section3 isMobile={isMobile} />
      </main>
    </LanguageProvider>
  );
}
