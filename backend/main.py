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

# Allow requests from the React frontend (any origin for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
