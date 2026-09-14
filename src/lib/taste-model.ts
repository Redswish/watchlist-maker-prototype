import type { WatchlistUIMessage } from "@/lib/agents/watchlist-agent";

export function latestTasteModel(messages: WatchlistUIMessage[]) {
  let statement: string | null = null;

  for (const message of messages) {
    for (const part of message.parts) {
      if (part.type === "tool-presentTasteModel" && part.input?.statement) {
        statement =
          part.state === "output-available" &&
          part.output.action === "edit" &&
          part.output.correction
            ? part.output.correction
            : part.input.statement;
      }

      if (
        part.type === "tool-presentWatchlist" &&
        part.input?.closingModel
      ) {
        statement = part.input.closingModel;
      }
    }
  }

  return statement;
}
