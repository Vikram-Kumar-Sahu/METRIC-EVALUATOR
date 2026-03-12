/**
 * useServer hook - Manage server connection status
 */

import { useState } from "react";

export function useServer(
  initialUrl = import.meta.env.VITE_BACKEND_URL || "https://metric-evaluator.onrender.com"
) {
  const [serverUrl, setServerUrl] = useState(initialUrl);
  const [serverState, setServerState] = useState("unknown");

  const checkServer = async (url) => {
    try {
      const res = await fetch(`${url}/health`, {
        signal: AbortSignal.timeout(3000),
      });

      setServerState(res.ok ? "ok" : "fail");
    } catch {
      setServerState("fail");
    }
  };

  return {
    serverUrl,
    setServerUrl,
    serverState,
    setServerState,
    checkServer,
  };
}