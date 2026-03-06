"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LangProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LEAD_TRIGGER_COUNT = 3;

const suggestions = {
  da: [
    "Hvad koster en hjemmeside?",
    "Fortæl mig om AI chatbots",
    "Hvordan virker SEO?",
  ],
  en: [
    "What does a website cost?",
    "Tell me about AI chatbots",
    "How does SEO work?",
  ],
};

export default function ChatbotWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        lang === "da"
          ? "Hej! 👋 Jeg er NEXUS, STW-Webdesigns AI-assistent. Hvordan kan jeg hjælpe dig i dag?"
          : "Hi! 👋 I'm NEXUS, STW-Webdesign's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const msgCount = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  async function sendMessage(text?: string) {
    const msgText = (text ?? input).trim();
    if (!msgText || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msgText }]);
    setLoading(true);
    msgCount.current += 1;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgText,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Beklager, noget gik galt." },
      ]);
      if (msgCount.current >= LEAD_TRIGGER_COUNT && !leadSent) {
        setTimeout(() => setShowLead(true), 1200);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Beklager, der opstod en fejl. Prøv igen." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadSent(true);
    setShowLead(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Tak ${leadName}! Vi kontakter dig på ${leadEmail} hurtigst muligt. 🙌`,
      },
    ]);
    await fetch("https://formspree.io/f/xjgejojz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: leadName, email: leadEmail, source: "Chatbot" }),
    });
  }

  const isFirstReply = messages.length === 1;
  const currentSuggestions = suggestions[lang === "da" ? "da" : "en"];

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ background: "var(--navy)", color: "#fff" }}
        aria-label="Åbn chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="minimize"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Minimize2 size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <Bot size={22} />
              {/* Online pulse indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--blue)" }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "#60a5fa" }} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden shadow-2xl"
            style={{
              width: "min(380px, calc(100vw - 3rem))",
              height: "min(540px, calc(100vh - 10rem))",
              borderRadius: "16px",
              background: "#fff",
              border: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between shrink-0"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide">NEXUS · STW-Webdesign</p>
                  <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {lang === "da" ? "Online nu" : "Online now"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ background: "var(--bg-soft)" }}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      borderRadius:
                        m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: m.role === "user" ? "var(--navy)" : "#fff",
                      color: m.role === "user" ? "#fff" : "var(--navy)",
                      boxShadow: m.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3"
                    style={{
                      background: "#fff",
                      borderRadius: "14px 14px 14px 4px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: "var(--text-muted)", animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick suggestions – vises kun ved første svar */}
              {isFirstReply && !loading && (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    {lang === "da" ? "Foreslåede spørgsmål:" : "Suggested questions:"}
                  </p>
                  {currentSuggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.1 }}
                      onClick={() => sendMessage(s)}
                      className="text-sm text-left px-4 py-2.5 transition-all"
                      style={{
                        borderRadius: "10px",
                        border: "1.5px solid var(--border)",
                        background: "#fff",
                        color: "var(--navy)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--navy)";
                        e.currentTarget.style.background = "var(--bg-soft)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.background = "#fff";
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Lead capture */}
              {showLead && !leadSent && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={submitLead}
                  className="flex flex-col gap-2.5 p-4 mt-1"
                  style={{
                    background: "#fff",
                    border: "1.5px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: "var(--navy)" }}>
                    {lang === "da" ? "Vil du have os til at kontakte dig? 📞" : "Want us to contact you? 📞"}
                  </p>
                  <input
                    type="text"
                    placeholder={lang === "da" ? "Dit navn" : "Your name"}
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    className="text-xs outline-none px-3 py-2"
                    style={{ border: "1px solid var(--border)", borderRadius: "6px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                  <input
                    type="email"
                    placeholder={lang === "da" ? "Din email" : "Your email"}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                    className="text-xs outline-none px-3 py-2"
                    style={{ border: "1px solid var(--border)", borderRadius: "6px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 text-white text-xs py-2 transition-colors"
                      style={{ background: "var(--navy)", borderRadius: "6px" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--navy-mid)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--navy)")}
                    >
                      {lang === "da" ? "Send" : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLead(false)}
                      className="text-xs px-3 py-2 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {lang === "da" ? "Nej tak" : "No thanks"}
                    </button>
                  </div>
                </motion.form>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-2 items-center shrink-0"
              style={{ background: "#fff", borderTop: "1px solid var(--border)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={lang === "da" ? "Skriv en besked..." : "Type a message..."}
                className="flex-1 text-sm outline-none px-4 py-2.5"
                style={{
                  background: "var(--bg-soft)",
                  borderRadius: "20px",
                  border: "1.5px solid var(--border)",
                  color: "var(--navy)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ background: input.trim() && !loading ? "var(--navy)" : "var(--border)", color: "#fff" }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
