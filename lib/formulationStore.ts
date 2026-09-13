// lib/formulationStore.ts
export interface ActiveFormulation {
  name: string;
  category: string;
  jurisdiction: "india" | "international";
  purifiedFraction: boolean;
  synergyData: boolean;
  modernCarrier: boolean;
  classicalRef: boolean;
  patentabilityScore: number;
}

const DEFAULT_STATE: ActiveFormulation = {
  name: "Standardized Withaferin-A fraction with Piperine",
  category: "Phytopharmaceutical Drug",
  jurisdiction: "india",
  purifiedFraction: true,
  synergyData: true,
  modernCarrier: true,
  classicalRef: true,
  patentabilityScore: 85,
};

export function saveActiveFormulation(data: Partial<ActiveFormulation>) {
  if (typeof window === "undefined") return;
  const current = getActiveFormulation();
  const updated = { ...current, ...data };
  localStorage.setItem("ipsakti_active_formulation", JSON.stringify(updated));
  window.dispatchEvent(new Event("formulation_changed"));
}

export function getActiveFormulation(): ActiveFormulation {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const saved = localStorage.getItem("ipsakti_active_formulation");
  if (!saved) return DEFAULT_STATE;
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_STATE;
  }
}
export function saveLanguage(lang: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("ipsakti_bhashini_lang", lang);
}

export function getSavedLanguage(): string {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("ipsakti_bhashini_lang") || "en";
}