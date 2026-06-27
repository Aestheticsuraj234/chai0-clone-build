"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ChevronDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import {
  getRandomPromptTemplate,
  promptTemplateCategories,
} from "@/components/home/prompt-templates";
import { useCreateProject } from "@/features/projects/hooks/projects";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  function handleSubmit() {
    createProject(prompt, {
      onSuccess: (project) => {
        router.push(`/projects/${project.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  }

  /**
   * Replace the textarea contents with a chosen template prompt.
   *
   * @param nextPrompt - The template prompt text to load into the input.
   */
  function applySuggestion(nextPrompt: string) {
    setPrompt(nextPrompt);
  }

  /**
   * Load a random template prompt into the input ("Random idea").
   */
  function shuffleSuggestions() {
    setPrompt(getRandomPromptTemplate().prompt);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <InputGroup className="h-auto min-h-32 flex-col rounded-2xl border-border/60 bg-card/50 shadow-sm backdrop-blur-sm has-[>textarea]:h-auto">
        <InputGroupTextarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask chai0 to build..."
          rows={4}
          // disabled={isPending}
          className="min-h-24 px-4 pt-4 text-sm"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
        <InputGroupAddon
          align="block-end"
          className="w-full justify-between border-t border-border/50 px-3 py-2"
        >
          <Button variant="outline" size="sm" className="rounded-full">
            <InputGroupText>chai0 Max</InputGroupText>
            <ChevronDown className="size-3 opacity-60" />
          </Button>
          <InputGroupButton
            size="icon-sm"
            variant="default"
            onClick={handleSubmit}
            disabled={!prompt.trim() || isPending}
            aria-label="Submit prompt"
          >
            {isPending ? <Spinner className="size-4" /> : <ArrowUp />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex w-full flex-col gap-5 text-left">
        {promptTemplateCategories.map((category) => (
          <div key={category.name} className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {category.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.templates.map(({ label, icon: Icon, prompt: templatePrompt }) => (
                <Button
                  key={label}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={isPending}
                  onClick={() => applySuggestion(templatePrompt)}
                >
                  <Icon />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full text-muted-foreground"
            disabled={isPending}
            onClick={shuffleSuggestions}
          >
            <RefreshCw />
            Random idea
          </Button>
        </div>
      </div>
    </div>
  );
}
