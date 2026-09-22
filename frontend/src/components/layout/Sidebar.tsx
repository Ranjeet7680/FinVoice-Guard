"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-y-auto border-r border-surface-variant/30 text-on-surface">
      <div className="flex flex-col">
        {/* Brand Header */}
        <Link href="/" className="h-16 px-space-md flex items-center gap-space-sm bg-surface-container-lowest border-b border-surface-variant/20 hover:opacity-95 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
            <span className="material-symbols-outlined text-xl">shield</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">FinVoice Guard</span>
            <span className="font-code-sm text-code-sm text-primary uppercase tracking-widest">ENTERPRISE CONTROL</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="px-space-sm py-space-md flex flex-col gap-space-xs">
          
          {/* Command Center */}
          <div className="px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Command Center
          </div>
          <SidebarLink href="/dashboard" icon="grid_view" label="Dashboard" active={pathname === "/dashboard"} />

          {/* Operations */}
          <div className="mt-space-sm px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Operations
          </div>
          <SidebarLink href="/dashboard/calls/92831" icon="emergency" label="Fraud Operations" active={pathname === "/dashboard/calls/92831"} badge="96% RISK" />
          <SidebarLink href="/dashboard/calls/92831" icon="graphic_eq" label="Live AI Calls" active={pathname?.startsWith("/dashboard/calls")} badge="LIVE" />
          <SidebarLink href="/dashboard/collections" icon="credit_score" label="Governed Collections" active={pathname === "/dashboard/collections"} />
          <SidebarLink href="/dashboard/preauth" icon="verified" label="Pre-Authorization" active={pathname === "/dashboard/preauth"} />
          <SidebarLink href="/dashboard/cases" icon="fact_check" label="Case Management" active={pathname === "/dashboard/cases"} />
          <SidebarLink href="/dashboard/customers" icon="badge" label="Customer Registry" active={pathname === "/dashboard/customers"} />

          {/* AI Platform */}
          <div className="mt-space-sm px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
            AI Platform (ElevenLabs)
          </div>
          <SidebarLink href="/dashboard/architecture" icon="architecture" label="Box L Architecture & Canvas" active={pathname === "/dashboard/architecture"} badge="STAGE 1" />
          <SidebarLink href="/dashboard/traces" icon="polyline" label="Agent Traces & Execution" active={pathname === "/dashboard/traces"} />
          <SidebarLink href="/dashboard/policies" icon="gavel" label="Policy Engine & Guardrails" active={pathname === "/dashboard/policies"} />
          <SidebarLink href="/dashboard/agents" icon="record_voice_over" label="Voice Agents Runtime" active={pathname === "/dashboard/agents"} />
          <SidebarLink href="/dashboard/knowledge" icon="menu_book" label="Knowledge Base & RAG" active={pathname === "/dashboard/knowledge"} />

          {/* Governance & Audit */}
          <div className="mt-space-sm px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Governance & Audit
          </div>
          <SidebarLink href="/dashboard/audit" icon="history_edu" label="Audit Center" active={pathname === "/dashboard/audit"} />
          <SidebarLink href="/dashboard/compliance" icon="policy" label="Compliance Monitor" active={pathname === "/dashboard/compliance"} />
          <SidebarLink href="/dashboard/escalations" icon="support_agent" label="Human Escalations (H)" active={pathname === "/dashboard/escalations"} />

          {/* Admin */}
          <div className="mt-space-sm px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Admin
          </div>
          <SidebarLink href="/onboarding" icon="lock_reset" label="Enterprise Setup / 2FA" />
          <SidebarLink href="/dashboard/team" icon="group" label="Team & Access" active={pathname === "/dashboard/team"} />
          <SidebarLink href="/dashboard/integrations" icon="hub" label="Integrations & Webhooks" active={pathname === "/dashboard/integrations"} />
          <SidebarLink href="/dashboard/settings" icon="settings" label="Platform Settings" active={pathname === "/dashboard/settings"} />
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="p-space-sm bg-surface-container-lowest flex flex-col gap-space-xs border-t border-surface-variant/20">
        <div className="flex items-center justify-between px-space-xs">
          <span className="font-code-sm text-code-sm text-outline-variant">SESSION ID: #04-ENC</span>
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant px-space-xs">
          <span>v4.18.2 CBUAE</span>
          <Link href="/" className="text-primary hover:underline flex items-center gap-0.5">
            <span>Public Site</span>
            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label, active = false, badge }: { href: string; icon: string; label: string; active?: boolean; badge?: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-space-sm py-space-xs rounded-lg transition-colors font-body-sm text-body-sm ${
        active
          ? "bg-primary-container text-on-primary-container font-headline-sm shadow-sm font-semibold"
          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
      }`}
    >
      <div className="flex items-center gap-space-sm truncate">
        <span className="material-symbols-outlined text-lg">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-code-sm font-bold shrink-0 ${
          badge.includes("RISK") || badge === "LIVE"
            ? "bg-error text-on-error animate-pulse"
            : "bg-surface-container-highest text-primary border border-primary/30"
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );
}
