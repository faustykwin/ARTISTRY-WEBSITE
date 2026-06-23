import { motion } from "framer-motion";
import { Award, Music, Sparkles, Star, Trophy } from "lucide-react";
import BiographySection from "@/components/Biography/BiographySection";
import { artist } from "@/data/artist";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="eyebrow mb-3">Biography</div>
          <h1 className="display-xl text-balance">
            The Story of <span className="text-gradient-gold">{artist.stageName}</span>
          </h1>
        </motion.div>
      </div>

      <BiographySection />

      {/* Awards */}
      <section className="section relative">
        <div className="container-luxe">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="h-5 w-5 text-amber-400" />
                <h2 className="text-3xl font-bold">Awards</h2>
              </div>
              <div className="space-y-3">
                {artist.awards.map((a, i) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <Award className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-sm md:text-base">{a}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="h-5 w-5 text-amber-400" />
                <h2 className="text-3xl font-bold">Achievements</h2>
              </div>
              <div className="space-y-3">
                {artist.achievements.map((a, i) => (
                  <motion.div
                    key={a}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-violet-400" />
                    </div>
                    <span className="text-sm md:text-base">{a}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass rounded-3xl p-8 md:p-12 text-center"
          >
            <Music className="h-8 w-8 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Discography at a Glance</h2>
            <p className="text-white/60 max-w-2xl mx-auto">{artist.discographySummary}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/music" className="btn-primary">Explore Music</Link>
              <Link to="/contact" className="btn-secondary">Book for Events</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
