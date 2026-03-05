"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./LangProvider";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLang();
  const pathname = usePathname();

  // Only transparent on homepage hero (not scrolled)
  const isHero = pathname === "/";
  const transparent = isHero && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent"
            : "bg-white border-b border-slate-100 shadow-sm"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: "var(--navy)" }}
            >
              <span className="text-white text-[10px] font-bold tracking-widest">STW</span>
            </div>
            <span
              className="font-semibold text-sm tracking-wide"
              style={{ color: transparent ? "#fff" : "var(--navy)" }}
            >
              Webdesign
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{
                  color: transparent ? "#fff" : "var(--navy)",
                  borderBottom: pathname === l.href ? "1px solid currentColor" : "none",
                }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "da" ? "en" : "da")}
              className="text-xs font-semibold tracking-widest px-2.5 py-1 border transition-colors"
              style={{
                borderColor: transparent ? "rgba(255,255,255,0.6)" : "var(--navy)",
                color: transparent ? "#fff" : "var(--navy)",
              }}
            >
              {lang === "da" ? "EN" : "DA"}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={22} style={{ color: "var(--navy)" }} />
            ) : (
              <Menu size={22} style={{ color: transparent ? "#fff" : "var(--navy)" }} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "var(--navy)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    className="text-white text-3xl hover:opacity-60 transition-opacity"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                onClick={() => setLang(lang === "da" ? "en" : "da")}
                className="mt-4 text-sm font-semibold tracking-widest border border-white/40 text-white px-5 py-2 hover:bg-white/10 transition-colors"
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
