import { useMotionValue, useSpring, motion } from "motion/react";
import { ReactElement, useRef } from "react";

export default function Magnetic({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use spring to add smooth easing
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.8 });

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
