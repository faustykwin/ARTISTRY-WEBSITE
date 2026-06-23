export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export const statistics: Statistic[] = [
  {
    id: "streams",
    label: "Global Streams",
    value: 8.2,
    suffix: "B+",
    description: "Streams across all platforms worldwide",
  },
  {
    id: "countries",
    label: "Countries Charted",
    value: 47,
    suffix: "+",
    description: "Top 10 chart positions globally",
  },
  {
    id: "certifications",
    label: "Platinum Certifications",
    value: 32,
    suffix: "",
    description: "Across RIAA, BPI, ARIA, and more",
  },
  {
    id: "concerts",
    label: "Live Shows",
    value: 184,
    suffix: "",
    description: "Performed across 5 continents",
  },
  {
    id: "audience",
    label: "Total Audience",
    value: 2.4,
    suffix: "M+",
    description: "Fans reached in live performance",
  },
  {
    id: "awards",
    label: "Awards Won",
    value: 24,
    suffix: "",
    description: "Including a Grammy, BET, and BRIT",
  },
];

export interface PressFeature {
  id: string;
  outlet: string;
  logo: string;
  title: string;
  url: string;
  date: string;
  category: "interview" | "feature" | "review" | "cover";
}

export const pressFeatures: PressFeature[] = [
  {
    id: "p1",
    outlet: "Rolling Stone",
    logo: "RS",
    title: "JOGODO: The Future Has a Sound",
    url: "https://rollingstone.com/aurelio",
    date: "2025-03-20",
    category: "cover",
  },
  {
    id: "p2",
    outlet: "Vogue",
    logo: "V",
    title: "Inside AURELIO's Midnight Theory Era",
    url: "https://vogue.com/aurelio",
    date: "2025-03-15",
    category: "feature",
  },
  {
    id: "p3",
    outlet: "The FADER",
    logo: "F",
    title: "AURELIO is rewriting the rules of global music",
    url: "https://thefader.com/aurelio",
    date: "2025-02-28",
    category: "interview",
  },
  {
    id: "p4",
    outlet: "Complex",
    logo: "CX",
    title: "Album of the Year: MIDNIGHT THEORY",
    url: "https://complex.com/aurelio",
    date: "2025-03-18",
    category: "review",
  },
  {
    id: "p5",
    outlet: "Billboard",
    logo: "BB",
    title: "AURELIO announces World Tour 2025",
    url: "https://billboard.com/aurelio",
    date: "2025-04-02",
    category: "feature",
  },
  {
    id: "p6",
    outlet: "GQ",
    logo: "GQ",
    title: "The Style and Sound of a New Generation",
    url: "https://gq.com/aurelio",
    date: "2024-12-10",
    category: "cover",
  },
];

export interface GalleryImage {
  id: string;
  url: string;
  category: "performance" | "studio" | "event" | "behind-the-scenes" | "promotional";
  caption: string;
  size: "tall" | "wide" | "square";
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", url: "/images/gallery-1.jpg", category: "performance", caption: "Live at The O2", size: "tall" },
  { id: "g2", url: "/images/gallery-2.jpg", category: "studio", caption: "Recording JOGODO", size: "wide" },
  { id: "g3", url: "/images/gallery-3.jpg", category: "event", caption: "Selfie chillings 2024", size: "square" },
  { id: "g4", url: "/images/gallery-4.jpg", category: "promotional", caption: "JOGODO shoot", size: "tall" },
  { id: "g5", url: "/images/gallery-5.jpg", category: "performance", caption: "Madison Square Garden", size: "wide" },
  { id: "g6", url: "/images/gallery-6.jpg", category: "behind-the-scenes", caption: "On the road", size: "square" },
  { id: "g7", url: "/images/gallery-1.jpg", category: "behind-the-scenes", caption: "Soundcheck in Lagos", size: "tall" },
  { id: "g8", url: "/images/gallery-3.jpg", category: "event", caption: "BET Awards", size: "wide" },
  { id: "g9", url: "/images/gallery-2.jpg", category: "studio", caption: "Late night session", size: "square" },
  { id: "g10", url: "/images/gallery-4.jpg", category: "promotional", caption: "JIM BLAQ era", size: "tall" },
  { id: "g11", url: "/images/gallery-5.jpg", category: "performance", caption: "AfroNation Festival", size: "wide" },
  { id: "g12", url: "/images/gallery-1.jpg", category: "behind-the-scenes", caption: "Tour performance", size: "square" },
];
