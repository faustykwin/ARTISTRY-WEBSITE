import { motion } from "framer-motion";
import { Disc3, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { albums, type Album } from "@/data/albums";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";
export default function Albums() {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "album" | "ep">("all");
  const [query, setQuery] = useState("");
  const { play } = usePlayer();

  const years = useMemo(() => Array.from(new Set(albums.map((a) => a.year))).sort().reverse(), []);
  const genres = useMemo(() => Array.from(new Set(albums.map((a) => a.genre))), []);

  const filtered: Album[] = useMemo(() => {
    return albums
      .filter((a) => (yearFilter === "all" ? true : a.year === yearFilter))
      .filter((a) => (genreFilter === "all" ? true : a.genre === genreFilter))
      .filter((a) => (typeFilter === "all" ? true : a.type === typeFilter))
      .filter((a) => (query ? a.title.toLowerCase().includes(query.toLowerCase()) : true));
  }, [yearFilter, genreFilter, typeFilter, query]);

  return (
    <div className="pt-32 pb-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="eyebrow mb-3">Discography</div>
          <h1 className="display-xl text-balance">Albums & EPs</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Each project a world. Each world a story. Step inside.
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-3 mb-10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search albums..."
            className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
          />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-amber-500 border border-white/10 text-sm"
          >
            <option value="all">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-amber-500 border border-white/10 text-sm"
          >
            <option value="all">All genres</option>
            {genres.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            {(["all", "album", "ep"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition",
                  typeFilter === t ? "bg-amber-400 text-black" : "text-white/60"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const t = album.tracks[0];
                      if (t) play({
                        id: t.id,
                        title: t.title,
                        artist: "JIM BLAQ" + (t.featuring ? ` feat. ${t.featuring}` : ""),
                        cover: album.cover,
                        duration: t.duration,
                        albumTitle: album.title,
                        src: t.audioUrl,
                      });
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
                    {album.year} · {album.tracks.length} tracks · {album.genre}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-amber-400 transition">{album.title}</h3>
                  <p className="text-sm text-white/50 mt-1 line-clamp-2">{album.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
