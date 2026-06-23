import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(id);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);
    const t = window.setTimeout(() => setShow(false), 1400);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.10, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-ink-950 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="display-xl text-gradient-gold tracking-[0.3em]"
            >
              JIM BLAQ
            </motion.div>
            <div className="mt-8 w-64 h-px bg-white/10 relative overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <div className="mt-3 text-xs tracking-[0.4em] text-white/40 uppercase">
              {Math.floor(Math.min(100, progress))}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
