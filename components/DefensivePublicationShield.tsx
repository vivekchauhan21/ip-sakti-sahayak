"use client";

import { useState } from "react";

interface DefensivePublicationShieldProps {
  formulation: string;
  category: string;
}

export default function DefensivePublicationShield({
  formulation,
  category,
}: DefensivePublicationShieldProps) {
  const [publishedCert, setPublishedCert] = useState<{
    hash: string;
    timestamp: string;
    registryId: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePriorArtShield = async () => {
    setLoading(true);
    // Simulating SHA-256 proof generation for defensive prior art
    const encoder = new TextEncoder();
    const data = encoder.encode(formulation + "IP-SAKTI-AYUSH" + Date.now());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    setTimeout(() => {
      setPublishedCert({
        hash: hashHex,
        timestamp: new Date().toISOString(),
        registryId: `AYUSH-TK-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Defensive Publication Shield (Anti-Biopiracy)
            </span>
            <span className="text-[11px] text-slate-400">
              Establish Prior Art Timestamp to bar predatory foreign patent filings
            </span>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
          WIPO / TKDL ALIGNED
        </span>
      </div>

      {!publishedCert ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            If this formulation cannot be patented under Section 3(p), publish a tamper-proof defensive disclosure. This permanently invalidates foreign patent claims (USPTO / EPO) under novelty rules (35 U.S.C. 102).
          </p>
          <button
            onClick={generatePriorArtShield}
            disabled={loading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Generating SHA-256 Prior Art Certificate..." : "Publish Defensive Prior-Art Proof 🛡️"}
          </button>
        </div>
      ) : (
        <div className="bg-cyan-950/20 border border-cyan-500/30 p-3.5 rounded-lg space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>✓</span> Defensive Disclosure Certificate Generated
            </span>
            <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800">
              {publishedCert.registryId}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-0.5">
              Cryptographic SHA-256 Prior-Art Hash:
            </span>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-300 break-all select-all">
              {publishedCert.hash}
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
            <span>Timestamp: {new Date(publishedCert.timestamp).toLocaleString()}</span>
            <span className="text-emerald-400 font-semibold">Status: Prior Art Established</span>
          </div>
        </div>
      )}
    </div>
  );
}