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
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "100svh", paddingTop: "4rem" }}
      >
        {/* Bright office background */}
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80"
          alt="Moderne kontor"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Light gradient overlay — white on left, transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.93) 42%, rgba(255,255,255,0.65) 65%, rgba(255,255,255,0.25) 100%)",
          }}
        />

        <div
          className="relative w-full max-w-6xl mx-auto"
          style={{ zIndex: 10, padding: "5rem clamp(1.5rem, 6vw, 5rem)" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* ─ Left: Text ─ */}
            <div>
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
                  fontSize: "clamp(2.1rem, 4.5vw, 3.75rem)",
                  lineHeight: 1.2,
                  color: "var(--navy)",
                  maxWidth: "32rem",
                  overflowWrap: "break-word",
                }}
              >
                {lang === "da"
                  ? "Vi bygger hjemmesider, der arbejder lige så hårdt som dig."
                  : "We build websites that work as hard as you do."}
              </h1>

              <p
                className="mb-8"
                style={{
                  color: "var(--text-muted)",
                  maxWidth: "29rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                {lang === "da"
                  ? "Få en digital platform, der konverterer besøgende til kunder."
                  : "Get a digital platform that converts visitors into customers."}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
                  style={{
                    background: "var(--navy)",
                    color: "#fff",
                    padding: "0.85rem 2rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--navy-mid)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--navy)")
                  }
                >
                  {lang === "da" ? "Få en gratis analyse" : "Get a free analysis"}{" "}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/ydelser"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all"
                  style={{
                    border: "1.5px solid var(--navy)",
                    color: "var(--navy)",
                    padding: "0.85rem 2rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--navy)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--navy)";
                  }}
                >
                  {lang === "da" ? "Se hvordan vi løfter din forretning" : "See how we elevate your business"}
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {trusts.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <CheckCircle2
                      size={13}
                      style={{ color: "var(--blue)", flexShrink: 0 }}
                    />
                    {lang === "da" ? t.da : t.en}
                  </span>
                ))}
              </div>
            </div>

            {/* ─ Right: Glassmorphism device mockup ─ */}
            <div
              className="relative hidden md:block"
              style={{ paddingBottom: "2.5rem", paddingRight: "2rem" }}
            >
              {/* Laptop / browser mockup */}
              <div
                style={{
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  background: "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  borderRadius: "1.25rem",
                  boxShadow:
                    "0 32px 64px rgba(26,43,76,0.10), 0 0 0 1px rgba(26,43,76,0.04)",
                  overflow: "hidden",
                }}
              >
                {/* Browser chrome */}
                <div
                  style={{
                    background: "rgba(241,244,248,0.9)",
                    padding: "0.7rem 1rem",
                    borderBottom: "1px solid rgba(26,43,76,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <span
                        key={i}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: c,
                          opacity: 0.75,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.85)",
                      borderRadius: "5px",
                      height: 22,
                      maxWidth: 210,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "0.7rem",
                      border: "1px solid rgba(26,43,76,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: "rgba(26,43,76,0.4)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      stw-webdesign.dk
                    </span>
                  </div>
                </div>

                {/* Site preview */}
                <div style={{ padding: "1.5rem 1.75rem" }}>
                  {/* Mini navbar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "5px" }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          background: "var(--navy)",
                          borderRadius: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "5px",
                            color: "#fff",
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                          }}
                        >
                          STW
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          color: "var(--navy)",
                        }}
                      >
                        Design
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {["Ydelser", "Om os", "Kontakt"].map((l) => (
                        <span
                          key={l}
                          style={{
                            fontSize: "0.5rem",
                            color: "rgba(26,43,76,0.45)",
                          }}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hero block */}
                  <div
                    style={{
                      background: "var(--navy)",
                      borderRadius: "10px",
                      padding: "1.25rem 1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "65%",
                        height: 7,
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: 3,
                        marginBottom: 8,
                      }}
                    />
                    <div
                      style={{
                        width: "50%",
                        height: 7,
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: 3,
                        marginBottom: 12,
                      }}
                    />
                    <div
                      style={{
                        width: "38%",
                        height: 4,
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: 2,
                        marginBottom: 14,
                      }}
                    />
                    <div
                      style={{
                        width: 72,
                        height: 22,
                        background: "var(--blue)",
                        borderRadius: 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.45rem",
                          color: "#fff",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Kontakt os
                      </span>
                    </div>
                  </div>

                  {/* Service cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "0.5rem",
                    }}
                  >
                    {["Web", "AI", "SEO"].map((label) => (
                      <div
                        key={label}
                        style={{
                          background: "rgba(26,43,76,0.03)",
                          borderRadius: "8px",
                          padding: "0.75rem 0.5rem",
                          border: "1px solid rgba(26,43,76,0.07)",
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            background: "rgba(59,130,246,0.12)",
                            borderRadius: "4px",
                            marginBottom: "0.4rem",
                          }}
                        />
                        <div
                          style={{
                            width: "70%",
                            height: 4,
                            background: "rgba(26,43,76,0.22)",
                            borderRadius: 2,
                            marginBottom: "0.3rem",
                          }}
                        />
                        <div
                          style={{
                            width: "90%",
                            height: 3,
                            background: "rgba(26,43,76,0.07)",
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone mockup — overlapping bottom-right */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 92,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  background: "rgba(255,255,255,0.78)",
                  border: "1.5px solid rgba(255,255,255,0.95)",
                  borderRadius: "18px",
                  padding: "8px 6px",
                  boxShadow: "0 20px 40px rgba(26,43,76,0.13)",
                  overflow: "hidden",
                }}
              >
                {/* Notch */}
                <div
                  style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 4,
                      background: "rgba(26,43,76,0.13)",
                      borderRadius: 2,
                    }}
                  />
                </div>
                {/* Screen */}
                <div
                  style={{
                    background: "var(--navy)",
                    borderRadius: "10px",
                    padding: "10px 8px",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      height: 4,
                      background: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      marginBottom: 5,
                    }}
                  />
                  <div
                    style={{
                      width: "60%",
                      height: 3,
                      background: "rgba(255,255,255,0.35)",
                      borderRadius: 2,
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{
                      width: 38,
                      height: 13,
                      background: "var(--blue)",
                      borderRadius: 4,
                    }}
                  />
                </div>
                {/* Home bar */}
                <div
                  style={{ display: "flex", justifyContent: "center", marginTop: 6 }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 3,
                      background: "rgba(26,43,76,0.18)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────── */}
      <section style={{ background: "var(--bg)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 clamp(1.5rem, 6vw, 5rem)" }}>
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
                    className="block h-full transition-all duration-200"
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
                      className="flex items-center justify-center mb-5"
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
      <section style={{ background: "var(--bg-grey)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 clamp(1.5rem, 6vw, 5rem)" }}>
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
                className="text-xs tracking-[0.3em] uppercase font-semibold mb-3"
                style={{ color: "var(--blue)" }}
              >
                {lang === "da" ? "Sådan arbejder vi" : "How we work"}
              </p>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--navy)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                }}
              >
                {lang === "da" ? "Fra idé til lancering" : "From idea to launch"}
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
                        i < steps.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--blue)",
                        opacity: 0.4,
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
      <section style={{ background: "var(--bg)", padding: "6rem 0" }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 clamp(1.5rem, 6vw, 5rem)" }}>
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
                    padding: "0.85rem 2rem",
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
