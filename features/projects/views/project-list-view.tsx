import { EntityContainer, EntityHeader } from "@/components/entity-component";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Suspense } from "react";
import { CreateProjectDialog } from "../components/create-project-dialog";
import { ProjectFilters } from "../components/project-filters";
import { ProjectList } from "../components/project-list";
import { ProjectParams } from "../server/params-loader";
import { posthogServer } from "@/lib/posthog";


interface Props {
    params: ProjectParams;
}

export async function ProjectListView({ params }: Props) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(orpc.projects.getMany.queryOptions({
        input: params,
    }));

    //distinct_id = alisauska-admin
    const isCreateEnabled = await posthogServer.isFeatureEnabled("create-project-button", "alisauska-dev");
    const isContactEnabled = await posthogServer.isFeatureEnabled("contact-developer", "alisauska-dev");


    return (
        <EntityContainer
            header={<EntityHeader path={<strong>Projects</strong>} />}
            filters={<ProjectFilters />}
            create={isCreateEnabled ? <CreateProjectDialog /> : null}
        >
            <HydrateClient client={queryClient}>
                <Suspense fallback={<div>Loading projects...</div>}>
                    <ProjectList />
                </Suspense>
            </HydrateClient>
            {isContactEnabled && <p>+55 44 9133-2003</p>}
        </EntityContainer>
    );
}