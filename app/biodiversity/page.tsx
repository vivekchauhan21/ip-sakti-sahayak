"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
import {
  Leaf,
  ShieldCheck,
  Scale,
  Building2,
  Globe2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Waves,
} from "lucide-react";

export default function BiodiversityPage() {
  const { t } = useLanguage();
  const [ingredients, setIngredients] = useState(
    "Ashwagandha (Withania somnifera), Sarpagandha (Rauvolfia serpentina), Turmeric"
  );
  const [entityType, setEntityType] = useState<"indian" | "foreign">("indian");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
            <span className="w-2 h-0.5 bg-emerald-400" />
            NBA &amp; SBB STATUTORY PORTAL / BDA 2024
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{t.bda_title || "Biological Diversity Act (BDA 2024) Compliance"}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Access &amp; Benefit Sharing (ABS)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t.bda_subtitle || "Automated statutory classification under Section 3, Section 7, and Section 24 of the Biological Diversity Act, 2002 (Amended 2024) for domestic and international utilization."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.bda_badge || "Ruleset 2024: Verified"}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sourced Ingredients & Entity Selection */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div className="border-b border-slate-800/60 pb-4">
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
              {t.bda_step1 || "STEP 01 / PROFILE SETUP"}
            </span>
            <h2 className="text-base font-semibold text-slate-200">
              {t.bda_input_title || "Biological Resources & Entity Type"}
            </h2>
          </div>

          {/* Sourced Resources Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              {t.bda_herbs_label || "Botanical Resources / Ingredients Sourced"}
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. Withania somnifera, Rauvolfia serpentina..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
            />
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Waves size={12} className="text-slate-400" />
              <span>{t.bda_herbs_hint || "Bio-resources sourced inside the territory of India"}</span>
            </div>
          </div>

          {/* Entity Radio Selection */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-medium text-slate-300 block">
              {t.bda_entity_label || "Applicant Corporate & Nationality Status"}
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              <label
                onClick={() => setEntityType("indian")}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                  entityType === "indian"
                    ? "bg-slate-950/70 border-emerald-500/50 shadow-sm shadow-emerald-950/20"
                    : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="mt-0.5">
                  <Building2 size={16} className={entityType === "indian" ? "text-emerald-400" : "text-slate-500"} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${entityType === "indian" ? "text-white" : "text-slate-300"}`}>
                      Indian Entity (Individual / LLP / Co)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      SEC. 7 TRACK
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    100% Indian shareholding with no foreign participation or non-resident directorship.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setEntityType("foreign")}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                  entityType === "foreign"
                    ? "bg-slate-950/70 border-rose-500/50 shadow-sm shadow-rose-950/20"
                    : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="mt-0.5">
                  <Globe2 size={16} className={entityType === "foreign" ? "text-rose-400" : "text-slate-500"} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${entityType === "foreign" ? "text-white" : "text-slate-300"}`}>
                      Foreign Entity / NRI Shareholding (&gt; 0%)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      SEC. 3 TRACK
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Incorporated outside India, or Indian registered firm with foreign equity or NRI capital.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Right Column: Dynamic Clearance Pathway Card */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                {t.bda_step2 || "STEP 02 / STATUTORY CLEARANCE"}
              </span>
              <h2 className="text-base font-semibold text-slate-200">
                {t.bda_outcome_title || "Compliance Determination"}
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700 text-slate-300">
              {entityType === "indian" ? "PATHWAY A" : "PATHWAY B"}
            </span>
          </div>

          {/* Verdict Box */}
          {entityType === "indian" ? (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t.bda_sec7_title || "Section 7 Exemption with Prior SBB Intimation"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.bda_sec7_desc || "Indian entities do not require National Biodiversity Authority (NBA) prior approval for domestic utilization, but must file Form I prior intimation to the respective State Biodiversity Board (SBB) before commercial production."}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">{t.bda_mandatory_filing || "MANDATORY FILING:"}</span>
                  <span className="text-emerald-400 font-semibold">SBB Form I</span>
                </div>
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">{t.bda_benefit_sharing || "BENEFIT SHARING (ABS):"}</span>
                  <span className="text-slate-300 font-semibold">AYUSH Exemption Applies</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Mandatory NBA Prior Approval (Section 3 &amp; 6)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Foreign entities or companies with foreign shareholding are prohibited from accessing Indian biological resources or applying for patents without <strong>prior approval from the National Biodiversity Authority (NBA)</strong>.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">{t.bda_mandatory_filing || "MANDATORY APPROVAL:"}</span>
                  <span className="text-rose-400 font-semibold">NBA Form I &amp; Form III</span>
                </div>
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">ABS LEVY STATUS:</span>
                  <span className="text-rose-300 font-semibold">Mandatory 3-5% Levy</span>
                </div>
              </div>
            </div>
          )}

          {/* Timeline & Steps Checklist */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                {t.bda_timeline_title || "Statutory Clearance Sequence"}
              </span>
              <span className="font-mono text-[11px] flex items-center gap-1">
                <Clock size={12} />
                <span>Est. 30-90 Days</span>
              </span>
            </div>

            <ul className="space-y-2">
              <li className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-800 bg-slate-950/40 text-xs">
                <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <strong className="text-slate-200 block">Sourcing Location Traceability</strong>
                  <span className="text-[11px] text-slate-400 block">Identify local Biodiversity Management Committees (BMC) for raw herbs.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-800 bg-slate-950/40 text-xs">
                <Scale size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <strong className="text-slate-200 block">Patent Office Form 1 Cross-Declaration</strong>
                  <span className="text-[11px] text-slate-400 block">Disclose biological material geographical origin under Section 10(4)(d)(ii).</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}