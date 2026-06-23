import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Disc3, Play, Share2, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { albums } from "@/data/albums";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";

export default function AlbumDetail() {
  const { id } = useParams();
  const album = albums.find((a) => a.id === id) ?? albums[0];
  const { play, current, isPlaying, toggle } = usePlayer();
  const [shareToast, setShareToast] = useState(false);

  const handleTrackPlay = (i: number) => {
    const t = album.tracks[i];
    play({
      id: t.id,
      title: t.title,
      artist: "AURELIO" + (t.featuring ? ` feat. ${t.featuring}` : ""),
      cover: album.cover,
      duration: t.duration,
      albumTitle: album.title,
    });
  };

  const handlePlayAll = () => {
    handleTrackPlay(0);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      window.setTimeout(() => setShareToast(false), 2500);
    }
  };

  const releaseDate = new Date(album.releaseDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pt-32 pb-32">
      <div className="container-luxe">
        <Link
          to="/albums"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-amber-400 transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Discography
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden sticky top-32">
              <div className={`absolute -inset-4 bg-gradient-to-br ${album.color} opacity-30 blur-3xl`} />
              <img src={album.cover} alt={album.title} className="relative h-full w-full object-cover shadow-2xl" />
              <button
                onClick={handlePlayAll}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play album"
              >
                <div className="h-20 w-20 rounded-full bg-amber-400 flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition">
                  <Play className="h-8 w-8 text-black fill-current ml-1" />
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                {album.type === "ep" ? "EP" : "Album"}
              </span>
              <span className="text-xs text-white/40">{album.genre}</span>
            </div>
            <h1 className="display-xl text-balance">{album.title}</h1>
            <p className="text-white/60 mt-6 leading-relaxed text-lg">{album.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              <div className="glass rounded-xl p-4">
                <div className="text-xs tracking-widest text-white/40 uppercase">Released</div>
                <div className="font-semibold mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400" /> {releaseDate}
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-xs tracking-widest text-white/40 uppercase">Tracks</div>
                <div className="font-semibold mt-1 flex items-center gap-2">
                  <Disc3 className="h-4 w-4 text-amber-400" /> {album.tracks.length} songs
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-xs tracking-widest text-white/40 uppercase">Label</div>
                <div className="font-semibold mt-1 text-sm">{album.label}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button onClick={handlePlayAll} className="btn-primary">
                <Play className="h-4 w-4 fill-current" /> Play Album
              </button>
              {album.spotifyUrl && (
                <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Spotify
                </a>
              )}
              {album.appleMusicUrl && (
                <a href={album.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Apple Music
                </a>
              )}
              <button
                onClick={handleShare}
                className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
            <AnimatePresence>
              {shareToast && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-amber-400 mt-3"
                >
                  Link copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Tracklist</h2>
          <div className="glass rounded-3xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] tracking-widest uppercase text-white/40 border-b border-white/5">
              <div className="col-span-1">#</div>
              <div className="col-span-7 sm:col-span-8">Title</div>
              <div className="col-span-3 sm:col-span-2 hidden sm:block">Time</div>
              <div className="col-span-1 text-right">Play</div>
            </div>
            {album.tracks.map((t, i) => {
              const isCurrent = current?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleTrackPlay(i)}
                  className={cn(
                    "grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 cursor-pointer hover:bg-white/5 transition group",
                    isCurrent && "bg-amber-400/5"
                  )}
                >
                  <div className="col-span-1 text-sm text-white/50">
                    {isCurrent && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "60%" }} />
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "100%", animationDelay: "0.2s" }} />
                        <div className="w-0.5 bg-amber-400 animate-pulse" style={{ height: "70%", animationDelay: "0.4s" }} />
                      </div>
                    ) : (
                      <span className="group-hover:hidden">{i + 1}</span>
                    )}
                    {isCurrent && isPlaying && (
                      <span className="hidden group-hover:block">
                        <X className="h-3 w-3" onClick={(e) => { e.stopPropagation(); toggle(); }} />
                      </span>
                    )}
                  </div>
                  <div className="col-span-7 sm:col-span-8">
                    <div className={cn("font-medium", isCurrent && "text-amber-400")}>{t.title}</div>
                    {t.featuring && <div className="text-xs text-white/50">feat. {t.featuring}</div>}
                  </div>
                  <div className="col-span-3 sm:col-span-2 hidden sm:flex items-center gap-1 text-sm text-white/50">
                    <Clock className="h-3 w-3" /> {t.duration}
                  </div>
                  <div className="col-span-4 sm:col-span-1 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCurrent) toggle();
                        else handleTrackPlay(i);
                      }}
                      className="h-8 w-8 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black flex items-center justify-center transition"
                    >
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
