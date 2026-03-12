/**
 * Topbar component
 */

export function Topbar({ serverState }) {
  return (
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
  );
}
