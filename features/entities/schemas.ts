import { Field } from "@/lib/generated/prisma";
import z from "zod";

export const CreateEntitySchema = z.object({
  name: z
    .string()
    .min(3, "Entity name must be at least 3 characters")
    .max(100, "Entity name must be at most 100 characters")
    .trim(),
  projectId: z.cuid(),
  fields: z.custom<Field[]>().optional(),
});

export type CreateEntityDTO = z.infer<typeof CreateEntitySchema>;

export const UpdateEntitySchema = CreateEntitySchema.partial().extend({
  id: z.cuid(),
});

export type UpdateEntityDTO = z.infer<typeof UpdateEntitySchema>;
