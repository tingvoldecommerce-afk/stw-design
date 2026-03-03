"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LEAD_TRIGGER_COUNT = 3;

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hej! Jeg er NEXUS, STW Designs AI-assistent. Hvordan kan jeg hjælpe dig? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const msgCount = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    msgCount.current += 1;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Beklager, noget gik galt." }]);

      if (msgCount.current >= LEAD_TRIGGER_COUNT && !leadSent) {
        setTimeout(() => setShowLead(true), 1200);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Beklager, der opstod en fejl. Prøv igen." }]);
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
      { role: "assistant", content: `Tak ${leadName}! Vi kontakter dig på ${leadEmail} hurtigst muligt. 🙌` },
    ]);
    await fetch("https://formspree.io/f/xjgejojz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: leadName, email: leadEmail, source: "Chatbot" }),
    });
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        aria-label="Åbn chat"
        style={{ width: 52, height: 52 }}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-white border border-gray-200 shadow-2xl flex flex-col"
            style={{ height: 420 }}
          >
            {/* Header */}
            <div className="bg-black text-white px-4 py-3 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-semibold tracking-wide">NEXUS · STW Design</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-black text-white self-end"
                      : "bg-gray-100 text-black self-start"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="bg-gray-100 self-start px-3 py-2 flex gap-1.5 items-center">
                  <Loader2 size={13} className="animate-spin text-gray-400" />
                  <span className="text-xs text-gray-400">Skriver...</span>
                </div>
              )}

              {/* Lead form */}
              {showLead && !leadSent && (
                <form onSubmit={submitLead} className="bg-gray-50 border border-gray-200 p-3 mt-1 flex flex-col gap-2">
                  <p className="text-xs text-gray-600 font-medium">Vil du have os til at kontakte dig? 📞</p>
                  <input
                    type="text"
                    placeholder="Dit navn"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    className="border border-gray-300 px-2.5 py-1.5 text-xs outline-none focus:border-black"
                  />
                  <input
                    type="email"
                    placeholder="Din email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                    className="border border-gray-300 px-2.5 py-1.5 text-xs outline-none focus:border-black"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-black text-white text-xs py-1.5 hover:bg-gray-800 transition-colors">
                      Send
                    </button>
                    <button type="button" onClick={() => setShowLead(false)} className="text-xs text-gray-400 hover:text-gray-600 px-2">
                      Nej tak
                    </button>
                  </div>
                </form>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 px-3 py-2.5 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Skriv en besked..."
                className="flex-1 text-sm outline-none placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="text-black disabled:text-gray-300 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
