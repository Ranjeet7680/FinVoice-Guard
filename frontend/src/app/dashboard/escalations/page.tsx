"use client";

import React from "react";
import Link from "next/link";

export default function HumanEscalationsPage() {
  const escalations = [
    { id: "ESC-901", callId: "92831", customer: "Ahmed Khan", trigger: "Card Replacement & Loss Dispute", desk: "Tier-2 Financial Crime", specialist: "Tariq Al-Hashimi", time: "18:05 GST", state: "Live In-Progress" },
    { id: "ESC-902", callId: "92828", customer: "Liam Smith", trigger: "Unrecognized POS Terminal (UK)", desk: "Fraud Investigation", specialist: "Sarah Jenkins", time: "17:30 GST", state: "Pending Specialist" },
    { id: "ESC-903", callId: "92822", customer: "Rashid Al-Maktoum", trigger: "Hardship Protection Claim (Article 14)", desk: "Vulnerability Desk", specialist: "Mona Mansoor", time: "17:42 GST", state: "Under Review" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary">
              <span className="material-symbols-outlined text-sm">support_agent</span>
              <span className="tracking-widest uppercase">Human-in-the-Loop Gateway (H)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Human Escalations & Specialist Bridge
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Deterministic handoff queue when customers request irreversible actions, claim fraud disputes, or trigger vulnerability and stress thresholds.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Escalation ID</th>
                <th className="py-3 px-4">Call Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Trigger Reason</th>
                <th className="py-3 px-4">Assigned Desk</th>
                <th className="py-3 px-4">Specialist</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20 font-body-sm">
              {escalations.map((esc) => (
                <tr key={esc.id} className="hover:bg-surface-container/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-tertiary">{esc.id}</td>
                  <td className="py-3.5 px-4 font-mono text-outline">#{esc.callId}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{esc.customer}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{esc.trigger}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">{esc.desk}</td>
                  <td className="py-3.5 px-4 text-primary font-medium">{esc.specialist}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
                      {esc.state}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/dashboard/calls/${esc.callId}`} className="text-xs font-mono text-primary hover:underline">
                      Join Audio Bridge →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
