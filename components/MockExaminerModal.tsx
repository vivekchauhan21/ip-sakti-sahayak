"use client";

import { useState } from "react";

interface MockExaminerModalProps {
  isOpen: boolean;
  onClose: () => void;
  formulation: string;
}

interface Message {
  sender: "examiner" | "applicant";
  text: string;
}

export default function MockExaminerModal({
  isOpen,
  onClose,
  formulation,
}: MockExaminerModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "examiner",
      text: "The hearing under Section 14 of the Patents Act, 1970 is convened. The claims appear prima facie barred under Section 3(p) as traditional knowledge. Explain how this composition demonstrates an inventive step beyond classical Ayurvedic prior art.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const nextHistory: Message[] = [...messages, { sender: "applicant", text: userText }];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mock-hearing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formulation,
          dialogueHistory: messages,
          userResponse: userText,
        }),
      });

      const data = await res.json();
      if (data.examinerReply) {
        setMessages([...nextHistory, { sender: "examiner", text: data.examinerReply }]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl flex flex-col w-full max-w-2xl h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚖️</span>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                Section 14 Statutory Hearing
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                AI Patent Examiner Simulator (IPO Controller)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-2.5 py-1 rounded-lg transition"
          >
            ✕ Close
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "applicant" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] text-xs leading-relaxed p-3.5 rounded-xl ${
                  m.sender === "applicant"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                }`}
              >
                <span className="block text-[10px] font-mono font-bold mb-1 opacity-70">
                  {m.sender === "applicant" ? "Applicant / Agent" : "IPO Controller Objection"}
                </span>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-slate-500 italic">
              IPO Controller is examining statutory references...
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
          <input
            type="text"
            placeholder="State your technical or synergistic defense under Section 3..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg text-xs font-semibold text-white transition"
          >
            Submit Defense
          </button>
        </div>
      </div>
    </div>
  );
}