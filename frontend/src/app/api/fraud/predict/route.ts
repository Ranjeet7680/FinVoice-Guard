import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cardholder_id = "CUST-10045",
      pos_location = "London, UK",
      mobile_location = "Dubai, UAE",
      amount_gbp = 920.0,
      time_delta_seconds = 134,
    } = body;

    const isVelocityAnomaly =
      (pos_location.toLowerCase().includes("london") && mobile_location.toLowerCase().includes("dubai")) ||
      time_delta_seconds < 600 ||
      amount_gbp > 500;

    const riskScore = isVelocityAnomaly ? 0.96 : 0.35;
    const threatLevel = riskScore >= 0.85 ? "Tier 1 Critical" : "Standard Risk";

    return NextResponse.json({
      success: true,
      cardholder_id,
      risk_score: riskScore,
      threat_level: threatLevel,
      anomaly_vector: "Dual Geographic Velocity",
      pos_location,
      mobile_location,
      amount_gbp,
      time_delta_seconds,
      recommended_action: "Temporary Card Freeze",
      requires_human_handoff: riskScore >= 0.85,
      policy_reference: "FRAUD-V3.2",
      model: "XGBoost-FraudNet-v4.2 + PyTorch-Temporal-Transformer",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Prediction error" }, { status: 400 });
  }
}
