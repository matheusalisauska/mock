import { EntityContainer } from "@/components/entity-component";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { EntitiesList } from "../../entities/components/entities-list";
import { ProjectDetails } from "../components/project-view/project-details";
import { ProjectHeader } from "../components/project-view/project-header";
import { EntityCodeBlock } from "@/features/entities/components/entity-code-block";

export async function ProjectView({ id }: { id: string }) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(orpc.projects.getOne.queryOptions({
        input: {
            id
        },
    }));

    return (
        <EntityContainer
            header={<ProjectHeader />}
        >
            <div className="flex w-full gap-8">
                <HydrateClient client={queryClient}>
                    <ProjectDetails id={id} />
                </HydrateClient>
                <EntitiesList id={id} />
                <EntityCodeBlock projectId={id} />
            </div>
        </EntityContainer>
    );
}