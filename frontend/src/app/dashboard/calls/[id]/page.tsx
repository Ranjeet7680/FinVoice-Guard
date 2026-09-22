"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import LiveVoiceIntercomModal from "@/components/voice/LiveVoiceIntercomModal";

export default function TacticalCallConsole() {
  const params = useParams();
  const callId = (params?.id as string) || "92831";

  // Interactive states
  const [timerSeconds, setTimerSeconds] = useState(272); // 04:32
  const [isMuted, setIsMuted] = useState(false);
  const [handoffState, setHandoffState] = useState<"idle" | "connecting" | "completed">("idle");
  const [audioActive, setAudioActive] = useState(true);
  const [showIntercom, setShowIntercom] = useState(false);

  // ElevenLabs Voice Playback states
  const [playingTurn, setPlayingTurn] = useState<number | null>(null);
  const [loadingTurn, setLoadingTurn] = useState<number | null>(null);
  const audioTurnRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, "0");
    const secs = String(totalSecs % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleHandoff = () => {
    setHandoffState("connecting");
    setTimeout(() => {
      setHandoffState("completed");
    }, 1500);
  };

  const playTurn = async (turnIdx: number, text: string, voiceId: string = "JBFqnCBsd6RMkjVDRZzb") => {
    if (playingTurn === turnIdx) {
      if (audioTurnRef.current) {
        audioTurnRef.current.pause();
      }
      setPlayingTurn(null);
      return;
    }

    setLoadingTurn(turnIdx);
    try {
      const res = await fetch("/api/elevenlabs/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice_id: voiceId,
          model_id: "eleven_multilingual_v2",
        }),
      });

      if (!res.ok) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.onstart = () => setPlayingTurn(turnIdx);
          u.onend = () => setPlayingTurn(null);
          window.speechSynthesis.speak(u);
        }
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioTurnRef.current) {
        audioTurnRef.current.pause();
      }
      const audio = new Audio(url);
      audioTurnRef.current = audio;
      audio.onplay = () => setPlayingTurn(turnIdx);
      audio.onended = () => setPlayingTurn(null);
      audio.onerror = () => setPlayingTurn(null);
      await audio.play();
    } catch (e) {
      console.error(e);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.onstart = () => setPlayingTurn(turnIdx);
        u.onend = () => setPlayingTurn(null);
        window.speechSynthesis.speak(u);
      }
    } finally {
      setLoadingTurn(null);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-space-md pb-space-lg text-on-surface">
      
      {/* 1. Console Top Bar */}
      <div className="w-full bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md border border-surface-variant/30">
        
        {/* Left Group: Navigation & Identification */}
        <div className="flex flex-wrap items-center gap-space-md min-w-0">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-space-xs px-space-sm py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors font-code-sm text-code-sm border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-sm text-primary">arrow_back</span>
            <span>Back to Operations</span>
          </Link>
          
          <div className="h-6 w-0.5 bg-surface-container-highest hidden sm:block"></div>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">
                Incident #{callId} — Real-Time Fraud Intervention
              </span>
              <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-code-sm text-code-sm uppercase font-semibold">
                Tier 1 Critical
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-code-sm text-code-sm text-outline">
              <span className="flex items-center gap-1.5 text-error font-medium">
                <span className="h-2 w-2 rounded-full bg-error animate-pulse"></span>
                LIVE AUDIO STREAM
              </span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant">Duration: <span className="font-bold text-on-surface">{formatTime(timerSeconds)}</span></span>
              <span className="text-outline-variant">•</span>
              <span>Latency: <span className="text-primary font-medium">185ms</span></span>
              <span className="text-outline-variant">•</span>
              <span>Enc: <span className="text-on-surface-variant">AES-256 GCM</span></span>
              <span className="text-outline-variant">•</span>
              <span>SIP Trunk 01 (Secured)</span>
            </div>
          </div>
        </div>

        {/* Right Group: Tactical Action Suite */}
        <div className="flex items-center gap-space-xs flex-wrap w-full xl:w-auto justify-end">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center gap-1.5 px-space-sm py-2 rounded font-body-sm text-body-sm transition-colors shadow-sm border border-surface-variant/30 ${
              isMuted ? "bg-error-container text-on-error-container" : "bg-surface-container hover:bg-surface-container-highest text-on-surface"
            }`}
          >
            <span className={`material-symbols-outlined text-base ${isMuted ? "" : "text-tertiary"}`}>
              {isMuted ? "mic" : "mic_off"}
            </span>
            <span>{isMuted ? "Unmute AI" : "Mute AI"}</span>
          </button>
          
          <button 
            onClick={() => alert("Supervisor whisper channel opened on Encrypted SIP Trunk 01.")}
            className="flex items-center gap-1.5 px-space-sm py-2 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors shadow-sm border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-base text-secondary">record_voice_over</span>
            <span>Whisper to Human</span>
          </button>
          
          <button 
            onClick={() => setShowIntercom(true)}
            className="flex items-center gap-1.5 px-space-sm py-2 rounded bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-headline-sm text-body-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base animate-pulse">mic</span>
            <span>Live Voice Intercom</span>
          </button>
          
          <button 
            onClick={() => alert("EMERGENCY TAKEOVER ACTIVATED: AI audio channel severed. Opening supervisor direct microphone channel on Encrypted SIP Trunk 01.")}
            className="flex items-center gap-1.5 px-space-md py-2 rounded bg-primary-container text-on-primary-container font-headline-sm text-body-sm font-semibold hover:brightness-110 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-base">bolt</span>
            <span>Force Human Takeover</span>
          </button>
          
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to terminate this active fraud intervention call?")) {
                alert("Call disconnected. Audit log committed to immutable store.");
              }
            }}
            className="flex items-center gap-1.5 px-space-sm py-2 rounded bg-error-container text-on-error-container font-body-sm text-body-sm font-semibold hover:brightness-110 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-base">call_end</span>
            <span>Terminate</span>
          </button>
        </div>
      </div>

      {/* 2. Three-Panel Tactical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        
        {/* PANEL A: Customer & Risk Context (col-span-3) */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-space-md">
          
          {/* Customer Dossier */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-surface-variant/30">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">Caller Identity</span>
              <span className="flex items-center gap-1 text-primary font-code-sm text-code-sm bg-surface-container px-space-xs py-0.5 rounded border border-primary/20">
                <span className="material-symbols-outlined text-xs">verified</span> verified
              </span>
            </div>
            
            <div className="flex items-center gap-space-sm">
              <div className="h-12 w-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-headline-md text-headline-md font-bold border border-surface-variant/40">
                AK
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Ahmed Khan</h3>
                <span className="font-code-sm text-code-sm text-outline">CUST-10045</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-xs bg-surface-container-lowest p-space-sm rounded-lg mt-space-xs border border-surface-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline">Account Tier</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">Premier Checking</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline">Jurisdiction</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">UAE / Central</span>
              </div>
              <div className="flex flex-col mt-space-xs">
                <span className="font-label-sm text-label-sm text-outline">Verified MSISDN</span>
                <span className="font-code-sm text-code-sm text-on-surface-variant truncate">+971 50 ••• 8492</span>
              </div>
              <div className="flex flex-col mt-space-xs">
                <span className="font-label-sm text-label-sm text-outline">Native Language</span>
                <span className="font-code-sm text-code-sm text-primary truncate">Urdu (اردو)</span>
              </div>
            </div>
          </div>

          {/* Threat Telemetry */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-error-container/30">
            <div className="flex items-center justify-between">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">Threat Telemetry</span>
              <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-code-sm text-code-sm font-bold animate-pulse">96% CRITICAL</span>
            </div>
            
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant">Combined Risk Metric</span>
                <span className="text-error font-semibold">0.96 / 1.00</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-error rounded-full" style={{ width: "96%" }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs mt-space-xs">
              <div className="p-space-sm rounded bg-surface-container flex flex-col gap-1 border border-surface-variant/20">
                <div className="flex items-center gap-1.5 text-error font-code-sm text-code-sm font-semibold">
                  <span className="material-symbols-outlined text-sm">distance</span>
                  <span>Dual Geographic Swipe Velocity</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cardholder physically present in <span className="text-on-surface font-medium">Dubai, UAE</span> via geolocated telecom tower while POS authorization triggered at <span className="text-error font-medium">Harrods, London (£920)</span> 2m 14s prior. Physical impossibility flag triggered.
                </p>
              </div>

              <div className="p-space-sm rounded bg-surface-container flex flex-col gap-1 border border-surface-variant/20">
                <div className="flex items-center gap-1.5 text-tertiary font-code-sm text-code-sm font-semibold">
                  <span className="material-symbols-outlined text-sm">phone_locked</span>
                  <span>Terminal & Device Integrity</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  POS Terminal ID: <span className="font-code-sm text-code-sm text-on-surface">GBR-UK-4481</span> (Unrecognized magnetic trace fallback. Chip signature mismatch).
                </p>
              </div>
            </div>
          </div>

          {/* Approved Challenge Flow */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-surface-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">Active Challenge Flow</span>
              <span className="material-symbols-outlined text-primary text-base">fingerprint</span>
            </div>
            
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container border border-surface-variant/20">
                <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Biometric Handshake</span>
                  <span className="font-code-sm text-code-sm text-primary">99.4% Match Confirmed</span>
                  <span className="font-label-sm text-label-sm text-outline">Acoustic pitch & vocal resonant match #VP-8821.</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container border border-surface-variant/20">
                <span className="material-symbols-outlined text-primary text-base mt-0.5">mark_email_read</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Mobile Push Handshake</span>
                  <span className="font-code-sm text-code-sm text-error font-semibold">Rejected ('Not Me' Selected)</span>
                  <span className="font-label-sm text-label-sm text-outline">Push response via SecureAuth notification #TK-902.</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container border border-surface-variant/20">
                <span className="material-symbols-outlined text-primary text-base mt-0.5">security</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Zero-Credential Rule</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant">Strict Compliance Active</span>
                  <span className="font-label-sm text-label-sm text-outline">Zero PIN, CVV, OTP queries posed over voice.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PANEL B: Audio Visualizer & Synchronous Feed (col-span-6) */}
        <div className="lg:col-span-8 xl:col-span-6 flex flex-col gap-space-md">
          
          {/* Dual-Band Spectrogram */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-surface-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-base animate-pulse">graphic_eq</span>
                <span className="font-code-sm text-code-sm uppercase tracking-wider text-on-surface font-semibold">Dual-Band Frequency Spectrogram</span>
              </div>
              <div className="flex items-center gap-space-md font-code-sm text-code-sm">
                <span className="flex items-center gap-1 text-secondary"><span className="h-2 w-2 rounded-full bg-secondary"></span>AI Agent (Outbound)</span>
                <span className="flex items-center gap-1 text-primary"><span className="h-2 w-2 rounded-full bg-primary"></span>Customer (Inbound)</span>
              </div>
            </div>

            <div className="w-full bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-2 relative overflow-hidden border border-surface-variant/20">
              <div className="flex items-center justify-between text-outline-variant font-code-sm text-code-sm px-1">
                <span>CH1: AI SYNTHESIZER [16kHz PCM / ElevenLabs v3]</span>
                <span className="text-secondary">RMS: -14.2 dBFS</span>
              </div>

              <div className="h-10 w-full flex items-center justify-between gap-0.5">
                <svg className="w-full h-10" fill="none" preserveAspectRatio="none" viewBox="0 0 400 36">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const h = Math.floor(Math.sin(i * 0.4) * 12 + 16);
                    return (
                      <rect 
                        key={i} 
                        fill="#98cbff" 
                        height={h} 
                        opacity={0.7} 
                        rx={1} 
                        width={4} 
                        x={i * 6.6} 
                        y={(36 - h) / 2} 
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center justify-between text-outline-variant font-code-sm text-code-sm px-1 pt-1">
                <span>CH2: CUSTOMER INGRESS [ADPCM 8kHz]</span>
                <span className="text-primary">SNR: 38 dB | STRESS: 78%</span>
              </div>

              <div className="h-10 w-full flex items-center justify-between gap-0.5">
                <svg className="w-full h-10" fill="none" preserveAspectRatio="none" viewBox="0 0 400 36">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const h = Math.floor(Math.cos(i * 0.5) * 14 + 16);
                    return (
                      <rect 
                        key={i} 
                        fill="#4cf0c9" 
                        height={h} 
                        opacity={0.8} 
                        rx={1} 
                        width={4} 
                        x={i * 6.6} 
                        y={(36 - h) / 2} 
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Real-Time Dual-Language Synchronous Feed */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm flex-1 border border-surface-variant/30">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-code-sm text-code-sm uppercase tracking-wider text-outline font-semibold">Dual-Language Synchronous Feed</span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-code-sm text-code-sm font-semibold border border-primary/20">Streaming Ur / En</span>
              </div>
              <span className="font-code-sm text-code-sm text-outline">Latency Sync: <span className="text-primary">±12ms</span></span>
            </div>

            <div className="flex flex-col gap-space-sm overflow-y-auto max-h-[520px] pr-1">
              
              {/* Turn 1: AI */}
              <div className="p-space-sm rounded-lg bg-surface-container flex flex-col gap-1 relative overflow-hidden border border-surface-variant/20">
                <div className="flex items-center justify-between text-secondary font-code-sm text-code-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                    <span>FinVoice Guard (Automated Agent)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTurn(1, "السلام علیکم جناب احمد خان صاحب، میں آپ کے بینک کا خودکار حفاظتی وائس اسسٹنٹ ہوں۔ ہم نے آپ کے کارڈ پر ایک مشکوک ٹرانزیکشن کا اشارہ دیکھا ہے۔", "JBFqnCBsd6RMkjVDRZzb")}
                      className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-xs ${playingTurn === 1 ? "animate-pulse text-primary" : ""}`}>
                        {loadingTurn === 1 ? "progress_activity" : playingTurn === 1 ? "volume_up" : "play_arrow"}
                      </span>
                      <span>{loadingTurn === 1 ? "Synthesizing..." : playingTurn === 1 ? "Playing" : "Speak (ElevenLabs)"}</span>
                    </button>
                    <span className="text-outline">04:02</span>
                  </div>
                </div>
                <p className="text-on-surface font-body-lg text-body-lg text-right font-medium leading-relaxed" dir="rtl" lang="ur">
                  "السلام علیکم جناب احمد خان صاحب، میں آپ کے بینک کا خودکار حفاظتی وائس اسسٹنٹ ہوں۔ ہم نے آپ کے کارڈ پر ایک مشکوک ٹرانزیکشن کا اشارہ دیکھا ہے۔"
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm italic mt-0.5">
                  "Hello Mr. Ahmed Khan, I am your bank's automated security voice assistant. We have detected a suspicious transaction signal on your card."
                </p>
              </div>

              {/* Turn 2: Customer */}
              <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-1 relative overflow-hidden border border-primary/20">
                <div className="flex items-center justify-between text-primary font-code-sm text-code-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>Ahmed Khan (Customer)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTurn(2, "جی ہاں! مجھے ابھی ابھی ایک میسج آیا کہ لندن میں نو سو بیس پاؤنڈ خرچ ہوئے ہیں۔ میں تو دبئی میں ہوں! یہ میں نے نہیں کیا!", "21m00Tcm4TlvDq8ikWAM")}
                      className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-xs ${playingTurn === 2 ? "animate-pulse text-secondary" : ""}`}>
                        {loadingTurn === 2 ? "progress_activity" : playingTurn === 2 ? "volume_up" : "play_arrow"}
                      </span>
                      <span>{loadingTurn === 2 ? "Synthesizing..." : playingTurn === 2 ? "Playing" : "Play Turn"}</span>
                    </button>
                    <span className="text-outline">04:14</span>
                  </div>
                </div>
                <p className="text-on-surface font-body-lg text-body-lg text-right font-medium leading-relaxed" dir="rtl" lang="ur">
                  "جی ہاں! مجھے ابھی ابھی ایک میسج آیا کہ لندن میں £920 خرچ ہوئے ہیں۔ میں تو دبئی میں ہوں! یہ میں نے نہیں کیا!"
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm italic mt-0.5">
                  "Yes! I just received an SMS stating £920 was spent in London. I am in Dubai! This wasn't me!"
                </p>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest text-error font-code-sm text-code-sm font-semibold">Acoustic Stress Index: 88%</span>
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest text-primary font-code-sm text-code-sm font-semibold">Urgency Marker Detected</span>
                </div>
              </div>

              {/* Turn 3: AI */}
              <div className="p-space-sm rounded-lg bg-surface-container flex flex-col gap-1 relative overflow-hidden border border-surface-variant/20">
                <div className="flex items-center justify-between text-secondary font-code-sm text-code-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                    <span>FinVoice Guard (Automated Agent)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTurn(3, "سمجھ گیا۔ ہم نے آپ کے بینکنگ ایپ پر تصدیقی پرامپٹ بھیجا ہے۔ براہ کرم تصدیق کریں کہ کیا آپ نے اسے دیکھا ہے؟", "JBFqnCBsd6RMkjVDRZzb")}
                      className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-xs ${playingTurn === 3 ? "animate-pulse text-primary" : ""}`}>
                        {loadingTurn === 3 ? "progress_activity" : playingTurn === 3 ? "volume_up" : "play_arrow"}
                      </span>
                      <span>{loadingTurn === 3 ? "Synthesizing..." : playingTurn === 3 ? "Playing" : "Speak (ElevenLabs)"}</span>
                    </button>
                    <span className="text-outline">04:22</span>
                  </div>
                </div>
                <p className="text-on-surface font-body-lg text-body-lg text-right font-medium leading-relaxed" dir="rtl" lang="ur">
                  "سمجھ گیا۔ ہم نے آپ کے بینکنگ ایپ پر تصدیقی پرامپٹ بھیجا ہے۔ براہ کرم تصدیق کریں کہ کیا آپ نے اسے دیکھا ہے؟"
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm italic mt-0.5">
                  "Understood. We sent a verification prompt to your banking app. Please confirm if you see it?"
                </p>
              </div>

              {/* Turn 4: Customer */}
              <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-1 relative overflow-hidden border border-primary/20">
                <div className="flex items-center justify-between text-primary font-code-sm text-code-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>Ahmed Khan (Customer)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTurn(4, "ہاں، میں نے ایپ پر ناٹ می دبا دیا ہے۔", "21m00Tcm4TlvDq8ikWAM")}
                      className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-xs ${playingTurn === 4 ? "animate-pulse text-secondary" : ""}`}>
                        {loadingTurn === 4 ? "progress_activity" : playingTurn === 4 ? "volume_up" : "play_arrow"}
                      </span>
                      <span>{loadingTurn === 4 ? "Synthesizing..." : playingTurn === 4 ? "Playing" : "Play Turn"}</span>
                    </button>
                    <span className="text-outline">04:28</span>
                  </div>
                </div>
                <p className="text-on-surface font-body-lg text-body-lg text-right font-medium leading-relaxed" dir="rtl" lang="ur">
                  "ہاں، میں نے ایپ پر 'Not Me' دبا دیا ہے۔"
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm italic mt-0.5">
                  "Yes, I pressed 'Not Me' on the app."
                </p>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-code-sm text-code-sm font-semibold">Mobile Event Match: POS DENIED [Code 401]</span>
                </div>
              </div>

              {/* Turn 5: AI Protective Action */}
              <div className="p-space-sm rounded-lg bg-surface-container flex flex-col gap-1 relative overflow-hidden border border-surface-variant/20">
                <div className="flex items-center justify-between text-secondary font-code-sm text-code-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                    <span>FinVoice Guard (Automated Agent)</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTurn(5, "شکریہ۔ پالیسی کے تحت ہم نے آپ کا کارڈ فوری طور پر عارضی فریز کر دیا ہے۔ مستقل بلاک یا نیا کارڈ جاری کرنے کے لیے میں آپ کو ہمارے سینئر فراڈ اسپیشلسٹ کے پاس منتقل کر رہا ہوں۔", "JBFqnCBsd6RMkjVDRZzb")}
                      className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-xs ${playingTurn === 5 ? "animate-pulse text-primary" : ""}`}>
                        {loadingTurn === 5 ? "progress_activity" : playingTurn === 5 ? "volume_up" : "play_arrow"}
                      </span>
                      <span>{loadingTurn === 5 ? "Synthesizing..." : playingTurn === 5 ? "Playing" : "Speak (ElevenLabs)"}</span>
                    </button>
                    <span className="text-outline">04:31</span>
                  </div>
                </div>
                <p className="text-on-surface font-body-lg text-body-lg text-right font-medium leading-relaxed" dir="rtl" lang="ur">
                  "شکریہ۔ پالیسی کے تحت ہم نے آپ کا کارڈ فوری طور پر عارضی فریز (Temporary Freeze) کر دیا ہے۔ مستقل بلاک یا نیا کارڈ جاری کرنے کے لیے میں آپ کو ہمارے سینئر فراڈ اسپیشلسٹ کے پاس منتقل کر رہا ہوں۔"
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm italic mt-0.5">
                  "Thank you. Under policy we have executed an immediate temporary card freeze. For permanent block or reissue, transferring to senior fraud officer."
                </p>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest text-tertiary font-code-sm text-code-sm font-semibold">Handoff Bridge Armed</span>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* PANEL C: Policy Guardrail & Human Handoff Bridge (col-span-3) */}
        <div className="lg:col-span-12 xl:col-span-3 flex flex-col gap-space-md">
          
          {/* Policy Guardrail Deck */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-surface-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">Policy Guardrail</span>
              <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-code-sm text-code-sm font-semibold border border-primary/20">CBUAE ART-28</span>
            </div>

            <div className="flex items-center gap-space-xs p-space-xs rounded bg-surface-container border border-surface-variant/20">
              <span className="material-symbols-outlined text-primary text-base">gavel</span>
              <div className="flex flex-col min-w-0">
                <span className="font-code-sm text-code-sm text-on-surface font-bold">FRAUD-PROTECT-V3.2</span>
                <span className="font-label-sm text-label-sm text-outline">Urgent Cross-Border Mitigation Script</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs mt-space-xs">
              <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-semibold">Automated Guardrails State</span>
              
              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container-highest border border-surface-variant/30">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">Temporary Card Freeze</span>
                  <span className="font-code-sm text-code-sm text-primary">Executed 18:05:12 UTC</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container-highest border border-surface-variant/30">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">Revoke Mobile Sessions</span>
                  <span className="font-code-sm text-code-sm text-primary">Token Revocation Complete</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container-highest border border-surface-variant/30">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">Flag in Visa Falcon</span>
                  <span className="font-code-sm text-code-sm text-primary">Status: Red Hotlist Active</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container-lowest opacity-75 border border-surface-variant/20">
                <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">lock</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium truncate">Permanent Account Closure</span>
                  <span className="font-code-sm text-code-sm text-tertiary">Requires Human Sign-off</span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs p-space-xs rounded bg-surface-container-lowest opacity-75 border border-surface-variant/20">
                <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">lock</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium truncate">Dispute Claim Reimbursement</span>
                  <span className="font-code-sm text-code-sm text-tertiary">Requires Fraud Officer Auth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Human Handoff Bridge */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-md flex flex-col gap-space-sm border border-surface-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-code-sm text-code-sm text-outline uppercase tracking-wider font-semibold">Human Handoff Bridge</span>
              <span className="flex items-center gap-1 text-primary font-code-sm text-code-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span> Live Queue
              </span>
            </div>

            <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm rounded-lg border border-surface-variant/20">
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-outline">Assigned Desk:</span>
                <span className="text-on-surface font-medium">Tier-2 Financial Crime</span>
              </div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-outline">Regional Hub:</span>
                <span className="text-on-surface">London / Dubai Shared</span>
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs pt-space-xs bg-surface-container p-space-xs rounded border border-surface-variant/20">
                <div className="h-8 w-8 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-headline-sm text-headline-sm font-semibold">
                  TA
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate">Tariq Al-Hashimi</span>
                  <span className="font-code-sm text-code-sm text-primary truncate">Senior Fraud Specialist (Active)</span>
                </div>
              </div>
            </div>

            <div className="p-space-xs rounded bg-surface-container flex flex-col gap-1 font-code-sm text-code-sm border border-surface-variant/20">
              <div className="flex justify-between text-outline">
                <span>Context Payload Sync</span>
                <span className="text-primary font-semibold">100% Ready</span>
              </div>
              <div className="w-full h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
              </div>
              <span className="text-on-surface-variant font-label-sm text-label-sm">Includes: PCM Voice stream, bi-directional transcript, card profile, and risk vectors.</span>
            </div>

            <button 
              disabled={handoffState !== "idle"}
              onClick={handleHandoff}
              className={`w-full py-2.5 px-space-md rounded font-headline-sm text-body-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all mt-space-xs ${
                handoffState === "completed"
                  ? "bg-surface-container-high text-primary"
                  : "bg-primary text-on-primary hover:brightness-110"
              }`}
            >
              {handoffState === "idle" && (
                <>
                  <span className="material-symbols-outlined text-base">phone_forwarded</span>
                  <span>Initiate Warm Handoff (Transfer)</span>
                </>
              )}
              {handoffState === "connecting" && (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Connecting to Tariq Al-Hashimi...</span>
                </>
              )}
              {handoffState === "completed" && (
                <>
                  <span className="material-symbols-outlined text-base">done_all</span>
                  <span>Warm Handoff Complete</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Bottom Compliance & Auditing Bar */}
      <div className="w-full bg-surface-container-low rounded-lg px-space-md py-space-sm shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm border border-surface-variant/30">
        <div className="flex flex-wrap items-center gap-space-md font-code-sm text-code-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-sm">lock</span>
            <span>Audit Hash: <span className="text-on-surface font-mono">sha256:8f92a10be499c8f0012b8d91a</span></span>
          </div>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
            <span>Central Bank Compliance: <span className="text-primary font-medium">Strictly Observed</span></span>
          </div>
          <span className="text-outline-variant hidden md:inline">•</span>
          <span>No Credentials Collected</span>
        </div>
        
        <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-outline">
          <span className="material-symbols-outlined text-sm text-secondary">cloud_done</span>
          <span>Recording Stored in AES-256 UAE Sovereign Vault</span>
        </div>
      </div>

      <LiveVoiceIntercomModal
        isOpen={showIntercom}
        onClose={() => setShowIntercom(false)}
        incidentId={callId}
      />
    </div>
  );
}
