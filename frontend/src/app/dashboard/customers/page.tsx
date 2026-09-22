"use client";

import React from "react";

export default function CustomersPage() {
  const customers = [
    { id: "CUST-10045", name: "Ahmed Khan", msisdn: "+971 50 ••• 8492", lang: "Urdu (اردو)", tier: "Premier Checking", status: "Active (Card Frozen)", risk: "96% High" },
    { id: "CUST-10046", name: "Rashid Al-Maktoum", msisdn: "+971 52 ••• 3918", lang: "Arabic (العربية)", tier: "Personal Auto Loan", status: "Hardship Hold", risk: "Low" },
    { id: "CUST-10047", name: "Fatima Al-Zahra", msisdn: "+971 55 ••• 1029", lang: "Arabic (العربية)", tier: "Family Health Gold", status: "Pre-Auth Co-signed", risk: "Low" },
    { id: "CUST-10048", name: "Sunita Sharma", msisdn: "+971 54 ••• 7721", lang: "Hindi (हिन्दी)", tier: "WPS Payroll Card", status: "Verified Standard", risk: "Low" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">badge</span>
              <span className="tracking-widest uppercase">Institutional Customer Registry</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Customer Registry & Biometric Profiles
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Encrypted customer registry linked with sovereign telecom towers, registered languages, and zero-storage acoustic voice prints.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Verified MSISDN</th>
                <th className="py-3 px-4">Preferred Language</th>
                <th className="py-3 px-4">Account Tier</th>
                <th className="py-3 px-4">Account State</th>
                <th className="py-3 px-4">Threat Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20 font-body-sm">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{c.id}</td>
                  <td className="py-3.5 px-4 font-medium text-white">{c.name}</td>
                  <td className="py-3.5 px-4 font-mono text-outline">{c.msisdn}</td>
                  <td className="py-3.5 px-4 text-primary font-mono text-xs">{c.lang}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{c.tier}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">{c.status}</td>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-error">{c.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
