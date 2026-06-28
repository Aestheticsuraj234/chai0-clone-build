"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";
import { Streamdown } from "streamdown";

/**
 * Props for {@link Response}.
 *
 * @property className - Extra classes for the rendered markdown container.
 * @property children - The markdown string to render.
 */
type ResponseProps = {
  className?: string;
  children: string;
};

/**
 * Renders assistant/markdown text as formatted, streaming-friendly content.
 *
 * Wraps `Streamdown` (a streaming markdown renderer) and is memoized so it only
 * re-renders when its props change — important during token-by-token updates.
 *
 * @param props - See {@link ResponseProps}.
 */
export const Response = memo(function Response({
  className,
  children,
}: ResponseProps) {
  return (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
    >
      {children}
    </Streamdown>
  );
});
