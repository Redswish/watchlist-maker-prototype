export type SkillFrontmatter = {
  name: string;
  description: string;
  license?: string;
  compatibility?: string;
  metadata?: Record<string, string>;
  "allowed-tools"?: string;
};

export type SkillSummary = {
  name: string;
  description: string;
};

export type Skill = SkillSummary & {
  directory: string;
  body: string;
  frontmatter: SkillFrontmatter;
};
