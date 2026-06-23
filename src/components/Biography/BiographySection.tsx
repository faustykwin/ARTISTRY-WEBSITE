import { motion } from "framer-motion";
import { Award, Music, Star, Trophy } from "lucide-react";
import { artist } from "@/data/artist";

export default function BiographySection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-3xl -z-10" />

      <div className="container-luxe">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="eyebrow mb-3">The Artist</div>
            <h2 className="display-lg text-balance mb-6">
              A Story Written in <span className="text-gradient-gold">Sound</span>
            </h2>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={artist.aboutImage} alt={artist.stageName} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs tracking-widest text-amber-400 mb-1">REAL NAME</div>
                <div className="text-2xl font-bold">{artist.realName}</div>
                <div className="text-sm text-white/60 mt-2">
                  {artist.origin} · {artist.yearsActive}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-12"
          >
            <div>
              <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">{artist.longBio}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Music className="h-4 w-4 text-amber-400" />
                <h3 className="text-xl font-bold">Musical Journey</h3>
              </div>
              <p className="text-white/60 leading-relaxed">{artist.musicalJourney}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-4 w-4 text-amber-400" />
                <h3 className="text-xl font-bold">Early Life</h3>
              </div>
              <p className="text-white/60 leading-relaxed">{artist.earlyLife}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-4 w-4 text-amber-400" />
                <h3 className="text-xl font-bold">Career Highlights</h3>
              </div>
              <ul className="space-y-3">
                {/* ✅ Added the '?' to prevent crashing */}
                {artist.careerHighlights?.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <span className="text-amber-400 mt-1">✦</span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-4 w-4 text-amber-400" />
                <h3 className="text-xl font-bold">Notable Collaborations</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* ✅ Added the '?' to prevent crashing */}
                {artist.collaborations?.map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full glass text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}