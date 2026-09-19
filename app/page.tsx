"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scale,
  ShieldCheck,
  BookOpenCheck,
  FileText,
  Download,
  LogIn,
  User,
  Mail,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Layers,
  Lock,
  AlertCircle,
  X,
  ChevronRight,
  Gavel,
  ShieldAlert,
  GraduationCap,
  Globe2,
  LogOut,
} from "lucide-react";

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  fileName: string;
  fileSize: string;
  badge: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    fileName: "ip-sakti-guide-en.pdf",
    fileSize: "13 KB",
    badge: "Official Gazettes",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    fileName: "ip-sakti-guide-hi.pdf",
    fileSize: "14 KB",
    badge: "मानक राजपत्र",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    fileName: "ip-sakti-guide-ta.pdf",
    fileSize: "13 KB",
    badge: "சட்ட வழிகாட்டி",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    fileName: "ip-sakti-guide-te.pdf",
    fileSize: "13 KB",
    badge: "చట్టపరమైన మార్గదర్శి",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    fileName: "ip-sakti-guide-bn.pdf",
    fileSize: "13 KB",
    badge: "আইনি নির্দেশিকা",
  },
];

const STATUTORY_SECTIONS = [
  {
    tag: "Section 3(p)",
    act: "Indian Patents Act, 1970",
    title: "Traditional Knowledge & Aggregation Exclusion",
    description:
      "Statutory bar against claiming traditional knowledge or inventions that are mere aggregations / duplications of known properties of traditionally documented plants. Applicants bear the burden of proving significant technological advancement and non-obvious synergy beyond ancient Ayurvedic literature.",
    highlight: "Non-patentable if documented in TKDL without demonstrated technical synergy.",
    icon: Scale,
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    tag: "Section 3(e)",
    act: "Indian Patents Act, 1970",
    title: "Mere Admixture & Statutory Synergy Burden",
    description:
      "Excludes substances resulting from mere physical admixtures yielding only additive properties. To clear Section 3(e), applicants must submit empirical bio-enhancement indices, Combination Index (CI < 1.0), or pharmacological synergism demonstrating 1+1 > 2.",
    highlight: "Requires quantitative synergy data beyond routine herbal blending.",
    icon: Sparkles,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    tag: "BDA 2002 / 2024",
    act: "Biological Diversity Act (Amended)",
    title: "ABS Approvals & SBB Prior Intimation",
    description:
      "Sections 3, 7, 19, and 24 mandate prior National Biodiversity Authority (NBA) approval before applying for IPRs on Indian bio-resources, alongside State Biodiversity Board (SBB) intimation and fair Access & Benefit Sharing (ABS) royalty agreements.",
    highlight: "Mandatory statutory compliance before patent grant to avoid penal action.",
    icon: ShieldCheck,
    badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
  },
  {
    tag: "GSR 918(E)",
    act: "Drugs & Cosmetics Rules, 1945",
    title: "Phytopharmaceutical Regulatory Track",
    description:
      "Standardized regulatory gateway for purified, characterized fractions of medicinal plants. Enforces strict chromatographic fingerprinting (HPTLC/HPLC), batch-to-batch chemical stability, toxicology assays, and phase clinical safety under CDSCO and AYUSH.",
    highlight: "Bridges classical Ayurvedic herbal medicine with modern allopathic rigor.",
    icon: BookOpenCheck,
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
];

const PLATFORM_FEATURES = [
  {
    title: "Dynamic Statutory Evaluator",
    subtitle: "Section 3(p) & 3(e) Engine",
    description:
      "Classify multi-ingredient formulations, analyze botanical ratios against Ayurvedic Pharmacopoeia (API), and receive instant patentability verdicts.",
    href: "/evaluator",
    tag: "Core Workspace",
    icon: Scale,
  },
  {
    title: "Novelty Meter & Prior Art",
    subtitle: "TKDL & Literature Benchmarking",
    description:
      "Cross-check active phytocompounds against Classical Ayurvedic Samhitas (Charaka, Sushruta) and contemporary scientific publication databases.",
    href: "/novelty",
    tag: "Prior Art Scanner",
    icon: Sparkles,
  },
  {
    title: "Cross-Border Export Matrix",
    subtitle: "India vs US FDA vs EMA",
    description:
      "Harmonize compliance across CDSCO AYUSH, US FDA Dietary Supplement (DSHEA) / Botanical Drug guidance, and EU Traditional Herbal Medicinal Products Directive (THMPD).",
    href: "/export-matrix",
    tag: "Global Harmonization",
    icon: Globe2,
  },
  {
    title: "BDA Compliance Checker",
    subtitle: "ABS & SBB Statutory Gateway",
    description:
      "Determine Form 1/Form 3 NBA filing requirements, calculate Access & Benefit Sharing percentages, and safeguard against Section 55 biological piracy penalties.",
    href: "/biodiversity",
    tag: "Biodiversity Act",
    icon: ShieldAlert,
  },
  {
    title: "Virtual Hearing Mock Trial",
    subtitle: "Controller Objection Simulation",
    description:
      "AI-driven simulated IPO controller cross-examination. Practice responding to FER objections under Sections 3(p), 3(e), and 2(1)(j) in real time.",
    href: "/mock-hearing",
    tag: "Examination Prep",
    icon: Gavel,
  },
  {
    title: "Anti-Biopiracy Shield",
    subtitle: "Defensive Publication & TK Defense",
    description:
      "Generate defensive publication disclosures to place traditional knowledge in the public domain and challenge predatory foreign patents.",
    href: "/defensive-shield",
    tag: "Heritage Defense",
    icon: ShieldCheck,
  },
];

const GOV_AUTHORITIES = [
  {
    name: "CSIR - TKDL",
    fullname: "Traditional Knowledge Digital Library",
    description: "Pioneering Indian database guarding 4.5+ lakh classical formulations against wrongful patents worldwide.",
    url: "https://www.tkdl.res.in",
    badge: "Prior Art Repository",
  },
  {
    name: "India Code",
    fullname: "Legislative Department, Ministry of Law",
    description: "Official digital repository for Indian Patents Act 1970, Sections 3(p), 3(e), and Rules 2003.",
    url: "https://www.indiacode.nic.in",
    badge: "Statutory Law",
  },
  {
    name: "IP India (CGPDTM)",
    fullname: "Controller General of Patents, Designs & Trademarks",
    description: "National patent office governing patent prosecution, First Examination Reports (FER), and patent grants.",
    url: "https://ipindia.gov.in",
    badge: "Patent Office",
  },
  {
    name: "NBA India",
    fullname: "National Biodiversity Authority",
    description: "Statutory autonomous body implementing Biological Diversity Act, regulating bio-resource commercialization.",
    url: "http://nbaindia.org",
    badge: "Biodiversity & ABS",
  },
];

export default function WelcomeLandingPage() {
  const router = useRouter();

  // Modals state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // User session state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Login form state
  const [loginName, setLoginName] = useState("Vivek");
  const [loginEmail, setLoginEmail] = useState("demo@gmail.com");
  const [loginError, setLoginError] = useState("");

  // Download feedback
  const [downloadingCode, setDownloadingCode] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ipsakti_user");
      const storedName = localStorage.getItem("userName");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setCurrentUser(parsed);
          setLoginName(parsed.name);
          setLoginEmail(parsed.email || "demo@gmail.com");
          return;
        }
      }
      if (storedName) {
        const fallbackUser = { name: storedName, email: "demo@gmail.com" };
        setCurrentUser(fallbackUser);
        setLoginName(storedName);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Handle Login & Session Storage
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) {
      setLoginError("Please enter your name.");
      return;
    }
    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      setLoginError("Please enter a valid Gmail / Email address.");
      return;
    }

    const userData = {
      name: loginName.trim(),
      email: loginEmail.trim(),
      loggedInAt: new Date().toISOString(),
      role: "Patent Agent / Researcher",
    };

    try {
      localStorage.setItem("ipsakti_user", JSON.stringify(userData));
      localStorage.setItem("userName", loginName.trim());
      localStorage.setItem("userEmail", loginEmail.trim());
      setCurrentUser(userData);
    } catch (err) {
      console.warn("localStorage write failed", err);
    }

    setIsLoginModalOpen(false);
    router.push("/evaluator");
  };

  // Handle Logout & Session Cleanup
  const handleLogout = () => {
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("ipsakti_user");
      localStorage.removeItem("userEmail");
    } catch (err) {
      console.warn("Session cleanup error", err);
    }
    setCurrentUser(null);
  };

  // Primary CTA click: if logged in, go straight to evaluator; otherwise open login modal
  const handleLaunchEvaluator = () => {
    if (currentUser) {
      router.push("/evaluator");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Handle PDF Download
  const handleDownloadPdf = async (lang: LanguageOption) => {
    setDownloadingCode(lang.code);
    setDownloadSuccessMessage(null);

    const pdfUrl = `/docs/${lang.fileName}`;

    try {
      // Test if file exists via head request
      const res = await fetch(pdfUrl, { method: "HEAD" });
      if (!res.ok) {
        throw new Error(`PDF asset pending upload (Status: ${res.status})`);
      }

      // Trigger direct download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = lang.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccessMessage(`Successfully downloading IP Framework Guide (${lang.name})!`);
      setTimeout(() => {
        setDownloadingCode(null);
      }, 1200);
    } catch (error) {
      console.warn("Direct download fallback triggered:", error);
      // Fallback: alert/toast and provide direct link
      setDownloadSuccessMessage(
        `Initiating download for ${lang.name} edition. If blocked by browser, check your downloads folder.`
      );
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = lang.fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setDownloadingCode(null);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* ========================================================================= */}
      {/* 1. CLEAN LANDING NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070d18]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Legaltech Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:border-emerald-500/50 transition">
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition">
                  IP-SAKTI Sahayak
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-wider">
                  Legaltech AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AYUSH Statutory Patentability & Biopiracy Defense Portal
              </p>
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* Download IP Framework Guide Button */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-emerald-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer shrink-0"
            >
              <Download size={14} className="text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Download IP Framework Guide</span>
              <span className="sm:hidden">IP Guide</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                PDF
              </span>
            </button>

            {/* Portal Login / Access Button & Logout */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/evaluator")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
                >
                  <User size={14} />
                  <span className="max-w-[110px] truncate">{currentUser.name}</span>
                  <span className="text-[10px] font-medium opacity-85">(Workspace)</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Logout from session"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
              >
                <LogIn size={14} />
                <span>Portal Login / Access</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-900">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-slate-300">
              National AYUSH Patent Intelligence & Statutory Assessment Engine
            </span>
          </div>

          {/* Bold Display Title */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              IP-SAKTI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                SAHAYAK
              </span>
            </h1>
            <p className="text-lg sm:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
              AI-driven statutory patentability, TKDL compliance, and sovereign biopiracy defense under the Indian
              Patents Act 1970 & BDA 2024.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Empowering patent agents, Ayurvedic researchers, and pharmaceutical innovators to rigorously evaluate Section
            3(p) Traditional Knowledge exclusions, Section 3(e) synergistic thresholds, and BDA Access & Benefit
            Sharing (ABS).
          </p>

          {/* Primary CTA & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleLaunchEvaluator}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/80 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Scale className="w-5 h-5" />
              <span>Launch Statutory Evaluator</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <Download size={16} className="text-emerald-400" />
              <span>Download IP Framework Guide</span>
            </button>
          </div>

          {/* Quick Metrics / Statutory Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="text-xl font-bold text-white">34+ Offices</div>
              <div className="text-[11px] text-slate-400">TKDL International Prior Art</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="text-xl font-bold text-emerald-400">Section 3(p)</div>
              <div className="text-[11px] text-slate-400">TK & Aggregation Defense</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="text-xl font-bold text-teal-400">Section 3(e)</div>
              <div className="text-[11px] text-slate-400">Synergy Verification CI &lt; 1</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="text-xl font-bold text-cyan-400">BDA 2024</div>
              <div className="text-[11px] text-slate-400">ABS & SBB Compliance Tracks</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY PATENT SECTIONS & STATUTORY LAWS GRID */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Scale size={13} />
              <span>Statutory Legal Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Essential Patent Statutes & Regulatory Directives
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              The cornerstone legislative provisions governing Ayurvedic, botanical, and natural product patent
              applications before the Indian Patent Office (IPO) and global registries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTORY_SECTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 relative overflow-hidden transition group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{item.act}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition flex items-center gap-2">
                        <Icon className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-xs text-emerald-400/90 font-medium bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/10">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PLATFORM FEATURES OVERVIEW */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                <Layers size={13} />
                <span>Integrated Workspace Suites</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Spectrum AYUSH IPR Toolkit</h2>
              <p className="text-sm text-slate-400">
                Seamlessly progress from raw botanical formulation intake to international filing roadmaps, ABS
                verification, and simulated controller cross-examination.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLaunchEvaluator}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-xs font-semibold text-emerald-400 flex items-center gap-2 self-start md:self-auto transition cursor-pointer"
            >
              <span>Enter Main Workspace</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORM_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
                        <Icon size={18} />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {feat.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-emerald-400/80 font-medium mb-1.5">{feat.subtitle}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      href={feat.href}
                      className="text-xs font-semibold text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition"
                    >
                      <span>Open Module</span>
                      <ChevronRight size={13} className="text-slate-500 group-hover:text-emerald-400 transition" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OFFICIAL GOVERNMENT AUTHORITIES / REGISTRIES BAR */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap size={13} className="text-emerald-400" />
              <span>Official Registry Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Government Registries & Statutory Portals</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct verification portals for gazette notifications, patent prosecution documents, and biodiversity
              mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GOV_AUTHORITIES.map((auth, idx) => (
              <a
                key={idx}
                href={auth.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {auth.badge}
                    </span>
                    <ExternalLink size={13} className="text-slate-500 group-hover:text-emerald-400 transition" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                      {auth.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{auth.fullname}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{auth.description}</p>
                </div>
                <div className="mt-3 pt-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <span>Visit: {auth.url.replace(/^https?:\/\//, "")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-8 bg-[#070d18] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">IP-SAKTI SAHAYAK</span>
            <span>·</span>
            <span>AYUSH LegalTech & Patent Intelligence Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer"
            >
              <Download size={12} />
              <span>Download Guide</span>
            </button>
            <span>·</span>
            <Link href="/evaluator" className="hover:text-emerald-400 transition">
              Workspace
            </Link>
            <span>·</span>
            <span className="text-slate-400">Patents Act 1970 & BDA 2024</span>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 2. LANGUAGE DOWNLOAD MODAL */}
      {/* ========================================================================= */}
      {isDownloadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDownloadModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-7 space-y-6 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <FileText size={14} />
                <span>Statutory Reference Documentation</span>
              </div>
              <h3 className="text-xl font-bold text-white">In which language do you want to download this PDF?</h3>
              <p className="text-xs text-slate-400">
                Download the official IP-SAKTI statutory framework guide covering Section 3(p), Section 3(e), BDA 2024,
                and GSR 918(E) in your preferred official language.
              </p>
            </div>

            {/* Download Status Toast / Feedback */}
            {downloadSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{downloadSuccessMessage}</span>
              </div>
            )}

            {/* Language Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LANGUAGE_OPTIONS.map((lang) => {
                const isDownloading = downloadingCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleDownloadPdf(lang)}
                    disabled={isDownloading}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-950 text-left transition group flex flex-col justify-between disabled:opacity-50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                          {lang.nativeName}
                        </div>
                        <div className="text-xs text-slate-400">{lang.name}</div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {lang.fileSize}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400 transition">
                      <span className="text-[10px] text-slate-500">{lang.badge}</span>
                      <div className="flex items-center gap-1 font-semibold">
                        {isDownloading ? (
                          <span className="animate-pulse text-emerald-400">Downloading...</span>
                        ) : (
                          <>
                            <span>Download PDF</span>
                            <Download size={12} />
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Files are stored in <code className="text-slate-300 font-mono">/public/docs/</code> and free for public statutory dissemination.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LOGIN MODAL & WORKSPACE ACCESS */}
      {/* ========================================================================= */}
      {isLoginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLoginModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-7 space-y-6 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Portal Login / Workspace Access</h3>
              <p className="text-xs text-slate-400">
                Enter your credentials to enter the IP-SAKTI AYUSH statutory evaluation workspace.
              </p>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User size={13} className="text-emerald-400" />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => {
                    setLoginName(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="Vivek"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail size={13} className="text-emerald-400" />
                  <span>Gmail / Email Address</span>
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setLoginError("");
                  }}
                  placeholder="demo@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition active:scale-95 cursor-pointer"
              >
                <LogIn size={16} />
                <span>Sign In & Enter Workspace</span>
              </button>
            </form>

            <div className="pt-1 text-center text-[11px] text-slate-400">
              Session is saved locally in your browser to maintain your active patent dossiers and drafts.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}