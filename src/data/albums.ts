export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
  featuring?: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  year: string;
  genre: string;
  description: string;
  tracks: Track[];
  label: string;
  type: "single"  | "ep" | "album";
  spotifyUrl?: string;
  appleMusicUrl?: string;
  releaseDate: string;
  color: string;
}

export const albums: Album[] = [
  {
    id: "JOGODO",
    title: "JOGODO",
    cover: "/images/album-1.jpg",
    year: "2026",
    genre: "Afrobeats • JOGODO 🎶🔥",
    description:
      "A vibrant Afrobeat vibe filled with energy, rhythm, and good vibes. The most ambitious project of Jim Blaq's career.",
    label: "Jim Blaq Music",
    type: "single",
    spotifyUrl: "https://open.spotify.com/track/6Ix4Jse9sCsjSCNdPqRx5W?si=okVxnlo6RWmpP40JILAw_w",
    appleMusicUrl: "https://music.apple.com/ng/album/jogodo/1895418940?i=6763652653&ls",
    releaseDate: "2026-05-15",
    color: "from-violet-600 via-fuchsia-500 to-amber-400",
    tracks: [
      { id: "t1", number: 1, title: "JOGODO (Intro)", duration: "2:25", audioUrl: "/Audio/t1.mp3" },
      // { id: "t2", number: 2, title: "Neon Hearts", duration: "3:42", featuring: "Wizkid", audioUrl: "/Audio/t2.mp3" },
      // { id: "t3", number: 3, title: "Higher", duration: "3:18", audioUrl: "/Audio/t3.mp3" },
      // { id: "t4", number: 4, title: "Velvet", duration: "4:01", audioUrl: "/Audio/t4.mp3" },
      // { id: "t5", number: 5, title: "Last Train Home", duration: "3:55", featuring: "Rosalía", audioUrl: "/Audio/t5.mp3" },
      // { id: "t6", number: 6, title: "Crown", duration: "3:22", audioUrl: "/Audio/t6.mp3" },
      // { id: "t7", number: 7, title: "After Hours", duration: "4:30", audioUrl: "/Audio/t7.mp3" },
      // { id: "t8", number: 8, title: "Sahara Gold", duration: "3:48", featuring: "Burna Boy", audioUrl: "/Audio/t8.mp3" },
      // { id: "t9", number: 9, title: "Mama", duration: "4:12", audioUrl: "/Audio/t9.mp3" },
      // { id: "t10", number: 10, title: "New Dawn", duration: "5:01", audioUrl: "/Audio/t10.mp3" },
    ],
  },
  {
    id: "My Heart",
    title: "My Heart",
    cover: "/images/album-2.jpg",
    year: "2025",
    genre: "Afrobeats• R&B",
    description:
      "My Heart ❤️🎶A soulful love song expressing deep feelings, genuine affection, and emotions straight from the heart.The most streamed project of Jim Blaq's career.",
    label: "Jim Blaq Music",
    type: "single",
    spotifyUrl: "https://open.spotify.com/track/7uUwvNg6LkosOd5pap650o?si=YyTijPTXTGqvMiRoO2xQ1w",
    appleMusicUrl: "https://music.apple.com/ng/album/my-heart/1838081468?i=1838081469&ls",
    releaseDate: "2025-07-07",
    color: "from-rose-600 via-red-500 to-orange-400",
    tracks: [
      { id: "k1", number: 1, title: "My Heart", duration: "2:55", audioUrl: "/Audio/k1.mp3" },
      // { id: "k2", number: 2, title: "King's Highway", duration: "3:34", featuring: "Burna Boy", audioUrl: "/Audio/k2.mp3" },
      // { id: "k3", number: 3, title: "Believer", duration: "3:18", audioUrl: "/Audio/k3.mp3" },
      // { id: "k4", number: 4, title: "Royalty", duration: "3:42", audioUrl: "/Audio/k4.mp3" },
      // { id: "k5", number: 5, title: "Heritage", duration: "4:01", audioUrl: "/Audio/k5.mp3" },
      // { id: "k6", number: 6, title: "Crown Me", duration: "3:21", audioUrl: "/Audio/k6.mp3" },
      // { id: "k7", number: 7, title: "Roots", duration: "4:18", audioUrl: "/Audio/k7.mp3" },
      // { id: "k8", number: 8, title: "Born Again", duration: "3:55", audioUrl: "/Audio/k8.mp3" },
      // { id: "k9", number: 9, title: "Kingsley Reprise", duration: "5:30", audioUrl: "/Audio/k9.mp3" },
    ],
  },
  // {
  //   id: "after-hours",
  //   title: "After Hours",
  //   cover: "/images/album-3.jpg",
  //   year: "2022",
  //   genre: "Alt-Soul",
  //   description:
  //     "A late-night meditation on love, loneliness, and liminal spaces. The album that established AURELIO as a global force.",
  //   label: "KINGSLEY Records",
  //   type: "album",
  //   spotifyUrl: "https://open.spotify.com/album/after-hours",
  //   appleMusicUrl: "https://music.apple.com/album/after-hours",
  //   releaseDate: "2022-11-18",
  //   color: "from-blue-600 via-cyan-400 to-sky-300",
  //   tracks: [
  //     { id: "a1", number: 1, title: "After Hours", duration: "3:42", featuring: "The Weeknd", audioUrl: "/Audio/a1.mp3" },
  //     { id: "a2", number: 2, title: "Liminal", duration: "3:18", audioUrl: "/Audio/a2.mp3" },
  //     { id: "a3", number: 3, title: "All Night", duration: "4:01", audioUrl: "/Audio/a3.mp3" },
  //     { id: "a4", number: 4, title: "Static", duration: "3:55", audioUrl: "/Audio/a4.mp3" },
  //     { id: "a5", number: 5, title: "Drift", duration: "4:22", audioUrl: "/Audio/a5.mp3" },
  //     { id: "a6", number: 6, title: "Echoes", duration: "3:30", audioUrl: "/Audio/a6.mp3" },
  //   ],
  // },
  // {
  //   id: "wildfire-ep",
  //   title: "Wildfire EP",
  //   cover: "/images/album-4.jpg",
  //   year: "2021",
  //   genre: "Afrobeats",
  //   description:
  //     "Five tracks that ignited a global fanbase. AURELIO's first international release and the project that broke him on the global stage.",
  //   label: "KINGSLEY Records",
  //   type: "ep",
  //   spotifyUrl: "https://open.spotify.com/album/wildfire",
  //   appleMusicUrl: "https://music.apple.com/album/wildfire",
  //   releaseDate: "2021-08-21",
  //   color: "from-amber-500 via-orange-500 to-rose-500",
  //   tracks: [
  //     { id: "w1", number: 1, title: "Wildfire", duration: "3:18", featuring: "Rihanna", audioUrl: "/Audio/w1.mp3" },
  //     { id: "w2", number: 2, title: "Inferno", duration: "3:42", audioUrl: "/Audio/w2.mp3" },
  //     { id: "w3", number: 3, title: "Smoke", duration: "3:55", audioUrl: "/Audio/w3.mp3" },
  //     { id: "w4", number: 4, title: "Ash", duration: "4:01", audioUrl: "/Audio/w4.mp3" },
  //     { id: "w5", number: 5, title: "Phoenix", duration: "3:30", audioUrl: "/Audio/w5.mp3" },
  //   ],
  // },
];