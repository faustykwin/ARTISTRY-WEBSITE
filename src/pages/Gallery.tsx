import GallerySection from "@/components/Gallery/GallerySection";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <div className="pt-32">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="eyebrow mb-3">Photo Gallery</div>
          <h1 className="display-xl text-balance">Through the Lens</h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            A visual journey through the world of JIM BLAQ — from sold-out arenas to intimate studio moments.
          </p>
        </motion.div>
      </div>
      <GallerySection />
    </div>
  );
}
