import { Entity } from "@/lib/generated/prisma/client";
import z from "zod";

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be at most 24 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 96 characters")
    .optional(),
  entities: z.array(z.custom<Entity>()).optional(),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
