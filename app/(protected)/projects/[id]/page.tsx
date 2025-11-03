import { ProjectView } from "@/features/projects/views/project-view";

interface Props {
    params: Promise<{ id: string; }>
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    return <ProjectView id={id} />;
}