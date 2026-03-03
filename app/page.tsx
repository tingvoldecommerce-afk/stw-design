"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";
import { Globe, Bot, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const stats = [
  { da: { num: "10+", label: "Tilfredse kunder" }, en: { num: "10+", label: "Happy clients" } },
  { da: { num: "24/7", label: "AI support" }, en: { num: "24/7", label: "AI support" } },
  { da: { num: "100%", label: "Dansk bureau" }, en: { num: "100%", label: "Danish agency" } },
  { da: { num: "5★", label: "Anmeldelser" }, en: { num: "5★", label: "Reviews" } },
];

const services = [
  {
    icon: <Globe size={24} />,
    da: { title: "Hjemmesider", desc: "Skræddersyede, hurtige og SEO-venlige hjemmesider bygget i Next.js – klar til konverteringer." },
    en: { title: "Websites", desc: "Custom, fast and SEO-friendly websites built with Next.js – ready to convert." },
  },
  {
    icon: <Bot size={24} />,
    da: { title: "AI Chatbots", desc: "Intelligente chatbots der håndterer kundehenvendelser 24/7 og genererer leads mens du sover." },
    en: { title: "AI Chatbots", desc: "Intelligent chatbots that handle customer inquiries 24/7 and generate leads while you sleep." },
  },
  {
    icon: <TrendingUp size={24} />,
    da: { title: "SEO", desc: "Strategisk søgemaskineoptimering der øger din synlighed, trafik og omsætning over tid." },
    en: { title: "SEO", desc: "Strategic search engine optimisation that increases your visibility, traffic and revenue." },
  },
];

const steps = [
  { da: "Analyse", en: "Analysis" },
  { da: "Design", en: "Design" },
  { da: "Udvikling", en: "Development" },
  { da: "Lancering", en: "Launch" },
];

const caseStudy = {
  da: {
    label: "Case study",
    title: "Casalinga Italiana",
    desc: "Komplet Next.js hjemmeside med interaktiv menu, kurv og online bestilling til en lokal restaurant. Resultat: 40% stigning i online reservationer.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  en: {
    label: "Case study",
    title: "Casalinga Italiana",
    desc: "Complete Next.js website with interactive menu, cart and online ordering for a local restaurant. Result: 40% increase in online reservations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
};

export default function HomePage() {
  const { lang } = useLang();
  const cs = lang === "da" ? caseStudy.da : caseStudy.en;

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "100svh", paddingBottom: "5rem" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="STW Design workspace"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Navy gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.55) 60%, rgba(10,22,40,0.3) 100%)",
            zIndex: 1,
          }}
        />

        <div
          className="relative w-full max-w-6xl mx-auto px-6"
          style={{ zIndex: 10 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            {lang === "da" ? "Dansk digitalt bureau" : "Danish digital agency"}
          </p>
          <h1
            className="text-white leading-tight mb-8"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              maxWidth: "42rem",
            }}
          >
            {lang === "da" ? (
              <>Vi bygger digitale løsninger <em className="italic font-normal" style={{ color: "#93C5FD" }}>der virker.</em></>
            ) : (
              <>We build digital solutions <em className="italic font-normal" style={{ color: "#93C5FD" }}>that work.</em></>
            )}
          </h1>
          <p className="mb-10 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "32rem" }}>
            {lang === "da"
              ? "Skræddersyede hjemmesider, AI chatbots og SEO til danske virksomheder."
              : "Custom websites, AI chatbots and SEO for Danish businesses."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 transition-all"
              style={{ background: "var(--blue)", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
            >
              {lang === "da" ? "Kom i gang" : "Get started"} <ArrowRight size={14} />
            </Link>
            <Link
              href="/ydelser"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            >
              {lang === "da" ? "Se ydelser" : "Our services"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────── */}
      <section style={{ background: "var(--navy)", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => {
              const t = lang === "da" ? s.da : s.en;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="text-center py-2">
                    <div
                      className="text-3xl md:text-4xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--blue)" }}
                    >
                      {t.num}
                    </div>
                    <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {t.label}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────── */}
      <section style={{ background: "var(--bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Hvad vi tilbyder" : "What we offer"}
            </p>
            <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}>
              {lang === "da" ? "Vores ydelser" : "Our services"}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const t = lang === "da" ? s.da : s.en;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <Link
                    href="/ydelser"
                    className="group block p-8 transition-all duration-200 h-full"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--blue)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,130,246,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center mb-6"
                      style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                    >
                      {s.icon}
                    </div>
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}
                    >
                      {t.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                      {t.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-all group-hover:gap-3"
                      style={{ color: "var(--blue)" }}
                    >
                      {lang === "da" ? "Læs mere" : "Read more"} <ArrowRight size={11} />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process teaser ────────────────────────── */}
      <section style={{ background: "var(--bg-soft)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <FadeIn direction="left">
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--blue)" }}>
                {lang === "da" ? "Sådan arbejder vi" : "How we work"}
              </p>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}
              >
                {lang === "da" ? "Fra idé til lancering – på rekordtid" : "From idea to launch – in record time"}
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                {lang === "da"
                  ? "Vi følger en struktureret proces der sikrer, at dit projekt leveres til tiden, inden for budgettet og overgår dine forventninger."
                  : "We follow a structured process ensuring your project is delivered on time, within budget and exceeds your expectations."}
              </p>
              <Link
                href="/ydelser"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-all hover:gap-4"
                style={{ color: "var(--navy)" }}
              >
                {lang === "da" ? "Se alle ydelser" : "View all services"} <ArrowRight size={13} />
              </Link>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 py-4"
                    style={{ borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <span
                      className="text-4xl font-light shrink-0 w-12"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--blue)", opacity: 0.4 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="font-semibold" style={{ color: "var(--navy)" }}>
                        {lang === "da" ? step.da : step.en}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Case study ────────────────────────────── */}
      <section style={{ background: "var(--bg)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Vores arbejde" : "Our work"}
            </p>
            <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}>
              {lang === "da" ? "Et eksempel" : "A recent project"}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className="grid md:grid-cols-2 gap-0 overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* Image side */}
              <div className="relative min-h-64 md:min-h-80" style={{ background: "#0f172a" }}>
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                  alt="Casalinga Italiana"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              {/* Text side */}
              <div className="p-8 md:p-10 flex flex-col justify-center" style={{ background: "var(--bg-soft)" }}>
                <span
                  className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
                  style={{ color: "var(--blue)" }}
                >
                  {cs.label}
                </span>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}
                >
                  {cs.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                  {cs.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 font-medium"
                      style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#16a34a" }}>
                  <CheckCircle size={15} />
                  {lang === "da" ? "+40% online reservationer" : "+40% online reservations"}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────── */}
      <section style={{ background: "var(--bg-soft)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div
              className="rounded-2xl p-10 md:p-16 text-center overflow-hidden relative"
              style={{ background: "var(--navy)" }}
            >
              {/* Decorative glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                style={{ background: "var(--blue)", filter: "blur(80px)", marginTop: "-4rem" }}
              />
              <div className="relative" style={{ zIndex: 1 }}>
                <h2
                  className="text-white leading-tight mb-5"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.6rem, 4vw, 3rem)",
                  }}
                >
                  {lang === "da" ? (
                    <>Klar til at løfte din <em className="italic font-normal" style={{ color: "#93C5FD" }}>digitale tilstedeværelse?</em></>
                  ) : (
                    <>Ready to elevate your <em className="italic font-normal" style={{ color: "#93C5FD" }}>digital presence?</em></>
                  )}
                </h2>
                <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {lang === "da"
                    ? "Lad os have en uforpligtende snak om, hvad vi kan gøre for din virksomhed."
                    : "Let's have a no-obligation chat about what we can do for your business."}
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all"
                  style={{ background: "var(--blue)", color: "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
                >
                  {lang === "da" ? "Kontakt os" : "Contact us"} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
