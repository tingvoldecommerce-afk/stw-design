"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";
import { Globe, Bot, TrendingUp, ArrowRight } from "lucide-react";

const stats = [
  { da: "3+ år", en: "3+ years" },
  { da: "50+ projekter", en: "50+ projects" },
  { da: "30+ kunder", en: "30+ clients" },
  { da: "5 ⭐ anmeldelser", en: "5 ⭐ reviews" },
];

const services = [
  {
    icon: <Globe size={22} />,
    da: { title: "Hjemmesider", desc: "Skræddersyede, hurtige og SEO-venlige hjemmesider bygget i Next.js – klar til konverteringer.", link: "/ydelser" },
    en: { title: "Websites", desc: "Custom, fast and SEO-friendly websites built with Next.js – ready to convert.", link: "/ydelser" },
  },
  {
    icon: <Bot size={22} />,
    da: { title: "AI Chatbots", desc: "Intelligente chatbots der håndterer kundehenvendelser 24/7 og genererer leads mens du sover.", link: "/ydelser" },
    en: { title: "AI Chatbots", desc: "Intelligent chatbots that handle customer inquiries 24/7 and generate leads while you sleep.", link: "/ydelser" },
  },
  {
    icon: <TrendingUp size={22} />,
    da: { title: "SEO", desc: "Strategisk søgemaskineoptimering der øger din synlighed, trafik og omsætning over tid.", link: "/ydelser" },
    en: { title: "SEO", desc: "Strategic search engine optimisation that increases your visibility, traffic and revenue.", link: "/ydelser" },
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-px bg-white/40"
            initial={{ height: 0 }}
            animate={{ height: 80 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
          <span className="text-white/40 text-[10px] tracking-[0.2em] rotate-90 mt-2">SCROLL</span>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            {lang === "da" ? "Dansk digitalt bureau" : "Danish digital agency"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white max-w-3xl leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {lang === "da" ? (
              <>Vi bygger digitale løsninger <em className="italic font-normal">der virker.</em></>
            ) : (
              <>We build digital solutions <em className="italic font-normal">that work.</em></>
            )}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/kontakt"
              className="bg-white text-black text-sm font-semibold tracking-widest uppercase px-8 py-3.5 hover:bg-gray-100 transition-colors"
            >
              {lang === "da" ? "Kom i gang" : "Get started"}
            </Link>
            <Link
              href="/ydelser"
              className="border border-white/60 text-white text-sm font-semibold tracking-widest uppercase px-8 py-3.5 hover:border-white transition-colors"
            >
              {lang === "da" ? "Se ydelser" : "Our services"}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="text-center py-2">
                <span className="text-lg font-semibold tracking-wide">{lang === "da" ? s.da : s.en}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              {lang === "da" ? "Hvad vi tilbyder" : "What we offer"}
            </p>
            <h2 className="text-4xl md:text-5xl mb-14" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Vores ydelser" : "Our services"}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const t = lang === "da" ? s.da : s.en;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <Link
                    href={t.link}
                    className="group border border-gray-200 p-8 block hover:border-black transition-colors"
                  >
                    <div className="mb-6 text-black">{s.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:underline" style={{ fontFamily: "var(--font-playfair)" }}>
                      {t.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.desc}</p>
                    <span className="text-xs tracking-widest uppercase flex items-center gap-1.5 group-hover:gap-3 transition-all">
                      {lang === "da" ? "Læs mere" : "Read more"} <ArrowRight size={12} />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              {lang === "da" ? "Sådan arbejder vi" : "How we work"}
            </p>
            <h2 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Vores proces – fra idé til lancering" : "Our process – from idea to launch"}
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {lang === "da"
                ? "Vi følger en struktureret proces der sikrer, at dit projekt leveres til tiden, inden for budgettet og overgår dine forventninger."
                : "We follow a structured process that ensures your project is delivered on time, within budget and exceeds your expectations."}
            </p>
            <Link
              href="/ydelser"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase hover:gap-4 transition-all"
            >
              {lang === "da" ? "Se alle ydelser" : "View all services"} <ArrowRight size={14} />
            </Link>
          </FadeIn>
          <FadeIn direction="right">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-6 py-5 border-b border-gray-200 last:border-0">
                  <span className="text-5xl font-light text-gray-200" style={{ fontFamily: "var(--font-playfair)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium">{lang === "da" ? step.da : step.en}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="bg-black rounded-2xl p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                {lang === "da" ? (
                  <>Klar til at løfte din <em className="italic font-normal">digitale tilstedeværelse?</em></>
                ) : (
                  <>Ready to elevate your <em className="italic font-normal">digital presence?</em></>
                )}
              </h2>
              <p className="mt-5 text-white/60 max-w-xl mx-auto">
                {lang === "da"
                  ? "Lad os have en uforpligtende snak om, hvad vi kan gøre for din virksomhed."
                  : "Let's have a no-obligation chat about what we can do for your business."}
              </p>
              <Link
                href="/kontakt"
                className="mt-8 inline-block bg-white text-black text-sm font-semibold tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                {lang === "da" ? "Kontakt os →" : "Contact us →"}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
