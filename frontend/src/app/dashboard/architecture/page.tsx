"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState<"architecture" | "callflow" | "guardrails" | "metrics" | "evidence">("architecture");

  return (
    <div className="flex flex-col w-full pb-space-xl text-on-surface">
      {/* Top Header */}
      <div className="flex flex-col gap-space-sm pt-space-xs mb-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-code-sm text-code-sm text-primary">
              <span className="material-symbols-outlined text-sm">architecture</span>
              <span className="tracking-widest uppercase">ElevenLabs Idea Canvas — Stage 1 Submission</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-code-sm text-code-sm">Track 1: Banking & Insurance</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Technical Architecture & System Governance (Box L)
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Deterministic voice agent architecture built on ElevenLabs Agents Platform, Agent Workflows, Scribe v2 STT, Eleven v3 TTS, and private banking policy guardrails.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <Link
              href="/dashboard/calls/92831"
              className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary font-headline-sm text-body-sm font-semibold rounded shadow-md hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-base">emergency</span>
              <span>Open Live Fraud Console</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
          <TabButton active={activeTab === "architecture"} onClick={() => setActiveTab("architecture")} label="Box L Architecture (3 Zones)" icon="account_tree" />
          <TabButton active={activeTab === "callflow"} onClick={() => setActiveTab("callflow")} label="5-Step Call Flow & RL Safety" icon="timeline" />
          <TabButton active={activeTab === "guardrails"} onClick={() => setActiveTab("guardrails")} label="Guardrail Architecture Matrix" icon="gavel" />
          <TabButton active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} label="Stage 1 Metrics & Baseline" icon="analytics" />
          <TabButton active={activeTab === "evidence"} onClick={() => setActiveTab("evidence")} label="Institutional Evidence & Interviews" icon="record_voice_over" />
        </div>
      </div>

      {/* TAB 1: BOX L ARCHITECTURE */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          {/* Main 3-Zone Architecture Container */}
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-surface-variant/20 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Box L: Three Clearly Separated System Zones
                </h3>
              </div>
              <div className="flex items-center gap-2 font-code-sm text-code-sm text-primary bg-surface-container px-3 py-1 rounded border border-primary/20">
                <span>● Filled Dot Marks Personal Data Boundary</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
              
              {/* Zone 1: Caller / Channel */}
              <div className="bg-surface-container rounded-xl p-5 border border-surface-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-surface-variant/20">
                    <span className="font-bold text-sm text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">call</span>
                      <span>1. CALLER / CHANNEL</span>
                    </span>
                    <span className="text-[10px] bg-surface-container-highest px-2 py-0.5 rounded text-outline">INGRESS</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mb-4">Customer engagement touchpoints with native telecom connectivity.</p>
                  
                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-on-surface font-semibold block">Sovereign PSTN / SIP Trunking</span>
                      <span className="text-outline text-[11px]">Direct encrypted telephony via sovereign in-country carrier.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-on-surface font-semibold block">Mobile Banking App Push</span>
                      <span className="text-outline text-[11px]">Out-of-band biometric challenge handshake trigger.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-on-surface font-semibold block">WhatsApp Business API Gateway</span>
                      <span className="text-outline text-[11px]">Cryptographic post-call receipt & case reference link.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-variant/20 flex items-center gap-2 text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-bold text-[11px]">Personal Data Boundary 1: Voice stream ingress</span>
                </div>
              </div>

              {/* Zone 2: ElevenLabs Platform */}
              <div className="bg-surface-container rounded-xl p-5 border-2 border-primary/40 shadow-[0_0_20px_rgba(76,240,201,0.15)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/30">
                    <span className="font-bold text-sm text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">psychology</span>
                      <span>2. ELEVENLABS PLATFORM</span>
                    </span>
                    <span className="text-[10px] bg-primary/20 text-primary font-bold px-2 py-0.5 rounded">RUNTIME</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mb-4">Enterprise voice conversational stack with sub-200ms roundtrip execution.</p>
                  
                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-primary font-semibold block">Agents Platform & Workflows</span>
                      <span className="text-outline text-[11px]">Controls the 5-step deterministic fraud state machine.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-primary font-semibold block">Scribe v2 STT + Eleven v3 TTS</span>
                      <span className="text-outline text-[11px]">Zero-latency speech detection & native multilingual speech synthesis.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-primary font-semibold block">Server / Client Tools Gateway</span>
                      <span className="text-outline text-[11px]">Controlled mTLS integration into bank APIs with zero secrets exposure.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-primary font-semibold block">Post-Call Webhooks</span>
                      <span className="text-outline text-[11px]">Pushes verbatim dual-language transcript and action audit hashes.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-primary/30 flex items-center gap-2 text-primary-fixed">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed" />
                  <span className="font-bold text-[11px]">Personal Data Boundary 2: Ephemeral tokenization</span>
                </div>
              </div>

              {/* Zone 3: Institution Systems */}
              <div className="bg-surface-container rounded-xl p-5 border border-surface-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-surface-variant/20">
                    <span className="font-bold text-sm text-secondary flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-secondary">account_balance</span>
                      <span>3. INSTITUTION SYSTEMS</span>
                    </span>
                    <span className="text-[10px] bg-secondary/15 text-secondary px-2 py-0.5 rounded">SOVEREIGN</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant mb-4">Core banking, supervised risk models, and private regulatory ledgers.</p>
                  
                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-secondary font-semibold block">Supervised Fraud ML Model</span>
                      <span className="text-outline text-[11px]">Velocity, geolocation anomaly scoring (96% critical score).</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-secondary font-semibold block">Deterministic Policy Engine</span>
                      <span className="text-outline text-[11px]">Evaluates rule FRAUD-V3.2; returns ALLOW / BLOCK / HUMAN.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-secondary font-semibold block">Core Banking API (Temporary Freeze)</span>
                      <span className="text-outline text-[11px]">Only approved protective actions executed; fail-closed.</span>
                    </div>
                    <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-variant/20">
                      <span className="text-secondary font-semibold block">Human Fraud Specialist Queue (H)</span>
                      <span className="text-outline text-[11px]">Warm SIP transfer with synchronized incident dossier.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-variant/20 flex items-center gap-2 text-secondary">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="font-bold text-[11px]">Personal Data Boundary 3: Private Banking Network</span>
                </div>
              </div>

            </div>

            {/* Dependency Failure Handling */}
            <div className="mt-8 pt-6 border-t border-surface-variant/20">
              <h4 className="font-headline-sm text-body-sm text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-base">warning</span>
                <span>Dependency Failure Degradation Strategy (Fail-Closed Enforcement)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-error/30">
                  <span className="text-error font-bold block mb-1">Scenario A: ElevenLabs Outage</span>
                  <p className="text-on-surface-variant font-sans text-xs">
                    Automated voice agent does <strong>NOT</strong> attempt financial actions. Pipeline creates high-priority risk incident and routes call directly to human fraud desk via traditional PSTN failover.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-tertiary/30">
                  <span className="text-tertiary font-bold block mb-1">Scenario B: Core Banking API Outage</span>
                  <p className="text-on-surface-variant font-sans text-xs">
                    Agent cannot claim action succeeded. Discloses to customer: <em>&ldquo;System connectivity issue; your account alert is transferred to an on-duty specialist immediately.&rdquo;</em>
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-primary/30">
                  <span className="text-primary font-bold block mb-1">Scenario C: Policy Engine Outage</span>
                  <p className="text-on-surface-variant font-sans text-xs">
                    Strict <strong>FAIL CLOSED</strong> principle. Any unavailable policy automatically triggers <code className="text-error">BLOCK</code>. Zero protective or transactional tools can be invoked by the AI.
                  </p>
                </div>
              </div>
            </div>

            {/* The Two Strongest Component Justifications */}
            <div className="mt-8 pt-6 border-t border-surface-variant/20">
              <h4 className="font-headline-sm text-body-sm text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">verified</span>
                <span>The Two Strongest ElevenLabs Component Justifications</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body-sm text-body-sm">
                <div className="bg-surface-container p-4 rounded-xl border border-primary/30">
                  <span className="font-bold text-primary font-headline-sm block mb-1">1. Agent Workflows</span>
                  <p className="text-on-surface-variant text-xs leading-relaxed">
                    &ldquo;Agent Workflows enforce a deterministic sequence for mandatory disclosure, customer verification, policy evaluation, protective action, and human escalation instead of allowing unconstrained LLM conversational behavior.&rdquo;
                  </p>
                </div>
                <div className="bg-surface-container p-4 rounded-xl border border-secondary/30">
                  <span className="font-bold text-secondary font-headline-sm block mb-1">2. Server / Client Tools</span>
                  <p className="text-on-surface-variant text-xs leading-relaxed">
                    &ldquo;Tools provide controlled access to core bank functions such as transaction anomaly lookup, temporary card freeze, and case creation, with strict pre-execution authorization and fail-closed checks.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CALL FLOW & RL SAFETY */}
      {activeTab === "callflow" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Mandatory 5-Step Call Flow (Real-Time Fraud Intervention)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Step 1 opens with affirmative AI identity disclosure. Step 5 features explicit human handover <code className="text-tertiary">(H)</code>.
            </p>

            <div className="space-y-4">
              <CallFlowStep
                step="Step 1"
                title="Mandatory Disclosure"
                script='"Hello, I am an automated AI security voice assistant calling on behalf of ABC Financial regarding an urgent security alert."'
                detail="Non-skippable opening node. Establishes machine identity and institutional caller verification."
                color="border-primary text-primary"
              />
              <CallFlowStep
                step="Step 2"
                title="Zero-Credential Verification"
                script='"We sent a biometric prompt to your registered banking app. Please confirm if you see it."'
                detail="Zero PIN, CVV, OTP, or password collection over the audio channel. Employs out-of-band in-app verification challenge."
                color="border-secondary text-secondary"
              />
              <CallFlowStep
                step="Step 3"
                title="Incident Confirmation"
                script='"We detected an unverified £920 charge in London on your card ending in 8492. Do you recognize this charge?"'
                detail="Identifies transaction details and verifies whether cardholder disputes the anomaly."
                color="border-tertiary text-tertiary"
              />
              <CallFlowStep
                step="Step 4"
                title="Approved Protective Action"
                script='"Under bank policy, I have executed an immediate temporary card freeze to prevent further unauthorized attempts."'
                detail="Only pre-approved, reversible protective actions executed. Policy check verified before API invocation."
                color="border-error text-error"
              />
              <CallFlowStep
                step="Step 5"
                title="Human Handover (H)"
                script='"For permanent card blocking, dispute claims, or emergency replacement, I am connecting you to our Senior Fraud Officer Tariq."'
                detail="Warm SIP transfer bridge (H). Audio channel, synchronized transcript, and risk telemetry forwarded seamlessly."
                color="border-primary-fixed text-primary-fixed"
              />
            </div>

            {/* RL Conversation Optimization vs Safety Boundary */}
            <div className="mt-8 pt-6 border-t border-surface-variant/20">
              <h4 className="font-headline-sm text-body-sm text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">psychology</span>
                <span>Reinforcement Learning Boundary: Conversation Optimization Only</span>
              </h4>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant/30 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-primary font-bold block mb-2 font-headline-sm">RL Policy Optimizes:</span>
                    <ul className="space-y-1.5 text-on-surface-variant font-sans text-xs">
                      <li>• When to clarify ambiguous customer phrasing</li>
                      <li>• When to switch language/dialect to match customer tone</li>
                      <li>• When to repeat approved security instructions</li>
                      <li>• Conversation pacing & turn-taking latency</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-error font-bold block mb-2 font-headline-sm">Hard Safety Constraint (Zero RL Autonomy):</span>
                    <div className="p-3 bg-surface-container rounded border border-error/30 text-error">
                      <strong>RL CANNOT INFLUENCE:</strong> Policy evaluation, financial action execution, fund movements, or bypass customer verification. Hardcoded deterministic gate blocks all unapproved actions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GUARDRAILS MATRIX */}
      {activeTab === "guardrails" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg overflow-x-auto">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Mandatory Guardrail Architecture Matrix
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Specific programmatic mechanisms, not generic policy promises.
            </p>

            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Programmatic Mechanism</th>
                  <th className="py-3 px-4">Enforcement Level</th>
                  <th className="py-3 px-4">Audit Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/20 font-body-sm">
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Opening Disclosure</td>
                  <td className="py-3 px-4 text-on-surface-variant">Mandatory first workflow node before any conversation turn; cannot be skipped or deferred.</td>
                  <td className="py-3 px-4"><span className="text-primary font-code-sm text-code-sm font-bold bg-primary/10 px-2 py-0.5 rounded">HARD CONSTRAINT</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">DISCLOSURE_CONFIRMED</td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Consent to be Called</td>
                  <td className="py-3 px-4 text-on-surface-variant">Consent & opt-out status check verified in Core DB prior to initiating outbound telephony trigger.</td>
                  <td className="py-3 px-4"><span className="text-primary font-code-sm text-code-sm font-bold bg-primary/10 px-2 py-0.5 rounded">PRE-FLIGHT GATE</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">CONSENT_VERIFIED</td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Verification Without Secrets</td>
                  <td className="py-3 px-4 text-on-surface-variant">Approved challenge API via in-app push; PIN/password/CVV fields completely excluded from agent prompt & tools.</td>
                  <td className="py-3 px-4"><span className="text-primary font-code-sm text-code-sm font-bold bg-primary/10 px-2 py-0.5 rounded">ZERO CREDENTIAL</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">OUT_OF_BAND_PASS</td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Human Approval Gate</td>
                  <td className="py-3 px-4 text-on-surface-variant">Policy engine blocks permanent block/reissue/dispute actions and creates an interactive human queue ticket.</td>
                  <td className="py-3 px-4"><span className="text-tertiary font-code-sm text-code-sm font-bold bg-tertiary/10 px-2 py-0.5 rounded">HUMAN-IN-THE-LOOP</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">HUMAN_HANDOFF_ARMED</td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Opt-Out Enforcement</td>
                  <td className="py-3 px-4 text-on-surface-variant"><code className="text-primary font-code-sm text-code-sm">record_opt_out()</code> immediately severs active outbound call and records immutable suppression flag.</td>
                  <td className="py-3 px-4"><span className="text-error font-code-sm text-code-sm font-bold bg-error/10 px-2 py-0.5 rounded">INSTANT KILLSWITCH</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">OPT_OUT_COMMITTED</td>
                </tr>
                <tr className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-semibold text-on-surface">Escalation Thresholds</td>
                  <td className="py-3 px-4 text-on-surface-variant">Acoustic stress &gt; 80%, customer vulnerability markers, or dispute claims trigger instant <code className="text-primary font-code-sm text-code-sm">human_handoff()</code>.</td>
                  <td className="py-3 px-4"><span className="text-secondary font-code-sm text-code-sm font-bold bg-secondary/10 px-2 py-0.5 rounded">DYNAMIC TRIGGER</span></td>
                  <td className="py-3 px-4 font-code-sm text-code-sm text-outline">WARM_SIP_TRANSFERRED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: METRICS & BASELINE */}
      {activeTab === "metrics" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Stage 1 Key Performance Indicators (Max 3 Institutional KPIs)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Directly aligned with Box D evidence standards, with clear measurement protocols.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                    <th className="py-3 px-4">KPI Metric</th>
                    <th className="py-3 px-4">Institutional Baseline</th>
                    <th className="py-3 px-4">Target (FinVoice Guard)</th>
                    <th className="py-3 px-4">Measurement Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/20">
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4 font-semibold text-on-surface">
                      1. Fraud Alert → Customer Contact Latency
                    </td>
                    <td className="py-3.5 px-4 text-error font-mono font-bold">18 min 40 sec (Call Center Queue)</td>
                    <td className="py-3.5 px-4 text-primary font-mono font-bold">&lt; 45 seconds</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">Kafka risk event timestamp to SIP ringing timestamp.</td>
                  </tr>
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4 font-semibold text-on-surface">
                      2. Automated Customer Verification Rate
                    </td>
                    <td className="py-3.5 px-4 text-error font-mono font-bold">48.2% (Language Friction / Drop-off)</td>
                    <td className="py-3.5 px-4 text-primary font-mono font-bold">&gt; 90%</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">Verified voice calls / Total eligible outbound risk sessions.</td>
                  </tr>
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4 font-semibold text-on-surface">
                      3. Human Escalation Accuracy
                    </td>
                    <td className="py-3.5 px-4 text-error font-mono font-bold">62.0% (Misrouted or unnecessary queue)</td>
                    <td className="py-3.5 px-4 text-primary font-mono font-bold">&gt; 95%</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">Correct specialist escalations / Reviewed escalated cases.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-surface-container rounded-xl border border-surface-variant/30 text-xs font-mono text-on-surface-variant">
              <span className="text-primary font-bold">Audit Rule:</span> Baselines sourced from regional UAE retail banking fraud operations research. Zero synthetic vanity benchmarks.
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EVIDENCE & INTERVIEWS */}
      {activeTab === "evidence" && (
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-surface-variant/30 shadow-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Institutional User Research & Field Evidence
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Interviews with bank risk officers and fraud managers that directly shaped product guardrails.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-variant/30 font-code-sm text-code-sm text-outline uppercase bg-surface-container">
                    <th className="py-3 px-4">Role & Institution</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Key Field Insight</th>
                    <th className="py-3 px-4">Product Pivot Implemented</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/20">
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-on-surface block">VP Financial Crime Operations</span>
                      <span className="text-outline text-xs">UAE Tier-1 Retail Bank</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">2026-02-14</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      &ldquo;Customers hang up on voicebots if asked for security answers, assuming it is a voice clone scam.&rdquo;
                    </td>
                    <td className="py-3.5 px-4 text-primary font-medium">
                      Eliminated verbal security questions. Switched to out-of-band in-app mobile push challenge.
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-on-surface block">Head of Collections Compliance</span>
                      <span className="text-outline text-xs">Consumer Finance Institution</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">2026-02-28</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      &ldquo;Regulators penalize calling even 1 minute outside 09:00-20:00 or failing to immediately respect hardship opt-outs.&rdquo;
                    </td>
                    <td className="py-3.5 px-4 text-primary font-medium">
                      Built hard-coded calling hour enforcement and immediate autonomous opt-out killswitch.
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/50">
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-on-surface block">Senior Fraud Specialist</span>
                      <span className="text-outline text-xs">Card Issuance Network</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">2026-03-08</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      &ldquo;AI should never permanently cancel a card. Re-issuing costs \$40 and customer friction is huge.&rdquo;
                    </td>
                    <td className="py-3.5 px-4 text-primary font-medium">
                      Constrained AI strictly to reversible temporary card freeze. Permanent block requires human sign-off.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Build vs Mock Readiness */}
            <div className="mt-8 pt-6 border-t border-surface-variant/20">
              <h4 className="font-headline-sm text-body-sm text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">checklist</span>
                <span>Stage 2 Build vs Mock Transparency (14 October Readiness)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-surface-container p-4 rounded-xl border border-primary/30">
                  <span className="text-primary font-bold block mb-2 font-headline-sm">Genuinely Built & Running End-to-End:</span>
                  <ul className="space-y-1 text-on-surface-variant font-sans text-xs">
                    <li>✓ Web Dashboard & Interactive Tactical Consoles</li>
                    <li>✓ Fraud Event Ingestion Webhook</li>
                    <li>✓ Synthetic Cardholder & Transaction Datasets</li>
                    <li>✓ Supervised Fraud ML Risk Scoring (96% Critical)</li>
                    <li>✓ ElevenLabs Voice Agent & Workflows State Machine</li>
                    <li>✓ Native Multilingual Call & Live Urdu/English Transcript</li>
                    <li>✓ Deterministic Policy Engine & Temporary Freeze Simulation</li>
                    <li>✓ Warm Human Handoff Bridge to Specialist</li>
                    <li>✓ Cryptographic Merkle Forensics Audit Trail</li>
                  </ul>
                </div>
                <div className="bg-surface-container p-4 rounded-xl border border-surface-variant/40">
                  <span className="text-tertiary font-bold block mb-2 font-headline-sm">Simulated / Mock Integrations (Labeled):</span>
                  <ul className="space-y-1 text-on-surface-variant font-sans text-xs">
                    <li>○ Production Core Banking Mainframe Integration (MOCK REST)</li>
                    <li>○ Real Visa/Mastercard Global Hotlist API (MOCK FALCON)</li>
                    <li>○ Real Customer Production PII (SYNTHETIC DATA)</li>
                    <li>○ Live Statutory Regulatory Submissions (DEMO MODE)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded font-code-sm text-code-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
        active
          ? "bg-primary text-on-primary font-semibold shadow-sm"
          : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
      }`}
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function CallFlowStep({ step, title, script, detail, color }: { step: string; title: string; script: string; detail: string; color: string }) {
  return (
    <div className={`p-4 rounded-xl bg-surface-container border-l-4 ${color} flex flex-col gap-1.5 border border-surface-variant/20`}>
      <div className="flex items-center justify-between font-code-sm text-code-sm">
        <span className="font-bold uppercase tracking-wider">{step}: {title}</span>
        <span className="text-outline text-xs">Deterministic</span>
      </div>
      <p className="font-body-md text-on-surface italic font-medium">
        {script}
      </p>
      <p className="font-body-sm text-xs text-on-surface-variant mt-1">
        {detail}
      </p>
    </div>
  );
}
