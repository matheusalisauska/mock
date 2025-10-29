import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ProjectFilters } from "../components/project-filters";
import { ProjectList } from "../components/project-list";
import { orpc } from "@/lib/orpc";
import { Suspense } from "react";
import { CreateProjectDialog } from "../components/create-project-dialog";
import { EntityContainer, EntityHeader } from "@/components/entity-component";

export async function ProjectListView() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(orpc.projects.list.queryOptions());

    return (
        <EntityContainer
            header={<EntityHeader title="Projects" />}
            filters={<ProjectFilters />}
            create={<CreateProjectDialog />}
        >
            <HydrateClient client={queryClient}>
                <Suspense fallback={<div>Loading projects...</div>}>
                    <ProjectList />
                </Suspense>
            </HydrateClient>
        </EntityContainer>
    );
}