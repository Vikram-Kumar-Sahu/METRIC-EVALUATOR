/**
 * Global styles component
 */

export const GlobalStyles = () => (
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
