"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-low/90 backdrop-blur-xl z-40 px-space-md flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-variant/20">
          <div className="flex items-center gap-space-md flex-1 max-w-2xl">
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container text-primary font-code-sm text-code-sm border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
              <span>System Operational | Encrypted Node 04</span>
            </div>
            
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input 
                className="w-full h-9 bg-surface-container-high rounded pl-9 pr-3 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-highest border border-surface-variant/30" 
                placeholder="Search call ID, customer, transaction, or policy rule..." 
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <button className="flex items-center gap-space-xs px-space-sm py-1.5 bg-surface-container-high rounded text-on-surface font-code-sm text-code-sm hover:bg-surface-container-highest transition-colors border border-surface-variant/30">
              <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
              <span>Today (Live Feed)</span>
            </button>
            
            <button className="relative p-1.5 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors border border-surface-variant/30">
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error-container text-on-error-container font-code-sm text-code-sm flex items-center justify-center font-bold">3</span>
            </button>

            <Link href="/onboarding" className="flex items-center gap-space-sm pl-space-xs hover:opacity-90 transition-opacity">
              <div className="flex flex-col text-right">
                <span className="font-headline-sm text-body-sm text-on-surface">Ranjeet Kumar</span>
                <span className="font-label-sm text-label-sm text-outline">Lead Administrator</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
                RK
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content Pane */}
        <main className="w-full pt-20 bg-surface flex-1 px-space-md">
          {children}
        </main>

        {/* Enterprise Bottom Governance Footer */}
        <footer className="w-full bg-surface-container-lowest px-space-md py-space-sm flex flex-col md:flex-row items-center justify-between gap-2 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-variant/20">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
            <span>AI Communicates</span>
            <span className="text-primary">•</span>
            <span>Policies Control</span>
            <span className="text-primary">•</span>
            <span>Humans Decide</span>
            <span className="text-primary">•</span>
            <span>Everything Auditable</span>
          </div>
          
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-surface-container font-code-sm text-code-sm text-primary border border-primary/20">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>CBUAE Certified Standards v2.4</span>
            </div>
            <span className="font-code-sm text-code-sm text-outline">Regional Tier-1 Auditing Enabled</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
