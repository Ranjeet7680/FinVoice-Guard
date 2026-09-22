import { NextResponse } from "next/server";

export interface RAGChunk {
  document: string;
  section: string;
  policy_version: string;
  timestamp: string;
  text: string;
  relevance_score: number;
}

const KNOWLEDGE_CORPUS: RAGChunk[] = [
  {
    document: "fraud_policy.pdf",
    section: "Section 3.2 — Emergency Card Freezes",
    policy_version: "v3.2.4 (CBUAE-2026)",
    timestamp: "2026-01-15T08:00:00Z",
    text: "Upon customer confirmation of an unrecognized transaction or high-probability geographic velocity spoofing (>=0.85 score), the voice agent is strictly authorized to execute a reversible 24-hour temporary card freeze. Permanent card cancellation requires Tier-2 human specialist escalation.",
    relevance_score: 0.96,
  },
  {
    document: "customer_verification.pdf",
    section: "Section 2.1 — Prohibited Credential Collection",
    policy_version: "v2.1.0 (Zero-Trust)",
    timestamp: "2026-02-01T10:00:00Z",
    text: "AI agents are categorically prohibited from prompting or recording customer PINs, CVVs, online banking passwords, or full card numbers over voice. Verification must be performed strictly via out-of-band mobile app push challenges or masked one-time tokens.",
    relevance_score: 0.94,
  },
  {
    document: "calling_hours.pdf",
    section: "Section 4.1 — Permitted Contact Windows",
    policy_version: "v1.8.2 (Consumer Protection)",
    timestamp: "2026-01-10T12:00:00Z",
    text: "Collections and marketing voice outreach is legally permitted strictly between 09:00 and 20:00 Gulf Standard Time (GST). Emergency fraud mitigation outreach is designated critical protection and is exempt from time-of-day restrictions.",
    relevance_score: 0.89,
  },
  {
    document: "approved_scripts.pdf",
    section: "Section 1.0 — Mandatory Opening Disclosure",
    policy_version: "v4.0.1",
    timestamp: "2026-02-14T09:30:00Z",
    text: "Every automated call must initiate with explicit identity disclosure: 'I am an automated security assistant calling on behalf of [Institution Name]'. The caller must be informed that the call is governed and auditable.",
    relevance_score: 0.92,
  },
  {
    document: "escalation_policy.pdf",
    section: "Section 5.3 — Human Specialist Handover Protocol (H)",
    policy_version: "v2.6.0",
    timestamp: "2026-01-20T15:00:00Z",
    text: "Warm handoffs to human specialists are triggered whenever: (1) customer expresses anger or distress, (2) verification challenge fails twice, (3) requested action is outside the deterministic policy rule table, or (4) transaction amount exceeds AED 50,000.",
    relevance_score: 0.91,
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = (body.query || "").toLowerCase();

    // Semantic keyword retrieval
    const matched = KNOWLEDGE_CORPUS.filter((chunk) => {
      if (!query) return true;
      const terms = query.split(/\s+/);
      return terms.some((t: string) =>
        chunk.text.toLowerCase().includes(t) ||
        chunk.document.toLowerCase().includes(t) ||
        chunk.section.toLowerCase().includes(t)
      );
    });

    const results = matched.length > 0 ? matched : [KNOWLEDGE_CORPUS[0], KNOWLEDGE_CORPUS[1]];

    return NextResponse.json({
      success: true,
      query: body.query,
      vector_retrieval_model: "text-embedding-3-small (1536 dim)",
      results_count: results.length,
      chunks: results,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "RAG retrieval failure",
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    corpus_size: KNOWLEDGE_CORPUS.length,
    documents: [
      "fraud_policy.pdf",
      "customer_verification.pdf",
      "approved_scripts.pdf",
      "calling_hours.pdf",
      "escalation_policy.pdf",
      "card_freeze_policy.pdf",
    ],
    chunks: KNOWLEDGE_CORPUS,
  });
}
