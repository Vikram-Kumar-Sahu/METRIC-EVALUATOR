import { useState } from "react";

/* ── Global Styles ─────────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:ital,wght@1,400;1,700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:      #080c10;
      --panel:   #0d1117;
      --border:  #1e2a38;
      --border2: #2a3a4e;
      --text:    #c8d6e5;
      --dim:     #5a7a96;
      --bright:  #e8f0f8;
      --cyan:    #38bdf8;
      --teal:    #2dd4bf;
      --amber:   #f59e0b;
      --rose:    #f43f5e;
      --violet:  #a78bfa;
      --green:   #4ade80;
    }
    html, body {
      background: var(--bg); color: var(--text);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px; min-height: 100vh;
    }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--panel); }
    ::-webkit-scrollbar-thumb { background: var(--border2); }

    .app {
      min-height: 100vh; display: flex; flex-direction: column;
      background-image:
        linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* topbar */
    .topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 28px; height: 52px;
      border-bottom: 1px solid var(--border);
      background: var(--panel);
      position: sticky; top: 0; z-index: 100;
    }
    .logo {
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.12em; color: var(--cyan);
      display: flex; align-items: center; gap: 8px;
    }
    .logo::before { content: '▣'; color: var(--teal); }
    .logo-sub { font-size: 0.6rem; color: var(--dim); font-weight: 300; }

    /* content */
    .content { flex: 1; max-width: 1100px; margin: 0 auto; width: 100%; padding: 36px 28px 60px; }

    /* section titles */
    .sec-tag { font-size: 0.6rem; letter-spacing: 0.18em; color: var(--dim); text-transform: uppercase; margin-bottom: 6px; }
    .sec-title {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 2rem; color: var(--bright); margin-bottom: 8px; line-height: 1.2;
    }
    .sec-desc { font-size: 0.78rem; color: var(--dim); line-height: 1.75; margin-bottom: 32px; max-width: 640px; }

    /* card */
    .card { background: var(--panel); border: 1px solid var(--border); padding: 24px; margin-bottom: 20px; }
    .card-head {
      font-size: 0.65rem; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--dim);
      padding-bottom: 14px; margin-bottom: 20px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 8px;
    }
    .dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

    /* main grid */
    .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media(max-width: 740px) { .main-grid { grid-template-columns: 1fr; } }

    /* textarea */
    .field-label { font-size: 0.6rem; letter-spacing: 0.12em; color: var(--dim); text-transform: uppercase; margin-bottom: 8px; display: block; }
    textarea {
      width: 100%; padding: 14px;
      background: var(--bg); border: 1px solid var(--border2);
      color: var(--text); font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem; line-height: 1.7; resize: vertical;
      outline: none; transition: border-color 0.2s;
    }
    textarea:focus { border-color: var(--cyan); }
    textarea::placeholder { color: var(--border2); }

    /* language selector */
    .lang-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
    .lang-btn {
      padding: 5px 12px; font-family: 'IBM Plex Mono', monospace;
      font-size: 0.68rem; border: 1px solid var(--border2);
      background: transparent; color: var(--dim); cursor: pointer;
      transition: all 0.15s;
    }
    .lang-btn:hover { border-color: var(--cyan); color: var(--text); }
    .lang-btn.sel { background: var(--cyan); border-color: var(--cyan); color: var(--bg); font-weight: 600; }

    /* metric toggles */
    .metric-toggles { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
    .m-toggle {
      padding: 6px 14px; font-family: 'IBM Plex Mono', monospace;
      font-size: 0.7rem; border: 1px solid var(--border2);
      background: transparent; color: var(--dim); cursor: pointer;
      transition: all 0.15s; display: flex; align-items: center; gap: 6px;
    }
    .m-toggle.active { border-color: var(--violet); background: rgba(167,139,250,0.12); color: var(--violet); }
    .m-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

    /* run button */
    .run-btn {
      width: 100%; padding: 14px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      background: var(--cyan); color: var(--bg);
      border: none; cursor: pointer; transition: all 0.2s;
    }
    .run-btn:hover:not(:disabled) { background: var(--teal); }
    .run-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* results */
    .results-area { min-height: 320px; }
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 280px; border: 1px dashed var(--border2);
      color: var(--dim); font-size: 0.75rem; gap: 10px; text-align: center; line-height: 1.6;
    }
    .empty-icon { font-size: 2.5rem; opacity: 0.2; }

    /* metric result card */
    .result-card {
      border: 1px solid var(--border2); padding: 20px; margin-bottom: 12px;
      transition: border-color 0.2s;
    }
    .result-card:hover { border-color: var(--border); }
    .result-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .result-name { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
    .result-type { font-size: 0.6rem; color: var(--dim); }
    .result-score {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 2.2rem; font-weight: 700; line-height: 1;
    }
    .result-bar-bg { width: 100%; height: 4px; background: var(--border); margin-bottom: 14px; }
    .result-bar { height: 100%; transition: width 0.8s ease; }
    .subscores { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; }
    .subscore-item { font-size: 0.62rem; }
    .subscore-key { color: var(--dim); }
    .subscore-val { color: var(--text); font-weight: 600; }
    .result-error { font-size: 0.7rem; color: var(--rose); margin-top: 8px; font-style: italic; }
    .result-time { font-size: 0.58rem; color: var(--border2); margin-top: 8px; }

    /* interpretation box */
    .interp-box {
      background: rgba(56,189,248,0.04);
      border: 1px solid rgba(56,189,248,0.15);
      padding: 16px; margin-top: 20px;
    }
    .interp-head { font-size: 0.6rem; letter-spacing: 0.15em; color: var(--cyan); text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
    .interp-text { font-size: 0.73rem; color: var(--dim); line-height: 1.8; }
    .interp-text strong { color: var(--text); }

    /* spinner */
    .spin { display: inline-block; width: 14px; height: 14px; border: 1.5px solid var(--border2); border-top-color: var(--cyan); border-radius: 50%; animation: rot 0.7s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }

    /* progress */
    .progress-row { display: flex; align-items: center; gap: 10px; padding: 14px; border: 1px solid var(--border); margin-bottom: 10px; font-size: 0.72rem; color: var(--dim); }
    .progress-row.done { border-color: rgba(74,222,128,0.3); color: var(--green); }
    .progress-row.running { border-color: rgba(56,189,248,0.3); color: var(--cyan); }
    .progress-row.error { border-color: rgba(244,63,94,0.3); color: var(--rose); }

    .fade { animation: fd 0.3s ease; }
    @keyframes fd { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; } }

    /* statusbar */
    .statusbar {
      border-top: 1px solid var(--border); background: var(--panel);
      padding: 6px 28px; display: flex; gap: 20px;
      font-size: 0.6rem; color: var(--dim); letter-spacing: 0.08em;
    }
    .s-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); display: inline-block; margin-right: 5px; animation: pulse 2s ease infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* info banner */
    .info-banner {
      background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.25);
      padding: 12px 16px; margin-bottom: 20px;
      font-size: 0.7rem; color: var(--amber); line-height: 1.6;
      display: flex; align-items: flex-start; gap: 10px;
    }
    .info-banner strong { color: var(--amber); }

    /* server url input */
    .server-row { display: flex; gap: 8px; margin-bottom: 20px; align-items: center; }
    .server-input {
      flex: 1; padding: 8px 12px;
      background: var(--bg); border: 1px solid var(--border2);
      color: var(--text); font-family: 'IBM Plex Mono', monospace;
      font-size: 0.72rem; outline: none;
    }
    .server-input:focus { border-color: var(--cyan); }
    .server-status { font-size: 0.65rem; padding: 4px 10px; border: 1px solid; }
    .server-ok   { border-color: var(--green); color: var(--green); }
    .server-fail { border-color: var(--rose);  color: var(--rose);  }
    .server-unknown { border-color: var(--border2); color: var(--dim); }
  `}</style>
);

/* ── Constants ──────────────────────────────────────────────────────────── */
const LANGUAGES = [
  { code: "ar", label: "Arabic",     family: "High Fusional" },
  { code: "he", label: "Hebrew",     family: "High Fusional" },
  { code: "zh", label: "Chinese",    family: "Isolating"     },
  { code: "ja", label: "Japanese",   family: "Agglutinative" },
  { code: "tr", label: "Turkish",    family: "Agglutinative" },
  { code: "es", label: "Spanish",    family: "Low Fusional"  },
  { code: "uk", label: "Ukrainian",  family: "Low Fusional"  },
  { code: "yo", label: "Yoruba",     family: "Isolating"     },
  { code: "en", label: "English",    family: "Low Fusional"  },
];

const METRIC_OPTIONS = [
  { id: "rouge",     label: "ROUGE",     type: "N-Gram", color: "var(--amber)"  },
  { id: "bertscore", label: "BERTScore", type: "Neural", color: "var(--cyan)"   },
  { id: "comet",     label: "COMET",     type: "Neural", color: "var(--teal)"   },
  { id: "chrf",      label: "CHRF",      type: "N-Gram", color: "var(--violet)" },
  { id: "bleu",      label: "BLEU",      type: "N-Gram", color: "var(--rose)"   },
];

// What score color to use
function scoreColor(score) {
  if (score >= 0.5) return "var(--green)";
  if (score >= 0.25) return "var(--teal)";
  if (score >= 0.10) return "var(--amber)";
  if (score >= 0)    return "var(--rose)";
  return "var(--rose)";
}

// Human-readable interpretation of results
function interpretResults(results, language) {
  const lang = LANGUAGES.find(l => l.code === language);
  const family = lang?.family || "unknown";
  const rouge = results.find(r => r.name === "ROUGE");
  const comet = results.find(r => r.name === "COMET");
  const bert  = results.find(r => r.name === "BERTScore");

  const parts = [];

  if (rouge && comet && !rouge.error && !comet.error) {
    const gap = comet.score - rouge.score;
    if (gap > 0.2 && (family === "High Fusional" || family === "Low Fusional")) {
      parts.push(`⚠️ <strong>Large gap detected</strong> between ROUGE (${rouge.score.toFixed(3)}) and COMET (${comet.score.toFixed(3)}). This is expected for <strong>${family}</strong> languages — morphological variation means ROUGE misses valid word matches that COMET's neural model captures correctly.`);
    } else if (gap < 0.05) {
      parts.push(`✓ ROUGE and COMET scores are closely aligned (gap: ${gap.toFixed(3)}), suggesting the summary uses similar surface forms to the reference.`);
    }
  }

  if (family === "High Fusional") {
    parts.push(`🔴 <strong>${family}</strong> language detected (${lang?.label}). The paper found ROUGE correlates as low as −0.26 with human judgments for this family. <strong>Trust COMET or BERTScore over ROUGE for this language.</strong>`);
  } else if (family === "Agglutinative") {
    parts.push(`🟡 <strong>${family}</strong> language detected (${lang?.label}). ROUGE works moderately but misses morphological variants. BERTScore with a monolingual model is recommended.`);
  } else if (family === "Isolating") {
    parts.push(`🟢 <strong>${family}</strong> language detected (${lang?.label}). ROUGE is relatively reliable here due to stable word forms, but COMET still provides the best human correlation.`);
  }

  if (rouge?.error) parts.push(`⚠️ ROUGE failed: ${rouge.error}`);
  if (comet?.error) parts.push(`⚠️ COMET failed: ${comet.error} — COMET requires the unbabel-comet package and model download (~1.5GB).`);
  if (bert?.error)  parts.push(`⚠️ BERTScore failed: ${bert.error}`);

  return parts.length > 0 ? parts.join("<br/><br/>") : "Scores computed successfully. Hover metric names for details.";
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [serverUrl,   setServerUrl]   = useState("http://localhost:8000");
  const [serverState, setServerState] = useState("unknown"); // ok | fail | unknown
  const [hypothesis,  setHypothesis]  = useState("");
  const [reference,   setReference]   = useState("");
  const [source,      setSource]      = useState("");
  const [language,    setLanguage]    = useState("ar");
  const [activeMetrics, setActiveMetrics] = useState(["rouge", "bertscore", "comet"]);
  const [results,     setResults]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [progress,    setProgress]    = useState([]);
  const [totalMs,     setTotalMs]     = useState(null);

  const toggleMetric = (id) => {
    setActiveMetrics(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const checkServer = async (url) => {
    try {
      const res = await fetch(`${url}/health`, { signal: AbortSignal.timeout(3000) });
      setServerState(res.ok ? "ok" : "fail");
    } catch {
      setServerState("fail");
    }
  };

  const runEvaluation = async () => {
    if (!hypothesis.trim() || !reference.trim()) return;
    setLoading(true);
    setResults(null);
    setProgress(activeMetrics.map(m => ({ id: m, status: "waiting" })));

    try {
      // Show running state
      setProgress(activeMetrics.map(m => ({ id: m, status: "running" })));

      const res = await fetch(`${serverUrl}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesis: hypothesis.trim(),
          reference:  reference.trim(),
          source:     source.trim() || null,
          language,
          metrics:    activeMetrics,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      // Mark each as done or error
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
      setResults([{ name: "Connection Error", score: 0, error: `Could not reach server at ${serverUrl}. Make sure the backend is running. Error: ${err.message}` }]);
    }
    setLoading(false);
  };

  const canRun = hypothesis.trim() && reference.trim() && activeMetrics.length > 0 && !loading;

  return (
    <>
      <G />
      <div className="app">
        {/* topbar */}
        <div className="topbar">
          <div>
            <div className="logo">METRIC · EVALUATOR · v1.0</div>
            <div className="logo-sub" style={{ marginTop: 2 }}>Real-time multilingual NLP metric computation</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.6rem", color: "var(--dim)" }}>BACKEND</span>
            <span className={`server-status ${serverState === "ok" ? "server-ok" : serverState === "fail" ? "server-fail" : "server-unknown"}`}>
              {serverState === "ok" ? "● CONNECTED" : serverState === "fail" ? "● OFFLINE" : "● UNKNOWN"}
            </span>
          </div>
        </div>

        <div className="content">
          <div className="sec-tag">// LIVE EVALUATION ENGINE</div>
          <div className="sec-title">Real-Time Metric Scorer</div>
          <div className="sec-desc">
            Paste a generated summary and a reference summary, pick your language, and compute ROUGE, BERTScore, COMET, CHRF and BLEU scores in real time using actual metric implementations — not approximations.
          </div>

          {/* Server config */}
          <div className="card">
            <div className="card-head"><span className="dot" style={{ background: "var(--amber)" }} />BACKEND SERVER</div>
            <div className="info-banner">
              <span>⚡</span>
              <div>
                <strong>Setup required:</strong> Run the Python backend first.<br />
                <code style={{ fontSize: "0.68rem", opacity: 0.85 }}>cd backend && pip install -r requirements.txt && uvicorn main:app --reload</code>
              </div>
            </div>
            <div className="server-row">
              <input
                className="server-input"
                value={serverUrl}
                onChange={e => { setServerUrl(e.target.value); setServerState("unknown"); }}
                placeholder="http://localhost:8000"
              />
              <button className="run-btn" style={{ width: "auto", padding: "8px 20px", fontSize: "0.68rem" }}
                onClick={() => checkServer(serverUrl)}>
                Ping Server
              </button>
            </div>
          </div>

          <div className="main-grid">
            {/* LEFT: inputs */}
            <div>
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
                      {l?.family === "Isolating"     && <span style={{ color: "var(--green)", marginLeft: 10 }}>✓ ROUGE works well</span>}
                    </div>
                  );
                })()}
              </div>

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
                <button className="run-btn" onClick={runEvaluation} disabled={!canRun}>
                  {loading ? <><span className="spin" style={{ marginRight: 8 }} />Computing...</> : "▶ Run Evaluation"}
                </button>
              </div>
            </div>

            {/* RIGHT: results */}
            <div>
              <div className="card results-area">
                <div className="card-head"><span className="dot" style={{ background: "var(--teal)" }} />RESULTS
                  {totalMs && <span style={{ marginLeft: "auto", fontSize: "0.58rem", color: "var(--border2)" }}>Total: {totalMs}ms</span>}
                </div>

                {/* progress indicators */}
                {loading && progress.map(p => (
                  <div key={p.id} className={`progress-row ${p.status}`}>
                    {p.status === "running" ? <span className="spin" /> :
                     p.status === "done"    ? "✓" :
                     p.status === "error"   ? "✗" : "○"}
                    {METRIC_OPTIONS.find(m => m.id === p.id)?.label || p.id}
                    {p.status === "running" && "..."}
                  </div>
                ))}

                {!results && !loading && (
                  <div className="empty-state">
                    <div className="empty-icon">◎</div>
                    <div>Paste your texts, select a language,<br />then click <strong style={{ color: "var(--cyan)" }}>Run Evaluation</strong>.</div>
                  </div>
                )}

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

                    {/* interpretation */}
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
          </div>
        </div>

        <div className="statusbar">
          <span><span className="s-dot" />REAL-TIME SCORING</span>
          <span>SOURCE: Beyond N-Grams, ACL 2025</span>
          <span>ROUGE · BERTSCORE · COMET · CHRF · BLEU</span>
        </div>
      </div>
    </>
  );
}
