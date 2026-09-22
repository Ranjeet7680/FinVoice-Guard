"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import WelcomeScreen from "@/components/WelcomeScreen";
import FinVoiceLogo from "@/components/brand/FinVoiceLogo";
import LiveVoiceIntercomModal from "@/components/voice/LiveVoiceIntercomModal";

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showVoiceIntercom, setShowVoiceIntercom] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi (हिन्दी)");
  const [playingLangAudio, setPlayingLangAudio] = useState<string | null>(null);
  const langAudioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-launch Welcome/Boot screen on first visit per session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyWelcomed = sessionStorage.getItem("finvoice_welcomed");
      if (!alreadyWelcomed) {
        setShowWelcome(true);
      }
    }
  }, []);

  const languages = [
    { code: "en", name: "English", sample: "Hello, I am calling from the security division regarding an unauthorized £920 transaction alert on your card.", translation: "Native dialect, standard RP", intent: "OUTBOUND_FRAUD_ALERT", confidence: "99.4%" },
    { code: "ar", name: "Arabic (العربية)", sample: "مرحباً، أنا أتصل بخصوص تنبيه أمني عاجل لحسابكم المصرفي. هل قمتم بهذه المعاملة في لندن؟", translation: "Gulf dialect (UAE / KSA)", intent: "FRAUD_VERIFICATION", confidence: "99.1%" },
    { code: "ur", name: "Urdu (اردو)", sample: "السلام علیکم، میں آپ کے بینک کا خودکار حفاظتی وائس اسسٹنٹ ہوں۔ ہم نے لندن میں 920 پاؤنڈ کا مشکوک ٹرانزیکشن دیکھا ہے۔", translation: "Standard Urdu with regional nuance", intent: "ANOMALY_DETECTION", confidence: "98.9%" },
    { code: "hi", name: "Hindi (हिन्दी)", sample: "मेरा कार्ड अभी किसी और ने इस्तेमाल किया है। लंदन में £920 का मैसेज आया! तुरंत रोकें।", translation: "High confidence intent detection", intent: "CONFIRM_FRAUD", confidence: "98.4%" },
    { code: "ml", name: "Malayalam (മലയാളം)", sample: "നിങ്ങളുടെ കാർഡിലെ സംശയാസ്പദമായ ഇടപാട് സംബന്ധിച്ചാണ് വിളിക്കുന്നത്. ദയവായി സുരക്ഷാ സ്ഥിരീകരണം നൽകുക.", translation: "Kerala expat banking segment", intent: "FRAUD_VERIFY", confidence: "97.8%" },
    { code: "bn", name: "Bengali (বাংলা)", sample: "আপনার অ্যাকাউন্টে একটি জরুরি নিরাপত্তা সতর্কতার জন্য কল করছি। এই লেনদেনটি আপনি করেছেন?", translation: "Remittance & salary card cohort", intent: "FRAUD_VERIFY", confidence: "98.2%" },
    { code: "ta", name: "Tamil (தமிழ்)", sample: "உங்கள் கணக்கில் ஏற்பட்ட சந்தேகத்திற்கிடமான பரிவர்த்தனை குறித்து அழைக்கிறேன். இதை சரிபார்க்கவும்.", translation: "Corporate payroll verified", intent: "SECURITY_CHECK", confidence: "98.0%" },
    { code: "tl", name: "Tagalog", sample: "Tumatawag ako ukol sa security alert sa inyong card. Pakikumpirma kung inyo ang £920 transaction.", translation: "Remittance servicing profile", intent: "FRAUD_VERIFY", confidence: "98.5%" }
  ];

  const currentLangObj = languages.find((l) => l.name === selectedLanguage) || languages[3];

  const handlePlayLanguageAudio = async (sampleText: string, langCode: string) => {
    if (playingLangAudio === langCode) {
      if (langAudioRef.current) langAudioRef.current.pause();
      setPlayingLangAudio(null);
      return;
    }

    setPlayingLangAudio(langCode);
    try {
      const res = await fetch("/api/voice/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sampleText,
          voice_id: "JBFqnCBsd6RMkjVDRZzb",
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (langAudioRef.current) langAudioRef.current.pause();
        const audio = new Audio(url);
        langAudioRef.current = audio;
        audio.onended = () => setPlayingLangAudio(null);
        audio.onerror = () => setPlayingLangAudio(null);
        await audio.play();
      } else {
        setPlayingLangAudio(null);
      }
    } catch {
      setPlayingLangAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F5F7FA] selection:bg-[#19D3AE] selection:text-[#00382C]">
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
      <LiveVoiceIntercomModal isOpen={showVoiceIntercom} onClose={() => setShowVoiceIntercom(false)} />

      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#07111F]/90 backdrop-blur-xl border-b border-[#243746]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <FinVoiceLogo variant="horizontal" size="sm" animated={true} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#91A4B7]">
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#governance" className="hover:text-white transition-colors">Governance</a>
            <a href="#multilingual" className="hover:text-white transition-colors">Multilingual AI</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#canvas" className="hover:text-[#19D3AE] transition-colors flex items-center gap-1">
              <span>Architecture</span>
              <span className="text-[10px] bg-[#19D3AE]/15 text-[#19D3AE] px-1.5 py-0.5 rounded font-mono">CANVAS</span>
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setShowWelcome(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#91A4B7] bg-[#0D1B2A] border border-[#243746] hover:text-[#19D3AE] transition-colors cursor-pointer"
              title="Run Boot Sequence"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Boot Sequence</span>
            </button>

            <button
              onClick={() => setShowVoiceIntercom(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-[#19D3AE] bg-[#19D3AE]/15 border border-[#19D3AE]/40 hover:bg-[#19D3AE]/25 transition-all cursor-pointer shadow-[0_0_15px_rgba(25,211,174,0.2)]"
              title="Launch Live Voice Intercom"
            >
              <span className="material-symbols-outlined text-sm animate-pulse">mic</span>
              <span>Live Voice Intercom</span>
            </button>

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white hover:text-[#19D3AE] transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-semibold text-sm rounded-lg shadow-[0_0_20px_rgba(25,211,174,0.3)] transition-all flex items-center gap-1.5"
            >
              <span>Command Center</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowVoiceIntercom(true)}
              className="p-2 rounded-lg bg-[#19D3AE]/15 border border-[#19D3AE]/40 text-[#19D3AE]"
              title="Live Voice"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D1B2A] border border-[#243746] text-white"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07111F] border-b border-[#243746] px-6 py-5 flex flex-col gap-4 animate-fade-in">
            <nav className="flex flex-col gap-3 text-sm font-medium text-[#91A4B7]">
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Solutions
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#governance"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Governance
              </a>
              <a
                href="#multilingual"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Multilingual AI
              </a>
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-1 transition-colors"
              >
                Security
              </a>
              <a
                href="#canvas"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#19D3AE] py-1 transition-colors flex items-center justify-between"
              >
                <span>Architecture</span>
                <span className="text-[10px] bg-[#19D3AE]/15 text-[#19D3AE] px-2 py-0.5 rounded font-mono">CANVAS</span>
              </a>
            </nav>

            <div className="pt-3 border-t border-[#243746] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowVoiceIntercom(true);
                }}
                className="w-full py-2.5 bg-[#19D3AE]/15 border border-[#19D3AE]/40 text-[#19D3AE] font-bold text-xs rounded-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">mic</span>
                <span>Launch Live Voice Intercom</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowWelcome(true);
                }}
                className="w-full py-2 bg-[#0D1B2A] border border-[#243746] text-[#91A4B7] hover:text-white font-mono text-xs rounded-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Run Boot Sequence</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-[#0D1B2A] text-white text-center font-medium text-xs rounded-lg border border-[#243746]"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-[#19D3AE] text-[#00382C] text-center font-bold text-xs rounded-lg shadow-md"
                >
                  Command Center
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/4 w-[650px] h-[650px] bg-[#19D3AE]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#00A2FD]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1B2A] border border-[#19D3AE]/30 text-xs font-mono text-[#19D3AE] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#19D3AE] animate-pulse" />
                <span>CBUAE REG-604/2026 AUDIT COMPLIANT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Voice AI for Financial Workflows That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D3AE] via-[#5BFBD4] to-[#00A2FD]">Demand Trust.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#91A4B7] leading-relaxed max-w-2xl mb-8">
                Multilingual voice agents for fraud intervention, collections, insurance workflows and everyday servicing — governed by approved policies and backed by complete auditability.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => setShowVoiceIntercom(true)}
                  className="px-6 py-3.5 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-bold text-base rounded-lg shadow-[0_0_30px_rgba(25,211,174,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">mic</span>
                  <span>Talk with Voice Agent (Live)</span>
                </button>

                <Link
                  href="/onboarding"
                  className="px-6 py-3.5 bg-[#0D1B2A] hover:bg-[#11263A] text-white font-medium text-base rounded-lg border border-[#243746] transition-all flex items-center gap-2"
                >
                  <span>Request Enterprise Demo</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>

                <Link
                  href="/dashboard/calls/92831"
                  className="px-5 py-3.5 bg-[#07111F] hover:bg-[#11263A] text-[#91A4B7] hover:text-white font-medium text-sm rounded-lg border border-[#243746] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-[#19D3AE]">play_circle</span>
                  <span>Inspect Call #92831</span>
                </Link>
              </div>

              {/* Live Status Ticker */}
              <div className="flex items-center gap-6 text-xs font-mono text-[#85948E] pt-4 border-t border-[#243746]/60 w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#28C76F]" />
                  <span>Sub-200ms Latency (ElevenLabs v3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#19D3AE]" />
                  <span>Zero-Credential Enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A2FD]" />
                  <span>Fail-Closed Governance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Fraud Intervention Command Center Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0D1B2A] to-[#07111F] border border-[#243746] p-6 shadow-2xl overflow-hidden">
                {/* Header status */}
                <div className="flex items-center justify-between pb-4 border-b border-[#243746]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C] animate-ping" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">LIVE FRAUD INTERVENTION</span>
                  </div>
                  <span className="font-mono text-xs text-[#FF5C5C] bg-[#93000A]/30 px-2 py-0.5 rounded border border-[#FF5C5C]/30">
                    CALL #92831
                  </span>
                </div>

                {/* Body Content */}
                <div className="mt-5 space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-[#91A4B7]">Customer Profile:</span>
                    <span className="text-white font-semibold">Ahmed Khan (CUST-10045)</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-[#91A4B7]">Customer Language:</span>
                    <span className="text-[#19D3AE] font-bold">Urdu (اردو) • 99.1% Sync</span>
                  </div>

                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[#91A4B7]">Fraud ML Risk Score:</span>
                      <span className="text-[#FF5C5C] font-bold">96% CRITICAL</span>
                    </div>
                    <div className="w-full bg-[#11263A] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF5C5C] h-full rounded-full" style={{ width: "96%" }} />
                    </div>
                    <p className="text-[10px] text-[#91A4B7] mt-1">Velocity Anomaly: Dubai Cardholder vs £920 London Swipe</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                      <span className="text-[#91A4B7] block mb-1">Verification:</span>
                      <span className="text-[#28C76F] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Passed (In-App)</span>
                      </span>
                    </div>

                    <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                      <span className="text-[#91A4B7] block mb-1">Approved Action:</span>
                      <span className="text-[#19D3AE] font-bold truncate block">Temporary Freeze</span>
                    </div>
                  </div>

                  {/* Active Audio Waveform Snippet */}
                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#19D3AE] animate-pulse">graphic_eq</span>
                      <span className="text-white font-mono text-[11px]">Stream 04:32</span>
                    </div>
                    <span className="text-[#91A4B7] text-[10px]">HSM Vault Encrypted</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setShowVoiceIntercom(true)}
                    className="py-3 px-3 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(25,211,174,0.35)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">mic</span>
                    <span>Speak with Agent</span>
                  </button>
                  <Link
                    href="/dashboard/calls/92831"
                    className="py-3 px-3 bg-[#11263A] hover:bg-[#19D3AE]/20 text-[#19D3AE] font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 border border-[#19D3AE]/30"
                  >
                    <span>Inspect Console</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section className="py-10 bg-[#0D1B2A] border-y border-[#243746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs text-[#91A4B7] uppercase tracking-widest mb-6">
            BUILT FOR REGULATED FINANCIAL OPERATIONS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm font-semibold text-[#F5F7FA]">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#19D3AE] text-base">account_balance</span>
              <span>Banking</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#19D3AE] text-base">security</span>
              <span>Insurance</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#19D3AE] text-base">credit_card</span>
              <span>Cards & Issuance</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#19D3AE] text-base">payments</span>
              <span>Payments & Wallets</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#19D3AE] text-base">health_and_safety</span>
              <span>Healthcare Payers</span>
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-[#243746]/50">
            <p className="text-sm font-medium text-[#19D3AE]">
              Every conversation. Every decision. Every action. Auditable.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Problem Section */}
      <section className="py-20 lg:py-28 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#FF5C5C] uppercase tracking-wider font-semibold">The Friction</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Financial conversations can&apos;t wait.
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Critical moments require immediate voice intervention, uncompromising policy compliance, and zero language friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProblemCard
              icon="report"
              title="Fraud"
              description="Suspicious transactions require immediate customer intervention before permanent capital loss occurs."
              metric="Sub-30s Urgency"
            />
            <ProblemCard
              icon="account_balance_wallet"
              title="Collections"
              description="Customers need consistent, compliant communication in their own language without harassment or calling-hour violations."
              metric="100% Policy Bound"
            />
            <ProblemCard
              icon="medical_services"
              title="Insurance Pre-Auth"
              description="Rule-based authorization workflows create days of unnecessary waiting for vital clinical procedures."
              metric="Instant Rule Evaluation"
            />
            <ProblemCard
              icon="translate"
              title="Customer Servicing"
              description="Language barriers create friction and long wait times for basic remittance and salary-card inquiries."
              metric="Native Multilingual"
            />
          </div>
        </div>
      </section>

      {/* 5. Solutions Section */}
      <section id="solutions" className="py-20 lg:py-28 bg-[#0D1B2A] border-t border-[#243746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Core Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Governed Voice AI for Critical Financial Workflows
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Deterministic state machines designed for regulated institutions where autonomous decisions must be strictly constrained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Fraud */}
            <div className="bg-[#11263A] border border-[#243746] rounded-2xl p-6 hover:border-[#19D3AE]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FF5C5C]/15 border border-[#FF5C5C]/30 flex items-center justify-center text-[#FF5C5C] mb-4">
                  <span className="material-symbols-outlined text-2xl">emergency</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Fraud Intervention</h3>
                <p className="text-sm text-[#91A4B7] mb-4">Call customers seconds after a risk signal to verify suspicious transactions and execute protective actions.</p>
                <ul className="space-y-2 text-xs font-mono text-[#BACAC3] mb-6">
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Real-time Kafka event triggers</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Multilingual acoustic verification</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Temporary protective card freeze</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Warm human escalation bridge</li>
                </ul>
              </div>
              <Link href="/dashboard/calls/92831" className="text-xs font-bold text-[#19D3AE] flex items-center gap-1 hover:underline">
                <span>Explore Fraud Console</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2: Governed Collections */}
            <div className="bg-[#11263A] border border-[#243746] rounded-2xl p-6 hover:border-[#19D3AE]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F5B942]/15 border border-[#F5B942]/30 flex items-center justify-center text-[#F5B942] mb-4">
                  <span className="material-symbols-outlined text-2xl">credit_score</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Governed Collections</h3>
                <p className="text-sm text-[#91A4B7] mb-4">Enforce calling hours, approved payment restructuring plans, and immediate hardship pause protocols.</p>
                <ul className="space-y-2 text-xs font-mono text-[#BACAC3] mb-6">
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Approved treatment strategies</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Strict calling-hour windows (09:00-20:00)</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Autonomous opt-out termination</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Hardship & vulnerability escalation</li>
                </ul>
              </div>
              <Link href="/dashboard/collections" className="text-xs font-bold text-[#19D3AE] flex items-center gap-1 hover:underline">
                <span>Explore Collections</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 3: Provider Pre-Authorization */}
            <div className="bg-[#11263A] border border-[#243746] rounded-2xl p-6 hover:border-[#19D3AE]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00A2FD]/15 border border-[#00A2FD]/30 flex items-center justify-center text-[#00A2FD] mb-4">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Provider Pre-Authorization</h3>
                <p className="text-sm text-[#91A4B7] mb-4">Instant intake of clinical diagnosis and procedure codes with deterministic policy cross-checks.</p>
                <ul className="space-y-2 text-xs font-mono text-[#BACAC3] mb-6">
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Rule-based ICD-10 clinical evaluation</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Provider telemetry intake</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Automated recommendation generation</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Human medical officer co-sign gate</li>
                </ul>
              </div>
              <Link href="/dashboard/preauth" className="text-xs font-bold text-[#19D3AE] flex items-center gap-1 hover:underline">
                <span>Explore Pre-Auth</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 4: Difficult Moments */}
            <div className="bg-[#11263A] border border-[#243746] rounded-2xl p-6 hover:border-[#19D3AE]/50 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#19D3AE]/15 border border-[#19D3AE]/30 flex items-center justify-center text-[#19D3AE] mb-4">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Difficult Moments</h3>
                <p className="text-sm text-[#91A4B7] mb-4">Empathetic case management for deceased customer estates, bankruptcy, or disputed liabilities.</p>
                <ul className="space-y-2 text-xs font-mono text-[#BACAC3] mb-6">
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Persistent case context tracking</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Multi-call conversational continuity</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Bereavement & legal document intake</li>
                  <li className="flex items-center gap-2"><span className="text-[#19D3AE]">✓</span> Immediate senior specialist routing</li>
                </ul>
              </div>
              <Link href="/dashboard/cases" className="text-xs font-bold text-[#19D3AE] flex items-center gap-1 hover:underline">
                <span>Explore Case Management</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 5: Everyday Servicing */}
            <div className="bg-[#11263A] border border-[#243746] rounded-2xl p-6 hover:border-[#19D3AE]/50 transition-all flex flex-col justify-between shadow-lg md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#5BFBD4]/15 border border-[#5BFBD4]/30 flex items-center justify-center text-[#5BFBD4] mb-4">
                  <span className="material-symbols-outlined text-2xl">support_agent</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Everyday Servicing in 8+ Languages</h3>
                <p className="text-sm text-[#91A4B7] mb-4">High-volume transactional inquiries answered natively without call center queues or language barriers.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#BACAC3] mb-6">
                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-white font-semibold block mb-1">Remittances</span>
                    <span className="text-[#91A4B7]">Cross-border SWIFT/IBAN tracking</span>
                  </div>
                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-white font-semibold block mb-1">Payroll Cards</span>
                    <span className="text-[#91A4B7]">WPS salary credit verification</span>
                  </div>
                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-white font-semibold block mb-1">Branch Services</span>
                    <span className="text-[#91A4B7]">Token appointments & hours</span>
                  </div>
                  <div className="bg-[#07111F] p-3 rounded-lg border border-[#243746]">
                    <span className="text-white font-semibold block mb-1">Zero Secrets</span>
                    <span className="text-[#91A4B7]">Zero PIN/passwords handled</span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard" className="text-xs font-bold text-[#19D3AE] flex items-center gap-1 hover:underline">
                <span>View Servicing Queue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "How It Works" Horizontal Timeline */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Deterministic Execution</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              From Risk Signal to Immutable Audit Trail
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              How a suspicious transaction triggers an automated, governed voice intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            <TimelineNode step="01" title="SIGNAL" desc="Bank Webhook / Kafka detects suspicious £920 London swipe" color="border-[#FF5C5C] text-[#FF5C5C]" />
            <TimelineNode step="02" title="UNDERSTAND" desc="ML Model scores 96% risk; voice agent initiates outbound call" color="border-[#19D3AE] text-[#19D3AE]" />
            <TimelineNode step="03" title="VERIFY" desc="Detects Urdu; executes approved zero-credential biometric check" color="border-[#00A2FD] text-[#00A2FD]" />
            <TimelineNode step="04" title="ACT" desc="Policy permits temporary card freeze; executes Core API call" color="border-[#28C76F] text-[#28C76F]" />
            <TimelineNode step="05" title="ESCALATE" desc="Customer requests replacement; warm handoff to fraud specialist" color="border-[#F5B942] text-[#F5B942]" />
            <TimelineNode step="06" title="AUDIT" desc="Event, transcript & SHA-256 hash locked in sovereign ledger" color="border-[#5BFBD4] text-[#5BFBD4]" />
          </div>
        </div>
      </section>

      {/* 7. Governance Section */}
      <section id="governance" className="py-20 lg:py-28 bg-[#0D1B2A] border-t border-[#243746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Strict Guardrails</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              AI that operates inside the rules.
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Conversational intelligence communicates. Deterministic policy controls. Humans make irreversible financial decisions.
            </p>
          </div>

          {/* Central Policy Flowchart Diagram */}
          <div className="max-w-4xl mx-auto bg-[#07111F] border border-[#243746] rounded-2xl p-8 mb-12 shadow-2xl">
            <div className="flex flex-col items-center">
              {/* Top: AI Agent */}
              <div className="px-6 py-3 rounded-xl bg-[#11263A] border border-[#19D3AE]/40 font-mono text-xs font-bold text-[#19D3AE] flex items-center gap-2 shadow-[0_0_15px_rgba(25,211,174,0.2)]">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>AI VOICE AGENT (ELEVENLABS PLATFORM)</span>
              </div>

              <div className="h-8 w-0.5 bg-[#19D3AE] my-1" />
              <span className="material-symbols-outlined text-[#19D3AE] text-sm -mt-2">arrow_downward</span>

              {/* Center: Policy Engine */}
              <div className="my-2 px-8 py-4 rounded-xl bg-[#19D3AE]/10 border-2 border-[#19D3AE] font-mono text-sm font-bold text-white flex items-center gap-2 shadow-[0_0_25px_rgba(25,211,174,0.25)]">
                <span className="material-symbols-outlined text-lg text-[#19D3AE]">gavel</span>
                <span>CENTRAL POLICY ENGINE (DETERMINISTIC EVALUATION)</span>
              </div>

              <div className="h-8 w-0.5 bg-[#91A4B7] my-1" />

              {/* Bottom 3 Branches */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-2xl text-center font-mono text-xs pt-2">
                <div className="flex flex-col items-center">
                  <div className="w-full py-2.5 rounded bg-[#28C76F]/15 border border-[#28C76F] text-[#28C76F] font-bold">
                    ✓ ALLOW
                  </div>
                  <span className="text-[11px] text-[#91A4B7] mt-1.5">Temporary freeze, reminder, fact answers</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full py-2.5 rounded bg-[#FF5C5C]/15 border border-[#FF5C5C] text-[#FF5C5C] font-bold">
                    ✕ BLOCK
                  </div>
                  <span className="text-[11px] text-[#91A4B7] mt-1.5">Requesting PIN, fund transfers, unverified calls</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full py-2.5 rounded bg-[#F5B942]/15 border border-[#F5B942] text-[#F5B942] font-bold">
                    ⚡ HUMAN (H)
                  </div>
                  <span className="text-[11px] text-[#91A4B7] mt-1.5">Disputes, card replacement, hardship cases</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GovernanceCard
              icon="verified_user"
              title="Approved Actions"
              desc="Only permitted, reversible protective actions are exposed via strict server tools. The agent cannot improvise bank operations."
            />
            <GovernanceCard
              icon="supervised_user_circle"
              title="Human-in-the-Loop"
              desc="Irreversible decisions (permanent card blocking, dispute payouts, cancellations) require qualified bank employees."
            />
            <GovernanceCard
              icon="history_edu"
              title="Complete Auditability"
              desc="Calls, dual-language transcripts, evaluated policy versions, and exact API calls are permanently locked in the Merkle audit tree."
            />
            <GovernanceCard
              icon="vpn_key_off"
              title="No Credential Collection"
              desc="No PINs, passwords, or CVVs are ever requested. The voice agent operates under strict zero-credential regulatory standards."
            />
          </div>
        </div>
      </section>

      {/* 8. Multilingual AI Section */}
      <section id="multilingual" className="py-20 lg:py-28 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Global Reach</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              One platform. Many customer languages.
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Detects and speaks native regional dialects with institutional financial precision and sub-200ms conversational turn-around.
            </p>
          </div>

          {/* Language Selection Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.name)}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  selectedLanguage === lang.name
                    ? "bg-[#19D3AE] text-[#00382C] font-bold shadow-[0_0_15px_rgba(25,211,174,0.3)]"
                    : "bg-[#0D1B2A] text-[#91A4B7] hover:text-white border border-[#243746]"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Interactive Speech Simulation Box */}
          <div className="max-w-3xl mx-auto bg-[#0D1B2A] border border-[#243746] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#243746] font-mono text-xs">
              <span className="text-[#19D3AE] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#19D3AE] animate-ping" />
                <span>ACOUSTIC SPEECH-TO-INTENT ENGINE</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#91A4B7]">Model:</span>
                <span className="text-[#5BFBD4] font-bold">ElevenLabs Multilingual v2</span>
              </div>
            </div>

            <div className="my-6 space-y-4">
              {/* Customer Speech Ingress */}
              <div className="bg-[#07111F] p-4 sm:p-5 rounded-xl border border-[#243746]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#91A4B7] uppercase mb-2">
                  <span>Customer Speech Ingress ({currentLangObj.name})</span>
                  <span className="text-[#19D3AE]">{currentLangObj.translation}</span>
                </div>
                <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                  &ldquo;{currentLangObj.sample}&rdquo;
                </p>

                {/* Audio Player Action Bar */}
                <div className="mt-4 pt-3 border-t border-[#243746]/60 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handlePlayLanguageAudio(currentLangObj.sample, currentLangObj.code)}
                    className="px-4 py-2 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(25,211,174,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {playingLangAudio === currentLangObj.code ? "pause_circle" : "play_circle"}
                    </span>
                    <span>
                      {playingLangAudio === currentLangObj.code
                        ? "Streaming Voice..."
                        : `Listen in ${currentLangObj.name}`}
                    </span>
                  </button>

                  {/* Equalizer Waveform Bars when playing */}
                  {playingLangAudio === currentLangObj.code && (
                    <div className="flex items-center gap-1 h-5">
                      {[40, 75, 90, 60, 100, 50, 85, 45, 95, 65].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-[#19D3AE] rounded-full animate-pulse"
                          style={{
                            height: `${(i % 3 + 1) * 7}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setShowVoiceIntercom(true)}
                    className="text-xs font-mono text-[#19D3AE] hover:underline flex items-center gap-1"
                  >
                    <span>Open Live Voice Intercom</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center text-[#19D3AE]">
                <span className="material-symbols-outlined">arrow_downward</span>
              </div>

              {/* AI Telemetry & Intent */}
              <div className="bg-[#07111F] p-4 rounded-xl border border-[#19D3AE]/40 font-mono text-xs">
                <div className="text-[11px] text-[#19D3AE] uppercase font-bold mb-2">AI Telemetry & Policy Trigger</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div>
                    <span className="text-[#91A4B7] block">Language:</span>
                    <span className="text-white font-bold">{currentLangObj.name}</span>
                  </div>
                  <div>
                    <span className="text-[#91A4B7] block">Extracted Intent:</span>
                    <span className="text-[#FF5C5C] font-bold">{currentLangObj.intent}</span>
                  </div>
                  <div>
                    <span className="text-[#91A4B7] block">Acoustic Sync:</span>
                    <span className="text-[#28C76F] font-bold">{currentLangObj.confidence}</span>
                  </div>
                  <div>
                    <span className="text-[#91A4B7] block">Policy Trigger:</span>
                    <span className="text-[#19D3AE] font-bold">TEMP_FREEZE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Security Section */}
      <section id="security" className="py-20 lg:py-28 bg-[#0D1B2A] border-t border-[#243746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Zero Compromise</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Enterprise-Grade Security Architecture
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Built to comply with the Central Bank of UAE (CBUAE) Consumer Protection & Data Sovereignty Mandates.
            </p>
          </div>

          {/* Encryption Pipeline */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs mb-14 text-center">
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Encrypted Voice</span>
            <span className="text-[#91A4B7]">→</span>
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Encrypted Transcript</span>
            <span className="text-[#91A4B7]">→</span>
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Access Control</span>
            <span className="text-[#91A4B7]">→</span>
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Policy Enforcement</span>
            <span className="text-[#91A4B7]">→</span>
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Audit Logging</span>
            <span className="text-[#91A4B7]">→</span>
            <span className="px-3.5 py-2 rounded-lg bg-[#07111F] border border-[#243746] text-[#19D3AE]">Enterprise SIEM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityCard title="AES-256 HSM Encryption" desc="All telephonic audio streams and conversational transcripts are encrypted at rest and in transit via hardware security module keys." />
            <SecurityCard title="Role-Based Access Control" desc="Strict separation between risk officers, fraud supervisors, and compliance auditors with mandatory hardware MFA." />
            <SecurityCard title="Immutable Merkle Audit Logs" desc="Continuous cryptographic hash chains seal every customer interaction, rule evaluation, and core banking action." />
            <SecurityCard title="Policy Engine Versioning" desc="Complete git-like versioning of institutional policy files with automated regression test runs before deployment." />
            <SecurityCard title="Sovereign Data Isolation" desc="In-country data residency guaranteed on Sovereign Cloud Pod DXB-02 (Dubai, UAE) with zero third-party leakage." />
            <SecurityCard title="Secure API Gateway" desc="Hardened mTLS banking gateway ensuring zero credential or PAN storage on telephonic intermediary nodes." />
          </div>
        </div>
      </section>

      {/* 10. Analytics Section */}
      <section className="py-20 lg:py-28 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#19D3AE] uppercase tracking-wider font-semibold">Operational Telemetry</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Auditable Operational Performance
            </h2>
            <p className="text-sm font-mono text-[#F5B942] mt-2">
              [Note: Below values are illustrative demo metrics for simulated workload verification]
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <MetricCard value="98.2%" label="Verification Success" subtext="Zero PIN challenges" />
            <MetricCard value="42 sec" label="Avg Response Time" subtext="From Kafka risk signal" />
            <MetricCard value="91%" label="AI Resolution Rate" subtext="Approved actions only" />
            <MetricCard value="6,842" label="Calls Processed" subtext="Stage 1 synthetic load" />
            <MetricCard value="0" label="Unauthorized Actions" subtext="Strict fail-closed engine" highlight />
          </div>
        </div>
      </section>

      {/* 11. ElevenLabs Idea Canvas Stage 1 Special Showcase Section */}
      <section id="canvas" className="py-20 lg:py-28 bg-[#0D1B2A] border-t border-[#243746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19D3AE]/15 border border-[#19D3AE]/40 text-xs font-mono text-[#19D3AE] mb-3">
              <span>STAGE 1 SUBMISSION MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              ElevenLabs Idea Canvas — Technical Architecture
            </h2>
            <p className="text-base text-[#91A4B7] mt-3">
              Mapped specifically to Track 1: Banking & Insurance with 3 clearly separated zones, guardrail mechanisms, and fail-closed degradation.
            </p>
          </div>

          {/* Box L Technical Architecture (3 Zones) */}
          <div className="bg-[#07111F] border border-[#243746] rounded-2xl p-8 mb-12 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#243746] mb-6">
              <span className="font-mono text-sm font-bold text-white">BOX L: THREE-ZONE TECHNICAL ARCHITECTURE</span>
              <span className="font-mono text-xs text-[#19D3AE]">● Marked Personal Data Boundaries</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
              {/* Zone 1: Caller / Channel */}
              <div className="bg-[#11263A] border border-[#243746] p-5 rounded-xl">
                <div className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#19D3AE]">call</span>
                  <span>1. CALLER / CHANNEL</span>
                </div>
                <ul className="space-y-2 text-[#BACAC3]">
                  <li>• Sovereign PSTN / SIP Trunk</li>
                  <li>• Native Mobile Banking App</li>
                  <li>• WhatsApp Business API (Alerts)</li>
                  <li className="pt-2 text-[11px] text-[#19D3AE]">● Data Boundary: Voice stream ingress</li>
                </ul>
              </div>

              {/* Zone 2: ElevenLabs Platform */}
              <div className="bg-[#11263A] border border-[#19D3AE]/40 p-5 rounded-xl shadow-[0_0_20px_rgba(25,211,174,0.15)]">
                <div className="text-sm font-bold text-[#19D3AE] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">psychology</span>
                  <span>2. ELEVENLABS PLATFORM</span>
                </div>
                <ul className="space-y-2 text-[#BACAC3]">
                  <li>• Agents Platform Runtime</li>
                  <li>• Agent Workflows (State Machine)</li>
                  <li>• Eleven v3 Multilingual TTS</li>
                  <li>• Scribe v2 Fast STT</li>
                  <li>• Server / Client Tools Gateway</li>
                  <li>• Telephony & Post-Call Webhooks</li>
                  <li className="pt-2 text-[11px] text-[#5BFBD4]">● Data Boundary: Ephemeral tokenization</li>
                </ul>
              </div>

              {/* Zone 3: Institution Systems */}
              <div className="bg-[#11263A] border border-[#243746] p-5 rounded-xl">
                <div className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#00A2FD]">account_balance</span>
                  <span>3. INSTITUTION SYSTEMS</span>
                </div>
                <ul className="space-y-2 text-[#BACAC3]">
                  <li>• Supervised Fraud ML Engine</li>
                  <li>• Central Deterministic Policy DB</li>
                  <li>• Core Banking Card Lock API</li>
                  <li>• Human Fraud Specialist Queue (H)</li>
                  <li>• Immutable Forensics Audit Vault</li>
                  <li className="pt-2 text-[11px] text-[#00A2FD]">● Data Boundary: Private Bank Network</li>
                </ul>
              </div>
            </div>

            {/* Dependency Failure Handling */}
            <div className="mt-6 pt-6 border-t border-[#243746] grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px]">
              <div className="p-3 bg-[#0D1B2A] rounded-lg border border-[#FF5C5C]/30">
                <span className="text-[#FF5C5C] font-bold block mb-1">If ElevenLabs Down:</span>
                <span className="text-[#91A4B7]">Do NOT execute financial action. Create incident and push directly to Human Fraud Queue.</span>
              </div>
              <div className="p-3 bg-[#0D1B2A] rounded-lg border border-[#F5B942]/30">
                <span className="text-[#F5B942] font-bold block mb-1">If Core Banking API Down:</span>
                <span className="text-[#91A4B7]">Agent cannot claim action succeeded. Informs customer request requires specialist follow-up.</span>
              </div>
              <div className="p-3 bg-[#0D1B2A] rounded-lg border border-[#19D3AE]/30">
                <span className="text-[#19D3AE] font-bold block mb-1">If Policy Engine Down:</span>
                <span className="text-[#91A4B7]">Strict FAIL CLOSED. Zero financial action permitted. Immediate human escalation.</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/dashboard/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#11263A] hover:bg-[#19D3AE] hover:text-[#00382C] text-[#19D3AE] font-semibold text-sm rounded-lg border border-[#19D3AE]/40 transition-all shadow-md"
            >
              <span>View Full Stage 1 Idea Canvas Documentation</span>
              <span className="material-symbols-outlined text-base">description</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="py-24 bg-[#07111F] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#19D3AE]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Build financial voice workflows you can trust.
          </h2>
          <p className="text-lg text-[#91A4B7] max-w-2xl mx-auto mb-10">
            Deploy governed voice agents for time-critical banking moments. High accuracy, native multilingual understanding, and zero black-box autonomy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-[#19D3AE] hover:bg-[#5BFBD4] text-[#00382C] font-semibold text-base rounded-lg shadow-[0_0_30px_rgba(25,211,174,0.4)] transition-all flex items-center gap-2"
            >
              <span>Request Enterprise Demo</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#0D1B2A] hover:bg-[#11263A] text-white font-semibold text-base rounded-lg border border-[#243746] transition-all"
            >
              Enter Command Center
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-[#021523] border-t border-[#243746] py-16 text-sm text-[#91A4B7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 mb-12 border-b border-[#243746]/60">
            <Link href="/">
              <FinVoiceLogo variant="horizontal" size="md" animated={false} />
            </Link>
            <p className="max-w-md text-xs font-mono text-[#91A4B7]">
              Sovereign voice compliance engine enforcing CBUAE REG-604/2026 mandates and sub-200ms ElevenLabs conversational AI across financial services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">Solutions</h4>
              <ul className="space-y-2.5">
                <li><Link href="/dashboard/calls/92831" className="hover:text-white transition-colors">Fraud Intervention</Link></li>
                <li><Link href="/dashboard/collections" className="hover:text-white transition-colors">Governed Collections</Link></li>
                <li><Link href="/dashboard/preauth" className="hover:text-white transition-colors">Insurance Pre-Auth</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Everyday Servicing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">Platform</h4>
              <ul className="space-y-2.5">
                <li><Link href="/dashboard/architecture" className="hover:text-white transition-colors">ElevenLabs Voice AI</Link></li>
                <li><Link href="/dashboard/policies" className="hover:text-white transition-colors">Policy Engine</Link></li>
                <li><Link href="/dashboard/traces" className="hover:text-white transition-colors">Agent Traces</Link></li>
                <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Audit Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">Governance</h4>
              <ul className="space-y-2.5">
                <li><Link href="/onboarding" className="hover:text-white transition-colors">CBUAE Compliance</Link></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Zero-Credential Rule</Link></li>
                <li><Link href="/dashboard/audit" className="hover:text-white transition-colors">Merkle Forensics</Link></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Responsible AI Charter</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">Legal & Pod</h4>
              <ul className="space-y-2.5">
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Data Processing (DPA)</Link></li>
                <li className="font-mono text-xs text-[#19D3AE] pt-2">Pod: DXB-02 (Dubai, UAE)</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#243746]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19D3AE]" />
              <span className="text-white">© 2026 FinVoice Guard PJSC. All rights reserved.</span>
            </div>
            <div className="text-[#85948E]">
              Built for ElevenLabs Worldwide Hackathon • Track 1: Banking & Insurance
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProblemCard({ icon, title, description, metric }: { icon: string; title: string; description: string; metric: string }) {
  return (
    <div className="bg-[#0D1B2A] border border-[#243746] rounded-xl p-6 flex flex-col justify-between hover:border-[#19D3AE]/40 transition-colors">
      <div>
        <div className="w-10 h-10 rounded-lg bg-[#11263A] flex items-center justify-center text-[#19D3AE] mb-4">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-[#91A4B7]">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-[#243746]/50 font-mono text-xs text-[#19D3AE]">
        {metric}
      </div>
    </div>
  );
}

function TimelineNode({ step, title, desc, color }: { step: string; title: string; desc: string; color: string }) {
  return (
    <div className="bg-[#0D1B2A] border border-[#243746] rounded-xl p-4 flex flex-col justify-between hover:border-[#19D3AE]/40 transition-colors font-mono">
      <div>
        <div className={`text-xs font-bold ${color} mb-1 flex items-center justify-between`}>
          <span>{step}</span>
          <span>{title}</span>
        </div>
        <p className="text-xs text-[#91A4B7] font-sans mt-2">{desc}</p>
      </div>
    </div>
  );
}

function GovernanceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-[#07111F] border border-[#243746] rounded-xl p-5 hover:border-[#19D3AE]/40 transition-colors">
      <span className="material-symbols-outlined text-2xl text-[#19D3AE] mb-2">{icon}</span>
      <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
      <p className="text-xs text-[#91A4B7] leading-relaxed">{desc}</p>
    </div>
  );
}

function SecurityCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#07111F] border border-[#243746] rounded-xl p-5 hover:border-[#19D3AE]/40 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#19D3AE]" />
        <h4 className="text-base font-bold text-white">{title}</h4>
      </div>
      <p className="text-xs text-[#91A4B7] leading-relaxed">{desc}</p>
    </div>
  );
}

function MetricCard({ value, label, subtext, highlight }: { value: string; label: string; subtext: string; highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-xl border flex flex-col justify-between ${
      highlight
        ? "bg-[#19D3AE]/10 border-[#19D3AE] shadow-[0_0_15px_rgba(25,211,174,0.2)]"
        : "bg-[#0D1B2A] border-[#243746]"
    }`}>
      <div>
        <div className={`text-3xl font-extrabold tracking-tight ${highlight ? "text-[#19D3AE]" : "text-white"}`}>
          {value}
        </div>
        <div className="text-xs font-semibold text-white mt-1">{label}</div>
      </div>
      <div className="text-[11px] font-mono text-[#85948E] mt-3">{subtext}</div>
    </div>
  );
}
