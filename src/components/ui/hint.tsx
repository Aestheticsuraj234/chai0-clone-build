"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Props for {@link Hint}.
 *
 * @property children - The trigger element the tooltip is attached to.
 * @property text - The tooltip text to display.
 * @property side - Which side of the trigger the tooltip appears on.
 * @property align - Alignment of the tooltip relative to the trigger.
 */
type HintProps = {
  children: React.ReactNode;
  text: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

/**
 * Convenience wrapper that shows a tooltip with `text` when hovering its child.
 *
 * Bundles the Radix tooltip provider/trigger/content into a single component so
 * callers only need to supply a trigger and the hint text.
 *
 * @param props - See {@link HintProps}.
 */
export function Hint({ children, text, side = "top", align = "center" }: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
