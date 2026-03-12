/**
 * useEvaluation hook - Manage evaluation state and logic
 */

import { useState } from "react";

export function useEvaluation() {
  const [hypothesis, setHypothesis] = useState("");
  const [reference, setReference] = useState("");
  const [source, setSource] = useState("");
  const [language, setLanguage] = useState("ar");
  const [activeMetrics, setActiveMetrics] = useState(["rouge", "bertscore", "comet"]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [totalMs, setTotalMs] = useState(null);

  const toggleMetric = (id) => {
    setActiveMetrics(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const canRun = hypothesis.trim() && reference.trim() && activeMetrics.length > 0 && !loading;

  const runEvaluation = async (serverUrl, setServerState) => {
    if (!hypothesis.trim() || !reference.trim()) return;
    setLoading(true);
    setResults(null);
    setProgress(activeMetrics.map(m => ({ id: m, status: "waiting" })));

    try {
      setProgress(activeMetrics.map(m => ({ id: m, status: "running" })));

      const res = await fetch(`${serverUrl}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesis: hypothesis.trim(),
          reference: reference.trim(),
          source: source.trim() || null,
          language,
          metrics: activeMetrics,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      setProgress(data.results.map(r => ({
        id: r.name.toLowerCase(),
        status: r.error ? "error" : "done",
        label: r.name,
      })));

      setResults(data.results);
      setTotalMs(data.total_ms);
      setServerState("ok");
    } catch (err) {
      setServerState("fail");
      setProgress(activeMetrics.map(m => ({ id: m, status: "error", label: m })));
      setResults([{
        name: "Connection Error",
        score: 0,
        error: `Could not reach server at ${serverUrl}. Make sure the backend is running. Error: ${err.message}`
      }]);
    }
    setLoading(false);
  };

  return {
    hypothesis, setHypothesis,
    reference, setReference,
    source, setSource,
    language, setLanguage,
    activeMetrics, toggleMetric,
    results, setResults,
    loading, setLoading,
    progress, setProgress,
    totalMs, setTotalMs,
    canRun,
    runEvaluation,
  };
}
