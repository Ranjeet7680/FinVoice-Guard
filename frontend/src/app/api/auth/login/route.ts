import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email = "ranjeet@finvoiceguard.ae", role = "ADMIN" } = body;

    // Generate simulated 6-digit OTP
    const generatedOtp = "749281";

    return NextResponse.json({
      success: true,
      message: "Credentials verified. 6-digit hardware OTP dispatched to registered mobile.",
      session_challenge_id: `SES-${Math.floor(100000 + Math.random() * 900000)}`,
      user: {
        email,
        name: "Ranjeet Kumar",
        role,
        organization: "FinVoice UAE Commercial Bank Node 04",
      },
      otp_hint: "749281",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
