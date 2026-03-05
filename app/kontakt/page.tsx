"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
        setError(
          lang === "da"
            ? "Noget gik galt. Prøv igen eller skriv til os direkte på email."
            : "Something went wrong. Please try again or email us directly."
        );
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
      <section
        style={{
          background: "var(--bg-soft)",
          paddingTop: "8rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-16 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--blue)" }}>
              {lang === "da" ? "Tag kontakt" : "Get in touch"}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--navy)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              {lang === "da" ? "Kontakt" : "Contact"}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* 2-col layout */}
      <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info column */}
          <FadeIn direction="left">
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
              {lang === "da"
                ? "Vi glæder os til at høre om dit projekt. Udfyld formularen, og vi vender tilbage inden for 24 timer."
                : "We look forward to hearing about your project. Fill out the form and we'll get back to you within 24 hours."}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                >
                  <Mail size={17} />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    Email
                  </p>
                  <a
                    href="mailto:kontakt@stw-webdesign.dk"
                    className="font-medium transition-colors"
                    style={{ color: "var(--navy)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--navy)")}
                  >
                    kontakt@stw-webdesign.dk
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                >
                  <Clock size={17} />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    {lang === "da" ? "Svartid" : "Response time"}
                  </p>
                  <p className="font-medium" style={{ color: "var(--navy)" }}>
                    {lang === "da" ? "Inden for 24 timer på hverdage" : "Within 24 hours on weekdays"}
                  </p>
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
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-5"
                    style={{ background: "rgba(22,163,74,0.1)", borderRadius: "50%" }}
                  >
                    <CheckCircle size={26} style={{ color: "#16a34a" }} />
                  </div>
                  <h2
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-montserrat)", color: "var(--navy)" }}
                  >
                    {lang === "da" ? "Tak for din besked!" : "Thank you for your message!"}
                  </h2>
                  <p style={{ color: "var(--text-muted)" }}>
                    {lang === "da" ? "Vi vender tilbage inden for 24 timer." : "We'll get back to you within 24 hours."}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs tracking-[0.2em] uppercase mb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {lang === "da" ? "Navn" : "Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--bg-soft)",
                          color: "var(--navy)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        placeholder={lang === "da" ? "Dit navn" : "Your name"}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs tracking-[0.2em] uppercase mb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--bg-soft)",
                          color: "var(--navy)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        placeholder={lang === "da" ? "Din email" : "Your email"}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {lang === "da" ? "Hvad er du interesseret i?" : "What are you interested in?"}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none cursor-pointer"
                      style={{
                        border: "1px solid var(--border)",
                        background: "var(--bg-soft)",
                        color: form.service ? "var(--navy)" : "var(--text-muted)",
                        appearance: "none",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      <option value="">{lang === "da" ? "Vælg ydelse..." : "Select service..."}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {lang === "da" ? "Besked" : "Message"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none resize-none"
                      style={{
                        border: "1px solid var(--border)",
                        background: "var(--bg-soft)",
                        color: "var(--navy)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      placeholder={lang === "da" ? "Fortæl os om dit projekt..." : "Tell us about your project..."}
                    />
                  </div>
                  {error && <p className="text-sm" style={{ color: "#dc2626" }}>{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-sm font-semibold tracking-widest uppercase py-4 transition-all"
                    style={{ background: loading ? "var(--text-muted)" : "var(--navy)", color: "#fff", cursor: loading ? "not-allowed" : "pointer" }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--navy-mid)"; }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--navy)"; }}
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
