"""
COMET metric computation
"""
import time
from typing import Optional
from models import MetricResult
from utils import get_comet


def compute_comet(hypothesis: str, reference: str, source: Optional[str]) -> MetricResult:
    """Compute COMET score"""
    t0 = time.time()
    try:
        model = get_comet()
        if model is None:
            raise RuntimeError("COMET model not loaded — check installation.")

        # COMET expects source; we use reference as source for summarization
        src = source if source else reference
        data = [{"src": src, "mt": hypothesis, "ref": reference}]
        output = model.predict(data, batch_size=1, gpus=0)
        seg_score = float(output.scores[0])

        return MetricResult(
            name="COMET",
            score=round(seg_score, 4),
            subscores={"segment_score": round(seg_score, 4)},
            duration_ms=round((time.time() - t0) * 1000, 1),
        )
    except Exception as e:
        return MetricResult(
            name="COMET",
            score=0.0,
            error=str(e),
            duration_ms=round((time.time() - t0) * 1000, 1)
        )
