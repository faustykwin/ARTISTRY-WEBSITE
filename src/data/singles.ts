export interface Single {
  id: string;
  title: string;
  cover: string;
  releaseDate: string;
  featuring?: string;
  plays: string;
  duration: string;
  description: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  audiomackUrl?: string;
  boomplayUrl?: string;
  deezerUrl?: string;
}

export const singles: Single[] = [
  {
    id: "JOGODO",
    title: "JOGODO",
    cover: "/images/album-1.jpg",
    releaseDate: "2026-05-15",
    plays: "5M",
    duration: "2:25",
    description:
      "A vibrant Afrobeat vibe filled with energy, rhythm, and good vibes. The most ambitious project of Jim Blaq's career.",
   spotifyUrl: "https://open.spotify.com/track/6Ix4Jse9sCsjSCNdPqRx5W?si=okVxnlo6RWmpP40JILAw_w",
    appleMusicUrl: "https://music.apple.com/ng/artist/jim-blaq/1740981476?ls",
    youtubeUrl: "https://youtube.com/@jimblaqtv?si=Fpze01LSESi3gG8f",
    soundcloudUrl:  "https://on.soundcloud.com/KAr0BlqORTM5X73vOb",
    audiomackUrl: "https://audiomack.com/jimblaqofafrica",
    boomplayUrl: "https://www.boomplay.com/share/artist/88402493?share_platform=an&srList=ANDROID&srModel=COPYLINK&share_channel=copylink&share_content=artist",
    // deezerUrl: "https://deezer.com/track/neon-hearts",
  },

  {
    id: "My Heart",
    title: "My Heart",
    cover: "/images/album-2.jpg",
    releaseDate: "2025-07-07",
    plays: "3M",
    duration: "2:25",
    description:
      "My Heart ❤️🎶A soulful love song expressing deep feelings, genuine affection, and emotions straight from the heart.The most streamed project of Jim Blaq's career.",
    spotifyUrl: "https://open.spotify.com/track/kings-highway",
    appleMusicUrl: "https://music.apple.com/track/kings-highway",
    youtubeUrl: "https://youtube.com/watch?v=kings-highway",
    soundcloudUrl: "https://soundcloud.com/aurelio/kings-highway",
    audiomackUrl: "https://audiomack.com/aurelio/kings-highway",
    boomplayUrl: "https://boomplay.com/aurelio/kings-highway",
    deezerUrl: "https://deezer.com/track/kings-highway",
  },

   









  // {
  //   id: "after-hours",
  //   title: "After Hours",
  //   cover: "/images/single-3.jpg",
  //   releaseDate: "2022-10-28",
  //   featuring: "The Weeknd",
  //   plays: "385M",
  //   duration: "3:42",
  //   description:
  //     "A dark, cinematic collaboration with The Weeknd. The song that united two worlds and broke streaming records.",
  //   spotifyUrl: "https://open.spotify.com/track/after-hours",
  //   appleMusicUrl: "https://music.apple.com/track/after-hours",
  //   youtubeUrl: "https://youtube.com/watch?v=after-hours",
  //   soundcloudUrl: "https://soundcloud.com/aurelio/after-hours",
  //   audiomackUrl: "https://audiomack.com/aurelio/after-hours",
  //   boomplayUrl: "https://boomplay.com/aurelio/after-hours",
  //   deezerUrl: "https://deezer.com/track/after-hours",
  // },
  // {
  //   id: "wildfire",
  //   title: "Wildfire",
  //   cover: "/images/single-4.jpg",
  //   releaseDate: "2021-08-14",
  //   featuring: "Rihanna",
  //   plays: "512M",
  //   duration: "3:18",
  //   description:
  //     "The breakout single that introduced AURELIO to the world. AURIO and Rihanna's first collaboration and a global #1.",
  //   spotifyUrl: "https://open.spotify.com/track/wildfire",
  //   appleMusicUrl: "https://music.apple.com/track/wildfire",
  //   youtubeUrl: "https://youtube.com/watch?v=wildfire",
  //   soundcloudUrl: "https://soundcloud.com/aurelio/wildfire",
  //   audiomackUrl: "https://audiomack.com/aurelio/wildfire",
  //   boomplayUrl: "https://boomplay.com/aurelio/wildfire",
  //   deezerUrl: "https://deezer.com/track/wildfire",
  // },
];
