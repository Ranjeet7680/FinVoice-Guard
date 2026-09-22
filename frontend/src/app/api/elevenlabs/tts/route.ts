import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY =
  process.env.ELEVENLABS_API_KEY ||
  process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ||
  "sk_9526db3a71d19774cb3c84b09c7a3dc382d6344be0e4019d";

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George - Multilingual
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice_id = DEFAULT_VOICE_ID,
      model_id = DEFAULT_MODEL_ID,
      stability = 0.5,
      similarity_boost = 0.75,
    } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Valid text is required for voice synthesis" },
        { status: 400 }
      );
    }

    // Call ElevenLabs Text-to-Speech API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id,
          voice_settings: {
            stability: Number(stability),
            similarity_boost: Number(similarity_boost),
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs TTS Error:", response.status, errorText);
      return NextResponse.json(
        {
          error: `ElevenLabs API returned status ${response.status}`,
          details: errorText,
          fallback_available: true,
        },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Engine": "ElevenLabs-eleven_multilingual_v2",
      },
    });
  } catch (error: any) {
    console.error("Internal ElevenLabs route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error during speech synthesis",
        message: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
