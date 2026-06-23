import { motion } from "framer-motion";
import { Disc3, Play, Search } from "lucide-react";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { albums, type Album, type Track } from "@/data/albums";
import { singles } from "@/data/singles";
import { usePlayer, type PlayerTrack } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";

type Row =
  | { kind: "album-track"; album: Album; track: Track }
  | { kind: "single"; track: typeof singles[0] };

export default function Music() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState<"all" | "albums" | "singles">("all");
  const { play, current, isPlaying, toggle } = usePlayer();

  useEffect(() => {
    const next = params.get("q") ?? "";
    setQ(next);
  }, [params]);

  const rows: Row[] = useMemo(() => {
    const list: Row[] = [];
    const query = q.toLowerCase().trim();
    const match = (txt: string) => (query ? txt.toLowerCase().includes(query) : true);

    if (type === "all" || type === "albums") {
      albums.forEach((a) => {
        if (match(a.title) || match(a.genre)) {
          a.tracks.forEach((t) => list.push({ kind: "album-track", album: a, track: t }));
        }
      });
    }
    if (type === "all" || type === "singles") {
      singles.forEach((s) => {
        if (match(s.title) || (s.featuring && match(s.featuring))) {
          list.push({ kind: "single", track: s });
        }
      });
    }
    return list;
  }, [q, type]);

  const handlePlay = (track: PlayerTrack) => play(track);

  return (
    <div className="pt-32 pb-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="eyebrow mb-3">Discography</div>
          <h1 className="display-xl text-balance">All Music</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Every song, every collaboration, every chapter — in one place.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                if (e.target.value) setParams({ q: e.target.value });
                else setParams({});
              }}
              placeholder="Search by title, featuring, or genre..."
              className="w-full pl-11 pr-4 py-3 rounded-full glass text-sm focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div className="flex items-center gap-1 glass rounded-full p-1">
            {(["all", "albums", "singles"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition",
                  type === t ? "bg-amber-400 text-black" : "text-white/60 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] tracking-widest uppercase text-white/40 border-b border-white/5">
            <div className="col-span-1">#</div>
            <div className="col-span-6 sm:col-span-5">Title</div>
            <div className="hidden sm:block col-span-3">Album</div>
            <div className="hidden sm:block col-span-2">Genre</div>
            <div className="col-span-4 sm:col-span-1 text-right">Time</div>
          </div>
          {rows.length === 0 ? (
            <div className="p-16 text-center text-white/40">No tracks found</div>
          ) : (
            rows.map((row, i) => {
              const isAlbum = row.kind === "album-track";
              const id = isAlbum ? row.track.id : row.track.id;
              const title = isAlbum ? row.track.title : row.track.title;
              const featuring = isAlbum ? row.track.featuring : row.track.featuring;
              const albumTitle = isAlbum ? row.album.title : "Single";
              const genre = isAlbum ? row.album.genre : "Single";
              const cover = isAlbum ? row.album.cover : row.track.cover;
              const duration = isAlbum ? row.track.duration : row.track.duration;
              const playerTrack: PlayerTrack = {
                id,
                title,
                artist: "AURELIO" + (featuring ? ` feat. ${featuring}` : ""),
                cover,
                duration,
                albumTitle,
              };
              const isCurrent = current?.id === playerTrack.id;
              return (
                <motion.div
                  key={id + "-" + i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 20) * 0.02 }}
                  onClick={() => (isCurrent ? toggle() : handlePlay(playerTrack))}
                  className={cn(
                    "grid grid-cols-12 gap-4 px-6 py-3 items-center border-b border-white/5 cursor-pointer hover:bg-white/5 transition group",
                    isCurrent && "bg-amber-400/5"
                  )}
                >
                  <div className="col-span-1 text-sm text-white/50 group-hover:hidden">
                    {isCurrent && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "60%" }} />
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "100%", animationDelay: "0.2s" }} />
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "70%", animationDelay: "0.4s" }} />
                      </div>
                    ) : (
                      <span className="hidden group-hover:inline-flex">
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                    )}
                    {!isCurrent && <span className="group-hover:hidden">{i + 1}</span>}
                  </div>
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                    <img src={cover} alt="" className="h-10 w-10 rounded object-cover" loading="lazy" />
                    <div className="min-w-0">
                      <div className={cn("text-sm font-medium truncate", isCurrent && "text-amber-400")}>{title}</div>
                      {featuring && <div className="text-xs text-white/50 truncate">feat. {featuring}</div>}
                    </div>
                  </div>
                  <div className="hidden sm:block col-span-3 text-sm text-white/60 truncate">{albumTitle}</div>
                  <div className="hidden sm:flex col-span-2 items-center gap-1 text-xs text-white/50 truncate">
                    {isAlbum ? <Disc3 className="h-3 w-3" /> : <Disc3 className="h-3 w-3" />}
                    {genre}
                  </div>
                  <div className="col-span-4 sm:col-span-1 text-right text-sm text-white/50">{duration}</div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
