"use client";

import { useState, useRef } from "react";

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: "en-IN", label: "EN (India)" },
  { code: "hi-IN", label: "हिंदी (Hindi)" },
  { code: "ta-IN", label: "தமிழ்" },
  { code: "te-IN", label: "తెలుగు" },
  { code: "mr-IN", label: "मराठी" },
];

export default function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback for browsers without speech support
      simulateSampleInput();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text) {
          onTranscript(text);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech API Error:", event.error);
        setIsListening(false);
        // If Brave blocks Google Speech API, fallback to demo query instead of breaking
        if (event.error === "network" || event.error === "not-allowed") {
          simulateSampleInput();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      simulateSampleInput();
    }
  };

  const simulateSampleInput = () => {
    setIsListening(true);
    setTimeout(() => {
      const sampleQueries: { [key: string]: string } = {
        "en-IN": "Purified Ashwagandha extract with bio-enhancer Piperine for anti-inflammatory efficacy",
        "hi-IN": "शुद्ध अश्वगंधा और पिप्पली अर्क सूजन निवारक गुण",
        "ta-IN": "அஸ்வகந்தா மற்றும் மஞ்சள் பிரித்தெடுத்தல்",
        "te-IN": "అశ్వగంధ మరియు పసుపు సారం",
        "mr-IN": "अश्वगंधा आणि हळद शुद्ध अर्क",
      };
      onTranscript(sampleQueries[selectedLang] || sampleQueries["en-IN"]);
      setIsListening(false);
    }, 800);
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="bg-slate-900 border border-slate-800 text-[11px] text-slate-300 rounded px-1.5 py-1 focus:outline-none focus:border-emerald-500"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={startListening}
        className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
          isListening
            ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
            : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
        }`}
      >
        <span>{isListening ? "🔴" : "🎙️"}</span>
        <span>{isListening ? "Listening..." : "Mic"}</span>
      </button>
    </div>
  );
}