"use client";

import { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";
import CookieBanner from "./CookieBanner";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const openPrivacy = useRef<() => void>(() => {});
  const openCookies = useRef<() => void>(() => {});

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer
        onPrivacy={() => openPrivacy.current?.()}
        onCookies={() => openCookies.current?.()}
      />
      <ChatbotWidget />
      <CookieBanner
        onPrivacyOpen={(fn) => { openPrivacy.current = fn; }}
        onCookiesOpen={(fn) => { openCookies.current = fn; }}
      />
    </>
  );
}
