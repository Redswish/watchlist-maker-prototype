import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
      onChange={(event) => {
        // #region agent log
        fetch("/api/debug-log",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:"5f992b",runId:"pre-fix",hypothesisId:"B",location:"input.tsx:onChange",message:"Input primitive onChange",data:{nextLen:event.currentTarget.value.length,hasParentHandler:typeof props.onChange==="function"},timestamp:Date.now()})}).catch(()=>{});
        fetch("http://127.0.0.1:7778/ingest/190652c7-76b4-46ea-8888-883ea96cfef5",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"5f992b"},body:JSON.stringify({sessionId:"5f992b",runId:"pre-fix",hypothesisId:"B",location:"input.tsx:onChange",message:"Input primitive onChange",data:{nextLen:event.currentTarget.value.length,hasParentHandler:typeof props.onChange==="function"},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        props.onChange?.(event);
      }}
    />
  )
}

export { Input }
