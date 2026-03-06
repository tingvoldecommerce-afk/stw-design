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

// SVG icons
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const [inputFocused, setInputFocused] = useState(false);
  const msgCount = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 300);
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
  const canSend = !!input.trim() && !loading;
  const suggestions = lang === "da" ? suggestionsDa : suggestionsEn;

  return (
    <>
      <style>{`
        @keyframes nxBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes nxFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nxPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.8); }
        }
        .nx-dot { animation: nxBounce 1s ease-in-out infinite; }
        .nx-msg { animation: nxFadeUp 0.25s ease both; }
        .nx-glow {
          position: relative;
        }
        .nx-glow::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(74,222,128,0.45);
          animation: nxPulse 2s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-7 z-50 flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#0c2240",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(12,34,64,0.25)",
          transition: "box-shadow 0.2s ease",
        }}
        whileHover={{ boxShadow: "0 6px 24px rgba(12,34,64,0.35)" }}
        aria-label="Åbn chat"
      >
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChatSVG />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsating green dot */}
          <span
            className="nx-glow"
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 9,
              height: 9,
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 flex flex-col overflow-hidden"
            style={{
              width: "min(380px, calc(100vw - 32px))",
              height: 540,
              bottom: 100,
              right: 28,
              borderRadius: 16,
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 40px rgba(12,34,64,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="shrink-0 px-4 py-3 flex items-center gap-3"
              style={{ background: "#0c2240" }}
            >
              {/* NX avatar */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#1a5296",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#fff",
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}
              >
                NX
              </div>

              {/* Title + subtitle */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  NEXUS
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.3,
                    marginTop: 1,
                  }}
                >
                  STW Webdesign AI-assistent
                </p>
              </div>

              {/* Online badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  flexShrink: 0,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "block" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 11,
                    color: "#4ade80",
                    fontWeight: 500,
                  }}
                >
                  Online
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s, color 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }}
              >
                <X size={14} />
              </button>
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
                    gap: 16,
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: "#e8f0fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a5296" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0c2240",
                        marginBottom: 6,
                      }}
                    >
                      Hej! Hvad kan jeg hjælpe med?
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: 13,
                        color: "#64748b",
                        lineHeight: 1.5,
                      }}
                    >
                      Stil mig et spørgsmål om hjemmesider, SEO eller AI-løsninger.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7, width: "100%" }}>
                    {suggestions.map(({ text, Icon }, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(text)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "11px 14px",
                          borderRadius: 10,
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "border-color 0.15s, background 0.15s",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: 13,
                          color: "#0c2240",
                          fontWeight: 400,
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#0c2240";
                          e.currentTarget.style.background = "#f8fafc";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.background = "#fff";
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 7,
                            background: "#f0f4f9",
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
                    gap: 7,
                    animationDelay: `${Math.min(i * 0.02, 0.08)}s`,
                  }}
                >
                  {m.role === "assistant" && (
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "#0c2240",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                        fontWeight: 700, fontSize: 8,
                        color: "#fff", flexShrink: 0, letterSpacing: "0.05em",
                      }}
                    >
                      NX
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: "76%",
                      padding: "9px 13px",
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontWeight: 400,
                      ...(m.role === "assistant"
                        ? {
                            background: "#fff",
                            color: "#1e293b",
                            borderRadius: "4px 14px 14px 14px",
                            border: "1px solid #f1f5f9",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                          }
                        : {
                            background: "#0c2240",
                            color: "#fff",
                            borderRadius: "14px 4px 14px 14px",
                          }),
                    }}
                  >
                    {m.content}
                  </div>

                  {m.role === "user" && (
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                        fontWeight: 700, fontSize: 8,
                        color: "#475569", flexShrink: 0, letterSpacing: "0.05em",
                      }}
                    >
                      DU
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: "#0c2240",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                      fontWeight: 700, fontSize: 8, color: "#fff", flexShrink: 0,
                    }}
                  >
                    NX
                  </div>
                  <div
                    style={{
                      padding: "11px 14px",
                      background: "#fff",
                      borderRadius: "4px 14px 14px 14px",
                      border: "1px solid #f1f5f9",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {[0, 0.18, 0.36].map((delay, idx) => (
                      <span
                        key={idx}
                        className="nx-dot"
                        style={{
                          width: 6, height: 6,
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onSubmit={submitLead}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: 14,
                    marginTop: 2,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#0c2240",
                    }}
                  >
                    {lang === "da" ? "Vil du have os til at kontakte dig?" : "Want us to contact you?"}
                  </p>
                  <input
                    type="text"
                    placeholder={lang === "da" ? "Dit navn" : "Your name"}
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: 13,
                      outline: "none",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      color: "#0c2240",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0c2240")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <input
                    type="email"
                    placeholder={lang === "da" ? "Din email" : "Your email"}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: 13,
                      outline: "none",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      color: "#0c2240",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0c2240")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        color: "#fff",
                        fontSize: 13,
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontWeight: 500,
                        padding: "8px",
                        background: "#0c2240",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {lang === "da" ? "Send" : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLead(false)}
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: 13,
                        color: "#94a3b8",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
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
              style={{ background: "#fff", borderTop: "1px solid #e2e8f0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  padding: "7px 7px 7px 13px",
                  borderRadius: 12,
                  background: "#fff",
                  border: `1px solid ${inputFocused ? "#0c2240" : "#e2e8f0"}`,
                  boxShadow: inputFocused ? "0 0 0 3px rgba(12,34,64,0.08)" : "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
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
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: 13.5,
                    color: "#0c2240",
                    lineHeight: 1.5,
                    maxHeight: 80,
                    overflow: "auto",
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!canSend}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: "#0c2240",
                    border: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canSend ? "pointer" : "default",
                    opacity: canSend ? 1 : 0.4,
                    transition: "opacity 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <SendSVG />
                </button>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 10.5,
                  color: "#cbd5e1",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
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
