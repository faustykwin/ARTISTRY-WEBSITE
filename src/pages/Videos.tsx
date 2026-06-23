import { motion, AnimatePresence } from "framer-motion";
import { Eye, Play, X } from "lucide-react";
import { useState } from "react";
import { videos, type Video } from "@/data/videos";

export default function Videos() {
  const [active, setActive] = useState<Video | null>(null);
  const [filter, setFilter] = useState<"all" | "official" | "live">("all");
  const [search, setSearch] = useState("");

  const filtered = videos
    .filter((v) => {
      if (filter === "official") return !v.title.toLowerCase().includes("live");
      if (filter === "live") return v.title.toLowerCase().includes("live");
      return true;
    })
    .filter((v) => (search ? v.title.toLowerCase().includes(search.toLowerCase()) : true));

  return (
    <div className="pt-32 pb-32">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="eyebrow mb-3">The Visual Era</div>
          <h1 className="display-xl text-balance">Music Videos</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Cinematic, immersive, and uncompromising. Every frame a statement.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="flex-1 px-4 py-3 rounded-full glass text-sm focus:outline-none focus:border-amber-500/50"
          />
          <div className="flex items-center gap-1 glass rounded-full p-1">
            {(["all", "official", "live"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition ${
                  filter === f ? "bg-amber-400 text-black" : "text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActive(v)}
              className="group relative aspect-video rounded-2xl overflow-hidden text-left"
            >
              <img
                src={v.thumbnail}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Play className="h-5 w-5 text-white fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-balance">{v.title}</h3>
                <div className="flex items-center gap-3 text-xs text-white/60 mt-2">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {v.views}
                  </span>
                  <span>·</span>
                  <span>{v.duration}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full glass flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl"
            >
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={active.youtubeUrl}
                  title={active.title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-6 text-white">
                <h3 className="text-2xl font-bold">{active.title}</h3>
                <p className="text-white/60 mt-2">{active.description}</p>
                <div className="flex items-center gap-4 text-sm text-white/50 mt-3">
                  <span>Directed by {active.director}</span>
                  <span>·</span>
                  <span>{active.views} views</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
