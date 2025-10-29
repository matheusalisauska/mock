import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Entity } from "@/lib/generated/prisma/client";
import { EllipsisVertical } from "lucide-react";

interface ProjectCardProps {
    name: string;
    entities: Entity[];
}

export function ProjectCard({ name, entities }: ProjectCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{entities.length} entidades</CardDescription>
                <CardAction>
                    <EllipsisVertical size={16} />
                </CardAction>
            </CardHeader>
            <CardFooter className="gap-2">
                {!entities.length && <Badge variant="outline">Nenhuma</Badge>}
                {entities.map((entity) => (
                    <Badge key={entity.id} variant="outline">
                        {entity.name}
                    </Badge>
                ))}
            </CardFooter>
        </Card>
    );
}