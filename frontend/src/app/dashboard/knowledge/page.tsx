"use client";

import React from "react";

export default function KnowledgeBasePage() {
  const documents = [
    { title: "CBUAE Consumer Protection Standards (Circular No. 28/2023)", category: "Regulatory Mandate", format: "PDF / Vectorized", embeddings: 1420, updated: "2026-03-10" },
    { title: "Standard Operating Script: Fraud Dispute Escalation (Urdu/Arabic)", category: "Agent Script", format: "Markdown", embeddings: 580, updated: "2026-03-18" },
    { title: "Card Network Falcon Risk Score Threshold Matrix", category: "Risk Rulebook", format: "JSON Schema", embeddings: 310, updated: "2026-03-22" },
    { title: "Collections Payment Plan Restructuring Guide (Tier 1)", category: "Treatment Strategy", format: "PDF / Vectorized", embeddings: 890, updated: "2026-03-01" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span className="tracking-widest uppercase">ElevenLabs Knowledge Base & RAG</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Institutional Knowledge Base & Grounding
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Strictly vetted financial policy documents, approved dialogue scripts, and regulatory circulars grounded into the voice agent runtime.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Vector Chunks</th>
                <th className="py-3 px-4">Last Grounding</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/20 font-body-sm">
              {documents.map((doc, idx) => (
                <tr key={idx} className="hover:bg-surface-container/50">
                  <td className="py-3.5 px-4 font-medium text-white">{doc.title}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-primary">{doc.category}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant text-xs">{doc.format}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">{doc.embeddings} Chunks</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-outline">{doc.updated}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
                      ACTIVE RAG
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
