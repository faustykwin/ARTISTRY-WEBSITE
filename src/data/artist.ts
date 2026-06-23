export interface ArtistSocials {
  instagram: string;
  facebook: string;
  tiktok: string;
  twitter: string;
  youtube: string;
  spotify: string;
  appleMusic: string;
  audiomack: string;
  soundcloud: string;
  boomplay: string;
  website?: string;
}

export interface ArtistContact {
  email: string;
  phone: string;
  managementEmail: string;
  bookingEmail: string;
  pressEmail: string;
  businessEmail: string;
  managerName: string;
  label: string;
  location: string;
}

export interface Artist {
  stageName: string;
  realName: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  earlyLife: string;
  musicalJourney: string;
  careerHighlights: string[];
  awards: string[];
  achievements: string[];
  collaborations: string[];
  discographySummary: string;
  heroImage: string;
  portraitImage: string;
  aboutImage: string;
  socials: ArtistSocials;
  contact: ArtistContact;
  genre: string;
  origin: string;
  yearsActive: string;
  label: string;
  pronouns: string;
}

export const artist: Artist = {
  stageName: "JIM BLAQ",
  realName: "JIM BLAQ",
  tagline: "Sound of the New World",
  shortBio:
    "Award-winning recording artist, performer, and creative visionary redefining modern sound across continents.",
  longBio: `JIM BLAQ is more than an artist — he is a movement. With a voice that travels from Lagos to OJO VMA, he is becoming an upcoming global ambassador for a generation redefining what music looks, sounds, and feels like.

Born into a family of storytellers and raised between continents, JIM BLAQ's signature sound fuses Afrobeats, R&B, electronic soul, and cinematic production into something entirely his own. His records have topped charts in over 40 countries, headlined festivals on five continents, and soundtracked a cultural shift that critics have called "the new global standard."

Every release is a statement. Every performance is an event. Every lyric is a postcard from the future he's building.`,


earlyLife: `Born in Lagos,Nigeria and raised among his four siblings JIM BLAQ grew up surrounded by musicians, poets, and storytellers. He wrote his first song at seven, performed live at twelve, and never looked back`,
  musicalJourney: `From underground cyphers in Coker to sold-out shows in Lagos, his journey has been anything but ordinary. A self-taught producer and multi-instrumentalist, JIM BLAQ blends traditional rhythms with futuristic sonics, building a catalog that transcends language.`,
  careerHighlights: [
    "Headlined AfroNation Festival — 80,000 attendees",
    "First African artist to headline Emirate Bar  Garden three nights in a row",
    "Sold-out Lagos  shows across 47 areas in 2024",
    "Featured on TIME 100 Most promising Act List",
    "Co-founder of Jim Blaq Music",
    "Global streams surpassing 1 million across platforms",
  ],
  awards: [
    "Lagos Award — Best Male Artist (2024)",
    "Favourite Artist Award — Best International Act (2023)",
    "Lagos Choice Award — Best African Act (2024, 2022)",
    "OJO VMA — Best African Act (2024)",
    "BRIT Award — Best International Song (2024)",
  ],
 
  achievements: [
    "8 billion+ global streams",
    "40+ countries charted",
    "Diamond certification in 3 regions",
    "12 platinum certifications",
    "18 gold certifications",
  ],
  // collaborations: [
  //   "Wizkid — 'Midnight in Lagos'",
  //   "Burna Boy — 'King's Highway'",
  //   "The Weeknd — 'After Hours Africa'",
  //   "Rihanna — 'Wildfire'",
  //   "Drake — 'New Wave'",
  //   "Rosalía — 'Carmelita'",
  // ],
  discographySummary:
    "3 studio albums, 3 singles,  5+ featured collaborations. From 'My Heart' (2025) to 'JOGODO' (2026), every project is a chapter in a larger mythology of sound, identity, and global resonance. JIM BLAQ's discography is a roadmap of modern music evolution, blending genres, cultures, and eras into a singular voice that is unmistakably his own.",
  heroImage: "/images/hero-bg.jpg",
  portraitImage: "/images/artist-portrait.jpg",
  aboutImage: "/images/artist-portrait.jpg",
  socials: {
    instagram: "https://www.instagram.com/jimblaqofafrica?igsh=MTkyZnNnNnJ3dnp1Zg==",
    facebook: "https://www.facebook.com/share/1AX98BpFHG/",
    tiktok: "https://www.tiktok.com/@odogwujimblaq?_r=1&_t=ZS-97JbXGTxkVW",
    twitter: "https://x.com/Iamjimblaq",
    youtube: "https://youtube.com/@jimblaqtv?si=Fpze01LSESi3gG8f",
    spotify: "https://open.spotify.com/artist/5UgMTEX6NumevcQZUvEU3F?si=28Tn8rVKTAih4zm-diSiMg",
    appleMusic: "https://music.apple.com/ng/artist/jim-blaq/1740981476?ls",
    audiomack: "https://audiomack.com/jimblaqofafrica",
    soundcloud: "https://on.soundcloud.com/KAr0BlqORTM5X73vOb",
    boomplay: "https://www.boomplay.com/share/artist/88402493?share_platform=an&srList=ANDROID&srModel=COPYLINK&share_channel=copylink&share_content=artist",
    website: "https://unitedmasters.com/a/https-music-apple-com-ng-album-my-heart-1838081468-i-1838081469-ls",
  },
  contact: {
    email: "jimblaq88@gmail.com",
    phone: "+234 816 822 0002",
    managementEmail: "My manager email: henryabel287@gmail.com",
    bookingEmail: "jimblaq88@gmail.com",
    pressEmail: "mmaifechukwu@gmail.com",
    businessEmail: "mmaifechukwu@gmail.com",
    managerName: "CHIDEX",
    label: "Jim Blaq Music",
    location: "Lagos, Nigeria",
  },

  genre: "Afrosounds",
  origin: "Lagos, Nigeria",
  yearsActive: "2022 — Present",
  label: "Jim Blaq Music",
  pronouns: "he/him",
};
