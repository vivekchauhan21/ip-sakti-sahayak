"use client";

import { useState } from "react";
import FilingRoadmap from "@/components/FilingRoadmap";
import { useLanguage } from "@/lib/useLanguage";

export default function FilingRoadmapPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("Phytopharmaceutical Drug");
  const [isNovel, setIsNovel] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {t.roadmap_title || "Statutory Filing Roadmap & Dossier Sequence"}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {t.roadmap_subtitle || "Chronological IPO filing roadmap and statutory CDSCO/AYUSH documentation checklist."}
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">
              {t.roadmap_target_track || "Target Track:"}
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="Phytopharmaceutical Drug">
                {t.cat_phyto || "Phytopharmaceutical Drug"}
              </option>
              <option value="Classical Ayurvedic Medicine">
                {t.cat_classical || "Classical Ayurvedic Medicine"}
              </option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isNovel}
              onChange={(e) => setIsNovel(e.target.checked)}
              className="rounded text-emerald-500 focus:ring-0"
            />
            <span>{t.roadmap_novel_box || "Novel Formulation Potential (Score > 50)"}</span>
          </label>
        </div>

        <FilingRoadmap category={category} isNovel={isNovel} />
      </div>
    </div>
  );
}