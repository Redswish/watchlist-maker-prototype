"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { PresentTasteModelInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function PresentTasteModelWidget({
  invocation,
  onSubmit,
}: {
  invocation: PresentTasteModelInvocation;
  onSubmit: (output: {
    action: "confirm" | "edit" | "reject";
    correction?: string;
  }) => void;
}) {
  const [correction, setCorrection] = useState("");
  const [editing, setEditing] = useState(false);

  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Writing your taste model…" />;
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

  const statement = invocation.input?.statement ?? "";

  if (invocation.state === "output-available") {
    const label =
      invocation.output.action === "confirm"
        ? "Confirmed"
        : invocation.output.action === "reject"
          ? "Rejected"
          : "Corrected";
    return (
      <WidgetFrame title="Taste model">
        <p>{invocation.output.correction || statement}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </WidgetFrame>
    );
  }

  return (
    <WidgetFrame title="Does this sound like you?">
      <p className="leading-relaxed">{statement}</p>
      {editing ? (
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="correction">What should it say?</FieldLabel>
            <Textarea
              id="correction"
              value={correction}
              onChange={(event) => setCorrection(event.target.value)}
            />
          </Field>
          <Button
            type="button"
            disabled={!correction.trim()}
            onClick={() =>
              onSubmit({ action: "edit", correction: correction.trim() })
            }
          >
            Save correction
          </Button>
        </FieldGroup>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => onSubmit({ action: "confirm" })}>
            That's me
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditing(true)}
          >
            Edit this
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onSubmit({ action: "reject" })}
          >
            These are all wrong
          </Button>
        </div>
      )}
    </WidgetFrame>
  );
}
