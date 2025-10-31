import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { Prisma, Project } from "@/lib/generated/prisma/client";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import { paginatedResponseSchema } from "@/schemas/pagination";
import { z } from "zod";
import { CreateProjectSchema } from "../schemas/create-project-schema";
import { canCreateProject } from "./policy";

export const listProjects = base
  .use(requireAuth)
  .input(
    z.object({
      page: z.number().default(PAGINATION.DEFAULT_PAGE),
      pageSize: z
        .number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE),
      search: z.string().default(""),
    })
  )
  .output(
    paginatedResponseSchema(
      z.custom<Prisma.ProjectGetPayload<{ include: { entities: true } }>>()
    )
  )
  .handler(async ({ input, context }) => {
    const { page, pageSize, search } = input;

    const [items, totalCount] = await Promise.all([
      prisma.project.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          userId: context.user.id,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          entities: true,
        },
      }),
      prisma.project.count({
        where: {
          userId: context.user.id,
        },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items: items,
      page,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  });

export const createProject = base
  .use(requireAuth)
  .input(CreateProjectSchema)
  .output(z.custom<Project>())
  .handler(async ({ input, context, errors }) => {
    if (!(await canCreateProject(context.user.id, context.user.plan))) {
      throw errors.FORBIDDEN({
        message: "Project creation limit reached for your plan.",
      });
    }

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

export const deleteProject = base
  .use(requireAuth)
  .input(z.object({ projectId: z.cuid() }))
  .output(z.custom<Project>())
  .handler(async ({ input, context, errors }) => {
    const verifyProject = await prisma.project.findUnique({
      where: {
        id: input.projectId,
      },
    });

    if (verifyProject?.userId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    const project = await prisma.project.delete({
      where: {
        id: input.projectId,
      },
    });

    if (!project) {
      throw errors.BAD_REQUEST();
    }

    return project;
  });
