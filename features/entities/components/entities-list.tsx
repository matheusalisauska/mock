"use client";

import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { EntititiesListSkeleton } from "../../projects/components/skeletons/entities-list-skeleton";
import { EntityCard } from "./entity-card";
import { Button } from "@/components/ui/button";
import { CreateEntityDialog } from "./create-entity-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { BrushCleaning } from "lucide-react";

export function EntitiesList({ id }: { id: string }) {
    const {
        data: entities,
        isLoading
    } = useQuery(orpc.entities.getManyWithFields.queryOptions({ input: { projectId: id, includeFields: true } }));


    if (isLoading) {
        return <EntititiesListSkeleton />;
    }

    return (
        <div className="flex h-full max-h-[90vh] flex-col gap-y-4 overflow-y-scroll">
            {entities?.items.map((entity) => (
                <EntityCard entity={entity} key={entity.id} />
            ))}
            {entities?.items.length === 0 && (
                <Card className="min-w-[330px] gap-1">
                    <CardContent className="flex flex-col items-center gap-y-2">
                        <BrushCleaning />
                        <p className="text-muted-foreground text-center text-sm">No entities found. Create your first entity!</p>
                    </CardContent>
                </Card>
            )}
            <CreateEntityDialog projectId={id}>
                <Button variant={"default"}>New entity</Button>
            </CreateEntityDialog>
        </div>
    );
}
