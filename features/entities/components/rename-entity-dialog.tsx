import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { orpc } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UpdateEntityDTO, UpdateEntitySchema } from "../schemas";

interface Props extends PropsWithChildren {
    entityId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RenameEntityDialog({ children, entityId, open, onOpenChange }: Props) {

    const queryClient = useQueryClient();

    const form = useForm<UpdateEntityDTO>({
        mode: "onChange",
        resolver: zodResolver(UpdateEntitySchema),
        defaultValues: {
            name: "",
            id: entityId,
        },
    });


    const renameEntityMutation = useMutation(orpc.entities.update.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: orpc.entities.getMany.key() });
            queryClient.invalidateQueries({ queryKey: orpc.entities.getManyWithFields.key() });


            toast.success(
                <>
                    Entity <strong>{data.name}</strong> updated successfully.
                </>
            );

            onOpenChange(false);
            form.reset();
        },
        onError: (error) => {
            if (isDefinedError(error)) {
                toast.error(error.message);
                return;
            }

            toast.error("Failed to update entity. Please try again.");
        }
    }));

    function onSubmit(data: UpdateEntityDTO) {
        renameEntityMutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="lg:max-w-[350px]">
                <DialogHeader className="gap-6">
                    <DialogTitle>Rename Entity</DialogTitle>
                    <form className="space-y-6" id="create-entity-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Entity name"
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Field orientation="horizontal">
                            <Button type="button" variant="outline" className="ml-auto" onClick={() => form.reset()}>
                                Cancel
                            </Button>
                            <Button
                                disabled={renameEntityMutation.isPending}
                                type="submit"
                                form="create-entity-form">
                                {renameEntityMutation.isPending ? "Updating..." : "Update entity"}
                            </Button>
                        </Field>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    );
}