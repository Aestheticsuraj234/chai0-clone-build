import { Fragment } from "@/generated/prisma/client";

export type ProjectFragment = Fragment & {
    files: Record<string, string>;
  };

export function parseFragmentFiles(files: Fragment["files"]): Record<string, string> {
    if (!files || typeof files !== "object" || Array.isArray(files)) {
      return {};
    }
  
    return files as Record<string, string>;
  }
  