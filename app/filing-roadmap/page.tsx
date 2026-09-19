"use client";

import { useState } from "react";
import FilingRoadmap from "@/components/FilingRoadmap";
import { useLanguage } from "@/lib/useLanguage";
import { Sparkles, Route, Layers } from "lucide-react";

interface RoadmapCategoryOption {
  id: string;
  name: string;
  code: string;
  shortTag: string;
}

const ROADMAP_CATEGORIES: RoadmapCategoryOption[] = [
  {
    id: "phytopharmaceutical",
    name: "Phytopharmaceutical Formulation",
    code: "CDSCO GSR 918(E) / Pharma IND",
    shortTag: "CDSCO GSR 918(E)",
  },
  {
    id: "classical",
    name: "Classical Ayurvedic Medicine",
    code: "1st Schedule Granthas / Rule 158-B",
    shortTag: "1st Schedule Granthas",
  },
  {
    id: "ayurveda_aahar",
    name: "Ayurveda Aahar (Functional Food / Dietary Supplement)",
    code: "FSSAI AYUSH Reg. 2022 / FoSCoS Form B",
    shortTag: "FSSAI AYUSH 2022",
  },
  {
    id: "herbomineral",
    name: "Herbomineral / Rasaushadhi Formulation",
    code: "D&C Rule 158-B(IV) / Shodhana ICP-MS",
    shortTag: "Rule 158-B(IV)",
  },
  {
    id: "proprietary_asu",
    name: "Proprietary ASU Medicine",
    code: "D&C Act Sec 3(h) / Form 25D SLA",
    shortTag: "D&C Act Sec 3(h)",
  },
  {
    id: "cosmeceutical",
    name: "Cosmeceutical / Botanical Topical Formulation",
    code: "Part XVI Rules / BIS IS 4707 / MoCRA",
    shortTag: "Part XVI / MoCRA",
  },
];

export default function FilingRoadmapPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<string>("Phytopharmaceutical Formulation");
  const [isNovel, setIsNovel] = useState(true);

  const getCategoryLabel = (opt: RoadmapCategoryOption) => {
    if (opt.id === "classical") return t.cat_classical || opt.name;
    if (opt.id === "ayurveda_aahar") return t.cat_functional || opt.name;
    if (opt.id === "phytopharmaceutical") return t.cat_phyto || opt.name;
    if (opt.id === "cosmeceutical") return t.cat_cosmetic || opt.name;
    if (opt.id === "herbomineral") return t.cat_herbomineral || opt.name;
    if (opt.id === "proprietary_asu") return t.cat_proprietary || opt.name;
    return opt.name;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-7 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20 flex items-center gap-1">
              <Route size={11} />
              {t.roadmap_tag || "STATUTORY FILING SEQUENCER"}
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              IPO Form 1-2 / CDSCO Form 44 / SBB Form I / FSSAI Form B
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {t.roadmap_title || "Statutory Filing Roadmap & Dossier Sequence"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.roadmap_subtitle ||
              "Chronological IPO filing roadmap and statutory CDSCO/AYUSH documentation checklist."}
          </p>
        </div>

        {/* Novelty Score Threshold Flag */}
        <label className="inline-flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 transition-colors self-start md:self-auto">
          <input
            type="checkbox"
            checked={isNovel}
            onChange={(e) => setIsNovel(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
          />
          <span className="font-medium text-slate-200">
            {t.roadmap_novel_box || "Novel Formulation Potential (Score > 50)"}
          </span>
        </label>
      </div>

      {/* Target Track Options - All 6 Regulatory Categories */}
      <div className="bg-slate-900/40 border border-slate-800/90 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              {t.roadmap_target_track || "Select Target Track (All 6 Regulatory Categories):"}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Layers size={11} />
            6 Statutory Pathways Active
          </span>
        </div>

        {/* 6 Category Pill / Button Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ROADMAP_CATEGORIES.map((track) => {
            const isSelected =
              category === track.name ||
              category === track.id ||
              category.toLowerCase().includes(track.id);

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setCategory(track.name)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40"
                    : "bg-slate-950/60 border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-400 truncate uppercase">
                      {track.shortTag}
                    </span>
                  </div>
                  <strong
                    className={`text-xs block font-semibold truncate leading-tight ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {getCategoryLabel(track)}
                  </strong>
                </div>

                <div className="shrink-0">
                  <span
                    className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}
                  >
                    {isSelected ? "ACTIVE" : "SELECT"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Filing Roadmap & Statutory Actions Component */}
      <FilingRoadmap category={category} isNovel={isNovel} />
    </div>
  );
}