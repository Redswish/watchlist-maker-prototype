import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FilmTile } from "@/lib/tools/schemas";

export function FilmTileCard({
  film,
  selected,
  disabled,
  onSelect,
}: {
  film: FilmTile;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  const meta = [film.year, film.director].filter(Boolean).join(" · ");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex min-h-28 flex-1 flex-col items-start justify-between gap-3 rounded-xl border bg-card p-4 text-left transition-colors",
        selected
          ? "border-foreground"
          : "border-border hover:bg-muted/50",
        disabled && "cursor-default",
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium leading-snug">{film.title}</span>
        {meta ? (
          <span className="text-sm text-muted-foreground">{meta}</span>
        ) : null}
      </div>
      {selected ? <Badge variant="secondary">Chosen</Badge> : null}
    </button>
  );
}
