"use client";

import Link from "next/link";
import { ArrowRight, Globe, Bot, TrendingUp } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";
import type { Metadata } from "next";

const services = [
  {
    icon: <Globe size={28} />,
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
    icon: <Bot size={28} />,
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
    icon: <TrendingUp size={28} />,
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
      <section className="pt-36 pb-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5">
              {lang === "da" ? "Hvad vi kan gøre for dig" : "What we can do for you"}
            </p>
            <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Ydelser" : "Services"}
            </h1>
            <p className="mt-6 text-gray-600 max-w-xl text-lg leading-relaxed">
              {lang === "da"
                ? "Vi tilbyder skræddersyede digitale løsninger der hjælper din virksomhed med at vokse online."
                : "We offer tailored digital solutions that help your business grow online."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services accordion */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-0">
          {services.map((s, i) => {
            const t = lang === "da" ? s.da : s.en;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <details className="group border-b border-gray-200">
                  <summary className="flex items-center gap-5 py-8 cursor-pointer list-none select-none hover:opacity-80 transition-opacity">
                    <span className="text-black">{s.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                        {t.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-0.5">{t.subtitle}</p>
                    </div>
                    <span className="text-2xl font-light text-gray-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="pb-10 grid md:grid-cols-2 gap-10">
                    <p className="text-gray-700 leading-relaxed">{t.desc}</p>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
                        {lang === "da" ? "Hvad leveres" : "What's delivered"}
                      </p>
                      <ul className="space-y-2">
                        {t.delivers.map((d, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                            <span className="w-1 h-1 bg-black rounded-full flex-shrink-0" />
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
      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-5">
              {lang === "da" ? "Arbejdsproces" : "Work process"}
            </p>
            <h2 className="text-4xl md:text-5xl text-white mb-14" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Vores proces" : "Our process"}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const t = lang === "da" ? step.da : step.en;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border-t border-white/20 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                      {t.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Klar til at starte?" : "Ready to start?"}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {lang === "da"
                ? "Tag kontakt i dag og få en gratis konsultation."
                : "Get in touch today and receive a free consultation."}
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 hover:bg-gray-900 transition-colors"
            >
              {lang === "da" ? "Kontakt os" : "Contact us"} <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
