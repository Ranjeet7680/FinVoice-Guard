"use client";

import React from "react";

export default function IntegrationsPage() {
  const connectors = [
    { name: "Core Banking Card Lock API", type: "mTLS REST Gateway", status: "Connected (200 OK)", latency: "42ms", encryption: "AES-256 GCM" },
    { name: "Kafka Fraud Real-Time Webhook Bus", type: "Event Streaming", status: "Connected (Live Ingress)", latency: "14ms", encryption: "TLS 1.3 / SASL" },
    { name: "ElevenLabs Telephony SIP Trunk", type: "Sovereign VoIP Gateway", status: "Connected (128 Channels)", latency: "185ms", encryption: "SRTP / TLS" },
    { name: "Visa Falcon Fraud Network Gateway", type: "Card Hotlist Proxy", status: "Active Hotlist", latency: "65ms", encryption: "Dedicated Leased Line" },
    { name: "CBUAE Regulatory Forensics Node 04", type: "Merkle Audit Node", status: "Syncing Block #1,492,084", latency: "28ms", encryption: "SHA-256 Vault" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span className="tracking-widest uppercase">Institutional Connectors & Webhooks</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Enterprise Integrations & Telephony Trunks
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Hardened banking gateways, telephony trunks, and audit node synchronization interfaces.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectors.map((c, idx) => (
          <div key={idx} className="bg-surface-container-low rounded-xl p-5 border border-surface-variant/30 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-variant/20">
                <span className="text-xs font-mono text-outline">{c.type}</span>
                <span className="text-xs font-mono text-primary font-bold">{c.status}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{c.name}</h3>
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                <span>Latency: <strong className="text-primary">{c.latency}</strong></span>
                <span>Cipher: {c.encryption}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
