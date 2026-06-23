import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  Disc3,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/utils/cn";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    current,
    isPlaying,
    toggle,
    next,
    prev,
    progress,
    duration,
    volume,
    setVolume,
    seek,
    playlist,
    currentIndex,
    expanded,
    setExpanded,
  } = usePlayer();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [muted, setMuted] = useState(false);

  if (!current) return null;

  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink-950/95 backdrop-blur-3xl"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-sm tracking-widest text-white/50">NOW PLAYING</span>
                <button
                  onClick={() => setExpanded(false)}
                  className="h-10 w-10 rounded-full glass flex items-center justify-center"
                  aria-label="Close player"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-8 p-6 lg:p-12 overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative aspect-square max-w-md w-full"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/30 via-fuchsia-500/30 to-violet-500/30 blur-3xl" />
                    <img
                      src={current.cover}
                      alt={current.title}
                      className="relative h-full w-full rounded-full object-cover shadow-2xl"
                    />
                    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-ink-950 border border-white/10" />
                  </motion.div>
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <div className="eyebrow mb-3">{current.albumTitle ?? "Single"}</div>
                    <h2 className="display-md">{current.title}</h2>
                    <p className="text-white/60 mt-2">{current.artist}</p>
                  </div>
                  <div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        seek(x);
                      }}
                    >
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-white/50 mt-2">
                      <span>{formatTime(progress)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setShuffle((s) => !s)}
                      className={cn("p-2", shuffle ? "text-amber-400" : "text-white/60")}
                      aria-label="Shuffle"
                    >
                      <Shuffle className="h-4 w-4" />
                    </button>
                    <button onClick={prev} aria-label="Previous" className="p-2">
                      <SkipBack className="h-6 w-6" />
                    </button>
                    <button
                      onClick={toggle}
                      className="h-16 w-16 rounded-full bg-amber-400 flex items-center justify-center text-black shadow-2xl shadow-amber-500/40"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
                    </button>
                    <button onClick={next} aria-label="Next" className="p-2">
                      <SkipForward className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setRepeat((r) => !r)}
                      className={cn("p-2", repeat ? "text-amber-400" : "text-white/60")}
                      aria-label="Repeat"
                    >
                      <Repeat className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setMuted((m) => !m)} aria-label="Mute">
                      {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setMuted(false);
                        }}
                        className="w-full accent-amber-400"
                        aria-label="Volume"
                      />
                    </div>
                    <span className="text-xs text-white/50 w-8 text-right">{Math.round((muted ? 0 : volume) * 100)}</span>
                  </div>
                </div>
              </div>
              {showPlaylist && (
                <div className="border-t border-white/5 max-h-80 overflow-y-auto p-6">
                  <h3 className="text-sm tracking-widest text-white/50 mb-4">QUEUE</h3>
                  <ul className="space-y-2">
                    {playlist.map((t, i) => (
                      <li
                        key={t.id}
                        onClick={() => {
                          if (i !== currentIndex) {
                            // naive: jump via re-load with track
                          }
                        }}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-white/5",
                          i === currentIndex && "bg-white/5"
                        )}
                      >
                        <img src={t.cover} alt="" className="h-10 w-10 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{t.title}</div>
                          <div className="text-xs text-white/50 truncate">{t.artist}</div>
                        </div>
                        <div className="text-xs text-white/40">{t.duration}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4"
      >
        <div className="container-luxe max-w-6xl">
          <div className="glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
              <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => setExpanded(true)}
              >
                <img src={current.cover} alt={current.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                  <ChevronUp className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1 hidden sm:block">
                <div className="text-sm font-semibold truncate">{current.title}</div>
                <div className="text-xs text-white/50 truncate">{current.artist}</div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={prev} aria-label="Previous" className="p-2 text-white/70 hover:text-white">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={toggle}
                  className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center text-black"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                </button>
                <button onClick={next} aria-label="Next" className="p-2 text-white/70 hover:text-white">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 min-w-0 hidden md:block max-w-md">
                <div className="flex items-center gap-2 text-[10px] text-white/50">
                  <span className="w-10 text-right">{formatTime(progress)}</span>
                  <div
                    className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      seek(x);
                    }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full relative"
                      style={{ width: `${percent}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                  <span className="w-10">{formatTime(duration)}</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 min-w-[120px]">
                <button onClick={() => setMuted((m) => !m)} aria-label="Mute">
                  {muted || volume === 0 ? <VolumeX className="h-4 w-4 text-white/60" /> : <Volume2 className="h-4 w-4 text-white/60" />}
                </button>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setMuted(false);
                    }}
                    className="w-full accent-amber-400"
                    aria-label="Volume"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowPlaylist((s) => !s)}
                className="p-2 text-white/60 hover:text-white hidden sm:block"
                aria-label="Toggle playlist"
              >
                <ListMusic className="h-4 w-4" />
              </button>

              <button
                onClick={() => setExpanded(true)}
                className="p-2 text-white/60 hover:text-white hidden sm:block"
                aria-label="Expand"
              >
                <Disc3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
