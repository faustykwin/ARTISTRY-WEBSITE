export const socialPlatforms = [
  { key: "instagram", label: "Instagram", icon: "Instagram", followers: "12.4M", color: "from-pink-500 via-red-500 to-yellow-500" },
  { key: "youtube", label: "YouTube", icon: "Youtube", followers: "8.7M", color: "from-red-600 to-red-500" },
  { key: "tiktok", label: "TikTok", icon: "Music2", followers: "15.2M", color: "from-cyan-400 via-pink-500 to-rose-500" },
  { key: "twitter", label: "X / Twitter", icon: "Twitter", followers: "6.1M", color: "from-slate-700 to-slate-900" },
  { key: "facebook", label: "Facebook", icon: "Facebook", followers: "9.3M", color: "from-blue-600 to-blue-700" },
  { key: "spotify", label: "Spotify", icon: "Music", followers: "18.9M monthly", color: "from-green-500 to-emerald-600" },
  { key: "appleMusic", label: "Apple Music", icon: "Apple", followers: "11.2M", color: "from-pink-500 to-rose-600" },
  { key: "audiomack", label: "Audiomack", icon: "Headphones", followers: "4.6M", color: "from-orange-500 to-amber-500" },
  { key: "soundcloud", label: "SoundCloud", icon: "Cloud", followers: "2.1M", color: "from-orange-500 to-red-500" },
  { key: "boomplay", label: "Boomplay", icon: "Radio", followers: "3.8M", color: "from-blue-500 to-indigo-600" },
] as const;

export type SocialPlatformKey = (typeof socialPlatforms)[number]["key"];
