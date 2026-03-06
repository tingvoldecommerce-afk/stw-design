"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";

const values = [
  {
    da: { title: "Hurtig levering", desc: "Vi holder deadlines. Altid. Vores strukturerede proces sikrer, at dit projekt leveres til den aftalte tid." },
    en: { title: "Fast delivery", desc: "We meet deadlines. Always. Our structured process ensures your project is delivered on time." },
  },
  {
    da: { title: "Dansk support", desc: "Du taler altid med os direkte – ingen mellemmænd, ingen sprogbarrierer, ingen forsinkelser." },
    en: { title: "Danish support", desc: "You always speak with us directly – no middlemen, no language barriers, no delays." },
  },
  {
    da: { title: "Skræddersyet", desc: "Vi kopierer ikke templates. Hver løsning er bygget specifikt til din virksomhed og dine mål." },
    en: { title: "Tailored", desc: "We don't copy templates. Every solution is built specifically for your business and your goals." },
  },
  {
    da: { title: "Målbare resultater", desc: "Vi måler på det der betyder noget: trafik, konverteringer og vækst i din omsætning." },
    en: { title: "Measurable results", desc: "We measure what matters: traffic, conversions and growth in your revenue." },
  },
];

export default function OmOsPage() {
  const { lang } = useLang();

  return (
    <>
      {/* Header */}
      <section
        style={{
          background: "var(--bg-soft)",
          paddingTop: "8rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="wrap text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Hvem er vi?" : "Who are we?"}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--navy)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              {lang === "da" ? "Om os" : "About us"}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Image */}
      <section style={{ background: "var(--bg)", paddingTop: "6.25rem", paddingBottom: "6.25rem" }}>
        <div className="wrap">
          <FadeIn>
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/6", background: "#0f172a" }}>
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                alt="STW Design workspace"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission / Vision */}
      <section style={{ background: "var(--bg-soft)", paddingTop: "6.25rem", paddingBottom: "6.25rem" }}>
        <div className="wrap grid md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn direction="left">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>Mission</p>
            <h2
              className="mb-5"
              style={{ fontFamily: "var(--font-montserrat)", color: "var(--navy)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {lang === "da"
                ? "At gøre professionel digital tilstedeværelse tilgængelig for alle"
                : "To make professional digital presence accessible to all"}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "Vi tror på, at alle virksomheder – uanset størrelse – fortjener et professionelt digitalt fundament. Vi bygger løsninger der er effektive, overskuelige og skalérbare."
                : "We believe all businesses – regardless of size – deserve a professional digital foundation. We build solutions that are effective, manageable and scalable."}
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>Vision</p>
            <h2
              className="mb-5"
              style={{ fontFamily: "var(--font-montserrat)", color: "var(--navy)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {lang === "da"
                ? "At være det foretrukne digitale bureau for danske SMV'er"
                : "To be the preferred digital agency for Danish SMEs"}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "Vores mål er at være det bureau, du ringer til når du vil have noget gjort ordentligt. Vi bygger langvarige relationer baseret på resultater og gennemsigtighed."
                : "Our goal is to be the agency you call when you want something done properly. We build long-lasting relationships based on results and transparency."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--bg)", paddingTop: "4.5rem", paddingBottom: "5rem" }}>
        <div className="wrap">
          <FadeIn>
            <div className="text-center" style={{ marginBottom: 40 }}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#1a5296",
                  marginBottom: 12,
                }}
              >
                {lang === "da" ? "Hvad vi står for" : "What we stand for"}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#0c2240",
                  lineHeight: 1.15,
                }}
              >
                {lang === "da" ? "Vores værdier" : "Our values"}
              </h2>
            </div>
          </FadeIn>
          <div
            className="grid md:grid-cols-2"
            style={{ gap: 20, alignItems: "stretch" }}
          >
            {values.map((v, i) => {
              const t = lang === "da" ? v.da : v.en;
              const icons = [
                /* Hurtig levering — clock */
                <svg key="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>,
                /* Dansk support — chat bubble */
                <svg key="chat" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>,
                /* Skræddersyet — pencil */
                <svg key="pencil" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>,
                /* Målbare resultater — bar chart */
                <svg key="chart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>,
              ];
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div
                    style={{
                      padding: "28px 28px 26px",
                      border: "1px solid #e2e8f0",
                      background: "#ffffff",
                      borderRadius: 14,
                      boxShadow: "0 2px 12px rgba(12,34,64,0.06)",
                      transition: "box-shadow 0.2s ease, transform 0.2s ease",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 6px 24px rgba(12,34,64,0.10)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(12,34,64,0.06)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Icon box */}
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "#f0f4f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}
                    >
                      {icons[i]}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#0c2240",
                        marginBottom: 8,
                        lineHeight: 1.25,
                      }}
                    >
                      {t.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569" }}>
                      {t.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--bg-soft)", paddingTop: "6.25rem", paddingBottom: "6.25rem" }}>
        <div className="wrap">
          <FadeIn>
            <div
              className="text-center"
              style={{
                background: "var(--navy)",
                borderRadius: "12px",
                width: "100%",
                padding: "5rem 3rem",
              }}
            >
              <h2
                className="mb-5"
                style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#ffffff" }}
              >
                {lang === "da" ? "Lad os arbejde sammen" : "Let's work together"}
              </h2>
              <p className="mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.7 }}>
                {lang === "da"
                  ? "Tag kontakt og fortæl os om din virksomhed."
                  : "Get in touch and tell us about your business."}
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm uppercase transition-all"
                style={{
                  background: "var(--blue)",
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  padding: "1rem 2rem",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--blue)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {lang === "da" ? "Kontakt os" : "Contact us"} <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
