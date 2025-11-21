import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { orpc } from "@/lib/orpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";


export function DeleteFieldDialog({ fieldId, children }: PropsWithChildren<{ fieldId: string }>) {
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();

    const deleteFieldMutation = useMutation(
        orpc.fields.delete.mutationOptions({
            onSuccess: (field) => {
                queryClient.invalidateQueries({
                    queryKey: orpc.entities.getMany.key(),
                });
                queryClient.invalidateQueries({
                    queryKey: orpc.entities.getManyWithFields.key(),
                });

                toast.success(
                    <>
                        Field <strong>{field.name}</strong> deleted successfully.
                    </>
                );

                setIsOpen(false);
            },
            onError: (field) => {
                toast.error(`Failed to delete field "${field.name}".`);
            },
        })
    );

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {deleteFieldMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    children
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will <b>permanently delete</b> your
                        <b> field</b> and <b>all related data.</b>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            deleteFieldMutation.mutate({ fieldId })
                        }
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}