import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Search, Ticket, X } from "lucide-react";
import { useMemo, useState } from "react";
import { tourDates } from "@/data/tourDates";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/utils/cn";

function Countdown({ date }: { date: string }) {
  const { days, hours, minutes, seconds } = useCountdown(date);
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 max-w-xs">
      {items.map((it) => (
        <div key={it.label} className="text-center glass rounded-lg p-2">
          <div className="text-xl font-bold text-amber-400">{it.value.toString().padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function TourDatesSection() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [selected, setSelected] = useState<typeof tourDates[0] | null>(null);

  const countries = useMemo(() => Array.from(new Set(tourDates.map((t) => t.country))), []);

  const filtered = useMemo(() => {
    return tourDates
      .filter((t) => (country === "all" ? true : t.country === country))
      .filter((t) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
          t.city.toLowerCase().includes(q) ||
          t.venue.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q)
        );
      });
  }, [query, country]);

  return (
    <section className="section relative">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="eyebrow mb-3">Live in Concert</div>
            <h2 className="display-lg">World Tour 2025</h2>
            <p className="text-white/60 mt-3 max-w-xl">47 cities. 5 continents. One global event.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city or venue..."
                className="pl-11 pr-4 py-3 rounded-full glass text-sm focus:outline-none focus:border-amber-500/50 w-full sm:w-64"
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 rounded-full glass text-sm focus:outline-none focus:border-amber-500/50 bg-ink-900/50"
            >
              <option value="all">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="space-y-3">
          {filtered.map((t, i) => {
            const d = new Date(t.date);
            const month = d.toLocaleDateString("en-US", { month: "short" });
            const day = d.getDate();
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04, duration: 0.4 }}
                className="glass rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 group hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/20 flex flex-col items-center justify-center">
                    <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                      {month}
                    </div>
                    <div className="text-2xl font-bold leading-none">{day}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span>{t.flag}</span>
                      <span>{t.country}</span>
                      {t.status === "sold-out" && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] uppercase tracking-wider font-bold">
                          Sold Out
                        </span>
                      )}
                      {t.status === "few-tickets" && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase tracking-wider font-bold">
                          Few Tickets
                        </span>
                      )}
                      {t.status === "announced" && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] uppercase tracking-wider font-bold">
                          Announced
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mt-1">{t.city}</h3>
                    <div className="flex items-center gap-1 text-sm text-white/50 mt-0.5">
                      <MapPin className="h-3 w-3" /> {t.venue}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelected(t)}
                    className="px-4 py-2 rounded-full glass hover:bg-white/10 text-xs font-semibold tracking-wide uppercase"
                  >
                    Details
                  </button>
                  <a
                    href={t.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5",
                      t.status === "sold-out"
                        ? "bg-white/5 text-white/40"
                        : "bg-amber-400 text-black hover:bg-amber-300"
                    )}
                  >
                    <Ticket className="h-3 w-3" />
                    {t.status === "sold-out" ? "Waitlist" : "Tickets"}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ink-900 border border-white/10 rounded-3xl max-w-lg w-full p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-amber-400 text-xs tracking-widest uppercase mb-1">
                    {selected.flag} {selected.country}
                  </div>
                  <h3 className="text-3xl font-bold">{selected.city}</h3>
                  <div className="text-white/60 mt-1">{selected.venue}</div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="h-10 w-10 rounded-full glass flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-white/80 mb-6">
                <Calendar className="h-4 w-4" />
                {new Date(selected.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="mb-6">
                <div className="text-xs tracking-widest text-white/50 uppercase mb-3">Countdown</div>
                <Countdown date={selected.date} />
              </div>

              <a
                href={selected.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold tracking-wide uppercase text-sm",
                  selected.status === "sold-out"
                    ? "bg-white/10 text-white/60"
                    : "bg-amber-400 text-black hover:bg-amber-300"
                )}
              >
                <Ticket className="h-4 w-4" />
                {selected.status === "sold-out" ? "Join Waitlist" : "Get Tickets"}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
