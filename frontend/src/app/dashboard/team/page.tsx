"use client";

import React from "react";

export default function TeamAccessPage() {
  const members = [
    { name: "Ranjeet Kumar", email: "r.kumar@abcfinancial.ae", role: "Lead Organization Administrator", auth: "Hardware Key FIDO2", status: "Active (Current Session)" },
    { name: "Tariq Al-Hashimi", email: "t.hashimi@abcfinancial.ae", role: "Senior Fraud Specialist (Tier 2)", auth: "Okta SAML + MFA", status: "On-Duty Console" },
    { name: "Dr. Sarah Al-Nuaimi", email: "s.nuaimi@abcfinancial.ae", role: "Chief Medical Officer (Pre-Auth)", auth: "PKI Smartcard", status: "Authorized Signer" },
    { name: "Mona Mansoor", email: "m.mansoor@abcfinancial.ae", role: "Collections Compliance Officer", auth: "Azure AD + YubiKey", status: "Active" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
            <span className="material-symbols-outlined text-sm">group</span>
            <span className="tracking-widest uppercase">RBAC Security & Role Allocation</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Team & Access Control
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Dual-signoff risk officer management with strict zero-trust hardware authentication.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Officer Name</th>
                <th className="py-3 px-4">Institutional Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Authentication Method</th>
                <th className="py-3 px-4 text-right">Access State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20 font-body-sm">
              {members.map((m, idx) => (
                <tr key={idx} className="hover:bg-surface-container/50">
                  <td className="py-3.5 px-4 font-semibold text-white">{m.name}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-outline">{m.email}</td>
                  <td className="py-3.5 px-4 text-primary text-xs font-medium">{m.role}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-on-surface-variant">{m.auth}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
