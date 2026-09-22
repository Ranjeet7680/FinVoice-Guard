import { NextResponse } from "next/server";

// In-memory simulated banking store for cards
let cardStore: Record<string, {
  card_id: string;
  customer_id: string;
  status: "ACTIVE" | "TEMPORARILY_FROZEN" | "PERMANENTLY_BLOCKED";
  frozen_at?: string;
  freeze_reason?: string;
  reference?: string;
}> = {
  "CARD-9912": {
    card_id: "CARD-9912",
    customer_id: "CUST-10045",
    status: "ACTIVE",
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id = "CUST-10045", card_id = "CARD-9912", reason = "CONFIRMED_FRAUD", duration = "24_HOURS" } = body;

    const reference = `FRZ-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    cardStore[card_id] = {
      card_id,
      customer_id,
      status: "TEMPORARILY_FROZEN",
      frozen_at: now,
      freeze_reason: reason,
      reference,
    };

    return NextResponse.json({
      success: true,
      status: "TEMPORARILY_FROZEN",
      card_id,
      customer_id,
      reference,
      duration,
      applied_at: now,
      institution_mode: "SIMULATED_BANKING_CORE",
      message: `Card ${card_id} temporarily frozen for ${duration} under verified fraud protocol. Reference: ${reference}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute card freeze" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    institution: "Simulated Central Bank Gateway",
    cards: cardStore,
  });
}
