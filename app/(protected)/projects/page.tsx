import { projectParamsLoader } from "@/features/projects/server/params-loader";
import { ProjectListView } from "@/features/projects/views/project-list-view";
import type { SearchParams } from "nuqs/server";

interface Props {
    searchParams: Promise<SearchParams>;
}

export default async function ProjectsPage({ searchParams }: Props) {
    const params = await projectParamsLoader(searchParams);

    return (
        <ProjectListView params={params} />
    );
}
