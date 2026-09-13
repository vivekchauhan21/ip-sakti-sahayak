"use client";

import { useState, useEffect } from "react";
import { TRANSLATIONS, Language, SUPPORTED_LANGUAGES } from "@/data/translations";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("ip_sakti_lang") : "en") as Language;
    if (saved && TRANSLATIONS[saved]) {
      setLang(saved);
    }

    const handleLangChange = (e: any) => {
      if (e.detail && TRANSLATIONS[e.detail as Language]) {
        setLang(e.detail as Language);
      }
    };

    window.addEventListener("language_changed", handleLangChange);
    return () => window.removeEventListener("language_changed", handleLangChange);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ip_sakti_lang", newLang);
      window.dispatchEvent(new CustomEvent("language_changed", { detail: newLang }));
    }
  };

  return {
    lang,
    changeLanguage,
    t: TRANSLATIONS[lang] || TRANSLATIONS.en,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}