export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  releaseDate: string;
  views: string;
  duration: string;
  director: string;
  description: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: "My Heart Video",
    title: "My Heart (Official Video)",
    thumbnail: "/images/video-1.jpg",
    youtubeUrl: "https://youtu.be/qoyzlvfNfSE?si=6WCs9MG6pRh5W45U",
    releaseDate: "2025-07-07",
    views: "2M",
    duration: "2:25",
    director: "Chidex",
    description:
      "My Heart ❤️🎶A soulful love song expressing deep feelings, genuine affection, and emotions straight from the heart.",
    featured: true,
  },

  {
    id: "JOGODO-video",
    title: "JOGODO (Official Video)",
    thumbnail: "/images/video-2.jpg",
    youtubeUrl: "https://vt.tiktok.com/ZSCJNuqDn/",
    releaseDate: "2026-05-15",
    views: "5M",
    duration: "2:25",
    director: "CHIDEX",
    description:
      "A vibrant Afrobeat vibe filled with energy, rhythm, and good vibes.Featuring OLY DE SINGER. The most ambitious project of Jim Blaq's career.",
    featured: true,
  },

















  // {
  //   id: "after-hours-video",
  //   title: "After Hours (Official Video)",
  //   thumbnail: "/images/video-3.jpg.svg",
  //   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   releaseDate: "2022-11-04",
  //   views: "298M",
  //   duration: "4:33",
  //   director: "Dave Meyers",
  //   description:
  //     "A dark cinematic collaboration with The Weeknd. Filmed in one continuous shot in downtown Tokyo.",
  //   featured: true,
  // },
  // {
  //   id: "wildfire-video",
  //   title: "Wildfire (Official Video)",
  //   thumbnail: "/images/video-1.jpg.svg",
  //   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   releaseDate: "2021-08-25",
  //   views: "412M",
  //   duration: "3:48",
  //   director: "Director X",
  //   description:
  //     "The debut that changed everything. Shot in a single take across the rooftops of Marrakech.",
  // },
  // {
  //   id: "velvet-video",
  //   title: "Velvet (Live at Madison Square Garden)",
  //   thumbnail: "/images/video-2.jpg.svg",
  //   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   releaseDate: "2024-12-15",
  //   views: "38M",
  //   duration: "5:22",
  //   director: "Live Performance",
  //   description:
  //     "Recorded live across three sold-out nights at MSG. A moment in music history.",
  // },
  // {
  //   id: "sahara-gold-video",
  //   title: "Sahara Gold (Official Video)",
  //   thumbnail: "/images/video-3.jpg.svg",
  //   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   releaseDate: "2025-03-01",
  //   views: "24M",
  //   duration: "4:18",
  //   director: "AURELIO",
  //   description:
  //     "A self-directed visual love letter to the African continent. Filmed across the Sahara desert.",
  // },
];
