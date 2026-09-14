import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TastePanel({ statement }: { statement: string | null }) {
  return (
    <Card size="sm" className="sticky top-6">
      <CardHeader>
        <CardTitle>Taste model</CardTitle>
      </CardHeader>
      <CardContent>
        {statement ? (
          <p className="leading-relaxed">{statement}</p>
        ) : (
          <p className="text-muted-foreground">
            This stays on screen once the interview has a sentence about your
            taste.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
