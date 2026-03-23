import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface ProjectEyeProps {
  color: string;
}

const ProjectEye: React.FC<ProjectEyeProps> = ({ color }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Springs keep the "spark" movement smooth and liquid
  const pupilX = useSpring(0, { stiffness: 200, damping: 25 });
  const pupilY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

      // Distance the spark travels inside the ring (2px to 3px)
      const distance = 2.5;

      pupilX.set(Math.cos(angle) * distance);
      pupilY.set(Math.sin(angle) * distance);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pupilX, pupilY]);

  return (
    <div
      ref={containerRef}
      className={`shrink-0 size-4 transition-transform duration-300 group-hover:scale-110 border bg-linear-to-br ${color} p-px rounded-full flex items-center justify-center`}
    >
      {/* 
        The "Backdrop" is now transparent. 
        The spark now floats directly against the Sidebar background.
      */}
      <div className="size-full rounded-full flex items-center justify-center bg-transparent">
        <motion.div
          style={{ x: pupilX, y: pupilY }}
          className={`size-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] bg-white
          `}
        />
      </div>
    </div>
  );
};

export default ProjectEye;
