import { motion } from "framer-motion";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { artist } from "@/data/artist";

const eventTypes = [
  "Private Performance",
  "Festival Booking",
  "Corporate Event",
  "Charity Gala",
  "Album Launch",
  "Press / Interview",
  "Brand Partnership",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", phone: "", eventType: "", subject: "", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name) e.name = "Required";
    if (!form.email) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.eventType) e.eventType = "Please select";
    if (!form.subject) e.subject = "Required";
    if (!form.message) e.message = "Required";
    return e;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm(initial);
    window.setTimeout(() => setSubmitted(false), 5000);
  };

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
          <div className="eyebrow justify-center mb-3">Get in Touch</div>
          <h2 className="display-lg">Book JIM BLAQ</h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            For bookings, press, and partnerships — our team is ready.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="eyebrow mb-3">Booking</div>
              <a href={`mailto:${artist.contact.bookingEmail}`} className="text-lg font-semibold hover:text-amber-400 transition break-all">
                {artist.contact.bookingEmail}
              </a>
              <p className="text-sm text-white/50 mt-2">All live performance, festival, and private event inquiries.</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="eyebrow mb-3">Management</div>
              <div className="text-base font-semibold">{artist.contact.managerName}</div>
              <a href={`mailto:${artist.contact.managementEmail}`} className="text-sm text-white/70 hover:text-amber-400 transition break-all block mt-1">
                {artist.contact.managementEmail}
              </a>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="eyebrow mb-3">Press</div>
              <a href={`mailto:${artist.contact.pressEmail}`} className="text-sm text-white/70 hover:text-amber-400 transition break-all">
                {artist.contact.pressEmail}
              </a>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="eyebrow mb-3">Business</div>
              <a href={`mailto:${artist.contact.businessEmail}`} className="text-sm text-white/70 hover:text-amber-400 transition break-all">
                {artist.contact.businessEmail}
              </a>
            </div>
            <div className="glass rounded-2xl p-6 space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" /> {artist.contact.location}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400" /> {artist.contact.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400" /> {artist.contact.label}
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 glass rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Name *</label>
                <input
                  value={form.name}
                  onChange={update("name")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Phone</label>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Event Type *</label>
                <select
                  value={form.eventType}
                  onChange={update("eventType")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm bg-ink-900"
                >
                  <option value="">Select...</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.eventType && <p className="text-xs text-rose-400 mt-1">{errors.eventType}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Subject *</label>
              <input
                value={form.subject}
                onChange={update("subject")}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm"
              />
              {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-white/50 block mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/50 text-sm resize-none"
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-white/40">We respond within 24-48 hours.</p>
              <button type="submit" className="btn-primary">
                <Send className="h-4 w-4" /> Send Inquiry
              </button>
            </div>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm"
              >
                <Check className="h-4 w-4" /> Thank you. Our team will be in touch within 48 hours.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
