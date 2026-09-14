"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ChatMessage } from "@/components/chat-message";
import { TastePanel } from "@/components/taste-panel";
import type { WatchlistUIMessage } from "@/lib/agents/watchlist-agent";
import { debugLog } from "@/lib/debug-log";
import { latestTasteModel } from "@/lib/taste-model";

const KICKOFF = "Build my watchlist";
// #region agent log
console.log("[debug-5f992b] chat-app module loaded");
// #endregion

export function ChatApp() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, addToolOutput, status, error } =
    useChat<WatchlistUIMessage>({
      transport: new DefaultChatTransport({ api: "/api/chat" }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    });

  const busy = status === "submitted" || status === "streaming";
  const tasteModel = latestTasteModel(messages);
  const sendDisabled = busy || !input.trim();
  // #region agent log
  console.log("[debug-5f992b]", { inputLen: input.length, sendDisabled, busy, status });
  // #endregion
  const lastMessage = messages[messages.length - 1];
  const lastToolParts = lastMessage?.parts
    .filter((part) => part.type.startsWith("tool-"))
    .map((part) => ({
      type: part.type,
      state: "state" in part ? part.state : undefined,
    }));

  // #region agent log
  useEffect(() => {
    debugLog({
      runId: "pre-fix",
      hypothesisId: "A",
      location: "chat-app.tsx:state",
      message: "composer disabled state",
      data: {
        status,
        busy,
        inputLen: input.length,
        domLen: inputRef.current?.value.length ?? -1,
        sendDisabled,
        disableReasons: { busy, emptyInput: !input.trim() },
        messageCount: messages.length,
        lastRole: lastMessage?.role,
        lastToolParts,
        hasError: Boolean(error),
      },
    });
  }, [status, busy, input, sendDisabled, messages.length, lastMessage?.role, lastToolParts, error]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const onNative = () => {
      debugLog({
        runId: "pre-fix",
        hypothesisId: "E",
        location: "chat-app.tsx:nativeInput",
        message: "native input event",
        data: {
          nativeLen: el.value.length,
          reactLen: input.length,
          busy,
          inputDisabled: el.disabled,
        },
      });
    };
    el.addEventListener("input", onNative);
    return () => el.removeEventListener("input", onNative);
  }, [input, busy]);
  // #endregion

  function startWatchlist() {
    sendMessage({ text: KICKOFF });
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Watchlist maker</h1>
          <p className="text-sm text-muted-foreground">
            A conversation that learns your taste before it recommends anything.
          </p>
        </header>

        <div className="flex flex-1 flex-col gap-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-start justify-center gap-4 py-16">
              <p className="max-w-md text-muted-foreground">
                Start with films you love. Then a few this-or-that rounds. The
                list comes last.
              </p>
              <Button type="button" onClick={startWatchlist} disabled={busy}>
                Build my watchlist
              </Button>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                addToolOutput={addToolOutput}
              />
            ))
          )}

          {busy ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner />
              Thinking
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-destructive">
              {error.message || "The agent could not reply. Check AI_GATEWAY_API_KEY."}
            </p>
          ) : null}
        </div>

        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const domValue = inputRef.current?.value ?? "";
            const text = input.trim() || domValue.trim();
            // #region agent log
            debugLog({
              runId: "pre-fix",
              hypothesisId: "F",
              location: "chat-app.tsx:onSubmit",
              message: "composer submit",
              data: {
                reactLen: input.length,
                domLen: domValue.length,
                textLen: text.length,
                busy,
                willSend: Boolean(text) && !busy,
              },
            });
            // #endregion
            if (!text || busy) return;
            sendMessage({ text });
            setInput("");
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          <Input
            ref={inputRef}
            name="message"
            value={input}
            onInput={(event) => {
              const next = event.currentTarget.value;
              setInput(next);
              // #region agent log
              debugLog({
                runId: "pre-fix",
                hypothesisId: "B",
                location: "chat-app.tsx:onInput",
                message: "composer input event",
                data: { nextLen: next.length, status, busy },
              });
              // #endregion
            }}
            onChange={(event) => {
              const next = event.target.value;
              // #region agent log
              debugLog({
                runId: "pre-fix",
                hypothesisId: "B",
                location: "chat-app.tsx:onChange",
                message: "composer input changed",
                data: {
                  nextLen: next.length,
                  status,
                  busy,
                  inputDisabled: busy,
                },
              });
              // #endregion
              setInput(next);
            }}
            placeholder="Ask anything, or name a film you love…"
            disabled={busy}
            onFocus={() => {
              // #region agent log
              debugLog({
                runId: "pre-fix",
                hypothesisId: "C",
                location: "chat-app.tsx:onFocus",
                message: "composer focused",
                data: { status, busy, inputLen: input.length },
              });
              // #endregion
            }}
            onKeyDown={(event) => {
              // #region agent log
              debugLog({
                runId: "pre-fix",
                hypothesisId: "B",
                location: "chat-app.tsx:onKeyDown",
                message: "composer keydown",
                data: {
                  key: event.key,
                  status,
                  busy,
                  inputDisabled: busy,
                },
              });
              // #endregion
            }}
          />
          <Button type="submit" disabled={sendDisabled}>
            Send
          </Button>
        </form>
      </div>

      <aside className="w-full md:w-72">
        <TastePanel statement={tasteModel} />
      </aside>
    </div>
  );
}
