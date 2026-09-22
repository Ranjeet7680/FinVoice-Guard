import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice_id = "JBFqnCBsd6RMkjVDRZzb",
      model_id = "eleven_multilingual_v2",
      stability = 0.5,
      similarity_boost = 0.75,
    } = body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "Text payload is required for speech synthesis." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY || "sk_9526db3a71d19774cb3c84b09c7a3dc382d6344be0e4019d";

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id,
          voice_settings: {
            stability: Number(stability),
            similarity_boost: Number(similarity_boost),
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `ElevenLabs API error: ${errText}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=speech.mp3",
        "Cache-Control": "no-cache",
        "X-Engine": `ElevenLabs-${model_id}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Speech synthesis execution failed" },
      { status: 500 }
    );
  }
}
