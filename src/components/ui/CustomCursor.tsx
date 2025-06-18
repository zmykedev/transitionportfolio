import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    // Seguimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Punto central sigue rápido
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Outline sigue más lento
      gsap.to(cursorOutline, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Efecto hover simple
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        // Hacer más grande en hover
        gsap.to(cursorDot, {
          scale: 2,
          backgroundColor: '#3b82f6',
          duration: 0.3
        });
        
        gsap.to(cursorOutline, {
          scale: 1.5,
          borderColor: '#3b82f6',
          duration: 0.3
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        // Volver al tamaño normal
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: '#ffffff',
          duration: 0.3
        });
        
        gsap.to(cursorOutline, {
          scale: 1,
          borderColor: '#ffffff',
          duration: 0.3
        });
      }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Punto central */}
      <div
        ref={cursorDotRef}
        className="absolute w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      />
      
      {/* Outline */}
      <div
        ref={cursorOutlineRef}
        className="absolute w-8 h-8 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
}; 