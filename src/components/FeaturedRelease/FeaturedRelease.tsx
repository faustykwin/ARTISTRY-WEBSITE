import { motion } from "framer-motion";
import { Play, Plus, Share2, Calendar, Disc3 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { albums } from "@/data/albums";
import { usePlayer } from "@/context/PlayerContext";

const streamingButtons = [
  { label: "Spotify", color: "bg-[#1DB954] hover:bg-[#1ed760]" },
  { label: "Apple Music", color: "bg-gradient-to-r from-[#FA243C] to-[#FB5C74] hover:opacity-90" },
  { label: "Audiomack", color: "bg-[#FFA200] hover:bg-[#ffb52e] text-black" },
  { label: "Boomplay", color: "bg-[#1A1F8F] hover:bg-[#2229a3]" },
  { label: "YouTube Music", color: "bg-[#FF0000] hover:bg-[#ff1a1a]" },
  { label: "Deezer", color: "bg-black border border-white/20 hover:bg-white/10" },
  { label: "SoundCloud", color: "bg-[#FF7700] hover:bg-[#ff8833]" },
];

export default function FeaturedRelease() {
  const featured = albums[0];
  const { play } = usePlayer();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlay = () => {
    if (featured.tracks[0]) {
      play({
        id: featured.tracks[0].id,
        title: featured.tracks[0].title,
        artist: "AURELIO",
        cover: featured.cover,
        duration: featured.tracks[0].duration,
        albumTitle: featured.title,
        src: featured.tracks[0].audioUrl,
      });
    }
  };

  const releaseDate = new Date(featured.releaseDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-500/10 via-fuchsia-500/10 to-violet-500/10 blur-3xl" />
      </div>

      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="eyebrow justify-center mb-4">Latest Release</div>
          <h2 className="display-lg text-balance">{featured.title}</h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">{featured.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${featured.color} opacity-30 blur-2xl`} />
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={handlePlay}
                  aria-label="Play featured release"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="h-20 w-20 rounded-full bg-amber-400 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition">
                    <Play className="h-8 w-8 text-black fill-current ml-1" />
                  </div>
                </button>
              </motion.div>
              <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 flex items-center gap-3">
                <Disc3 className="h-5 w-5 text-amber-400 animate-[spin_4s_linear_infinite]" />
                <div>
                  <div className="text-xs text-white/50">NEW ALBUM</div>
                  <div className="text-sm font-bold">{releaseDate}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider">
                OUT NOW
              </span>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Calendar className="h-4 w-4" />
                {releaseDate}
              </div>
            </div>

            <h3 className="display-md">{featured.title}</h3>
            <p className="text-white/60 leading-relaxed">{featured.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {streamingButtons.map((b) => (
                <a
                  key={b.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`${b.color} text-white text-sm font-semibold py-3 px-4 rounded-full text-center transition shadow-lg`}
                >
                  {b.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePlay}
                className="btn-primary"
              >
                <Play className="h-4 w-4 fill-current" /> Play Album
              </button>
              <button
                onClick={handleShare}
                className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <Link
                to={`/albums/${featured.id}`}
                className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"
                aria-label="View details"
              >
                <Plus className="h-4 w-4" />
              </Link>
            </div>
            {copied && <p className="text-xs text-amber-400">Link copied!</p>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
