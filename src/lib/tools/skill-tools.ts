import { tool } from "ai";
import { z } from "zod";
import { loadSkill, readSkillResource } from "@/lib/skills/load";

export const readSkillTool = tool({
  description:
    "Load the full instructions for a skill by name. Call this before acting on that skill's domain.",
  inputSchema: z.object({
    name: z.string().describe("Skill directory name, e.g. taste-interview"),
  }),
  execute: async ({ name }) => {
    const skill = loadSkill(name);
    return {
      name: skill.name,
      description: skill.description,
      body: skill.body,
    };
  },
});

export const readSkillResourceTool = tool({
  description:
    "Read a file referenced from a skill (for example references/pairs.md). Path is relative to the skill directory.",
  inputSchema: z.object({
    skill: z.string().describe("Skill name"),
    path: z
      .string()
      .describe("Relative path from the skill root, e.g. references/notes.md"),
  }),
  execute: async ({ skill, path: relativePath }) => {
    try {
      return {
        skill,
        path: relativePath,
        content: readSkillResource(skill, relativePath),
      };
    } catch (error) {
      return {
        skill,
        path: relativePath,
        error: error instanceof Error ? error.message : "Could not read file",
      };
    }
  },
});
