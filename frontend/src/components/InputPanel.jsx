/**
 * InputPanel component - Left side with text inputs
 */

import { LANGUAGES, METRIC_OPTIONS } from "../constants";

export function InputPanel({
  hypothesis, setHypothesis,
  reference, setReference,
  source, setSource,
  language, setLanguage,
  activeMetrics, toggleMetric,
  canRun, loading,
  onRun,
}) {
  return (
    <div>
      {/* Text Inputs */}
      <div className="card">
        <div className="card-head"><span className="dot" style={{ background: "var(--violet)" }} />INPUT TEXT</div>

        <label className="field-label">Generated Summary (Hypothesis)</label>
        <textarea
          rows={5} value={hypothesis}
          onChange={e => setHypothesis(e.target.value)}
          placeholder="Paste the AI-generated summary here..."
          style={{ marginBottom: 16 }}
        />

        <label className="field-label">Reference Summary (Gold Standard)</label>
        <textarea
          rows={5} value={reference}
          onChange={e => setReference(e.target.value)}
          placeholder="Paste the human-written reference summary here..."
          style={{ marginBottom: 16 }}
        />

        <label className="field-label">Source Article (optional — improves COMET)</label>
        <textarea
          rows={3} value={source}
          onChange={e => setSource(e.target.value)}
          placeholder="Paste the original article here (used by COMET for source-aware scoring)..."
          style={{ marginBottom: 20 }}
        />
      </div>

      {/* Language Selection */}
      <div className="card">
        <div className="card-head"><span className="dot" style={{ background: "var(--cyan)" }} />LANGUAGE</div>
        <div className="lang-grid">
          {LANGUAGES.map(l => (
            <button key={l.code}
              className={`lang-btn ${language === l.code ? "sel" : ""}`}
              onClick={() => setLanguage(l.code)}
              title={l.family}
            >
              {l.label}
            </button>
          ))}
        </div>
        {language && (() => {
          const l = LANGUAGES.find(x => x.code === language);
          return (
            <div style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: 4 }}>
              Family: <span style={{ color: "var(--text)" }}>{l?.family}</span>
              {l?.family === "High Fusional" && <span style={{ color: "var(--rose)", marginLeft: 10 }}>⚠ ROUGE unreliable</span>}
              {l?.family === "Isolating" && <span style={{ color: "var(--green)", marginLeft: 10 }}>✓ ROUGE works well</span>}
            </div>
          );
        })()}
      </div>

      {/* Metrics Selection */}
      <div className="card">
        <div className="card-head"><span className="dot" style={{ background: "var(--teal)" }} />METRICS TO COMPUTE</div>
        <div className="metric-toggles">
          {METRIC_OPTIONS.map(m => (
            <button key={m.id}
              className={`m-toggle ${activeMetrics.includes(m.id) ? "active" : ""}`}
              onClick={() => toggleMetric(m.id)}
              style={activeMetrics.includes(m.id) ? { borderColor: m.color, color: m.color, background: m.color + "15" } : {}}
            >
              <span className="m-dot" />
              {m.label}
              <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>({m.type})</span>
            </button>
          ))}
        </div>
        <button className="run-btn" onClick={onRun} disabled={!canRun}>
          {loading ? <><span className="spin" style={{ marginRight: 8 }} />Computing...</> : "▶ Run Evaluation"}
        </button>
      </div>
    </div>
  );
}
