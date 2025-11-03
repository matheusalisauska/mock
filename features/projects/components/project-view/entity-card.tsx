import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntitiesWithFields } from "../../server/procedures/entities-procedures";
import { Badge } from "@/components/ui/badge";
import { Pencil, PencilIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EntityCardProps {
    entity: EntitiesWithFields;
}

export function EntityCard({ entity }: EntityCardProps) {
    return (
        <Card className="gap-1 ">
            <CardHeader>
                <CardTitle className="text-lg">
                    {entity.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {entity.fields.map((field) => (
                    <div key={field.id} className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <p>{field.name}</p>
                        <Badge asChild>
                            <span className="text-[11px]">{field.type}</span>
                        </Badge>
                        <div className="flex items-center ml-auto">
                            <Button variant={"ghost"} className="p-1.5 size-fit hover:bg-stone-300" size={"icon-sm"}>
                                <PencilIcon size={14} className="text-foreground" />
                            </Button>
                            <Button variant={"ghost"} className="p-1.5 size-fit hover:bg-stone-300" size={"icon-sm"}>
                                <Trash2 size={14} className="text-foreground" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}