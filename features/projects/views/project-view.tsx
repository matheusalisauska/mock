import { EntityContainer } from "@/components/entity-component";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { EntitiesList } from "../components/project-view/entities-list";
import { ProjectDetails } from "../components/project-view/project-details";
import { ProjectHeader } from "../components/project-view/project-header";

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
            <div className="flex w-full gap-12">
                <HydrateClient client={queryClient}>
                    <ProjectDetails id={id} />
                </HydrateClient>
                <EntitiesList id={id} />
                <pre className="text-sm font-mono whitespace-pre-wrap ">
                    <code>{JSON.stringify({ nome: "str" }, null, 2)}</code>
                </pre>
            </div>
        </EntityContainer>
    );
}