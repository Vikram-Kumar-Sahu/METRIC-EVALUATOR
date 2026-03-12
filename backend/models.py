"""
Pydantic models for request/response validation
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict


class EvalRequest(BaseModel):
    """Request model for evaluation endpoint"""

    hypothesis: str          # generated summary
    reference: str           # reference summary
    source: Optional[str] = None   # original article (used by COMET)

    language: str = "en"

    metrics: List[str] = Field(
        default_factory=lambda: ["rouge", "bertscore", "comet"]
    )


class MetricResult(BaseModel):
    """Result for a single metric"""

    name: str
    score: float

    subscores: Dict = Field(default_factory=dict)

    error: Optional[str] = None
    duration_ms: float = 0.0


class EvalResponse(BaseModel):
    """Response model for evaluation endpoint"""

    results: List[MetricResult]
    language: str
    total_ms: float