"use client";

import React, { useState } from "react";

export default function CollectionsPage() {
  const [optOutStatus, setOptOutStatus] = useState<Record<string, boolean>>({
    "COL-9901": false,
    "COL-9902": false,
    "COL-9903": true
  });

  const handleOptOut = (id: string) => {
    setOptOutStatus(prev => ({ ...prev, [id]: true }));
    alert(`Autonomous opt-out executed for ${id}. record_opt_out() terminated all future automated voice contact.`);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      {/* Header */}
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary">
              <span className="material-symbols-outlined text-sm">credit_score</span>
              <span className="tracking-widest uppercase">Governed Collections Operations</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-code-sm text-code-sm">CBUAE Consumer Protection Mandate</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Collections Guard & Hardship Management
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Strictly governed voice outreach enforcing mandatory calling hours (09:00-20:00 GST), approved repayment restructuring, and immediate hardship pause protocols.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container text-primary font-code-sm text-code-sm border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Calling Window: 09:00 - 20:00 GST Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline uppercase block mb-1">Calling Window Compliance</span>
          <div className="text-2xl font-bold text-primary">100%</div>
          <span className="text-xs text-on-surface-variant mt-1 block">Zero off-hours calls triggered</span>
        </div>
        <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline uppercase block mb-1">Hardship Pauses Active</span>
          <div className="text-2xl font-bold text-tertiary">89 Cases</div>
          <span className="text-xs text-on-surface-variant mt-1 block">30-day statutory forbearance</span>
        </div>
        <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline uppercase block mb-1">Autonomous Opt-Outs</span>
          <div className="text-2xl font-bold text-secondary">100% Instant</div>
          <span className="text-xs text-on-surface-variant mt-1 block">Zero latency suppression</span>
        </div>
        <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline uppercase block mb-1">Human Handoffs</span>
          <div className="text-2xl font-bold text-on-surface">14 Cases</div>
          <span className="text-xs text-on-surface-variant mt-1 block">Vulnerability specialist desk</span>
        </div>
      </div>

      {/* Active Outreach Table */}
      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-surface-variant/20 mb-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">list_alt</span>
            <span>Active Governed Outreach Sessions</span>
          </h3>
          <span className="font-code-sm text-code-sm text-outline">Policy: COLL-CBUAE-2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Delinquency Bucket</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Approved Treatment</th>
                <th className="py-3 px-4">Hardship Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20 font-body-sm">
              <tr className="hover:bg-surface-container/50">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">#COL-9901</td>
                <td className="py-3.5 px-4 font-medium text-white">Rashid Al-Maktoum</td>
                <td className="py-3.5 px-4 text-tertiary font-mono">Day 14 (Early)</td>
                <td className="py-3.5 px-4 text-primary font-mono">Arabic (Gulf)</td>
                <td className="py-3.5 px-4 text-on-surface-variant">Installment Reminder + Fee Waiver Offer</td>
                <td className="py-3.5 px-4">
                  {optOutStatus["COL-9901"] ? (
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-mono text-xs">SUPPRESSED (OPT-OUT)</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-xs">Active Eligible</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {!optOutStatus["COL-9901"] && (
                    <button
                      onClick={() => handleOptOut("COL-9901")}
                      className="px-2.5 py-1 rounded bg-error-container text-on-error-container text-xs font-semibold hover:brightness-110"
                    >
                      Trigger Opt-Out
                    </button>
                  )}
                </td>
              </tr>

              <tr className="hover:bg-surface-container/50">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">#COL-9902</td>
                <td className="py-3.5 px-4 font-medium text-white">Zainab Al-Farsi</td>
                <td className="py-3.5 px-4 text-tertiary font-mono">Day 28 (Mid)</td>
                <td className="py-3.5 px-4 text-primary font-mono">English / Urdu</td>
                <td className="py-3.5 px-4 text-on-surface-variant">3-Month Term Restructuring Schedule</td>
                <td className="py-3.5 px-4">
                  {optOutStatus["COL-9902"] ? (
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-mono text-xs">SUPPRESSED (OPT-OUT)</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-xs">Active Eligible</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {!optOutStatus["COL-9902"] && (
                    <button
                      onClick={() => handleOptOut("COL-9902")}
                      className="px-2.5 py-1 rounded bg-error-container text-on-error-container text-xs font-semibold hover:brightness-110"
                    >
                      Trigger Opt-Out
                    </button>
                  )}
                </td>
              </tr>

              <tr className="hover:bg-surface-container/50">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">#COL-9903</td>
                <td className="py-3.5 px-4 font-medium text-white">Tariq Mansoor</td>
                <td className="py-3.5 px-4 text-error font-mono">Day 45 (Late)</td>
                <td className="py-3.5 px-4 text-primary font-mono">Urdu (اردو)</td>
                <td className="py-3.5 px-4 text-on-surface-variant">Vulnerability Escalation Desk (H)</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-mono text-xs font-bold">HARDSHIP PAUSE (30D)</span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-xs font-mono text-outline">Human Specialist Assigned</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
