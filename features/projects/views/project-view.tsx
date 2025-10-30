import { EntityContainer } from "@/components/entity-component";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Suspense } from "react";
import { ProjectHeader } from "../components/project-view/project-header";



export async function ProjectView() {
    const queryClient = getQueryClient();
    // await queryClient.prefetchQuery(orpc.projects.list.queryOptions({
    //     input: params,
    // }));

    return (
        <EntityContainer
            header={<ProjectHeader />}
        >
            <HydrateClient client={queryClient}>
                <Suspense fallback={<div>Loading projects...</div>}>
                    {/* <ProjectList /> */}
                </Suspense>
            </HydrateClient>
        </EntityContainer>
    );
}