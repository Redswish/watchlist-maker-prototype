import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LOG =
  "/Users/nathanbeck/Sites/agentic-prototypes/watchlist-maker-prototype/.cursor/debug-5f992b.log";

export async function POST(request: Request) {
  const payload = await request.json();
  await mkdir(path.dirname(LOG), { recursive: true });
  await appendFile(LOG, `${JSON.stringify(payload)}\n`);
  return new Response(null, { status: 204 });
}
