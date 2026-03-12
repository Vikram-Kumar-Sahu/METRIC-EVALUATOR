"""
Utilities for lazy loading models and helpers
"""

# Lazy-loaded model caches
_rouge_scorer = None
_comet_model = None


def get_rouge():
    """Get or create ROUGE scorer (lazy loaded)"""
    global _rouge_scorer

    if _rouge_scorer is None:
        from rouge_score import rouge_scorer

        _rouge_scorer = rouge_scorer.RougeScorer(
            ["rouge1", "rouge2", "rougeL"],
            use_stemmer=False
        )

    return _rouge_scorer


def get_comet():
    """Get or create COMET model (lazy loaded)"""

    global _comet_model

    if _comet_model is None:
        try:
            from comet import download_model, load_from_checkpoint

            print("Loading COMET model... (first run may download)")

            model_path = download_model("Unbabel/wmt20-comet-da")

            _comet_model = load_from_checkpoint(model_path)

            print("COMET model loaded successfully")

        except Exception as e:
            print(f"COMET not available: {e}")
            _comet_model = None

    return _comet_model