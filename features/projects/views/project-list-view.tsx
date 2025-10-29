import { EntityContainer, EntityHeader } from "@/components/entity-component";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Suspense } from "react";
import { CreateProjectDialog } from "../components/create-project-dialog";
import { ProjectFilters } from "../components/project-filters";
import { ProjectList } from "../components/project-list";
import { ProjectParams } from "../server/params-loader";

interface Props {
    params: ProjectParams;
}

export async function ProjectListView({ params }: Props) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(orpc.projects.list.queryOptions({
        input: params,
    }));

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