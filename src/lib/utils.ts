import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A node in a file tree: either a file name (string) or a folder represented as
 * `[folderName, ...children]`.
 *
 * Folders are tuples where the first element is the folder name and the rest
 * are child {@link TreeItem}s. Files are plain strings (file names only, not
 * full paths).
 *
 * @example
 *  Single file at the root
 * "README.md"
 *
 * @example
 *  Folder with nested files and subfolders
 * [
 *   "src",
 *   ["components", "Button.tsx", "Card.tsx"],
 *   "index.ts",
 * ]
 *  Represents:
 *  src/
 *    components/
 *      Button.tsx
 *      Card.tsx
 *    index.ts
 *
 * @example
 * Full tree returned by {@link convertFilesToTreeItems}
 * [
 *   ["src", ["components", "Button.tsx"], "index.ts"],
 *   "README.md",
 *   "package.json",
 * ]
 */
export type TreeItem = string | [string, ...TreeItem[]];

/**
 * Intermediate nested representation while building the tree. A `null` value
 * marks a file (leaf); a nested object marks a folder.
 *
 * This shape is internal to {@link convertFilesToTreeItems} and is converted
 * into {@link TreeItem}s before returning.
 *
 * @example
 *  Built from paths: "src/index.ts", "README.md"
 * {
 *   src: { "index.ts": null },
 *   "README.md": null,
 * }
 *
 * @example
 * Built from paths: "src/components/Button.tsx", "package.json"
 * {
 *   src: {
 *     components: { "Button.tsx": null },
 *   },
 *   "package.json": null,
 * }
 */
interface TreeNode {
  [key: string]: TreeNode | null;
}

/**
 * Convert a flat map of file paths to a nested tree structure for the TreeView.
 *
 * Folders are sorted before files at each level and paths are processed in
 * sorted order for stable output.
 *
 * @param files - Map of file path (e.g. `"src/Button.tsx"`) to its contents.
 * @returns A list of {@link TreeItem}s representing the folder/file hierarchy.
 *   Folders appear before files at each level.
 *
 * @example
 *  Input
 * {
 *   "README.md": "# Hello",
 *   "package.json": "{}",
 *   "src/index.ts": "export {}",
 *   "src/components/Button.tsx": "export function Button() {}",
 *   "src/components/Card.tsx": "export function Card() {}",
 * }
 *
 * Output
 * [
 *   ["src", ["components", "Button.tsx", "Card.tsx"], "index.ts"],
 *   "README.md",
 *   "package.json",
 * ]
 *
 * @example
 *  Flat project (no folders)
 * convertFilesToTreeItems({ "index.html": "<html>", "style.css": "body {}" })
 * => ["index.html", "style.css"]
 */
export function convertFilesToTreeItems(files: Record<string, string>): TreeItem[] {
  const tree: TreeNode = {};
  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split("/");
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as TreeNode;
    }

    const fileName = parts[parts.length - 1];
    current[fileName] = null;
  }

  /**
   * Recursively convert a {@link TreeNode} into ordered {@link TreeItem}s,
   * listing folders before files.
   *
   * @example
   * // Input node
   * { src: { components: { "Button.tsx": null }, "index.ts": null }, "README.md": null }
   *
   * // Output items
   * [["src", ["components", "Button.tsx"], "index.ts"], "README.md"]
   */
  function buildChildren(node: TreeNode): TreeItem[] {
    const folders: TreeItem[] = [];
    const leaves: TreeItem[] = [];

    for (const [key, value] of Object.entries(node)) {
      if (value === null) {
        // File (leaf node)
        leaves.push(key);
      } else {
        // Folder: [name, ...children]
        folders.push([key, ...buildChildren(value)]);
      }
    }

    // Show folders before files
    return [...folders, ...leaves];
  }

  return buildChildren(tree);
}
