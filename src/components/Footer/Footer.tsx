import { motion } from "framer-motion";
import { ArrowUp, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import { artist } from "@/data/artist";
import type { ReactNode } from "react";

const linkSections: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Music", to: "/music" },
      { label: "Albums", to: "/albums" },
      { label: "Videos", to: "/videos" },
    ],
  },
  {
    title: "World",
    links: [
      { label: "Gallery", to: "/gallery" },
      { label: "Tour", to: "/tour" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/contact" },
      { label: "Terms", to: "/contact" },
      { label: "Cookies", to: "/contact" },
      { label: "Press Kit", to: "/contact" },
    ],
  },
];

function SocialIcon({ children, href, label }: { children: ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-amber-400/20 hover:text-amber-400 transition"
    >
      {children}
    </a>
  );
}

const InstagramSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YoutubeSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const TiktokSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.31a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.74z" />
  </svg>
);
const FacebookSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export default function Footer() {
  const s = artist.socials;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-ink-950 border-t border-white/5 pt-20 pb-32">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Music2 className="h-6 w-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-[0.2em]">{artist.stageName}</div>
                <div className="text-xs tracking-[0.4em] text-white/40 mt-0.5">OFFICIAL</div>
              </div>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">{artist.shortBio}</p>
            <div className="mt-6 text-sm text-white/50">{artist.contact.location}</div>
            <div className="flex items-center gap-2 mt-6">
              <SocialIcon href={s.instagram} label="Instagram"><InstagramSvg /></SocialIcon>
              <SocialIcon href={s.twitter} label="Twitter"><TwitterSvg /></SocialIcon>
              <SocialIcon href={s.youtube} label="YouTube"><YoutubeSvg /></SocialIcon>
              <SocialIcon href={s.tiktok} label="TikTok"><TiktokSvg /></SocialIcon>
              <SocialIcon href={s.facebook} label="Facebook"><FacebookSvg /></SocialIcon>
            </div>
          </div>

          {linkSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <div className="eyebrow mb-4 text-amber-400">{section.title}</div>
              <ul className="space-y-2">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-white/60 hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <motion.button
              whileHover={{ y: -4 }}
              onClick={scrollTop}
              aria-label="Back to top"
              className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center text-black shadow-lg shadow-amber-500/30"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 tracking-widest uppercase">
            © {new Date().getFullYear()} {artist.stageName}. All rights reserved. {artist.contact.label}
          </div>
          <div className="text-xs text-white/40">
            Crafted with obsession in {artist.contact.location}
          </div>
        </div>
      </div>
    </footer>
  );
}
