"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "critical" | "warning" | "info";
  href: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Critical Fraud Vector Detected",
    description: "Call #92831: Ahmed Khan (Urdu/Eng) POS London vs Cell Dubai. 96% risk score.",
    time: "2m ago",
    type: "critical",
    href: "/dashboard/calls/92831",
    read: false,
  },
  {
    id: "notif-2",
    title: "Policy FRAUD-V3.2 Invoked",
    description: "Blocked unauthorized PIN disclosure attempt on call #92830.",
    time: "14m ago",
    type: "warning",
    href: "/dashboard/policies",
    read: false,
  },
  {
    id: "notif-3",
    title: "Specialist Warm Handoff Armed",
    description: "Lead fraud investigator Tariq Al-Mansoor assigned to case #92831.",
    time: "22m ago",
    type: "info",
    href: "/dashboard/escalations",
    read: false,
  },
];

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  badge?: string;
}

interface SearchCategory {
  category: string;
  items: SearchItem[];
}

const SEARCH_ITEMS: SearchCategory[] = [
  {
    category: "Live Operations & Calls",
    items: [
      { id: "call-92831", title: "Call #92831 — Fraud Intervention", subtitle: "Ahmed Khan • Urdu (اردو) • 96% Critical Risk", href: "/dashboard/calls/92831", icon: "emergency", badge: "CRITICAL" },
      { id: "call-92830", title: "Call #92830 — Governed Collections", subtitle: "Rashid Al-Maktoum • Hindi (हिन्दी) • 09:00-20:00 Window", href: "/dashboard/collections", icon: "credit_score", badge: "LIVE" },
      { id: "call-92829", title: "Call #92829 — Everyday Servicing", subtitle: "Fatima Al-Zahra • Arabic (العربية) • Balance Query", href: "/dashboard/calls/92831", icon: "graphic_eq", badge: "LIVE" },
      { id: "call-92828", title: "Call #92828 — Fraud Investigation", subtitle: "Liam Smith • English (UK) • Human Escalation (H)", href: "/dashboard/escalations", icon: "support_agent", badge: "HANDOFF" },
    ],
  },
  {
    category: "AI Governance & Architecture",
    items: [
      { id: "arch-boxl", title: "Box L Architecture & Canvas", subtitle: "Stage 1 ElevenLabs 3-Zone Topology & Evidence Audit", href: "/dashboard/architecture", icon: "architecture", badge: "CORE" },
      { id: "policy-fraud", title: "Policy Engine & Guardrails", subtitle: "Rule FRAUD-V3.2, COLL-04, OPT-OUT-01 Deterministic Rules", href: "/dashboard/policies", icon: "gavel", badge: "POLICY" },
      { id: "merkle-audit", title: "Audit Center & Merkle Forensics", subtitle: "SHA-256 Cryptographic Verification & CBUAE Export Packages", href: "/dashboard/audit", icon: "history_edu", badge: "GOVERNANCE" },
      { id: "traces", title: "Agent Execution Traces", subtitle: "Sub-200ms Latency Waterfall & Tool Call Observability", href: "/dashboard/traces", icon: "polyline", badge: "TELEMETRY" },
      { id: "voice-agents", title: "ElevenLabs Voice Agents Runtime", subtitle: "Multilingual v2 Model, Scribe ASR & Voice Tuning", href: "/dashboard/agents", icon: "record_voice_over", badge: "ELEVENLABS" },
      { id: "preauth", title: "Clinical Pre-Authorization", subtitle: "Hospital Provider Intake & Dual-Clinician Gate (H)", href: "/dashboard/preauth", icon: "verified", badge: "CLINICAL" },
    ],
  },
  {
    category: "Enterprise Admin & Records",
    items: [
      { id: "customers", title: "Customer Registry", subtitle: "Ahmed Khan, Rashid Al-Maktoum, Fatima Al-Zahra", href: "/dashboard/customers", icon: "badge" },
      { id: "cases", title: "Case Management & Investigations", subtitle: "Active fraud, hardship, and dispute investigation tickets", href: "/dashboard/cases", icon: "fact_check" },
      { id: "team", title: "Team & Role-Based Access Control", subtitle: "Tier-1 Supervisors, Compliance Officers & RBAC", href: "/dashboard/team", icon: "group" },
      { id: "onboarding", title: "Enterprise Setup & 2FA Recovery", subtitle: "Central Bank of UAE Organization Key Management", href: "/onboarding", icon: "lock_reset" },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Sidebar responsive states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Search Palette state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Notifications Popover state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Timeframe filter state
  const [timeframeOpen, setTimeframeOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("Today (Live Feed)");

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Restore collapsed preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("finvoice_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggleCollapse = (valOrFn: boolean | ((prev: boolean) => boolean)) => {
    setIsCollapsed((prev) => {
      const next = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      try {
        localStorage.setItem("finvoice_sidebar_collapsed", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Keyboard Shortcuts: Ctrl+K / Cmd+K for search, Ctrl+B for sidebar toggle, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (window.innerWidth < 1024) {
          setMobileOpen((prev) => !prev);
        } else {
          handleToggleCollapse((prev) => !prev);
        }
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setTimeframeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Filter search results
  const filteredCategories = SEARCH_ITEMS.map((cat) => {
    const filtered = cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, items: filtered };
  }).filter((cat) => cat.items.length > 0);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      
      {/* Responsive Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={handleToggleCollapse}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area with Dynamic Padding */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        } pl-0`}
      >
        
        {/* Top Navbar Header */}
        <header
          className={`fixed top-0 right-0 h-16 bg-surface-container-low/95 backdrop-blur-xl z-40 px-4 sm:px-6 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-surface-variant/30 transition-all duration-300 ease-in-out ${
            isCollapsed ? "lg:left-20" : "lg:left-72"
          } left-0`}
        >
          {/* Left: Sidebar Toggle + Node Status + Global Search Trigger */}
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            
            {/* Navbar Open & Close Toggle Button */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen((prev) => !prev);
                } else {
                  handleToggleCollapse((prev) => !prev);
                }
              }}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-white transition-colors border border-surface-variant/30 flex items-center justify-center shrink-0 shadow-sm"
              title={
                isCollapsed
                  ? "Open sidebar (Ctrl+B)"
                  : "Close sidebar (Ctrl+B)"
              }
              aria-label="Toggle navigation sidebar"
            >
              <span className="material-symbols-outlined text-xl text-primary">
                {isCollapsed ? "menu" : "menu_open"}
              </span>
            </button>

            {/* System Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container text-primary font-mono text-xs border border-primary/20 shrink-0">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
              <span className="truncate">System Operational • Node 04</span>
            </div>
            
            {/* Global Interactive Search Input */}
            <div
              onClick={() => setSearchOpen(true)}
              className="relative flex-1 cursor-pointer group"
            >
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg group-hover:text-primary transition-colors">
                search
              </span>
              <div className="w-full h-9 bg-surface-container-high rounded pl-9 pr-14 text-outline font-body-sm text-xs flex items-center border border-surface-variant/30 group-hover:border-primary/40 group-hover:bg-surface-container-highest transition-all select-none">
                <span className="truncate">Search call ID, customer, transaction, or policy rule...</span>
              </div>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 font-mono text-[10px] text-outline-variant bg-surface-container px-1.5 py-0.5 rounded border border-surface-variant/40">
                <span>Ctrl K</span>
              </div>
            </div>
          </div>

          {/* Right: Date Filter + Notifications Popover + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Interactive Timeframe Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTimeframeOpen(!timeframeOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high rounded text-on-surface font-mono text-xs hover:bg-surface-container-highest transition-colors border border-surface-variant/30 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                <span className="hidden md:inline">{selectedTimeframe}</span>
                <span className="material-symbols-outlined text-xs text-outline">arrow_drop_down</span>
              </button>

              {timeframeOpen && (
                <>
                  <div
                    onClick={() => setTimeframeOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-high border border-surface-variant/40 rounded-xl shadow-2xl py-1.5 z-50 font-mono text-xs">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-outline border-b border-surface-variant/20 mb-1">
                      Telemetry Window
                    </div>
                    {[
                      "Today (Live Feed)",
                      "Last 24 Hours",
                      "Past 7 Days",
                      "Past 30 Days (Audit Mode)",
                    ].map((timeOption) => (
                      <button
                        key={timeOption}
                        onClick={() => {
                          setSelectedTimeframe(timeOption);
                          setTimeframeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface-container-highest transition-colors ${
                          selectedTimeframe === timeOption ? "text-primary font-bold bg-primary/10" : "text-on-surface"
                        }`}
                      >
                        <span>{timeOption}</span>
                        {selectedTimeframe === timeOption && (
                          <span className="material-symbols-outlined text-sm text-primary">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Interactive Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-white hover:bg-surface-container-highest transition-colors border border-surface-variant/30 flex items-center justify-center"
                title="System Notifications"
                aria-label="View security and governance alerts"
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error text-white font-mono text-[10px] flex items-center justify-center font-bold animate-pulse shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <>
                  <div
                    onClick={() => setNotificationsOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-high border border-surface-variant/40 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-3 bg-surface-container-lowest border-b border-surface-variant/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-xs font-bold text-white uppercase tracking-wider">
                          Alerts & Incidents
                        </span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-error/20 text-error">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] font-mono text-primary hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-surface-variant/20">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-outline font-mono">
                          No active security alerts
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              router.push(n.href);
                              setNotificationsOpen(false);
                            }}
                            className={`p-3 hover:bg-surface-container transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                              !n.read ? "bg-surface-container/40" : ""
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`material-symbols-outlined text-lg shrink-0 mt-0.5 ${
                                  n.type === "critical"
                                    ? "text-error"
                                    : n.type === "warning"
                                    ? "text-tertiary"
                                    : "text-primary"
                                }`}
                              >
                                {n.type === "critical"
                                  ? "emergency"
                                  : n.type === "warning"
                                  ? "shield"
                                  : "info"}
                              </span>
                              <div className="space-y-0.5">
                                <div className="text-xs font-bold text-white leading-tight">
                                  {n.title}
                                </div>
                                <div className="text-[11px] text-on-surface-variant leading-snug line-clamp-2">
                                  {n.description}
                                </div>
                                <div className="text-[10px] font-mono text-outline">{n.time}</div>
                              </div>
                            </div>
                            <button
                              onClick={(e) => clearNotification(n.id, e)}
                              className="text-outline hover:text-white p-1 rounded transition-colors shrink-0"
                              title="Dismiss"
                            >
                              <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-2 bg-surface-container-lowest border-t border-surface-variant/20 text-center">
                      <Link
                        href="/dashboard/calls/92831"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open Live Incident Console</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <Link
              href="/onboarding"
              className="flex items-center gap-2 pl-1 hover:opacity-90 transition-opacity"
              title="Enterprise Admin / 2FA"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-headline-sm text-xs font-semibold text-on-surface">
                  Ranjeet Kumar
                </span>
                <span className="font-mono text-[10px] text-outline">
                  Lead Administrator
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs shadow-inner">
                RK
              </div>
            </Link>

          </div>
        </header>

        {/* Main Content Body */}
        <main className="w-full pt-20 bg-surface flex-1 px-4 sm:px-6">
          {children}
        </main>

        {/* Enterprise Bottom Governance Footer */}
        <footer className="w-full bg-surface-container-lowest px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-variant/20 mt-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-on-surface-variant font-mono text-xs">
            <span>AI Communicates</span>
            <span className="text-primary">•</span>
            <span>Policies Control</span>
            <span className="text-primary">•</span>
            <span>Humans Decide</span>
            <span className="text-primary">•</span>
            <span>Everything Auditable</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container font-mono text-xs text-primary border border-primary/20">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>CBUAE Certified Standards v2.4</span>
            </div>
            <span className="font-mono text-xs text-outline hidden sm:inline">
              Regional Tier-1 Auditing Enabled
            </span>
          </div>
        </footer>

      </div>

      {/* Global Interactive Spotlight Command Palette (Ctrl+K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-2xl bg-surface-container-high border border-surface-variant/40 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col">
            
            {/* Search Input Box */}
            <div className="p-4 border-b border-surface-variant/30 flex items-center gap-3 bg-surface-container-lowest">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a command, call ID, customer name, or policy..."
                className="w-full bg-transparent text-white placeholder-outline focus:outline-none text-sm font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-outline hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
              <kbd className="px-2 py-0.5 bg-surface-container rounded text-[10px] font-mono text-outline border border-surface-variant/30">
                ESC
              </kbd>
            </div>

            {/* Results Scroll Area */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
              {filteredCategories.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">find_in_page</span>
                  <p className="text-sm text-outline font-mono">No matching records found for &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-outline-variant mt-1">Try searching &quot;Urdu&quot;, &quot;Fraud&quot;, &quot;Merkle&quot;, or &quot;92831&quot;</p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.category} className="space-y-1">
                    <div className="px-3 py-1 text-[11px] uppercase font-mono font-bold text-outline">
                      {category.category}
                    </div>
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          router.push(item.href);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                          </div>
                          <div className="truncate">
                            <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-outline font-mono truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {item.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container text-primary border border-primary/30 shrink-0 ml-2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="p-3 bg-surface-container-lowest border-t border-surface-variant/20 flex items-center justify-between text-[11px] font-mono text-outline">
              <div className="flex items-center gap-4">
                <span><kbd className="px-1 bg-surface-container rounded">↵</kbd> to select</span>
                <span><kbd className="px-1 bg-surface-container rounded">esc</kbd> to close</span>
                <span><kbd className="px-1 bg-surface-container rounded">ctrl+b</kbd> sidebar</span>
              </div>
              <span className="text-primary">FinVoice Command Hub</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
