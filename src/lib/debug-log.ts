export function debugLog(payload: Record<string, unknown>) {
  const body = JSON.stringify({
    sessionId: "5f992b",
    timestamp: Date.now(),
    ...payload,
  });
  fetch("http://127.0.0.1:7778/ingest/190652c7-76b4-46ea-8888-883ea96cfef5", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "5f992b",
    },
    body,
  }).catch(() => {});
  fetch("/api/debug-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).catch(() => {});
}
