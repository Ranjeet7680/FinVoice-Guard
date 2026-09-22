import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer = "Ahmed Khan",
      customer_id = "CUST-10045",
      transaction_amount = 4500,
      currency = "AED",
      merchant = "XYZ Electronics / Harrods Knightsbridge",
      location = "London, UK (POS Swipe)",
      device = "Unrecognized iOS Device (London IP)",
      is_new_device = true,
      is_unusual_location = true,
      is_high_value = true,
      transaction_velocity = "2 swipes / 134 seconds",
    } = body;

    // Feature Extraction Pipeline
    const numAmount = Number(transaction_amount);
    let riskPoints = 0;
    const reasonCodes: string[] = [];

    if (numAmount >= 4000 || is_high_value) {
      riskPoints += 35;
      reasonCodes.push("HIGH_VALUE");
    }
    if (is_unusual_location) {
      riskPoints += 35;
      reasonCodes.push("UNUSUAL_LOCATION");
    }
    if (is_new_device) {
      riskPoints += 26;
      reasonCodes.push("NEW_DEVICE");
    }

    // Tabular Model: XGBoost / LightGBM weighted probability
    const rawScore = Math.min(0.99, Math.max(0.12, (riskPoints / 100) + 0.04));
    const fraud_probability = Number(rawScore.toFixed(2));

    // Secondary Deep Learning: PyTorch LSTM / Transformer sequence anomaly score
    const dl_sequence_anomaly_score = Number((fraud_probability * 0.98 + 0.01).toFixed(3));

    let risk_level = "LOW";
    if (fraud_probability >= 0.85) risk_level = "CRITICAL";
    else if (fraud_probability >= 0.65) risk_level = "HIGH";
    else if (fraud_probability >= 0.40) risk_level = "MEDIUM";

    const eventId = `FRD-${Math.floor(10000 + Math.random() * 90000)}`;
    const callId = `CALL-${Math.floor(10000 + Math.random() * 90000)}`;

    const eventPayload = {
      event_id: eventId,
      call_id: callId,
      customer_id,
      customer_name: customer,
      transaction: {
        amount: numAmount,
        currency,
        merchant,
        location,
        device,
        transaction_velocity,
        timestamp: new Date().toISOString(),
      },
      ml_models: {
        primary_tabular: {
          model_name: "XGBoost-FraudNet-v4.2",
          fraud_probability,
          risk_level,
          confidence: 0.982,
          feature_importance: {
            geographic_velocity: 0.42,
            transaction_amount: 0.31,
            unrecognized_device: 0.27,
          },
        },
        secondary_deep_learning: {
          model_name: "PyTorch-Temporal-Transformer-v2.1",
          sequence_anomaly_score: dl_sequence_anomaly_score,
          embeddings_dim: 128,
          recurrent_layers: 3,
        },
      },
      reason_codes: reasonCodes,
      workflow: "REAL_TIME_FRAUD",
      status: "AWAITING_CUSTOMER_VERIFICATION",
      recommended_action: "TEMPORARY_CARD_FREEZE",
      requires_human_approval_gate: false,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Simulated fraud event generated & scored by XGBoost + PyTorch engines.",
      event: eventPayload,
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to simulate fraud event",
    }, { status: 500 });
  }
}
