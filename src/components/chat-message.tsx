"use client";

import type { ChatAddToolOutputFunction } from "ai";
import type { WatchlistUIMessage } from "@/lib/agents/watchlist-agent";
import { AskDirectorsWidget } from "@/components/widgets/ask-directors";
import { AskFavoritesWidget } from "@/components/widgets/ask-favorites";
import { AskMoodWidget } from "@/components/widgets/ask-mood";
import { AskScaleWidget } from "@/components/widgets/ask-scale";
import { AskThisOrThatWidget } from "@/components/widgets/ask-this-or-that";
import { PresentTasteModelWidget } from "@/components/widgets/present-taste-model";
import { PresentWatchlistWidget } from "@/components/widgets/present-watchlist";

export function ChatMessage({
  message,
  addToolOutput,
}: {
  message: WatchlistUIMessage;
  addToolOutput: ChatAddToolOutputFunction<WatchlistUIMessage>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {message.role === "user" ? (
        <p className="text-sm text-muted-foreground">You</p>
      ) : null}
      {message.parts.map((part, index) => {
        const key = `${message.id}-${index}`;

        if (part.type === "text" && part.text.trim()) {
          return (
            <p key={key} className="whitespace-pre-wrap leading-relaxed">
              {part.text}
            </p>
          );
        }

        if (part.type === "tool-readSkill" || part.type === "tool-readSkillResource") {
          return null;
        }

        if (part.type === "tool-askFavorites") {
          return (
            <AskFavoritesWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "askFavorites",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-askScale") {
          return (
            <AskScaleWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "askScale",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-askThisOrThat") {
          return (
            <AskThisOrThatWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "askThisOrThat",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-askMood") {
          return (
            <AskMoodWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "askMood",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-askDirectors") {
          return (
            <AskDirectorsWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "askDirectors",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-presentTasteModel") {
          return (
            <PresentTasteModelWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "presentTasteModel",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        if (part.type === "tool-presentWatchlist") {
          return (
            <PresentWatchlistWidget
              key={part.toolCallId}
              invocation={part}
              onSubmit={(output) =>
                addToolOutput({
                  tool: "presentWatchlist",
                  toolCallId: part.toolCallId,
                  output,
                })
              }
            />
          );
        }

        return null;
      })}
    </div>
  );
}
