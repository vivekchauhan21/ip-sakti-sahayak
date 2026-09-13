"use client";

import { useState } from "react";
import CrossBorderMatrix from "@/components/CrossBorderMatrix";
import { useLanguage } from "@/lib/useLanguage";

const CATEGORIES = [
  "Phytopharmaceutical Drug",
  "Classical Ayurvedic Medicine",
  "Ayurveda Aahar (Health Supplement)",
  "Ayurvedic Cosmetic (Topical)",
];

export default function ExportMatrixPage() {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState("Phytopharmaceutical Drug");

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {t.export_title || "Cross-Border Regulatory Matrix"}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {t.export_subtitle || "Comparative statutory pathway analysis: India AYUSH/CDSCO vs USFDA vs EMA (European Union)."}
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const localizedLabel =
            cat.includes("Classical") ? (t.cat_classical || cat) :
            cat.includes("Aahar") ? (t.cat_functional || cat) :
            cat.includes("Phyto") ? (t.cat_phyto || cat) :
            cat.includes("Cosmetic") ? (t.cat_cosmetic || cat) : cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                selectedCat === cat
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {localizedLabel}
            </button>
          );
        })}
      </div>

      {/* Cross Border Comparison Matrix Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <CrossBorderMatrix category={selectedCat} />
      </div>
    </div>
  );
}