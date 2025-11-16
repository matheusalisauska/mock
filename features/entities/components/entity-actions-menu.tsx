"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Entity } from "@/lib/generated/prisma";
import { orpc } from "@/lib/orpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RenameEntityDialog } from "./rename-entity-dialog";

export function EntityActionsMenu({ entity }: { entity: Entity }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [renameOpen, setRenameOpen] = useState(false);

    const handleCopyUrl = () => {
        const url = `http://localhost:3000/api/mock/${entity.projectId}/${entity.name}`;
        navigator.clipboard.writeText(url);
        toast.success("Entity URL copied to clipboard!");
    };

    return (
        <div className="flex items-center gap-1">
            <DeleteDialog
                entity={entity}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
            <RenameEntityDialog
                entityId={entity.id}
                open={renameOpen}
                onOpenChange={setRenameOpen}
            />
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon-sm"}>
                        <EllipsisVertical size={18} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setDropdownOpen(false)}>
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => {
                            setDropdownOpen(false);
                            setRenameOpen(true);
                        }}
                    >
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyUrl} onSelect={() => setDropdownOpen(false)}>
                        Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => {
                            setDropdownOpen(false);
                            setConfirmOpen(true);
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function DeleteDialog({
    entity,
    confirmOpen,
    setConfirmOpen,
}: {
    entity: Entity;
    confirmOpen: boolean;
    setConfirmOpen: (o: boolean) => void;
}) {
    const queryClient = useQueryClient();

    const deleteEntityMutation = useMutation(
        orpc.entities.delete.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: orpc.entities.getMany.key(),
                });
                queryClient.invalidateQueries({
                    queryKey: orpc.entities.getManyWithFields.key(),
                });

                toast.success(
                    <>
                        Entity <strong>{entity.name}</strong> deleted successfully.
                    </>
                );

                setConfirmOpen(false);
            },
            onError: () => {
                toast.error(`Failed to delete entity "${entity.name}".`);
            },
        })
    );

    return (
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will <b>permanently delete</b> your
                        <b> entity</b> and <b>all related data.</b>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            deleteEntityMutation.mutate({ entityId: entity.id })
                        }
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
