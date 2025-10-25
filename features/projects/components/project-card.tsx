import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";


export function ProjectCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Plataforma Comercial</CardTitle>
                <CardDescription>8 entidades</CardDescription>
                <CardAction>
                    <EllipsisVertical size={16} />
                </CardAction>
            </CardHeader>
            <CardFooter className="gap-2">
                <Badge variant="outline">
                    Users
                </Badge>
                <Badge variant="outline">
                    Contracts
                </Badge>
            </CardFooter>
        </Card>
    );
}