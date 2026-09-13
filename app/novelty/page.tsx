"use client";

import { useState, useMemo, useEffect } from "react";
import { getActiveFormulation } from "@/lib/formulationStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  FlaskConical,
} from "lucide-react";

export default function NoveltyMeterPage() {
  const { t } = useLanguage();
  const [formulationName, setFormulationName] = useState("Standardized Withaferin-A fraction with Piperine");
  const [factors, setFactors] = useState({
    purifiedExtract: true,
    synergyData: false,
    modernCarrier: true,
  });

  // Global store se active formulation listen karo
  useEffect(() => {
    const syncWithStore = () => {
      const active = getActiveFormulation();
      if (active?.name) {
        setFormulationName(active.name);
      }
      if (active) {
        setFactors({
          purifiedExtract: active.purifiedFraction ?? true,
          synergyData: active.synergyData ?? false,
          modernCarrier: active.modernCarrier ?? true,
        });
      }
    };

    syncWithStore();
    window.addEventListener("formulation_changed", syncWithStore);
    return () => window.removeEventListener("formulation_changed", syncWithStore);
  }, []);

  const toggleFactor = (key: keyof typeof factors) => {
    setFactors((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { score, statusText, statusColor, statutoryAnalysis } = useMemo(() => {
    let s = 15; // baseline classical prior art
    if (factors.purifiedExtract) s += 45;
    if (factors.synergyData) s += 25;
    if (factors.modernCarrier) s += 15;

    let text = t.novelty_status_classical || "Pure Classical TK (Barred)";
    let color = "text-rose-400 border-rose-500/30 bg-rose-500/10";
    let analysis =
      t.novelty_analysis_classical ||
      "Composition directly conflicts with documented classical Granthas. High risk of absolute rejection under Section 3(p).";

    if (s >= 75) {
      text = t.novelty_status_patentable || "Novel Extraction / Formulation (Patentable Potential)";
      color = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      analysis =
        t.novelty_analysis_patentable ||
        "Standardized active fractions and novel excipients demonstrate inventive step beyond classical prior art, overcoming Section 3(p) TKDL objections.";
    } else if (s >= 40) {
      text = t.novelty_status_admixture || "Synergistic Admixture (Conditional)";
      color = "text-amber-400 border-amber-500/30 bg-amber-500/10";
      analysis =
        t.novelty_analysis_admixture ||
        "Combination requires rigorous Combination Index (CI < 1) quantitative biological assay data to clear Section 3(e) non-patentability bar.";
    }

    return { score: s, statusText: text, statusColor: color, statutoryAnalysis: analysis };
  }, [factors, t]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
            <span className="w-2 h-0.5 bg-emerald-400" />
            {t.workspace}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{t.novelty_title || "TKDL vs Novelty Index"}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Sec. 3(p) &amp; 3(e) Calibrator
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.novelty_desc || "Algorithmic prior art scrutiny evaluating statutory barriers under Section 3(p) (Traditional Knowledge) and Section 3(e) (Mere Admixture) of the Patents Act, 1970."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.novelty_badge || "Algorithmic Scrutiny: Active"}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Factors */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-5">
          <div className="border-b border-slate-800/60 pb-4">
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
              {t.input_parameters || "INPUT PARAMETERS"}
            </span>
            <h2 className="text-base font-semibold text-slate-200">
              {t.novelty_left_title || "Formulation & Technical Factors"}
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.novelty_active_subject || "Active subject:"} <span className="text-emerald-400 font-mono font-medium">{formulationName}</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.novelty_left_subtitle || "Select verified technical characteristics to establish distance from classical citations."}
            </p>
          </div>

          <div className="space-y-3">
            {/* Factor 1 */}
            <label
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition cursor-pointer ${
                factors.purifiedExtract
                  ? "bg-slate-950/60 border-emerald-500/40 shadow-sm shadow-emerald-950/20"
                  : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={factors.purifiedExtract}
                onChange={() => toggleFactor("purifiedExtract")}
                className="mt-1 rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className={factors.purifiedExtract ? "text-emerald-400" : "text-slate-400"} />
                  <span className={`text-xs font-semibold ${factors.purifiedExtract ? "text-white" : "text-slate-300"}`}>
                    {t.factor_purified_title || "Purified active extract fraction isolated"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {t.factor_purified_desc || "Standardized marker compound extraction exceeding crude raw herb processing defined in 1st Schedule texts."}
                </p>
              </div>
            </label>

            {/* Factor 2 */}
            <label
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition cursor-pointer ${
                factors.synergyData
                  ? "bg-slate-950/60 border-emerald-500/40 shadow-sm shadow-emerald-950/20"
                  : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={factors.synergyData}
                onChange={() => toggleFactor("synergyData")}
                className="mt-1 rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Scale size={14} className={factors.synergyData ? "text-emerald-400" : "text-slate-400"} />
                  <span className={`text-xs font-semibold ${factors.synergyData ? "text-white" : "text-slate-300"}`}>
                    {t.factor_synergy_title || "Validated synergy efficacy data (CI < 1)"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {t.factor_synergy_desc || "Empirical bioassay demonstrating therapeutic enhancement greater than the arithmetic sum of isolated ingredients."}
                </p>
              </div>
            </label>

            {/* Factor 3 */}
            <label
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition cursor-pointer ${
                factors.modernCarrier
                  ? "bg-slate-950/60 border-emerald-500/40 shadow-sm shadow-emerald-950/20"
                  : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={factors.modernCarrier}
                onChange={() => toggleFactor("modernCarrier")}
                className="mt-1 rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers size={14} className={factors.modernCarrier ? "text-emerald-400" : "text-slate-400"} />
                  <span className={`text-xs font-semibold ${factors.modernCarrier ? "text-white" : "text-slate-300"}`}>
                    {t.factor_carrier_title || "Novel modern excipient / nano carrier vehicle"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {t.factor_carrier_desc || "Liposomal, phospholipid, or targeted polymer nano-delivery matrix altering pharmacokinetic clearance."}
                </p>
              </div>
            </label>
          </div>

          {/* Legal Note */}
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-2.5">
            <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.novelty_legal_note || "Section 3(p) strictly prohibits patenting traditional knowledge. Only combinations demonstrating non-obvious inventive step or standardized isolates can survive IPO First Examination Reports (FER)."}
            </p>
          </div>
        </section>

        {/* Right Column: Dynamic Index Gauge & Verdict */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                {t.algorithmic_outcome || "ALGORITHMIC OUTCOME"}
              </span>
              <h2 className="text-base font-semibold text-slate-200">
                {t.novelty_right_title || "Novelty Distance Index"}
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300">
              Metric: TKDL-NDI v2
            </span>
          </div>

          {/* Metric Score Display */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  {t.statutory_category || "STATUTORY CATEGORY"}
                </span>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border ${statusColor}`}>
                  {statusText}
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight block">
                  {score}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">
                  {t.novelty_distance_label || "NOVELTY DISTANCE"}
                </span>
              </div>
            </div>

            {/* Progress Bar with Milestones */}
            <div className="space-y-1.5 pt-2">
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-linear-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1">
                <span>0% (Classical TK)</span>
                <span>40% (Admixture)</span>
                <span>70% (Synergistic)</span>
                <span>100% (Pure Novel)</span>
              </div>
            </div>
          </div>

          {/* Statutory Analysis Box */}
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.statutory_analysis || "STATUTORY ANALYSIS"}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {statutoryAnalysis}
            </p>
          </div>

          {/* Quick Filing Strategy Badge */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-2 text-xs">
            <span className="font-semibold text-slate-300 block">
              {t.recommended_action || "Recommended Action:"}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              {score >= 75 ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>{t.novelty_action_eligible || "Eligible for complete provisional patent filing (Form 1 + Form 2)."}</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                  <span>{t.novelty_action_defensive || "Publish via Defensive Shield vault to preempt biopiracy before filing patent."}</span>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}