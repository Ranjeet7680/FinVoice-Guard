import { NextResponse } from "next/server";

export interface FraudCase {
  id: string;
  customer_id: string;
  customer_name: string;
  fraud_event_id: string;
  call_id: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "INVESTIGATING" | "WAITING_CUSTOMER" | "WAITING_HUMAN" | "RESOLVED" | "CLOSED";
  risk_score: number;
  reason: string;
  assigned_analyst: string;
  human_notes: string[];
  created_at: string;
  updated_at: string;
}

let CASES_STORE: FraudCase[] = [
  {
    id: "F-92831",
    customer_id: "CUST-10045",
    customer_name: "Ahmed Khan",
    fraud_event_id: "FRD-92831",
    call_id: "CALL-92831",
    priority: "CRITICAL",
    status: "INVESTIGATING",
    risk_score: 0.96,
    reason: "Customer confirmed unauthorized London POS transaction. Card temporarily frozen.",
    assigned_analyst: "Tariq Al-Mansoor",
    human_notes: [
      "18:04:15 - AI automated voice session completed with positive customer fraud confirmation.",
      "18:05:30 - Escalated for permanent card replacement and dispute chargeback filing.",
    ],
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "F-92830",
    customer_id: "CUST-10031",
    customer_name: "Rashid Al-Maktoum",
    fraud_event_id: "FRD-92830",
    call_id: "CALL-92830",
    priority: "HIGH",
    status: "WAITING_HUMAN",
    risk_score: 0.78,
    reason: "Verification challenge inconclusive. Customer requested human agent callback.",
    assigned_analyst: "Dr. Fatima Al-Mansoor",
    human_notes: [
      "16:22:00 - Customer claimed biometric push notification did not appear on primary device.",
    ],
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "F-92829",
    customer_id: "CUST-10089",
    customer_name: "Fatima Al-Nuaimi",
    fraud_event_id: "FRD-92829",
    call_id: "CALL-92829",
    priority: "MEDIUM",
    status: "RESOLVED",
    risk_score: 0.52,
    reason: "Customer recognized transaction as authorized spouse travel booking.",
    assigned_analyst: "Marcus Vance",
    human_notes: [
      "14:10:00 - Customer confirmed valid payment. Temporary protection unpaused.",
    ],
    created_at: new Date(Date.now() - 18000000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total_cases: CASES_STORE.length,
    cases: CASES_STORE,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCase: FraudCase = {
      id: body.id || `F-${Math.floor(10000 + Math.random() * 90000)}`,
      customer_id: body.customer_id || "CUST-10045",
      customer_name: body.customer_name || "Ahmed Khan",
      fraud_event_id: body.fraud_event_id || "FRD-92831",
      call_id: body.call_id || "CALL-92831",
      priority: body.priority || "CRITICAL",
      status: body.status || "OPEN",
      risk_score: body.risk_score || 0.96,
      reason: body.reason || "Fraud confirmed via automated AI call",
      assigned_analyst: body.assigned_analyst || "Tariq Al-Mansoor (Tier-2 Lead)",
      human_notes: body.notes ? [body.notes] : ["Automated ticket generated from Voice Intervention workflow"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    CASES_STORE.unshift(newCase);

    return NextResponse.json({
      success: true,
      case: newCase,
      message: `Case ${newCase.id} created and queued for human analyst review.`,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to create case",
    }, { status: 500 });
  }
}
