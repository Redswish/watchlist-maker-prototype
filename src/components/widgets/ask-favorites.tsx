"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { AskFavoritesInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

export function AskFavoritesWidget({
  invocation,
  onSubmit,
}: {
  invocation: AskFavoritesInvocation;
  onSubmit: (output: { loved: string; bouncedOff: string }) => void;
}) {
  const [loved, setLoved] = useState("");
  const [bouncedOff, setBouncedOff] = useState("");

  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Preparing a question…" />;
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

  const prompt = invocation.input?.prompt ?? "What do you love, and what bounced off?";

  if (invocation.state === "output-available") {
    return (
      <WidgetFrame title={prompt}>
        <p className="text-sm">Loved: {invocation.output.loved || "—"}</p>
        <p className="text-sm text-muted-foreground">
          Bounced off: {invocation.output.bouncedOff || "—"}
        </p>
      </WidgetFrame>
    );
  }

  return (
    <WidgetFrame title={prompt}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="loved">Films you love</FieldLabel>
          <Textarea
            id="loved"
            value={loved}
            onChange={(event) => {
              const next = event.target.value;
              setLoved(next);
              // #region agent log
              fetch("/api/debug-log",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:"5f992b",runId:"pre-fix",hypothesisId:"D",location:"ask-favorites.tsx:loved",message:"widget loved changed",data:{nextLen:next.length,continueDisabled:!next.trim()},timestamp:Date.now()})}).catch(()=>{});
              // #endregion
            }}
            placeholder="All-time favourites, as messy as you like"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="bounced">Films you bounced off</FieldLabel>
          <Textarea
            id="bounced"
            value={bouncedOff}
            onChange={(event) => setBouncedOff(event.target.value)}
            placeholder="Ones that didn't land"
          />
        </Field>
      </FieldGroup>
      <Button
        type="button"
        disabled={!loved.trim()}
        onClick={() =>
          onSubmit({ loved: loved.trim(), bouncedOff: bouncedOff.trim() })
        }
      >
        Continue
      </Button>
    </WidgetFrame>
  );
}
