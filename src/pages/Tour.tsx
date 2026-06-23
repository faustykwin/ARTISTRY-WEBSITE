import TourDatesSection from "@/components/TourDates/TourDatesSection";
import { motion } from "framer-motion";

export default function Tour() {
  return (
    <div className="pt-32">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="eyebrow mb-3">World Tour 2025</div>
          <h1 className="display-xl text-balance">Catch the Show</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            47 cities. 5 continents. One global event. Don't miss a night.
          </p>
        </motion.div>
      </div>
      <TourDatesSection />
    </div>
  );
}
