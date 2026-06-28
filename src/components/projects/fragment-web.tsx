"use client";

import { useState } from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import type { ProjectFragment } from "@/features/projects/fragment-types";

/**
 * Live preview of a generated fragment running in its E2B sandbox.
 *
 * Embeds the sandbox URL in a sandboxed `<iframe>` and provides controls to
 * refresh the preview, copy the URL, and open it in a new tab.
 *
 * @param data - The fragment to preview (provides `sandboxUrl` and `title`).
 */
export default function FragmentWeb({ data }: { data: ProjectFragment }) {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);

  /**
   * Force the preview iframe to reload by changing its `key`.
   */
  function onRefresh() {
    setFragmentKey((prev) => prev + 1);
  }

  /**
   * Copy the sandbox URL to the clipboard and briefly show a "Copied" state.
   */
  function onCopy() {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-x-2 border-b bg-sidebar p-2">
        <Hint text="Refresh" side="bottom" align="start">
          <Button size="sm" variant="outline" onClick={onRefresh}>
            <RefreshCcw />
          </Button>
        </Hint>
        <Hint
          text={copied ? "Copied" : "Click to copy"}
          side="bottom"
          align="start"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={onCopy}
            disabled={!data.sandboxUrl || copied}
            className="flex-1 justify-start text-start font-normal"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>

        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
          >
            <ExternalLink />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
        title={data.title}
      />
    </div>
  );
}
