"""
ROUGE metric computation
"""
import time
from models import MetricResult
from utils import get_rouge


def compute_rouge(hypothesis: str, reference: str) -> MetricResult:
    """Compute ROUGE score"""
    t0 = time.time()
    try:
        scorer  = get_rouge()
        scores  = scorer.score(reference, hypothesis)
        r1      = scores["rouge1"].fmeasure
        r2      = scores["rouge2"].fmeasure
        rL      = scores["rougeL"].fmeasure
        overall = (r1 + r2 + rL) / 3
        return MetricResult(
            name="ROUGE",
            score=round(overall, 4),
            subscores={
                "rouge1": round(r1, 4),
                "rouge2": round(r2, 4),
                "rougeL": round(rL, 4),
            },
            duration_ms=round((time.time() - t0) * 1000, 1),
        )
    except Exception as e:
        return MetricResult(
            name="ROUGE",
            score=0.0,
            error=str(e),
            duration_ms=round((time.time() - t0) * 1000, 1)
        )
