import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { pressFeatures } from "@/data/statistics";
import { artist } from "@/data/artist";
import { cn } from "@/utils/cn";

export default function PressSection() {
  return (
    <section className="section relative bg-ink-900/40">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="eyebrow justify-center mb-3">Press & Media</div>
          <h2 className="display-lg">In the Spotlight</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressFeatures.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass rounded-2xl p-6 hover:bg-white/5 transition relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center font-bold text-sm",
                    p.category === "cover"
                      ? "bg-amber-400 text-black"
                      : "bg-white/5 border border-white/10 text-white/80"
                  )}
                >
                  {p.logo}
                </div>
                <span className="text-[10px] tracking-widest uppercase text-white/40 font-bold">
                  {p.category}
                </span>
              </div>
              <div className="text-xs text-white/40 mb-2">{p.outlet}</div>
              <h3 className="text-lg font-bold leading-tight group-hover:text-amber-400 transition">
                {p.title}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-white/50">
                  {new Date(p.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={`mailto:${artist.contact.pressEmail}`}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-amber-400 transition"
          >
            <ExternalLink className="h-4 w-4" /> Press inquiries — {artist.contact.pressEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
