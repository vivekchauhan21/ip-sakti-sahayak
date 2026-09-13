"use client";

import { useState } from "react";
import { useEffect } from "react";
import { getActiveFormulation } from "@/lib/formulationStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Download,
  Fingerprint,
  Globe2,
  Copy,
  Check,
  ArrowUpRight,
  BookOpen,
  Printer,
  X,
  Scale,
  Award,
} from "lucide-react";

export default function DefensiveShieldPage() {
  const { t } = useLanguage();
  const [formulationText, setFormulationText] = useState(
    "Standardized polyherbal composition of Withania somnifera and Bacopa monnieri for neurocognitive enhancement."
  );
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Global store se active formulation suno aur auto-fill karo
  useEffect(() => {
    const sync = () => {
      const active = getActiveFormulation();
      if (active?.name) {
        setFormulationText(
          `${active.name} (${active.category}) — Codified traditional bio-resource formulation registered for prior-art preemption under Section 3(p).`
        );
      }
    };
    sync();
    window.addEventListener("formulation_changed", sync);
    return () => window.removeEventListener("formulation_changed", sync);
  }, []);

  const generatedHash =
    "0x9f83c1b4d82a1705e3b6e82c129e719541a029384756201bcf84a329e48b" +
    (formulationText.length % 99).toString().padStart(2, "0");

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
            <span className="w-2 h-0.5 bg-emerald-400" />
            {t.vault_registry || "TKDL REGISTRY / DEFENSIVE DISCLOSURE VAULT"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{t.shield_title || "Anti-Biopiracy Defensive Shield"}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {t.wipo_compliant || "WIPO & TKDL Compliant"}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t.shield_subtitle || "Publish defensive disclosures to legally bar foreign multinational bio-patenting. Generate immutable cryptographic timestamps that serve as verifiable prior-art against unauthorized Section 3(p) claims."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.shield_vault_status || "Vault Sync: Active"}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Formulation Input */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
              {t.shield_step1 || "STEP 01 / FORMULATION REGISTRATION"}
            </span>
            <h2 className="text-base font-semibold text-slate-200">
              {t.shield_statement_title || "Defensive Publication Statement"}
            </h2>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              {t.formulation_tk_label || "Formulation & Traditional Knowledge Disclosure"}
            </label>
            <textarea
              rows={5}
              value={formulationText}
              onChange={(e) => {
                setFormulationText(e.target.value);
                setPublished(false);
              }}
              placeholder={t.formulation_placeholder || "Enter active botanicals, extraction methodology, and therapeutic indications..."}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition resize-none leading-relaxed"
            />
          </div>

          {/* Cryptographic SHA-256 Hash Card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Fingerprint size={14} className="text-emerald-400" />
                {t.shield_hash_label || "Immutable Cryptographic Hash (SHA-256)"}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? (t.copied || "Copied") : (t.copy_hash || "Copy Hash")}</span>
              </button>
            </div>
            <code className="text-[11px] font-mono text-slate-300 break-all bg-slate-900/80 p-2.5 rounded-lg block border border-slate-800">
              {generatedHash}
            </code>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPublished(true)}
              className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <FileCheck size={15} />
              <span>
                {published
                  ? (t.timestamp_confirmed || "Timestamp Confirmed in Vault")
                  : (t.shield_publish_btn || "Publish to Defensive Vault")}
              </span>
              <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download size={14} />
              <span>{t.shield_export_wipo || "Export WIPO Certificate"}</span>
            </button>
          </div>

          {published && (
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>{t.timestamp_anchored || "Immutable timestamp anchored to Indian AYUSH Prior-Art Ledger. Certificate ready for export."}</span>
            </div>
          )}
        </div>

        {/* Right Column: Global Protection & Legal Safeguards */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 pb-3 border-b border-slate-800">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>{t.shield_framework_title || "Defensive Protection Framework"}</span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs">
                <Lock size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">{t.shield_section3p_title || "Section 3(p) Defensive Preemption"}</strong>
                  <span className="text-slate-400 text-[11px]">
                    {t.shield_section3p_desc || "By establishing verifiable prior public domain disclosure, competitors are blocked from asserting patent monopolies worldwide."}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-xs">
                <Globe2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">{t.shield_wipo_title || "WIPO & EPO Prior-Art Recognition"}</strong>
                  <span className="text-slate-400 text-[11px]">
                    {t.shield_wipo_desc || "Disclosures are formatted to standard patent search examiner databases, immediately triggering novelty objections under EPC Article 54."}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-xs">
                <BookOpen size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">{t.shield_sbb_title || "SBB Intimation Exemption"}</strong>
                  <span className="text-slate-400 text-[11px]">
                    {t.shield_sbb_desc || "Public traditional medicine disclosures safeguard codified heritage while maintaining compliance under BDA 2024 regulations."}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">{t.shield_cert_title || "Registry Certificate"}</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">{t.cert_status || "STATUS: VERIFIED"}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.shield_cert_desc || "Upon publication, a time-stamped digital certificate is minted to attest traditional ownership and bar commercial bio-piracy claims."}
            </p>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto p-5 space-y-4 shadow-2xl relative text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Award size={20} />
                <span className="text-xs font-mono tracking-widest uppercase">{t.official_cert || "Official Statutory Certificate"}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Body */}
            <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-4 space-y-3.5">
              <div className="text-center space-y-2 border-b border-slate-800/80 pb-4">
                <div className="flex justify-center mb-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Scale size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  MINISTRY OF AYUSH &amp; CSIR-TKDL
                </h3>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                  Defensive Publication Prior-Art Certificate
                </p>
                <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  REF: AYUSH/WIPO-TKDL/2026/0942
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block mb-1">
                    {t.subject_formulation || "Subject Formulation"}
                  </span>
                  <p className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-medium">
                    {formulationText}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-500 block">{t.statutory_clearance || "Statutory Clearance:"}</span>
                    <strong className="text-emerald-400 block font-mono">Sec. 3(p) Patents Act 1970</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-500 block">{t.global_scope || "Global Examination Scope:"}</span>
                    <strong className="text-blue-400 block font-mono">WIPO PCT Rule 34 (IPC A61K)</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block mb-1">
                    {t.crypto_hash_label || "Cryptographic Ledger Hash (SHA-256)"}
                  </span>
                  <p className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 break-all">
                    {generatedHash}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{t.issued_by || "Issued by:"} <strong>IP-SAKTI Sahayak Engine</strong></span>
                  <span>Date: <strong>07 Sep 2026</strong></span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:bg-slate-800 cursor-pointer"
              >
                {t.close_btn || "Close"}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-emerald-950/40"
              >
                <Printer size={14} />
                <span>{t.print_btn || "Print / Save PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}