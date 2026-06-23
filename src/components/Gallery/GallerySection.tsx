import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useState, useMemo } from "react";
import { galleryImages, type GalleryImage } from "@/data/statistics";
import { cn } from "@/utils/cn";

const categories: { value: GalleryImage["category"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "performance", label: "Performance" },
  { value: "studio", label: "Studio" },
  { value: "event", label: "Events" },
  { value: "behind-the-scenes", label: "Behind the Scenes" },
  { value: "promotional", label: "Editorial" },
];

export default function GallerySection() {
  const [active, setActive] = useState<GalleryImage["category"] | "all">("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? galleryImages : galleryImages.filter((g) => g.category === active)),
    [active]
  );

  return (
    <section className="section relative">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="eyebrow justify-center mb-3">Gallery</div>
          <h2 className="display-lg">Through the Lens</h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition",
                active === c.value
                  ? "bg-amber-400 text-black"
                  : "glass text-white/70 hover:text-white"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
              onClick={() => setLightbox(img)}
              className={cn(
                "relative w-full overflow-hidden rounded-2xl group block",
                img.size === "tall" && "aspect-[3/4]",
                img.size === "wide" && "aspect-[4/3]",
                img.size === "square" && "aspect-square"
              )}
            >
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <div className="text-xs uppercase tracking-widest text-amber-400 mb-1">
                  {img.category.replace("-", " ")}
                </div>
                <div className="text-sm font-bold">{img.caption}</div>
              </div>
              <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Maximize2 className="h-4 w-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full glass flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img src={lightbox.url} alt={lightbox.caption} className="w-full h-auto rounded-2xl" />
              <div className="mt-4 text-center text-white/70 text-sm tracking-widest uppercase">
                {lightbox.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
