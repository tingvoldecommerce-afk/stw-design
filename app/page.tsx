"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";
import { Globe, Bot, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: <Globe size={22} />,
    da: {
      title: "Hjemmesider der sælger",
      desc: "Hurtige, mobilvenlige hjemmesider bygget til at konvertere besøgende til betalende kunder.",
    },
    en: {
      title: "Websites that sell",
      desc: "Fast, mobile-friendly websites built to convert visitors into paying customers.",
    },
  },
  {
    icon: <Bot size={22} />,
    da: {
      title: "AI-Chatbots der automatiserer dit salg",
      desc: "Intelligente chatbots der håndterer henvendelser og genererer leads 24/7 – uden ekstra ressourcer.",
    },
    en: {
      title: "AI Chatbots that automate your sales",
      desc: "Intelligent chatbots that handle inquiries and generate leads 24/7 – without extra resources.",
    },
  },
  {
    icon: <TrendingUp size={22} />,
    da: {
      title: "SEO der gør dig synlig for de rigtige",
      desc: "Søgemaskineoptimering der øger din synlighed og bringer de rigtige kunder direkte til dig.",
    },
    en: {
      title: "SEO that makes you visible to the right people",
      desc: "Search engine optimisation that increases your visibility and brings the right customers to you.",
    },
  },
];

const steps = [
  { da: "Analyse", en: "Analysis" },
  { da: "Design", en: "Design" },
  { da: "Udvikling", en: "Development" },
  { da: "Lancering", en: "Launch" },
];

const trusts = [
  { da: "Hurtig levering", en: "Fast delivery" },
  { da: "Dansk support", en: "Danish support" },
  { da: "Ingen bindingsperiode", en: "No lock-in" },
];

export default function HomePage() {
  const { lang } = useLang();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden text-center"
        style={{ minHeight: "100svh", paddingTop: "4rem" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80"
          alt="Moderne kontor"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.92)" }}
        />

        <div
          className="relative w-full max-w-2xl mx-auto"
          style={{ zIndex: 10, padding: "6rem 2rem" }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-5"
            style={{ color: "var(--blue)" }}
          >
            {lang === "da" ? "Dansk digitalt bureau" : "Danish digital agency"}
          </p>

          <h1
            className="mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1.15,
              color: "var(--navy)",
              overflowWrap: "break-word",
            }}
          >
            {lang === "da"
              ? "Vi bygger hjemmesider, der arbejder lige så hårdt som dig."
              : "We build websites that work as hard as you do."}
          </h1>

          <p
            className="mb-10"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            {lang === "da"
              ? "Få en digital platform, der konverterer besøgende til kunder."
              : "Get a digital platform that converts visitors into customers."}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
              style={{ background: "var(--navy)", color: "#fff", padding: "1rem 2rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--navy-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--navy)")}
            >
              {lang === "da" ? "Få en gratis analyse" : "Get a free analysis"}{" "}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/ydelser"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
              style={{ border: "1.5px solid var(--navy)", color: "var(--navy)", padding: "1rem 2rem" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--navy)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--navy)"; }}
            >
              {lang === "da" ? "Se vores ydelser" : "See our services"}
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {trusts.map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                <CheckCircle2 size={13} style={{ color: "var(--blue)", flexShrink: 0 }} />
                {lang === "da" ? t.da : t.en}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────── */}
      <section style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-5xl mx-auto" style={{ padding: "0 2rem" }}>
          <FadeIn>
            <div className="text-center mb-12">
              <p
                className="text-xs tracking-[0.3em] uppercase font-semibold mb-3"
                style={{ color: "var(--blue)" }}
              >
                {lang === "da" ? "Hvad vi tilbyder" : "What we offer"}
              </p>
              <h2
                className="mb-3"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--navy)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                }}
              >
                {lang === "da" ? "Vores ydelser" : "Our services"}
              </h2>
              <p
                className="mx-auto"
                style={{
                  color: "var(--text-muted)",
                  maxWidth: "34rem",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  textWrap: "balance",
                  overflowWrap: "break-word",
                }}
              >
                {lang === "da"
                  ? "Alt hvad din virksomhed behøver for at lykkes digitalt – under ét tag."
                  : "Everything your business needs to succeed digitally – under one roof."}
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((s, i) => {
              const t = lang === "da" ? s.da : s.en;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <Link
                    href="/ydelser"
                    className="block h-full transition-all duration-200 text-center"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      padding: "2rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--navy)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(26,43,76,0.07)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="flex items-center justify-center mb-5 mx-auto"
                      style={{
                        width: 44,
                        height: 44,
                        background: "var(--bg-grey)",
                        color: "var(--navy)",
                        borderRadius: 8,
                      }}
                    >
                      {s.icon}
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--navy)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        lineHeight: 1.35,
                        overflowWrap: "break-word",
                      }}
                    >
                      {t.title}
                    </h3>
                    <p
                      className="mb-5"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.875rem",
                        lineHeight: 1.75,
                        overflowWrap: "break-word",
                      }}
                    >
                      {t.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: "var(--navy)" }}
                    >
                      {lang === "da" ? "Læs mere" : "Read more"}{" "}
                      <ArrowRight size={11} />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-grey)", padding: "5rem 0" }}>
        <div className="max-w-5xl mx-auto" style={{ padding: "0 2rem" }}>
          <FadeIn>
            <div className="text-center mb-12">
              <p
                className="text-xs tracking-[0.3em] uppercase font-semibold mb-3"
                style={{ color: "var(--blue)" }}
              >
                {lang === "da" ? "Sådan arbejder vi" : "How we work"}
              </p>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--navy)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                }}
              >
                {lang === "da" ? "Fra idé til lancering" : "From idea to launch"}
              </h2>
              <p
                className="mx-auto"
                style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "30rem" }}
              >
                {lang === "da"
                  ? "Vi følger en gennemprøvet proces der sikrer, at dit projekt leveres til tiden og inden for budgettet."
                  : "We follow a proven process that ensures your project is delivered on time and within budget."}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center" style={{ borderTop: "2px solid var(--blue)", paddingTop: "1.25rem", opacity: 0.9 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--blue)",
                      fontSize: "1.75rem",
                      fontWeight: 300,
                      opacity: 0.5,
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--navy)", fontFamily: "var(--font-montserrat)" }}
                  >
                    {lang === "da" ? step.da : step.en}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/ydelser"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--navy)" }}
            >
              {lang === "da" ? "Se alle ydelser" : "View all services"}{" "}
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-5xl mx-auto" style={{ padding: "0 2rem" }}>
          <FadeIn>
            <div
              className="relative overflow-hidden"
              style={{
                background: "var(--navy)",
                borderRadius: "1.25rem",
                padding: "4.5rem 3rem",
              }}
            >
              {/* Subtle glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  background: "var(--blue)",
                  width: 480,
                  height: 480,
                  filter: "blur(120px)",
                  opacity: 0.07,
                  top: "-8rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: "36rem",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <p
                  className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {lang === "da" ? "Klar til at starte?" : "Ready to start?"}
                </p>
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                    lineHeight: 1.45,
                    overflowWrap: "break-word",
                    color: "#ffffff",
                  }}
                >
                  {lang === "da" ? (
                    <>
                      Lad os løfte din{" "}
                      <em
                        className="font-semibold"
                        style={{ color: "#93C5FD" }}
                      >
                        digitale tilstedeværelse.
                      </em>
                    </>
                  ) : (
                    <>
                      Let&apos;s elevate your{" "}
                      <em
                        className="font-semibold"
                        style={{ color: "#93C5FD" }}
                      >
                        digital presence.
                      </em>
                    </>
                  )}
                </h2>
                <p
                  className="mb-8"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  }}
                >
                  {lang === "da"
                    ? "Uforpligtende snak om, hvad vi kan gøre for din virksomhed."
                    : "A no-obligation chat about what we can do for your business."}
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
                  style={{
                    background: "#fff",
                    color: "var(--navy)",
                    padding: "1rem 2rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e8edf5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  {lang === "da" ? "Start din rejse her" : "Start your journey"}{" "}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
