"use client";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Entity, Project } from "@/lib/generated/prisma/client";
import { orpc } from "@/lib/orpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";


interface ProjectCardProps {
    project: Project & { entities: Entity[] };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const queryClient = useQueryClient();

    const deleteProjectMutation = useMutation(orpc.projects.delete.mutationOptions({
        onSuccess: () => {
            setDropdownOpen(false);
            queryClient.invalidateQueries({ queryKey: orpc.projects.list.key() });

            toast.success(
                <>
                    Project <strong>{project.name}</strong> deleted successfully.
                </>
            );
        },
        onError: () => {
            setDropdownOpen(false);
            toast.error(`Failed to delete project "${name}".`);
        }
    }));

    return (
        <Link className="w-full" href={`/projects/${project.id}`}>
            <Card className="hover:brightness-98 cursor-pointer w-full">
                <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.entities.length} entidades</CardDescription>
                    <CardAction>
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger className="hover:bg-accent p-1 rounded-md cursor-pointer">
                                <EllipsisVertical size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem >
                                    Open
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => deleteProjectMutation.mutate({ projectId: project.id })} className="text-destructive" >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>
                <CardFooter className="gap-2">
                    {!project.entities.length && <Badge variant="outline">Nenhuma</Badge>}
                    {project.entities.map((entity) => (
                        <Badge key={entity.id} variant="outline">
                            {entity.name}
                        </Badge>
                    ))}
                </CardFooter>
            </Card>
        </Link>
    );
}