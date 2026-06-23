import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { artist } from "@/data/artist";

const streaming = [
  { label: "Spotify", color: "from-green-500 to-emerald-600" },
  { label: "Apple Music", color: "from-rose-500 to-pink-600" },
  { label: "YouTube", color: "from-red-500 to-red-600" },
  { label: "Audiomack", color: "from-orange-500 to-amber-500" },
];

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={artist.heroImage}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-ink-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
      </motion.div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-400"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 14}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative h-full flex items-center">
        <div className="container-luxe pt-32 pb-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="eyebrow mb-6"
            >
              <Sparkles className="h-3 w-3" /> Grammy Award-Winning Artist
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="display-xl text-balance"
              >
                {artist.stageName}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="display-lg text-gradient-aurora text-balance mt-2"
              >
                {artist.tagline}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
            >
              {artist.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link to="/music" className="btn-primary group">
                <Play className="h-4 w-4 fill-current" />
                Listen Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/videos" className="btn-secondary">
                Watch Videos
              </Link>
              <Link to="/albums" className="btn-secondary">
                View Albums
              </Link>
              <Link to="/contact" className="btn-secondary hidden sm:inline-flex">
                Book Artist
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <span className="text-xs text-white/40 tracking-[0.3em] uppercase">Stream on</span>
              {streaming.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r ${s.color} bg-opacity-20 hover:scale-105 transition`}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="container-luxe pb-8">
          <div className="glass rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">8.2B+</div>
              <div className="text-xs text-white/50 tracking-widest uppercase mt-1">Global Streams</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">47+</div>
              <div className="text-xs text-white/50 tracking-widest uppercase mt-1">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">32</div>
              <div className="text-xs text-white/50 tracking-widest uppercase mt-1">Platinum</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold">184</div>
              <div className="text-xs text-white/50 tracking-widest uppercase mt-1">Live Shows</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-32 right-8 hidden lg:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.4em] text-white/40 rotate-90 origin-center whitespace-nowrap">SCROLL</span>
      </motion.div>
    </section>
  );
}
