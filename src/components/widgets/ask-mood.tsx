"use client";

import { Button } from "@/components/ui/button";
import type { AskMoodInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function AskMoodWidget({
  invocation,
  onSubmit,
}: {
  invocation: AskMoodInvocation;
  onSubmit: (output: { choice: "left" | "right" }) => void;
}) {
  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Next trade-off…" />;
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

  const prompt = invocation.input?.prompt ?? "What are you in the mood for?";
  const left = invocation.input?.left ?? "";
  const right = invocation.input?.right ?? "";
  const answered = invocation.state === "output-available";
  const choice = answered ? invocation.output.choice : undefined;

  return (
    <WidgetFrame title={prompt}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant={choice === "left" ? "default" : "outline"}
          className="flex-1"
          disabled={answered}
          onClick={() => onSubmit({ choice: "left" })}
        >
          {left}
        </Button>
        <Button
          type="button"
          variant={choice === "right" ? "default" : "outline"}
          className="flex-1"
          disabled={answered}
          onClick={() => onSubmit({ choice: "right" })}
        >
          {right}
        </Button>
      </div>
    </WidgetFrame>
  );
}
