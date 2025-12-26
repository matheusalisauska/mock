"use client";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { isDefinedError } from "@orpc/client";
import { CreateEntityDTO, CreateEntitySchema } from "../schemas";

interface Props extends PropsWithChildren {
    projectId: string;
}

export function CreateEntityDialog({ children, projectId }: Props) {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const form = useForm<CreateEntityDTO>({
        mode: "onChange",
        resolver: zodResolver(CreateEntitySchema),
        defaultValues: {
            name: "",
            projectId: projectId,
            fields: [],
        },
    });


    const createEntityMutation = useMutation(orpc.entities.create.mutationOptions({
        meta: {
            successMessage: "Entity created successfully."
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: orpc.entities.getMany.key() });
            queryClient.invalidateQueries({ queryKey: orpc.entities.getManyWithFields.key() });

            // toast.success(
            //     <>
            //         Entity <strong>{data.name}</strong> created successfully.
            //     </>
            // );

            setOpen(false);
            form.reset();
        },
    }));

    function onSubmit(data: CreateEntityDTO) {
        createEntityMutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="lg:max-w-[350px]">
                <DialogHeader className="gap-6">
                    <DialogTitle>New entity</DialogTitle>
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
                                disabled={createEntityMutation.isPending}
                                type="submit"
                                form="create-entity-form">
                                {createEntityMutation.isPending ? "Creating..." : "Create entity"}
                            </Button>
                        </Field>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    );
}