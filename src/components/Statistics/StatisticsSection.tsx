import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { statistics } from "@/data/statistics";
import { useCountUp } from "@/hooks/useCountUp";

function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function Counter({ to, suffix, prefix }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);
  const value = useCountUp(to, 1800, inView);
  const isFloat = !Number.isInteger(to);
  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-gradient-gold">
      {prefix}
      {isFloat ? value.toFixed(1) : value}
      {suffix}
    </div>
  );
}

export default function StatisticsSection() {
  // ✅ Safety check: Prevents crash if statistics data is missing
  if (!statistics || statistics.length === 0) {
    return null;
  }

  return (
    <section className="section relative bg-gradient-to-b from-ink-900/40 via-ink-950 to-ink-950">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="eyebrow justify-center mb-3">By the Numbers</div>
          <h2 className="display-lg">The Stats Speak</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* ✅ Added ? to prevent 'map is not a function' crash */}
          {statistics?.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center glass rounded-3xl p-8 hover:bg-white/5 transition"
            >
              <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
              <div className="text-sm font-semibold tracking-widest uppercase mt-3 text-white/80">
                {s.label}
              </div>
              <div className="text-xs text-white/50 mt-2">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}