import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Hero from "@/components/Hero/Hero";
import Marquee from "@/components/Hero/Marquee";
import FeaturedRelease from "@/components/FeaturedRelease/FeaturedRelease";
import AlbumsSection from "@/components/Albums/AlbumsSection";
import SinglesSection from "@/components/Singles/SinglesSection";
import VideosSection from "@/components/Videos/VideosSection";
import { artist } from "@/data/artist";
import { Link } from "react-router-dom";

const GallerySection = lazy(() => import("@/components/Gallery/GallerySection"));
const BiographySection = lazy(() => import("@/components/Biography/BiographySection"));
const StatisticsSection = lazy(() => import("@/components/Statistics/StatisticsSection"));
const TestimonialsSection = lazy(() => import("@/components/Testimonials/TestimonialsSection"));
const NewsletterSection = lazy(() => import("@/components/Newsletter/NewsletterSection"));

function Skeleton({ h = "h-96" }: { h?: string }) {
  return <div className={`skeleton ${h} rounded-3xl my-12`} aria-hidden="true" />;
}

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Marquee />
      <FeaturedRelease />
      <AlbumsSection />
      <SinglesSection />
      <VideosSection />
      <Suspense fallback={<Skeleton />}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <BiographySection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <StatisticsSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* CTA Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-fuchsia-500/10 to-violet-500/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-3xl" />
        </div>
        <div className="container-luxe text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow justify-center mb-3">Experience Live</div>
            <h2 className="display-xl text-balance">Be There When It Happens</h2>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg">
              {artist.stageName} is hitting cities across the globe in 2025. Don't just stream the moment — live it.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/tour" className="btn-primary">Get Tickets</Link>
              <Link to="/videos" className="btn-secondary">Watch the Show</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<Skeleton h="h-64" />}>
        <NewsletterSection />
      </Suspense>
    </div>
  );
}
