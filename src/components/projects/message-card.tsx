"use client";

import { Response } from "@/components/ai-elements/response";
import { Card } from "@/components/ui/card";
import {
  parseFragmentFiles,
  type ProjectFragment,
} from "@/features/projects/fragment-types";
import { cn } from "@/lib/utils";
import type { Fragment } from "@/generated/prisma/client";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { Chai0Mark } from "@/components/brand/chai0-logo";

/**
 * Clickable card representing a generated fragment inside an assistant message.
 *
 * Highlights itself when it is the active fragment and notifies the parent (with
 * the fragment's files parsed) when clicked.
 *
 * @param fragment - The fragment record to display.
 * @param isActiveFragment - Whether this fragment is currently selected.
 * @param onFragmentClick - Called with the parsed fragment when clicked.
 */
function FragmentCard({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-fit items-start gap-2 rounded-lg border bg-muted p-2 text-start transition-colors hover:bg-secondary",
        isActiveFragment &&
          "border-primary bg-primary text-primary-foreground hover:bg-primary"
      )}
      onClick={() =>
        onFragmentClick({
          ...fragment,
          files: parseFragmentFiles(fragment.files),
        })
      }
    >
      <Code2Icon className="mt-0.5 size-4" />
      <div className="flex flex-1 flex-col">
        <span className="line-clamp-1 text-sm font-medium">{fragment.title}</span>
        <span className="text-sm">Preview</span>
      </div>
      <ChevronRightIcon className="mt-0.5 size-4" />
    </button>
  );
}

/**
 * A message bubble for content authored by the user (right-aligned).
 *
 * @param content - The user's message text.
 */
function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end pb-4 pl-10 pr-2">
      <Card className="max-w-[80%] break-words rounded-lg border-none bg-muted p-2 shadow-none">
        {content}
      </Card>
    </div>
  );
}

/**
 * A message rendered by the assistant.
 *
 * Shows the chai0 mark, a hover-revealed timestamp, the markdown response, and —
 * for successful results — a {@link FragmentCard} linking to the generated app.
 * Error-type messages are styled in red.
 *
 * @param content - The assistant's message text (markdown).
 * @param fragment - Associated fragment, or `null` if none.
 * @param createdAt - When the message was created.
 * @param isActiveFragment - Whether this message's fragment is selected.
 * @param onFragmentClick - Called when the fragment card is clicked.
 * @param type - The message type (e.g. RESULT or ERROR).
 */
function AssistantMessage({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col px-2 pb-4",
        type === MessageType.ERROR && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="mb-2 flex items-center gap-2 pl-2">
        <Chai0Mark className="h-7 w-auto shrink-0" />
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(new Date(createdAt), "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>

      <div className="flex flex-col gap-y-4 pl-8.5">
        <Response>{content}</Response>
        {fragment && type === MessageType.RESULT && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Renders a single chat message, dispatching to the assistant or user variant
 * based on `role`.
 *
 * @param content - The message text.
 * @param role - Who authored the message (USER or ASSISTANT).
 * @param fragment - Associated fragment, or `null`.
 * @param createdAt - When the message was created.
 * @param isActiveFragment - Whether this message's fragment is selected.
 * @param onFragmentClick - Called when the fragment card is clicked.
 * @param type - The message type (e.g. RESULT or ERROR).
 */
export default function MessageCard({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}) {
  if (role === MessageRole.ASSISTANT) {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }

  return (
    <div className="mt-5">
      <UserMessage content={content} />
    </div>
  );
}
