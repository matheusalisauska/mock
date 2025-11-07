"use client";

import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { EntititiesListSkeleton } from "../../projects/components/skeletons/entities-list-skeleton";
import { EntityCard } from "./entity-card";
import { Button } from "@/components/ui/button";
import { CreateEntityDialog } from "./create-entity-dialog";

export function EntitiesList({ id }: { id: string }) {
    const {
        data: entities,
        isLoading
    } = useQuery(orpc.entities.getManyWithFields.queryOptions({ input: { projectId: id, includeFields: true } }));


    if (isLoading) {
        return <EntititiesListSkeleton />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            {entities?.items.map((entity) => (
                <EntityCard entity={entity} key={entity.id} />
            ))}
            <CreateEntityDialog projectId={id}>
                <Button variant={"secondary"}>New entity</Button>
            </CreateEntityDialog>
        </div>
    );
}
