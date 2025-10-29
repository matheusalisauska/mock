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
import { orpc } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateProjectDTO, CreateProjectSchema } from "../schemas/create-project-schema";

export function CreateProjectDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const form = useForm<CreateProjectDTO>({
        mode: "onChange",
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            entities: []
        },
    });

    const createProjectMutation = useMutation(orpc.projects.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: orpc.projects.list.key() });

            toast.success(
                <>
                    Project <strong>{data.name}</strong> created successfully.
                </>
            );

            setOpen(false);
            form.reset();
        },
        onError: (error) => {
            if (isDefinedError(error)) {
                toast.error(error.message);
                return;
            }

            toast.error("Failed to create project. Please try again.");
        }
    }));

    function onSubmit(data: CreateProjectDTO) {
        createProjectMutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <SquarePlus />
                    New project
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[350px]">
                <DialogHeader className="gap-6">
                    <DialogTitle>New project</DialogTitle>
                    <form className="space-y-6" id="create-project-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Project name"
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
                            <Button disabled={createProjectMutation.isPending} type="submit" form="create-project-form">
                                {createProjectMutation.isPending ? "Creating..." : "Create project"}
                            </Button>
                        </Field>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    );
}