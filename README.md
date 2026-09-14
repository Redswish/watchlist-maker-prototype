# Watchlist maker

A local Next.js chat prototype. The agent’s interview, recommendations, and refinement behaviour live in [Agent Skills](https://agentskills.io/specification) under `skills/`. Editing a `SKILL.md` changes what it asks and how it recommends — no TypeScript changes required.

## Run locally

```bash
cp .env.example .env.local
# add an AI_GATEWAY_API_KEY from https://vercel.com/ai-gateway
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Build my watchlist**.

## Skills

| Skill | When it loads |
| --- | --- |
| `skills/taste-interview` | Cold start, or when the model is rejected |
| `skills/recommend-films` | After the taste model is confirmed |
| `skills/refine-from-ratings` | After ticks, ratings, or “I watched this” |

This-or-that pairs live in `skills/taste-interview/SKILL.md`. Rewrite them there to change the questions.
