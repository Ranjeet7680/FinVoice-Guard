"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FinVoiceLogo from "@/components/brand/FinVoiceLogo";

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [otp, setOtp] = useState(["7", "4", "9", "2", "8", ""]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-space-md bg-background text-on-surface">
      <div className="flex flex-col w-full max-w-7xl mx-auto py-space-sm px-space-xs md:px-space-md">
        
        {/* Top Global Header / Stage Controller */}
        <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-xl mb-space-lg border border-surface-variant/30">
          <div className="flex items-center gap-space-md">
            <Link href="/" className="h-10 w-auto flex items-center">
              <FinVoiceLogo variant="horizontal" size="sm" animated={true} />
            </Link>
            <div className="h-6 w-px bg-surface-variant hidden sm:block"></div>
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-code-sm text-code-sm text-primary tracking-wider uppercase font-semibold">CBUAE SECURED PROTOCOL</span>
            </div>
          </div>

          {/* Interactive Stage Navigation Tabs */}
          <nav aria-label="Onboarding Stages" className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setStage(1)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                stage === 1 ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                stage === 1 ? "bg-primary text-surface-container-lowest" : "bg-surface-variant text-on-surface"
              }`}>1</span>
              <span>Zero-Trust Login</span>
            </button>
            <button
              onClick={() => setStage(2)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                stage === 2 ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                stage === 2 ? "bg-primary text-surface-container-lowest" : "bg-surface-variant text-on-surface"
              }`}>2</span>
              <span>Hardware 2FA</span>
            </button>
            <button
              onClick={() => setStage(3)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                stage === 3 ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                stage === 3 ? "bg-primary text-surface-container-lowest" : "bg-surface-variant text-on-surface"
              }`}>3</span>
              <span>Org Setup</span>
            </button>
            <button
              onClick={() => setStage(4)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                stage === 4 ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                stage === 4 ? "bg-primary text-surface-container-lowest" : "bg-surface-variant text-on-surface"
              }`}>4</span>
              <span>E-Signature</span>
            </button>
          </nav>
        </header>

        {/* STAGE 1: Enterprise Login */}
        {stage === 1 && (
          <section className="flex flex-col lg:flex-row w-full bg-surface-container-low rounded-xl overflow-hidden shadow-2xl border border-surface-variant/30">
            {/* Left Hero & Brand Shield */}
            <div className="lg:w-5/12 bg-gradient-to-b from-surface-container to-surface-container-lowest p-space-lg lg:p-space-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-space-sm">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-container-high w-fit">
                  <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                  <span className="font-code-sm text-code-sm text-primary uppercase tracking-wider">Enterprise Gateway v4.2</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mt-space-sm">
                  Governed Voice AI for Financial Services
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cryptographically monitored, auditable real-time voice intelligence compliant with institutional mandates.
                </p>
              </div>

              {/* Waveform Animation Element */}
              <div className="my-space-xl flex flex-col items-center justify-center relative z-10">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-30"></div>
                  <div className="absolute inset-2 rounded-full bg-surface-container-high shadow-inner flex items-center justify-center"></div>
                  <svg className="w-32 h-32 relative z-10 text-primary drop-shadow-[0_0_15px_rgba(76,240,201,0.4)]" fill="none" viewBox="0 0 100 100">
                    <path d="M50 8L18 22V46C18 67 31.8 86.4 50 92C68.2 86.4 82 67 82 46V22L50 8Z" fill="#001d33" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5"></path>
                    <rect className="animate-pulse" fill="currentColor" height="16" rx="2" width="4" x="33" y="42"></rect>
                    <rect className="animate-pulse" fill="currentColor" height="32" rx="2" width="4" x="41" y="34"></rect>
                    <rect className="animate-pulse" fill="#5bfbd4" height="48" rx="2" width="4" x="48" y="26"></rect>
                    <circle cx="50" cy="50" fill="#ffffff" r="3"></circle>
                    <rect className="animate-pulse" fill="currentColor" height="32" rx="2" width="4" x="55" y="34"></rect>
                    <rect className="animate-pulse" fill="currentColor" height="16" rx="2" width="4" x="63" y="42"></rect>
                  </svg>
                </div>
                <div className="mt-space-sm flex items-center gap-2 font-code-sm text-code-sm text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>Acoustic Envelope Guard active</span>
                </div>
              </div>

              {/* Trust Pillars */}
              <div className="relative z-10 pt-space-md bg-surface-container/40 rounded-xl p-space-md">
                <div className="grid grid-cols-2 gap-space-sm text-left">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase">AI Communicates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">policy</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase">Policies Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-sm">supervised_user_circle</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase">Humans Decide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">history_toggle_off</span>
                    <span className="font-label-sm text-label-sm text-on-surface uppercase">Everything Auditable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Login Form */}
            <div className="lg:w-7/12 p-space-lg lg:p-space-xl flex flex-col justify-center bg-surface-container-low">
              <div className="max-w-md w-full mx-auto">
                <div className="mb-space-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">Welcome back</h2>
                    <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">RESTRICTED TERMINAL</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Authenticate through zero-trust access control</p>
                </div>

                <button 
                  onClick={() => setStage(2)}
                  className="w-full flex items-center justify-center gap-space-sm bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface py-3 px-space-md rounded-lg font-headline-sm text-headline-sm mb-space-md border border-surface-variant/40"
                >
                  <span className="material-symbols-outlined text-secondary-container">domain_verification</span>
                  <span>Enterprise SSO (SAML 2.0 / Okta / Azure AD)</span>
                </button>

                <div className="flex items-center gap-space-md my-space-md">
                  <div className="h-px bg-surface-variant flex-1"></div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">or dual-key credential</span>
                  <div className="h-px bg-surface-variant flex-1"></div>
                </div>

                <form className="space-y-space-md" onSubmit={(e) => { e.preventDefault(); setStage(2); }}>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">Work email</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">alternate_email</span>
                      <input 
                        className="w-full bg-surface-container text-on-surface font-body-md text-body-md pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container-high focus:text-primary transition-all border border-surface-variant/30" 
                        type="email" 
                        defaultValue="r.kumar@abcfinancial.ae"
                      />
                      <span className="material-symbols-outlined absolute right-3 text-primary text-base">check_circle</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-label-md text-label-md text-on-surface">Password</label>
                      <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">key</span>
                      <input 
                        className="w-full bg-surface-container text-on-surface font-body-md text-body-md pl-10 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-surface-variant/30" 
                        type="password" 
                        defaultValue="enterprise-pki-pass"
                      />
                      <button className="absolute right-3 text-on-surface-variant hover:text-on-surface flex items-center" type="button">
                        <span className="material-symbols-outlined text-base">visibility_off</span>
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="grid grid-cols-4 gap-1.5 flex-1">
                        <div className="h-1 rounded bg-primary"></div>
                        <div className="h-1 rounded bg-primary"></div>
                        <div className="h-1 rounded bg-primary"></div>
                        <div className="h-1 rounded bg-primary"></div>
                      </div>
                      <span className="font-code-sm text-code-sm text-primary">Military Grade (256-bit)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-4 h-4 rounded bg-surface-container accent-primary" type="checkbox"/>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Remember this enterprise terminal</span>
                    </label>
                    <span className="font-code-sm text-code-sm text-on-surface-variant">IP: 194.170.82.11 (AE)</span>
                  </div>

                  <button className="w-full bg-primary hover:bg-primary-fixed transition-all text-on-primary font-headline-sm text-headline-sm py-3 px-space-md rounded-lg flex items-center justify-center gap-2 shadow-lg mt-space-sm" type="submit">
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </form>

                <div className="mt-space-lg pt-space-md text-center bg-surface-container-lowest/50 rounded-lg p-space-sm border border-surface-variant/20">
                  <p className="font-code-sm text-code-sm text-on-surface-variant">
                    Session encrypted under HSM Vault SHA-384. Direct access audited under CBUAE Compliance Rule 2024-C3.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 2: 2FA / OTP Verification */}
        {stage === 2 && (
          <section className="flex flex-col items-center justify-center w-full min-h-[560px] bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden border border-surface-variant/30">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-md w-full bg-surface-container p-space-lg md:p-space-xl rounded-xl shadow-xl relative z-10 text-center border border-surface-variant/30">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-space-md shadow-[0_0_20px_rgba(76,240,201,0.2)]">
                <span className="material-symbols-outlined text-3xl">phonelink_lock</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">Verify your identity</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                We have sent a cryptographic verification token to <br/>
                <span className="font-code-md text-code-md text-on-surface font-semibold">r••••••@abcfinancial.ae</span> and your registered security key.
              </p>

              {/* 6 Digit PIN Boxes */}
              <div className="flex justify-center items-center gap-2 sm:gap-3 mb-space-lg">
                {otp.map((digit, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 3 && <span className="text-surface-variant font-bold text-xl">-</span>}
                    <input
                      id={`otp-input-${idx}`}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center font-display-lg text-headline-lg bg-surface-container-lowest text-primary rounded-lg focus:outline-none focus:bg-surface-container-high transition-all border border-surface-variant/40"
                      maxLength={1}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-center gap-2 mb-space-lg text-on-surface-variant font-code-sm text-code-sm">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Resend code in <strong className="text-tertiary">00:42</strong></span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-space-sm">
                <button 
                  className="w-full bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm py-3 px-space-md rounded-lg flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => setStage(3)}
                >
                  <span>Verify & Proceed</span>
                  <span className="material-symbols-outlined text-base">check</span>
                </button>
                <button 
                  className="w-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md py-2.5 px-space-md rounded-lg flex items-center justify-center gap-2 transition-colors border border-surface-variant/30"
                  onClick={() => setStage(3)}
                >
                  <span className="material-symbols-outlined text-primary-fixed text-base">fingerprint</span>
                  <span>Use hardware security key (FIDO2 / WebAuthn)</span>
                </button>
              </div>

              <div className="mt-space-lg pt-space-sm border-t border-surface-variant/20 flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm">
                <span>Token Hash: 0x88f...c12</span>
                <button className="text-primary hover:underline" onClick={() => setStage(1)}>Change account</button>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 3: Workspace & Security Setup */}
        {stage === 3 && (
          <section className="flex flex-col w-full bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl shadow-2xl border border-surface-variant/30">
            {/* Multi-step Progress Bar */}
            <div className="w-full mb-space-xl">
              <div className="flex items-center justify-between max-w-3xl mx-auto relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high w-full z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary w-2/5 z-0 transition-all duration-500"></div>
                <div className="flex flex-col items-center relative z-10 gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-surface-container-lowest flex items-center justify-center font-code-sm text-code-sm font-bold shadow-[0_0_12px_rgba(76,240,201,0.5)]">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">1. Organization</span>
                </div>
                <div className="flex flex-col items-center relative z-10 gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-surface-container-lowest flex items-center justify-center font-code-sm text-code-sm font-bold shadow-[0_0_12px_rgba(76,240,201,0.5)]">2</div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">2. Security & Policies</span>
                </div>
                <div className="flex flex-col items-center relative z-10 gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-code-sm text-code-sm">3</div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">3. Agreements</span>
                </div>
                <div className="flex flex-col items-center relative z-10 gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-code-sm text-code-sm">4</div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">4. E-Sign</span>
                </div>
                <div className="flex flex-col items-center relative z-10 gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-code-sm text-code-sm">5</div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">5. Complete</span>
                </div>
              </div>
            </div>

            {/* Dual Form Column: Org & Security */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
              {/* Section 1: Org */}
              <div className="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between shadow-md border border-surface-variant/30">
                <div>
                  <div className="flex items-center gap-2 mb-space-sm">
                    <span className="material-symbols-outlined text-primary">corporate_fare</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Organization Profile</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Institutional details registered for sovereign telephonic routing.</p>
                  
                  <div className="space-y-space-md">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Organization Legal Name</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-surface-variant/30" defaultValue="ABC Financial Services PJSC"/>
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Industry Classification</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-surface-variant/30" readOnly defaultValue="Retail Banking & Wealth Management"/>
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Regulatory Jurisdiction</label>
                      <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-lg border border-surface-variant/30">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-secondary-container">account_balance</span>
                          <span className="font-body-md text-body-md text-on-surface font-medium">Central Bank of UAE (CBUAE)</span>
                        </div>
                        <span className="font-code-sm text-code-sm bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">Tier 1 Certified</span>
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Primary Voice Agents</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="bg-surface-container-lowest px-2.5 py-1 rounded text-xs text-primary font-code-sm flex items-center gap-1.5 border border-primary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Fraud Real-Time Alert
                        </span>
                        <span className="bg-surface-container-lowest px-2.5 py-1 rounded text-xs text-secondary font-code-sm flex items-center gap-1.5 border border-secondary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Collections Guard
                        </span>
                        <span className="bg-surface-container-lowest px-2.5 py-1 rounded text-xs text-tertiary font-code-sm flex items-center gap-1.5 border border-tertiary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Remittance Verification
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-space-md pt-space-sm bg-surface-container-lowest/60 p-space-sm rounded-lg flex items-center gap-3 border border-surface-variant/20">
                  <span className="material-symbols-outlined text-primary text-xl">encrypted</span>
                  <p className="font-code-sm text-code-sm text-on-surface-variant">
                    Data residency enforced: Sovereign Cloud Node DXB-02 (Dubai, UAE).
                  </p>
                </div>
              </div>

              {/* Section 2: Security Rules */}
              <div className="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between shadow-md border border-surface-variant/30">
                <div>
                  <div className="flex items-center gap-2 mb-space-sm">
                    <span className="material-symbols-outlined text-secondary">security</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Institutional Security Rules</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Enforce operational friction thresholds and dual-key requirements.</p>
                  
                  <div className="space-y-space-md">
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-variant/30">
                      <div>
                        <p className="font-headline-sm text-headline-sm text-on-surface">Two-Factor Enforcement</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Mandatory MFA for all risk-officer voice interventions</p>
                      </div>
                      <span className="font-code-sm text-code-sm text-primary font-bold">ACTIVE</span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-variant/30">
                      <div>
                        <p className="font-headline-sm text-headline-sm text-on-surface">Session Inactivity Timeout</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Lock active audio eavesdrop console after idle period</p>
                      </div>
                      <div className="flex items-center bg-surface-container px-3 py-1.5 rounded-lg gap-2">
                        <span className="font-code-md text-code-md text-on-surface font-bold">30 min</span>
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">schedule</span>
                      </div>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-variant/30">
                      <div>
                        <p className="font-headline-sm text-headline-sm text-on-surface">Dual-Signoff Protocol</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Irreversible voice killswitch requires 2 risk officers</p>
                      </div>
                      <span className="font-code-sm text-code-sm text-secondary font-bold">ENABLED</span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-variant/30">
                      <div>
                        <p className="font-headline-sm text-headline-sm text-on-surface">Cryptographic Vault Retention</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Immutable voice ledger retention timeframe</p>
                      </div>
                      <span className="font-code-sm text-code-sm text-tertiary bg-tertiary/10 px-2 py-1 rounded">7 Years (Statutory)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-space-lg pt-space-sm">
                  <button 
                    className="px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center gap-1.5"
                    onClick={() => setStage(2)}
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Back</span>
                  </button>
                  <button 
                    className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                    onClick={() => setStage(4)}
                  >
                    <span>Save & Continue to Legal Agreements</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 4: Legal Agreements & E-Sign */}
        {stage === 4 && (
          <section className="flex flex-col w-full bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl shadow-2xl relative border border-surface-variant/30">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-space-md mb-space-lg pb-space-md border-b border-surface-variant/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-code-sm text-code-sm bg-surface-container text-primary px-2.5 py-0.5 rounded font-semibold">DOC ID: FV-AGR-2026-00129</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant">SHA256: e3b0c44298fc1c149afbf4c8...</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">Institutional Master Service Agreement & AI Charter</h2>
              </div>
              <div className="bg-surface-container px-space-md py-2 rounded-lg text-right border border-surface-variant/30">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Designated Signee</p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">Ranjeet Kumar</p>
                <p className="font-code-sm text-code-sm text-primary">Lead Organization Administrator</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Compliance Checklist */}
              <div className="lg:col-span-5 space-y-space-sm">
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-xs font-semibold">Compliance Checklist</h3>
                
                <div className="p-space-sm bg-surface-container rounded-lg flex items-start gap-3 border border-surface-variant/30">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Enterprise Terms of Service</span>
                      <span className="font-code-sm text-code-sm text-primary">ACCEPTED</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Governance binding rules under UAE Federal Law No. 14.</p>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container rounded-lg flex items-start gap-3 border border-surface-variant/30">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Data Processing Agreement (DPA)</span>
                      <span className="font-code-sm text-code-sm text-primary">ACCEPTED</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Zero-storage voice biometrics raw tokenization standard.</p>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container rounded-lg flex items-start gap-3 border border-surface-variant/30">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-medium">CBUAE Responsible AI Charter</span>
                      <span className="font-code-sm text-code-sm text-primary">ACCEPTED</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Automated bias audits and instant unscripted intervention.</p>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container rounded-lg flex items-start gap-3 border border-surface-variant/30">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Sovereign Data Storage Policy</span>
                      <span className="font-code-sm text-code-sm text-primary">ACCEPTED</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">In-country UAE telephonic audio stream isolation.</p>
                  </div>
                </div>
              </div>

              {/* Signature Canvas */}
              <div className="lg:col-span-7 bg-surface-container p-space-lg rounded-xl flex flex-col justify-between border border-surface-variant/30">
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">draw</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Cryptographic Signature Canvas</span>
                    </div>
                    <span className="font-code-sm text-code-sm text-on-surface-variant">Timestamp: 2026-03-30T10:14:22 UTC</span>
                  </div>

                  <div className="w-full h-36 bg-surface-container-lowest rounded-lg p-space-md relative flex items-center justify-center overflow-hidden border border-surface-variant/40">
                    <div className="absolute top-2 left-3 font-code-sm text-code-sm text-on-surface-variant opacity-60">DRAWN SIGNATURE PREVIEW</div>
                    <svg className="w-72 h-24 text-primary" fill="none" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
                      <path className="opacity-90" d="M20 70 C30 20, 45 15, 55 45 C65 75, 80 80, 95 30 C105 20, 115 50, 130 55 C145 60, 160 30, 175 40 C190 50, 200 80, 220 30 C235 25, 250 65, 280 40 C290 35, 305 45, 310 50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                      <path className="opacity-40" d="M45 80 L290 75" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5"></path>
                    </svg>
                    <div className="absolute bottom-2 right-3 font-code-sm text-code-sm text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>PKI Key: RSA-4096 Validated</span>
                    </div>
                  </div>

                  <div className="mt-space-md p-space-sm bg-surface-container-lowest rounded-lg border border-surface-variant/30">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded bg-surface-container accent-primary" type="checkbox"/>
                      <span className="font-body-sm text-body-sm text-on-surface">
                        I, <strong>Ranjeet Kumar</strong>, confirm I hold delegated executive authority under ABC Financial Services PJSC board resolution to execute this legally binding instrument for sovereign AI telephonic operations.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-space-lg pt-space-sm">
                  <button 
                    className="px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center gap-1.5"
                    onClick={() => setStage(3)}
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Edit Workspace</span>
                  </button>
                  <button 
                    className="px-space-xl py-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm flex items-center gap-2 shadow-xl"
                    onClick={() => setShowCompletionModal(true)}
                  >
                    <span className="material-symbols-outlined text-lg">enhanced_encryption</span>
                    <span>Sign & Complete Setup</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Onboarding Complete Modal */}
            {showCompletionModal && (
              <div className="fixed inset-0 bg-surface-dim/90 backdrop-blur-md z-50 flex items-center justify-center p-space-md">
                <div className="max-w-md w-full bg-surface-container p-space-lg md:p-space-xl rounded-xl shadow-2xl text-center relative border border-primary/20">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary mx-auto flex items-center justify-center mb-space-md shadow-[0_0_24px_rgba(76,240,201,0.4)]">
                    <span className="material-symbols-outlined text-4xl">task_alt</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 text-primary font-code-sm text-code-sm font-bold uppercase mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Workspace Active
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">Onboarding Authorized</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                    ABC Financial Services PJSC has been provisioned on Sovereign Pod <strong className="text-on-surface">DXB-02</strong>. All audit ledgers are initialized.
                  </p>
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg mb-space-lg text-left font-code-sm text-code-sm space-y-1 border border-surface-variant/30">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Organization ID:</span>
                      <span className="text-on-surface">ORG-ABC-9402</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>CBUAE Verification:</span>
                      <span className="text-primary font-semibold">COMPLIANT (ART-22)</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Assigned Telephony Channels:</span>
                      <span className="text-on-surface">128 Concurrency</span>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm py-3 px-space-md rounded-lg flex items-center justify-center gap-2 shadow-lg"
                    onClick={() => router.push("/dashboard")}
                  >
                    <span>Enter Command Center</span>
                    <span className="material-symbols-outlined text-base">dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
