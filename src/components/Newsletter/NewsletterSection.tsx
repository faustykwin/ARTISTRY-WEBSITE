import { motion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email");
      return;
    }
    setStatus("success");
    setError("");
    setEmail("");
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="section relative">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass p-8 md:p-16 text-center"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />
          </div>
          <div className="eyebrow justify-center mb-4">Join the Inner Circle</div>
          <h2 className="display-lg text-balance">Get Early Access</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            New music. Tour announcements. Exclusive drops. Be the first to know.
          </p>
          <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Send className="h-4 w-4" /> Subscribe
              </button>
            </div>
            {status === "error" && (
              <p className="text-xs text-rose-400 mt-3">{error}</p>
            )}
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 mt-3 inline-flex items-center gap-1.5"
              >
                <Check className="h-3 w-3" /> Welcome to the family. Check your inbox.
              </motion.p>
            )}
          </form>
          <p className="text-xs text-white/30 mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
