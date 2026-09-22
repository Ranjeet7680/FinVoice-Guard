"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<"today" | "24h" | "7d" | "30d">("today");
  const [filterOpen, setFilterOpen] = useState(false);

  // Dynamic telemetry based on timeframe
  const kpiData = {
    today: { calls: "12", fraud: "24", escalations: "7", violations: "0", label: "Today (Live Feed)" },
    "24h": { calls: "89", fraud: "41", escalations: "14", violations: "0", label: "Last 24 Hours" },
    "7d": { calls: "612", fraud: "182", escalations: "52", violations: "0", label: "Past 7 Days" },
    "30d": { calls: "2,419", fraud: "648", escalations: "189", violations: "0", label: "Past 30 Days (Audit)" },
  }[timeframe];

  return (
    <div className="space-y-6 max-w-7xl pb-space-lg text-on-surface">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-surface-variant/20">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Good evening, Ranjeet
          </h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Here&apos;s real-time governed telemetry across your financial voice operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/architecture"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-primary bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">architecture</span>
            <span>Box L Architecture & Canvas</span>
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1.5 text-xs font-mono text-outline bg-surface-container-low px-3 py-1.5 rounded-lg border border-surface-variant/30 hover:border-primary/40 transition-colors"
            >
              <span>Filter:</span>
              <span className="text-white font-semibold">{kpiData.label}</span>
              <span className="material-symbols-outlined text-xs text-primary">arrow_drop_down</span>
            </button>

            {filterOpen && (
              <>
                <div
                  onClick={() => setFilterOpen(false)}
                  className="fixed inset-0 z-30"
                />
                <div className="absolute right-0 mt-1 w-52 bg-surface-container-high border border-surface-variant/40 rounded-xl shadow-2xl py-1 z-40 font-mono text-xs">
                  <div className="px-3 py-1 text-[10px] text-outline uppercase font-bold border-b border-surface-variant/20">
                    Select Interval
                  </div>
                  {[
                    { key: "today", label: "Today (Live Feed)" },
                    { key: "24h", label: "Last 24 Hours" },
                    { key: "7d", label: "Past 7 Days" },
                    { key: "30d", label: "Past 30 Days (Audit)" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setTimeframe(item.key as any);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface-container-highest transition-colors ${
                        timeframe === item.key ? "text-primary font-bold bg-primary/10" : "text-on-surface"
                      }`}
                    >
                      <span>{item.label}</span>
                      {timeframe === item.key && (
                        <span className="material-symbols-outlined text-sm text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Calls"
          value={kpiData.calls}
          trend="+8.4%"
          subtext="128 channels provisioned"
          icon="graphic_eq"
          color="text-primary"
        />
        <KpiCard
          title="Fraud Events"
          value={kpiData.fraud}
          trend="+12.2%"
          subtext="1 critical active"
          icon="emergency"
          color="text-error"
          isDanger
        />
        <KpiCard
          title="Human Escalations (H)"
          value={kpiData.escalations}
          trend="8.1% of total"
          subtext="Warm handoffs armed"
          icon="support_agent"
          color="text-tertiary"
        />
        <KpiCard
          title="Policy Violations"
          value={kpiData.violations}
          trend="100% compliant"
          subtext="Deterministic rule enforcement"
          icon="shield"
          color="text-primary"
          isSuccess
        />
      </div>

      {/* Main Grid: Left Live Ops / Compliance & Right Risk Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Live AI Calls & Compliance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Operations Panel */}
          <div className="bg-surface-container-low border border-surface-variant/30 rounded-xl overflow-hidden shadow-md">
            <div className="p-4 sm:p-5 border-b border-surface-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Live Voice Operations Stream
                </h3>
              </div>
              <Link href="/dashboard/calls/92831" className="text-xs text-primary hover:underline font-mono flex items-center gap-1">
                <span>View Real-Time Console</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                    <th className="py-3 px-4">Call ID</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Customer & Language</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/20 font-body-sm">
                  <CallRow
                    id="#92831"
                    type="Fraud Intervention"
                    customer="Ahmed Khan"
                    lang="Urdu (اردو)"
                    status="Active Live"
                    isDanger
                  />
                  <CallRow
                    id="#92830"
                    type="Governed Collections"
                    customer="Rashid Al-Maktoum"
                    lang="Hindi (हिन्दी)"
                    status="Active Live"
                  />
                  <CallRow
                    id="#92829"
                    type="Everyday Servicing"
                    customer="Fatima Al-Zahra"
                    lang="Arabic (العربية)"
                    status="Active Live"
                  />
                  <CallRow
                    id="#92828"
                    type="Fraud Investigation"
                    customer="Liam Smith"
                    lang="English (UK)"
                    status="Human Escalated (H)"
                    isWarning
                  />
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Compliance Health Widget */}
          <div className="bg-surface-container-low border border-surface-variant/30 rounded-xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                <span>CBUAE Compliance Health Score</span>
              </h3>
              <span className="font-code-sm text-code-sm text-primary bg-primary/10 px-2 py-0.5 rounded">
                Tier-1 Validated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <ComplianceStat label="Policy Compliance" value="100%" subtext="0 breaches / 6,842 calls" />
              <ComplianceStat label="Opt-out Compliance" value="100%" subtext="Instant autonomous killswitch" />
              <ComplianceStat label="Verification Success" value="97.4%" subtext="Zero credential exposure" />
              <ComplianceStat label="Human Escalation" value="8.1%" subtext="Specialist handoff rate" />
            </div>

            <Link
              href="/dashboard/audit"
              className="w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-xs rounded-lg transition-colors border border-surface-variant/30 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-primary">history_edu</span>
              <span>Open Audit Center & Merkle Forensics</span>
            </Link>
          </div>
        </div>

        {/* Right Column (4 cols): Fraud Risk Monitor & Activity Timeline */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Fraud Risk Monitor Card */}
          <div className="bg-surface-container-low border border-error/40 rounded-xl overflow-hidden shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-error" />
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Fraud Risk Monitor</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-error-container text-on-error-container rounded animate-pulse">
                  CRITICAL 96%
                </span>
              </div>
              
              <div className="my-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-outline">Risk Vector Probability</span>
                  <span className="font-bold text-error">0.96 / 1.00</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-error h-2 rounded-full" style={{ width: "96%" }} />
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono mb-4 bg-surface-container p-3 rounded-lg border border-surface-variant/20">
                <div className="flex justify-between"><span className="text-outline">Customer:</span><span className="text-white font-bold">Ahmed Khan (CUST-10045)</span></div>
                <div className="flex justify-between"><span className="text-outline">Event:</span><span className="text-white">Suspicious card transaction</span></div>
                <div className="flex justify-between"><span className="text-outline">Amount:</span><span className="text-error font-bold">£920 (AED 4,500)</span></div>
                <div className="flex justify-between"><span className="text-outline">Anomaly:</span><span className="text-white">POS London vs Cell Dubai</span></div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-lg border border-surface-variant/30 mb-4 text-xs">
                <div className="text-outline mb-1 text-[10px] uppercase font-mono font-bold">Recommended Protective Action</div>
                <div className="font-bold text-primary font-mono">Temporary Card Freeze</div>
                <div className="mt-2 space-y-1 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-primary font-semibold">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    <span>Policy Approved (FRAUD-V3.2)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-tertiary">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                    <span>Customer Verification in progress</span>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard/calls/92831"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-xs font-semibold rounded-lg transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>Open Tactical Call Console</span>
              </Link>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-surface-container-low border border-surface-variant/30 rounded-xl p-5 shadow-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">timeline</span>
              <span>Recent Operations Stream</span>
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <ActivityItem time="18:04:12" text="Fraud event received via Kafka" tag="TRX-9981" />
              <ActivityItem time="18:04:14" text="Risk model scored 96% critical" tag="ML-SCORE" />
              <ActivityItem time="18:04:20" text="AI voice call initiated (SIP 01)" tag="VOICE-OUT" />
              <ActivityItem time="18:04:22" text="Language detected: Urdu (99.1%)" tag="ASR-URDU" />
              <ActivityItem time="18:05:08" text="Temporary card freeze executed" tag="CORE-API" isSuccess />
              <ActivityItem time="18:05:30" text="Warm transfer to Tariq (Tier 2)" tag="HANDOFF-H" isHandoff />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, subtext, icon, color, isDanger, isSuccess }: any) {
  return (
    <div className={`bg-surface-container-low border rounded-xl p-5 shadow-sm flex flex-col justify-between ${
      isDanger ? "border-error/40" : isSuccess ? "border-primary/40" : "border-surface-variant/30"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-outline text-xs font-mono uppercase tracking-wider">{title}</span>
        <div className={`p-1.5 rounded-lg bg-surface-container ${color}`}>
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-extrabold text-white tracking-tight">{value}</h4>
          <span className={`text-xs font-mono font-bold ${trend.startsWith("+") || trend.includes("compliant") ? "text-primary" : "text-tertiary"}`}>
            {trend}
          </span>
        </div>
        <p className="text-[11px] font-mono text-outline mt-1">{subtext}</p>
      </div>
    </div>
  );
}

function CallRow({ id, type, customer, lang, status, isDanger, isWarning }: any) {
  return (
    <tr className="hover:bg-surface-container/50 transition-colors">
      <td className="py-3 px-4 font-mono font-bold text-primary">{id}</td>
      <td className="py-3 px-4 text-white font-medium">{type}</td>
      <td className="py-3 px-4">
        <div className="flex flex-col">
          <span className="text-white text-xs">{customer}</span>
          <span className="text-outline font-mono text-[11px]">{lang}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
          isDanger ? "bg-error-container text-on-error-container" :
          isWarning ? "bg-tertiary/20 text-tertiary" :
          "bg-primary/10 text-primary"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isDanger ? "bg-error animate-pulse" : isWarning ? "bg-tertiary" : "bg-primary animate-pulse"}`} />
          {status}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <Link
          href={`/dashboard/calls/${id.replace("#", "")}`}
          className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs transition-colors border border-surface-variant/30"
        >
          Monitor
        </Link>
      </td>
    </tr>
  );
}

function ComplianceStat({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <div className="p-3 bg-surface-container rounded-lg border border-surface-variant/20">
      <div className="text-[11px] text-outline font-mono mb-1">{label}</div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-[10px] font-mono text-primary mt-0.5 truncate">{subtext}</div>
    </div>
  );
}

function ActivityItem({ time, text, tag, isSuccess, isHandoff }: any) {
  return (
    <div className="flex items-start gap-2.5 py-1 border-b border-surface-variant/10 last:border-0">
      <span className="text-outline text-[11px] font-mono shrink-0 mt-0.5">{time}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs truncate">{text}</p>
      </div>
      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono shrink-0 ${
        isSuccess ? "bg-primary/10 text-primary font-bold" :
        isHandoff ? "bg-tertiary/15 text-tertiary font-bold" :
        "bg-surface-container text-outline"
      }`}>
        {tag}
      </span>
    </div>
  );
}
