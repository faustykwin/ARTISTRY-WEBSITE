import { motion } from "framer-motion";
import { Play, Share2 } from "lucide-react";
import { useState } from "react";
import { singles } from "@/data/singles";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";

export default function SinglesSection() {
  const { play } = usePlayer();
  const [activeShare, setActiveShare] = useState<string | null>(null);

  const handleShare = (id: string) => {
    if (navigator.share) {
      navigator
        .share({ title: "AURELIO", url: window.location.href })
        .catch(() => undefined);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setActiveShare(id);
      window.setTimeout(() => setActiveShare(null), 2000);
    }
  };

  return (
    <section className="section relative bg-ink-900/40">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="eyebrow justify-center mb-3">Singles</div>
          <h2 className="display-lg">Chart-Topping Hits</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {singles.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/5 transition"
            >
              <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={s.cover} alt={s.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition" />
                <button
                  onClick={() =>
                    play({
                      id: s.id,
                      title: s.title,
                      artist: "AURELIO" + (s.featuring ? ` feat. ${s.featuring}` : ""),
                      cover: s.cover,
                      duration: s.duration,
                      albumTitle: "Single",
                    })
                  }
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  aria-label={`Play ${s.title}`}
                >
                  <Play className="h-6 w-6 text-amber-400 fill-current ml-0.5" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/40 mb-1">
                  {new Date(s.releaseDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} · {s.plays} plays
                </div>
                <h3 className="text-lg font-bold truncate">{s.title}</h3>
                {s.featuring && <p className="text-sm text-white/50">feat. {s.featuring}</p>}
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
                <span className="px-2.5 py-1 rounded-full bg-white/5">{s.duration}</span>
              </div>
              <button
                onClick={() => handleShare(s.id)}
                className={cn(
                  "p-2 rounded-full hover:bg-white/10 transition",
                  activeShare === s.id ? "text-amber-400" : "text-white/60"
                )}
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
