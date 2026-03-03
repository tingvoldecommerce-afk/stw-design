"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LangProvider";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links =
    lang === "da"
      ? [
          { href: "/ydelser", label: "Ydelser" },
          { href: "/om-os", label: "Om os" },
          { href: "/kontakt", label: "Kontakt" },
        ]
      : [
          { href: "/ydelser", label: "Services" },
          { href: "/om-os", label: "About" },
          { href: "/kontakt", label: "Contact" },
        ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-widest">STW</span>
            </div>
            <span
              className={`font-semibold text-sm tracking-wide transition-colors ${
                scrolled || mobileOpen ? "text-black" : "text-white"
              }`}
            >
              Design
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  scrolled ? "text-black" : "text-white"
                } ${pathname === l.href ? "border-b border-current" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "da" ? "en" : "da")}
              className={`text-xs font-semibold tracking-widest border px-2.5 py-1 transition-colors ${
                scrolled
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {lang === "da" ? "EN" : "DA"}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={22} className="text-black" />
            ) : (
              <Menu size={22} className={scrolled ? "text-black" : "text-white"} />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={l.href}
                    className="font-playfair text-4xl text-black hover:opacity-60 transition-opacity"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setLang(lang === "da" ? "en" : "da")}
                className="text-sm font-semibold tracking-widest border border-black text-black px-4 py-2 mt-4 hover:bg-black hover:text-white transition-colors"
              >
                {lang === "da" ? "Switch to EN" : "Skift til DA"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
