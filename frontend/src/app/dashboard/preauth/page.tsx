"use client";

import React, { useState } from "react";

export default function PreAuthorizationPage() {
  const [activeItem, setActiveItem] = useState("AUTH-92827");
  const [coSignStatus, setCoSignStatus] = useState<Record<string, boolean>>({
    "AUTH-92827": false
  });

  const handleCoSign = (id: string) => {
    setCoSignStatus(prev => ({ ...prev, [id]: true }));
    alert(`Medical Officer Dr. Sarah Al-Nuaimi has digitally co-signed Authorization ${id}. Certificate committed to ledger.`);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      {/* Header */}
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-secondary">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="tracking-widest uppercase">Provider Pre-Authorization Console</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-code-sm text-code-sm">Clinical Rule Evaluation Engine</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Insurance Pre-Authorization & Clinical Governance
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Deterministic rule evaluation for hospital and clinic procedure authorization with automated ICD-10 cross-referencing and mandatory clinician co-sign gates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-code-sm text-code-sm text-primary bg-surface-container px-3 py-1.5 rounded border border-primary/20">
              Policy Engine: CLIN-PREAUTH-1.4
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pending Requests List */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-5 border border-surface-variant/30 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-surface-variant/20 mb-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Incoming Provider Requests</h3>
            <span className="font-code-sm text-code-sm text-primary">3 Pending Review</span>
          </div>

          <div className="space-y-3 font-body-sm">
            <div
              onClick={() => setActiveItem("AUTH-92827")}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                activeItem === "AUTH-92827"
                  ? "bg-surface-container-highest border-primary/40 shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high border-surface-variant/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-primary">#AUTH-92827 • CLINICAL</span>
                <span className="font-mono text-xs text-outline">17:58 GST</span>
              </div>
              <div className="font-semibold text-white">Aster Hospital Dubai</div>
              <div className="text-xs text-on-surface-variant mt-1">Procedure: MRI Lumbar Spine (CPT 72148)</div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-[#91A4B7]">Diagnosis: M54.5 (Low Back Pain)</span>
                <span className="text-secondary font-bold">Rule Check: PASS</span>
              </div>
            </div>

            <div
              onClick={() => setActiveItem("AUTH-92828")}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                activeItem === "AUTH-92828"
                  ? "bg-surface-container-highest border-primary/40 shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high border-surface-variant/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-secondary">#AUTH-92828 • CLINICAL</span>
                <span className="font-mono text-xs text-outline">17:45 GST</span>
              </div>
              <div className="font-semibold text-white">Mediclinic City Hospital</div>
              <div className="text-xs text-on-surface-variant mt-1">Procedure: Knee Arthroscopy (CPT 29881)</div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-[#91A4B7]">Diagnosis: M23.22 (Torn Meniscus)</span>
                <span className="text-tertiary font-bold">Physio Review Needed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inspection & Co-Sign Dossier */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-variant/20">
            <div>
              <div className="font-mono text-xs text-primary mb-1">INTAKE DOSSIER: #AUTH-92827</div>
              <h2 className="text-xl font-bold text-white">Clinical Pre-Authorization Assessment</h2>
            </div>
            <span className="px-3 py-1 rounded bg-secondary/15 text-secondary font-mono text-xs font-bold">
              Automated Check Passed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 bg-surface-container rounded-lg border border-surface-variant/20">
              <span className="text-outline block mb-1">Provider Entity:</span>
              <span className="text-white font-bold">Aster Hospital (Al Mankhool, DXB)</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-surface-variant/20">
              <span className="text-outline block mb-1">Patient Member:</span>
              <span className="text-white font-bold">Fatima Al-Zahra (ID #MEM-88192)</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-surface-variant/20">
              <span className="text-outline block mb-1">Requested Procedure:</span>
              <span className="text-primary font-bold">MRI Lumbar Spine with Contrast</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-surface-variant/20">
              <span className="text-outline block mb-1">Prior Conservative Therapy:</span>
              <span className="text-primary font-bold">6 Weeks Physiotherapy Logged ✓</span>
            </div>
          </div>

          <div className="p-4 bg-surface-container rounded-xl border border-surface-variant/20">
            <h4 className="font-headline-sm text-sm text-on-surface mb-2">Deterministic Policy Rule Evaluation:</h4>
            <div className="space-y-1.5 font-mono text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 text-primary">
                <span>✓</span> Rule CLIN-14.1: Member policy active under Tier 1 Comprehensive
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span>✓</span> Rule CLIN-14.2: ICD-10 diagnostic code conforms with clinical necessity guidelines
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span>✓</span> Rule CLIN-14.3: In-network accredited radiology center selected
              </div>
              <div className="flex items-center gap-2 text-tertiary">
                <span>⚡</span> Rule CLIN-14.4: High-value scan requires Medical Clinician Co-Sign Gate
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-container-lowest rounded-xl border border-primary/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-outline block">Medical Reviewer Desk:</span>
              <span className="text-sm font-bold text-white">Dr. Sarah Al-Nuaimi, MD</span>
              <span className="text-xs text-primary block mt-0.5">Senior Medical Officer (Radiology)</span>
            </div>

            <button
              onClick={() => handleCoSign("AUTH-92827")}
              disabled={coSignStatus["AUTH-92827"]}
              className={`px-5 py-2.5 rounded-lg font-headline-sm text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                coSignStatus["AUTH-92827"]
                  ? "bg-surface-container-high text-primary border border-primary/30"
                  : "bg-primary hover:bg-primary-fixed text-on-primary shadow-md"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {coSignStatus["AUTH-92827"] ? "done_all" : "draw"}
              </span>
              <span>{coSignStatus["AUTH-92827"] ? "Co-Signature Committed" : "Clinician Co-Sign & Approve"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
