import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action = "freeze_card_temporary", workflow = "FRAUD_INTERVENTION", caller_jurisdiction = "UAE" } = body;

    const normalizedAction = action.toLowerCase().replace(/_/g, " ");

    if (
      normalizedAction.includes("pin") ||
      normalizedAction.includes("password") ||
      normalizedAction.includes("cvv") ||
      normalizedAction.includes("transfer")
    ) {
      return NextResponse.json({
        status: "BLOCKED",
        policy_rule: "FRAUD-V3.2",
        reason: "Action is strictly forbidden under Zero-Voice-Credentials policy.",
        immutable_audit_token: `BLK-${Math.floor(1000 + Math.random() * 9000)}`,
      }, { status: 403 });
    }

    return NextResponse.json({
      status: "APPROVED",
      action,
      workflow,
      caller_jurisdiction,
      policy_rule: "FRAUD-V3.2",
      immutable_audit_token: `TOK-${Math.floor(1000 + Math.random() * 9000)}-AF38`,
      applied_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
