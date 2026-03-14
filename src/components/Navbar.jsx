import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Background", href: "/#background" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/#contact" },
];

function NavLink({ link, onClick }) {
  const location = useLocation();
  const isRoute = !link.href.startsWith("/#");
  const isActive = isRoute && location.pathname.startsWith(link.href);

  if (isRoute) {
    return (
      <Link
        to={link.href}
        className={`text-sm transition-colors ${
          isActive
            ? "text-brand-500 font-medium"
            : "text-base-500 hover:text-base-900"
        }`}
        onClick={onClick}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className="text-sm text-base-500 hover:text-base-900 transition-colors"
      onClick={onClick}
    >
      {link.label}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-white/90 backdrop-blur-md border-b border-base-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm tracking-wider text-brand-500 hover:text-brand-600 transition-colors font-bold"
        >
          EK
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-base-500 hover:text-base-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-base-white/95 backdrop-blur-md border-b border-base-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  link={link}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
