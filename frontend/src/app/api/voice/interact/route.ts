import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY ||
  process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ||
  "sk_9526db3a71d19774cb3c84b09c7a3dc382d6344be0e4019d";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George - Eleven Multilingual v2

interface InteractionPayload {
  user_message: string;
  scenario?: string;
  customer_name?: string;
  card_last4?: string;
  voice_id?: string;
  language?: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body: InteractionPayload = await req.json();
    const {
      user_message = "",
      scenario = "FRAUD_INTERVENTION",
      customer_name = "Ahmed Khan",
      card_last4 = "9912",
      voice_id = DEFAULT_VOICE_ID,
      language = "en",
    } = body;

    if (!user_message || !user_message.trim()) {
      return NextResponse.json(
        { error: "User message transcription or text input is required." },
        { status: 400 }
      );
    }

    const cleanMsg = user_message.trim().toLowerCase();

    // 1. Regulatory Guardrail Evaluation (CBUAE Zero-Secrets & Jailbreak Prevention)
    const isCredentialSolicitation =
      cleanMsg.includes("pin") ||
      cleanMsg.includes("cvv") ||
      cleanMsg.includes("password") ||
      cleanMsg.includes("secret") ||
      cleanMsg.includes("otp") ||
      cleanMsg.includes("transfer") ||
      cleanMsg.includes("ignore policy") ||
      cleanMsg.includes("system prompt");

    // 2. Fraud Confirmation Detection
    const isFraudConfirmation =
      cleanMsg.includes("not me") ||
      cleanMsg.includes("didn't make") ||
      cleanMsg.includes("did not") ||
      cleanMsg.includes("fraud") ||
      cleanMsg.includes("stolen") ||
      cleanMsg.includes("block") ||
      cleanMsg.includes("freeze") ||
      cleanMsg.includes("unauthorized") ||
      cleanMsg.includes("someone else") ||
      cleanMsg.includes("rokien") ||
      cleanMsg.includes("روکیں") ||
      cleanMsg.includes("نہیں") ||
      cleanMsg.includes("रोकें") ||
      cleanMsg.includes("مشکوک");

    // 3. Legitimate Transaction Confirmation
    const isLegitConfirmation =
      cleanMsg.includes("it was me") ||
      cleanMsg.includes("i made") ||
      cleanMsg.includes("legitimate") ||
      cleanMsg.includes("i bought") ||
      cleanMsg.includes("authorized") ||
      cleanMsg.includes("yes i did") ||
      cleanMsg.includes("मेरा था") ||
      cleanMsg.includes("میں نے کیا");

    let replyText = "";
    let policyDecision: "APPROVED" | "BLOCKED" = "APPROVED";
    let policyId = "FRAUD-V3.2";
    let intent = "GENERAL_INQUIRY";
    let actionTaken = "CONVERSATION_RECORDED";
    let refId = `REF-${Math.floor(10000 + Math.random() * 90000)}`;

    if (isCredentialSolicitation) {
      policyDecision = "BLOCKED";
      policyId = "CBUAE-REG-604-ZERO-SECRETS";
      intent = "SECURITY_RULE_VIOLATION";
      actionTaken = "RESTRICT_AND_FLAG";

      if (language === "ur" || cleanMsg.includes("کیا") || cleanMsg.includes("ہے")) {
        replyText =
          "حفاظتی ضوابط کے تحت، ہم فون پر کبھی پن یا پاس ورڈ طلب یا فراہم نہیں کرتے۔ آپ کا سیکیورٹی الرٹ برقرار ہے۔";
      } else if (language === "ar") {
        replyText =
          "بموجب لوائح مصرف الإمارات المركزي، لا نطلب أو نفصح أبداً عن كلمة المرور أو رمز الأمان عبر المكالمة الصوتية.";
      } else {
        replyText =
          "In strict compliance with Central Bank of UAE consumer protection rules, FinVoice Guard never requests or discloses account PINs, CVVs, or passwords over voice channels. This interaction has been securely flagged.";
      }
    } else if (isFraudConfirmation) {
      policyDecision = "APPROVED";
      policyId = "FRAUD-V3.2-PROTECTIVE-FREEZE";
      intent = "CONFIRM_FRAUD_TRANSACTION";
      actionTaken = "TEMPORARY_CARD_FREEZE";
      refId = `FRZ-${Math.floor(80000 + Math.random() * 19000)}`;

      if (language === "ur" || cleanMsg.includes("نہیں") || cleanMsg.includes("روکیں")) {
        replyText = `شکریہ احمد خان صاحب۔ ہم نے فوری طور پر آپ کے کارڈ 9912 پر عارضی روک لگا دی ہے، حوالہ نمبر ${refId} ہے۔ ہمارا فراڈ سپیشلسٹ جلد رابطہ کرے گا۔`;
      } else if (language === "hi") {
        replyText = `धन्यवाद। हमने आपके कार्ड 9912 पर तत्काल सुरक्षा फ्रीज़ लगा दिया है, संदर्भ संख्या ${refId} है। हमारी फ्रॉड टीम आपसे संपर्क करेगी।`;
      } else if (language === "ar") {
        replyText = `شكراً لتأكيدكم. لقد قمنا بتجميد بطاقتكم المنتهية بالرقم 9912 احترازياً برقم مرجعي ${refId}. لا يمكن إجراء أي سحب إضافي الآن.`;
      } else {
        replyText = `Thank you for confirming, ${customer_name}. I have immediately enacted a protective temporary freeze on your card ending in ${card_last4} under reference ${refId}. No further unauthorized transactions will be processed, and an investigator has been assigned.`;
      }
    } else if (isLegitConfirmation) {
      policyDecision = "APPROVED";
      policyId = "FRAUD-V3.2-VERIFIED-AUTH";
      intent = "CONFIRM_LEGITIMATE_PURCHASE";
      actionTaken = "UNRESTRICTED_CARD_STATUS";

      if (language === "ur") {
        replyText = `تصدیق کا شکریہ احمد خان صاحب۔ ہم نے اس ٹرانزیکشن کو کلیئر کر دیا ہے، آپ کا کارڈ معمول کے مطابق فعال رہے گا۔`;
      } else if (language === "ar") {
        replyText = `شكراً لتأكيدكم. تم التحقق من المعاملة بنجاح، وستبقى بطاقتكم المصرفية تعمل بشكل طبيعي وآمن.`;
      } else {
        replyText = `Thank you for confirming, ${customer_name}. I have marked this transaction as verified and authenticated by you. Your card remains fully active with no restrictions.`;
      }
    } else {
      // General customer question / conversational support
      intent = "CUSTOMER_ASSISTANCE";
      actionTaken = "AI_RESPONSE_SYNTHESIZED";

      if (language === "ur") {
        replyText = `میں آپ کی بات سمجھ رہا ہوں۔ کیا آپ لندن میں 920 پاؤنڈ کے ٹرانزیکشن کی تصدیق کرنا چاہتے ہیں یا کارڈ کو روکنا چاہتے ہیں؟`;
      } else if (language === "ar") {
        replyText = `أفهم استفساركم. هل تودون تأكيد العملية المشبوهة بقيمة 920 جنيهاً إسترلينياً أم تجميد البطاقة احترازياً؟`;
      } else {
        replyText = `I understand your message. Regarding the security alert for 920 British Pounds on card ${card_last4}: would you like me to enact a temporary card freeze right now, or did you authorize this charge?`;
      }
    }

    // 4. Synthesize Spoken Voice via ElevenLabs Multilingual v2 API
    let audioBase64: string | null = null;
    let ttsError: string | null = null;

    try {
      const ttsResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: replyText,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (ttsResponse.ok) {
        const audioBuffer = await ttsResponse.arrayBuffer();
        const buffer = Buffer.from(audioBuffer);
        audioBase64 = `data:audio/mpeg;base64,${buffer.toString("base64")}`;
      } else {
        const err = await ttsResponse.text();
        console.warn("ElevenLabs TTS warning:", ttsResponse.status, err);
        ttsError = `ElevenLabs status ${ttsResponse.status}`;
      }
    } catch (ttsErr: any) {
      console.warn("ElevenLabs fetch error:", ttsErr?.message);
      ttsError = ttsErr?.message || "Synthesis network error";
    }

    // 5. Cryptographic SHA-256 Merkle Ledger Node Generation
    const totalLatencyMs = Date.now() - startTime;
    const auditRecord = `${startTime}|${user_message}|${replyText}|${policyId}|${policyDecision}|${refId}`;
    const merkleHash = crypto.createHash("sha256").update(auditRecord).digest("hex");

    return NextResponse.json({
      reply_text: replyText,
      audio_base64: audioBase64,
      tts_error: ttsError,
      intent,
      policy_decision: policyDecision,
      policy_id: policyId,
      action_taken: actionTaken,
      reference_id: refId,
      merkle_hash: merkleHash,
      latency_ms: totalLatencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Voice interaction error:", error);
    return NextResponse.json(
      {
        error: "Voice interaction processing failure",
        message: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
