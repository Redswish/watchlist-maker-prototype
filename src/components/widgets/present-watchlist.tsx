"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PresentWatchlistInvocation } from "@/lib/tools/ui-tools";
import { WidgetError, WidgetFrame, WidgetPending } from "./widget-frame";

type RatingState = Record<string, { seen: boolean; rating?: number }>;

export function PresentWatchlistWidget({
  invocation,
  onSubmit,
}: {
  invocation: PresentWatchlistInvocation;
  onSubmit: (output: {
    action: "rate" | "refresh";
    ratings?: { id: string; seen: boolean; rating?: number }[];
  }) => void;
}) {
  const [ratings, setRatings] = useState<RatingState>({});

  if (invocation.state === "input-streaming") {
    return <WidgetPending label="Building your watchlist…" />;
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

  const groups = invocation.input?.groups ?? [];
  const closingModel = invocation.input?.closingModel ?? "";
  const answered = invocation.state === "output-available";
  const ratedCount = Object.values(ratings).filter(
    (item) => item.seen && item.rating,
  ).length;

  return (
    <WidgetFrame>
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.id} className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              {group.label}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.films.map((film) => {
                const current = ratings[film.id];
                return (
                  <div
                    key={film.id}
                    className="flex flex-col gap-3 rounded-xl border border-border p-4"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{film.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {film.year} · {film.director}
                      </p>
                    </div>
                    <p>{film.what}</p>
                    <p className="text-muted-foreground">{film.why}</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={current?.seen ? "default" : "outline"}
                        disabled={answered}
                        onClick={() =>
                          setRatings((state) => ({
                            ...state,
                            [film.id]: {
                              seen: !state[film.id]?.seen,
                              rating: state[film.id]?.seen
                                ? undefined
                                : state[film.id]?.rating,
                            },
                          }))
                        }
                      >
                        {current?.seen ? "Seen" : "Tick if you've seen it"}
                      </Button>
                      {current?.seen ? (
                        <div className="flex flex-wrap items-center gap-1">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <Button
                              key={score}
                              type="button"
                              size="icon-sm"
                              variant={
                                current.rating === score ? "default" : "outline"
                              }
                              disabled={answered}
                              onClick={() =>
                                setRatings((state) => ({
                                  ...state,
                                  [film.id]: { seen: true, rating: score },
                                }))
                              }
                            >
                              {score}
                            </Button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {closingModel ? (
        <p className="text-sm leading-relaxed">{closingModel}</p>
      ) : null}
      {answered ? (
        <Badge variant="secondary">List sent back</Badge>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={() =>
              onSubmit({
                action: "refresh",
                ratings: Object.entries(ratings).map(([id, value]) => ({
                  id,
                  seen: value.seen,
                  rating: value.rating,
                })),
              })
            }
          >
            Refresh list
          </Button>
          {ratedCount >= 3 ? (
            <span className="text-sm text-muted-foreground">
              {ratedCount} rated — the next list should shift
            </span>
          ) : null}
        </div>
      )}
    </WidgetFrame>
  );
}
