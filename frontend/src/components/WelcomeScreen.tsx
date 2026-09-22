"use client";

import React, { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),   // Encryption
      setTimeout(() => setStep(2), 1200),  // Policy Engine
      setTimeout(() => setStep(3), 1800),  // Voice Infra
      setTimeout(() => setStep(4), 2400),  // Audit System
      setTimeout(() => setStep(5), 3000),  // Ready
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#07111F] text-[#F5F7FA] p-8 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#19D3AE]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00A2FD]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Protocol Status */}
      <div className="w-full flex items-center justify-between max-w-5xl z-10 pt-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#19D3AE] bg-[#0D1B2A] border border-[#19D3AE]/30 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#19D3AE] animate-ping" />
          <span>SOVEREIGN POD DXB-02 • BOOT SEQUENCE</span>
        </div>
        <div className="font-mono text-xs text-[#91A4B7]">
          PROTOCOL V4.2.1 • CBUAE TIER-1
        </div>
      </div>

      {/* Center Shield & Waveform Animation */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center max-w-xl">
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-[#19D3AE]/10 animate-ping opacity-40" />
          <div className="absolute -inset-4 rounded-full border border-[#19D3AE]/20 animate-spin" style={{ animationDuration: "12s" }} />
          <div className="relative w-28 h-28 rounded-2xl bg-[#0D1B2A] border border-[#19D3AE]/40 shadow-[0_0_40px_rgba(25,211,174,0.25)] flex items-center justify-center">
            <svg className="w-16 h-16 text-[#19D3AE]" viewBox="0 0 100 100" fill="none">
              <path
                d="M50 8L18 22V46C18 67 31.8 86.4 50 92C68.2 86.4 82 67 82 46V22L50 8Z"
                fill="#07111F"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect x="33" y="42" width="4" height="16" rx="2" fill="currentColor" className="animate-pulse" />
              <rect x="41" y="34" width="4" height="32" rx="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
              <rect x="48" y="26" width="4" height="48" rx="2" fill="#5BFBD4" className="animate-pulse" style={{ animationDelay: "0.1s" }} />
              <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
              <rect x="55" y="34" width="4" height="32" rx="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
              <rect x="63" y="42" width="4" height="16" rx="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.15s" }} />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
          FINVOICE <span className="text-[#19D3AE]">GUARD</span>
        </h1>
        <p className="text-lg text-[#91A4B7] font-medium tracking-wide">
          Governed Voice AI for Financial Services
        </p>

        {/* Boot Sequence List */}
        <div className="w-full max-w-sm mt-8 bg-[#0D1B2A]/90 border border-[#243746] rounded-xl p-4 text-left font-mono text-xs space-y-2">
          <div className="text-[#91A4B7] mb-2 flex items-center justify-between">
            <span>Initializing secure environment...</span>
            <span className="text-[#19D3AE]">{Math.min(step * 25, 100)}%</span>
          </div>

          <div className={`flex items-center justify-between transition-opacity duration-300 ${step >= 1 ? "text-[#19D3AE] opacity-100" : "text-[#85948E] opacity-30"}`}>
            <span>✓ Encryption (AES-256 GCM Vault)</span>
            <span className="text-[10px]">ACTIVE</span>
          </div>

          <div className={`flex items-center justify-between transition-opacity duration-300 ${step >= 2 ? "text-[#19D3AE] opacity-100" : "text-[#85948E] opacity-30"}`}>
            <span>✓ Policy Engine (Rule-Enforced Guard)</span>
            <span className="text-[10px]">ACTIVE</span>
          </div>

          <div className={`flex items-center justify-between transition-opacity duration-300 ${step >= 3 ? "text-[#19D3AE] opacity-100" : "text-[#85948E] opacity-30"}`}>
            <span>✓ Voice Infrastructure (ElevenLabs Multilingual)</span>
            <span className="text-[10px]">ACTIVE</span>
          </div>

          <div className={`flex items-center justify-between transition-opacity duration-300 ${step >= 4 ? "text-[#19D3AE] opacity-100" : "text-[#85948E] opacity-30"}`}>
            <span>✓ Audit System (Merkle Tree Forensics)</span>
            <span className="text-[10px]">LOCKED</span>
          </div>
        </div>

        {/* Enter Button */}
        {step >= 5 && (
          <button
            onClick={onComplete}
            className="mt-6 px-8 py-3.5 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-semibold rounded-lg shadow-[0_0_25px_rgba(25,211,174,0.4)] transition-all flex items-center gap-2 text-sm animate-fade-in cursor-pointer"
          >
            <span>Enter FinVoice Guard</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Bottom Pillars */}
      <div className="w-full max-w-xl text-center z-10 pb-4">
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#91A4B7]">
          <span>Secure</span>
          <span className="text-[#19D3AE]">•</span>
          <span>Auditable</span>
          <span className="text-[#19D3AE]">•</span>
          <span>Multilingual</span>
        </div>
      </div>
    </div>
  );
}
