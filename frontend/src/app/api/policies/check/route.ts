import { NextResponse } from "next/server";

export interface PolicyRule {
  policy_id: string;
  workflow: string;
  allowed_actions: string[];
  forbidden_actions: string[];
  human_approval_required: string[];
  max_authorized_amount_aed: number;
  calling_hours_gst: { start: number; end: number };
}

const POLICY_REGISTRY: Record<string, PolicyRule> = {
  "FRAUD-V3.2": {
    policy_id: "FRAUD-V3.2",
    workflow: "real_time_fraud",
    allowed_actions: [
      "temporary_card_freeze",
      "create_case",
      "human_handoff",
      "send_sms_notification",
      "verify_identity_challenge",
      "query_transaction_details",
    ],
    forbidden_actions: [
      "request_pin",
      "request_password",
      "request_cvv",
      "permanent_account_closure",
      "fund_transfer",
      "bypass_disclosure",
      "change_address",
    ],
    human_approval_required: [
      "permanent_card_block",
      "account_closure",
      "dispute_claim_settlement",
      "waive_fees_above_threshold",
    ],
    max_authorized_amount_aed: 50000,
    calling_hours_gst: { start: 0, end: 24 }, // 24/7 for urgent fraud interventions
  },
  "COLL-04": {
    policy_id: "COLL-04",
    workflow: "governed_collections",
    allowed_actions: [
      "offer_approved_installment_plan",
      "record_opt_out",
      "record_hardship_claim",
      "schedule_callback",
      "human_handoff",
    ],
    forbidden_actions: [
      "harass_debtor",
      "call_outside_permitted_hours",
      "threaten_legal_arrest",
      "request_immediate_crypto_payment",
      "disclose_debt_to_third_party",
    ],
    human_approval_required: [
      "forgive_principal_amount",
      "restructure_over_60_months",
    ],
    max_authorized_amount_aed: 10000,
    calling_hours_gst: { start: 9, end: 20 }, // 09:00 - 20:00 GST strictly enforced
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      policy_id = "FRAUD-V3.2",
      action,
      caller_jurisdiction = "UAE",
      amount = 0,
      current_hour_gst = new Date().getUTCHours() + 4,
    } = body;

    const policy = POLICY_REGISTRY[policy_id] || POLICY_REGISTRY["FRAUD-V3.2"];

    // 1. Forbidden check
    if (policy.forbidden_actions.includes(action)) {
      return NextResponse.json({
        allowed: false,
        decision: "BLOCKED",
        reason: `Action '${action}' is strictly FORBIDDEN under policy ${policy_id}.`,
        requires_human: true,
        violation_type: "SECURITY_CREDENTIAL_OR_GOVERNANCE_BREACH",
        audit_token: `BLK-${Math.floor(1000 + Math.random() * 9000)}`,
      }, { status: 403 });
    }

    // 2. Calling hours check (for collections)
    if (policy.workflow === "governed_collections") {
      const normalizedHour = (current_hour_gst + 24) % 24;
      if (normalizedHour < policy.calling_hours_gst.start || normalizedHour >= policy.calling_hours_gst.end) {
        return NextResponse.json({
          allowed: false,
          decision: "BLOCKED",
          reason: `Outreach blocked: Current time ${normalizedHour}:00 GST is outside statutory window 09:00 - 20:00 GST.`,
          requires_human: false,
          violation_type: "CBUAE_CHAPTER_4_WINDOW_VIOLATION",
          audit_token: `BLK-TIME-${Math.floor(1000 + Math.random() * 9000)}`,
        }, { status: 403 });
      }
    }

    // 3. Human Approval Gate
    if (policy.human_approval_required.includes(action)) {
      return NextResponse.json({
        allowed: false,
        decision: "HUMAN_APPROVAL_REQUIRED",
        reason: `Action '${action}' requires mandatory dual-signoff from a Tier-2 Fraud Analyst.`,
        requires_human: true,
        human_approval_gate: "H",
        escalation_priority: "HIGH",
        audit_token: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      });
    }

    // 4. Allowed Action
    if (policy.allowed_actions.includes(action)) {
      return NextResponse.json({
        allowed: true,
        decision: "ALLOWED",
        policy_id: policy.policy_id,
        workflow: policy.workflow,
        action,
        requires_human: false,
        max_amount_checked: policy.max_authorized_amount_aed,
        caller_jurisdiction,
        audit_token: `AUTH-${Math.floor(10000 + Math.random() * 90000)}`,
      });
    }

    // Default: Fail-Closed
    return NextResponse.json({
      allowed: false,
      decision: "BLOCKED_FAIL_CLOSED",
      reason: `Action '${action}' is not explicitly permitted under deterministic rule table.`,
      requires_human: true,
      audit_token: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
    }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({
      allowed: false,
      decision: "BLOCKED_FAIL_CLOSED",
      reason: "Policy engine parse error. Safe default fail-closed triggered.",
      error: err.message,
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    active_policies: Object.keys(POLICY_REGISTRY),
    registry: POLICY_REGISTRY,
  });
}
