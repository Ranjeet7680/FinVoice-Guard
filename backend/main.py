from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import fraud

app = FastAPI(title="FinVoice Guard API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fraud.router)

@app.get("/")
def read_root():
    return {"status": "FinVoice Guard Backend is running"}
