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
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Hvem er vi?" : "Who are we?"}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--navy)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              {lang === "da" ? "Om os" : "About us"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "STW-Webdesign er et dansk digitalt bureau grundlagt af Sebastian. Vi hjælper virksomheder med at skabe en stærk digital tilstedeværelse."
                : "STW-Webdesign is a Danish digital agency founded by Sebastian. We help businesses create a strong digital presence."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Image */}
      <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6">
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
      <section style={{ background: "var(--bg-soft)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn direction="left">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>Mission</p>
            <h2
              className="mb-5"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
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
              style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
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
      <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Hvad vi står for" : "What we stand for"}
            </p>
            <h2
              className="mb-10"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {lang === "da" ? "Vores værdier" : "Our values"}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const t = lang === "da" ? v.da : v.en;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div
                    className="p-8"
                    style={{ border: "1px solid var(--border)", background: "var(--bg-soft)" }}
                  >
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}
                    >
                      {t.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
      <section style={{ background: "var(--bg-soft)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div
              className="rounded-2xl p-10 md:p-14 text-center"
              style={{ background: "var(--navy)" }}
            >
              <h2
                className="text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                {lang === "da" ? "Lad os arbejde sammen" : "Let's work together"}
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                {lang === "da"
                  ? "Tag kontakt og fortæl os om din virksomhed."
                  : "Get in touch and tell us about your business."}
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all"
                style={{ background: "var(--blue)", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
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
