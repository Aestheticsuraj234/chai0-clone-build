"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjects } from "@/features/projects/hooks/projects";
import { getProjectThumbnailUrl } from "../lib";
import { cn } from "@/lib/utils";

function ProjectCardSkeleton() {
    return (
      <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm">
        <Skeleton className="aspect-square w-full rounded-none" />
        <CardHeader className="px-4 pb-4">
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
      </Card>
    );
  }

function formatProjectName(name: string) {
    return name.replace(/-/g, " ");
  }

export function ProjectGrid() {
    const { data: projects, isLoading, isError } = useGetProjects();
  
    if (isError) {
      return null;
    }
  
    if (!isLoading && (!projects || projects.length === 0)) {
      return null;
    }
  
    return (
      <section className="w-full">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Your projects
        </h2>
  
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            : projects?.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group block"
                >
                  <Card
                    className={cn(
                      "overflow-hidden rounded-2xl border-border/60 bg-card/50 py-0 shadow-sm backdrop-blur-sm",
                      "transition-colors hover:border-border hover:bg-card/80",
                    )}
                  >
                    <img
                      src={getProjectThumbnailUrl(project.id)}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    <CardHeader className="px-4 pb-4">
                      <CardTitle className="truncate capitalize">
                        {formatProjectName(project.name)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
        </div>
      </section>
    );
  }
  