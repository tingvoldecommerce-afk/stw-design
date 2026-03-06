"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Clock, CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LangProvider";

export default function KontaktPage() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
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
        <div className="wrap text-center">
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

      {/* Centered form layout */}
      <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="wrap">
          {/* Info row centered above form */}
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-8 mb-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                >
                  <Mail size={17} />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>Email</p>
                <a
                  href="mailto:kontakt@stw-webdesign.dk"
                  className="font-medium text-sm transition-colors"
                  style={{ color: "var(--navy)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--navy)")}
                >
                  kontakt@stw-webdesign.dk
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: "rgba(59,130,246,0.1)", color: "var(--blue)", borderRadius: "8px" }}
                >
                  <Clock size={17} />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                  {lang === "da" ? "Svartid" : "Response time"}
                </p>
                <p className="font-medium text-sm" style={{ color: "var(--navy)" }}>
                  {lang === "da" ? "Inden for 24 timer" : "Within 24 hours"}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form centered, max-width 600px */}
          <FadeIn>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                background: "var(--bg-soft)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "2.5rem",
              }}
            >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-6"
                    style={{ background: "rgba(22,163,74,0.1)", borderRadius: "50%" }}
                  >
                    <CheckCircle size={30} style={{ color: "#16a34a" }} />
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
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                        style={{ color: "var(--navy)" }}
                      >
                        {lang === "da" ? "Navn" : "Name"}{" "}
                        <span style={{ color: "var(--blue)" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-sm outline-none transition-colors"
                        style={{
                          border: "1.5px solid var(--border)",
                          background: "#fff",
                          color: "var(--navy)",
                          borderRadius: "6px",
                          padding: "0.8rem 1rem",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        placeholder={lang === "da" ? "Dit fulde navn" : "Your full name"}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                        style={{ color: "var(--navy)" }}
                      >
                        Email <span style={{ color: "var(--blue)" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-sm outline-none transition-colors"
                        style={{
                          border: "1.5px solid var(--border)",
                          background: "#fff",
                          color: "var(--navy)",
                          borderRadius: "6px",
                          padding: "0.8rem 1rem",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        placeholder={lang === "da" ? "din@email.dk" : "your@email.com"}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--navy)" }}
                    >
                      {lang === "da" ? "Telefon" : "Phone"}{" "}
                      <span className="normal-case font-normal" style={{ color: "var(--text-muted)", letterSpacing: 0 }}>
                        ({lang === "da" ? "valgfri" : "optional"})
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full text-sm outline-none transition-colors"
                      style={{
                        border: "1.5px solid var(--border)",
                        background: "#fff",
                        color: "var(--navy)",
                        borderRadius: "6px",
                        padding: "0.8rem 1rem",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      placeholder="+45 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--navy)" }}
                    >
                      {lang === "da" ? "Hvad har du brug for?" : "What do you need?"}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full text-sm outline-none cursor-pointer"
                      style={{
                        border: "1.5px solid var(--border)",
                        background: "#fff",
                        color: form.service ? "var(--navy)" : "var(--text-muted)",
                        borderRadius: "6px",
                        padding: "0.8rem 1rem",
                        appearance: "none",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      <option value="">{lang === "da" ? "Vælg en ydelse..." : "Select a service..."}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                      style={{ color: "var(--navy)" }}
                    >
                      {lang === "da" ? "Din besked" : "Your message"}{" "}
                        <span style={{ color: "var(--blue)" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-sm outline-none resize-none"
                      style={{
                        border: "1.5px solid var(--border)",
                        background: "#fff",
                        color: "var(--navy)",
                        borderRadius: "6px",
                        padding: "0.8rem 1rem",
                        lineHeight: 1.7,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      placeholder={lang === "da" ? "Beskriv dit projekt og dine mål..." : "Describe your project and goals..."}
                    />
                  </div>
                  {error && (
                    <p className="text-sm px-4 py-3" style={{ color: "#dc2626", background: "#fef2f2", borderRadius: "6px" }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-sm font-bold tracking-widest uppercase transition-all"
                    style={{
                      background: loading ? "var(--text-muted)" : "var(--navy)",
                      color: "#fff",
                      cursor: loading ? "not-allowed" : "pointer",
                      padding: "1rem 2rem",
                      borderRadius: "6px",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--navy-mid)"; }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--navy)"; }}
                  >
                    {loading
                      ? (lang === "da" ? "Sender..." : "Sending...")
                      : (lang === "da" ? "Send besked →" : "Send message →")}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
