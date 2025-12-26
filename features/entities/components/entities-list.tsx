"use client";

import { Card, CardContent } from "@/components/ui/card";
import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { BrushCleaning } from "lucide-react";
import { EntititiesListSkeleton } from "../../projects/components/skeletons/entities-list-skeleton";
import { EntityCard } from "./entity-card";

export function EntitiesList({ id }: { id: string }) {
    const {
        data: entities,
        isLoading
    } = useQuery(orpc.entities.getManyWithFields.queryOptions({ input: { projectId: id, includeFields: true } }));


    if (isLoading) {
        return <EntititiesListSkeleton />;
    }

    return (
        <div className="grid h-full max-h-[90vh] w-full grid-cols-4 gap-10 gap-y-4 overflow-y-scroll">
            {entities?.items.map((entity) => (
                <EntityCard entity={entity} key={entity.id} />
            ))}
            {entities?.items.length === 0 && (
                <Card className="w-full min-w-[330px] gap-1">
                    <CardContent className="flex flex-col items-center gap-y-2">
                        <BrushCleaning />
                        <p className="text-muted-foreground text-center text-sm">No entities found. Create your first entity!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
