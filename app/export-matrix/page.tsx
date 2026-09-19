"use client";

import { useState } from "react";
import CrossBorderMatrix from "@/components/CrossBorderMatrix";
import { useLanguage } from "@/lib/useLanguage";
import { CBM_CATEGORIES, getCBMTrack } from "@/data/cbmData";
import {
  Globe2,
  TrendingUp,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function ExportMatrixPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("phytopharmaceutical");

  const currentTrack = getCBMTrack(activeCategory, lang);

  const getScoreColor = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/10",
          bar: "bg-emerald-400",
        };
      case "blue":
        return {
          text: "text-blue-400",
          border: "border-blue-500/30",
          bg: "bg-blue-500/10",
          bar: "bg-blue-400",
        };
      case "amber":
        return {
          text: "text-amber-400",
          border: "border-amber-500/30",
          bg: "bg-amber-500/10",
          bar: "bg-amber-400",
        };
      case "rose":
        return {
          text: "text-rose-400",
          border: "border-rose-500/30",
          bg: "bg-rose-500/10",
          bar: "bg-rose-400",
        };
      default:
        return {
          text: "text-slate-300",
          border: "border-slate-700",
          bg: "bg-slate-800/40",
          bar: "bg-slate-400",
        };
    }
  };

  const scoreTheme = getScoreColor(currentTrack.readinessColor);

  const getCategoryLabel = (name: string, id: string) => {
    if (id === "classical") return t.cat_classical || name;
    if (id === "ayurveda_aahar") return t.cat_functional || name;
    if (id === "phytopharmaceutical") return t.cat_phyto || name;
    if (id === "cosmeceutical") return t.cat_cosmetic || name;
    if (id === "herbomineral") return t.cat_herbomineral || name;
    if (id === "proprietary_asu") return t.cat_proprietary || name;
    return name;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-7 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20 flex items-center gap-1">
              <Globe2 size={11} />
              {t.export_benchmark_badge || "INTERNATIONAL REGULATORY BENCHMARK"}
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              TRIPs / WIPO GRATK / FDA / EMA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.export_title || "Cross-Border Regulatory Matrix"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {t.export_subtitle ||
              "Comparative statutory pathway analysis: India AYUSH/CDSCO vs US FDA (CDER/CFSAN) vs EMA / EFSA (European Union)."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/evaluator"
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition"
          >
            <span>{t.export_return_evaluator || "Return to Evaluator"}</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      {/* 6-Category Selector Tabs / Pill Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400 flex items-center gap-1.5">
            <Scale size={13} className="text-emerald-400" />
            {t.export_select_track || "Select Statutory Track (All 6 Regulatory Categories):"}
          </span>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            {t.export_tracks_mapped || "6 of 6 Jurisprudential Tracks Mapped"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CBM_CATEGORIES.map((cat) => {
            const isSelected =
              activeCategory === cat.name || activeCategory === cat.id;
            const catScoreTheme = getScoreColor(cat.readinessColor);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40"
                    : "bg-slate-950/60 border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-400 truncate uppercase">
                      {cat.shortTag.split("/")[0]}
                    </span>
                  </div>
                  <strong
                    className={`text-xs block font-semibold truncate leading-tight ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {getCategoryLabel(cat.name, cat.id)}
                  </strong>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                    isSelected
                      ? `${catScoreTheme.bg} ${catScoreTheme.text} ${catScoreTheme.border}`
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {cat.readinessScore}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Overview & Readiness Score Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {t.export_active_track || "Active Statutory Track"}
              </span>
              <span className="text-[11px] text-slate-400 font-mono break-all">
                {t.export_basis_label || "Basis:"} {currentTrack.statutoryBasis}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {getCategoryLabel(currentTrack.name, currentTrack.id)}
            </h2>
          </div>

          {/* Readiness Score Gauge */}
          <div
            className={`p-3.5 rounded-xl border flex items-center gap-3 shrink-0 ${scoreTheme.bg} ${scoreTheme.border}`}
          >
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp size={13} className={scoreTheme.text} />
                <span className={`text-xl font-extrabold font-mono ${scoreTheme.text}`}>
                  {currentTrack.readinessScore}%
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-300 block">
                {t.export_readiness_score || "Export Readiness Score"}
              </span>
            </div>
            <div className="h-9 w-px bg-slate-700/60 hidden sm:block" />
            <div className="text-left hidden sm:block max-w-[170px]">
              <span className={`text-[11px] font-semibold block leading-tight ${scoreTheme.text}`}>
                {currentTrack.readinessLevel}
              </span>
              <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                {t.export_multi_region || "Multi-Region Harmonization"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 flex-wrap gap-1">
            <span>{t.export_harmonization_index || "Harmonization Index:"} {currentTrack.readinessLevel}</span>
            <span>{currentTrack.readinessScore} / 100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
            <div
              className={`h-full rounded-full transition-all duration-500 ${scoreTheme.bar}`}
              style={{ width: `${currentTrack.readinessScore}%` }}
            />
          </div>
        </div>

        {/* Strategic Regulatory Summary */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3">
          <Sparkles size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed">
            <strong className="text-slate-200 block font-semibold">
              {t.export_summary_title || "Statutory Summary & Export Regulatory Posture:"}
            </strong>
            <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
              {currentTrack.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Cross Border Comparison Matrix Card */}
      <CrossBorderMatrix category={activeCategory} />

      {/* Jurisprudential Guidance Footer */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-slate-400">
            <strong className="text-slate-200 block font-semibold text-xs">
              {t.export_continuous_title || "Continuous Regulatory Harmonization"}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-0.5 leading-relaxed">
              {t.export_continuous_desc ||
                "All 6 pathways conform to updated 2024 gazette mandates including WIPO GRATK Treaty, US MoCRA 2022, and BDA 2024."}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Link
            href="/defensive-shield"
            className="w-full sm:w-auto text-center px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
          >
            {t.export_open_shield || "Open Defensive Shield Vault"}
          </Link>
        </div>
      </div>
    </div>
  );
}