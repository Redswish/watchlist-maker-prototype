"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AskDirectorsInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function AskDirectorsWidget({
  invocation,
  onSubmit,
}: {
  invocation: AskDirectorsInvocation;
  onSubmit: (output: {
    preferences: { name: string; preference: "more" | "less" }[];
  }) => void;
}) {
  const directors = invocation.input?.directors ?? [];
  const [preferences, setPreferences] = useState<
    Record<string, "more" | "less">
  >({});

  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Choosing directors…" />;
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

  const prompt =
    invocation.input?.prompt ?? "More of these directors, or less?";

  if (invocation.state === "output-available") {
    return (
      <WidgetFrame title={prompt}>
        {invocation.output.preferences.map((item) => (
          <p key={item.name} className="text-sm">
            {item.name}: {item.preference}
          </p>
        ))}
      </WidgetFrame>
    );
  }

  return (
    <WidgetFrame title={prompt}>
      <div className="flex flex-col gap-4">
        {directors.map((director) => {
          if (!director?.name) return null;
          const name = director.name;
          return (
          <div key={name} className="flex flex-col gap-2">
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">
                {(director.exampleFilms ?? []).join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={
                  preferences[name] === "more" ? "default" : "outline"
                }
                onClick={() =>
                  setPreferences((current) => ({
                    ...current,
                    [name]: "more",
                  }))
                }
              >
                More
              </Button>
              <Button
                type="button"
                size="sm"
                variant={
                  preferences[name] === "less" ? "default" : "outline"
                }
                onClick={() =>
                  setPreferences((current) => ({
                    ...current,
                    [name]: "less",
                  }))
                }
              >
                Less
              </Button>
            </div>
          </div>
          );
        })}
      </div>
      <Button
        type="button"
        disabled={directors.some(
          (director) => !director?.name || !preferences[director.name],
        )}
        onClick={() =>
          onSubmit({
            preferences: directors
              .filter((director): director is { name: string; exampleFilms: string[] } =>
                Boolean(director?.name),
              )
              .map((director) => ({
                name: director.name,
                preference: preferences[director.name] ?? "more",
              })),
          })
        }
      >
        Continue
      </Button>
    </WidgetFrame>
  );
}
