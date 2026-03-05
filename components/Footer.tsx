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
    <footer style={{ background: "var(--navy)", color: "#fff", marginTop: "0" }}>
      {/* Big CTA text */}
      <div
        className="max-w-5xl mx-auto text-center"
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            lineHeight: 1.35,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "100%",
            marginBottom: "2.5rem",
          }}
        >
          {lang === "da" ? (
            <>
              Lad os skabe noget{" "}
              <em className="font-semibold" style={{ color: "#93C5FD" }}>ekstraordinært.</em>
            </>
          ) : (
            <>
              Let&apos;s create something{" "}
              <em className="font-semibold" style={{ color: "#93C5FD" }}>extraordinary.</em>
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
          {lang === "da" ? "Få en gratis analyse →" : "Get a free analysis →"}
        </Link>
      </div>

      {/* Nav + contact */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 flex items-center justify-center" style={{ background: "#fff" }}>
            <span className="text-[9px] font-bold tracking-widest" style={{ color: "var(--navy)" }}>STW</span>
          </div>
          <span className="font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>STW-Webdesign</span>
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
        className="max-w-5xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
        style={{ color: "rgba(255,255,255,0.25)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="pt-5">© 2026 STW-Webdesign</span>
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
