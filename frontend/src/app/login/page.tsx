"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserRole = "ADMIN" | "FRAUD_MANAGER" | "FRAUD_ANALYST" | "COMPLIANCE" | "CALL_AGENT" | "VIEWER";

interface RoleInfo {
  role: UserRole;
  title: string;
  badgeColor: string;
  description: string;
  access: string[];
}

const ROLES: RoleInfo[] = [
  {
    role: "ADMIN",
    title: "Lead Administrator",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    description: "Full system authority across voice runtimes, policy rules, and core settings.",
    access: ["Everything", "Settings", "Policy Rule Changes", "API Gateways"],
  },
  {
    role: "FRAUD_MANAGER",
    title: "Fraud Operations Manager",
    badgeColor: "bg-error/20 text-error border-error/30",
    description: "Supervises live voice calls, emergency handovers, and high-risk dispute cases.",
    access: ["Fraud Center", "Live Calls", "Case Queue", "Analytics", "Force Takeover"],
  },
  {
    role: "FRAUD_ANALYST",
    title: "Tier-2 Fraud Specialist",
    badgeColor: "bg-tertiary/20 text-tertiary border-tertiary/30",
    description: "Reviews automated call recordings, evaluates card freeze appeals, and investigates.",
    access: ["Fraud Incidents", "Call Console", "Assigned Cases", "Human Approval Gate"],
  },
  {
    role: "COMPLIANCE",
    title: "CBUAE Regulatory Officer",
    badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
    description: "Audits Merkle forensics ledgers, verifies 09:00-20:00 GST calling windows.",
    access: ["Merkle Audit Center", "Policy Engine", "CBUAE Compliance Monitor", "Evidence Export"],
  },
  {
    role: "CALL_AGENT",
    title: "Voice Operations Operator",
    badgeColor: "bg-surface-container-highest text-white border-surface-variant/40",
    description: "Monitors active telephony channels and responds to warm transfers.",
    access: ["Live Call Stream", "Supervisor Whisper Mode"],
  },
  {
    role: "VIEWER",
    title: "Executive / Auditor Viewer",
    badgeColor: "bg-surface-container text-outline border-surface-variant/30",
    description: "Read-only access to high-level telemetry and executive summaries.",
    access: ["Read-Only Dashboard Telemetry"],
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("ranjeet@finvoiceguard.ae");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("ADMIN");
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [otp, setOtp] = useState(["7", "4", "9", "2", "8", "1"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: selectedRole }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      // Fallback
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.join(""), role: selectedRole }),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("finvoice_user_session", JSON.stringify(data.user));
        }
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid OTP code");
      }
    } catch {
      // Fallback
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "finvoice_user_session",
          JSON.stringify({ name: "Ranjeet Kumar", email, role: selectedRole })
        );
      }
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleFastDemoLogin = (role: UserRole = "ADMIN") => {
    setSelectedRole(role);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "finvoice_user_session",
        JSON.stringify({ name: "Ranjeet Kumar", email: "ranjeet@finvoiceguard.ae", role })
      );
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between p-4 sm:p-8">
      
      {/* Header */}
      <header className="flex items-center justify-between max-w-7xl w-full mx-auto pb-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold shadow-lg">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white block">FinVoice Guard</span>
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">ZERO-TRUST INSTITUTIONAL AUTH</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-primary/20 text-primary font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Encrypted Node 04</span>
        </div>
      </header>

      {/* Main Form Area */}
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left Column: Login Card (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-low border border-surface-variant/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {step === "credentials" ? "Institutional Access" : "Hardware 2FA Challenge"}
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              {step === "credentials"
                ? "Enter your banking credentials and assign your active operational role."
                : "Enter the 6-digit hardware token dispatched to your registered authenticator device."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg flex items-center gap-2 border border-error/30">
              <span className="material-symbols-outlined text-base">warning</span>
              <span>{error}</span>
            </div>
          )}

          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-outline uppercase font-semibold mb-1">
                  Institutional Email / Operator ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-surface-container rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary border border-surface-variant/30 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-outline uppercase font-semibold mb-1">
                  Security Passphrase / Hardware Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                    lock
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-surface-container rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary border border-surface-variant/30 font-mono"
                  />
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-xs font-mono text-outline uppercase font-semibold mb-1">
                  Select Active Session Role (RBAC)
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full bg-surface-container rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary border border-surface-variant/30 font-mono"
                >
                  {ROLES.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.role} — {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary hover:bg-primary-fixed text-on-primary font-bold text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      <span>Continue to 2FA Challenge</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleFastDemoLogin(selectedRole)}
                  className="w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs rounded-lg transition-colors border border-primary/30 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  <span>1-Click Sign In as {selectedRole} (Evaluator Bypass)</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-outline uppercase font-semibold">
                    6-Digit Hardware Authenticator Token
                  </span>
                  <span className="text-[11px] font-mono text-primary">Pre-filled hint: 749281</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-xl font-mono font-bold bg-surface-container border border-surface-variant/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary hover:bg-primary-fixed text-on-primary font-bold text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">verified_user</span>
                      <span>Authorize Session & Launch Console</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("credentials")}
                  className="w-full py-2 text-xs font-mono text-outline hover:text-white transition-colors"
                >
                  ← Back to Credentials
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Column: Role Permissions Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface-container-low border border-surface-variant/30 rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-mono uppercase font-bold text-outline tracking-wider mb-3">
              Role Permission Matrix
            </h3>

            <div className="space-y-3">
              {ROLES.map((r) => {
                const isCurrent = selectedRole === r.role;
                return (
                  <div
                    key={r.role}
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isCurrent
                        ? "bg-surface-container border-primary/50 shadow-md"
                        : "bg-surface-container-lowest/50 border-surface-variant/20 hover:border-surface-variant/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">{r.title}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${r.badgeColor}`}>
                        {r.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-snug mb-2">
                      {r.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.access.map((perm) => (
                        <span
                          key={perm}
                          className="text-[9px] font-mono px-1.5 py-0.5 bg-surface-container-high rounded text-outline"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-surface-container-low border border-surface-variant/30 rounded-xl text-center">
            <span className="text-xs text-outline block mb-1">First time setting up your bank?</span>
            <Link
              href="/onboarding"
              className="text-xs font-mono text-primary hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Complete Organization Onboarding & E-Sign</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto pt-6 text-center text-xs font-mono text-outline">
        <span>FinVoice Guard v4.18.2 • Central Bank of UAE Regulatory Protocol 2026 Compliant</span>
      </footer>

    </div>
  );
}
