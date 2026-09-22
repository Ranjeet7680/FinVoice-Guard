from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Customer(BaseModel):
    customer_id: str
    name: str
    preferred_language: str
    phone: str
    customer_type: str
    product: str
    risk_segment: str
    vulnerability_flag: bool
    consent_status: str
    preferred_contact_time: str

class FraudEvent(BaseModel):
    event_id: str
    customer_id: str
    event_type: str
    amount: float
    merchant: str
    risk_score: float
    risk_reason: str
    recommended_action: str
    action_reversible: bool
    status: str

class PreAuthRequest(BaseModel):
    request_id: str
    procedure_code: str
    coverage_status: str
    network_status: str
    preauth_required: bool
    recommended_decision: str
    human_approval_required: bool

class AuditRecord(BaseModel):
    call_id: str
    timestamp: datetime
    customer_id: str
    language: str
    workflow: str
    verification: str
    policy_version: str
    actions: List[str]
    human_escalation: bool
    recording: str
    transcript: str
