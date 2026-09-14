import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function WidgetFrame({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card size="sm" className="w-full">
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="flex flex-col gap-3">{children}</CardContent>
    </Card>
  );
}

export function WidgetPending({ label }: { label: string }) {
  return (
    <WidgetFrame>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Spinner />
        <span>{label}</span>
      </div>
    </WidgetFrame>
  );
}

export function WidgetError({ message }: { message: string }) {
  return (
    <WidgetFrame>
      <p className="text-destructive">{message}</p>
    </WidgetFrame>
  );
}
