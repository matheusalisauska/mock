import prisma from "@/lib/db";
import { Prisma, Project } from "@/lib/generated/prisma/client";
import { requireAuth } from "@/middlewares/auth-middleware";
import { z } from "zod";
import { CreateProjectSchema } from "../validators/create-project-schema";
import { base } from "@/middlewares/base";

export const listProjects = base
  .use(requireAuth)
  .input(z.void())
  .output(
    z.object({
      projects: z.array(
        z.custom<Prisma.ProjectGetPayload<{ include: { entities: true } }>>()
      ),
    })
  )
  .handler(async () => {
    const projects = await prisma.project.findMany({
      include: {
        entities: true,
      },
    });

    return {
      projects,
    };
  });

export const createProject = base
  .use(requireAuth)
  .input(CreateProjectSchema)
  .output(z.custom<Project>())
  .handler(async ({ input, context, errors }) => {
    const project = await prisma.project.create({
      data: {
        name: input.name,
        description: input.description,
        userId: context.user.id,
      },
    });

    if (!project) {
      throw errors.BAD_REQUEST();
    }

    return project;
  });
