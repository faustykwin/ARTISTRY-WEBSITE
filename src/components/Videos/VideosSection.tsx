import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { videos, type Video } from "@/data/videos";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

export default function VideosSection() {
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const others = videos.filter((v) => v.id !== featured.id);
  const [active, setActive] = useState<Video | null>(null);
  const { ref, visible } = useReveal();

  return (
    <section className="section relative">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="eyebrow justify-center mb-3">Visual World</div>
          <h2 className="display-lg">Music Videos</h2>
        </motion.div>

        {/* Featured video */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "relative aspect-video rounded-3xl overflow-hidden cursor-pointer group mb-8",
            visible ? "" : ""
          )}
          onClick={() => setActive(featured)}
        >
          <img src={featured.thumbnail} alt={featured.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition">
              <Play className="h-8 w-8 text-white fill-current ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="eyebrow mb-2">Featured</div>
            <h3 className="display-md text-balance">{featured.title}</h3>
            <div className="flex items-center gap-4 text-sm text-white/60 mt-2">
              <span>{featured.views} views</span>
              <span>·</span>
              <span>Directed by {featured.director}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {others.map((v) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActive(v)}
              className="relative aspect-video rounded-xl overflow-hidden group text-left"
            >
              <img src={v.thumbnail} alt={v.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-xs font-semibold truncate">{v.title}</div>
                <div className="text-[10px] text-white/60">{v.views} views</div>
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
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
            >
              <iframe
                src={active.youtubeUrl}
                title={active.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
