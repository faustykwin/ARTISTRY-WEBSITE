import { motion } from "framer-motion";

const items = [
  "Grammy Award Winner",
  "8.2B+ Global Streams",
  "47+ Countries",
  "32 Platinum Certifications",
  "Headlining MSG · O2 · Tokyo Dome",
  "★ JOGODO ★ OUT NOW ★",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-ink-900/30 py-4">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((t, i) => (
          <div key={i} className="flex items-center gap-12 text-sm md:text-base tracking-[0.2em] uppercase text-white/60">
            <span className="text-amber-400">✦</span>
            <span>{t}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
