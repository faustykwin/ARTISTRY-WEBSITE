import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, Moon, Music2, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { artist } from "@/data/artist";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Music", to: "/music" },
  { label: "Albums", to: "/albums" },
  { label: "Videos", to: "/videos" },
  { label: "Gallery", to: "/gallery" },
  { label: "Tour", to: "/tour" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(5,5,7,0)", "rgba(5,5,7,0.85)"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/music?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "backdrop-blur-2xl border-b border-white/5 py-3" : "py-6"
        )}
      >
        <div className="container-luxe flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3" aria-label="Home">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Music2 className="h-5 w-5 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold tracking-[0.2em] leading-none">{artist.stageName}</div>
              <div className="text-[10px] tracking-[0.4em] text-white/40 mt-0.5">OFFICIAL</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive ? "text-amber-400" : "text-white/70 hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px w-6 bg-amber-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/5 transition"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/5 transition"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary text-xs"
            >
              Book Artist
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-2xl flex items-start justify-center pt-32 px-6"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="w-full max-w-3xl"
            >
              <form onSubmit={onSearchSubmit} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search songs, albums, videos..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-16 pr-32 py-5 text-lg focus:outline-none focus:border-amber-500/50"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/5"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
              <p className="text-center text-xs text-white/40 mt-4 tracking-widest">
                PRESS ENTER TO SEARCH MUSIC
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-sm bg-ink-900 border-l border-white/5 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-lg font-bold tracking-[0.2em]">MENU</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "block px-4 py-3 text-2xl font-bold tracking-tight transition",
                          isActive ? "text-amber-400" : "text-white/80 hover:text-white"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="p-6 mt-4 border-t border-white/5 space-y-3">
                <Link to="/contact" className="btn-primary w-full">
                  Book the Artist
                </Link>
                <div className="flex items-center justify-between px-2">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
                  >
                    <Search className="h-4 w-4" /> Search
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{" "}
                    {theme === "dark" ? "Light" : "Dark"}
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
