import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { albums } from "@/data/albums";
import { singles } from "@/data/singles";

export interface PlayerTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  featuring?: string;
  albumTitle?: string;
  src: string; // ✅ ADDED: needed to link to your audio files
}

interface PlayerContextValue {
  playlist: PlayerTrack[];
  currentIndex: number;
  current: PlayerTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  play: (track?: PlayerTrack) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  seek: (percent: number) => void;
  loadPlaylist: (tracks: PlayerTrack[]) => void;
  expanded: boolean;
  setExpanded: (e: boolean) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

function buildDefaultPlaylist(): PlayerTrack[] {
  const tracks: PlayerTrack[] = [];
  
  albums.forEach((a) => {
    a.tracks.forEach((t) => {
      // ✅ Use t.audioUrl from the updated albums.ts
      if (!t.audioUrl) {
        console.warn(`⚠️ Track "${t.title}" has no audioUrl, skipping.`);
        return; // skip tracks without audio
      }
      tracks.push({
        id: t.id,
        title: t.title,
        artist: "JIM BLAQ" + (t.featuring ? ` feat. ${t.featuring}` : ""),
        cover: a.cover,
        duration: t.duration,
        featuring: t.featuring,
        albumTitle: a.title,
        src: t.audioUrl, // ✅ pass the audio URL
      });
    });
  });

  singles.slice(0, 4).forEach((s) => {
    if (!s.audioUrl) {
      console.warn(`⚠️ Single "${s.title}" has no audioUrl, skipping.`);
      return;
    }
    tracks.push({
      id: s.id,
      title: s.title,
      artist: "JIM BLAQ" + (s.featuring ? ` feat. ${s.featuring}` : ""),
      cover: s.cover,
      duration: s.duration,
      featuring: s.featuring,
      albumTitle: "Single",
      src: s.audioUrl, // ✅ pass the audio URL
    });
  });
  return tracks;
}

function parseDuration(d: string): number {
  const parts = d.split(":").map(Number);
  return parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<PlayerTrack[]>(() => buildDefaultPlaylist());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [expanded, setExpanded] = useState(false);

  // ✅ Create a reference for the actual HTML Audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = playlist[currentIndex] ?? null;
  const duration = current ? parseDuration(current.duration) : 0;

  // ✅ 1. Initialize Audio once
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ✅ 2. Load a new track when current changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;

    audio.src = current.src;
    audio.load();
    setProgress(0);

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Playback error:", err));
    }
  }, [current, currentIndex]);

  // ✅ 3. Handle Play / Pause toggling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, current]);

  // ✅ 4. Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // ✅ 5. Listen to real timeupdate and ended events (replaces your fake interval)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      // Auto-advance to the next track when the current one finishes
      setCurrentIndex((i) => (i + 1) % playlist.length);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playlist.length]);

  // ✅ 6. Play/Pause logic
  const play = (track?: PlayerTrack) => {
    if (track) {
      const idx = playlist.findIndex((t) => t.id === track.id);
      if (idx >= 0) {
        setCurrentIndex(idx);
      } else {
        setPlaylist((p) => [...p, track]);
        setCurrentIndex(playlist.length);
      }
      setProgress(0);
    }
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying((p) => !p);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setProgress(0);
  };

  const prev = () => {
    if (progress > 3) {
      setProgress(0);
      return;
    }
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
  };

  const seek = (percent: number) => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    const newTime = (percent / 100) * duration;
    audio.currentTime = newTime; // ✅ Now actually seeks the real audio
    setProgress(newTime);
  };

  const loadPlaylist = (tracks: PlayerTrack[]) => {
    if (tracks.length === 0) return;
    setPlaylist(tracks);
    setCurrentIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentIndex,
        current,
        isPlaying,
        progress,
        duration,
        volume,
        play,
        pause,
        toggle,
        next,
        prev,
        setVolume,
        seek,
        loadPlaylist,
        expanded,
        setExpanded,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}