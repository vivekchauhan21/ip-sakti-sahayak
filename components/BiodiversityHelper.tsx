"use client";

import { useState } from "react";

interface BiodiversityHelperProps {
  herbsInput: string;
}

export default function BiodiversityHelper({ herbsInput }: BiodiversityHelperProps) {
  const [isForeignEntity, setIsForeignEntity] = useState(false);
  const [commercialScale, setCommercialScale] = useState(true);

  // Simple parser to identify botanical biological resources
  const hasBioResource = herbsInput.trim().length > 0;

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🌿</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Auto-ABS &amp; Biodiversity Clearance Helper
            </span>
            <span className="text-[11px] text-slate-400">
              Biological Diversity Rules, 2024 Statutory Verification
            </span>
          </div>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
          BDA 2024 COMPLIANT
        </span>
      </div>

      {/* Entity Type Selector */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <label
          onClick={() => setIsForeignEntity(false)}
          className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center gap-2 ${
            !isForeignEntity
              ? "bg-emerald-500/10 border-emerald-500/40 text-white"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          <input
            type="radio"
            name="entity"
            checked={!isForeignEntity}
            onChange={() => setIsForeignEntity(false)}
            className="accent-emerald-500"
          />
          <span>Indian Entity (Individual / LLP / Co)</span>
        </label>

        <label
          onClick={() => setIsForeignEntity(true)}
          className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center gap-2 ${
            isForeignEntity
              ? "bg-amber-500/10 border-amber-500/40 text-white"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          <input
            type="radio"
            name="entity"
            checked={isForeignEntity}
            onChange={() => setIsForeignEntity(true)}
            className="accent-amber-500"
          />
          <span>Foreign Entity / NRI Shareholding (&gt;0%)</span>
        </label>
      </div>

      {/* Statutory Guidance Output */}
      {hasBioResource ? (
        <div className="space-y-2 text-xs">
          {!isForeignEntity ? (
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1">
                <span>✓ Section 7 Exemption with Prior SBB Intimation</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                Indian entities do not require NBA prior approval for domestic utilization, but must file <strong>Form I prior intimation</strong> to the respective State Biodiversity Board (SBB) before commercial production.
              </p>
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-4">
                <span>Mandatory: SBB Form 1 Filing</span>
                <span>Benefit Sharing: Exempted for AYUSH registered practitioners</span>
              </div>
            </div>
          ) : (
            <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
                <span>⚠️ Section 3 &amp; Section 6 Prior Approval Mandatory</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                Under Section 3 and 6 of BDA, foreign individuals or companies with any foreign shareholding must obtain mandatory <strong>NBA Approval (Form 1 / Form 3)</strong> before accessing Indian biological resources or filing an Indian patent.
              </p>
              <div className="text-[10px] text-amber-400 font-mono">
                Mandatory: NBA Form 1 (Access) + NBA Form 3 (IPR Application)
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs text-slate-500 italic p-3 bg-slate-900/40 rounded-lg">
          No Indian biological resources specified in input.
        </div>
      )}
    </div>
  );
}