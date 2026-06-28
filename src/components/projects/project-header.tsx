"use client";

import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Chai0Mark } from "@/components/brand/chai0-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectById } from "@/features/projects/hooks/projects";

/**
 * Turn a kebab-case project slug into a human-friendly, spaced name.
 *
 * @param name - The raw project name (e.g. `"sunny-otter"`).
 * @returns The same name with hyphens replaced by spaces.
 */
function formatProjectName(name: string) {
  return name.replace(/-/g, " ");
}

/**
 * Header bar for the project workspace.
 *
 * Shows the project name (loading spinner while fetching) inside a dropdown that
 * offers navigation back to the dashboard and a light/dark/system theme picker.
 *
 * @param projectId - The project whose name/menu is rendered.
 */
export default function ProjectHeader({ projectId }: { projectId: string }) {
  const { data: project, isPending } = useGetProjectById(projectId);
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="!pl-2 transition-opacity hover:bg-transparent hover:opacity-75 focus-visible:ring-0"
          >
            <Chai0Mark className="h-7 w-auto shrink-0" />
            <span className="text-sm font-medium capitalize">
              {isPending ? (
                <Spinner />
              ) : (
                formatProjectName(project?.name || "Untitled Project")
              )}
            </span>
            <ChevronDownIcon className="ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem asChild>
            <Link href="/">
              <ChevronLeftIcon className="size-4" />
              <span>Go to Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={5}>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
