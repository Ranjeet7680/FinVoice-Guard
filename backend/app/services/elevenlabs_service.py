import os
import httpx
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "sk_9526db3a71d19774cb3c84b09c7a3dc382d6344be0e4019d")
ELEVENLABS_BASE_URL = "https://api.elevenlabs.io/v1"
DEFAULT_MODEL = os.getenv("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")

# Curated high-fidelity voices for FinVoice Guard financial workflows
ENTERPRISE_VOICES = [
    {
        "id": "JBFqnCBsd6RMkjVDRZzb",
        "name": "George (Multilingual Compliance)",
        "language": "Multilingual / Urdu / English",
        "accent": "Authoritative Banking",
        "use_case": "Fraud Intervention & High-Risk Interception"
    },
    {
        "id": "21m00Tcm4TlvDq8ikWAM",
        "name": "Rachel (Calm & Empathetic)",
        "language": "Multilingual / Hindi / English",
        "accent": "De-escalation Specialist",
        "use_case": "Governed Collections & Hardship Support"
    },
    {
        "id": "AZnzlk1XvdvUeBnXmlld",
        "name": "Domi (Decisive Clinical)",
        "language": "Multilingual / Arabic / English",
        "accent": "Clinical Precision",
        "use_case": "Healthcare Pre-Authorization & Peer Review"
    },
    {
        "id": "EXAVITQu4vr4xnSDxMaL",
        "name": "Bella (Customer Servicing)",
        "language": "Multilingual / Gulf Dialect Support",
        "accent": "Concierge Banking",
        "use_case": "Everyday Servicing & Card Replacement"
    }
]

class ElevenLabsService:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or ELEVENLABS_API_KEY
        self.headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
        }

    async def synthesize(
        self,
        text: str,
        voice_id: str = "JBFqnCBsd6RMkjVDRZzb",
        model_id: str = DEFAULT_MODEL,
        stability: float = 0.5,
        similarity_boost: float = 0.75
    ) -> bytes:
        """
        Synthesizes text into high-fidelity streaming audio using ElevenLabs Multilingual V2.
        """
        url = f"{ELEVENLABS_BASE_URL}/text-to-speech/{voice_id}?output_format=mp3_44100_128"
        payload = {
            "text": text,
            "model_id": model_id,
            "voice_settings": {
                "stability": stability,
                "similarity_boost": similarity_boost,
                "use_speaker_boost": True
            }
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=self.headers)
            response.raise_for_status()
            return response.content

    async def get_subscription(self) -> Dict[str, Any]:
        """
        Retrieves user subscription tier, character quota and usage stats.
        """
        url = f"{ELEVENLABS_BASE_URL}/user/subscription"
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, headers={"xi-api-key": self.api_key})
            response.raise_for_status()
            return response.json()

    async def get_voices(self) -> list:
        """
        Retrieves available voice list from ElevenLabs API.
        """
        url = f"{ELEVENLABS_BASE_URL}/voices"
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, headers={"xi-api-key": self.api_key})
                response.raise_for_status()
                data = response.json()
                return data.get("voices", ENTERPRISE_VOICES)
        except Exception:
            return ENTERPRISE_VOICES

# Singleton instance
elevenlabs_service = ElevenLabsService()
