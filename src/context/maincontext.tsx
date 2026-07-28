"use client";

import React, { createContext, useContext, useState } from "react";
import { dictionary, Language } from "@/lib/dictionary";
export type TranslationDictionary = typeof dictionary[Language];
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary // Tipi autocompletati per i testi!
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("IT");

  const t = dictionary[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personalizzato per usare facilmente il contesto nei componenti
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve essere usato all'interno di un LanguageProvider");
  }
  return context;
}