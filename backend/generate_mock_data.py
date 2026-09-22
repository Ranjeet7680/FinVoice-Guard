import json
import random
import uuid
from datetime import datetime, timedelta

LANGUAGES = ["English", "Emirati Arabic", "Urdu", "Hindi", "Malayalam", "Bengali", "Tamil", "Tagalog"]

def generate_customers(n=50):
    customers = []
    for i in range(n):
        customers.append({
            "customer_id": f"CUST-10{str(i).zfill(3)}",
            "name": f"Customer {i}",
            "preferred_language": random.choice(LANGUAGES),
            "phone": f"+971-50-{random.randint(1000000, 9999999)}",
            "customer_type": "Retail",
            "product": random.choice(["Credit Card", "Personal Loan", "Auto Loan"]),
            "risk_segment": random.choice(["Low", "Medium", "High"]),
            "vulnerability_flag": random.random() < 0.1,
            "consent_status": "active",
            "preferred_contact_time": "10:00-18:00"
        })
    return customers

def generate_fraud_events(customers, n=20):
    events = []
    merchants = ["XYZ Electronics", "Global Travel", "Luxury Gold", "Online Games Inc", "Unknown ATM"]
    for i in range(n):
        customer = random.choice(customers)
        events.append({
            "event_id": f"FRD-10{str(i).zfill(3)}",
            "customer_id": customer["customer_id"],
            "event_type": "suspicious_card_transaction",
            "amount": round(random.uniform(500, 15000), 2),
            "merchant": random.choice(merchants),
            "risk_score": round(random.uniform(0.75, 0.99), 2),
            "risk_reason": "unusual_location + high_value",
            "recommended_action": "temporary_card_freeze",
            "action_reversible": True,
            "status": "pending_customer_verification"
        })
    return events

if __name__ == "__main__":
    customers = generate_customers()
    fraud_events = generate_fraud_events(customers)
    
    data = {
        "customers": customers,
        "fraud_events": fraud_events
    }
    
    with open("mock_db.json", "w") as f:
        json.dump(data, f, indent=2)
    
    print("Generated mock_db.json")
