"use client";

import type { AskThisOrThatInvocation } from "@/lib/tools/ui-tools";
import { FilmTileCard } from "./film-tile";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function AskThisOrThatWidget({
  invocation,
  onSubmit,
}: {
  invocation: AskThisOrThatInvocation;
  onSubmit: (output: { choice: "left" | "right" }) => void;
}) {
  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Dealing a pair…" />;
  }

  if (invocation.state === "output-error") {
    return <WidgetError message={invocation.errorText} />;
  }

  if (
    invocation.state === "approval-requested" ||
    invocation.state === "approval-responded" ||
    invocation.state === "output-denied"
  ) {
    return null;
  }

  const prompt = invocation.input?.prompt ?? "Which one?";
  const left = invocation.input?.left;
  const right = invocation.input?.right;

  if (!left || !right) {
    return <WidgetPending label="Dealing a pair…" />;
  }

  const answered = invocation.state === "output-available";
  const choice = answered ? invocation.output.choice : undefined;

  return (
    <WidgetFrame title={prompt}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <FilmTileCard
          film={left}
          selected={choice === "left"}
          disabled={answered}
          onSelect={() => onSubmit({ choice: "left" })}
        />
        <FilmTileCard
          film={right}
          selected={choice === "right"}
          disabled={answered}
          onSelect={() => onSubmit({ choice: "right" })}
        />
      </div>
    </WidgetFrame>
  );
}
