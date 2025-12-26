import { EntityContainer } from "@/components/entity-component";
import { orpc } from "@/lib/orpc";
import { getQueryClient } from "@/lib/query/hydration";
import { EntitiesList } from "../../entities/components/entities-list";
import { ProjectHeader } from "../components/project-view/project-header";
import { CreateEntityDialog } from "@/features/entities/components/create-entity-dialog";
import { Button } from "@/components/ui/button";

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
            <div className="flex w-full flex-col gap-8">
                {/* <HydrateClient client={queryClient}>
                    <ProjectDetails id={id} />
                </HydrateClient> */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-semibold dark:text-white">Entities</h2>
                        <p>Manage your entities</p>
                    </div>
                    <CreateEntityDialog projectId={id}>
                        <Button variant={"default"}>Create new entity</Button>
                    </CreateEntityDialog>
                </div>
                <EntitiesList id={id} />
            </div>
        </EntityContainer>
    );
}