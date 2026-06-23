import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/utils/cn";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl -z-10" />
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="eyebrow justify-center mb-3">Fan Voices</div>
          <h2 className="display-lg">From JIM BLAQ Family</h2>
        </motion.div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute -top-4 -left-4 h-16 w-16 text-amber-500/10" />
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90 text-balance">
              "{current.review}"
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <img
                src={current.image}
                alt={current.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-amber-400/30"
                loading="lazy"
              />
              <div className="text-left">
                <div className="font-semibold">{current.name}</div>
                <div className="text-xs text-white/50">
                  {current.role} · {current.location}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-8 bg-amber-400" : "w-1.5 bg-white/20"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
