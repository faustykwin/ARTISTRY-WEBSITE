export interface Testimonial {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  role: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Adaeze Okoro",
    image: "/images/gallery-4.jpg.svg",
    rating: 5,
    review:
      "I've followed JIM BLAQ from the very first drop. Every project feels like a piece of the future. JIM BLAQ changed my life — literally. I have his lyrics tattooed.",
    role: "Superfan since 2019",
    location: "Lagos, Nigeria",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    image: "/images/gallery-3.jpg.svg",
    rating: 5,
    review:
      "Saw him live at The O2. Best concert experience of my life. The production, the vocals, the energy — a masterclass in modern performance.",
    role: "Music journalist",
    location: "London, UK",
  },
  {
    id: "t3",
    name: "Sofia Martinez",
    image: "/images/gallery-2.jpg.svg",
    rating: 5,
    review:
      "JIM BLAQ doesn't just make music — he builds worlds. JOGODO is the album of the decade. Every track is a film, every lyric is a quote.",
    role: "Cultural critic",
    location: "Mexico City, Mexico",
  },
  {
    id: "t4",
    name: "Kwame Asante",
    image: "/images/gallery-5.jpg.svg",
    rating: 5,
    review:
      "He represents us. He represents Africa. He represents the future. There is no other artist doing it like JIM BLAQ right now. Period.",
    role: "Music blogger",
    location: "Accra, Ghana",
  },
  {
    id: "t5",
    name: "Isabella Rossi",
    image: "/images/gallery-1.jpg.svg",
    rating: 5,
    review:
      "I flew from Milan to see him perform in NYC. Worth every cent. The most electric performer I have ever witnessed. A true star.",
    role: "Tour attendee",
    location: "Milan, Italy",
  },
  {
    id: "t6",
    name: "Jamal Williams",
    image: "/images/gallery-6.jpg.svg",
    rating: 5,
    review:
      "JIM BLAQ is the blueprint. From the sound to the visuals to the brand — he has set a new standard for what an artist can be in the 21st century.",
    role: "Producer",
    location: "Atlanta, USA",
  },
];
