"""
API routes for the metric evaluator
"""
import time
from fastapi import APIRouter
from models import EvalRequest, EvalResponse
from metrics import compute_rouge, compute_bertscore, compute_comet, compute_chrf, compute_bleu

router = APIRouter()


@router.get("/")
def root():
    """Root endpoint"""
    return {"status": "ok", "message": "Multilingual Metric Evaluator API"}


@router.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@router.post("/evaluate", response_model=EvalResponse)
def evaluate(req: EvalRequest):
    """Main evaluation endpoint"""
    t_total = time.time()
    results = []

    metric_set = set(m.lower() for m in req.metrics)

    if "rouge" in metric_set:
        results.append(compute_rouge(req.hypothesis, req.reference))

    if "bertscore" in metric_set:
        results.append(compute_bertscore(req.hypothesis, req.reference, req.language))

    if "comet" in metric_set:
        results.append(compute_comet(req.hypothesis, req.reference, req.source))

    if "chrf" in metric_set:
        results.append(compute_chrf(req.hypothesis, req.reference))

    if "bleu" in metric_set:
        results.append(compute_bleu(req.hypothesis, req.reference))

    return EvalResponse(
        results=results,
        language=req.language,
        total_ms=round((time.time() - t_total) * 1000, 1),
    )


@router.get("/metrics")
def list_metrics():
    """Returns all available metrics and their descriptions"""
    return {
        "metrics": [
            {"id": "rouge",      "name": "ROUGE",      "type": "N-Gram",  "description": "Recall-Oriented Understudy for Gisting Evaluation. Measures n-gram overlap between hypothesis and reference."},
            {"id": "bertscore",  "name": "BERTScore",  "type": "Neural",  "description": "Computes similarity using BERT token embeddings. Uses language-specific models when available."},
            {"id": "comet",      "name": "COMET",       "type": "Neural",  "description": "Trained neural metric with human quality score regression. Best overall correlation across language families."},
            {"id": "chrf",       "name": "CHRF",        "type": "N-Gram",  "description": "Character n-gram F-score. More robust than word-level metrics for morphologically rich languages."},
            {"id": "bleu",       "name": "BLEU",        "type": "N-Gram",  "description": "Bilingual Evaluation Understudy. Precision-based n-gram overlap metric."},
        ]
    }
