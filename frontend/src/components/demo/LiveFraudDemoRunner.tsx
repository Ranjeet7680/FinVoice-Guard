"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface DemoStep {
  id: number;
  title: string;
  category: "INGRESS" | "ML_ENGINE" | "VOICE_CALL" | "POLICY" | "BANK_CORE" | "AUDIT";
  speaker?: "AI" | "CUSTOMER" | "SYSTEM" | "POLICY_ENGINE";
  text: string;
  subtext?: string;
  badge?: string;
  badgeType?: "error" | "primary" | "warning" | "success";
  speechText?: string;
  voiceLang?: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "1. Bank Fraud Telemetry Ingress",
    category: "INGRESS",
    speaker: "SYSTEM",
    text: "Kafka fraud event received from London POS terminal: £920.00 (AED 4,500) swipe at Harrods Knightsbridge.",
    subtext: "Anomaly: Customer mobile registered to cell tower in Dubai Mall 134 seconds ago.",
    badge: "KAFKA EVENT",
    badgeType: "warning",
  },
  {
    id: 2,
    title: "2. XGBoost + PyTorch Risk Scoring",
    category: "ML_ENGINE",
    speaker: "SYSTEM",
    text: "ML model evaluates geographic velocity (5,400km in 2m), transaction value, and new device fingerprint.",
    subtext: "Tabular XGBoost: 0.96 CRITICAL • PyTorch Sequence Anomaly: 0.942. Reason codes: NEW_DEVICE, UNUSUAL_LOCATION, HIGH_VALUE.",
    badge: "96% CRITICAL",
    badgeType: "error",
  },
  {
    id: 3,
    title: "3. Fraud Incident & Case Genesis",
    category: "INGRESS",
    speaker: "SYSTEM",
    text: "Incident #FRD-92831 initialized in institutional memory. Real-Time Fraud Intervention workflow triggered.",
    subtext: "Target Card: CARD-9912 • Customer: Ahmed Khan (CUST-10045) • Account: Premier Checking.",
    badge: "INCIDENT CREATED",
    badgeType: "primary",
  },
  {
    id: 4,
    title: "4. ElevenLabs Voice Agent Initialization",
    category: "VOICE_CALL",
    speaker: "SYSTEM",
    text: "Outbound carrier SIP trunk 01 connected. Acoustic envelope guard activated on 16kHz PCM stream.",
    subtext: "Sub-200ms turnaround pipeline armed. Active voice: George (JBFqnCBsd6RMkjVDRZzb).",
    badge: "SIP CONNECTED",
    badgeType: "primary",
  },
  {
    id: 5,
    title: "5. Customer Phone Rings & Connects",
    category: "VOICE_CALL",
    speaker: "SYSTEM",
    text: "Encrypted telephony handshake established with +971 50 ••• 8492. Customer answered.",
    subtext: "Latency: 185ms • Encryption: TLS 1.3 / SRTP • Node: Dubai Regional Hub.",
    badge: "CALL ANSWERED",
    badgeType: "success",
  },
  {
    id: 6,
    title: "6. Mandatory Regulatory AI Disclosure",
    category: "VOICE_CALL",
    speaker: "AI",
    text: "'Hello Mr. Ahmed Khan, this is an automated voice security assistant from your bank. We detected an urgent transaction anomaly.'",
    subtext: "CBUAE Mandate: AI disclosure delivered within first 5 seconds. Consent to proceed requested.",
    badge: "AI DISCLOSED",
    badgeType: "primary",
    speechText: "Hello Mr. Ahmed Khan, this is an automated voice security assistant from your bank. We detected an urgent transaction anomaly on your card.",
    voiceLang: "en",
  },
  {
    id: 7,
    title: "7. Multilingual Detection & Switch (Urdu)",
    category: "VOICE_CALL",
    speaker: "CUSTOMER",
    text: "Customer responds in Urdu: 'السلام علیکم، جی بولیے کیا مسئلہ ہے؟ میں دبئی میں ہوں۔'",
    subtext: "Scribe v2 ASR detects Urdu (اردو) with 99.1% confidence. Agent runtime dynamically pivots to Urdu dialect.",
    badge: "URDU DETECTED",
    badgeType: "warning",
    speechText: "السلام علیکم جناب، کیا آپ نے ابھی لندن میں نو سو بیس پاؤنڈ کی ٹرانزیکشن کی ہے؟",
    voiceLang: "ur",
  },
  {
    id: 8,
    title: "8. Approved Verification (Zero Secrets)",
    category: "VOICE_CALL",
    speaker: "SYSTEM",
    text: "Out-of-band biometric push notification dispatched to Ahmed Khan's registered banking mobile app.",
    subtext: "Policy Rule: Zero voice credentials. Never solicit PIN, CVV, or passwords over voice. Result: APPROVED.",
    badge: "VERIFIED (ZERO-SECRETS)",
    badgeType: "success",
  },
  {
    id: 9,
    title: "9. Customer Explicitly Confirms Fraud",
    category: "VOICE_CALL",
    speaker: "CUSTOMER",
    text: "Customer states: 'نہیں، میں نے یہ ٹرانزیکشن نہیں کی۔ میں ابھی دبئی میں شاپنگ کر رہا ہوں۔ براہ مہربانی کارڈ فوری بند کریں!'",
    subtext: "Intent recognized: DISPUTED_UNAUTHORIZED_TRANSACTION. Customer requests immediate protective freeze.",
    badge: "FRAUD CONFIRMED",
    badgeType: "error",
  },
  {
    id: 10,
    title: "10. Deterministic Policy Engine Interception",
    category: "POLICY",
    speaker: "POLICY_ENGINE",
    text: "Rule FRAUD-V3.2 evaluated against requested action 'temporary_card_freeze'.",
    subtext: "Rule Result: ALLOWED (reversible 24h freeze). Forbidden actions: request_pin (BLOCKED), permanent_closure (BLOCKED).",
    badge: "RULE FRAUD-V3.2 ALLOWED",
    badgeType: "success",
  },
  {
    id: 11,
    title: "11. Simulated Banking Core Freeze Executed",
    category: "BANK_CORE",
    speaker: "SYSTEM",
    text: "Core Banking Gateway API invoked: POST /api/cards/freeze for CARD-9912.",
    subtext: "Result: Status changed to TEMPORARILY FROZEN. Reference: FRZ-82191. Duration: 24 Hours.",
    badge: "CARD FROZEN (FRZ-82191)",
    badgeType: "error",
  },
  {
    id: 12,
    title: "12. Human Escalation Case Generated",
    category: "BANK_CORE",
    speaker: "SYSTEM",
    text: "Case ticket #F-92831 created in Tier-2 Human Queue for permanent dispute chargeback and card reissuance.",
    subtext: "Assigned Lead: Tariq Al-Mansoor (Tier-2 Fraud Squad). Priority: CRITICAL.",
    badge: "CASE QUEUED (H)",
    badgeType: "warning",
  },
  {
    id: 13,
    title: "13. Immutable Merkle Audit Sealed",
    category: "AUDIT",
    speaker: "SYSTEM",
    text: "All 8 conversational audio turns and tool actions hashed into cryptographic SHA-256 Merkle root.",
    subtext: "Merkle Root: 0x89f2a71bc4e02319d652ba7710cde42981ef4092bba. CBUAE export package ready.",
    badge: "MERKLE SEALED",
    badgeType: "success",
  },
  {
    id: 14,
    title: "14. Live Dashboard Telemetry Synchronized",
    category: "AUDIT",
    speaker: "SYSTEM",
    text: "Event stream updated. Active Calls count synced, Fraud Events incremented (+1), Card status reflects freeze.",
    subtext: "WebSocket broadcast dispatched to all institutional operator screens without page refresh.",
    badge: "DASHBOARD LIVE",
    badgeType: "primary",
  },
  {
    id: 15,
    title: "15. Complete E2E Flow Finished",
    category: "AUDIT",
    speaker: "SYSTEM",
    text: "End-to-end flow complete from initial Kafka swipe signal to customer voice confirmation, policy freeze, and audit sealing.",
    subtext: "Judges can now inspect the Tactical Call Console, Fraud Management, or Audit Center.",
    badge: "FLOW SUCCESSFUL",
    badgeType: "success",
  },
];

export default function LiveFraudDemoRunner({ onComplete }: { onComplete?: () => void }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeStep = DEMO_STEPS[currentStepIdx];

  // Run automatically when isRunning is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStepIdx < DEMO_STEPS.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx((prev) => prev + 1);
      }, 2500);
    } else if (currentStepIdx >= DEMO_STEPS.length - 1) {
      setIsRunning(false);
      // Trigger card freeze on backend
      fetch("/api/cards/freeze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: "CUST-10045",
          card_id: "CARD-9912",
          reason: "CONFIRMED_FRAUD",
          duration: "24_HOURS",
        }),
      }).catch(console.error);

      // Trigger audit log
      fetch("/api/audit/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_id: "CALL-92831",
          event_type: "CARD_FREEZE_EXECUTED",
          details: "Simulated end-to-end fraud run completed. Card CARD-9912 frozen.",
          speaker: "POLICY_ENGINE",
          policy_rule: "FRAUD-V3.2",
        }),
      }).catch(console.error);

      if (onComplete) onComplete();
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIdx, onComplete]);

  // Handle Speech playback on specific speech steps
  useEffect(() => {
    if (!isOpen) return;

    if (activeStep.speechText) {
      playVoiceStep(activeStep.speechText);
    }
  }, [currentStepIdx, isOpen]);

  const playVoiceStep = async (text: string) => {
    setIsAudioPlaying(true);
    try {
      const res = await fetch("/api/elevenlabs/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice_id: "JBFqnCBsd6RMkjVDRZzb",
          model_id: "eleven_multilingual_v2",
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (audioRef.current) audioRef.current.pause();
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setIsAudioPlaying(false);
        audio.onerror = () => setIsAudioPlaying(false);
        await audio.play();
        return;
      }
    } catch {
      // Fallback
    }

    // Web Speech API fallback
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.onend = () => setIsAudioPlaying(false);
      u.onerror = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(u);
    } else {
      setIsAudioPlaying(false);
    }
  };

  const handleStartDemo = () => {
    setCurrentStepIdx(0);
    setIsRunning(true);
    setIsOpen(true);
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleNextStep = () => {
    if (currentStepIdx < DEMO_STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsRunning(false);
    if (audioRef.current) audioRef.current.pause();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* High-Visibility Runner Trigger Banner */}
      <div className="w-full bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-primary/40 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-xl bg-primary text-black flex items-center justify-center font-bold shadow-lg shadow-primary/30 shrink-0">
            <span className="material-symbols-outlined text-2xl">play_arrow</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                One-Click End-to-End Fraud Intervention Demo
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary border border-primary/30 uppercase">
                STAGE 2 MVP
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
              Execute the complete 15-step governed sequence: Kafka swipe signal $\rightarrow$ ML scoring $\rightarrow$ ElevenLabs Multilingual call $\rightarrow$ Zero-secret verification $\rightarrow$ Policy Engine $\rightarrow$ Card freeze $\rightarrow$ Case creation $\rightarrow$ Merkle audit.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 z-10 w-full md:w-auto shrink-0">
          <button
            onClick={handleStartDemo}
            className="flex-1 md:flex-initial px-5 py-2.5 bg-primary hover:bg-primary-fixed text-on-primary font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">
              bolt
            </span>
            <span>RUN LIVE FRAUD DEMO</span>
          </button>

          <Link
            href="/dashboard/calls/92831"
            className="px-3.5 py-2.5 bg-surface-container hover:bg-surface-container-high text-white font-mono text-xs rounded-xl border border-surface-variant/30 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-primary">visibility</span>
            <span className="hidden sm:inline">Tactical Console</span>
          </Link>
        </div>
      </div>

      {/* Interactive Step-By-Step Simulation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-surface-container-low border border-surface-variant/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-surface-container-lowest border-b border-surface-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-lg">timeline</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">
                    END-TO-END FRAUD INTERVENTION EXECUTION RUNNER
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-outline">
                    <span>STEP {activeStep.id} OF {DEMO_STEPS.length}</span>
                    <span>•</span>
                    <span className="text-primary font-semibold">{activeStep.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-outline hover:text-white hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-container h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentStepIdx + 1) / DEMO_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Active Step Presentation Canvas */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Highlight Card */}
              <div className="bg-surface-container border border-surface-variant/40 rounded-xl p-5 shadow-inner relative overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {activeStep.title}
                  </span>
                  {activeStep.badge && (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        activeStep.badgeType === "error"
                          ? "bg-error text-white animate-pulse"
                          : activeStep.badgeType === "warning"
                          ? "bg-tertiary/20 text-tertiary"
                          : activeStep.badgeType === "success"
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "bg-surface-container-highest text-white"
                      }`}
                    >
                      {activeStep.badge}
                    </span>
                  )}
                </div>

                <div className="text-base text-white font-semibold leading-relaxed mb-2">
                  {activeStep.text}
                </div>

                {activeStep.subtext && (
                  <p className="text-xs font-mono text-on-surface-variant leading-normal bg-surface-container-lowest/60 p-3 rounded-lg border border-surface-variant/20">
                    {activeStep.subtext}
                  </p>
                )}

                {/* Voice Audio Spectrogram Animation */}
                {activeStep.speechText && (
                  <div className="mt-4 p-3 bg-surface-container-lowest rounded-lg border border-primary/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary">
                      <span className="material-symbols-outlined text-base">record_voice_over</span>
                      <span>ElevenLabs Audio Turn ({activeStep.voiceLang === "ur" ? "Urdu Dialect" : "English"})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[4, 12, 8, 16, 20, 14, 8, 18, 12, 6, 14, 8].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-primary rounded-full animate-pulse"
                          style={{
                            height: isAudioPlaying ? `${h}px` : "4px",
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => playVoiceStep(activeStep.speechText!)}
                      className="px-2.5 py-1 bg-primary text-black rounded text-[11px] font-mono font-bold hover:brightness-110 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">replay</span>
                      <span>Replay</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Step Sequence Timeline Preview */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase font-bold text-outline">
                  Automated Pipeline Sequence
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 font-mono text-[10px]">
                  {DEMO_STEPS.map((s, idx) => {
                    const isPassed = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div
                        key={s.id}
                        onClick={() => {
                          setCurrentStepIdx(idx);
                          setIsRunning(false);
                        }}
                        className={`p-2 rounded-lg cursor-pointer transition-all border text-center truncate ${
                          isCurrent
                            ? "bg-primary text-black font-bold border-primary shadow-md"
                            : isPassed
                            ? "bg-surface-container border-primary/30 text-primary"
                            : "bg-surface-container-lowest text-outline border-surface-variant/20 hover:border-surface-variant/40"
                        }`}
                      >
                        <span className="block truncate">{s.id}. {s.category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Controls Footer */}
            <div className="p-4 bg-surface-container-lowest border-t border-surface-variant/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIdx === 0}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-white text-xs font-mono rounded-lg border border-surface-variant/30 disabled:opacity-30"
                >
                  ← Prev
                </button>
                <button
                  onClick={handlePauseResume}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-white text-xs font-mono rounded-lg border border-surface-variant/30 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">
                    {isRunning ? "pause" : "play_arrow"}
                  </span>
                  <span>{isRunning ? "Pause Auto-Run" : "Resume Auto-Run"}</span>
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIdx === DEMO_STEPS.length - 1}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-white text-xs font-mono rounded-lg border border-surface-variant/30 disabled:opacity-30"
                >
                  Next →
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-xs font-mono text-outline hover:text-white transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/dashboard/calls/92831");
                  }}
                  className="px-3.5 py-1.5 bg-primary text-black font-bold text-xs font-mono rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  <span>Inspect Call Console (#92831)</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/dashboard/audit");
                  }}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-white text-xs font-mono rounded-lg border border-surface-variant/30"
                >
                  Audit Ledger
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
