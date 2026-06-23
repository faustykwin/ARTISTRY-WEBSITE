import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import ScrollProgress from "@/components/Loader/ScrollProgress";
import CustomCursor from "@/components/Loader/CustomCursor";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import { PlayerProvider } from "@/context/PlayerContext";

const Home = lazy(() => import("@/pages/Home"));
const Music = lazy(() => import("@/pages/Music"));
const Albums = lazy(() => import("@/pages/Albums"));
const AlbumDetail = lazy(() => import("@/pages/AlbumDetail"));
const Videos = lazy(() => import("@/pages/Videos"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Tour = lazy(() => import("@/pages/Tour"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="skeleton h-32 w-32 rounded-full" />
    </div>
  );
}

function AppContent() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PlayerProvider>
          <SEO />
          <Loader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <ScrollToTop />
          <main className="relative z-10">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/albums/:id" element={<AlbumDetail />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/tour" element={<Tour />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <MusicPlayer />
        </PlayerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
