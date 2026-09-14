"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { AskScaleInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function AskScaleWidget({
  invocation,
  onSubmit,
}: {
  invocation: AskScaleInvocation;
  onSubmit: (output: { scores: { id: string; score: number }[] }) => void;
}) {
  const scales = invocation.input?.scales ?? [];
  const [scores, setScores] = useState<Record<string, number>>({});

  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Setting up the sliders…" />;
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

  const prompt = invocation.input?.prompt ?? "Where do you sit?";

  if (invocation.state === "output-available") {
    return (
      <WidgetFrame title={prompt}>
        {invocation.output.scores.map((score) => {
          const scale = scales.find((item) => item?.id === score.id);
          return (
            <p key={score.id} className="text-sm">
              {scale?.leftLabel ?? score.id} {score.score}/10{" "}
              {scale?.rightLabel}
            </p>
          );
        })}
      </WidgetFrame>
    );
  }

  return (
    <WidgetFrame title={prompt}>
      <div className="flex flex-col gap-5">
        {scales.map((scale) => {
          if (!scale?.id) return null;
          const scaleId = scale.id;
          const value = scores[scaleId] ?? 5;
          return (
            <div key={scaleId} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span>{scale.leftLabel}</span>
                <span className="text-muted-foreground">{value}</span>
                <span>{scale.rightLabel}</span>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[value]}
                onValueChange={([next]) =>
                  setScores((current) => ({
                    ...current,
                    [scaleId]: next ?? 5,
                  }))
                }
              />
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        onClick={() =>
          onSubmit({
            scores: scales
              .filter((scale): scale is { id: string; leftLabel: string; rightLabel: string } =>
                Boolean(scale?.id),
              )
              .map((scale) => ({
                id: scale.id,
                score: scores[scale.id] ?? 5,
              })),
          })
        }
      >
        Continue
      </Button>
    </WidgetFrame>
  );
}
