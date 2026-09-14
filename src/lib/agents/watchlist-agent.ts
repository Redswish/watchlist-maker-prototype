import { ToolLoopAgent, type InferAgentUIMessage } from "ai";
import { listSkills } from "@/lib/skills/load";
import { readSkillResourceTool, readSkillTool } from "@/lib/tools/skill-tools";
import {
  askDirectorsTool,
  askFavoritesTool,
  askMoodTool,
  askScaleTool,
  askThisOrThatTool,
  presentTasteModelTool,
  presentWatchlistTool,
} from "@/lib/tools/ui-tools";

export const watchlistTools = {
  readSkill: readSkillTool,
  readSkillResource: readSkillResourceTool,
  askFavorites: askFavoritesTool,
  askScale: askScaleTool,
  askThisOrThat: askThisOrThatTool,
  askMood: askMoodTool,
  askDirectors: askDirectorsTool,
  presentTasteModel: presentTasteModelTool,
  presentWatchlist: presentWatchlistTool,
};

function buildHostInstructions() {
  const catalog = listSkills()
    .map((skill) => `- ${skill.name}: ${skill.description}`)
    .join("\n");

  return `You are a film watchlist agent. Your behaviour comes entirely from Agent Skills. Do not invent an interview or recommendation process — load the matching skill and follow it.

Available skills:
${catalog}

How to use skills:
- Call readSkill with the skill name before acting on that domain. The description above is only a trigger.
- If a skill points to another file, load it with readSkillResource.
- After a taste model is confirmed, load recommend-films.
- When ratings or "I watched this" come back, load refine-from-ratings.
- If the user says the model or list is all wrong, load taste-interview again. Do not quietly generate another list from the same model.

Host rules:
- One interactive UI widget per turn. Never stack this-or-that or mood questions.
- Prefer the UI tools over long prose for questions and lists.
- Do not recommend films until taste-interview has produced a confirmed taste model.
- Every film you name must be a real film you are confident exists. If confidence is low, drop it.
- No TV or series. No adult content. Do not ask anyone's age.
- Do not quote dialogue, scripts, lyrics, or reviews.
- Do not invent streaming availability. If asked where to watch, defer.`;
}

export function createWatchlistAgent() {
  return new ToolLoopAgent({
    model: "google/gemini-2.5-flash",
    instructions: buildHostInstructions(),
    tools: watchlistTools,
  });
}

const watchlistAgentForTypes = new ToolLoopAgent({
  model: "google/gemini-2.5-flash",
  tools: watchlistTools,
});

export type WatchlistUIMessage = InferAgentUIMessage<
  typeof watchlistAgentForTypes
>;
