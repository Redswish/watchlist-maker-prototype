import { createAgentUIStreamResponse } from "ai";
import { createWatchlistAgent } from "@/lib/agents/watchlist-agent";

export const maxDuration = 60;

export async function POST(request: Request) {
  const { messages } = await request.json();

  // #region agent log
  const last = messages?.[messages.length - 1];
  fetch("http://127.0.0.1:7778/ingest/190652c7-76b4-46ea-8888-883ea96cfef5", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "6b1f0a",
    },
    body: JSON.stringify({
      sessionId: "6b1f0a",
      runId: "post-fix",
      hypothesisId: "G",
      location: "api/chat/route.ts:POST",
      message: "chat api received",
      data: {
        messageCount: messages?.length ?? 0,
        lastRole: last?.role,
        lastPartTypes: last?.parts?.map((part: { type: string }) => part.type),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return createAgentUIStreamResponse({
    agent: createWatchlistAgent(),
    uiMessages: messages,
  });
}
