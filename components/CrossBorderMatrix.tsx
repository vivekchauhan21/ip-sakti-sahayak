"use client";

import { useLanguage } from "@/lib/useLanguage";

interface CrossBorderMatrixProps {
  category: string;
}

export default function CrossBorderMatrix({ category }: CrossBorderMatrixProps) {
  const { t } = useLanguage();

  const getMatrixData = () => {
    switch (category) {
      case "Phytopharmaceutical Drug":
        return [
          {
            region: "India (CDSCO / AYUSH)",
            classification: "Phytopharmaceutical Drug (Rule 918(E))",
            dataRequirements: "Phase I-IV Clinical trials, HPLC/LC-MS Fingerprinting",
            marketPathway: "Form 44 approval, Central Licensing Authority",
            statusBadge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          },
          {
            region: "USA (USFDA)",
            classification: "Botanical Drug (CDER Guidance)",
            dataRequirements: "IND application, CMC validation, clinical safety/efficacy",
            marketPathway: "NDA (New Drug Application) route",
            statusBadge: "text-blue-400 bg-blue-500/10 border-blue-500/30",
          },
          {
            region: "European Union (EMA)",
            classification: "Herbal Medicinal Product (Well-Established Use)",
            dataRequirements: "10+ years EU clinical documentation, standardized marker batch tests",
            marketPathway: "Marketing Authorisation (MA) dossier",
            statusBadge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          },
        ];
      case "Ayurveda Aahar":
        return [
          {
            region: "India (FSSAI / AYUSH)",
            classification: "Ayurveda Aahar (Reg. 2022)",
            dataRequirements: "Label claims as per Schedule A, no synthetic additives",
            marketPathway: "Direct FSSAI Central License",
            statusBadge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          },
          {
            region: "USA (USFDA)",
            classification: "Dietary Supplement (DSHEA 1994)",
            dataRequirements: "Pre-market NDI (New Dietary Ingredient) notification if novel extract",
            marketPathway: "Self-affirmed GRAS or 75-day NDI notice",
            statusBadge: "text-blue-400 bg-blue-500/10 border-blue-500/30",
          },
          {
            region: "European Union (EMA / EFSA)",
            classification: "Food Supplement / Novel Food",
            dataRequirements: "Novel Food dossier if not consumed in EU before May 1997",
            marketPathway: "EFSA safety opinion & authorization",
            statusBadge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          },
        ];
      default:
        return [
          {
            region: "India (AYUSH)",
            classification: "Classical / P&P Ayurvedic Medicine",
            dataRequirements: "D&C Act Schedule I Granth citation (Rule 158-B proof)",
            marketPathway: "State Licensing Authority (SLA) Mfg License",
            statusBadge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          },
          {
            region: "USA (USFDA)",
            classification: "Dietary Supplement / Cosmetic",
            dataRequirements: "Structure/Function claims only; strictly NO disease/cure claims",
            marketPathway: "FDA Facility Registration & cGMP 21 CFR 111",
            statusBadge: "text-blue-400 bg-blue-500/10 border-blue-500/30",
          },
          {
            region: "European Union (EMA)",
            classification: "Traditional Herbal Medicinal Product (THMPD)",
            dataRequirements: "Proof of 30 years traditional medicinal use (15 years within EU)",
            marketPathway: "Simplified Registration Procedure (Directive 2004/24/EC)",
            statusBadge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          },
        ];
    }
  };

  const rows = getMatrixData();

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {t.export_table_header || "Cross-Border Regulatory Matrix"}
          </span>
          <span className="text-[11px] text-slate-500">
            {t.export_table_sub || "Export readiness & statutory compliance divergence (AYUSH vs USFDA vs EMA)"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">{t.th_jur || "Jurisdiction"}</th>
              <th className="py-2.5 px-3">{t.th_target || "Target Legal Classification"}</th>
              <th className="py-2.5 px-3">{t.th_dossier || "Dossier / Clinical Burden"}</th>
              <th className="py-2.5 px-3">{t.th_filing || "Filing Pathway"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition">
                <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                  {row.region}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded border text-[11px] font-medium inline-block ${row.statusBadge}`}>
                    {row.classification}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-300 leading-relaxed">
                  {row.dataRequirements}
                </td>
                <td className="py-3 px-3 text-slate-400">
                  {row.marketPathway}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}