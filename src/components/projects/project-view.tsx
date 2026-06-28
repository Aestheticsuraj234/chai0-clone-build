"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fragment } from "@/generated/prisma/client";
import ProjectHeader from "./project-header";
import MessageContainer from "./message-container";
import FragmentWeb from "./fragment-web";
import { FileExplorer } from "./file-explorer";

export type ProjectFragment = Fragment & {
    files: Record<string, string>;
  };

export function ProjectView({ projectId }: { projectId: string }) {
    const [activeFragment, setActiveFragment] = useState<ProjectFragment | null>(
      null
    );
    const [tabState, setTabState] = useState<"preview" | "code">("preview");
  
    return (
      <div className="h-screen">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            defaultSize={28}
            minSize={20}
            className="flex min-h-0 flex-col"
          >
            <ProjectHeader projectId={projectId} />
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
            
          </ResizablePanel>
  
          <ResizableHandle withHandle />
  
          <ResizablePanel defaultSize={72} minSize={45} className="min-w-0">
            <Tabs
              className="flex h-full flex-col"
              defaultValue="preview"
              value={tabState}
              onValueChange={(value) => setTabState(value as "preview" | "code")}
            >
              <div className="flex w-full items-center gap-x-2 border-b p-2">
                <TabsList className="h-8 rounded-md border p-0">
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-x-2 rounded-md px-3"
                  >
                    <EyeIcon className="size-4" />
                    <span>Demo</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="flex items-center gap-x-2 rounded-md px-3"
                  >
                    <Code className="size-4" />
                    <span>Code</span>
                  </TabsTrigger>
                </TabsList>
  
                <div className="ml-auto flex items-center gap-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/">
                      <CrownIcon className="mr-2 size-4" />
                      Upgrade
                    </Link>
                  </Button>
                </div>
              </div>
  
              <TabsContent
                value="preview"
                className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
              >
                {activeFragment ? (
                  <FragmentWeb data={activeFragment} />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Select a fragment to preview
                  </div>
                )}
              </TabsContent>
  
              <TabsContent
                value="code"
                className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
              >
                {activeFragment?.files &&
                Object.keys(activeFragment.files).length > 0 ? (
                  <FileExplorer files={activeFragment.files} />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Select a fragment to view code
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }