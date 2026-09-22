"use client";

import React, { useState } from "react";

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState("FRAUD-V3.2");
  const [failClosedActive, setFailClosedActive] = useState(true);

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      {/* Header */}
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">gavel</span>
              <span className="tracking-widest uppercase">Institutional Policy Engine</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-code-sm text-code-sm">Deterministic Rule Enforcement</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Policy Engine & Guardrail Governance
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Strict deterministic boundaries separating conversational AI from backend financial tool execution. Evaluates every proposed action before execution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 bg-surface-container rounded-lg border border-surface-variant/30">
              <span className="text-xs font-mono text-outline">Fail-Closed Mode:</span>
              <button
                onClick={() => setFailClosedActive(!failClosedActive)}
                className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all ${
                  failClosedActive ? "bg-primary text-on-primary" : "bg-error text-on-error"
                }`}
              >
                {failClosedActive ? "STRICT ACTIVE (SECURE)" : "OFF (NOT COMPLIANT)"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Policy Engine Flow */}
      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg mb-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">account_tree</span>
          <span>Deterministic Action Interception Architecture</span>
        </h3>

        <div className="flex flex-col items-center max-w-3xl mx-auto py-4">
          <div className="px-6 py-2.5 rounded-lg bg-surface-container border border-primary/40 font-mono text-xs text-primary font-bold">
            AGENT PROPOSES ACTION: e.g. temporary_card_freeze()
          </div>
          <div className="h-6 w-0.5 bg-primary" />
          <div className="px-8 py-3 rounded-xl bg-primary/10 border-2 border-primary font-mono text-sm text-white font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(76,240,201,0.2)]">
            <span className="material-symbols-outlined text-primary">policy</span>
            <span>POLICY ENGINE EVALUATION (POLICY {selectedPolicy})</span>
          </div>
          <div className="h-6 w-0.5 bg-outline" />

          <div className="grid grid-cols-3 gap-4 w-full text-center font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#28C76F]/10 border border-[#28C76F] text-[#28C76F]">
              <span className="font-bold block mb-1">1. ALLOW</span>
              <span className="text-[11px] text-on-surface-variant">Action in allowed_actions & verified</span>
            </div>
            <div className="p-3 rounded-lg bg-[#FF5C5C]/10 border border-[#FF5C5C] text-[#FF5C5C]">
              <span className="font-bold block mb-1">2. BLOCK</span>
              <span className="text-[11px] text-on-surface-variant">In forbidden_actions (PIN, CVV, fund transfer)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F5B942]/10 border border-[#F5B942] text-[#F5B942]">
              <span className="font-bold block mb-1">3. HUMAN GATE (H)</span>
              <span className="text-[11px] text-on-surface-variant">Permanent closure, dispute, hardship</span>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Selector & Code/Rules Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Policies */}
        <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-5 border border-surface-variant/30 shadow-lg space-y-3 font-body-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">Approved Policy Files</h3>
          
          <PolicyTab
            active={selectedPolicy === "FRAUD-V3.2"}
            onClick={() => setSelectedPolicy("FRAUD-V3.2")}
            title="FRAUD-V3.2"
            workflow="Real-Time Fraud Intervention"
            rules="4 Allowed • 4 Forbidden"
          />

          <PolicyTab
            active={selectedPolicy === "COLL-CBUAE-2026"}
            onClick={() => setSelectedPolicy("COLL-CBUAE-2026")}
            title="COLL-CBUAE-2026"
            workflow="Governed Collections"
            rules="Calling window 09:00-20:00 • Opt-out killswitch"
          />

          <PolicyTab
            active={selectedPolicy === "CLIN-PREAUTH-1.4"}
            onClick={() => setSelectedPolicy("CLIN-PREAUTH-1.4")}
            title="CLIN-PREAUTH-1.4"
            workflow="Provider Pre-Authorization"
            rules="Clinical necessity matrix • Clinician co-sign"
          />
        </div>

        {/* Right: Policy Rule Inspector */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-variant/20">
            <div>
              <span className="font-mono text-xs text-primary font-bold">INSPECTOR: {selectedPolicy}.json</span>
              <h2 className="text-xl font-bold text-white mt-1">Rule Definitions & Security Constraints</h2>
            </div>
            <span className="font-mono text-xs bg-surface-container px-3 py-1 rounded text-outline border border-surface-variant/30">
              HASH: sha256:7f991c2...
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Allowed Actions */}
            <div className="p-4 bg-surface-container rounded-xl border border-primary/30">
              <span className="text-xs font-mono font-bold text-primary uppercase block mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Allowed Actions (Permitted)</span>
              </span>
              <ul className="space-y-2 font-mono text-xs text-on-surface">
                <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> temporary_card_freeze</li>
                <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> revoke_mobile_token</li>
                <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> flag_visa_falcon</li>
                <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> create_dispute_ticket</li>
                <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> human_escalation</li>
              </ul>
            </div>

            {/* Strictly Forbidden Actions */}
            <div className="p-4 bg-surface-container rounded-xl border border-error/30">
              <span className="text-xs font-mono font-bold text-error uppercase block mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">block</span>
                <span>Forbidden Actions (Hard Block)</span>
              </span>
              <ul className="space-y-2 font-mono text-xs text-on-surface">
                <li className="flex items-center gap-2 text-error"><span className="font-bold">✕</span> request_customer_pin</li>
                <li className="flex items-center gap-2 text-error"><span className="font-bold">✕</span> request_otp_or_cvv</li>
                <li className="flex items-center gap-2 text-error"><span className="font-bold">✕</span> permanent_account_closure</li>
                <li className="flex items-center gap-2 text-error"><span className="font-bold">✕</span> execute_unverified_transfer</li>
                <li className="flex items-center gap-2 text-error"><span className="font-bold">✕</span> modify_cardholder_msisdn</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-variant/30 font-mono text-xs text-on-surface-variant">
            <div className="text-outline mb-1 font-bold">CBUAE Mandatory Policy Rule 2026-C3:</div>
            <p className="font-sans text-xs leading-relaxed">
              &ldquo;Any autonomous tool proposed by a generative voice model must execute through an isolated policy proxy that verifies cryptographic session tokens, customer affirmation, and statutory calling hours prior to committing transactions.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyTab({ active, onClick, title, workflow, rules }: { active: boolean; onClick: () => void; title: string; workflow: string; rules: string }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border ${
        active
          ? "bg-surface-container-highest border-primary/40 shadow-sm"
          : "bg-surface-container hover:bg-surface-container-high border-surface-variant/20"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs font-bold text-primary">{title}</span>
        <span className="font-mono text-[10px] text-outline">v3.2</span>
      </div>
      <div className="font-semibold text-white">{workflow}</div>
      <div className="text-xs text-on-surface-variant mt-1">{rules}</div>
    </div>
  );
}
