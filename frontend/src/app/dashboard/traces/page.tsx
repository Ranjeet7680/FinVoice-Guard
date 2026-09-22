"use client";

import { Terminal, ShieldAlert, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgentTracesPage() {
  const traces = [
    { time: "18:04:01", event: "Event received via Webhook: FRD-10091", type: "info" },
    { time: "18:04:02", event: "Fraud ML Model scored transaction: 0.96 (CRITICAL)", type: "warning" },
    { time: "18:04:02", event: "Agent state initialized: CALL-92831", type: "info" },
    { time: "18:04:03", event: "Speech-to-Text Language Detected: Urdu (Confidence: 98.2%)", type: "info" },
    { time: "18:04:05", event: "Challenge Verification Completed: PASS", type: "success" },
    { time: "18:04:07", event: "Active Policy loaded: FRAUD-V3.2", type: "info" },
    { time: "18:04:09", event: "Agent proposed action: temporary_card_freeze", type: "info" },
    { time: "18:04:09", event: "Policy Engine Decision: ALLOWED (Rule 4a)", type: "success" },
    { time: "18:04:10", event: "Core Banking API freeze endpoint returned 200 OK", type: "success" },
    { time: "18:04:11", event: "Audit log recorded with immutable hash: SHA-256(7f8a...)", type: "info" }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 bg-card rounded-md hover:bg-card/80 transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Terminal size={20} className="text-primary" />
            Agent Execution Traces & Policy Observability
          </h1>
          <p className="text-sm text-muted">Real-time state machine execution and hard-constraint policy evaluation logs.</p>
        </div>
      </div>

      <div className="bg-surface border border-card rounded-xl p-6 shadow-sm font-mono text-sm">
        <div className="flex items-center justify-between pb-4 border-b border-card mb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-danger inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-warning inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-success inline-block"></span>
            <span className="text-muted text-xs ml-2">Trace Session: CALL-92831</span>
          </div>
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">STATE: CONFIRM</span>
        </div>

        <div className="space-y-3">
          {traces.map((trace, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-muted text-xs select-none">{trace.time}</span>
              <div className="flex items-center gap-2">
                {trace.type === "success" && <CheckCircle2 size={15} className="text-success flex-shrink-0" />}
                {trace.type === "warning" && <ShieldAlert size={15} className="text-warning flex-shrink-0" />}
                {trace.type === "info" && <span className="text-primary flex-shrink-0">›</span>}
                <span className={trace.type === "success" ? "text-foreground font-medium" : "text-muted"}>
                  {trace.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
