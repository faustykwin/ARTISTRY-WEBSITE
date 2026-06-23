import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 250, mass: 0.5 });
  const springY = useSpring(y, { damping: 28, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isMobile, x, y]);

  if (isMobile) return null;
  return (
    <>
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[300] h-2 w-2 rounded-full bg-amber-400 mix-blend-difference"
      />
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="pointer-events-none fixed top-0 left-0 z-[299] h-10 w-10 rounded-full border border-amber-400/40 mix-blend-difference"
      />
    </>
  );
}
