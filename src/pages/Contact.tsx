import ContactSection from "@/components/Contact/ContactSection";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="pt-32">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="eyebrow mb-3">Get in Touch</div>
          <h1 className="display-xl text-balance">Let's Create Together</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            For bookings, press inquiries, and partnerships — we'd love to hear from you.
          </p>
        </motion.div>
      </div>
      <ContactSection />
    </div>
  );
}
