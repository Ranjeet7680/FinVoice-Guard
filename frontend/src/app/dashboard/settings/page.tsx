"use client";

import React, { useState } from "react";

export default function PlatformSettingsPage() {
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [dualSignoff, setDualSignoff] = useState(true);

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span className="tracking-widest uppercase">Platform Governance & Security Parameters</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Platform Settings & Institutional Security
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Configure sovereign data residency, session timeouts, dual-signoff policies, and operational thresholds.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg max-w-3xl space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-surface-container rounded-lg border border-surface-variant/20 flex items-center justify-between">
            <div>
              <span className="font-headline-sm text-sm text-white block">Sovereign Cloud Pod Node</span>
              <span className="text-xs text-on-surface-variant">In-country UAE telephonic audio stream isolation</span>
            </div>
            <span className="px-3 py-1 bg-primary/15 text-primary font-mono text-xs font-bold rounded">
              DXB-02 (Dubai, UAE)
            </span>
          </div>

          <div className="p-4 bg-surface-container rounded-lg border border-surface-variant/20 flex items-center justify-between">
            <div>
              <span className="font-headline-sm text-sm text-white block">Supervisor Inactivity Timeout</span>
              <span className="text-xs text-on-surface-variant">Automatically locks active audio monitoring console</span>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="bg-surface-container-lowest text-primary font-mono text-xs px-3 py-1.5 rounded border border-surface-variant/30 focus:outline-none"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>

          <div className="p-4 bg-surface-container rounded-lg border border-surface-variant/20 flex items-center justify-between">
            <div>
              <span className="font-headline-sm text-sm text-white block">Dual-Signoff Protocol</span>
              <span className="text-xs text-on-surface-variant">Permanent account killswitch requires 2 risk officers</span>
            </div>
            <button
              onClick={() => setDualSignoff(!dualSignoff)}
              className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all ${
                dualSignoff ? "bg-primary text-on-primary" : "bg-surface-variant text-on-surface"
              }`}
            >
              {dualSignoff ? "ENFORCED" : "OPTIONAL"}
            </button>
          </div>

          <div className="p-4 bg-surface-container rounded-lg border border-surface-variant/20 flex items-center justify-between">
            <div>
              <span className="font-headline-sm text-sm text-white block">Immutable Forensics Retention</span>
              <span className="text-xs text-on-surface-variant">Statutory retention timeframe for dual-channel audio & transcripts</span>
            </div>
            <span className="text-tertiary font-mono text-xs font-bold">
              7 Years (CBUAE Statutory)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
