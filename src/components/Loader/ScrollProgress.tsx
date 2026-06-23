import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      style={{ width: `${progress}%` }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-violet-500 z-[100]"
    />
  );
}
