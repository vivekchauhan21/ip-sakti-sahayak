"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { Globe } from "lucide-react";

const NAV_ITEMS = [
  { labelKey: "nav_evaluator", href: "/" },
  { labelKey: "nav_novelty", href: "/novelty" },
  { labelKey: "nav_export", href: "/export-matrix" },
  { labelKey: "nav_biodiversity", href: "/biodiversity" },
  { labelKey: "nav_mock", href: "/mock-hearing" },
  { labelKey: "nav_shield", href: "/defensive-shield" },
  { labelKey: "nav_roadmap", href: "/filing-roadmap" },
];

export default function Navbar() {
  const { lang, changeLanguage, supportedLanguages, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-sm">⚖️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">IP-SAKTI</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AYUSH v2.0
              </span>
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
                {t[item.labelKey] || item.labelKey}
              </Link>
            );
          })}
        </nav>

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
      </div>
    </header>
  );
}