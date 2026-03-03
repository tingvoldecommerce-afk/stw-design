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
    <footer className="bg-black text-white">
      {/* Big CTA text */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-14 border-b border-white/10">
        <p
          className="text-4xl md:text-6xl lg:text-7xl leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {lang === "da" ? (
            <>
              Lad os skabe noget{" "}
              <em className="italic font-normal">ekstraordinært.</em>
            </>
          ) : (
            <>
              Let&apos;s create something{" "}
              <em className="italic font-normal">extraordinary.</em>
            </>
          )}
        </p>
        <div className="mt-8">
          <Link
            href="/kontakt"
            className="inline-block bg-white text-black text-sm font-semibold tracking-widest uppercase px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            {lang === "da" ? "Kom i gang →" : "Get started →"}
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-white flex items-center justify-center">
            <span className="text-black text-[9px] font-bold tracking-widest">STW</span>
          </div>
          <span className="text-white/70 font-medium">STW Design</span>
        </div>

        <nav className="flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-4 items-center">
          <a href="mailto:kontakt@stw-webdesign.dk" className="hover:text-white transition-colors">
            kontakt@stw-webdesign.dk
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
        <span>© 2026 STW Design</span>
        <div className="flex gap-4">
          <button onClick={onPrivacy} className="hover:text-white/60 transition-colors">
            {lang === "da" ? "Privatlivspolitik" : "Privacy Policy"}
          </button>
          <button onClick={onCookies} className="hover:text-white/60 transition-colors">
            {lang === "da" ? "Cookiepolitik" : "Cookie Policy"}
          </button>
        </div>
      </div>
    </footer>
  );
}
