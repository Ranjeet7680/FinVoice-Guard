"use client";

import React, { useState } from "react";

interface AuditEvent {
  id: string;
  title: string;
  type: string;
  time: string;
  customer: string;
  tag: string;
  policy: string;
  action: string;
  merkleHash: string;
  ledgerBlock: string;
}

const auditEvents: Record<string, AuditEvent> = {
  "92831": {
    id: "92831",
    title: "Event Dossier: #92831-FRAUD-FREEZE",
    type: "FRAUD INTERVENTION",
    time: "18:05:12 GST",
    customer: "Ahmed Khan",
    tag: "£920 Anomaly",
    policy: "FRAUD-V3.2",
    action: "Temp Card Freeze",
    merkleHash: "0x8f2a49b817c09e91b45882cd029471f00ea511c79802",
    ledgerBlock: "Block #1,492,084",
  },
  "92827": {
    id: "92827",
    title: "Event Dossier: #92827-CLINICAL-AUTH",
    type: "PRE-AUTHORIZATION",
    time: "17:58:40 GST",
    customer: "Aster Hospital",
    tag: "MRI Lumbar Spine",
    policy: "CLIN-PREAUTH-1.4",
    action: "Approved w/ Clinician",
    merkleHash: "0x44c19a909bbfa40192e10499211c471ba89201f99a01",
    ledgerBlock: "Block #1,492,079",
  },
  "92822": {
    id: "92822",
    title: "Event Dossier: #92822-HARDSHIP-HOLD",
    type: "COLLECTIONS",
    time: "17:42:15 GST",
    customer: "Rashid Al-Maktoum",
    tag: "Day 14 Payment Plan",
    policy: "COLL-CBUAE-2026",
    action: "Hardship Flagged (Paused)",
    merkleHash: "0x78901aa48c0812bd983344199c01192fae2140921049",
    ledgerBlock: "Block #1,492,065",
  },
  "92815": {
    id: "92815",
    title: "Event Dossier: #92815-REMIT-SERVICING",
    type: "EVERYDAY SERVICING",
    time: "16:30:00 GST",
    customer: "Sunita Sharma",
    tag: "Remittance Status",
    policy: "SERV-INFO-09",
    action: "Fact Delivered (Urdu)",
    merkleHash: "0x112fa901bc0918ef9910401823901baef48190209141",
    ledgerBlock: "Block #1,492,042",
  },
};

export default function AuditCenterPage() {
  const [selectedId, setSelectedId] = useState<string>("92831");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMerkleModal, setShowMerkleModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentEvent = auditEvents[selectedId] || auditEvents["92831"];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Audit Package Generated! CBUAE-Forensic-Audit-FV92831.zip downloaded.");
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      
      {/* Top Forensic Context Header */}
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="tracking-widest uppercase">Immutable Forensic Audit Trail</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-code-sm text-code-sm">CBUAE REG-604/2026 ARCHIVE</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Audit Center & Regulatory Forensics
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Complete immutable records of every customer voice session, policy rule evaluation, automated protective action, and human sign-off.
            </p>
          </div>

          {/* Forensics Command Actions */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <button 
              onClick={() => setShowMerkleModal(true)}
              className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container-highest text-primary font-code-sm text-code-sm rounded shadow-sm transition-all duration-150 border border-surface-variant/30"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Verify Merkle Root</span>
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary font-headline-sm text-body-sm font-semibold rounded shadow-md hover:bg-primary-container transition-all duration-150"
            >
              <span className={`material-symbols-outlined text-base ${isExporting ? "animate-spin" : ""}`}>
                {isExporting ? "refresh" : "download_for_offline"}
              </span>
              <span>{isExporting ? "Packaging CBUAE Forensics..." : "Export Regulatory Audit Package (CBUAE PDF/CSV)"}</span>
            </button>
          </div>
        </div>

        {/* Status Toggles Strip */}
        <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-space-sm py-1 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors ${
              activeFilter === "all" ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span>All Events</span>
            <span className={`px-1.5 py-0.2 rounded-full font-code-sm text-code-sm ${activeFilter === "all" ? "bg-on-primary-container text-on-primary" : "bg-surface-container-highest text-primary"}`}>6,842</span>
          </button>
          <button 
            onClick={() => setActiveFilter("fraud")}
            className={`px-space-sm py-1 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors ${
              activeFilter === "fraud" ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span>Fraud Interventions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-primary font-code-sm text-code-sm">412</span>
          </button>
          <button 
            onClick={() => setActiveFilter("hardship")}
            className={`px-space-sm py-1 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors ${
              activeFilter === "hardship" ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span>Collections Hardship Flags</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-tertiary font-code-sm text-code-sm">89</span>
          </button>
          <button 
            onClick={() => setActiveFilter("preauth")}
            className={`px-space-sm py-1 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors ${
              activeFilter === "preauth" ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span>Pre-Authorizations</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-secondary font-code-sm text-code-sm">630</span>
          </button>
          <button 
            onClick={() => setActiveFilter("exceptions")}
            className={`px-space-sm py-1 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors ${
              activeFilter === "exceptions" ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span>Policy Exceptions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-code-sm text-code-sm">0</span>
          </button>
        </div>
      </div>

      {/* Regulatory Health Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm mb-space-md">
        
        {/* Card 1: Deterministic Engine */}
        <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-surface-variant/30">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Deterministic Policy Engine</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">100% Validated</span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">policy</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-space-sm pt-space-xs bg-surface-container-lowest/50 px-space-xs py-1 rounded">
            <span className="font-code-sm text-code-sm text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              0 Breaches Detected
            </span>
            <span className="font-code-sm text-code-sm text-outline">6,842 / 6,842 Runs</span>
          </div>
        </div>

        {/* Card 2: Calling Hours */}
        <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-surface-variant/30">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Calling Hour Strict Window</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">100% Enforced</span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-lg">schedule</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-space-sm pt-space-xs bg-surface-container-lowest/50 px-space-xs py-1 rounded">
            <span className="font-code-sm text-code-sm text-on-surface-variant">09:00 — 20:00 GST Strict</span>
            <span className="font-code-sm text-code-sm text-primary flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">done_all</span> Exempt Fraud Node
            </span>
          </div>
        </div>

        {/* Card 3: Opt-Out Enforcement */}
        <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-surface-variant/30">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Autonomous Opt-Out Engine</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">100% Instant</span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-lg">do_not_disturb_on</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-space-sm pt-space-xs bg-surface-container-lowest/50 px-space-xs py-1 rounded">
            <span className="font-code-sm text-code-sm text-tertiary font-medium">Zero Revocation Latency</span>
            <span className="font-code-sm text-code-sm text-outline">89 Hardship Placed</span>
          </div>
        </div>

        {/* Card 4: Zero Credential Compliance */}
        <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between shadow-sm relative overflow-hidden border border-surface-variant/30">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Zero Credential Exposure</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">100% Clean</span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">vpn_key_off</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-space-sm pt-space-xs bg-surface-container-lowest/50 px-space-xs py-1 rounded">
            <span className="font-code-sm text-code-sm text-primary">Zero PIN / OTP Prompted</span>
            <span className="font-code-sm text-code-sm text-outline">PCI-DSS 4.0 Scoped</span>
          </div>
        </div>

      </div>

      {/* Query / Filter Bar */}
      <div className="bg-surface-container-low p-space-sm rounded mb-space-md shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-space-sm border border-surface-variant/30">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">filter_alt</span>
          <input 
            className="w-full h-9 bg-surface-container-high rounded pl-9 pr-3 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-highest border border-surface-variant/30"
            placeholder="Filter by Call ID (#92831), Customer, Policy Version (FRAUD-V3.2), or Hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-space-xs flex-wrap">
          <select className="h-9 px-space-sm bg-surface-container-high text-on-surface font-body-sm text-body-sm rounded focus:outline-none cursor-pointer border border-surface-variant/30">
            <option value="all">Jurisdiction: All (UAE - CBUAE)</option>
            <option value="ae">UAE Core Central Bank</option>
            <option value="sa">KSA SAMA Regulations</option>
            <option value="uk">UK FCA Mirror Audit</option>
          </select>
          <select className="h-9 px-space-sm bg-surface-container-high text-on-surface font-body-sm text-body-sm rounded focus:outline-none cursor-pointer border border-surface-variant/30">
            <option value="all">Action: All Actions</option>
            <option value="freeze">Temp Card Freeze</option>
            <option value="pause">Collections Paused</option>
            <option value="auth">Clinical Approved</option>
            <option value="escalate">Human Escalated</option>
          </select>
          <div className="flex items-center gap-1 bg-surface-container-high px-space-xs py-1 rounded border border-surface-variant/30">
            <span className="font-code-sm text-code-sm text-outline">Date:</span>
            <span className="font-code-sm text-code-sm text-on-surface">2026-03-24 (Live)</span>
          </div>
        </div>
      </div>

      {/* Main Forensics Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        
        {/* LEFT PANEL: Searchable Verified Event Stream */}
        <div className="lg:col-span-5 bg-surface-container-low rounded p-space-sm flex flex-col gap-space-xs shadow-sm border border-surface-variant/30">
          <div className="flex items-center justify-between px-space-xs py-1">
            <div className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">format_list_numbered</span>
              <span>Verified Event Stream</span>
            </div>
            <span className="font-code-sm text-code-sm text-primary bg-surface-container-high px-1.5 py-0.5 rounded border border-primary/20">4 of 6,842 Records</span>
          </div>

          <div className="flex flex-col gap-space-xs mt-1">
            {Object.values(auditEvents).map((ev) => {
              const isSelected = ev.id === selectedId;
              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedId(ev.id)}
                  className={`p-space-sm rounded cursor-pointer transition-all relative overflow-hidden border ${
                    isSelected
                      ? "bg-surface-container-highest border-primary/40 shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high border-surface-variant/20"
                  }`}
                >
                  {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                  <div className="flex items-center justify-between mb-1 pl-1">
                    <span className={`font-code-sm text-code-sm font-bold ${isSelected ? "text-primary" : "text-on-surface-variant"}`}>
                      #{ev.id} • {ev.type}
                    </span>
                    <span className="font-code-sm text-code-sm text-outline">{ev.time}</span>
                  </div>
                  <div className="flex items-center justify-between pl-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">{ev.customer}</span>
                    <span className="font-code-sm text-code-sm text-error bg-error-container/30 px-1 rounded">{ev.tag}</span>
                  </div>
                  <div className="mt-2 pl-1 flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm">
                    <span className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-xs">gavel</span>
                      {ev.policy}
                    </span>
                    <span className="text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      {ev.action}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-space-sm p-space-xs bg-surface-container rounded flex items-center justify-between font-code-sm text-code-sm text-on-surface-variant border border-surface-variant/20">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Merkle Tree: Continuous SHA-256
            </span>
            <span className="text-primary font-semibold">ALL HASHES LOCKED</span>
          </div>
        </div>

        {/* RIGHT PANEL: Comprehensive Event Inspection Dossier */}
        <div className="lg:col-span-7 bg-surface-container-low rounded p-space-md flex flex-col gap-space-md shadow-sm border border-surface-variant/30">
          
          {/* Dossier Header & Cryptographic Seal */}
          <div className="flex flex-col gap-space-xs pb-space-sm bg-surface-container-high/40 p-space-md rounded border border-surface-variant/20">
            <div className="flex flex-wrap items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                  {currentEvent.title}
                </h2>
              </div>
              <div className="flex items-center gap-1 px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-code-sm text-code-sm font-semibold">
                <span className="material-symbols-outlined text-xs">lock</span>
                <span>IMMUTABLE EVIDENCE LOCK</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-code-sm text-code-sm">
              <div className="flex items-center gap-space-xs">
                <span className="text-outline">Merkle Hash:</span>
                <span className="text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded font-mono text-xs">
                  {currentEvent.merkleHash.substring(0, 18)}...
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="text-outline">Ledger Sequence:</span>
                <span className="text-on-surface">{currentEvent.ledgerBlock}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="text-outline">CBUAE Certified:</span>
                <span className="text-primary">PASS (0.00s DELAY)</span>
              </div>
            </div>
          </div>

          {/* Micro Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xs">
            <div className="p-space-xs bg-surface-container rounded flex flex-col border border-surface-variant/20">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Customer Entity</span>
              <span className="font-headline-sm text-body-sm text-on-surface font-medium">{currentEvent.customer}</span>
              <span className="font-code-sm text-code-sm text-outline">ID: CID-AE-99214</span>
            </div>
            <div className="p-space-xs bg-surface-container rounded flex flex-col border border-surface-variant/20">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Language Detected</span>
              <span className="font-headline-sm text-body-sm text-primary font-medium">Urdu (99.1%)</span>
              <span className="font-code-sm text-code-sm text-outline">Dual-Channel ASR</span>
            </div>
            <div className="p-space-xs bg-surface-container rounded flex flex-col border border-surface-variant/20">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Trigger Event</span>
              <span className="font-headline-sm text-body-sm text-error font-medium">{currentEvent.tag}</span>
              <span className="font-code-sm text-code-sm text-outline">Anomaly Velocity: High</span>
            </div>
            <div className="p-space-xs bg-surface-container rounded flex flex-col border border-surface-variant/20">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Specialist Intervene</span>
              <span className="font-headline-sm text-body-sm text-secondary font-medium">Tariq Al-Hashimi</span>
              <span className="font-code-sm text-code-sm text-outline">Senior Fraud Desk</span>
            </div>
          </div>

          {/* 9-Step Sequential Forensic Timeline */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">timeline</span>
                9-Step Sequential Event Timeline (Deterministic Execution)
              </span>
              <span className="font-code-sm text-code-sm text-outline">Zero Black-Box Processing</span>
            </div>

            <div className="flex flex-col gap-space-xs relative text-sm">
              <TimelineStep 
                time="18:04:12" 
                title="1. Signal Received" 
                meta="Kafka Bus Event #TRX-9981" 
                desc="Real-time risk message from core banking transaction pipeline flagged foreign device token."
              />
              <TimelineStep 
                time="18:04:14" 
                title="2. Model Decision & Scoring" 
                meta="96% Risk Probability (CRITICAL)" 
                metaColor="text-error"
                desc="Supervised Fraud ML Classifier scored transaction as severe deviation from historical geography."
              />
              <TimelineStep 
                time="18:04:18" 
                title="3. Deterministic Policy Evaluation" 
                meta="Matched: FRAUD-V3.2" 
                metaColor="text-primary"
                desc="Rule evaluation verified immediate outbound call is permissible under emergency fund protection statutory rules."
              />
              <TimelineStep 
                time="18:04:20" 
                title="4. Outbound Call Initiated" 
                meta="Latency: 1.8s" 
                metaColor="text-secondary"
                desc="SIP gateway connected in 1.8 seconds. Direct encrypted PSTN routing to registered mobile +971-50-***-8821."
              />
              <TimelineStep 
                time="18:04:22" 
                title="5. Multilingual Acoustic Detection" 
                meta="Urdu Detected (99.1% Confidence)" 
                metaColor="text-primary"
                desc="Acoustic fingerprint matched Urdu greeting. Voice synthesis switched dynamically to native regional dialect."
              />
              <TimelineStep 
                time="18:04:45" 
                title="6. Zero-Credential Customer Verification" 
                meta="In-App Biometric PASS" 
                metaColor="text-primary"
                desc="Push challenge satisfied in mobile app. Zero PIN, CVV, or OTP was requested or handled over voice channel."
              />
              <TimelineStep 
                time="18:05:08" 
                title="7. AI Response & Protective Action" 
                meta="Core API: Lock_200 (Success)" 
                metaColor="text-error"
                desc="Automated Temporary Card Freeze executed via Core Banking REST Gateway. Customer informed in Urdu immediately."
              />
              <TimelineStep 
                time="18:05:30" 
                title="8. Human Decision Hand-Off" 
                meta="Warm SIP Bridge" 
                metaColor="text-secondary"
                desc="Call warm-transferred to Senior Fraud Specialist Tariq Al-Hashimi with live telemetry context bridge for permanent replacement decision."
              />
              <TimelineStep 
                time="18:06:10" 
                title="9. Final Outcome & Immutable Seal" 
                meta="Ledger Committed" 
                metaColor="text-primary"
                desc="Card locked, dispute dossier opened (#DSP-48192), call audio cryptographically hashed and sealed with timestamp."
              />
            </div>
          </div>

          {/* Dual-Channel Audio & Verbatim Transcript */}
          <div className="flex flex-col gap-space-xs pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">record_voice_over</span>
                Archived Dual-Channel Verbatim Transcript (100% Retained)
              </span>
              <div className="flex items-center gap-space-xs font-code-sm text-code-sm">
                <span className="text-outline">Acoustic Stress Index:</span>
                <span className="text-tertiary">14.2% (Moderate)</span>
              </div>
            </div>

            <div className="bg-surface-container p-space-xs rounded flex items-center justify-between gap-space-sm border border-surface-variant/30">
              <div className="flex items-center gap-space-xs">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-body-sm text-on-surface font-medium">Session-92831-DualTrack.flac</span>
                  <span className="font-code-sm text-code-sm text-outline">01:58 Encrypted Audio • 24-bit Lossless</span>
                </div>
              </div>

              {/* Waveform graphic */}
              <div className="hidden sm:flex items-center flex-1 max-w-xs h-6 px-space-xs bg-surface-container-high rounded border border-surface-variant/20">
                <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 200 24">
                  {Array.from({ length: 40 }).map((_, idx) => {
                    const h = Math.floor(Math.sin(idx * 0.5) * 8 + 12);
                    return (
                      <rect 
                        key={idx} 
                        fill="currentColor" 
                        height={h} 
                        opacity={isPlaying ? 0.9 : 0.6} 
                        width={3} 
                        x={idx * 5} 
                        y={(24 - h) / 2} 
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="font-code-sm text-code-sm text-primary bg-surface-container-high px-space-xs py-0.5 rounded border border-primary/20">
                <span>{isPlaying ? "01:12 / 01:58" : "00:43 / 01:58"}</span>
              </div>
            </div>
          </div>

          {/* Regulatory Attestation Seal Banner */}
          <div className="p-space-sm bg-surface-container-high rounded flex flex-col sm:flex-row items-center justify-between gap-space-sm border border-surface-variant/30">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/30">
                <span className="material-symbols-outlined text-xl">gavel</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-body-sm text-on-surface font-semibold">CBUAE Consumer Protection Reg-Art.7 Compliant</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Session conforms with all affirmative verification protocols & automated notification mandates.</span>
              </div>
            </div>
            <div className="flex items-center gap-space-xs shrink-0">
              <span className="font-code-sm text-code-sm text-primary bg-surface-container-lowest px-2 py-1 rounded border border-primary/20">AUDIT HASH: SEALED</span>
            </div>
          </div>

        </div>
      </div>

      {/* Merkle Root Modal */}
      {showMerkleModal && (
        <div className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md z-50 flex items-center justify-center p-space-md">
          <div className="bg-surface-container-low max-w-xl w-full p-space-lg rounded shadow-xl flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-xl">verified</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Merkle Root Cryptographic Verification</h3>
              </div>
              <button 
                onClick={() => setShowMerkleModal(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p>The forensic record for event <strong className="text-on-surface">#{currentEvent.id}-FRAUD-FREEZE</strong> is securely committed into the FinVoice distributed immutable audit ledger.</p>
              
              <div className="p-space-sm bg-surface-container-lowest rounded font-code-sm text-code-sm flex flex-col gap-1 mt-1 text-on-surface border border-surface-variant/30">
                <span className="text-outline">Root Merkle Hash:</span>
                <span className="text-primary break-all">{currentEvent.merkleHash}</span>
                <span className="text-outline mt-1">Previous Node Hash:</span>
                <span className="text-secondary break-all">0x71ba2381f90ac4710188ca298012bb94091aef214150</span>
                <span className="text-outline mt-1">Consensus Timestamp:</span>
                <span className="text-on-surface">2026-03-24T18:06:10.491Z (CBUAE Node 04)</span>
              </div>

              <div className="flex items-center gap-2 mt-2 text-primary font-code-sm text-code-sm">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Zero tampering detected. Cryptographic signature matches Central Bank Archive node.</span>
              </div>
            </div>

            <div className="flex justify-end gap-space-xs">
              <button 
                onClick={() => setShowMerkleModal(false)}
                className="px-space-md py-space-xs bg-primary text-on-primary font-headline-sm text-body-sm rounded font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function TimelineStep({ time, title, meta, metaColor, desc }: any) {
  return (
    <div className="flex items-start gap-space-sm p-space-xs bg-surface-container rounded hover:bg-surface-container-high transition-colors border border-surface-variant/20">
      <span className="font-code-sm text-code-sm text-primary px-1.5 py-0.5 rounded bg-surface-container-lowest font-medium mt-0.5 border border-primary/20">
        {time}
      </span>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="font-body-md text-body-sm text-on-surface font-semibold">{title}</span>
          <span className={`font-code-sm text-code-sm ${metaColor || "text-outline"}`}>{meta}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
