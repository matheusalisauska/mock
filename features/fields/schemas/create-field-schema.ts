import { FieldType } from "@/lib/generated/prisma";
import z from "zod";

export const CreateFieldSchema = z.object({
  name: z
    .string()
    .min(3, "Entity name must be at least 3 characters")
    .max(100, "Entity name must be at most 100 characters")
    .trim(),
  type: z.custom<FieldType>(),
  required: z.boolean().default(false).optional(),
  entityId: z.cuid(),
  fakerGenerator: z.string().optional(),
});

export type CreateFieldDTO = z.infer<typeof CreateFieldSchema>;
