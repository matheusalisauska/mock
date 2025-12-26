import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateFieldDialog } from "@/features/fields/components/create-field-dialog";
import { Folder, PencilIcon, Trash2 } from "lucide-react";
import { EntitiesWithFields } from "../server/entities-procedures";
import { EntityActionsMenu } from "./entity-actions-menu";
import { DeleteFieldDialog } from "@/features/fields/components/delete-field-dialog";

interface EntityCardProps {
    entity: EntitiesWithFields;
}

export function EntityCard({ entity }: EntityCardProps) {
    return (
        <Card className="max-w-full gap-1 py-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-1">
                        <Folder size={14} />
                        {entity.name}
                    </CardTitle>
                    <EntityActionsMenu entity={entity} />
                </div>
            </CardHeader>
            <CardContent className="space-y-2 px-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm">Entities</p>
                    <div className="bg-primary/15 text-primary flex size-5.5 items-center justify-center rounded-full text-xs font-semibold">
                        <p>{entity.fields.length}</p>
                    </div>
                </div>
                {entity.fields.map((field) => (
                    <div key={field.id} className="bg-secondary/60 dark:bg-accent/20 flex items-center gap-x-2 rounded-md px-3 py-1 dark:border ">
                        <p className="text-sm">{field.name}</p>
                        <Badge asChild className="py-px font-semibold">
                            <span className="text-[10px] capitalize">{field.type}</span>
                        </Badge>
                        <div className="ml-auto flex items-center">
                            <Button variant={"ghost"} className="size-fit p-1.5 hover:bg-stone-300" size={"icon-sm"}>
                                <PencilIcon size={14} className="text-foreground" />
                            </Button>
                            <DeleteFieldDialog fieldId={field.id}>
                                <Button variant={"ghost"} className="size-fit p-1.5 hover:bg-stone-300" size={"icon-sm"}>
                                    <Trash2 size={14} className=" text-destructive" />
                                </Button>
                            </DeleteFieldDialog>
                        </div>
                    </div>
                ))}
                <CreateFieldDialog entityId={entity.id}>
                    <Button variant={"ghost"} className="bg-secondary/60 dark:bg-accent flex w-full items-center gap-x-2 rounded-md p-2 px-4 dark:border " size={"sm"}>New field</Button>
                </CreateFieldDialog>
            </CardContent>
        </Card>
    );
}