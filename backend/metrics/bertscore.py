"""
BERTScore metric computation
"""
import time
from models import MetricResult


def compute_bertscore(hypothesis: str, reference: str, language: str) -> MetricResult:
    """Compute BERTScore"""
    t0 = time.time()
    try:
        import bert_score
        # Map common language codes to BERTScore model names
        lang_model_map = {
            "ar": "asafaya/bert-base-arabic",
            "he": "avichr/heBERT",
            "zh": "bert-base-chinese",
            "ja": "cl-tohoku/bert-base-japanese-v3",
            "tr": "dbmdz/bert-base-turkish-cased",
            "es": "dccuchile/bert-base-spanish-wwm-cased",
        }
        model = lang_model_map.get(language, "bert-base-multilingual-cased")

        P, R, F = bert_score.score(
            [hypothesis], [reference],
            model_type=model,
            lang=language,
            verbose=False,
        )
        f = float(F[0])
        return MetricResult(
            name="BERTScore",
            score=round(f, 4),
            subscores={
                "precision": round(float(P[0]), 4),
                "recall":    round(float(R[0]), 4),
                "f1":        round(f, 4),
                "model":     model,
            },
            duration_ms=round((time.time() - t0) * 1000, 1),
        )
    except Exception as e:
        return MetricResult(
            name="BERTScore",
            score=0.0,
            error=str(e),
            duration_ms=round((time.time() - t0) * 1000, 1)
        )
