from typing import Dict, Any, List
from datetime import datetime
from app.core.policy_engine import engine as policy_engine

class AgentState:
    def __init__(self, call_id: str, customer_id: str):
        self.call_id = call_id
        self.customer_id = customer_id
        self.state = "START"
        self.language = "Unknown"
        self.intent = "Unknown"
        self.risk_score = 0.0
        self.verification_status = "PENDING"
        self.policy_version = "FRAUD-V3.2"
        self.allowed_actions = []
        self.conversation_history = []
        self.case_id = None
        self.human_required = False
        self.traces = []
        
    def add_trace(self, event: str):
        timestamp = datetime.utcnow().strftime("%H:%M:%S")
        self.traces.append(f"{timestamp} {event}")

class AgentOrchestrator:
    def __init__(self):
        self.active_sessions: Dict[str, AgentState] = {}
        
    def create_session(self, call_id: str, customer_id: str) -> AgentState:
        session = AgentState(call_id, customer_id)
        session.add_trace(f"Call session {call_id} initialized for customer {customer_id}")
        self.active_sessions[call_id] = session
        return session
        
    def process_step(self, call_id: str, event_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        session = self.active_sessions.get(call_id)
        if not session:
            return {"error": "Session not found"}
            
        if event_type == "LANGUAGE_DETECTED":
            session.language = payload.get("language", "English")
            session.state = "AUTHENTICATE"
            session.add_trace(f"Language detected: {session.language}")
            
        elif event_type == "VERIFICATION_SUBMITTED":
            passed = payload.get("passed", False)
            session.verification_status = "PASS" if passed else "FAILED"
            session.add_trace(f"Verification -> {session.verification_status}")
            if passed:
                session.state = "UNDERSTAND_INTENT"
            else:
                session.human_required = True
                session.add_trace("Human escalation required due to failed verification")
                
        elif event_type == "INTENT_DETECTED":
            session.intent = payload.get("intent", "UNKNOWN")
            session.add_trace(f"Intent detected: {session.intent}")
            session.state = "DECIDE_ALLOWED_ACTION"
            
        elif event_type == "EXECUTE_ACTION":
            action = payload.get("action")
            # Enforce policy governance
            decision = policy_engine.evaluate_action(
                session.policy_version, 
                action, 
                {"customer_verified": session.verification_status == "PASS"}
            )
            
            if decision.allowed:
                session.add_trace(f"Policy -> ALLOWED {action}")
                session.state = "CONFIRM"
                return {"status": "SUCCESS", "message": f"Action {action} executed securely", "trace": session.traces}
            else:
                session.add_trace(f"Policy -> BLOCKED {action} ({decision.reason})")
                session.human_required = True
                return {"status": "BLOCKED", "reason": decision.reason, "trace": session.traces}
                
        return {"state": session.state, "trace": session.traces}

orchestrator = AgentOrchestrator()
