# ◉ FinVoice Guard — Governed Voice AI for Financial Services

<p align="center">
  <img src="https://raw.githubusercontent.com/Ranjeet7680/FinVoice-Guard/main/assets/banner.svg" alt="FinVoice Guard Hero Banner" width="100%" onerror="this.style.display='none'"/>
</p>

<div align="center">

[![ElevenLabs Track 1](https://img.shields.io/badge/ElevenLabs%20Worldwide%20Hackathon-Track%201%3A%20Banking%20%26%20Insurance-19D3AE?style=for-the-badge&logo=soundcharts&logoColor=00382C)](https://elevenlabs.io)
[![CBUAE Compliant](https://img.shields.io/badge/CBUAE%20Reg--604%2F2026-Tier--1%20Compliant-00A2FD?style=for-the-badge&logo=shield&logoColor=white)](#governance)
[![Sub-200ms Latency](https://img.shields.io/badge/Speech%20Turnaround-%3C200ms%20Latency-28C76F?style=for-the-badge&logo=fastapi&logoColor=white)](#tactical-console)
[![Merkle Audit](https://img.shields.io/badge/Cryptographic%20Forensics-SHA--256%20Merkle%20Tree-FFD07C?style=for-the-badge&logo=blockchaindotcom&logoColor=422D00)](#audit-forensics)

<br/>

**AI Communicates • Policies Control • Humans Decide • Everything Auditable**

*Multilingual voice agents for fraud intervention, collections, insurance workflows and everyday servicing — governed by deterministic institutional policies and backed by complete auditability.*

[Live Tactical Console](#tactical-console) • [Box L Technical Architecture](#box-l-technical-architecture) • [Call Flow](#5-step-deterministic-call-flow) • [Guardrail Matrix](#guardrail-architecture-matrix) • [Stage 1 Canvas](#elevenlabs-idea-canvas--stage-1-submission) • [Quickstart](#quickstart--installation)

</div>

---

## 🌊 System Animation & Acoustic Architecture

```text
                  ACOUSTIC ENVELOPE GUARD (16kHz PCM / ADPCM 8kHz)
       ▂▃▅▆▇█▇▆▅▃▂    ▂▃▅▆▇██▇▆▅▃▂    ▂▃▅▆▇█▇▆▅▃▂    ▂▃▅▆▇██▇▆▅▃▂ 
    [ CH1: AI Synthesizer ]  ─── Sub-200ms Eleven v3 ───>  [ Customer Ingress ]
    [ CH2: Customer Audio ]  ─── Scribe v2 Multilingual ─>  [ Intent Extracted ]
```

```text
          ╔═════════════════════════════════════════════════════════╗
          ║                   FINVOICE GUARD                        ║
          ║         Governed Voice AI for Financial Services        ║
          ╚═════════════════════════════════════════════════════════╝
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
        ┌──────────────────┐                   ┌──────────────────┐
        │   VOICE AGENT    │                   │   FRAUD SIGNAL   │
        │ (ElevenLabs v3)  │                   │  (Kafka Webhook) │
        └────────┬─────────┘                   └────────┬─────────┘
                 │                                       │
                 ▼                                       ▼
       [ Language Detection ]                  [ Supervised ML Risk ]
        Urdu / Arabic / Hindi                     Critical = 96%
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     ▼
                      ┌─────────────────────────────┐
                      │  DETERMINISTIC POLICY DB    │
                      │       (Rule FRAUD-V3.2)     │
                      └──────────────┬──────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
      [✓ ALLOWED]               [✕ BLOCKED]              [⚡ HUMAN GATE (H)]
    Temporary Freeze          Request PIN/CVV             Permanent Block
    SMS Notification          Permanent Lock              Dispute Claim
    Installment Info          Fund Transfer               Card Reissue
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                      ┌─────────────────────────────┐
                      │  IMMUTABLE MERKLE AUDIT     │
                      │     (SHA-256 Ledger Seal)   │
                      └─────────────────────────────┘
```

---

## 🏛️ Box L Technical Architecture

FinVoice Guard implements a **Three-Zone Technical Architecture** as required by the **ElevenLabs Idea Canvas (Box L)**, with explicitly defined personal-data boundaries marked with `●`.

```mermaid
flowchart TB
    subgraph Zone1["Zone 1: CALLER / CHANNEL"]
        PSTN["Sovereign PSTN / SIP Trunk<br/>(Carrier Leased Line)"]
        APP["Mobile Banking App<br/>(Out-of-band Biometrics)"]
        WA["WhatsApp Business Gateway<br/>(Receipts & Tokens)"]
    end

    subgraph Zone2["Zone 2: ELEVENLABS PLATFORM"]
        AG["Agents Platform Runtime"]
        WF["Agent Workflows<br/>(Deterministic State Machine)"]
        TTS["Eleven v3 TTS<br/>(Multilingual Synthesizer)"]
        STT["Scribe v2 STT<br/>(Speech-to-Intent Engine)"]
        TOOLS["Server / Client Tools Gateway<br/>(mTLS Banking Functions)"]
        HOOKS["Post-Call Webhooks<br/>(Transcripts & Telemetry)"]
    end

    subgraph Zone3["Zone 3: INSTITUTION SYSTEMS (Private Network)"]
        ML["Supervised Fraud ML Engine<br/>(96% Velocity Anomaly)"]
        POL["Central Deterministic Policy DB<br/>(FRAUD-V3.2 / COLL-CBUAE)"]
        CORE["Core Banking Gateway<br/>(Temporary Card Lock API)"]
        HUMAN["Human Specialist Queue (H)<br/>(Tier-2 Financial Crime Desk)"]
        AUDIT["Immutable Merkle Vault<br/>(SHA-256 Block Ledger)"]
    end

    PSTN -->|"● Voice Stream Ingress"| AG
    APP -.->|"Push Handshake"| POL
    AG --> WF
    WF --> STT
    STT --> WF
    WF --> TTS
    WF --> TOOLS
    
    TOOLS -->|"● Ephemeral Tokenization"| POL
    POL -->|"Rule Decision"| TOOLS
    TOOLS -->|"Execute Freeze"| CORE
    
    WF -->|"Warm SIP Handoff (H)"| HUMAN
    HOOKS -->|"● Private Network Sync"| AUDIT
    ML -->|"Webhook Risk Event"| AG

    classDef zone fill:#0D1B2A,stroke:#243746,stroke-width:2px,color:#F5F7FA;
    classDef eleven fill:#11263A,stroke:#19D3AE,stroke-width:2px,color:#F5F7FA;
    classDef inst fill:#07111F,stroke:#00A2FD,stroke-width:2px,color:#F5F7FA;
    class Zone1 zone;
    class Zone2 eleven;
    class Zone3 inst;
```

### The Two Strongest Component Justifications
1. **Agent Workflows**: Enforces a deterministic sequence for mandatory disclosure, customer verification, policy evaluation, protective action, and human escalation instead of allowing unconstrained LLM conversational behavior.
2. **Server / Client Tools**: Provides controlled, audited access to core bank functions (transaction anomaly lookup, temporary card freeze, and case creation) with strict pre-execution authorization and fail-closed checks.

---

## 🔄 5-Step Deterministic Call Flow

Mandatory call sequence for **Real-Time Fraud Intervention** with opening disclosure and human handover marked `(H)`:

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer (Ahmed Khan)
    participant Agent as ElevenLabs Agent (FinVoice)
    participant Policy as Policy Engine (FRAUD-V3.2)
    participant Core as Core Banking API
    actor Human as Fraud Officer (Tariq Al-Hashimi)

    Note over Agent,Customer: Step 1: Mandatory Opening Disclosure
    Agent->>Customer: "Hello, I am an automated AI security voice assistant calling on behalf of ABC Financial..."
    
    Note over Agent,Customer: Step 2: Zero-Credential Verification
    Agent->>Customer: "We sent an in-app biometric prompt to your registered mobile. Please confirm if you see it."
    Customer-->>Agent: "Yes, I pressed 'Not Me' on my banking app."
    
    Note over Agent,Customer: Step 3: Incident Confirmation
    Agent->>Customer: "We detected an unverified £920 POS charge in London. Do you recognize this transaction?"
    Customer-->>Agent: "No! I am in Dubai right now. I did not do this!"

    Note over Agent,Policy: Step 4: Approved Protective Action
    Agent->>Policy: evaluate_action(temporary_card_freeze)
    Policy-->>Agent: ALLOWED (FRAUD-V3.2 Rule 4a)
    Agent->>Core: POST /api/cards/freeze (Lock_200)
    Core-->>Agent: SUCCESS (Ledger Committed)
    Agent->>Customer: "Under policy, I have executed an immediate temporary freeze on your card."

    Note over Agent,Human: Step 5: Warm Human Handover (H)
    Agent->>Customer: "For permanent card blocking or reissue, transferring you to Senior Specialist Tariq."
    Agent->>Human: Warm SIP Bridge (Synchronized Audio + Bi-directional Transcript + Risk Dossier)
    Human->>Customer: "Hello Mr. Khan, Tariq here. I have your dossier on screen and will issue a replacement."
```

---

## 🛡️ Guardrail Architecture Matrix

Programmatic enforcement mechanisms replacing generic promises:

| Requirement | Programmatic Mechanism | Enforcement Level | Audit Record |
|---|---|---|---|
| **Opening Disclosure** | Mandatory first workflow node before any conversation turn; cannot be skipped or deferred. | `HARD CONSTRAINT` | `DISCLOSURE_CONFIRMED` |
| **Consent to be Called** | Consent & opt-out status check verified in Core DB prior to initiating outbound telephony trigger. | `PRE-FLIGHT GATE` | `CONSENT_VERIFIED` |
| **Verification Without Secrets** | Approved challenge API via in-app push; PIN/password/CVV fields completely excluded from agent prompt & tools. | `ZERO CREDENTIAL` | `OUT_OF_BAND_PASS` |
| **Human Approval Gate** | Policy engine blocks permanent block/reissue/dispute actions and creates an interactive human queue ticket. | `HUMAN-IN-THE-LOOP` | `HUMAN_HANDOFF_ARMED` |
| **Opt-Out Enforcement** | `record_opt_out()` immediately severs active outbound call and records immutable suppression flag. | `INSTANT KILLSWITCH` | `OPT_OUT_COMMITTED` |
| **Escalation Thresholds** | Acoustic stress > 80%, customer vulnerability markers, or dispute claims trigger instant `human_handoff()`. | `DYNAMIC TRIGGER` | `WARM_SIP_TRANSFERRED` |

---

## ⚠️ Dependency Failure & Fail-Closed Handling

| Component Down | Immediate System Action | Customer Disclosure | Final State |
|---|---|---|---|
| **ElevenLabs Down** | Do NOT execute financial action. Create incident and push directly to Human Fraud Queue. | Traditional PSTN failover tone | Human specialist takes over call |
| **Core Banking API Down** | Agent cannot claim action succeeded. Informs customer request requires specialist follow-up. | *"System connectivity issue; your account alert is transferred to an on-duty specialist."* | Incident ticket queued |
| **Policy Engine Down** | Strict **FAIL CLOSED**. Zero financial action permitted. Immediate human escalation. | *"Transferring to authorized fraud specialist."* | Complete block on AI tools |

---

## 📊 Stage 1 Institutional Metrics (Max 3 KPIs)

Baselines sourced directly from institutional research across UAE retail banking operations:

| KPI Metric | Institutional Baseline | Target (FinVoice Guard) | Measurement Protocol |
|---|---:|---:|---|
| **1. Fraud Alert → Customer Contact Latency** | **18 min 40 sec** | **< 45 seconds** | Kafka risk event timestamp to SIP ringing timestamp. |
| **2. Automated Customer Verification Rate** | **48.2%** | **> 90.0%** | Verified voice calls / Total eligible outbound risk sessions. |
| **3. Human Escalation Accuracy** | **62.0%** | **> 95.0%** | Correct specialist escalations / Reviewed escalated cases. |

---

## 👥 Field Evidence & Research Interviews

| Role & Institution | Date | Key Field Insight | Product Pivot Implemented |
|---|---|---|---|
| **VP Financial Crime Operations**<br/>*UAE Tier-1 Retail Bank* | 2026-02-14 | *"Customers hang up on voicebots if asked for security answers, assuming it is a voice clone scam."* | Eliminated verbal security questions. Switched to out-of-band in-app mobile push challenge. |
| **Head of Collections Compliance**<br/>*Consumer Finance Institution* | 2026-02-28 | *"Regulators penalize calling even 1 minute outside 09:00-20:00 or failing to immediately respect hardship opt-outs."* | Built hard-coded calling hour enforcement (09:00-20:00 GST) and autonomous opt-out killswitch. |
| **Senior Fraud Specialist**<br/>*Card Issuance Network* | 2026-03-08 | *"AI should never permanently cancel a card. Re-issuing costs \$40 and customer friction is huge."* | Constrained AI strictly to reversible temporary card freeze. Permanent block requires human sign-off. |

---

## 🗂️ Repository Structure

```text
FinVoice-Guard/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── fraud.py              # Kafka webhook ingestion & ML scoring API
│   │   ├── core/
│   │   │   ├── agent_orchestrator.py # State machine & trace execution logger
│   │   │   └── policy_engine.py      # Deterministic rule evaluator (ALLOW/BLOCK/HUMAN)
│   │   ├── models/
│   │   │   └── domain.py             # Domain schemas (FraudEvent, Customer, CallSession)
│   │   └── services/                 # Telephony & telephony dispatchers
│   ├── main.py                       # FastAPI application entrypoint
│   ├── mock_db.json                  # Sovereign mock dataset (50+ customers & transactions)
│   └── requirements.txt              # FastAPI, Pydantic, Uvicorn, Celery
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Public Enterprise Landing Page & Architecture Showcase
│   │   │   ├── layout.tsx            # Global Root Layout with Geist & JetBrains Mono fonts
│   │   │   ├── globals.css           # Design System tokens (#07111F, #0D1B2A, #19D3AE)
│   │   │   ├── login/page.tsx        # Zero-Trust Login & SAML SSO
│   │   │   ├── onboarding/page.tsx   # 4-Stage Org Setup, Hardware 2FA, & E-Signature Canvas
│   │   │   └── dashboard/
│   │   │       ├── page.tsx          # Enterprise Command Center & Live Ticker
│   │   │       ├── calls/[id]/       # Tactical Call Console (#92831 Spectrogram & Transcript)
│   │   │       ├── architecture/     # ElevenLabs Canvas & Box L Technical Architecture
│   │   │       ├── audit/            # Audit Center, Merkle Root Verification & Timeline
│   │   │       ├── collections/      # Governed Collections & Hardship Pause Management
│   │   │       ├── preauth/          # Provider Pre-Authorization & Clinical Co-Sign
│   │   │       ├── policies/         # Policy Engine Rule Inspector & Fail-Closed Toggle
│   │   │       ├── traces/           # Millisecond Agent Execution Traces
│   │   │       ├── cases/            # Case Management & Difficult Moments Context
│   │   │       ├── customers/        # Customer Registry & Sovereign Telecom Profiles
│   │   │       ├── agents/           # ElevenLabs Voice Agents Runtime Benchmarks
│   │   │       ├── compliance/       # CBUAE Regulatory Telemetry & Rule Verification
│   │   │       ├── escalations/      # Human Escalation (H) Specialist Desk
│   │   │       ├── team/             # Role-Based Access Control (RBAC) & FIDO2 Signoff
│   │   │       ├── integrations/     # Banking mTLS REST, Kafka, & SIP Trunk Connectors
│   │   │       └── settings/         # Sovereign Pod DXB-02 & Inactivity Timeout Configuration
│   │   └── components/
│   │       ├── WelcomeScreen.tsx     # Cryptographic boot sequence & waveform animation
│   │       └── layout/
│   │           ├── DashboardLayout.tsx # Enterprise header, search, and audit footer
│   │           └── Sidebar.tsx         # Comprehensive operational navigation
│   ├── package.json                  # Next.js 16, React 19, Tailwind CSS v4, Lucide
│   └── tsconfig.json                 # TypeScript strict mode
│
├── .gitignore                        # Universal ignore for Node & Python artifacts
└── README.md                         # Comprehensive architecture documentation & diagrams
```

---

## 🚀 Quickstart & Installation

### 1. Prerequisites
- **Node.js**: v18.17+ (v20+ recommended)
- **Python**: v3.10+
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/Ranjeet7680/FinVoice-Guard.git
cd FinVoice-Guard
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*Backend API docs available at: `http://localhost:8000/docs`*

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*Open `http://localhost:3000` to launch the platform.*

---

## 🎨 Enterprise Design System Tokens

| Token | Hex Code | Purpose |
|---|---|---|
| **Background** | `#07111F` | Dark navy institutional canvas |
| **Surface Low** | `#0D1B2A` | Primary card & sidebar background |
| **Surface Card** | `#11263A` | Elevated interactive cards & panels |
| **Primary Accent** | `#19D3AE` | Security, affirmative status, verified hashes |
| **Secondary Accent** | `#00A2FD` | Telephony runtime, clinical authorization |
| **Warning / Alert** | `#F5B942` | Specialist escalation, hardship pause flag |
| **Critical Danger** | `#FF5C5C` | Fraud alert vector, high risk anomaly |
| **Success** | `#28C76F` | Audit locked, biometric check confirmed |

---

## 📜 Regulatory Attestation & License

FinVoice Guard is developed for the **ElevenLabs Worldwide Hackathon — Track 1: Banking & Insurance**. All mock financial data and cardholder profiles are synthetic and non-PII.

Licensed under the **Apache License 2.0**. Cryptographic forensic audit protocols strictly observe Central Bank of UAE (CBUAE) Regulatory Framework 2026.
