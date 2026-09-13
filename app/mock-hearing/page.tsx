"use client";

import { useEffect, useState } from "react";
import { getActiveFormulation } from "@/lib/formulationStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  Gavel,
  Scale,
  ShieldAlert,
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Waves,
} from "lucide-react";
import MockExaminerModal from "@/components/MockExaminerModal";

const TEST_FORMULATIONS = [
  {
    title: "Phytopharmaceutical Active Fraction",
    query:
      "Standardized Withaferin-A fraction (95% purity) isolated from Withania somnifera with synergistic piperine carrier.",
    objection: "Section 3(p) TKDL + Section 3(e) Admixture Scrutiny",
  },
  {
    title: "Classical Polyherbal Decoction",
    query:
      "Triphala Churna classical extraction (Terminalia chebula, Terminalia bellirica, Phyllanthus emblica) for glycemic regulation.",
    objection: "Direct Section 3(p) Absolute Statutory Bar",
  },
  {
    title: "Herbal Nano-Liposomal Carrier",
    query:
      "Curcumin encapsulated in bio-compatible PLGA nanoparticles for sustained oral bioavailability.",
    objection: "Section 3(d) Enhanced Efficacy & New Form Demonstration",
  },
];

export default function MockHearingPage() {
  const { t } = useLanguage();
  const [formulationQuery, setFormulationQuery] = useState("Classical Triphala Churna formulation");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState("Classical Triphala Churna formulation");
  const [activeCategory, setActiveCategory] = useState("Classical Ayurvedic Medicine");
  const [isTyping, setIsTyping] = useState(false);

  // Sync active formulation from global store on mount & change
  useEffect(() => {
    const sync = () => {
      const active = getActiveFormulation();
      if (active && active.name) {
        setActiveSubject(active.name);
        setActiveCategory(active.category || "Classical Ayurvedic Medicine");
        setFormulationQuery(active.name);
      }
    };
    sync();
    window.addEventListener("formulation_changed", sync);
    return () => window.removeEventListener("formulation_changed", sync);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-rose-400 uppercase mb-1">
            <span className="w-2 h-0.5 bg-rose-400" />
            IPO TRIBUNAL SIMULATOR / SECTION 14
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{t.mock_title || "AI Patent Examiner Simulator"}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {t.mock_chamber_badge || "Mock Hearing Room"}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t.mock_subtitle || "Simulate a formal hearing before the Assistant Controller of Patents (IPO). Test your defense against Section 3(p), Section 3(e), and TKDL citations before substantive examination."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Controller AI Online</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Formulation Input & Test Scenarios */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
              HEARING PREPARATION
            </span>
            <h2 className="text-base font-semibold text-slate-200">
              {t.mock_step1_title || "Draft Specification & Defense Statement"}
            </h2>
          </div>

          {/* Preset Test Claims */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 block">
              1-Click Claim Scenarios
            </span>
            <div className="space-y-2">
              {TEST_FORMULATIONS.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setFormulationQuery(item.query)}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                    formulationQuery === item.query
                      ? "bg-rose-500/5 border-rose-500/40 shadow-sm shadow-rose-950/20"
                      : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-200">{item.title}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      {item.objection}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.query}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Specification Textbox */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              {t.mock_claims_label || "Patent Claims / Technical Description to Defend"}
            </label>
            <textarea
              rows={4}
              value={formulationQuery}
              onChange={(e) => setFormulationQuery(e.target.value)}
              placeholder="Enter active botanical ingredients, extraction method, novel delivery vehicle, or synergy proof..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500 transition resize-none leading-relaxed"
            />
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Waves size={12} className="text-slate-400" />
              <span>Controller evaluates traditional knowledge conflicts and non-obviousness criteria.</span>
            </div>
          </div>

          {/* Launch CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-rose-950/40"
          >
            <Gavel size={16} />
            <span>{t.mock_enter_chamber || "Enter Hearing Chamber (Commence Oral Arguments)"}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Right Column: Hearing Protocol & Statutory Grounding */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 pb-3 border-b border-slate-800">
              <Scale size={16} className="text-rose-400" />
              <span>{t.mock_standards_title || "Statutory Examination Standards"}</span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs">
                <ShieldAlert size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Section 3(p) Defense Burden</strong>
                  <span className="text-slate-400 text-[11px]">
                    Must prove extraction method or isolated molecule is not directly anticipated by classical 1st Schedule texts.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-xs">
                <AlertTriangle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Section 3(e) Synergistic Evidence</strong>
                  <span className="text-slate-400 text-[11px]">
                    Mere aggregation of known properties is barred. Requires Combination Index (CI &lt; 1) data to overcome objection.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-xs">
                <BookOpenCheck size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">TKDL Cross-Verification</strong>
                  <span className="text-slate-400 text-[11px]">
                    The examiner cross-references 250,000+ formulations from Ayurveda, Siddha, and Unani databases.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">BDA 2024 Approval Verification</strong>
                  <span className="text-slate-400 text-[11px]">
                    Must show NBA Form III approval before the patent can proceed to formal grant under Section 6 of BDA.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-3">
            <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-300 block">
                {t.mock_controller_persona || "Controller Persona Configuration"}
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                The AI simulates a strict Indian Patent Office Controller who will issue a First Examination Report (FER) style rejection and expect concrete technical rebuttals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Connection */}
      {isModalOpen && (
        <MockExaminerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formulation={formulationQuery}
        />
      )}
    </div>
  );
}