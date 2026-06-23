import { motion } from "framer-motion";
import { Disc3, Music, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { albums, type Album } from "@/data/albums";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";

export default function AlbumsSection() {
  const [filter, setFilter] = useState<"all" | "album" | "ep">("all");
  const { play } = usePlayer();
  const filtered: Album[] = albums.filter((a) => filter === "all" || a.type === filter);
  
  const handlePlay = (album: Album) => {
  const track = album.tracks[0];
  if (!track) return;           // Safety check: make sure track exists
  if (!track.audioUrl) return;  // ✅ Safety check: skip if it has no audio file

  play({
    id: track.id,
    title: track.title,
    artist: "JIM BLAQ" + (track.featuring ? ` feat. ${track.featuring}` : ""),
    cover: album.cover,
    duration: track.duration,
    albumTitle: album.title,
    src: track.audioUrl, // Now TypeScript knows this is definitely a string!
  });
};

  return (
    <section className="section relative">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow mb-3">Discography</div>
            <h2 className="display-lg">Albums & EPs</h2>
            <p className="text-white/60 mt-3 max-w-xl">
              Four studio projects. Each one a chapter. Each one a world.
            </p>
          </motion.div>

          <div className="flex items-center gap-2 glass rounded-full p-1">
            {(["all", "album", "ep"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition",
                  filter === f ? "bg-amber-400 text-black" : "text-white/60 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link to={`/albums/${album.id}`} className="block">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${album.color} opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-700`} />
                  <img
                    src={album.cover}
                    alt={album.title}
                    loading="lazy"
                    className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlay(album);
                    }}
                    aria-label={`Play ${album.title}`}
                    className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-amber-400 flex items-center justify-center text-black shadow-2xl shadow-amber-500/30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </button>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] tracking-widest uppercase font-semibold">
                    {album.type}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                    <Disc3 className="h-3 w-3" />
                    {album.year} · {album.tracks.length} tracks
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-1 line-clamp-2">{album.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/albums" className="btn-secondary">
            <Music className="h-4 w-4" /> View All Albums
          </Link>
        </div>
      </div>
    </section>
  );
}
