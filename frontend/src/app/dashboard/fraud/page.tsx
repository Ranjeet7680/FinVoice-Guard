"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LiveFraudDemoRunner from "@/components/demo/LiveFraudDemoRunner";

interface FraudEvent {
  id: string;
  customer: string;
  customerId: string;
  amount: string;
  merchant: string;
  riskScore: number;
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  reason: string;
  status: "NEW" | "INVESTIGATING" | "RESOLVED" | "ESCALATED";
  created: string;
  cardId: string;
  location: string;
  device: string;
}

const INITIAL_EVENTS: FraudEvent[] = [
  {
    id: "FRD-92831",
    customer: "Ahmed Khan",
    customerId: "CUST-10045",
    amount: "AED 4,500 (£920)",
    merchant: "Harrods Knightsbridge, London",
    riskScore: 0.96,
    riskLevel: "CRITICAL",
    reason: "Dual Geographic Swipe Velocity: London POS vs Dubai Cell Tower in 134s",
    status: "INVESTIGATING",
    created: "2 mins ago",
    cardId: "CARD-9912",
    location: "London, UK",
    device: "Unrecognized iOS Device (London IP)",
  },
  {
    id: "FRD-92830",
    customer: "Rashid Al-Maktoum",
    customerId: "CUST-10031",
    amount: "AED 9,800 ($2,668)",
    merchant: "CryptEx Digital, Singapore",
    riskScore: 0.88,
    riskLevel: "CRITICAL",
    reason: "New crypto merchant category + zero previous international history",
    status: "ESCALATED",
    created: "14 mins ago",
    cardId: "CARD-7719",
    location: "Singapore",
    device: "Web Terminal (Tor Exit Node)",
  },
  {
    id: "FRD-92829",
    customer: "Fatima Al-Nuaimi",
    customerId: "CUST-10089",
    amount: "AED 1,250",
    merchant: "ATM Terminal 09, Deira Dubai",
    riskScore: 0.72,
    riskLevel: "HIGH",
    reason: "Consecutive high-velocity withdrawal attempts outside home cluster",
    status: "NEW",
    created: "38 mins ago",
    cardId: "CARD-4402",
    location: "Deira, Dubai",
    device: "Physical ATM Terminal",
  },
  {
    id: "FRD-92828",
    customer: "Liam Smith",
    customerId: "CUST-10052",
    amount: "AED 340",
    merchant: "Deliveroo UAE",
    riskScore: 0.44,
    riskLevel: "MEDIUM",
    reason: "Unusual late-night ordering pattern on dormant card",
    status: "RESOLVED",
    created: "2 hours ago",
    cardId: "CARD-1192",
    location: "Dubai Marina",
    device: "Android 14 (Dubai IP)",
  },
  {
    id: "FRD-92827",
    customer: "Sarah Jenkins",
    customerId: "CUST-10077",
    amount: "AED 85",
    merchant: "Starbucks Media City",
    riskScore: 0.15,
    riskLevel: "LOW",
    reason: "Standard contactless purchase within established habit profile",
    status: "RESOLVED",
    created: "4 hours ago",
    cardId: "CARD-3301",
    location: "Dubai Media City",
    device: "Apple Pay (Known Device)",
  },
];

export default function FraudManagementPage() {
  const [events, setEvents] = useState<FraudEvent[]>(INITIAL_EVENTS);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<FraudEvent | null>(INITIAL_EVENTS[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "transaction" | "risk" | "call" | "timeline" | "audit">("overview");

  // Simulator Form State
  const [simCustomer, setSimCustomer] = useState("Ahmed Khan (CUST-10045)");
  const [simAmount, setSimAmount] = useState("4500");
  const [simCurrency, setSimCurrency] = useState("AED");
  const [simMerchant, setSimMerchant] = useState("Harrods Knightsbridge, London");
  const [simLocation, setSimLocation] = useState("London, UK (POS Swipe)");
  const [simDevice, setSimDevice] = useState("New iOS Device (London IP)");
  const [simNewDevice, setSimNewDevice] = useState(true);
  const [simUnusualLocation, setSimUnusualLocation] = useState(true);
  const [simHighValue, setSimHighValue] = useState(true);
  const [simLoading, setSimLoading] = useState(false);
  const [simSuccessMsg, setSimSuccessMsg] = useState("");

  const filteredEvents = events.filter((e) => {
    if (activeFilter === "ALL") return true;
    if (["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(activeFilter)) {
      return e.riskLevel === activeFilter;
    }
    return e.status === activeFilter;
  });

  const handleSimulateFraud = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimLoading(true);
    setSimSuccessMsg("");

    try {
      const res = await fetch("/api/fraud/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: simCustomer.split(" (")[0],
          customer_id: simCustomer.includes("CUST-") ? "CUST-" + simCustomer.split("CUST-")[1].replace(")", "") : "CUST-10045",
          transaction_amount: Number(simAmount),
          currency: simCurrency,
          merchant: simMerchant,
          location: simLocation,
          device: simDevice,
          is_new_device: simNewDevice,
          is_unusual_location: simUnusualLocation,
          is_high_value: simHighValue,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const ev = data.event;
        const newEventObj: FraudEvent = {
          id: ev.event_id,
          customer: ev.customer_name,
          customerId: ev.customer_id,
          amount: `${ev.transaction.currency} ${ev.transaction.amount.toLocaleString()}`,
          merchant: ev.transaction.merchant,
          riskScore: ev.ml_models.primary_tabular.fraud_probability,
          riskLevel: ev.ml_models.primary_tabular.risk_level,
          reason: ev.reason_codes.join(", ") + " anomaly flagged by XGBoost",
          status: "NEW",
          created: "Just now",
          cardId: "CARD-9912",
          location: ev.transaction.location,
          device: ev.transaction.device,
        };

        setEvents((prev) => [newEventObj, ...prev]);
        setSelectedEvent(newEventObj);
        setSimSuccessMsg(`Incident ${ev.event_id} generated with ${(newEventObj.riskScore * 100).toFixed(0)}% risk score! Voice agent workflow primed.`);
      }
    } catch {
      // Fallback
      const newEventObj: FraudEvent = {
        id: `FRD-${Math.floor(10000 + Math.random() * 90000)}`,
        customer: simCustomer.split(" (")[0],
        customerId: "CUST-10045",
        amount: `${simCurrency} ${Number(simAmount).toLocaleString()}`,
        merchant: simMerchant,
        riskScore: 0.96,
        riskLevel: "CRITICAL",
        reason: "Simulated anomaly: New device + unusual geographic cluster",
        status: "NEW",
        created: "Just now",
        cardId: "CARD-9912",
        location: simLocation,
        device: simDevice,
      };
      setEvents((prev) => [newEventObj, ...prev]);
      setSelectedEvent(newEventObj);
      setSimSuccessMsg(`Incident ${newEventObj.id} generated!`);
    } finally {
      setSimLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl pb-16 text-on-surface">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-surface-variant/20">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-error">
            <span className="material-symbols-outlined text-sm">emergency</span>
            <span className="uppercase tracking-widest font-bold">Fraud Operations Center</span>
            <span className="text-outline">•</span>
            <span className="text-on-surface-variant">Real-Time Risk Scored Streams</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Fraud Incidents & Machine Learning Triage
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Governed AI detects high-velocity swindles, verifies caller intent without secrets, and triggers reversible card freezes.
          </p>
        </div>

        <Link
          href="/dashboard/calls/92831"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold text-xs rounded-xl shadow hover:brightness-110 transition-all font-mono"
        >
          <span className="material-symbols-outlined text-base">call</span>
          <span>Open Active Call (#92831)</span>
        </Link>
      </div>

      {/* One-Click E2E Demo Banner */}
      <LiveFraudDemoRunner onComplete={() => {}} />

      {/* Fraud Simulator Accordion / Card */}
      <div className="bg-surface-container-low border border-surface-variant/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-lg">science</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Interactive Fraud Telemetry Simulator
              </h2>
              <span className="text-[11px] text-outline">
                Generate realistic banking swindles and test the ML scoring + voice agent cascade without a live core bank
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/30">
            TEST HARNESS
          </span>
        </div>

        {simSuccessMsg && (
          <div className="mb-4 p-3 bg-primary/15 border border-primary/30 text-primary text-xs rounded-xl flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{simSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleSimulateFraud} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <label className="block text-outline uppercase font-semibold mb-1">Target Customer</label>
            <select
              value={simCustomer}
              onChange={(e) => setSimCustomer(e.target.value)}
              className="w-full bg-surface-container border border-surface-variant/30 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Ahmed Khan (CUST-10045)">Ahmed Khan (Premier Checking)</option>
              <option value="Rashid Al-Maktoum (CUST-10031)">Rashid Al-Maktoum (Business Classic)</option>
              <option value="Fatima Al-Nuaimi (CUST-10089)">Fatima Al-Nuaimi (Islamic Savings)</option>
            </select>
          </div>

          <div>
            <label className="block text-outline uppercase font-semibold mb-1">Transaction Amount</label>
            <div className="flex gap-2">
              <select
                value={simCurrency}
                onChange={(e) => setSimCurrency(e.target.value)}
                className="w-20 bg-surface-container border border-surface-variant/30 rounded-lg p-2 text-white"
              >
                <option value="AED">AED</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
              <input
                type="number"
                value={simAmount}
                onChange={(e) => setSimAmount(e.target.value)}
                className="flex-1 bg-surface-container border border-surface-variant/30 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="4500"
              />
            </div>
          </div>

          <div>
            <label className="block text-outline uppercase font-semibold mb-1">Merchant Terminal</label>
            <input
              type="text"
              value={simMerchant}
              onChange={(e) => setSimMerchant(e.target.value)}
              className="w-full bg-surface-container border border-surface-variant/30 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-outline uppercase font-semibold mb-1">Geographic Location</label>
            <input
              type="text"
              value={simLocation}
              onChange={(e) => setSimLocation(e.target.value)}
              className="w-full bg-surface-container border border-surface-variant/30 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center gap-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
              <input
                type="checkbox"
                checked={simNewDevice}
                onChange={(e) => setSimNewDevice(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span>New Unrecognized Device Fingerprint</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
              <input
                type="checkbox"
                checked={simUnusualLocation}
                onChange={(e) => setSimUnusualLocation(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span>High-Velocity Cross-Border Distance (5,400km)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
              <input
                type="checkbox"
                checked={simHighValue}
                onChange={(e) => setSimHighValue(e.target.checked)}
                className="rounded text-primary focus:ring-0"
              />
              <span>Out-of-Profile High Amount</span>
            </label>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={simLoading}
              className="w-full py-2 bg-error hover:bg-red-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow"
            >
              {simLoading ? (
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>TRIGGER SIMULATED FRAUD</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Main Two-Column Layout: Left Incident List, Right Detailed Incident Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Event List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filters Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
            {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW", "NEW", "INVESTIGATING", "RESOLVED", "ESCALATED"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border ${
                  activeFilter === f
                    ? "bg-primary text-black font-bold border-primary shadow-sm"
                    : "bg-surface-container-low text-outline hover:text-white border-surface-variant/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Events Table */}
          <div className="bg-surface-container-low border border-surface-variant/30 rounded-2xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container border-b border-surface-variant/30 text-outline uppercase">
                    <th className="py-3 px-3">Event ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Risk</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/20">
                  {filteredEvents.map((ev) => {
                    const isSelected = selectedEvent?.id === ev.id;
                    return (
                      <tr
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-surface-container/90" : "hover:bg-surface-container/40"
                        }`}
                      >
                        <td className="py-3 px-3 font-bold text-primary">{ev.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{ev.customer}</div>
                          <div className="text-[10px] text-outline">{ev.merchant}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-white">{ev.amount}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ev.riskLevel === "CRITICAL"
                                ? "bg-error text-white animate-pulse"
                                : ev.riskLevel === "HIGH"
                                ? "bg-tertiary/20 text-tertiary"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            {(ev.riskScore * 100).toFixed(0)}%
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                            {ev.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href="/dashboard/calls/92831"
                            className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-primary text-[10px] border border-surface-variant/30 inline-flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Fraud Event Inspector Tabs (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-low border border-surface-variant/30 rounded-2xl p-5 shadow-lg space-y-4">
          {selectedEvent ? (
            <>
              {/* Card Header */}
              <div className="flex items-start justify-between pb-3 border-b border-surface-variant/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-white">{selectedEvent.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-error/20 text-error font-bold">
                      {selectedEvent.riskLevel}
                    </span>
                  </div>
                  <span className="text-xs text-outline font-mono mt-0.5 block">
                    Customer: <strong className="text-white">{selectedEvent.customer}</strong> ({selectedEvent.customerId})
                  </span>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-outline">Risk Score</div>
                  <div className="text-xl font-extrabold text-error">
                    {(selectedEvent.riskScore * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Inspector Tabs */}
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg font-mono text-[11px] overflow-x-auto">
                {(["overview", "transaction", "risk", "call", "timeline", "audit"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-2.5 py-1 rounded transition-colors uppercase font-semibold ${
                      activeTab === t
                        ? "bg-surface-container text-primary font-bold shadow-sm"
                        : "text-outline hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              {activeTab === "overview" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20 space-y-1.5">
                    <div className="flex justify-between"><span className="text-outline">Transaction Amount:</span><span className="text-white font-bold">{selectedEvent.amount}</span></div>
                    <div className="flex justify-between"><span className="text-outline">Target Merchant:</span><span className="text-white truncate">{selectedEvent.merchant}</span></div>
                    <div className="flex justify-between"><span className="text-outline">Location:</span><span className="text-white">{selectedEvent.location}</span></div>
                    <div className="flex justify-between"><span className="text-outline">Device Vector:</span><span className="text-white truncate">{selectedEvent.device}</span></div>
                    <div className="flex justify-between"><span className="text-outline">Card Identifier:</span><span className="text-primary font-bold">{selectedEvent.cardId}</span></div>
                  </div>

                  <div className="p-3 bg-error/10 border border-error/30 rounded-xl space-y-1">
                    <span className="text-[10px] text-error font-bold uppercase block">Primary Anomaly Vector</span>
                    <p className="text-white text-xs leading-relaxed">{selectedEvent.reason}</p>
                  </div>

                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20">
                    <span className="text-[10px] text-outline uppercase font-bold block mb-1">Recommended Policy Directive</span>
                    <div className="text-primary font-bold">Temporary 24-Hour Card Freeze</div>
                    <span className="text-[11px] text-outline mt-0.5 block">Approved under Rule FRAUD-V3.2. Fail-closed safeguard armed.</span>
                  </div>
                </div>
              )}

              {activeTab === "transaction" && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20 space-y-2">
                    <div className="flex justify-between border-b border-surface-variant/20 pb-1">
                      <span className="text-outline">POS Terminal ID:</span>
                      <span className="text-white">POS-LON-88912</span>
                    </div>
                    <div className="flex justify-between border-b border-surface-variant/20 pb-1">
                      <span className="text-outline">Acquirer Country:</span>
                      <span className="text-white">GB (United Kingdom)</span>
                    </div>
                    <div className="flex justify-between border-b border-surface-variant/20 pb-1">
                      <span className="text-outline">MCC Category:</span>
                      <span className="text-white">5311 (Department Stores)</span>
                    </div>
                    <div className="flex justify-between border-b border-surface-variant/20 pb-1">
                      <span className="text-outline">3D-Secure Status:</span>
                      <span className="text-error font-bold">Bypassed (Magnetic Stripe Swipe)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Settlement Currency:</span>
                      <span className="text-white">GBP 920.00 (AED 4,500.00 eq)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "risk" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20 space-y-2">
                    <div className="text-[11px] font-bold text-white uppercase">XGBoost Tabular Feature Weights</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Geographic Swipe Velocity</span>
                        <span className="text-error font-bold">42%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                        <div className="bg-error h-1.5 rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Unusual Transaction Amount</span>
                        <span className="text-tertiary font-bold">31%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                        <div className="bg-tertiary h-1.5 rounded-full" style={{ width: "31%" }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Unrecognized Device IP</span>
                        <span className="text-primary font-bold">27%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: "27%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20">
                    <div className="text-[11px] font-bold text-white uppercase mb-1">PyTorch Secondary Sequence Model</div>
                    <div className="text-[11px] text-outline">LSTM/Transformer Temporal Anomaly: <strong className="text-primary">0.942</strong></div>
                    <div className="text-[10px] text-outline-variant mt-1">Cross-entropy loss: 0.041 • Embeddings dimension: 128</div>
                  </div>
                </div>
              )}

              {activeTab === "call" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20 space-y-1.5">
                    <div className="flex justify-between"><span className="text-outline">Call ID:</span><span className="text-primary font-bold">CALL-92831</span></div>
                    <div className="flex justify-between"><span className="text-outline">Acoustic Engine:</span><span className="text-white">ElevenLabs v3 Multilingual</span></div>
                    <div className="flex justify-between"><span className="text-outline">Language Detected:</span><span className="text-white">Urdu (اردو) [99.1%]</span></div>
                    <div className="flex justify-between"><span className="text-outline">Verification Challenge:</span><span className="text-primary font-bold">Biometric Push PASSED</span></div>
                  </div>

                  <Link
                    href="/dashboard/calls/92831"
                    className="w-full py-2 bg-primary text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow"
                  >
                    <span className="material-symbols-outlined text-sm">graphic_eq</span>
                    <span>Launch Tactical Live Call Audio Stream</span>
                  </Link>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="border-l-2 border-primary/40 pl-3 space-y-3">
                    <div>
                      <div className="text-[10px] text-outline">18:04:01</div>
                      <div className="text-white font-semibold">Swipe signal received from London POS</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-outline">18:04:02</div>
                      <div className="text-error font-semibold">XGBoost scored 96% critical risk</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-outline">18:04:05</div>
                      <div className="text-white font-semibold">Outbound voice call placed via carrier SIP</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-outline">18:04:14</div>
                      <div className="text-primary font-semibold">Temporary freeze executed via banking API</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "audit" && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-surface-container rounded-xl border border-surface-variant/20 space-y-1">
                    <div className="text-[10px] text-outline uppercase font-bold">Cryptographic Ledger Seal</div>
                    <div className="text-white text-[11px] truncate">Root: 0x89f2a71bc4e02319d652ba7710cde42981ef4092bba</div>
                    <div className="text-primary text-[10px] font-bold">✓ CBUAE Tier-1 Certified Standards v2.4</div>
                  </div>

                  <Link
                    href="/dashboard/audit"
                    className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-white text-xs rounded-lg flex items-center justify-center gap-1.5 border border-surface-variant/30"
                  >
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    <span>Open Audit Center</span>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-outline font-mono text-xs">
              Select an incident from the table to inspect details
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
