/**
 * ServerConfig component
 */

export function ServerConfig({ serverUrl, setServerUrl, checkServer }) {
  return (
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
          onChange={e => { setServerUrl(e.target.value); }}
          placeholder="http://localhost:8000"
        />
        <button className="run-btn" style={{ width: "auto", padding: "8px 20px", fontSize: "0.68rem" }}
          onClick={() => checkServer(serverUrl)}>
          Ping Server
        </button>
      </div>
    </div>
  );
}
