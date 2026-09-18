import type { Metadata } from "next";
import { ProjectDetails } from "@/components/projects/ProjectDetails";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const path = `/projects/${encodeURIComponent(id)}`;
  return {
    title: "Project Details",
    description: "Explore project photos, videos and installation details from Tasneem Knit Industry.",
    alternates: {
      canonical: path,
      languages: { en: `/en${path}`, bn: `/bn${path}`, "x-default": path },
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetails id={id} />;
}
