"use client";

import React from "react";

export default function VoiceAgentsPage() {
  const agents = [
    { name: "Fraud Intervene AI (Urdu/Gulf)", id: "AGT-FRD-01", model: "Eleven v3 + Scribe v2", state: "Active Ingress/Egress", latency: "185ms", activeCalls: 4 },
    { name: "Collections Guard AI (Arabic/Hindi)", id: "AGT-COL-02", model: "Eleven v3 + Scribe v2", state: "Scheduled (09:00-20:00)", latency: "192ms", activeCalls: 5 },
    { name: "Clinical Pre-Auth Voice AI", id: "AGT-CLIN-03", model: "Eleven v3 Clinical Specialized", state: "Active Inbound", latency: "210ms", activeCalls: 2 },
    { name: "Everyday Servicing Multilingual", id: "AGT-SERV-04", model: "Eleven v3 8-Language", state: "Active Inbound", latency: "175ms", activeCalls: 1 },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">record_voice_over</span>
              <span className="tracking-widest uppercase">ElevenLabs Agents Platform Runtime</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Voice Agents & Telephony Deployment
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Configured conversational runtimes executing deterministic state workflows with sub-200ms roundtrip audio synthesis.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-surface-container-low rounded-xl p-5 border border-surface-variant/30 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/20 mb-3">
                <span className="font-mono text-xs font-bold text-primary">{agent.id}</span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>{agent.state}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
              <p className="text-xs font-mono text-outline mb-4">Underlying Engine: {agent.model}</p>
              
              <div className="grid grid-cols-2 gap-3 font-mono text-xs bg-surface-container p-3 rounded-lg border border-surface-variant/20">
                <div>
                  <span className="text-outline block">Median Latency:</span>
                  <span className="text-primary font-bold">{agent.latency}</span>
                </div>
                <div>
                  <span className="text-outline block">Active Concurrency:</span>
                  <span className="text-white font-bold">{agent.activeCalls} Streams</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-variant/20 flex items-center justify-between text-xs font-mono">
              <span className="text-outline">Fail-Closed: Active</span>
              <span className="text-primary font-semibold">Policy Guard Armed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
