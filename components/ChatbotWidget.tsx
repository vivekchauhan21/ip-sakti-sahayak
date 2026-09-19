"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Bot,
  Sparkles,
  X,
  Send,
  Loader2,
  Trash2,
  Scale,
  ExternalLink,
  ChevronDown,
  Minimize2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Namaste! I am **Sahayak AI**, your statutory patentability and regulatory compliance co-pilot for IP-SAKTI.\n\nAsk me about **Section 3(p)** Traditional Knowledge bars, **Section 3(e)** synergy proof, **BDA 2024 ABS** obligations, or how to navigate our platform tools.",
    timestamp: "Just now",
  },
];

const SUGGESTION_CHIPS = [
  "What is Sec 3(p)?",
  "How does BDA ABS apply?",
  "Explain Export Matrix",
  "Phytopharmaceutical Track",
];

export default function ChatbotWidget() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine visibility:
  // Visible on all workspace routes, and on landing page if user is authenticated or session exists
  useEffect(() => {
    const isWorkspace =
      pathname.startsWith("/evaluator") ||
      pathname.startsWith("/novelty") ||
      pathname.startsWith("/export-matrix") ||
      pathname.startsWith("/biodiversity") ||
      pathname.startsWith("/mock-hearing") ||
      pathname.startsWith("/defensive-shield") ||
      pathname.startsWith("/filing-roadmap");

    if (isWorkspace) {
      setIsVisible(true);
    } else {
      // On landing page or other routes, check if user has active session
      try {
        const storedUser = localStorage.getItem("ipsakti_user");
        const storedName = localStorage.getItem("userName");
        setIsVisible(Boolean(storedUser || storedName));
      } catch {
        setIsVisible(false);
      }
    }
  }, [pathname]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Format history for the API
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const botMessage: ChatMessage = {
          id: "bot-" + Date.now(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to get reply");
      }
    } catch (err: any) {
      console.warn("Chat response error:", err);
      const errorMessage: ChatMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content:
          "I encountered a temporary connection issue. Please try rephrasing your statutory inquiry or verify your internet connection.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* ========================================================================= */}
      {/* 1. CHAT DRAWER / CARD MODAL */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Sahayak AI Chat Window"
          className="w-[330px] sm:w-[380px] md:w-[410px] h-[520px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                  <Bot size={18} />
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-wide">Sahayak AI</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Co-Pilot
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">AYUSH Statutory & Patent Legaltech</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                title="Clear conversation"
              >
                <Trash2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Minimize chat"
              >
                <Minimize2 size={14} />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500/15 hover:border-emerald-500/40 border border-slate-700 text-[10px] font-medium text-slate-300 hover:text-emerald-300 whitespace-nowrap transition cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 select-text text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-start gap-1.5 max-w-[88%]">
                    {!isUser && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Sparkles size={10} />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? "bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 rounded-tr-sm"
                          : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-sm"
                      }`}
                    >
                      {/* Formatted Markdown-like simple rendering */}
                      {formatMessageContent(msg.content)}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Bot size={11} />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-sm bg-slate-800/90 border border-slate-700/80 flex items-center gap-1.5 text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="text-[10px] text-slate-400 ml-1">Analyzing statutory law...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Box */}
          <div className="p-2.5 bg-slate-950/90 border-t border-slate-800">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/90 focus-within:border-emerald-500/60 rounded-xl px-2.5 py-1.5 transition">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Sec 3(p), BDA 2024, or tools..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 font-bold transition active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                title="Send message"
              >
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              </button>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1 px-1">
              <span>Powered by Gemini 1.5</span>
              <span>Statutory Legal Information</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING TRIGGER ICON */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 rounded-full shadow-2xl shadow-emerald-500/35 transition-all duration-200 hover:scale-110 flex items-center justify-center cursor-pointer active:scale-95 group"
          title={isOpen ? "Minimize Sahayak AI" : "Open Sahayak AI Co-Pilot"}
        >
          {isOpen ? (
            <X size={22} className="text-slate-950 stroke-[2.5]" />
          ) : (
            <>
              {/* Friendly animated cartoonish bot/sparkle badge */}
              <div className="relative">
                <Bot size={22} className="text-slate-950 stroke-[2.2] group-hover:rotate-6 transition-transform" />
                <Sparkles
                  size={10}
                  className="absolute -top-1.5 -right-2 text-emerald-950 animate-pulse fill-emerald-950"
                />
              </div>

              {/* Online pulsing indicator */}
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-[#070d18] animate-ping" />
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070d18]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Lightweight markdown-like text formatter for bolding, bullet points, headers, and links
 */
function formatMessageContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    // Headers (### ...)
    if (line.startsWith("### ")) {
      return (
        <h4 key={idx} className="font-bold text-white text-xs mt-1 mb-0.5 flex items-center gap-1">
          {line.replace("### ", "")}
        </h4>
      );
    }
    // Bullet points (* or -)
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      const clean = line.trim().replace(/^[\*\-]\s+/, "");
      return (
        <div key={idx} className="flex items-start gap-1.5 ml-1 my-0.5">
          <span className="text-emerald-400 font-bold">•</span>
          <span>{renderInlineStyles(clean)}</span>
        </div>
      );
    }
    // Numbered list
    if (/^\d+\.\s+/.test(line.trim())) {
      return (
        <div key={idx} className="ml-1 my-0.5 font-medium text-slate-200">
          {renderInlineStyles(line)}
        </div>
      );
    }
    // Empty line spacer
    if (!line.trim()) {
      return <div key={idx} className="h-1" />;
    }
    // Standard paragraph
    return (
      <p key={idx} className="my-0.5">
        {renderInlineStyles(line)}
      </p>
    );
  });
}

function renderInlineStyles(text: string) {
  // Simple bolding formatter for **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-emerald-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
