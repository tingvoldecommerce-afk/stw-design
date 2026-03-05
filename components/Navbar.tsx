"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./LangProvider";
import { Menu, X, ArrowRight } from "lucide-react";

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
        <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div
              className="w-11 h-11 flex items-center justify-center shrink-0"
              style={{ background: "var(--navy)" }}
            >
              <span
                className="text-white font-black tracking-widest"
                style={{ fontSize: "11px", fontFamily: "var(--font-montserrat)" }}
              >
                STW
              </span>
            </div>
            <span
              className="font-black tracking-tight"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "1.2rem",
                letterSpacing: "-0.02em",
                color: transparent ? "#fff" : "var(--navy)",
              }}
            >
              Webdesign
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold tracking-wide transition-opacity hover:opacity-60"
                style={{
                  color: transparent ? "#fff" : "var(--navy)",
                  borderBottom: pathname === l.href ? "2px solid currentColor" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA + lang */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => setLang(lang === "da" ? "en" : "da")}
              className="text-xs font-bold tracking-widest px-3 py-1.5 border transition-colors"
              style={{
                borderColor: transparent ? "rgba(255,255,255,0.5)" : "var(--navy)",
                color: transparent ? "#fff" : "var(--navy)",
              }}
            >
              {lang === "da" ? "EN" : "DA"}
            </button>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: transparent ? "rgba(255,255,255,0.15)" : "var(--navy)",
                color: "#fff",
                padding: "0.6rem 1.25rem",
                border: transparent ? "1px solid rgba(255,255,255,0.4)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--navy-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = transparent ? "rgba(255,255,255,0.15)" : "var(--navy)")}
            >
              {lang === "da" ? "Gratis analyse" : "Free analysis"} <ArrowRight size={12} />
            </Link>
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
                    style={{ fontFamily: "var(--font-montserrat)" }}
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
