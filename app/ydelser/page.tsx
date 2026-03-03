"use client";

import Link from "next/link";
import { ArrowRight, Globe, Bot, TrendingUp } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";

const services = [
  {
    icon: <Globe size={26} />,
    da: {
      title: "Hjemmesider",
      subtitle: "Fra idé til konverterende website",
      desc: "Vi designer og udvikler skræddersyede hjemmesider i Next.js – lynhurtige, mobilvenlige og optimerede til søgemaskiner. Din hjemmeside er din vigtigste salgsmand.",
      delivers: ["Responsivt design", "SEO-teknisk fundament", "CMS-integration", "Performance-optimering", "Formular & konverteringsværktøjer"],
    },
    en: {
      title: "Websites",
      subtitle: "From idea to converting website",
      desc: "We design and develop custom websites in Next.js – lightning fast, mobile-friendly and optimised for search engines. Your website is your most important salesperson.",
      delivers: ["Responsive design", "SEO technical foundation", "CMS integration", "Performance optimisation", "Forms & conversion tools"],
    },
  },
  {
    icon: <Bot size={26} />,
    da: {
      title: "AI Chatbots",
      subtitle: "Automatisér din kundeservice",
      desc: "Vores AI-drevne chatbots håndterer kundehenvendelser, svarer på spørgsmål og genererer leads 24/7 – uden ekstra ressourcer. Bygget på Claude AI.",
      delivers: ["Skræddersyet personlighed", "Lead-generering", "Flersproget support", "Integration med din hjemmeside", "Løbende optimering"],
    },
    en: {
      title: "AI Chatbots",
      subtitle: "Automate your customer service",
      desc: "Our AI-powered chatbots handle customer inquiries, answer questions and generate leads 24/7 – without extra resources. Built on Claude AI.",
      delivers: ["Custom personality", "Lead generation", "Multilingual support", "Website integration", "Continuous optimisation"],
    },
  },
  {
    icon: <TrendingUp size={26} />,
    da: {
      title: "SEO",
      subtitle: "Bliv fundet af de rigtige kunder",
      desc: "Vi analyserer, optimerer og bygger en langsigtet SEO-strategi der øger din organiske synlighed. Mere trafik. Bedre kunder. Lavere annonceringsomkostninger.",
      delivers: ["Teknisk SEO-audit", "On-page optimering", "Søgeordsanalyse", "Linkbuilding", "Månedlig rapport"],
    },
    en: {
      title: "SEO",
      subtitle: "Be found by the right customers",
      desc: "We analyse, optimise and build a long-term SEO strategy that increases your organic visibility. More traffic. Better customers. Lower advertising costs.",
      delivers: ["Technical SEO audit", "On-page optimisation", "Keyword analysis", "Link building", "Monthly report"],
    },
  },
];

const steps = [
  {
    da: { title: "01. Analyse", desc: "Vi starter med en grundig analyse af dine behov, konkurrenter og målgruppe." },
    en: { title: "01. Analysis", desc: "We start with a thorough analysis of your needs, competitors and target audience." },
  },
  {
    da: { title: "02. Design", desc: "Vi skaber et unikt design der afspejler dit brand og engagerer dine besøgende." },
    en: { title: "02. Design", desc: "We create a unique design that reflects your brand and engages your visitors." },
  },
  {
    da: { title: "03. Udvikling", desc: "Vi bygger din løsning med de nyeste teknologier for optimal hastighed og sikkerhed." },
    en: { title: "03. Development", desc: "We build your solution with the latest technologies for optimal speed and security." },
  },
  {
    da: { title: "04. Lancering", desc: "Vi lancerer og sikrer, at alt fungerer perfekt. Efterfølgende support inkluderet." },
    en: { title: "04. Launch", desc: "We launch and ensure everything works perfectly. Subsequent support included." },
  },
];

export default function YdelserPage() {
  const { lang } = useLang();

  return (
    <>
      {/* Page header */}
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
              {lang === "da" ? "Hvad vi kan gøre for dig" : "What we can do for you"}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--navy)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              {lang === "da" ? "Ydelser" : "Services"}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "Vi tilbyder skræddersyede digitale løsninger der hjælper din virksomhed med at vokse online."
                : "We offer tailored digital solutions that help your business grow online."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services accordion */}
      <section style={{ background: "var(--bg)", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          {services.map((s, i) => {
            const t = lang === "da" ? s.da : s.en;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <details className="group" style={{ borderBottom: "1px solid var(--border)" }}>
                  <summary
                    className="flex items-center gap-5 py-7 cursor-pointer list-none select-none"
                    style={{ outline: "none" }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center shrink-0"
                      style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-xl font-semibold"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)" }}
                      >
                        {t.title}
                      </h2>
                      <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {t.subtitle}
                      </p>
                    </div>
                    <span
                      className="text-2xl font-light shrink-0 transition-transform group-open:rotate-45"
                      style={{ color: "var(--text-muted)" }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-8 grid md:grid-cols-2 gap-8">
                    <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {t.desc}
                    </p>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>
                        {lang === "da" ? "Hvad leveres" : "What's delivered"}
                      </p>
                      <ul className="space-y-2">
                        {t.delivers.map((d, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text)" }}>
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: "var(--blue)" }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "var(--navy)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              {lang === "da" ? "Arbejdsproces" : "Work process"}
            </p>
            <h2
              className="text-white mb-12"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {lang === "da" ? "Vores proces" : "Our process"}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => {
              const t = lang === "da" ? step.da : step.en;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ borderTop: "2px solid rgba(59,130,246,0.4)", paddingTop: "1.5rem" }}>
                    <h3
                      className="text-base font-semibold text-white mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {t.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
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
      <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="mb-5"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {lang === "da" ? "Klar til at starte?" : "Ready to start?"}
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "Tag kontakt i dag og få en gratis konsultation."
                : "Get in touch today and receive a free consultation."}
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-8 py-3.5 transition-all"
              style={{ background: "var(--navy)", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--navy-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--navy)")}
            >
              {lang === "da" ? "Kontakt os" : "Contact us"} <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
