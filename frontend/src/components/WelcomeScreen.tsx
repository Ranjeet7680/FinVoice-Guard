"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FinVoiceLogo from "./brand/FinVoiceLogo";

interface WelcomeScreenProps {
  onComplete?: () => void;
  autoDismissMs?: number;
}

interface BootLog {
  id: number;
  label: string;
  detail: string;
  status: "pending" | "running" | "completed";
}

const INITIAL_LOGS: BootLog[] = [
  { id: 1, label: "Cryptographic Vault (DXB-02)", detail: "AES-256 GCM Hardware HSM", status: "pending" },
  { id: 2, label: "ElevenLabs Voice Core", detail: "Multilingual v2 Low-Latency Turbo", status: "pending" },
  { id: 3, label: "CBUAE Policy Guard", detail: "REG-604/2026 Zero-Secrets Fail-Closed", status: "pending" },
  { id: 4, label: "Fraud Anomaly Mesh", detail: "XGBoost + PyTorch Temporal Scorer", status: "pending" },
  { id: 5, label: "Forensic Ledger", detail: "SHA-256 Merkle Chain Sealed", status: "pending" },
];

export default function WelcomeScreen({ onComplete, autoDismissMs = 0 }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<BootLog[]>(INITIAL_LOGS);
  const [isDone, setIsDone] = useState(false);
  const audioPlayedRef = useRef(false);

  // Play subtle high-tech futuristic harmonic chime on 100% completion using Web Audio API
  const playCompletionChime = () => {
    if (audioPlayedRef.current) return;
    audioPlayedRef.current = true;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.25); // A5

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(440.0, now); // A4
      osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.35); // E5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.65);
      osc2.stop(now + 0.65);
    } catch {
      // AudioContext blocked or not supported - ignore safely
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // 2.8s smooth boot sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 20 && currentStep < 1) {
        setCurrentStep(1);
        setLogs((prev) => prev.map((l) => (l.id === 1 ? { ...l, status: "completed" } : l.id === 2 ? { ...l, status: "running" } : l)));
      }
      if (pct >= 42 && currentStep < 2) {
        setCurrentStep(2);
        setLogs((prev) => prev.map((l) => (l.id <= 2 ? { ...l, status: "completed" } : l.id === 3 ? { ...l, status: "running" } : l)));
      }
      if (pct >= 64 && currentStep < 3) {
        setCurrentStep(3);
        setLogs((prev) => prev.map((l) => (l.id <= 3 ? { ...l, status: "completed" } : l.id === 4 ? { ...l, status: "running" } : l)));
      }
      if (pct >= 85 && currentStep < 4) {
        setCurrentStep(4);
        setLogs((prev) => prev.map((l) => (l.id <= 4 ? { ...l, status: "completed" } : l.id === 5 ? { ...l, status: "running" } : l)));
      }
      if (pct >= 100) {
        setProgress(100);
        setCurrentStep(5);
        setLogs((prev) => prev.map((l) => ({ ...l, status: "completed" })));
        setIsDone(true);
        clearInterval(interval);
        playCompletionChime();

        if (autoDismissMs > 0 && onComplete) {
          setTimeout(onComplete, autoDismissMs);
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentStep, autoDismissMs, onComplete]);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("finvoice_welcomed", "true");
    }
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#07111F] text-[#F5F7FA] p-6 sm:p-10 overflow-hidden select-none animate-fade-in">
      {/* Background Matrix & Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0D1B2A_1px,transparent_1px),linear-gradient(to_bottom,#0D1B2A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#19D3AE]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00A2FD]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Protocol Status Bar */}
      <div className="w-full flex items-center justify-between max-w-5xl z-10">
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#19D3AE] bg-[#0D1B2A]/90 border border-[#19D3AE]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(25,211,174,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#19D3AE] animate-ping" />
          <span>SOVEREIGN POD DXB-02 • SYSTEM INITIALIZATION</span>
        </div>

        <button
          onClick={handleDismiss}
          className="text-xs font-mono text-[#91A4B7] hover:text-[#19D3AE] transition-colors flex items-center gap-1 bg-[#0D1B2A]/60 px-3 py-1 rounded-md border border-[#243746]/60 cursor-pointer"
        >
          <span>Skip</span>
          <span className="material-symbols-outlined text-xs">close</span>
        </button>
      </div>

      {/* Center: Brand Logo, Scanner & Telemetry */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center max-w-xl w-full">
        {/* Animated Brand Emblem with Radar Circles */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Pulsing Aura */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-[#19D3AE]/20 via-[#00A2FD]/15 to-transparent blur-2xl animate-pulse" />

          {/* Rotating Orbital Reticle Ring */}
          <div
            className="absolute -inset-6 rounded-full border border-dashed border-[#19D3AE]/30 animate-spin"
            style={{ animationDuration: "20s" }}
          />
          <div
            className="absolute -inset-3 rounded-full border border-[#00A2FD]/20 animate-spin"
            style={{ animationDuration: "14s", animationDirection: "reverse" }}
          />

          {/* Core Shield Logo */}
          <div className="relative p-4 rounded-3xl bg-[#0D1B2A]/90 border border-[#19D3AE]/40 shadow-[0_0_50px_rgba(25,211,174,0.3)] backdrop-blur-xl">
            <FinVoiceLogo variant="icon" size="xl" animated={true} />
          </div>
        </div>

        {/* Brand Name Typography */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
          FINVOICE <span className="text-[#19D3AE]">GUARD</span>
        </h1>
        <p className="text-sm sm:text-base text-[#91A4B7] font-medium tracking-wide">
          Governed Multilingual Voice AI for Financial Operations
        </p>

        {/* Live Equalizer Audio Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 my-5 h-7">
          {[40, 65, 85, 50, 95, 70, 30, 80, 100, 60, 45, 90, 75, 35, 55, 25].map((height, idx) => (
            <div
              key={idx}
              className="w-1 rounded-full bg-gradient-to-t from-[#00A2FD] to-[#19D3AE] transition-all duration-150"
              style={{
                height: isDone ? "8px" : `${Math.max(6, Math.sin((progress / 10 + idx) * 0.8) * 24 + 10)}px`,
                opacity: (idx / 16) * (progress / 100) + 0.35,
              }}
            />
          ))}
        </div>

        {/* Boot Progress & Milestones Box */}
        <div className="w-full max-w-md bg-[#0D1B2A]/95 border border-[#243746] rounded-2xl p-5 text-left font-mono text-xs shadow-2xl backdrop-blur-md">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between text-[#91A4B7] mb-2 font-semibold">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#19D3AE]">memory</span>
              <span>Sub-200ms Telemetry Pipeline</span>
            </span>
            <span className="text-[#19D3AE] font-bold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-[#07111F] rounded-full overflow-hidden mb-4 border border-[#243746]">
            <div
              className="h-full bg-gradient-to-r from-[#00A2FD] via-[#19D3AE] to-[#5BFBD4] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(25,211,174,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 5 Milestone Step Logs */}
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`flex items-center justify-between transition-all duration-200 ${
                  log.status === "completed"
                    ? "text-[#19D3AE] opacity-100"
                    : log.status === "running"
                    ? "text-white opacity-90 font-bold"
                    : "text-[#4A5D6E] opacity-35"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>{log.status === "completed" ? "✓" : log.status === "running" ? "▹" : "·"}</span>
                  <span className="truncate">{log.label}</span>
                </div>
                <span className="text-[10px] shrink-0 font-mono text-[#91A4B7]">
                  {log.status === "completed" ? "ACTIVE" : log.status === "running" ? "SYNCING..." : "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons on Completion */}
        {isDone && (
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md animate-fade-in">
            <button
              onClick={handleDismiss}
              className="w-full py-3 px-6 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-bold rounded-xl shadow-[0_0_30px_rgba(25,211,174,0.4)] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Explore Platform</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <Link
              href="/dashboard"
              onClick={handleDismiss}
              className="w-full py-3 px-6 bg-[#0D1B2A] hover:bg-[#11263A] text-white font-semibold rounded-xl border border-[#19D3AE]/40 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-base text-[#19D3AE]">dashboard</span>
              <span>Command Center</span>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Legal & Regulatory Pillars */}
      <div className="w-full max-w-xl text-center z-10">
        <div className="flex items-center justify-center gap-4 text-xs font-mono font-semibold tracking-widest uppercase text-[#91A4B7]">
          <span>CBUAE REG-604/2026</span>
          <span className="text-[#19D3AE]">•</span>
          <span>Zero Credential Solicitation</span>
          <span className="text-[#19D3AE]">•</span>
          <span>ElevenLabs v2</span>
        </div>
      </div>
    </div>
  );
}
