
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { dictionary, Language } from "@/lib/dictionary";

export type TranslationDictionary = typeof dictionary[Language];

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("IT");

  const t = dictionary[lang];

  const contextValue = useMemo(() => ({
    lang,
    setLang,
    t
  }), [lang, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve essere usato all'interno di un LanguageProvider");
  }
  return context;
}