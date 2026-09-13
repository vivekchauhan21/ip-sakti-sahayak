"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import {
  saveActiveFormulation,
  getActiveFormulation,
} from "@/lib/formulationStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  Globe,
  Globe2,
  Landmark,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import VoiceInputButton from "@/components/VoiceInputButton";
import DossierExportButton from "@/components/DossierExportButton";

const PdfViewerModal = dynamic(() => import("@/components/PdfViewerModal"), {
  ssr: false,
});

// criteriaList and DEMO_PRESETS are now defined inside the component to support translations

export default function Home() {
  const { t, lang, changeLanguage, supportedLanguages } = useLanguage();
  const [jurisdiction, setJurisdiction] = useState<"india" | "international">("india");

  // Criteria list — rebuilt when language changes
  const criteriaList = [
    { id: "classical_ref", title: t.criteria_classical_ref_title || "Classical Texts Reference", desc: t.criteria_classical_ref_desc || "Referenced in 1st Schedule authoritative Ayurvedic texts" },
    { id: "classical_method", title: t.criteria_classical_method_title || "Textual Method", desc: t.criteria_classical_method_desc || "Preparation method follows documented tradition" },
    { id: "modern_excipients", title: t.criteria_modern_excipients_title || "Modern Excipients", desc: t.criteria_modern_excipients_desc || "Contains contemporary non-classical ingredients" },
    { id: "purified_fraction", title: t.criteria_purified_fraction_title || "Purified Botanical Fraction", desc: t.criteria_purified_fraction_desc || "Standardized purified active extract fraction isolated" },
    { id: "ayurveda_aahar", title: t.criteria_ayurveda_aahar_title || "Ayurveda Aahar", desc: t.criteria_ayurveda_aahar_desc || "Intended as functional food or nutraceutical" },
    { id: "cosmetic_use", title: t.criteria_cosmetic_use_title || "Topical Cosmetic", desc: t.criteria_cosmetic_use_desc || "Applied externally for topical skin/hair benefit" },
    { id: "synergistic_efficacy", title: t.criteria_synergistic_efficacy_title || "Synergistic Efficacy data", desc: t.criteria_synergistic_efficacy_desc || "Evidence shows more than additive pharmacological action" },
  ];

  // Demo presets — rebuilt when language changes
  const DEMO_PRESETS = [
    {
      name: t.preset_phyto_name || "Phytopharmaceutical Track",
      badge: t.preset_phyto_badge || "Patentable",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      data: {
        search_query: "Standardized Withaferin-A fraction with Piperine",
        classical_ref: true,
        classical_method: false,
        modern_excipients: true,
        purified_fraction: true,
        ayurveda_aahar: false,
        cosmetic_use: false,
        synergistic_efficacy: true,
      },
    },
    {
      name: t.preset_classical_name || "Classical Churna Formulation",
      badge: t.preset_classical_badge || "Section 3(p) Barred",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      data: {
        search_query: "Classical Triphala Churna formulation",
        classical_ref: true,
        classical_method: true,
        modern_excipients: false,
        purified_fraction: false,
        ayurveda_aahar: false,
        cosmetic_use: false,
        synergistic_efficacy: false,
      },
    },
    {
      name: t.preset_aahar_name || "Ayurveda Aahar Functional Food",
      badge: t.preset_aahar_badge || "FSSAI / AYUSH Track",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      data: {
        search_query: "Amla and Turmeric botanical wellness infusion",
        classical_ref: true,
        classical_method: false,
        modern_excipients: false,
        purified_fraction: false,
        ayurveda_aahar: true,
        cosmetic_use: false,
        synergistic_efficacy: false,
      },
    },
  ];

  const [formData, setFormData] = useState<Record<string, any>>({
    search_query: "Standardized Withaferin-A fraction with Piperine",
    classical_ref: true,
    classical_method: false,
    modern_excipients: true,
    purified_fraction: true,
    ayurveda_aahar: false,
    cosmetic_use: false,
    synergistic_efficacy: true,
  });

  // Deterministic evaluation engine with Dual-Jurisdiction Layer
  const evaluateLocally = (data: Record<string, any>, jur: "india" | "international") => {
    if (jur === "international") {
      if (data.purified_fraction && data.synergistic_efficacy) {
        return {
          category: "Botanical Drug Substance (FDA 505(b)(2) / EMA Track)",
          regulatory_reference: "US FDA Botanical Guidance / EMA HMPC",
          match_confidence: 91,
          patentability_verdict: "PCT Patent Eligible (Art. 33)",
          verdict_badge: "PCT ROUTE ELIGIBLE",
          verdict_color: "emerald",
          verdict_description: "Eligible for WIPO PCT International Phase under IPC Class A61K. Complies with WIPO Treaty on Genetic Resources (GRATK 2024) mandatory disclosure rules.",
          steps: [
            { title: "WIPO PCT International Filing (RO/IN)", desc: "File Form PCT/RO/101 designating US, EPO & ASEAN territories", status: "MANDATORY", color: "rose" },
            { title: "WIPO GRATK Mandatory Origin Disclosure", desc: "Mandatory declaration of Indian genetic resource sourcing", status: "STATUTORY", color: "rose" },
            { title: "Nagoya Protocol ABS Compliance (CBD)", desc: "Obtain Internationally Recognized Certificate of Compliance (IRCC)", status: "REQUIRED", color: "rose" },
            { title: "US FDA IND Botanical Dossier", desc: "Chemistry, Manufacturing, and Controls (CMC) batch fingerprinting", status: "ADVISED", color: "amber" },
          ],
        };
      }

      return {
        category: "Traditional Herbal Medicinal Product (THMPD)",
        regulatory_reference: "EU Directive 2004/24/EC / WHO Traditional Guidelines",
        match_confidence: 86,
        patentability_verdict: "Barred Abroad (EPC Art. 54 Novelty Defect)",
        verdict_badge: "PRIOR-ART BARRED",
        verdict_color: "rose",
        verdict_description: "TKDL bilateral access agreements with USPTO and EPO will trigger automatic novelty objections. Prioritize Defensive Vault publication.",
        steps: [
          { title: "EU Simplified Registration Dossier", desc: "Demonstrate 30 years medicinal use (including 15 years in EU)", status: "MANDATORY", color: "rose" },
          { title: "WIPO Defensive Vault Anchor", desc: "Publish cryptographic prior art to prevent foreign corporate piracy", status: "URGENT", color: "rose" },
          { title: "International ABS Benefit Sharing", desc: "Clear bilateral access permissions under Nagoya clearing-house", status: "REQUIRED", color: "amber" },
          { title: "CITES Flora Export Verification", desc: "Obtain clearance if species is listed under CITES Appendix II", status: "CHECK", color: "blue" },
        ],
      };
    }

    // National (India) Jurisdiction Logic
    if (data.purified_fraction && data.synergistic_efficacy) {
      return {
        category: "Phytopharmaceutical Drug",
        regulatory_reference: "CDSCO Gazette GSR 918(E)",
        match_confidence: 94,
        patentability_verdict: "High Patentability Potential",
        verdict_badge: "PROVISIONALLY ELIGIBLE",
        verdict_color: "emerald",
        verdict_description: "Standardized active fraction with proven synergy overcomes Section 3(p) TKDL and 3(e) admixture barriers.",
        steps: [
          { title: "CDSCO Central Licensing (Form 44)", desc: "Submit IND package and chemistry manufacturing controls", status: "REQUIRED", color: "rose" },
          { title: "Phase I to IV Clinical Trials", desc: "Adhere to New Drugs and Clinical Trials Rules 2019", status: "REQUIRED", color: "rose" },
          { title: "Quality Dossier Fingerprinting", desc: "Mandatory HPLC/HPTLC/LC-MS batch uniformity evidence", status: "REQUIRED", color: "rose" },
          { title: "State Biodiversity Board (SBB) Intimation", desc: "File Form I prior intimation under BDA 2024", status: "ADVISED", color: "amber" },
        ],
      };
    }

    if (data.ayurveda_aahar) {
      return {
        category: "Ayurveda Aahar (Functional Food)",
        regulatory_reference: "FSSAI-AYUSH Reg. 2022",
        match_confidence: 88,
        patentability_verdict: "Patent Barred (FSSAI Route)",
        verdict_badge: "REGULATORY COMPLIANT",
        verdict_color: "blue",
        verdict_description: "Designated as nutritional food supplement. Clear from Section 3(p) as culinary formulation, but non-patentable as medicine.",
        steps: [
          { title: "FSSAI Special AYUSH Licensing", desc: "Mandatory Form B registration under Ayurveda Aahar regulations", status: "REQUIRED", color: "rose" },
          { title: "Heavy Metal & Microbial Testing", desc: "Compliant with Food Safety and Standards permissible limits", status: "REQUIRED", color: "rose" },
          { title: "Labeling & Non-Medical Claims", desc: "Strictly prohibit therapeutic disease claims on packaging", status: "REQUIRED", color: "rose" },
          { title: "SBB Domestic Exemption Verification", desc: "Exempt from commercial ABS levy for declared dietary food", status: "EXEMPT", color: "emerald" },
        ],
      };
    }

    if (data.classical_ref && data.classical_method && !data.purified_fraction) {
      return {
        category: "Classical Ayurvedic Medicine",
        regulatory_reference: "Drugs & Cosmetics Act 1940 (Sec 3a)",
        match_confidence: 96,
        patentability_verdict: "Section 3(p) Absolute Bar",
        verdict_badge: "PATENT BARRED",
        verdict_color: "rose",
        verdict_description: "Exact formulation documented in 1st Schedule authoritative texts. Direct Section 3(p) exclusion; prioritize Defensive Shield publishing.",
        steps: [
          { title: "State Licensing Authority (SLA) Approval", desc: "Apply under Rule 153 for classical Shastriya formulation", status: "REQUIRED", color: "rose" },
          { title: "TKDL Defensive Vault Anchoring", desc: "Generate SHA-256 hash to preempt biopiracy by foreign MNCs", status: "RECOMMENDED", color: "amber" },
          { title: "Pharmacopoeial Standards Testing", desc: "Meet Ayurvedic Pharmacopoeia of India (API) specifications", status: "REQUIRED", color: "rose" },
          { title: "State Biodiversity Board (Form I)", desc: "File prior intimation for raw herbal ingredient sourcing", status: "MANDATORY", color: "rose" },
        ],
      };
    }

    return {
      category: "Proprietary Ayurvedic Medicine",
      regulatory_reference: "Rule 154 - Drugs & Cosmetics Rules",
      match_confidence: 79,
      patentability_verdict: "Conditional (Section 3e Scrutiny)",
      verdict_badge: "EVIDENCE REQUIRED",
      verdict_color: "amber",
      verdict_description: "Polyherbal combination requires Combination Index (CI < 1) assay to refute Section 3(e) mere admixture rejection.",
      steps: [
        { title: "State AYUSH Manufacturing License", desc: "Form 25D submission to State Licensing Authority", status: "REQUIRED", color: "rose" },
        { title: "Pilot Safety & Efficacy Documentation", desc: "Generate published literature evidence or observational clinical data", status: "REQUIRED", color: "rose" },
        { title: "Synergy Bioassay Verification", desc: "Establish biological synergy to survive patent examiner scrutiny", status: "CRITICAL", color: "amber" },
        { title: "SBB Access Clearance", desc: "Complete Form I filing before commercial marketing", status: "REQUIRED", color: "rose" },
      ],
    };
  };

  const [assessment, setAssessment] = useState(() => evaluateLocally(formData, jurisdiction));

  // Sync state with shared store
  useEffect(() => {
    const active = getActiveFormulation();
    if (active && active.name) {
      const restoredData = {
        search_query: active.name,
        classical_ref: active.classicalRef ?? true,
        classical_method: active.category?.includes("Classical"),
        modern_excipients: active.modernCarrier ?? false,
        purified_fraction: active.purifiedFraction ?? false,
        ayurveda_aahar: active.category?.includes("Aahar"),
        cosmetic_use: false,
        synergistic_efficacy: active.synergyData ?? false,
      };
      setFormData(restoredData);
      setJurisdiction(active.jurisdiction || "india");
      setAssessment(evaluateLocally(restoredData, active.jurisdiction || "india"));
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<"3p" | "3e" | "bda" | null>(null);

  const selectedCount = useMemo(() => {
    return criteriaList.filter((c) => formData[c.id]).length;
  }, [formData]);

  const completion = useMemo(() => {
    return Math.round((selectedCount / criteriaList.length) * 100);
  }, [selectedCount]);

  const toggleCriterion = (id: string) => {
    setFormData((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleJurisdictionChange = (jur: "india" | "international") => {
    setJurisdiction(jur);
    setAssessment(evaluateLocally(formData, jur));
  };

  const runEvaluation = async (dataToEvaluate = formData, jur = jurisdiction) => {
    setLoading(true);
    try {
      const res = await fetch("/api/rag-classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formulation: dataToEvaluate.search_query,
          jurisdiction: jur,
          criteria: dataToEvaluate,
        }),
      });

      const ragData = await res.json();
      if (ragData?.success && ragData?.assessment) {
        const localTemplate = evaluateLocally(dataToEvaluate, jur);
        const updatedAssessment = {
          ...localTemplate,
          category: ragData.assessment.category,
          patentability_verdict: ragData.assessment.patentability,
          match_confidence: ragData.assessment.confidence,
        };
        setAssessment(updatedAssessment);

        saveActiveFormulation({
          name: dataToEvaluate.search_query,
          category: ragData.assessment.category,
          jurisdiction: jur,
          purifiedFraction: Boolean(dataToEvaluate.purified_fraction),
          synergyData: Boolean(dataToEvaluate.synergistic_efficacy),
          modernCarrier: Boolean(dataToEvaluate.modern_excipients),
          classicalRef: Boolean(dataToEvaluate.classical_ref),
          patentabilityScore: ragData.assessment.confidence,
        });

        setLoading(false);
        return;
      }
    } catch {
      // Fallback
    }

    const fallback = evaluateLocally(dataToEvaluate, jur);
    setAssessment(fallback);
    saveActiveFormulation({
      name: dataToEvaluate.search_query,
      category: fallback.category,
      jurisdiction: jur,
      purifiedFraction: Boolean(dataToEvaluate.purified_fraction),
      synergyData: Boolean(dataToEvaluate.synergistic_efficacy),
      modernCarrier: Boolean(dataToEvaluate.modern_excipients),
      classicalRef: Boolean(dataToEvaluate.classical_ref),
      patentabilityScore: fallback.match_confidence,
    });
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
            <span className="w-2 h-0.5 bg-emerald-400" />
            {t.workspace || "कार्यक्षेत्र / विधिक मूल्यांकन"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.title || "आयुर्वेदिक नियामक एवं पेटेंट मूल्यांकनकर्ता"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.subtitle || "अपनी निर्माण विधि (फॉर्मूलेशन) को विधिक संहिताओं, धारा 3(p) पारंपरिक ज्ञान अपवादों एवं अनिवार्य पंजीकरणों के आधार पर वर्गीकृत करें।"}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Bhashini Multilingual Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Globe size={14} className="text-emerald-400 shrink-0" />
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value as any)}
              className="bg-slate-950 text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {supportedLanguages.map((item) => (
                <option key={item.code} value={item.code} className="bg-slate-900 text-slate-100">
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Jurisdiction Toggle */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleJurisdictionChange("india")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                jurisdiction === "india"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Landmark size={14} />
              <span>{t.national || "राष्ट्रीय (भारत / IPO)"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleJurisdictionChange("international")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                jurisdiction === "international"
                  ? "bg-blue-500 text-white shadow-md font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe2 size={14} />
              <span>{t.international || "अंतर्राष्ट्रीय (WIPO / PCT)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step 01: Formulation Profile */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block">STEP 01 / INPUT</span>
              <h2 className="text-sm font-semibold text-slate-200">
                {t.step1_title || "फॉर्मूलेशन रूपरेखा (इनपुट)"}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-emerald-400">{completion}% {t.complete || "complete"}</span>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-1.5 pb-2 border-b border-slate-800/60">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              {t.demo_scenarios || "परीक्षण परिदृश्य (1-क्लिक डेमो)"}
            </label>
            <div className="flex flex-wrap gap-2">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setFormData(preset.data);
                    runEvaluation(preset.data, jurisdiction);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs flex items-center gap-2 transition cursor-pointer group"
                >
                  <span className="text-slate-300 group-hover:text-white font-medium text-[11px]">
                    {preset.name}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${preset.badgeColor}`}>
                    {preset.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">
                {t.keywords_label || "वानस्पतिक घटक / द्रव्य"}
              </label>
              <VoiceInputButton
                onTranscript={(text) =>
                  setFormData((prev) => ({ ...prev, search_query: text }))
                }
              />
            </div>
            <div className="relative">
              <input
                id="keywords"
                type="text"
                value={formData.search_query}
                onChange={(e) => setFormData((prev) => ({ ...prev, search_query: e.target.value }))}
                placeholder="e.g. Ashwagandha, Brahmi, Shatavari..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
              <Waves size={12} className="text-slate-400" />
              <span>{t.keywords_hint || "वानस्पतिक मिलान हेतु अल्पविराम (कॉमा) का उपयोग करें"}</span>
            </div>
          </div>

          {/* Criteria Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">{t.statutory_criteria || "वैधानिक मूल्यांकन मानदंड"}</span>
              <span className="font-mono text-[11px]">{selectedCount} / {criteriaList.length} {t.selected || "selected"}</span>
            </div>

            <div className="space-y-2">
              {criteriaList.map(({ id, title, desc }) => {
                const checked = Boolean(formData[id]);
                return (
                  <label
                    key={id}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer ${
                      checked
                        ? "bg-slate-950/60 border-emerald-500/40 shadow-sm shadow-emerald-950/20"
                        : "bg-slate-950/20 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCriterion(id)}
                      className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <div className="space-y-0.5">
                      <span className={`text-xs font-semibold block ${checked ? "text-slate-100" : "text-slate-300"}`}>
                        {title}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-normal block">
                        {desc}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Run Assessment Button */}
          <button
            onClick={() => runEvaluation(formData, jurisdiction)}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg disabled:opacity-50 ${
              jurisdiction === "india"
                ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/40"
                : "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-950/40"
            }`}
          >
            <Sparkles size={15} />
            <span>
              {loading
                ? (t.evaluating || "मूल्यांकन जारी है...")
                : (jurisdiction === "india"
                    ? (t.evaluate_btn_nat || "वैधानिक मूल्यांकन प्रारंभ करें")
                    : (t.evaluate_btn_int || "अंतर्राष्ट्रीय पेटेंट योग्यता जांचें"))}
            </span>
            <ArrowUpRight size={14} />
          </button>
        </section>

        {/* Step 02: Findings Panel */}
        <section className="lg:col-span-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block">STEP 02 / FINDINGS</span>
              <h2 className="text-sm font-semibold text-slate-200">
                {jurisdiction === "india" ? (t.step2_title_nat || "राष्ट्रीय विधिक मूल्यांकन परिणाम") : (t.step2_title_int || "अंतर्राष्ट्रीय अनुपालन परिणाम")}
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400">
              {jurisdiction === "india" ? "JUR: IN-IPO" : "JUR: INT-WIPO"}
            </span>
          </div>

          {/* Category Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
            jurisdiction === "india" ? "border-emerald-500/20 bg-emerald-500/5" : "border-blue-500/20 bg-blue-500/5"
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                jurisdiction === "india"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
              }`}>
                {jurisdiction === "india" ? <Leaf size={18} /> : <Globe size={18} />}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">
                  {t.rec_class || "अनुशंसित विधिक वर्गीकरण"}
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {assessment.category?.includes("Classical")
                    ? (t.cat_classical || assessment.category)
                    : assessment.category?.includes("Aahar")
                    ? (t.cat_functional || assessment.category)
                    : assessment.category?.includes("Phyto")
                    ? (t.cat_phyto || assessment.category)
                    : assessment.category}
                </h3>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {jurisdiction === "india" ? "CDSCO / AYUSH" : "WIPO / GRATK 2024"}
                  </span>
                  <span className={`text-[10px] font-medium ${jurisdiction === "india" ? "text-emerald-400" : "text-blue-400"}`}>
                    {assessment.regulatory_reference}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-lg font-bold block font-mono ${jurisdiction === "india" ? "text-emerald-400" : "text-blue-400"}`}>
                {assessment.match_confidence}%
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                {t.match_confidence || "सटीकता स्कोर"}
              </span>
            </div>
          </div>

          {/* Patentability Verdict Box */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">
                {t.patent_verdict || "पेटेंट पात्रता एवं निर्णय"}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    assessment.verdict_color === "rose"
                      ? "bg-rose-400"
                      : assessment.verdict_color === "blue"
                      ? "bg-blue-400"
                      : "bg-emerald-400 animate-pulse"
                  }`}
                />
                <h4 className="text-sm font-bold text-white">
                  {(assessment as any).patentability_verdict?.includes("3(p)") || (assessment as any).patentability_verdict?.includes("Barred")
                    ? (t.verdict_3p || (assessment as any).patentability_verdict)
                    : (assessment as any).patentability_verdict}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {(assessment as any).patentability_verdict?.includes("3(p)") && t.verdict_3p_desc
                  ? t.verdict_3p_desc
                  : assessment.verdict_description}
              </p>
            </div>
            <span
              className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 border ${
                assessment.verdict_color === "rose"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : assessment.verdict_color === "blue"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}
            >
              <BadgeCheck size={13} />
              <span>{assessment.verdict_badge}</span>
            </span>
          </div>

          {/* Compliance Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                {t.statutory_checklist || "अनिवार्य विधिक अनुपालन सूची"}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                {assessment.steps.length} {t.requirements || "अनिवार्य शर्तें"}
              </span>
            </div>
            <ul className="space-y-2">
              {assessment.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    jurisdiction === "india" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                  }`}>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <strong className="text-xs text-slate-200 block">{step.title}</strong>
                    <span className="text-[11px] text-slate-500 block">{step.desc}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                      step.color === "rose"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : step.color === "amber"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {step.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Citations Split View triggers */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">{t.statutory_sources || "Statutory & Treaty sources"}</span>
              <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                <span>{t.inspect_authority || "Inspect authority"}</span>
                <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedCitation("3p")}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 text-slate-300 text-xs flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <BookOpenCheck size={13} className="text-amber-400" />
                  <span className="text-[11px]">{jurisdiction === "india" ? "Sec. 3(p) TK" : "WIPO GRATK"}</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-500 group-hover:text-amber-400" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedCitation("3e")}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-slate-300 text-xs flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Scale size={13} className="text-blue-400" />
                  <span className="text-[11px]">{jurisdiction === "india" ? "Sec. 3(e) Admix" : "PCT Rule 34"}</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-500 group-hover:text-blue-400" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedCitation("bda")}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 text-xs flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Leaf size={13} className="text-emerald-400" />
                  <span className="text-[11px]">{jurisdiction === "india" ? "BDA 2024 SBB" : "Nagoya ABS"}</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-500 group-hover:text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Authoritative Corpus Links */}
          <div className="pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {t.authoritative_corpus || "Authoritative Legal Corpus (Verified Public Registries)"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="https://www.tkdl.res.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 flex items-center justify-between transition group"
              >
                <span className="truncate">CSIR-TKDL</span>
                <ArrowUpRight size={11} className="text-slate-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://www.indiacode.nic.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-[11px] text-slate-300 flex items-center justify-between transition group"
              >
                <span className="truncate">India Code</span>
                <ArrowUpRight size={11} className="text-slate-500 group-hover:text-blue-400" />
              </a>
              <a
                href="https://ipindia.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 flex items-center justify-between transition group"
              >
                <span className="truncate">IP India</span>
                <ArrowUpRight size={11} className="text-slate-500 group-hover:text-amber-400" />
              </a>
              <a
                href="https://nbaindia.org"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 flex items-center justify-between transition group"
              >
                <span className="truncate">NBA India</span>
                <ArrowUpRight size={11} className="text-slate-500 group-hover:text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Dossier Download Action */}
          <DossierExportButton
            data={{
              formulation: formData.search_query || "Ayurvedic Herbal Compound",
              category: assessment.category,
              patentRoute: assessment.patentability_verdict,
              patentability: assessment.patentability_verdict,
              noveltyScore: assessment.match_confidence,
              statutoryBars: [
                jurisdiction === "india" ? "Section 3(p) Traditional Knowledge review" : "WIPO GRATK Origin Disclosure obligation",
                jurisdiction === "india" ? "Section 3(e) Synergy index data required" : "PCT Rule 34 Prior-Art Search against TKDL",
              ],
              mandatorySteps: assessment.steps.map((s) => `${s.title} (${s.status})`),
            }}
          />
        </section>
      </div>

      {/* Footer Disclaimer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-8 border-t border-slate-800/80">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-500" />
          {t.disclaimer || "Authoritative legal assistant: Provides statutory information, not formal legal advice."}
        </span>
        <span className="font-mono text-[11px]">Corpus: Patents Act 2024 / BDA 2024 / WIPO GRATK</span>
      </footer>

      {/* Inspection Modal */}
      {selectedCitation && (
        <PdfViewerModal
          isOpen={!!selectedCitation}
          onClose={() => setSelectedCitation(null)}
          citationType={selectedCitation}
        />
      )}
    </div>
  );
}