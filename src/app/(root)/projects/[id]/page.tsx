import { ProjectView } from '@/components/projects/project-view';
import React from 'react'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectView projectId={id} />;
}