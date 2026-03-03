"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Clock, CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";

export default function KontaktPage() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xjgejojz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(lang === "da" ? "Noget gik galt. Prøv igen eller skriv til os på email." : "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError(lang === "da" ? "Noget gik galt. Prøv igen." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const services =
    lang === "da"
      ? ["Hjemmeside", "AI Chatbot", "SEO", "Alt ovenstående", "Andet"]
      : ["Website", "AI Chatbot", "SEO", "All of the above", "Other"];

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5">
              {lang === "da" ? "Tag kontakt" : "Get in touch"}
            </p>
            <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {lang === "da" ? "Kontakt" : "Contact"}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* 2-col layout */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Info column */}
          <FadeIn direction="left">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-10">
                {lang === "da"
                  ? "Vi glæder os til at høre om dit projekt. Udfyld formularen, og vi vender tilbage inden for 24 timer."
                  : "We look forward to hearing about your project. Fill out the form and we'll get back to you within 24 hours."}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Email</p>
                    <a href="mailto:kontakt@stw-webdesign.dk" className="hover:underline">
                      kontakt@stw-webdesign.dk
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">
                      {lang === "da" ? "Svartid" : "Response time"}
                    </p>
                    <p className="text-sm text-gray-700">
                      {lang === "da" ? "Inden for 24 timer på hverdage" : "Within 24 hours on weekdays"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <CheckCircle size={40} className="text-black mb-5" />
                  <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                    {lang === "da" ? "Tak for din besked!" : "Thank you for your message!"}
                  </h2>
                  <p className="text-gray-600">
                    {lang === "da" ? "Vi vender tilbage inden for 24 timer." : "We'll get back to you within 24 hours."}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-[0.2em] uppercase text-gray-400 block mb-1.5">
                        {lang === "da" ? "Navn" : "Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                        placeholder={lang === "da" ? "Dit navn" : "Your name"}
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-[0.2em] uppercase text-gray-400 block mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                        placeholder={lang === "da" ? "Din email" : "Your email"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.2em] uppercase text-gray-400 block mb-1.5">
                      {lang === "da" ? "Hvad er du interesseret i?" : "What are you interested in?"}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-white appearance-none cursor-pointer"
                    >
                      <option value="">{lang === "da" ? "Vælg ydelse..." : "Select service..."}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.2em] uppercase text-gray-400 block mb-1.5">
                      {lang === "da" ? "Besked" : "Message"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none"
                      placeholder={lang === "da" ? "Fortæl os om dit projekt..." : "Tell us about your project..."}
                    />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white text-sm font-semibold tracking-widest uppercase py-4 hover:bg-gray-900 transition-colors disabled:opacity-60"
                  >
                    {loading
                      ? (lang === "da" ? "Sender..." : "Sending...")
                      : (lang === "da" ? "Send besked" : "Send message")}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
