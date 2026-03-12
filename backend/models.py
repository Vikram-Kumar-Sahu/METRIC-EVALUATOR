"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel
from typing import Optional


class EvalRequest(BaseModel):
    """Request model for evaluation endpoint"""
    hypothesis: str          # the generated summary
    reference:  str          # the gold/reference summary
    source:     Optional[str] = None   # original article (used by COMET)
    language:   str = "en"
    metrics:    list[str] = ["rouge", "bertscore", "comet"]


class MetricResult(BaseModel):
    """Result for a single metric"""
    name:        str
    score:       float
    subscores:   dict        = {}
    error:       Optional[str] = None
    duration_ms: float       = 0.0


class EvalResponse(BaseModel):
    """Response model for evaluation endpoint"""
    results:    list[MetricResult]
    language:   str
    total_ms:   float
