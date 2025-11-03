"use client";

import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { EntityCard } from "./entity-card";

export function EntitiesList({ id }: { id: string }) {
    const {
        data: entities,
        isLoading
    } = useQuery(orpc.entities.getManyWithFields.queryOptions({ input: { projectId: id, includeFields: true } }));


    return (
        <div className="flex flex-col gap-y-4 w-[25%]">
            {entities?.items.map((entity) => (
                <EntityCard entity={entity} key={entity.id} />
            ))}
        </div>
    );
}