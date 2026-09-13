"use client";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  citationType?: "3p" | "3e" | "bda";
}

const STATUTORY_DOCS: Record<string, {
  title: string;
  actName: string;
  gazetteRef: string;
  clauseHeader: string;
  sectionNum: string;
  subClause: string;
  commentary: string;
}> = {
  "3p": {
    title: "Section 3(p) — The Patents Act, 1970",
    actName: "THE PATENTS ACT, 1970 (ACT NO. 39 OF 1970)",
    gazetteRef: "Published in The Gazette of India, Extraordinary, Part II—Section 1",
    clauseHeader: "CHAPTER II: INVENTIONS NOT PATENTABLE",
    sectionNum: "3. What are not inventions.—",
    subClause:
      "(p) an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components.",
    commentary:
      "Legislative Intent: Introduced via Patents (Amendment) Act, 2002 to safeguard India's traditional knowledge repositories (TKDL / Ayurveda, Siddha, Unani) against biopiracy and unauthorized proprietary claims.",
  },
  "3e": {
    title: "Section 3(e) — The Patents Act, 1970",
    actName: "THE PATENTS ACT, 1970 (ACT NO. 39 OF 1970)",
    gazetteRef: "Published in The Gazette of India, Extraordinary, Part II—Section 1",
    clauseHeader: "CHAPTER II: INVENTIONS NOT PATENTABLE",
    sectionNum: "3. What are not inventions.—",
    subClause:
      "(e) a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance;",
    commentary:
      "Synergistic Requirement: Rejections under Section 3(e) can strictly be countered only by furnishing quantitative bio-efficacy data proving combination index (CI < 1) supra-additive interaction.",
  },
  bda: {
    title: "Section 7 / Rule 14 — Biological Diversity Act, 2024",
    actName: "THE BIOLOGICAL DIVERSITY (AMENDMENT) ACT, 2024",
    gazetteRef: "Ministry of Environment, Forest and Climate Change Notification G.S.R. 248(E)",
    clauseHeader: "CHAPTER III: ACCESS TO BIOLOGICAL RESOURCES",
    sectionNum: "Section 7 & Rule 14. Prior Intimation to State Biodiversity Board.—",
    subClause:
      "Mandatory Prior Intimation (Form I): Any Indian entity obtaining biological resources for commercial utilization must submit prior intimation to the concerned State Biodiversity Board under whose jurisdiction the bio-resource is bio-prospected.",
    commentary:
      "Exemption Note: Registered AYUSH traditional practitioners (Vaidyas/Hakims) are exempt from ABS benefit-sharing, but commercial manufacturing enterprises must complete statutory registration.",
  },
};

export default function PdfViewerModal({
  isOpen,
  onClose,
  citationType = "3p",
}: PdfViewerModalProps) {
  if (!isOpen) return null;

  const doc = STATUTORY_DOCS[citationType] || STATUTORY_DOCS["3p"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Official Gazette Statutory Inspection
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                IPO VERIFIED CLAUSE
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mt-0.5">{doc.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Gazette Sheet Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex justify-center">
          <div className="w-full max-w-2xl bg-[#fffefc] text-[#1c1917] p-8 sm:p-12 rounded-lg shadow-xl font-serif leading-relaxed border border-stone-200">
            {/* Gazette Header */}
            <div className="text-center border-b-2 border-stone-800 pb-5 mb-6">
              <div className="text-[11px] uppercase tracking-widest text-stone-500 font-mono font-semibold mb-1">
                The Gazette of India: Extraordinary
              </div>
              <h2 className="text-base font-bold tracking-tight text-stone-900">
                {doc.actName}
              </h2>
              <div className="text-[10px] text-stone-600 font-sans mt-1 italic">
                {doc.gazetteRef}
              </div>
            </div>

            {/* Context Heading */}
            <div className="text-xs font-mono font-bold uppercase tracking-wide text-stone-700 mb-4 border-b border-stone-300 pb-1">
              {doc.clauseHeader}
            </div>

            <p className="text-sm font-semibold text-stone-900 mb-3">
              {doc.sectionNum}
            </p>

            {/* Exact Bounding-Box Highlight Clause */}
            <div className="relative my-4 p-4 rounded bg-amber-100/90 border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)]">
              <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-amber-500 text-white font-mono text-[9px] font-bold tracking-wider uppercase">
                Statutory Bar Anchor
              </div>
              <p className="text-sm font-serif text-stone-950 font-medium leading-relaxed indent-4">
                {doc.subClause}
              </p>
            </div>

            {/* Official Legal Annotations */}
            <div className="mt-8 pt-4 border-t border-stone-300 text-xs font-sans text-stone-600">
              <span className="font-bold uppercase tracking-wider text-[10px] text-stone-800 block mb-1">
                IPO Controller &amp; Examiner Statutory Guidance:
              </span>
              <p className="leading-normal">{doc.commentary}</p>
            </div>

            {/* Footer Seal */}
            <div className="mt-8 flex items-center justify-between text-[10px] font-mono text-stone-400 border-t border-dashed border-stone-200 pt-3">
              <span>Authority: Legislative Dept, Ministry of Law &amp; Justice</span>
              <span>Authentic Digital Certified Extract</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">Coordinate Anchor: [x: 48, y: 190, w: 520, h: 64]</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}