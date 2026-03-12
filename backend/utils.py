"""
Utilities for lazy loading models and helpers
"""

# Lazy-loaded model caches
_rouge_scorer = None
_comet_model   = None
_comet_loaded  = False


def get_rouge():
    """Get or create ROUGE scorer (lazy loaded)"""
    global _rouge_scorer
    if _rouge_scorer is None:
        from rouge_score import rouge_scorer
        _rouge_scorer = rouge_scorer.RougeScorer(
            ["rouge1", "rouge2", "rougeL"], use_stemmer=False
        )
    return _rouge_scorer


def get_comet():
    """Get or create COMET model (lazy loaded)"""
    global _comet_model, _comet_loaded
    if not _comet_loaded:
        try:
            from comet import download_model, load_from_checkpoint
            model_path = download_model("Unbabel/wmt22-comet-da")
            _comet_model = load_from_checkpoint(model_path)
        except Exception as e:
            print(f"COMET not available: {e}")
            _comet_model = None
        _comet_loaded = True
    return _comet_model
