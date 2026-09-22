import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otp, role = "ADMIN" } = body;

    // Any valid 6-digit input passes in sandbox
    if (!otp || String(otp).length < 4) {
      return NextResponse.json({
        success: false,
        error: "Invalid OTP format. Please provide a valid verification code.",
      }, { status: 400 });
    }

    const token = `JWT_ENC_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      authenticated: true,
      token,
      role,
      user: {
        name: "Ranjeet Kumar",
        email: "ranjeet@finvoiceguard.ae",
        role,
        permissions: {
          ADMIN: ["everything", "settings", "policy_override", "users"],
          FRAUD_MANAGER: ["fraud", "calls", "cases", "analytics", "takeover"],
          FRAUD_ANALYST: ["fraud", "calls", "cases"],
          COMPLIANCE: ["audit", "policies", "compliance", "export"],
          CALL_AGENT: ["calls", "whisper"],
          VIEWER: ["read_only_telemetry"],
        }[role as string] || ["read_only_telemetry"],
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
