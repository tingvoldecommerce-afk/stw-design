"use client";

import React, { createContext, useContext, useState } from "react";

type Lang = "da" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "da",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("da");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT(da: string, en: string) {
  const { lang } = useLang();
  return lang === "da" ? da : en;
}
