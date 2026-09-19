"use client";

import { useLanguage } from "@/lib/useLanguage";
import { getCBMTrack, CBMJurisdictionRow } from "@/data/cbmData";
import { ShieldCheck, AlertTriangle, Scale, FileText, Globe } from "lucide-react";

interface CrossBorderMatrixProps {
  category: string;
}

export default function CrossBorderMatrix({ category }: CrossBorderMatrixProps) {
  const { lang, t } = useLanguage();
  const track = getCBMTrack(category, lang);

  const getRegionIcon = (regionCode: string) => {
    switch (regionCode) {
      case "india":
        return "🇮🇳";
      case "usa":
        return "🇺🇸";
      case "europe":
        return "🇪🇺";
      default:
        return "🌐";
    }
  };

  const getBadgeStyle = (badgeType: string) => {
    switch (badgeType) {
      case "emerald":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "blue":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "amber":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "rose":
        return "text-rose-400 bg-rose-500/10 border-rose-500/30";
      default:
        return "text-slate-300 bg-slate-800/50 border-slate-700/50";
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Section */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Table Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/40">
          <div>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t.export_table_header || "CROSS-BORDER REGULATORY MATRIX"}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {t.export_table_sub || "Export readiness & statutory compliance divergence (AYUSH vs USFDA vs EMA)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 font-mono">
              {track.shortTag}
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-[22%] min-w-[190px]">
                  <div className="flex items-center gap-1.5">
                    <Scale size={12} className="text-slate-400" />
                    <span>{t.th_jur || "JURISDICTION"}</span>
                  </div>
                </th>
                <th className="py-3 px-4 w-[26%] min-w-[210px]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-slate-400" />
                    <span>{t.th_target || "TARGET LEGAL CLASSIFICATION"}</span>
                  </div>
                </th>
                <th className="py-3 px-4 w-[28%] min-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <FileText size={12} className="text-slate-400" />
                    <span>{t.th_dossier || "DOSSIER / CLINICAL BURDEN"}</span>
                  </div>
                </th>
                <th className="py-3 px-4 w-[24%] min-w-[200px]">
                  <span>{t.th_filing || "FILING PATHWAY"}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {track.rows.map((row: CBMJurisdictionRow, idx: number) => (
                <tr key={idx} className="hover:bg-slate-900/30 transition">
                  {/* Jurisdiction Column */}
                  <td className="py-3.5 px-4 align-top break-words">
                    <div className="flex items-start gap-2">
                      <span className="text-base select-none mt-0.5">{getRegionIcon(row.regionCode)}</span>
                      <div>
                        <strong className="text-slate-200 block font-semibold leading-tight">
                          {row.region}
                        </strong>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                          {row.authority}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Classification Column */}
                  <td className="py-3.5 px-4 align-top space-y-1.5 break-words">
                    <span className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold block w-fit ${getBadgeStyle(row.badgeType)}`}>
                      {row.statusBadge}
                    </span>
                    <span className="text-xs text-slate-200 block font-medium leading-snug whitespace-normal">
                      {row.classification}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Ref: {row.statutoryCode}
                    </span>
                  </td>

                  {/* Dossier / Clinical Burden Column */}
                  <td className="py-3.5 px-4 align-top text-slate-300 leading-relaxed text-[11px] break-words">
                    <p className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 whitespace-normal">
                      {row.dataRequirements}
                    </p>
                  </td>

                  {/* Filing Pathway Column */}
                  <td className="py-3.5 px-4 align-top text-slate-300 text-[11px] leading-relaxed break-words">
                    <div className="bg-slate-900/20 p-2.5 rounded-lg border border-slate-800/40">
                      <span className="text-slate-200 block font-medium whitespace-normal">
                        {row.marketPathway}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottleneck Callout Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800/70 flex items-start gap-2.5 text-xs">
          <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-400 leading-relaxed break-words">
            <strong className="text-amber-300 font-medium mr-1.5">
              {t.export_bottleneck_warning || "Statutory Bottleneck & Warning:"}
            </strong>
            <span className="text-slate-300">{track.keyBottleneck}</span>
          </div>
        </div>
      </div>
    </div>
  );
}