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
      {/* Hero */}
      <section className="pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5">
              {lang === "da" ? "Hvem er vi?" : "Who are we?"}
            </p>
            <h1 className="text-5xl md:text-7xl max-w-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Om os" : "About us"}
            </h1>
            <p className="mt-8 text-gray-600 max-w-2xl text-lg leading-relaxed">
              {lang === "da"
                ? "STW Design er et dansk digitalt bureau grundlagt af Sebastian. Vi hjælper virksomheder med at skabe en stærk digital tilstedeværelse gennem skræddersyede hjemmesider, intelligente AI-løsninger og strategisk SEO."
                : "STW Design is a Danish digital agency founded by Sebastian. We help businesses create a strong digital presence through custom websites, intelligent AI solutions and strategic SEO."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Image section */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="relative aspect-[16/7] overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                alt="STW Design workspace"
                fill
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5">Mission</p>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {lang === "da"
                  ? "At gøre professionel digital tilstedeværelse tilgængelig for alle"
                  : "To make professional digital presence accessible to all"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {lang === "da"
                  ? "Vi tror på, at alle virksomheder – uanset størrelse – fortjener et professionelt digitalt fundament. Vi bygger løsninger der er effektive, overskuelige og skalérbare."
                  : "We believe all businesses – regardless of size – deserve a professional digital foundation. We build solutions that are effective, manageable and scalable."}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5">Vision</p>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {lang === "da"
                  ? "At være det foretrukne digitale bureau for danske SMV'er"
                  : "To be the preferred digital agency for Danish SMEs"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {lang === "da"
                  ? "Vores mål er at være det bureau, du ringer til når du vil have noget gjort ordentligt. Vi bygger langvarige relationer baseret på resultater og gennemsigtighed."
                  : "Our goal is to be the agency you call when you want something done properly. We build long-lasting relationships based on results and transparency."}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              {lang === "da" ? "Hvad vi står for" : "What we stand for"}
            </p>
            <h2 className="text-4xl md:text-5xl mb-14" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Vores værdier" : "Our values"}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const t = lang === "da" ? v.da : v.en;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                      {t.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="bg-black rounded-2xl p-12 text-center">
              <h2 className="text-4xl text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {lang === "da" ? "Lad os arbejde sammen" : "Let's work together"}
              </h2>
              <p className="text-white/60 mb-8">
                {lang === "da"
                  ? "Tag kontakt og fortæl os om din virksomhed."
                  : "Get in touch and tell us about your business."}
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
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
