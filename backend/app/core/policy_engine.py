from typing import List, Dict, Any, Optional

# Mock Policy Store
POLICIES = {
    "FRAUD-V3.2": {
        "workflow": "fraud_intervention",
        "requires_verification": True,
        "allowed_actions": [
            "temporary_card_freeze",
            "create_fraud_case",
            "human_escalation",
            "send_sms_alert"
        ],
        "forbidden_actions": [
            "request_pin",
            "request_password",
            "permanent_account_closure",
            "fund_transfer"
        ]
    }
}

class PolicyDecision:
    def __init__(self, allowed: bool, reason: str, action: str):
        self.allowed = allowed
        self.reason = reason
        self.action = action
        
    def to_dict(self):
        return {
            "allowed": self.allowed,
            "reason": self.reason,
            "action": self.action
        }

class PolicyEngine:
    @staticmethod
    def evaluate_action(policy_version: str, action: str, customer_state: Dict[str, Any]) -> PolicyDecision:
        policy = POLICIES.get(policy_version)
        if not policy:
            return PolicyDecision(False, f"Policy {policy_version} not found.", action)
            
        if action in policy.get("forbidden_actions", []):
            return PolicyDecision(False, f"Action {action} is strictly forbidden by policy {policy_version}.", action)
            
        if action not in policy.get("allowed_actions", []):
            return PolicyDecision(False, f"Action {action} is not in the allowed actions for policy {policy_version}.", action)
            
        if policy.get("requires_verification") and not customer_state.get("customer_verified", False):
             return PolicyDecision(False, "Customer must be verified before executing this action.", action)
             
        return PolicyDecision(True, "Action permitted by policy.", action)

# Singleton instance
engine = PolicyEngine()
