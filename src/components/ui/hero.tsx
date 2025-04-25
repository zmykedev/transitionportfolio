import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface IslandProps extends HTMLMotionProps<"div"> {
  position?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Island({
  position = "inset-0",
  className = "",
  children,
  ...motionProps
}: IslandProps) {
  return (
    <motion.div
      className={clsx(
        "absolute z-10 stciky flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-300 text-white",
        position,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      {...motionProps}
    >
      {children ?? (
        <h1 className="text-4xl md:text-6xl font-bold">Soy un Island ✨</h1>
      )}
    </motion.div>
  );
}
