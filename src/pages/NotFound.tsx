import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
      <div className="container-luxe text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="display-xl text-gradient-gold">404</div>
          <h1 className="display-md mt-6">Lost in the sound</h1>
          <p className="text-white/60 mt-4 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
