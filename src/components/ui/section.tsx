import { motion, MotionStyle } from "framer-motion";
import { forwardRef } from "react";

type SectionProps = {
  className?: string;
  children?: React.ReactNode;
  style?: MotionStyle;
};

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className = "", children, style }, ref) => {
    return (
      <motion.div ref={ref} style={style} className={className}>
        {children}
      </motion.div>
    );
  }
);

Section.displayName = "Section";
