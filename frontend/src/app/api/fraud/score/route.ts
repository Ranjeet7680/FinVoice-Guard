import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount = 0, location = "", merchant = "" } = body;

    const isAnomaly =
      location.toLowerCase().includes("london") ||
      location.toLowerCase().includes("uk") ||
      amount > 3000;

    const riskScore = isAnomaly ? 0.96 : 0.38;
    const riskLevel = riskScore >= 0.85 ? "CRITICAL" : "LOW";

    return NextResponse.json({
      status: "SUCCESS",
      risk_score: riskScore,
      risk_level: riskLevel,
      anomalies: isAnomaly
        ? [
            {
              type: "DUAL_GEOGRAPHIC_VELOCITY",
              detail: `Cardholder cell tower in Dubai while POS transaction triggered in ${location || "London"} within 134 seconds.`,
            },
            {
              type: "TERMINAL_CHIP_FALLBACK",
              detail: "POS terminal requested fallback to magnetic stripe without EMV chip cryptogram.",
            },
          ]
        : [],
      recommended_action:
        riskLevel === "CRITICAL" ? "temporary_card_freeze" : "allow_transaction",
      policy_applicable: "FRAUD-V3.2",
      requires_human_gate: riskLevel === "CRITICAL",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid payload for scoring" },
      { status: 400 }
    );
  }
}
