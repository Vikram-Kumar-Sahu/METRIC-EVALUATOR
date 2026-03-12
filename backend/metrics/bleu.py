"""
BLEU metric computation
"""
import time
from models import MetricResult


def compute_bleu(hypothesis: str, reference: str) -> MetricResult:
    """BLEU score"""
    t0 = time.time()
    try:
        from sacrebleu.metrics import BLEU
        metric = BLEU(effective_order=True)
        score  = metric.sentence_score(hypothesis, [reference]).score / 100.0
        return MetricResult(
            name="BLEU",
            score=round(score, 4),
            subscores={"bleu": round(score, 4)},
            duration_ms=round((time.time() - t0) * 1000, 1),
        )
    except Exception as e:
        return MetricResult(
            name="BLEU",
            score=0.0,
            error=str(e),
            duration_ms=round((time.time() - t0) * 1000, 1)
        )
