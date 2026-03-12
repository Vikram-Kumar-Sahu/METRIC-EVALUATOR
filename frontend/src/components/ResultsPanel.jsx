/**
 * ResultsPanel component - Right side with results display
 */

import { scoreColor } from "../utils/colors";
import { interpretResults } from "../utils/interpret";
import { METRIC_OPTIONS } from "../constants";

export function ResultsPanel({
  loading, progress, results, totalMs, language
}) {
  return (
    <div>
      <div className="card results-area">
        <div className="card-head">
          <span className="dot" style={{ background: "var(--teal)" }} />RESULTS
          {totalMs && <span style={{ marginLeft: "auto", fontSize: "0.58rem", color: "var(--border2)" }}>Total: {totalMs}ms</span>}
        </div>

        {/* Progress Indicators */}
        {loading && progress.map(p => (
          <div key={p.id} className={`progress-row ${p.status}`}>
            {p.status === "running" ? <span className="spin" /> :
              p.status === "done" ? "✓" :
                p.status === "error" ? "✗" : "○"}
            {METRIC_OPTIONS.find(m => m.id === p.id)?.label || p.id}
            {p.status === "running" && "..."}
          </div>
        ))}

        {/* Empty State */}
        {!results && !loading && (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <div>Paste your texts, select a language,<br />then click <strong style={{ color: "var(--cyan)" }}>Run Evaluation</strong>.</div>
          </div>
        )}

        {/* Results Display */}
        {results && !loading && (
          <div className="fade">
            {results.map(r => {
              const meta = METRIC_OPTIONS.find(m => m.label === r.name);
              const color = meta?.color || "var(--text)";
              return (
                <div className="result-card" key={r.name}
                  style={{ borderColor: r.error ? "rgba(244,63,94,0.3)" : "var(--border2)" }}>
                  <div className="result-top">
                    <div>
                      <div className="result-name" style={{ color }}>{r.name}</div>
                      <div className="result-type">{meta?.type || "Metric"}</div>
                    </div>
                    {!r.error && (
                      <div className="result-score" style={{ color: scoreColor(r.score) }}>
                        {r.score.toFixed(4)}
                      </div>
                    )}
                  </div>

                  {!r.error && (
                    <>
                      <div className="result-bar-bg">
                        <div className="result-bar"
                          style={{ width: `${Math.max(0, r.score) * 100}%`, background: scoreColor(r.score) }}
                        />
                      </div>
                      {Object.keys(r.subscores || {}).length > 1 && (
                        <div className="subscores">
                          {Object.entries(r.subscores).map(([k, v]) =>
                            typeof v === "number" ? (
                              <div className="subscore-item" key={k}>
                                <span className="subscore-key">{k}: </span>
                                <span className="subscore-val">{v.toFixed(4)}</span>
                              </div>
                            ) : (
                              <div className="subscore-item" key={k}>
                                <span className="subscore-key">{k}: </span>
                                <span className="subscore-val" style={{ fontSize: "0.58rem" }}>{v}</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {r.error && <div className="result-error">Error: {r.error}</div>}
                  {r.duration_ms > 0 && <div className="result-time">computed in {r.duration_ms}ms</div>}
                </div>
              );
            })}

            {/* Interpretation */}
            {results.some(r => !r.error) && (
              <div className="interp-box">
                <div className="interp-head">⬡ Interpretation</div>
                <div className="interp-text"
                  dangerouslySetInnerHTML={{ __html: interpretResults(results, language) }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
