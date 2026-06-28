"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  parseFragmentFiles,
  type ProjectFragment,
} from "@/features/projects/fragment-types";
import {
  prefetchMessages,
  useGetMessages,
} from "@/features/messages/hooks/messages";
import { MessageRole } from "@/generated/prisma/enums";
import MessageCard from "./message-card";
import MessageForm from "./message-form";
import MessageLoading from "./message-loader";

/**
 * Scrollable list of a project's messages plus the composer.
 *
 * Loads (and polls) messages, prefetches them on mount, auto-selects the latest
 * assistant fragment, auto-scrolls to the newest message, and shows a loading
 * indicator while the assistant is responding to the last user message. Handles
 * loading, error, and empty states.
 *
 * @param projectId - The project whose conversation is shown.
 * @param activeFragment - The currently selected fragment (for preview/code).
 * @param setActiveFragment - Setter to change the active fragment.
 */
export default function MessageContainer({
  projectId,
  activeFragment,
  setActiveFragment,
}: {
  projectId: string;
  activeFragment: ProjectFragment | null;
  setActiveFragment: (fragment: ProjectFragment | null) => void;
}) {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);

  const {
    data: messages,
    isPending,
    isError,
    error,
  } = useGetMessages(projectId);

  useEffect(() => {
    if (projectId) {
      void prefetchMessages(queryClient, projectId);
    }
  }, [projectId, queryClient]);

  useEffect(() => {
    const lastAssistantMessage = messages?.findLast(
      (message) => message.role === MessageRole.ASSISTANT
    );

    if (
      lastAssistantMessage?.fragments &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment({
        ...lastAssistantMessage.fragments,
        files: parseFragmentFiles(lastAssistantMessage.fragments.files),
      });
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Error: {error?.message || "Failed to load messages"}
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No messages yet. Start a conversation!
        </div>
        <div className="relative p-3 pt-1">
          <div className="pointer-events-none absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background" />
          <MessageForm projectId={projectId} />
        </div>
      </div>
    );
  }

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage.role === MessageRole.USER;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            content={message.content}
            role={message.role}
            fragment={message.fragments}
            createdAt={message.createdAt}
            isActiveFragment={activeFragment?.id === message.fragments?.id}
            onFragmentClick={setActiveFragment}
            type={message.type}
          />
        ))}
        {isLastMessageUser && <MessageLoading />}
        <div ref={bottomRef} />
      </div>

      <div className="relative p-2 pt-1">
        <div className="pointer-events-none absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
}
