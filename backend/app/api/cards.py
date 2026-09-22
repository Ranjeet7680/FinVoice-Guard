from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import random
from datetime import datetime

router = APIRouter(prefix="/api/cards", tags=["cards"])

class CardFreezeRequest(BaseModel):
    customer_id: str = "CUST-10045"
    card_id: str = "CARD-9912"
    reason: str = "CONFIRMED_FRAUD"
    duration: str = "24_HOURS"

@router.post("/freeze")
async def freeze_card(req: CardFreezeRequest):
    ref = f"FRZ-{random.randint(10000, 99999)}"
    now = datetime.utcnow().isoformat()
    return {
        "success": True,
        "status": "TEMPORARILY_FROZEN",
        "card_id": req.card_id,
        "customer_id": req.customer_id,
        "reference": ref,
        "duration": req.duration,
        "applied_at": now,
        "institution_mode": "SIMULATED_BANKING_CORE",
        "message": f"Card {req.card_id} temporarily frozen for {req.duration} under verified fraud protocol. Reference: {ref}"
    }

@router.get("/")
async def get_cards_status():
    return {
        "institution": "Simulated Central Bank Gateway",
        "active_card": "CARD-9912",
        "status": "TEMPORARILY_FROZEN"
    }
