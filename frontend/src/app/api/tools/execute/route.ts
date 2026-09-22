import { NextResponse } from "next/server";

// Simulated tool functions
const MOCK_CUSTOMERS: Record<string, any> = {
  "CUST-10045": {
    id: "CUST-10045",
    name: "Ahmed Khan",
    phone: "+971 50 ••• 8492",
    email: "ahmed.k***@domain.ae",
    preferred_language: "Urdu (اردو)",
    country: "UAE",
    card_id: "CARD-9912",
    account: "Premier Checking ••8201",
    risk_profile: "CRITICAL_FRAUD_ALERT",
    status: "ACTIVE",
    consent: true,
    opt_out: false,
  },
  "CUST-10089": {
    id: "CUST-10089",
    name: "Fatima Al-Nuaimi",
    phone: "+971 52 ••• 1943",
    email: "fatima.n***@domain.ae",
    preferred_language: "Arabic (العربية)",
    country: "UAE",
    card_id: "CARD-4402",
    account: "Islamic Savings ••3190",
    risk_profile: "HIGH",
    status: "ACTIVE",
    consent: true,
    opt_out: false,
  },
  "CUST-10031": {
    id: "CUST-10031",
    name: "Rashid Al-Maktoum",
    phone: "+971 55 ••• 7721",
    email: "rashid.m***@domain.ae",
    preferred_language: "Hindi (हिन्दी)",
    country: "UAE",
    card_id: "CARD-7719",
    account: "Business Classic ••9912",
    risk_profile: "COLLECTIONS_HARDSHIP",
    status: "ACTIVE",
    consent: true,
    opt_out: false,
  },
};

const MOCK_TRANSACTIONS: Record<string, any> = {
  "TX-92831": {
    id: "TX-92831",
    customer_id: "CUST-10045",
    amount: 4500.0,
    currency: "AED",
    amount_gbp: 920.0,
    merchant: "Harrods Knightsbridge, London (POS Swipe)",
    timestamp: "2 mins ago",
    velocity_anomaly: "POS London vs Dubai Cell in 134s",
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tool_name, parameters = {}, caller_role = "AI_VOICE_AGENT" } = body;

    // 1. Mandatory Policy Interception
    const policyUrl = new URL("/api/policies/check", req.url);
    const policyCheckRes = await fetch(policyUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        policy_id: "FRAUD-V3.2",
        action: tool_name,
        caller_jurisdiction: "UAE",
      }),
    });

    const policyCheck = await policyCheckRes.json();

    if (!policyCheck.allowed) {
      return NextResponse.json({
        success: false,
        status: "BLOCKED_BY_POLICY",
        tool_name,
        violation: policyCheck.reason,
        human_escalation_required: policyCheck.requires_human,
        audit_token: policyCheck.audit_token,
        executed_by: "POLICY_GUARDIAN",
      }, { status: 403 });
    }

    // 2. Deterministic Tool Execution Layer
    let result: any = null;

    switch (tool_name) {
      case "get_customer": {
        const custId = parameters.customer_id || "CUST-10045";
        result = MOCK_CUSTOMERS[custId] || { error: "Customer not found" };
        break;
      }

      case "get_transaction": {
        const txId = parameters.transaction_id || "TX-92831";
        result = MOCK_TRANSACTIONS[txId] || { error: "Transaction not found" };
        break;
      }

      case "get_fraud_event": {
        result = {
          event_id: parameters.event_id || "FRD-92831",
          customer_id: "CUST-10045",
          risk_score: 0.96,
          risk_level: "CRITICAL",
          anomaly: "Dual Geographic Velocity",
          status: "AWAITING_VERIFICATION",
        };
        break;
      }

      case "verify_identity_challenge": {
        // Zero voice secrets: out of band push or biometric signature verification
        result = {
          verified: true,
          method: "OUT_OF_BAND_PUSH_NOTIFICATION",
          voice_secrets_collected: false,
          verified_at: new Date().toISOString(),
        };
        break;
      }

      case "temporary_card_freeze": {
        const freezeUrl = new URL("/api/cards/freeze", req.url);
        const freezeRes = await fetch(freezeUrl.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: parameters.customer_id || "CUST-10045",
            card_id: parameters.card_id || "CARD-9912",
            reason: parameters.reason || "CONFIRMED_FRAUD",
            duration: "24_HOURS",
          }),
        });
        result = await freezeRes.json();
        break;
      }

      case "create_case": {
        result = {
          case_id: `F-${Math.floor(10000 + Math.random() * 90000)}`,
          priority: "CRITICAL",
          assigned_queue: "TIER_2_FRAUD_SPECIALISTS",
          status: "INVESTIGATING",
          created_at: new Date().toISOString(),
        };
        break;
      }

      case "human_handoff": {
        result = {
          handoff_initiated: true,
          specialist: "Tariq Al-Mansoor (Tier-2 Lead)",
          channel: "ENCRYPTED_SIP_TRUNK_01",
          warm_transfer: true,
          context_transferred: ["transcript", "ml_risk_score", "fraud_event", "customer_profile"],
        };
        break;
      }

      case "record_opt_out": {
        result = {
          opt_out_recorded: true,
          timestamp: new Date().toISOString(),
          customer_id: parameters.customer_id || "CUST-10045",
          action: "ALL_FUTURE_VOICE_OUTREACH_TERMINATED",
        };
        break;
      }

      default:
        return NextResponse.json({
          success: false,
          error: `Unrecognized tool '${tool_name}'. Fail-closed triggered.`,
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      tool_name,
      policy_approval: policyCheck.audit_token,
      result,
      timestamp: new Date().toISOString(),
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Tool execution error. Fail-closed.",
    }, { status: 500 });
  }
}
