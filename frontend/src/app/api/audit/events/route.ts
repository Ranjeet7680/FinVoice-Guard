import { NextResponse } from "next/server";
import crypto from "crypto";

export interface AuditRecord {
  id: string;
  call_id: string;
  event_type: string;
  timestamp: string;
  details: string;
  speaker?: "AI" | "CUSTOMER" | "SYSTEM" | "POLICY_ENGINE";
  policy_rule?: string;
  merkle_node_hash: string;
  verified: boolean;
}

let AUDIT_LOGS: AuditRecord[] = [
  {
    id: "AUD-01",
    call_id: "CALL-92831",
    event_type: "CALL_STARTED",
    timestamp: "18:04:01",
    details: "SIP Trunk 01 connection established. Carrier SRTP verified.",
    speaker: "SYSTEM",
    merkle_node_hash: "a4f891b2c3d4e5f6...",
    verified: true,
  },
  {
    id: "AUD-02",
    call_id: "CALL-92831",
    event_type: "DISCLOSURE_COMPLETED",
    timestamp: "18:04:02",
    details: "Mandatory AI identity and call purpose disclosed to caller.",
    speaker: "AI",
    merkle_node_hash: "b7e231c4f5a6b7c8...",
    verified: true,
  },
  {
    id: "AUD-03",
    call_id: "CALL-92831",
    event_type: "LANGUAGE_DETECTED",
    timestamp: "18:04:05",
    details: "Caller responded in Urdu (اردو). Language runtime switched with 99.1% confidence.",
    speaker: "SYSTEM",
    merkle_node_hash: "c8d901e2f3a4b5c6...",
    verified: true,
  },
  {
    id: "AUD-04",
    call_id: "CALL-92831",
    event_type: "VERIFICATION_PASSED",
    timestamp: "18:04:10",
    details: "Out-of-band push challenge confirmed. Zero credentials or voice secrets requested.",
    speaker: "CUSTOMER",
    merkle_node_hash: "d9e012f3a4b5c6d7...",
    verified: true,
  },
  {
    id: "AUD-05",
    call_id: "CALL-92831",
    event_type: "FRAUD_CONFIRMED",
    timestamp: "18:04:12",
    details: "Customer explicitly rejected Harrods POS transaction: 'I did not make this transaction'.",
    speaker: "CUSTOMER",
    merkle_node_hash: "e0f123a4b5c6d7e8...",
    verified: true,
  },
  {
    id: "AUD-06",
    call_id: "CALL-92831",
    event_type: "POLICY_CHECK",
    timestamp: "18:04:13",
    details: "Deterministic Policy Engine evaluated FRAUD-V3.2. Action 'temporary_card_freeze' ALLOWED.",
    speaker: "POLICY_ENGINE",
    policy_rule: "FRAUD-V3.2",
    merkle_node_hash: "f1a234b5c6d7e8f9...",
    verified: true,
  },
  {
    id: "AUD-07",
    call_id: "CALL-92831",
    event_type: "CARD_FREEZE",
    timestamp: "18:04:14",
    details: "Card CARD-9912 temporarily frozen for 24 hours. Reference: FRZ-82191.",
    speaker: "SYSTEM",
    merkle_node_hash: "a2b345c6d7e8f9a0...",
    verified: true,
  },
  {
    id: "AUD-08",
    call_id: "CALL-92831",
    event_type: "AUDIT_CREATED",
    timestamp: "18:04:15",
    details: "Cryptographic root hash sealed under CBUAE Merkle Forensics Standard.",
    speaker: "SYSTEM",
    merkle_node_hash: "b3c456d7e8f9a0b1...",
    verified: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total_records: AUDIT_LOGS.length,
    merkle_root: "0x89f2a71bc4e02319d652ba7710cde42981ef4092bba",
    records: AUDIT_LOGS,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id = "CALL-92831", event_type, details, speaker = "SYSTEM", policy_rule } = body;

    const recordData = `${call_id}|${event_type}|${Date.now()}|${details}`;
    const hash = crypto.createHash("sha256").update(recordData).digest("hex").slice(0, 16) + "...";

    const newRecord: AuditRecord = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      call_id,
      event_type,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      details,
      speaker,
      policy_rule,
      merkle_node_hash: hash,
      verified: true,
    };

    AUDIT_LOGS.push(newRecord);

    return NextResponse.json({
      success: true,
      record: newRecord,
      merkle_hash: hash,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to log audit event",
    }, { status: 500 });
  }
}
