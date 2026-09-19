"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/useLanguage";
import { Globe, LogOut, User } from "lucide-react";

const NAV_ITEMS = [
  { labelKey: "nav_evaluator", fallback: "Evaluator", href: "/evaluator" },
  { labelKey: "nav_novelty", fallback: "Novelty Meter", href: "/novelty" },
  { labelKey: "nav_export", fallback: "Export Matrix", href: "/export-matrix" },
  { labelKey: "nav_biodiversity", fallback: "BDA Compliance", href: "/biodiversity" },
  { labelKey: "nav_mock", fallback: "Mock Hearing", href: "/mock-hearing" },
  { labelKey: "nav_shield", fallback: "Anti-Biopiracy Shield", href: "/defensive-shield" },
  { labelKey: "nav_roadmap", fallback: "Filing Roadmap", href: "/filing-roadmap" },
];

export default function Navbar() {
  const { lang, changeLanguage, supportedLanguages, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("ipsakti_user");
      const plainName = localStorage.getItem("userName");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed?.name) {
          setUserName(parsed.name);
          return;
        }
      }
      if (plainName) {
        setUserName(plainName);
        return;
      }
      // Default to active session user if in workspace
      setUserName("Vivek");
    } catch {
      setUserName("Vivek");
    }
  }, [pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("ipsakti_user");
      localStorage.removeItem("userEmail");
    } catch (err) {
      console.warn("Logout session cleanup error", err);
    }
    setUserName(null);
    router.push("/");
  };

  // Do not render the internal workspace navigation on the landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition" title="Back to Home / Landing">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-sm">⚖️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">IP-SAKTI Sahayak</span>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                }`}
              >
                {t[item.labelKey] || item.fallback}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Global Language Switcher & User Profile/Logout */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Global Bhashini Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
            <Globe size={13} className="text-emerald-400 shrink-0" />
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {supportedLanguages.map((item) => (
                <option key={item.code} value={item.code} className="bg-slate-950 text-slate-200">
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile Badge & Logout Button */}
          {userName && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <User size={13} className="text-emerald-400" />
                <span className="font-semibold text-white max-w-[90px] truncate">{userName}</span>
                <span className="text-[10px] text-slate-400 font-mono">(Workspace)</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Logout from session and return to home"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}