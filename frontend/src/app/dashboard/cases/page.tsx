"use client";

import React from "react";
import Link from "next/link";

export default function CasesPage() {
  const cases = [
    { id: "CAS-99214", customer: "Ahmed Khan", type: "Fraud Dispute (London POS)", priority: "Critical", status: "Specialist Assigned", assigned: "Tariq Al-Hashimi", time: "18:05 GST" },
    { id: "CAS-99215", customer: "Rashid Al-Maktoum", type: "Collections Hardship Pause", priority: "Medium", status: "Active 30D Hold", assigned: "Automated Rule", time: "17:42 GST" },
    { id: "CAS-99216", customer: "Fatima Al-Zahra", type: "Clinical Pre-Auth Scan", priority: "High", status: "Clinician Co-Signed", assigned: "Dr. Sarah Al-Nuaimi", time: "17:58 GST" },
    { id: "CAS-99217", customer: "Sunita Sharma", type: "Remittance Inquiry (Urdu)", priority: "Low", status: "Resolved by AI", assigned: "FinVoice AI", time: "16:30 GST" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">fact_check</span>
              <span className="tracking-widest uppercase">Multi-Call Persistent Context</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Case Management & Difficult Moments
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Unified cross-channel case tracking maintaining conversational state, bereavement and dispute documents, and human handoff context.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Specialist</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{c.id}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{c.customer}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{c.type}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-xs ${
                      c.priority === "Critical" ? "bg-error-container text-on-error-container font-bold" :
                      c.priority === "High" ? "bg-tertiary/20 text-tertiary font-bold" :
                      "bg-surface-container text-outline"
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-on-surface">{c.status}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{c.assigned}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href="/dashboard/calls/92831" className="text-xs font-mono text-primary hover:underline">
                      View Console →
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
