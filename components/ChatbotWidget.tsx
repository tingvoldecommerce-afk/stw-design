"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LangProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LEAD_TRIGGER_COUNT = 3;

const navyGrad = "linear-gradient(135deg, #0c2240 0%, #163d6e 50%, #1a5296 100%)";
const navyGradDark = "linear-gradient(135deg, #0f2a4a 0%, #1a5296 100%)";
const fontSyne = "'Syne', system-ui, sans-serif";
const fontDM = "'DM Sans', system-ui, sans-serif";

const InfoSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const PlusSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);
const SearchSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChatSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SendSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const suggestionsDa = [
  { text: "Hvad koster en hjemmeside?", Icon: InfoSVG },
  { text: "Fortæl mig om AI chatbots", Icon: PlusSVG },
  { text: "Hvordan virker SEO?", Icon: SearchSVG },
];
const suggestionsEn = [
  { text: "What does a website cost?", Icon: InfoSVG },
  { text: "Tell me about AI chatbots", Icon: PlusSVG },
  { text: "How does SEO work?", Icon: SearchSVG },
];

export default function ChatbotWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const [sendHover, setSendHover] = useState(false);
  const [sendPress, setSendPress] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const msgCount = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 350);
  }, [open]);

  function growTextarea() {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 80)}px`;
  }

  async function sendMessage(text?: string) {
    const msgText = (text ?? input).trim();
    if (!msgText || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
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
        content: `Tak ${leadName}! Vi kontakter dig på ${leadEmail} hurtigst muligt.`,
      },
    ]);
    await fetch("https://formspree.io/f/xjgejojz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: leadName, email: leadEmail, source: "Chatbot" }),
    });
  }

  const hasMessages = messages.length > 0;
  const suggestions = lang === "da" ? suggestionsDa : suggestionsEn;
  const canSend = !!input.trim() && !loading;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        @keyframes nxPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes nxBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes nxFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nx-pulse { position: relative; }
        .nx-pulse::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(74,222,128,0.4);
          animation: nxPulse 2s ease-in-out infinite;
          pointer-events: none;
        }

        .nx-header { position: relative; overflow: hidden; }
        .nx-header::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .nx-header::after {
          content: '';
          position: absolute;
          bottom: -20px; left: -20px;
          width: 70px; height: 70px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .nx-msg { animation: nxFadeUp 0.3s ease both; }
        .nx-dot { animation: nxBounce 1s ease-in-out infinite; }
      `}</style>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: navyGrad,
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(12,34,64,0.35)",
        }}
        whileHover={{ boxShadow: "0 12px 40px rgba(12,34,64,0.5)" }}
        aria-label="Åbn chat"
      >
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <ChatSVG />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsating green notification dot */}
          <span
            className="nx-pulse"
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#4ade80",
              border: "2px solid #0c2240",
              display: "block",
            }}
          />
        </div>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
            style={{
              width: "min(380px, calc(100vw - 32px))",
              height: 560,
              borderRadius: 24,
              background: "#fff",
              boxShadow: "0 24px 80px rgba(15,42,74,0.22)",
            }}
          >
            {/* Header */}
            <div
              className="nx-header shrink-0 px-5 py-4"
              style={{ background: navyGrad }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, position: "relative", zIndex: 1 }}>
                {/* Square avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fontSyne,
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#fff",
                      letterSpacing: "0.06em",
                    }}
                  >
                    NX
                  </div>
                  {/* Pulsating green dot on avatar */}
                  <span
                    className="nx-pulse"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#4ade80",
                      border: "2px solid #0c2240",
                      display: "block",
                    }}
                  />
                </div>

                {/* Title + subtitle + badge + close */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: fontSyne,
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#fff",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.1,
                      }}
                    >
                      NEXUS
                    </span>

                    {/* Online badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "3px 8px",
                        borderRadius: 20,
                        background: "rgba(74,222,128,0.15)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", flexShrink: 0, display: "block" }} />
                      <span style={{ fontFamily: fontDM, fontSize: 10.5, color: "#4ade80", fontWeight: 500 }}>
                        Online
                      </span>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setOpen(false)}
                      style={{
                        marginLeft: "auto",
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        background: "transparent",
                        border: "none",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.15s, color 0.15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <p
                    style={{
                      fontFamily: fontDM,
                      fontSize: 11.5,
                      color: "rgba(255,255,255,0.6)",
                      marginTop: 3,
                      lineHeight: 1.3,
                    }}
                  >
                    STW Webdesign AI-assistent
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: fontDM,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 10,
                  letterSpacing: "0.02em",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Svar på sekunder · Tilgængelig 24/7
              </p>
            </div>

            {/* Messages / Welcome */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ background: "#f8fafc" }}
            >
              {/* Welcome state */}
              {!hasMessages && !loading && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 14,
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #e8f0fe 0%, #c7d9fb 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a5296" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: fontSyne, fontWeight: 700, fontSize: 15, color: "#0c2240", marginBottom: 6 }}>
                      Hej! Hvad kan jeg hjælpe med?
                    </p>
                    <p style={{ fontFamily: fontDM, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>
                      Stil mig et spørgsmål om hjemmesider, SEO eller AI-løsninger.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {suggestions.map(({ text, Icon }, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(text)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 12,
                          background: "#fff",
                          border: "1.5px solid #e2e8f0",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "border-color 0.15s, background 0.15s, transform 0.15s",
                          fontFamily: fontDM,
                          fontSize: 13,
                          color: "#0c2240",
                          fontWeight: 400,
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#1a5296";
                          e.currentTarget.style.background = "#f0f6ff";
                          e.currentTarget.style.transform = "translateX(3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.background = "#fff";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: "#f0f6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1a5296",
                            flexShrink: 0,
                          }}
                        >
                          <Icon />
                        </div>
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className="nx-msg"
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 8,
                    animationDelay: `${Math.min(i * 0.02, 0.1)}s`,
                  }}
                >
                  {m.role === "assistant" && (
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: 10,
                        background: navyGrad,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: fontSyne, fontWeight: 800, fontSize: 9,
                        color: "#fff", flexShrink: 0, letterSpacing: "0.06em",
                      }}
                    >
                      NX
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 14px",
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      fontFamily: fontDM,
                      fontWeight: 400,
                      ...(m.role === "assistant"
                        ? {
                            background: "#fff",
                            color: "#1e293b",
                            borderRadius: "4px 16px 16px 16px",
                            border: "1px solid #f1f5f9",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }
                        : {
                            background: navyGradDark,
                            color: "#fff",
                            borderRadius: "16px 4px 16px 16px",
                          }),
                    }}
                  >
                    {m.content}
                  </div>

                  {m.role === "user" && (
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: 10,
                        background: "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: fontSyne, fontWeight: 800, fontSize: 9,
                        color: "#475569", flexShrink: 0, letterSpacing: "0.06em",
                      }}
                    >
                      DU
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: 10,
                      background: navyGrad,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: fontSyne, fontWeight: 800, fontSize: 9,
                      color: "#fff", flexShrink: 0,
                    }}
                  >
                    NX
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "#fff",
                      borderRadius: "4px 16px 16px 16px",
                      border: "1px solid #f1f5f9",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {[0, 0.2, 0.4].map((delay, idx) => (
                      <span
                        key={idx}
                        className="nx-dot"
                        style={{
                          width: 7, height: 7,
                          borderRadius: "50%",
                          background: "#94a3b8",
                          display: "block",
                          animationDelay: `${delay}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Lead capture */}
              {showLead && !leadSent && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={submitLead}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: 14,
                    marginTop: 4,
                    background: "#fff",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{ fontFamily: fontSyne, fontWeight: 700, fontSize: 13, color: "#0c2240" }}>
                    {lang === "da" ? "Vil du have os til at kontakte dig?" : "Want us to contact you?"}
                  </p>
                  <input
                    type="text"
                    placeholder={lang === "da" ? "Dit navn" : "Your name"}
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    style={{
                      fontFamily: fontDM, fontSize: 12, outline: "none",
                      padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5296")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <input
                    type="email"
                    placeholder={lang === "da" ? "Din email" : "Your email"}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                    style={{
                      fontFamily: fontDM, fontSize: 12, outline: "none",
                      padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#1a5296")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1, color: "#fff",
                        fontSize: 12, fontFamily: fontDM, fontWeight: 500,
                        padding: "8px", background: navyGradDark,
                        borderRadius: 8, border: "none", cursor: "pointer",
                      }}
                    >
                      {lang === "da" ? "Send" : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLead(false)}
                      style={{
                        fontFamily: fontDM, fontSize: 12, color: "#94a3b8",
                        padding: "8px 12px", background: "transparent",
                        border: "none", cursor: "pointer",
                      }}
                    >
                      {lang === "da" ? "Nej tak" : "No thanks"}
                    </button>
                  </div>
                </motion.form>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="shrink-0 px-4 pt-3 pb-2"
              style={{ background: "#fff", borderTop: "1px solid #f1f5f9" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  padding: "8px 8px 8px 14px",
                  borderRadius: 16,
                  background: inputFocused ? "#fff" : "#f8fafc",
                  border: `1.5px solid ${inputFocused ? "#1a5296" : "#e2e8f0"}`,
                  boxShadow: inputFocused ? "0 0 0 3px rgba(26,82,150,0.1)" : "none",
                  transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); growTextarea(); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder={lang === "da" ? "Skriv en besked..." : "Type a message..."}
                  rows={1}
                  style={{
                    flex: 1,
                    resize: "none",
                    outline: "none",
                    border: "none",
                    background: "transparent",
                    fontFamily: fontDM,
                    fontSize: 13.5,
                    color: "#0c2240",
                    lineHeight: 1.5,
                    maxHeight: 80,
                    overflow: "auto",
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                />

                {/* Send button */}
                <button
                  onClick={() => sendMessage()}
                  disabled={!canSend}
                  onMouseEnter={() => setSendHover(true)}
                  onMouseLeave={() => { setSendHover(false); setSendPress(false); }}
                  onMouseDown={() => setSendPress(true)}
                  onMouseUp={() => setSendPress(false)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    background: navyGradDark,
                    border: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canSend ? "pointer" : "default",
                    opacity: canSend ? 1 : 0.5,
                    transform: sendPress
                      ? "scale(0.94)"
                      : sendHover && canSend
                        ? "scale(1.08)"
                        : "scale(1)",
                    transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1), opacity 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <SendSVG />
                </button>
              </div>

              {/* Footer brand */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 10.5,
                  color: "#cbd5e1",
                  fontFamily: fontDM,
                  marginTop: 6,
                }}
              >
                Powered by STW Webdesign
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
