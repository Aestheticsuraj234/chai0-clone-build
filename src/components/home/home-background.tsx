import { cn } from "@/lib/utils";

export function HomeBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-background" />

      <div
        className="absolute inset-0 opacity-40 dark:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      <div className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
      <div className="absolute top-1/3 -left-24 size-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
      <div className="absolute bottom-0 right-0 size-96 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
