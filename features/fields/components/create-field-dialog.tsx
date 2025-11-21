import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { toOptions } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FieldTypeOptions } from "../constants";
import { toast } from "sonner";
import { isDefinedError } from "@orpc/client";
import { CreateFieldDTO, CreateFieldSchema } from "../schemas/create-field-schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props extends PropsWithChildren {
    entityId: string;
}

export function CreateFieldDialog({ entityId, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<CreateFieldDTO>({
        mode: "onChange",
        resolver: zodResolver(CreateFieldSchema),
        defaultValues: {
            name: "",
            type: undefined,
            required: false,
            entityId: entityId,
        }
    });

    const type = useWatch({ control: form.control, name: "type" });

    const { data: fakeGeneratorData } = useQuery(
        orpc.fields.getFakerGeneratorOptions.queryOptions({
            input: { baseType: type },
            queryKey: ["faker-generator-options", type],
            select: (data) => {
                return toOptions(data, "label", "path");
            }
        }));

    const createFieldMutation = useMutation(orpc.fields.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: orpc.fields.getMany.key() });
            queryClient.invalidateQueries({ queryKey: orpc.entities.getManyWithFields.key() });


            toast.success(
                <>
                    Field <strong>{data.name}</strong> created successfully.
                </>
            );

            setIsOpen(false);
            form.reset();
        },
        onError: (error) => {
            console.log(error);
            if (isDefinedError(error)) {
                toast.error(error.message);
                return;
            }

            toast.error("Failed to create entity. Please try again.");
        }
    }));


    function onSubmit(data: CreateFieldDTO) {
        createFieldMutation.mutate(data);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="lg:max-w-[350px]">
                <DialogHeader className="items-start">
                    <DialogTitle className="text-2xl">Create Field</DialogTitle>
                    <DialogDescription>Select the details for the new field</DialogDescription>
                </DialogHeader>
                <form className="space-y-6" id="create-field-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Field name"
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="type"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                                <Select defaultValue="" value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="checkout-exp-month-ts6">
                                        <SelectValue placeholder="Select Field Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FieldTypeOptions.map((option, idx) => (
                                            <SelectItem key={idx} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="fakerGenerator"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-2">
                                    <FieldLabel htmlFor={field.name}>Faker Generator (optional)</FieldLabel>
                                    <Tooltip>
                                        <TooltipTrigger><Info size={16} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Generate fake data using Faker.js for your fields.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <ComboBox
                                    options={fakeGeneratorData ?? []}
                                    placeholder="Select Faker Generator"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Field orientation="horizontal" className="mt-10">
                        <Button type="button" variant="outline" className="ml-auto w-[40%]" onClick={() => form.reset()}>
                            Cancel
                        </Button>
                        <Button
                            disabled={createFieldMutation.isPending}
                            type="submit"
                            className="w-[60%]"
                            form="create-field-form">
                            {createFieldMutation.isPending ? "Creating..." : "Create field"}
                        </Button>
                    </Field>
                </form>
            </DialogContent>
        </Dialog >
    );
}