import { tool, type UIToolInvocation } from "ai";
import {
  askDirectorsInputSchema,
  askDirectorsOutputSchema,
  askFavoritesInputSchema,
  askFavoritesOutputSchema,
  askMoodInputSchema,
  askMoodOutputSchema,
  askScaleInputSchema,
  askScaleOutputSchema,
  askThisOrThatInputSchema,
  askThisOrThatOutputSchema,
  presentTasteModelInputSchema,
  presentTasteModelOutputSchema,
  presentWatchlistInputSchema,
  presentWatchlistOutputSchema,
} from "./schemas";

export const askFavoritesTool = tool({
  description:
    "Ask for all-time favourite films and films they bounced off. One widget. Wait for the user.",
  inputSchema: askFavoritesInputSchema,
  outputSchema: askFavoritesOutputSchema,
});

export const askScaleTool = tool({
  description:
    "Ask graded 1–10 questions as sliders. One widget per turn. Wait for the user.",
  inputSchema: askScaleInputSchema,
  outputSchema: askScaleOutputSchema,
});

export const askThisOrThatTool = tool({
  description:
    "Show two real film tiles and ask which they prefer. One pair per turn. Wait for the user.",
  inputSchema: askThisOrThatInputSchema,
  outputSchema: askThisOrThatOutputSchema,
});

export const askMoodTool = tool({
  description:
    "Ask a current-mood trade-off as two poles. One trade-off per turn. Wait for the user.",
  inputSchema: askMoodInputSchema,
  outputSchema: askMoodOutputSchema,
});

export const askDirectorsTool = tool({
  description:
    "Ask more-or-less for a short list of directors, each with example films. One widget. Wait for the user.",
  inputSchema: askDirectorsInputSchema,
  outputSchema: askDirectorsOutputSchema,
});

export const presentTasteModelTool = tool({
  description:
    "Render the taste model as a correctable statement. Wait for confirm, edit, or reject.",
  inputSchema: presentTasteModelInputSchema,
  outputSchema: presentTasteModelOutputSchema,
});

export const presentWatchlistTool = tool({
  description:
    "Render a grouped watchlist the user can tick, rate 1–5, and refresh. Wait for the user.",
  inputSchema: presentWatchlistInputSchema,
  outputSchema: presentWatchlistOutputSchema,
});

export type AskFavoritesInvocation = UIToolInvocation<typeof askFavoritesTool>;
export type AskScaleInvocation = UIToolInvocation<typeof askScaleTool>;
export type AskThisOrThatInvocation = UIToolInvocation<
  typeof askThisOrThatTool
>;
export type AskMoodInvocation = UIToolInvocation<typeof askMoodTool>;
export type AskDirectorsInvocation = UIToolInvocation<typeof askDirectorsTool>;
export type PresentTasteModelInvocation = UIToolInvocation<
  typeof presentTasteModelTool
>;
export type PresentWatchlistInvocation = UIToolInvocation<
  typeof presentWatchlistTool
>;
