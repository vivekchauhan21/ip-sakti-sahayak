"use client";

interface NoveltyGaugeProps {
  score: number;
  zone: "HIGH_RISK" | "CONDITIONAL" | "NOVEL";
  reasoning: string;
}

export default function NoveltyGauge({ score, zone, reasoning }: NoveltyGaugeProps) {
  const getBadgeDetails = () => {
    if (score < 40) {
      return {
        label: "High TKDL Risk (Section 3(p) Bar)",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        barColor: "bg-rose-500",
      };
    }
    if (score <= 70) {
      return {
        label: "Conditional Novelty (Section 3(e) Synergistic Burden)",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        barColor: "bg-amber-500",
      };
    }
    return {
      label: "Novel Extraction / Formulation (Patentable Potential)",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      barColor: "bg-emerald-500",
    };
  };

  const badge = getBadgeDetails();

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            TKDL vs Novelty Index
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <div className="text-xl font-extrabold text-white">
          {score}% <span className="text-xs text-slate-400 font-normal">Novelty</span>
        </div>
      </div>

      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
        <div
          style={{ width: `${Math.min(score, 100)}%` }}
          className={`h-full ${badge.barColor} transition-all duration-700 ease-out`}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-0.5">
        <span>0% (Classical TK)</span>
        <span>40% (Admixture)</span>
        <span>70% (Synergistic)</span>
        <span>100% (Pure Novel)</span>
      </div>

      <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
        <span className="font-semibold text-slate-200">Statutory Analysis: </span>
        {reasoning}
      </p>
    </div>
  );
}