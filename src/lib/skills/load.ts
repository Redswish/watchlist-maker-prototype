import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Skill, SkillFrontmatter, SkillSummary } from "./types";

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function skillsRoot() {
  return path.join(process.cwd(), "skills");
}

function assertSkillName(name: string, directoryName: string) {
  if (name.length < 1 || name.length > 64) {
    throw new Error(`Invalid skill name length: ${name}`);
  }
  if (!SKILL_NAME.test(name)) {
    throw new Error(`Invalid skill name: ${name}`);
  }
  if (name !== directoryName) {
    throw new Error(
      `Skill name "${name}" must match directory "${directoryName}"`,
    );
  }
}

function parseSkillFile(directory: string, filePath: string): Skill {
  const raw = readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as SkillFrontmatter;
  const directoryName = path.basename(directory);

  if (!data.name || !data.description) {
    throw new Error(`SKILL.md in ${directoryName} needs name and description`);
  }

  assertSkillName(data.name, directoryName);

  if (data.description.length > 1024) {
    throw new Error(`Skill description too long: ${data.name}`);
  }

  return {
    name: data.name,
    description: data.description,
    directory,
    body: parsed.content.trim(),
    frontmatter: data,
  };
}

export function listSkills(): SkillSummary[] {
  const root = skillsRoot();
  return readdirSync(root)
    .map((entry) => path.join(root, entry))
    .filter((dir) => statSync(dir).isDirectory())
    .map((dir) => parseSkillFile(dir, path.join(dir, "SKILL.md")))
    .map(({ name, description }) => ({ name, description }));
}

export function loadSkill(name: string): Skill {
  const directory = path.join(skillsRoot(), name);
  return parseSkillFile(directory, path.join(directory, "SKILL.md"));
}

export function readSkillResource(name: string, relativePath: string): string {
  if (!relativePath || path.isAbsolute(relativePath)) {
    throw new Error("Resource path must be a relative path inside the skill");
  }

  const skillDir = path.join(skillsRoot(), name);
  const resolved = path.resolve(skillDir, relativePath);
  const rootWithSep = skillDir.endsWith(path.sep) ? skillDir : `${skillDir}${path.sep}`;

  if (resolved !== skillDir && !resolved.startsWith(rootWithSep)) {
    throw new Error("Resource path escapes the skill directory");
  }

  if (!existsSync(resolved) || !statSync(resolved).isFile()) {
    throw new Error(`No file at ${relativePath} in skill ${name}`);
  }

  return readFileSync(resolved, "utf8");
}
