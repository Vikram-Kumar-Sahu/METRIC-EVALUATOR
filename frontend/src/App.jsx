/**
 * Main App component
 */

import { GlobalStyles } from "./styles/GlobalStyles";
import { Topbar } from "./components/Topbar";
import { ServerConfig } from "./components/ServerConfig";
import { InputPanel } from "./components/InputPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import { useServer } from "./hooks/useServer";
import { useEvaluation } from "./hooks/useEvaluation";

export default function App() {
  const server = useServer();
  const evaluation = useEvaluation();

  return (
    <>
      <GlobalStyles />
      <div className="app">
        {/* Topbar */}
        <Topbar serverState={server.serverState} />

        <div className="content">
          <div className="sec-tag">// LIVE EVALUATION ENGINE</div>
          <div className="sec-title">Real-Time Metric Scorer</div>
          <div className="sec-desc">
            Paste a generated summary and a reference summary, pick your language, and compute ROUGE, BERTScore, COMET, CHRF and BLEU scores in real time using actual metric implementations — not approximations.
          </div>

          {/* Server Config */}
          <ServerConfig
            serverUrl={server.serverUrl}
            setServerUrl={server.setServerUrl}
            checkServer={server.checkServer}
          />

          <div className="main-grid">
            {/* Left: Input Panel */}
            <InputPanel
              hypothesis={evaluation.hypothesis}
              setHypothesis={evaluation.setHypothesis}
              reference={evaluation.reference}
              setReference={evaluation.setReference}
              source={evaluation.source}
              setSource={evaluation.setSource}
              language={evaluation.language}
              setLanguage={evaluation.setLanguage}
              activeMetrics={evaluation.activeMetrics}
              toggleMetric={evaluation.toggleMetric}
              canRun={evaluation.canRun}
              loading={evaluation.loading}
              onRun={() => evaluation.runEvaluation(server.serverUrl, server.setServerState)}
            />

            {/* Right: Results Panel */}
            <ResultsPanel
              loading={evaluation.loading}
              progress={evaluation.progress}
              results={evaluation.results}
              totalMs={evaluation.totalMs}
              language={evaluation.language}
            />
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
