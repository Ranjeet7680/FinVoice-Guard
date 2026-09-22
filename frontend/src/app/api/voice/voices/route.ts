import { NextResponse } from "next/server";

export async function GET() {
  const enterpriseVoices = [
    {
      id: "JBFqnCBsd6RMkjVDRZzb",
      name: "George (Institutional Security)",
      language: "Urdu / English / Multilingual",
      accent: "Authoritative Enterprise",
      use_case: "Fraud Intervention & Emergency Card Freeze",
    },
    {
      id: "21m00Tcm4TlvDq8ikWAM",
      name: "Rachel (Governed Collections)",
      language: "Hindi / English / Empathetic",
      accent: "Supportive Compliance",
      use_case: "Collections Outreach & Hardship Assessment",
    },
    {
      id: "AZnzlk1XvdvUeBnXmlld",
      name: "Domi (Clinical Review)",
      language: "Arabic (Standard) / Clinical",
      accent: "Precise Professional",
      use_case: "Healthcare Pre-Authorization & Physician Gate",
    },
    {
      id: "EXAVITQu4vr4xnSDxMaL",
      name: "Bella (Retail Servicing)",
      language: "Arabic (Gulf/Khaleeji) / English",
      accent: "Warm Concierge",
      use_case: "Everyday Banking Servicing & Card Replacement",
    },
  ];

  return NextResponse.json({
    success: true,
    total_voices: enterpriseVoices.length,
    voices: enterpriseVoices,
  });
}
