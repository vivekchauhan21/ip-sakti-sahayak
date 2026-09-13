"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/useLanguage";

interface FilingRoadmapProps {
  category: string;
  isNovel: boolean;
}

export default function FilingRoadmap({ category, isNovel }: FilingRoadmapProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"roadmap" | "forms">("roadmap");

  const steps = isNovel
    ? [
        {
          stage: `${t.roadmap_stage || "Stage"} 1`,
          title: t.novel_s1_title || "Prior Art & TKDL Deconfliction",
          authority: t.novel_s1_auth || "Indian Patent Office (IPO)",
          desc: t.novel_s1_desc || "Conduct detailed FTO search and draft claims excluding classical Grantha compositions.",
          badge: t.novel_s1_badge || "Mandatory",
        },
        {
          stage: `${t.roadmap_stage || "Stage"} 2`,
          title: t.novel_s2_title || "Provisional / Complete Specification Filing",
          authority: t.novel_s2_auth || "IPO (Form 1 + Form 2)",
          desc: t.novel_s2_desc || "File Form 1 along with Form 2 complete specification highlighting novel extraction process.",
          badge: t.novel_s2_badge || "Statutory",
        },
        {
          stage: `${t.roadmap_stage || "Stage"} 3`,
          title: t.novel_s3_title || "Biological Diversity Clearance",
          authority: t.novel_s3_auth || "State Biodiversity Board (SBB) / NBA",
          desc: t.novel_s3_desc || "Submit Form I prior intimation under BDA 2024 before commercial utilization.",
          badge: t.novel_s3_badge || "Regulatory",
        },
        {
          stage: `${t.roadmap_stage || "Stage"} 4`,
          title: t.novel_s4_title || "CDSCO Central Licensing (Form 44)",
          authority: t.novel_s4_auth || "DCGI / CDSCO",
          desc: t.novel_s4_desc || "Submit IND package, batch fingerprinting dossier, and clinical evaluation protocols.",
          badge: t.novel_s4_badge || "Pharma Only",
        },
      ]
    : [
        {
          stage: `${t.roadmap_stage || "Stage"} 1`,
          title: t.classical_s1_title || "Classical Text Authentication",
          authority: t.classical_s1_auth || "State AYUSH Licensing Authority",
          desc: t.classical_s1_desc || "Verify textual Grantha reference under First Schedule of Drugs & Cosmetics Act, 1940.",
          badge: t.classical_s1_badge || "Ayurveda P&P",
        },
        {
          stage: `${t.roadmap_stage || "Stage"} 2`,
          title: t.classical_s2_title || "SBB Prior Intimation (Rule 14)",
          authority: t.classical_s2_auth || "State Biodiversity Board",
          desc: t.classical_s2_desc || "Intimate local SBB prior to sourcing commercial quantities of biological resources.",
          badge: t.classical_s2_badge || "BDA 2024",
        },
        {
          stage: `${t.roadmap_stage || "Stage"} 3`,
          title: t.classical_s3_title || "Ayush Manufacturing License (Form 24D / 25D)",
          authority: t.classical_s3_auth || "State Drug Controller",
          desc: t.classical_s3_desc || "Obtain manufacturing license following Schedule T (GMP) compliance.",
          badge: t.classical_s3_badge || "Licensing",
        },
      ];

  const forms = [
    {
      name: t.form1_name || "Patent Form 1",
      title: t.form1_title || "Application for Grant of Patent",
      authority: t.form1_auth || "Indian Patent Office",
      fileType: t.form1_type || "PDF Template",
    },
    {
      name: t.form2_name || "Patent Form 2",
      title: t.form2_title || "Provisional / Complete Specification",
      authority: t.form2_auth || "Indian Patent Office",
      fileType: t.form2_type || "DOCX Draft",
    },
    {
      name: t.form_nba_name || "NBA Form I / SBB Form",
      title: t.form_nba_title || "Access to Biological Resources / Prior Intimation",
      authority: t.form_nba_auth || "National / State Biodiversity Board",
      fileType: t.form_nba_type || "Govt Form",
    },
    {
      name: t.form44_name || "Form 44 (CDSCO)",
      title: t.form44_title || "Application for New Drug / Phytopharmaceutical Drug",
      authority: t.form44_auth || "CDSCO Central Authority",
      fileType: t.form44_type || "Statutory Form",
    },
  ];

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
            {t.roadmap_component_title || "Statutory Filing Roadmap & Dossier Generator"}
          </span>
          <span className="text-[11px] text-slate-400">
            {t.roadmap_component_subtitle || "End-to-end regulatory approvals sequence for"} {category}
          </span>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "roadmap"
                ? "bg-indigo-600 text-white font-medium"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.roadmap_title || "Filing Sequence"}
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "forms"
                ? "bg-indigo-600 text-white font-medium"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.roadmap_novel_box ? t.roadmap_novel_box.replace(" (Score > 50)", "") : "Form Templates"}
          </button>
        </div>
      </div>

      {activeTab === "roadmap" ? (
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80"
            >
              <div className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                {step.stage}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white truncate">{step.title}</h4>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {step.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                <span className="text-[10px] text-slate-500 font-mono block mt-1">
                  {t.roadmap_authority_label || "Authority:"} {step.authority}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {forms.map((form, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-white block">{form.name}</span>
                <span className="text-[10px] text-slate-400 truncate max-w-45">
                  {form.title}
                </span>
                <span className="text-[9px] text-slate-500 font-mono">{form.authority}</span>
              </div>
              <button
                onClick={() =>
                  alert(`Downloading statutory structure for ${form.name}...`)
                }
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 transition whitespace-nowrap"
              >
                {t.download_btn || "Download ↓"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}