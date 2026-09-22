"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-r border-surface-variant/30 text-on-surface transition-all duration-300 ease-in-out ${
          /* Mobile behavior */
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          /* Desktop collapsed vs expanded */
          isCollapsed ? "lg:w-20" : "lg:w-72"
        } w-72`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between bg-surface-container-lowest border-b border-surface-variant/20 shrink-0">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 overflow-hidden"
              title="FinVoice Guard Home"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">shield</span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-headline-sm text-base font-bold tracking-tight text-white truncate">
                    FinVoice Guard
                  </span>
                  <span className="font-code-sm text-[10px] text-primary uppercase tracking-widest truncate">
                    ENTERPRISE CONTROL
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-outline hover:text-white hover:bg-surface-container lg:hidden transition-colors"
              title="Close sidebar"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Desktop collapse toggle button inside header */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex p-1.5 rounded-lg text-outline hover:text-white hover:bg-surface-container transition-colors"
                title="Collapse sidebar (Ctrl+B)"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
            )}
          </div>

          {/* Nav Links Scroll Area */}
          <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4 custom-scrollbar">
            
            {/* Command Center */}
            <div>
              {!isCollapsed ? (
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Command Center
                </div>
              ) : (
                <div className="w-8 mx-auto border-b border-surface-variant/30 my-1" />
              )}
              <div className="space-y-1 mt-1">
                <SidebarItem
                  href="/dashboard"
                  icon="grid_view"
                  label="Dashboard"
                  active={pathname === "/dashboard"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
              </div>
            </div>

            {/* Operations */}
            <div>
              {!isCollapsed ? (
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Operations
                </div>
              ) : (
                <div className="w-8 mx-auto border-b border-surface-variant/30 my-1" />
              )}
              <div className="space-y-1 mt-1">
                <SidebarItem
                  href="/dashboard/fraud"
                  icon="emergency"
                  label="Fraud Management"
                  active={pathname === "/dashboard/fraud"}
                  badge="ML SIM"
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/calls/92831"
                  icon="graphic_eq"
                  label="Tactical Call Console"
                  active={pathname?.startsWith("/dashboard/calls")}
                  badge="LIVE"
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/collections"
                  icon="credit_score"
                  label="Governed Collections"
                  active={pathname === "/dashboard/collections"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/preauth"
                  icon="verified"
                  label="Pre-Authorization"
                  active={pathname === "/dashboard/preauth"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/cases"
                  icon="fact_check"
                  label="Case Management"
                  active={pathname === "/dashboard/cases"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/customers"
                  icon="badge"
                  label="Customer Registry"
                  active={pathname === "/dashboard/customers"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
              </div>
            </div>

            {/* AI Platform */}
            <div>
              {!isCollapsed ? (
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
                  AI Platform (ElevenLabs)
                </div>
              ) : (
                <div className="w-8 mx-auto border-b border-surface-variant/30 my-1" />
              )}
              <div className="space-y-1 mt-1">
                <SidebarItem
                  href="/dashboard/architecture"
                  icon="architecture"
                  label="Box L Architecture & Canvas"
                  active={pathname === "/dashboard/architecture"}
                  badge="STAGE 1"
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/developer"
                  icon="terminal"
                  label="AI / ML Control Center"
                  active={pathname === "/dashboard/developer"}
                  badge="STAGE 2"
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/traces"
                  icon="polyline"
                  label="Agent Traces & Execution"
                  active={pathname === "/dashboard/traces"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/policies"
                  icon="gavel"
                  label="Policy Engine & Guardrails"
                  active={pathname === "/dashboard/policies"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/agents"
                  icon="record_voice_over"
                  label="Voice Agents Runtime"
                  active={pathname === "/dashboard/agents"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/knowledge"
                  icon="menu_book"
                  label="Knowledge Base & RAG"
                  active={pathname === "/dashboard/knowledge"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
              </div>
            </div>

            {/* Governance & Audit */}
            <div>
              {!isCollapsed ? (
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Governance & Audit
                </div>
              ) : (
                <div className="w-8 mx-auto border-b border-surface-variant/30 my-1" />
              )}
              <div className="space-y-1 mt-1">
                <SidebarItem
                  href="/dashboard/audit"
                  icon="history_edu"
                  label="Audit Center"
                  active={pathname === "/dashboard/audit"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/compliance"
                  icon="policy"
                  label="Compliance Monitor"
                  active={pathname === "/dashboard/compliance"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/escalations"
                  icon="support_agent"
                  label="Human Escalations (H)"
                  active={pathname === "/dashboard/escalations"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
              </div>
            </div>

            {/* Admin */}
            <div>
              {!isCollapsed ? (
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Admin & Setup
                </div>
              ) : (
                <div className="w-8 mx-auto border-b border-surface-variant/30 my-1" />
              )}
              <div className="space-y-1 mt-1">
                <SidebarItem
                  href="/onboarding"
                  icon="lock_reset"
                  label="Enterprise Setup / 2FA"
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/team"
                  icon="group"
                  label="Team & Access"
                  active={pathname === "/dashboard/team"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/integrations"
                  icon="hub"
                  label="Integrations & Webhooks"
                  active={pathname === "/dashboard/integrations"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
                <SidebarItem
                  href="/dashboard/settings"
                  icon="settings"
                  label="Platform Settings"
                  active={pathname === "/dashboard/settings"}
                  collapsed={isCollapsed}
                  onNav={() => setMobileOpen(false)}
                />
              </div>
            </div>

          </nav>

          {/* Footer System Status */}
          <div className="p-3 bg-surface-container-lowest border-t border-surface-variant/20 shrink-0">
            {!isCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-outline">NODE 04 • CBUAE</span>
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-outline">
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="hidden lg:flex items-center gap-1 text-on-surface-variant hover:text-white transition-colors"
                    title="Collapse sidebar"
                  >
                    <span className="material-symbols-outlined text-sm">first_page</span>
                    <span>Collapse</span>
                  </button>
                  <Link
                    href="/"
                    className="text-primary hover:underline flex items-center gap-0.5 ml-auto"
                  >
                    <span>Public Site</span>
                    <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                  title="Expand sidebar (Ctrl+B)"
                >
                  <span className="material-symbols-outlined text-lg">last_page</span>
                </button>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" title="System Operational" />
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  badge,
  collapsed = false,
  onNav,
}: {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
  badge?: string;
  collapsed?: boolean;
  onNav?: () => void;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        onClick={onNav}
        className={`flex items-center rounded-lg transition-colors text-sm font-medium ${
          collapsed
            ? "justify-center w-12 h-10 mx-auto"
            : "justify-between px-3 py-2"
        } ${
          active
            ? "bg-primary text-on-primary font-semibold shadow-md shadow-primary/20"
            : "text-on-surface-variant hover:bg-surface-container hover:text-white"
        }`}
        title={collapsed ? label : undefined}
      >
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 truncate"}`}>
          <span className="material-symbols-outlined text-xl shrink-0">{icon}</span>
          {!collapsed && <span className="truncate">{label}</span>}
        </div>

        {!collapsed && badge && (
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
              badge.includes("RISK") || badge === "LIVE"
                ? "bg-error text-white animate-pulse"
                : "bg-surface-container-highest text-primary border border-primary/30"
            }`}
          >
            {badge}
          </span>
        )}
      </Link>

      {/* Floating Tooltip in Collapsed Mode */}
      {collapsed && (
        <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-surface-container-highest text-white text-xs font-mono rounded-md shadow-2xl border border-surface-variant/40 whitespace-nowrap z-50 items-center gap-2 pointer-events-none">
          <span>{label}</span>
          {badge && (
            <span className="text-[9px] px-1 py-0.2 bg-primary/20 text-primary rounded font-bold">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
