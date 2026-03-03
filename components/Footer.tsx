"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";

interface FooterProps {
  onPrivacy: () => void;
  onCookies: () => void;
}

export default function Footer({ onPrivacy, onCookies }: FooterProps) {
  const { lang } = useLang();

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
    <footer style={{ background: "var(--navy)", color: "#fff" }}>
      {/* Big CTA text */}
      <div
        className="max-w-6xl mx-auto px-6 py-16 md:py-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="leading-tight mb-8"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
          }}
        >
          {lang === "da" ? (
            <>
              Lad os skabe noget{" "}
              <em className="italic font-normal" style={{ color: "#93C5FD" }}>ekstraordinært.</em>
            </>
          ) : (
            <>
              Let&apos;s create something{" "}
              <em className="italic font-normal" style={{ color: "#93C5FD" }}>extraordinary.</em>
            </>
          )}
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-7 py-3.5 transition-all"
          style={{ background: "var(--blue)", color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
        >
          {lang === "da" ? "Kom i gang →" : "Get started →"}
        </Link>
      </div>

      {/* Nav + contact */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 flex items-center justify-center" style={{ background: "#fff" }}>
            <span className="text-[9px] font-bold tracking-widest" style={{ color: "var(--navy)" }}>STW</span>
          </div>
          <span className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>STW Design</span>
        </div>

        <nav className="flex flex-wrap gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:kontakt@stw-webdesign.dk"
          className="transition-colors hover:text-white"
        >
          kontakt@stw-webdesign.dk
        </a>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-6xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
        style={{ color: "rgba(255,255,255,0.25)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="pt-5">© 2026 STW Design</span>
        <div className="flex gap-4 pt-5">
          <button
            onClick={onPrivacy}
            className="transition-colors hover:text-white/60"
          >
            {lang === "da" ? "Privatlivspolitik" : "Privacy Policy"}
          </button>
          <button
            onClick={onCookies}
            className="transition-colors hover:text-white/60"
          >
            {lang === "da" ? "Cookiepolitik" : "Cookie Policy"}
          </button>
        </div>
      </div>
    </footer>
  );
}
