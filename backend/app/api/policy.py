from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import random

router = APIRouter(prefix="/api/policies", tags=["policies"])

class PolicyCheckRequest(BaseModel):
    policy_id: str = "FRAUD-V3.2"
    action: str
    caller_jurisdiction: str = "UAE"

FORBIDDEN_ACTIONS = [
    "request_pin",
    "request_password",
    "request_cvv",
    "permanent_account_closure",
    "fund_transfer",
    "bypass_disclosure"
]

ALLOWED_ACTIONS = [
    "temporary_card_freeze",
    "create_case",
    "human_handoff",
    "send_sms_notification",
    "verify_identity_challenge",
    "query_transaction_details"
]

HUMAN_APPROVAL_REQUIRED = [
    "permanent_card_block",
    "account_closure",
    "dispute_claim_settlement"
]

@router.post("/check")
async def check_policy(req: PolicyCheckRequest):
    if req.action in FORBIDDEN_ACTIONS:
        raise HTTPException(
            status_code=403,
            detail={
                "allowed": False,
                "decision": "BLOCKED",
                "reason": f"Action '{req.action}' is strictly FORBIDDEN under policy {req.policy_id}.",
                "requires_human": True,
                "audit_token": f"BLK-{random.randint(1000, 9999)}"
            }
        )

    if req.action in HUMAN_APPROVAL_REQUIRED:
        return {
            "allowed": False,
            "decision": "HUMAN_APPROVAL_REQUIRED",
            "reason": f"Action '{req.action}' requires mandatory dual-signoff from a Tier-2 Fraud Analyst.",
            "requires_human": True,
            "human_approval_gate": "H",
            "audit_token": f"ESC-{random.randint(1000, 9999)}"
        }

    if req.action in ALLOWED_ACTIONS:
        return {
            "allowed": True,
            "decision": "ALLOWED",
            "policy_id": req.policy_id,
            "action": req.action,
            "requires_human": False,
            "audit_token": f"AUTH-{random.randint(10000, 99990)}"
        }

    # Default fail-closed
    raise HTTPException(
        status_code=400,
        detail={
            "allowed": False,
            "decision": "BLOCKED_FAIL_CLOSED",
            "reason": f"Action '{req.action}' is not explicitly permitted under deterministic rule table."
        }
    )
