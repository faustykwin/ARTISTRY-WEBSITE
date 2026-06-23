import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Cloud,
  Headphones,
  Music2,
  Radio,
} from "lucide-react";
import type { ReactNode } from "react";
import { socialPlatforms, type SocialPlatformKey } from "@/data/socials";
import { artist, type ArtistSocials } from "@/data/artist";

type IconComponent = LucideIcon | ((props: { className?: string }) => ReactNode);

const CustomFacebook = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const CustomInstagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CustomTwitter = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CustomYoutube = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const CustomTiktok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.31a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.74z" />
  </svg>
);

const iconMap: Record<SocialPlatformKey, IconComponent> = {
  instagram: CustomInstagram as IconComponent,
  youtube: CustomYoutube as IconComponent,
  tiktok: CustomTiktok as IconComponent,
  twitter: CustomTwitter as IconComponent,
  facebook: CustomFacebook as IconComponent,
  spotify: Music2,
  appleMusic: Apple,
  audiomack: Headphones,
  soundcloud: Cloud,
  boomplay: Radio,
};

const urlMap: Record<SocialPlatformKey, keyof ArtistSocials> = {
  instagram: "instagram",
  youtube: "youtube",
  tiktok: "tiktok",
  twitter: "twitter",
  facebook: "facebook",
  spotify: "spotify",
  appleMusic: "appleMusic",
  audiomack: "audiomack",
  soundcloud: "soundcloud",
  boomplay: "boomplay",
};

export default function SocialLinksSection() {
  return (
    <section className="section relative">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="eyebrow justify-center mb-3">Stay Connected</div>
          <h2 className="display-lg">Follow the Journey</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {socialPlatforms.map((p, i) => {
            const Icon = iconMap[p.key];
            const url = artist.socials[urlMap[p.key]] ?? "#";
            return (
              <motion.a
                key={p.key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-5 text-center hover:bg-white/5 transition"
              >
                <div
                  className={`mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg mb-3`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm font-semibold">{p.label}</div>
                <div className="text-xs text-white/50 mt-1">{p.followers}</div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
