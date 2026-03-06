"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./LangProvider";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLang();
  const pathname = usePathname();

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
        className="fixed top-0 left-0 right-0 bg-white border-b border-slate-100"
        style={{ zIndex: 1000, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
      >
        <nav className="wrap h-20 flex items-center justify-between gap-8">
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
                color: "var(--navy)",
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
                  color: "var(--navy)",
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
              className="text-xs font-semibold transition-colors hover:opacity-60"
              style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
            >
              {lang === "da" ? "EN" : "DA"}
            </button>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: "var(--blue)",
                color: "#fff",
                padding: "0.65rem 1.4rem",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
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
              <Menu size={22} style={{ color: "var(--navy)" }} />
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
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ background: "var(--navy)", zIndex: 999 }}
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
                    onClick={() => setMobileOpen(false)}
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
