import { NextResponse } from "next/server";

export async function GET() {
  const mockFraudEvents = [
    {
      event_id: "FRD-92831",
      customer_id: "CUST-10045",
      customer_name: "Ahmed Khan",
      event_type: "suspicious_card_transaction",
      amount: 920.0,
      currency: "GBP",
      merchant: "Harrods Knightsbridge, London",
      risk_score: 0.96,
      risk_level: "CRITICAL",
      risk_reason: "Dual Geographic Swipe Velocity: Dubai cell tower vs London POS in 2m 14s",
      recommended_action: "temporary_card_freeze",
      action_reversible: true,
      status: "active_voice_intervention",
      timestamp: new Date().toISOString(),
    },
    {
      event_id: "FRD-92828",
      customer_id: "CUST-10089",
      customer_name: "Fatima Al-Nuaimi",
      event_type: "unusual_atm_withdrawal",
      amount: 4500.0,
      currency: "AED",
      merchant: "ATM Terminal 09, Deira",
      risk_score: 0.78,
      risk_level: "HIGH",
      risk_reason: "Consecutive high-velocity withdrawal attempt outside home cluster",
      recommended_action: "out_of_band_push_verify",
      action_reversible: true,
      status: "resolved_verified",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      event_id: "FRD-92812",
      customer_id: "CUST-10031",
      customer_name: "Zaid Tariq",
      event_type: "international_ecom_spike",
      amount: 1200.0,
      currency: "USD",
      merchant: "CryptEx Digital, Singapore",
      risk_score: 0.88,
      risk_level: "CRITICAL",
      risk_reason: "New crypto merchant category + zero previous international history",
      recommended_action: "temporary_card_freeze",
      action_reversible: true,
      status: "card_frozen_by_policy",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return NextResponse.json({
    status: "success",
    total_events: mockFraudEvents.length,
    events: mockFraudEvents,
  });
}
