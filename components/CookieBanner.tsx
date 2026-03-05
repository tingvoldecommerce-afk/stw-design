"use client";

import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CookieBannerProps {
  onPrivacyOpen?: (open: () => void) => void;
  onCookiesOpen?: (open: () => void) => void;
}

export default function CookieBanner({ onPrivacyOpen, onCookiesOpen }: CookieBannerProps) {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [cookieModal, setCookieModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShow(true), 1200);
    } else if (consent === "accepted") {
      setAccepted(true);
    }
    onPrivacyOpen?.(() => setPrivacyModal(true));
    onCookiesOpen?.(() => setCookieModal(true));
  }, [onPrivacyOpen, onCookiesOpen]);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setAccepted(true);
    setShow(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  }

  return (
    <>
      {accepted && <SpeedInsights />}

      {/* Cookie banner */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-black text-white p-5 shadow-2xl"
          >
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Vi bruger cookies til at forbedre din oplevelse og analysere trafikken.{" "}
              <button onClick={() => setCookieModal(true)} className="underline hover:no-underline">
                Læs mere
              </button>
            </p>
            <div className="flex gap-3">
              <button
                onClick={accept}
                className="flex-1 bg-white text-black text-sm font-semibold py-2 hover:bg-gray-100 transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={decline}
                className="flex-1 border border-white/30 text-white/70 text-sm py-2 hover:border-white hover:text-white transition-colors"
              >
                Afvis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy modal */}
      <AnimatePresence>
        {privacyModal && (
          <Modal title="Privatlivspolitik" onClose={() => setPrivacyModal(false)}>
            <p className="text-sm text-gray-600 mb-3">Sidst opdateret: Januar 2026</p>
            <h3 className="font-semibold mb-2">1. Dataansvar</h3>
            <p className="text-sm text-gray-700 mb-4">
              STW-Webdesign er dataansvarlig for de personoplysninger, vi behandler om dig.
              Kontakt: kontakt@stw-webdesign.dk
            </p>
            <h3 className="font-semibold mb-2">2. Hvilke data indsamler vi?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Vi indsamler de oplysninger, du giver os via kontaktformularen (navn, email, besked)
              og tekniske data via Vercel Speed Insights (sidevisninger, indlæsningstider).
            </p>
            <h3 className="font-semibold mb-2">3. Formål</h3>
            <p className="text-sm text-gray-700 mb-4">
              Data bruges til at besvare henvendelser og forbedre hjemmesidens ydeevne.
              Vi sælger ikke dine data til tredjepart.
            </p>
            <h3 className="font-semibold mb-2">4. Dine rettigheder</h3>
            <p className="text-sm text-gray-700">
              Du har ret til indsigt, berigtigelse og sletning af dine data.
              Kontakt os på kontakt@stw-webdesign.dk for at udøve dine rettigheder.
            </p>
          </Modal>
        )}
      </AnimatePresence>

      {/* Cookie policy modal */}
      <AnimatePresence>
        {cookieModal && (
          <Modal title="Cookiepolitik" onClose={() => setCookieModal(false)}>
            <p className="text-sm text-gray-600 mb-3">Sidst opdateret: Januar 2026</p>
            <h3 className="font-semibold mb-2">Hvad er cookies?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Cookies er små tekstfiler, der gemmes på din enhed. De hjælper os med at huske
              dine præferencer og forstå, hvordan du bruger vores hjemmeside.
            </p>
            <h3 className="font-semibold mb-2">Hvilke cookies bruger vi?</h3>
            <div className="text-sm text-gray-700 mb-4 space-y-2">
              <p><strong>Nødvendige cookies:</strong> Husker dit cookie-samtykke (1 år).</p>
              <p><strong>Analyse-cookies (Vercel Speed Insights):</strong> Anonyme performance-data. Aktiveres kun ved accept.</p>
            </div>
            <h3 className="font-semibold mb-2">Slette cookies</h3>
            <p className="text-sm text-gray-700">
              Du kan til enhver tid slette cookies i din browsers indstillinger.
              Afvis cookies, og vi indsamler kun anonyme analyse-data via Vercel.
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-5">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
  );
}
