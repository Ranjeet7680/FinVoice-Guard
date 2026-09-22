"use client";

import React from "react";

interface FinVoiceLogoProps {
  variant?: "icon" | "horizontal" | "stacked";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  animated?: boolean;
  className?: string;
  showSubtitle?: boolean;
}

const SIZE_MAP = {
  xs: { icon: 20, text: "text-sm", sub: "text-[8px]" },
  sm: { icon: 32, text: "text-lg", sub: "text-[9px]" },
  md: { icon: 40, text: "text-xl", sub: "text-[10px]" },
  lg: { icon: 52, text: "text-2xl", sub: "text-[11px]" },
  xl: { icon: 68, text: "text-3xl", sub: "text-xs" },
  "2xl": { icon: 96, text: "text-4xl", sub: "text-sm" },
};

export default function FinVoiceLogo({
  variant = "horizontal",
  size = "md",
  animated = false,
  className = "",
  showSubtitle = true,
}: FinVoiceLogoProps) {
  const config = SIZE_MAP[size] || SIZE_MAP.md;
  const iconPx = config.icon;

  const ShieldIcon = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${
        animated ? "group" : ""
      }`}
      style={{ width: iconPx, height: iconPx }}
    >
      {/* Ambient glow backdrop */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#19D3AE]/30 via-[#00A2FD]/20 to-transparent blur-md transition-all duration-500 ${
          animated ? "group-hover:blur-lg group-hover:scale-110" : ""
        }`}
      />

      {/* SVG Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_12px_rgba(25,211,174,0.35)]"
      >
        <defs>
          {/* Outer Shield Gradient */}
          <linearGradient id="fvgShieldGrad" x1="15" y1="8" x2="85" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#19D3AE" />
            <stop offset="50%" stopColor="#00A2FD" />
            <stop offset="100%" stopColor="#0D1B2A" />
          </linearGradient>

          {/* Inner Ground Gradient */}
          <linearGradient id="fvgInnerGrad" x1="50" y1="12" x2="50" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#07111F" />
            <stop offset="100%" stopColor="#0D1B2A" />
          </linearGradient>

          {/* Soundwave Bar Primary Gradient */}
          <linearGradient id="fvgWaveGradPrimary" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5BFBD4" />
            <stop offset="60%" stopColor="#19D3AE" />
            <stop offset="100%" stopColor="#00A2FD" />
          </linearGradient>

          {/* Soundwave Bar Side Gradient */}
          <linearGradient id="fvgWaveGradSide" x1="50" y1="30" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#19D3AE" />
            <stop offset="100%" stopColor="#0077CC" />
          </linearGradient>

          {/* Center Vault Core Radial Glow */}
          <radialGradient id="fvgCoreGlow" cx="50" cy="50" r="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#5BFBD4" />
            <stop offset="100%" stopColor="#19D3AE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Shield Bevel Contour */}
        <path
          d="M50 7.5L20 20.5V45C20 66.5 32.8 86.2 50 92.5C67.2 86.2 80 66.5 80 45V20.5L50 7.5Z"
          fill="url(#fvgInnerGrad)"
          stroke="url(#fvgShieldGrad)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Inner Shield Accent Rim */}
        <path
          d="M50 14L26 24.5V45C26 62.5 36.5 78.5 50 84.5C63.5 78.5 74 62.5 74 45V24.5L50 14Z"
          fill="none"
          stroke="#19D3AE"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />

        {/* Voice Frequency Waveform - 5 Institutional Acoustic Bars */}
        {/* Bar 1: Far Left (Outer Harmonic) */}
        <rect
          x="32"
          y="42"
          width="4.5"
          height="16"
          rx="2.25"
          fill="url(#fvgWaveGradSide)"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: "1.4s", animationDelay: "0.2s" }}
        />

        {/* Bar 2: Mid Left (Rising Velocity) */}
        <rect
          x="40"
          y="34"
          width="4.5"
          height="32"
          rx="2.25"
          fill="url(#fvgWaveGradPrimary)"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: "1.1s", animationDelay: "0.1s" }}
        />

        {/* Bar 3: Center Apex (Vault Core Pillar) */}
        <rect
          x="47.75"
          y="25"
          width="4.5"
          height="50"
          rx="2.25"
          fill="url(#fvgWaveGradPrimary)"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: "1.6s" }}
        />

        {/* Bar 4: Mid Right (Declining Resonance) */}
        <rect
          x="55.5"
          y="34"
          width="4.5"
          height="32"
          rx="2.25"
          fill="url(#fvgWaveGradPrimary)"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: "1.2s", animationDelay: "0.3s" }}
        />

        {/* Bar 5: Far Right (Outer Harmonic) */}
        <rect
          x="63.5"
          y="42"
          width="4.5"
          height="16"
          rx="2.25"
          fill="url(#fvgWaveGradSide)"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: "1.5s", animationDelay: "0.4s" }}
        />

        {/* Central Cryptographic Biometric Lock Keyhole / Vault Eye */}
        <circle cx="50" cy="50" r="5" fill="#07111F" stroke="#19D3AE" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" className={animated ? "animate-ping opacity-75" : ""} />
        <circle cx="50" cy="50" r="2" fill="url(#fvgCoreGlow)" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {ShieldIcon}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        {ShieldIcon}
        <div className="flex flex-col items-center">
          <span className={`font-extrabold tracking-tight text-white font-sans ${config.text}`}>
            FINVOICE <span className="text-[#19D3AE]">GUARD</span>
          </span>
          {showSubtitle && (
            <span className={`font-mono text-[#91A4B7] tracking-widest uppercase mt-0.5 ${config.sub}`}>
              GOVERNED VOICE AI FOR FINANCIAL WORKFLOWS
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {ShieldIcon}
      <div className="flex flex-col text-left min-w-0">
        <span className={`font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none font-sans ${config.text}`}>
          FINVOICE <span className="text-[#19D3AE]">GUARD</span>
        </span>
        {showSubtitle && (
          <span className={`font-mono text-[#91A4B7] tracking-wider uppercase truncate mt-1 ${config.sub}`}>
            GOVERNED VOICE AI FOR FINANCIAL WORKFLOWS
          </span>
        )}
      </div>
    </div>
  );
}
