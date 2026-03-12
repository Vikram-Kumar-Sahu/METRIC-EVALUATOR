"""
CHRF metric computation
"""
import time
from models import MetricResult


def compute_chrf(hypothesis: str, reference: str) -> MetricResult:
    """Character n-gram F-score"""
    t0 = time.time()
    try:
        from sacrebleu.metrics import CHRF
        metric = CHRF()
        score  = metric.sentence_score(hypothesis, [reference]).score / 100.0
        return MetricResult(
            name="CHRF",
            score=round(score, 4),
            subscores={"chrf": round(score, 4)},
            duration_ms=round((time.time() - t0) * 1000, 1),
        )
    except Exception as e:
        return MetricResult(
            name="CHRF",
            score=0.0,
            error=str(e),
            duration_ms=round((time.time() - t0) * 1000, 1)
        )
