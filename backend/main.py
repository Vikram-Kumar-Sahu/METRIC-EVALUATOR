"""
Real-Time Multilingual Metric Evaluator — Backend
FastAPI server that computes ROUGE, BERTScore, and COMET scores live.

Install dependencies:
    pip install -r requirements.txt

Run:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

# Create FastAPI app
app = FastAPI(title="Multilingual Metric Evaluator API")

# Allow requests from the React frontend and local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://metric-evaluator.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

# health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

# Include routes
app.include_router(router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
