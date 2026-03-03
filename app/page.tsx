"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";
import { Globe, Bot, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Globe size={24} />,
    da: {
      title: "Hjemmesider",
      desc: "Skræddersyede, hurtige og mobilvenlige hjemmesider – bygget til at konvertere besøgende til kunder.",
    },
    en: {
      title: "Websites",
      desc: "Custom, fast and mobile-friendly websites – built to convert visitors into customers.",
    },
  },
  {
    icon: <Bot size={24} />,
    da: {
      title: "AI Chatbots",
      desc: "Intelligente chatbots der håndterer kundehenvendelser 24/7 og genererer leads mens du sover.",
    },
    en: {
      title: "AI Chatbots",
      desc: "Intelligent chatbots that handle customer inquiries 24/7 and generate leads while you sleep.",
    },
  },
  {
    icon: <TrendingUp size={24} />,
    da: {
      title: "SEO",
      desc: "Søgemaskineoptimering der øger din organiske synlighed og bringer de rigtige kunder til dig.",
    },
    en: {
      title: "SEO",
      desc: "Search engine optimisation that increases your organic visibility and brings the right customers to you.",
    },
  },
];

const steps = [
  { da: "Analyse", en: "Analysis" },
  { da: "Design", en: "Design" },
  { da: "Udvikling", en: "Development" },
  { da: "Lancering", en: "Launch" },
];

export default function HomePage() {
  const { lang } = useLang();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "100svh", paddingBottom: "5rem", paddingTop: "5rem" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="STW Design workspace"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.6) 55%, rgba(10,22,40,0.25) 100%)",
            zIndex: 1,
          }}
        />

        <div
          className="relative w-full max-w-6xl mx-auto"
          style={{ zIndex: 10, padding: "0 1.5rem" }}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {lang === "da" ? "Dansk digitalt bureau" : "Danish digital agency"}
          </p>

          <h1
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.9rem, 4.5vw, 3.75rem)",
              maxWidth: "38rem",
              overflowWrap: "break-word",
            }}
          >
            {lang === "da" ? (
              <>
                Vi bygger digitale løsninger{" "}
                <em className="italic font-normal" style={{ color: "#93C5FD" }}>
                  der virker.
                </em>
              </>
            ) : (
              <>
                We build digital solutions{" "}
                <em className="italic font-normal" style={{ color: "#93C5FD" }}>
                  that work.
                </em>
              </>
            )}
          </h1>

          <p
            className="mb-8"
            style={{
              color: "rgba(255,255,255,0.65)",
              maxWidth: "30rem",
              fontSize: "1rem",
              lineHeight: "1.7",
            }}
          >
            {lang === "da"
              ? "Professionelle hjemmesider, AI chatbots og SEO til danske virksomheder."
              : "Professional websites, AI chatbots and SEO for Danish businesses."}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
              style={{
                background: "var(--blue)",
                color: "#fff",
                padding: "0.75rem 1.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
            >
              {lang === "da" ? "Kom i gang" : "Get started"} <ArrowRight size={14} />
            </Link>
            <Link
              href="/ydelser"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#fff",
                padding: "0.75rem 1.75rem",
              }}
            >
              {lang === "da" ? "Se ydelser" : "Our services"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────── */}
      <section style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
          <FadeIn>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--blue)" }}
            >
              {lang === "da" ? "Hvad vi tilbyder" : "What we offer"}
            </p>
            <h2
              className="mb-12"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--navy)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              }}
            >
              {lang === "da" ? "Vores ydelser" : "Our services"}
            </h2>
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
                    className="block h-full transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      padding: "2rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--blue)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(59,130,246,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="flex items-center justify-center mb-5"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(59,130,246,0.1)",
                        color: "var(--blue)",
                        borderRadius: 8,
                      }}
                    >
                      {s.icon}
                    </div>
                    <h3
                      className="font-semibold mb-3"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: "var(--navy)",
                        fontSize: "1.1rem",
                      }}
                    >
                      {t.title}
                    </h3>
                    <p
                      className="leading-relaxed mb-5"
                      style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}
                    >
                      {t.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase"
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

      {/* ── Process ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-soft)", padding: "5rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            <FadeIn>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--blue)" }}
              >
                {lang === "da" ? "Sådan arbejder vi" : "How we work"}
              </p>
              <h2
                className="leading-tight mb-5"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--navy)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                }}
              >
                {lang === "da"
                  ? "Fra idé til lancering"
                  : "From idea to launch"}
              </h2>
              <p
                className="leading-relaxed mb-7"
                style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
              >
                {lang === "da"
                  ? "Vi følger en gennemprøvet proces der sikrer, at dit projekt leveres til tiden og inden for budgettet."
                  : "We follow a proven process that ensures your project is delivered on time and within budget."}
              </p>
              <Link
                href="/ydelser"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
                style={{ color: "var(--navy)" }}
              >
                {lang === "da" ? "Se alle ydelser" : "View all services"}{" "}
                <ArrowRight size={13} />
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5"
                    style={{
                      padding: "1.1rem 0",
                      borderBottom:
                        i < steps.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: "var(--blue)",
                        opacity: 0.45,
                        fontSize: "2rem",
                        fontWeight: 300,
                        minWidth: "2.5rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--navy)", fontSize: "1rem" }}
                    >
                      {lang === "da" ? step.da : step.en}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background: "var(--bg)", padding: "5rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
          <FadeIn>
            <div
              className="text-center relative overflow-hidden"
              style={{
                background: "var(--navy)",
                borderRadius: "1rem",
                padding: "4rem 2rem",
              }}
            >
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  background: "var(--blue)",
                  width: 400,
                  height: 400,
                  filter: "blur(100px)",
                  opacity: 0.08,
                  top: "-6rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2
                  className="text-white leading-tight mb-4"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                    overflowWrap: "break-word",
                  }}
                >
                  {lang === "da" ? (
                    <>
                      Klar til at løfte din{" "}
                      <em
                        className="italic font-normal"
                        style={{ color: "#93C5FD" }}
                      >
                        digitale tilstedeværelse?
                      </em>
                    </>
                  ) : (
                    <>
                      Ready to elevate your{" "}
                      <em
                        className="italic font-normal"
                        style={{ color: "#93C5FD" }}
                      >
                        digital presence?
                      </em>
                    </>
                  )}
                </h2>
                <p
                  className="mb-7 mx-auto"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "28rem",
                    fontSize: "0.95rem",
                  }}
                >
                  {lang === "da"
                    ? "Lad os have en uforpligtende snak om, hvad vi kan gøre for din virksomhed."
                    : "Let's have a no-obligation chat about what we can do for your business."}
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
                  style={{
                    background: "var(--blue)",
                    color: "#fff",
                    padding: "0.85rem 2rem",
                    borderRadius: "9999px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#2563EB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--blue)")
                  }
                >
                  {lang === "da" ? "Kontakt os" : "Contact us"}{" "}
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
