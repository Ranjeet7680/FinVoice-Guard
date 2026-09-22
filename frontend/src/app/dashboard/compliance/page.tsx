"use client";

import React from "react";

export default function ComplianceMonitorPage() {
  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
            <span className="material-symbols-outlined text-sm">policy</span>
            <span className="tracking-widest uppercase">Central Bank of UAE Regulatory Telemetry</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Compliance & Regulatory Monitor
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Real-time verification of affirmative customer consent, zero-credential collection, calling-hour bounds, and statutory opt-out suppression.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-5 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline block mb-1">Policy Adherence</span>
          <div className="text-3xl font-bold text-primary">100%</div>
          <p className="text-xs text-on-surface-variant mt-2">Zero unapproved financial actions attempted by voice agents.</p>
        </div>
        <div className="p-5 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline block mb-1">Zero Credential Exposure</span>
          <div className="text-3xl font-bold text-primary">100% Clean</div>
          <p className="text-xs text-on-surface-variant mt-2">Zero PIN, CVV, OTP queries posed across 6,842 sessions.</p>
        </div>
        <div className="p-5 bg-surface-container-low rounded-xl border border-surface-variant/30">
          <span className="text-xs font-mono text-outline block mb-1">Statutory Calling Windows</span>
          <div className="text-3xl font-bold text-secondary">09:00 - 20:00</div>
          <p className="text-xs text-on-surface-variant mt-2">Enforced under UAE Federal Consumer Protection Law No. 14.</p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Statutory Rules Verification Register</h3>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-surface-container rounded-lg border border-primary/20 flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">CBUAE Consumer Protection Reg-Art.7: Affirmative Identity Disclosure</span>
              <span className="text-on-surface-variant">Mandatory opening node verified on 100% of outbound connections.</span>
            </div>
            <span className="text-primary font-bold">PASS (100%)</span>
          </div>
          <div className="p-3 bg-surface-container rounded-lg border border-primary/20 flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">CBUAE Sovereign Data Isolation Reg-Art.22: In-Country Audio Residency</span>
              <span className="text-on-surface-variant">Encrypted Sovereign Pod DXB-02 hosting certified.</span>
            </div>
            <span className="text-primary font-bold">PASS (100%)</span>
          </div>
          <div className="p-3 bg-surface-container rounded-lg border border-primary/20 flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">PCI-DSS 4.0 Telephony Standard: Zero Secret Harvesting</span>
              <span className="text-on-surface-variant">Out-of-band app push biometric challenge verified.</span>
            </div>
            <span className="text-primary font-bold">PASS (100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
