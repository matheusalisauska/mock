import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { Entity, Prisma } from "@/lib/generated/prisma/client";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import { paginatedResponseSchema } from "@/schemas/pagination";
import z from "zod";
import { canCreateEntity, canUpdateEntity } from "./policy";
import { CreateEntitySchema, UpdateEntitySchema } from "../schemas";

export type EntitiesWithFields = Prisma.EntityGetPayload<{
  include: { fields: true };
}>;

export const getManyEntities = base
  .use(requireAuth)
  .input(
    z.object({
      page: z.number().default(PAGINATION.DEFAULT_PAGE),
      pageSize: z
        .number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE),
      projectId: z.string(),
    })
  )
  .output(paginatedResponseSchema(z.custom<Entity>()))
  .handler(async ({ input }) => {
    const { page, pageSize, projectId } = input;

    const [items, totalCount] = await Promise.all([
      prisma.entity.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          projectId: projectId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.entity.count({
        where: {
          projectId: projectId,
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

export const getManyEntitiesWithFields = base
  .use(requireAuth)
  .input(
    z.object({
      page: z.number().default(PAGINATION.DEFAULT_PAGE),
      pageSize: z
        .number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE),
      projectId: z.string(),
    })
  )
  .output(paginatedResponseSchema(z.custom<EntitiesWithFields>()))
  .handler(async ({ input }) => {
    const { page, pageSize, projectId } = input;
    const [items, totalCount] = await Promise.all([
      prisma.entity.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: { projectId },
        include: { fields: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.entity.count({ where: { projectId } }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items,
      page,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  });

export const createEntity = base
  .use(requireAuth)
  .input(CreateEntitySchema)
  .output(z.custom<Entity>())
  .handler(async ({ input, context, errors }) => {
    if (!(await canCreateEntity(context.user.id, context.user.plan))) {
      throw errors.FORBIDDEN({
        message: "Project creation limit reached for your plan.",
      });
    }

    const entity = await prisma.entity.create({
      data: {
        name: input.name,
        projectId: input.projectId,
        fields: {
          create: (input.fields || []).map((f) => ({
            name: f.name,
            type: f.type,
            required: f.required,
            fakerGenerator: f.fakerGenerator ?? undefined,
            fakerArgs: f.fakerArgs ?? undefined,
          })),
        },
      },
    });

    if (!entity) {
      throw errors.BAD_REQUEST();
    }

    return entity;
  });

export const updateEntity = base
  .use(requireAuth)
  .input(UpdateEntitySchema)
  .output(z.custom<Entity>())
  .handler(async ({ input, context, errors }) => {
    if (!(await canUpdateEntity(context.user.id, input.id))) {
      throw errors.FORBIDDEN({
        message: "You do not have permission to update this entity.",
      });
    }

    const entity = await prisma.entity.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });

    if (!entity) {
      throw errors.BAD_REQUEST();
    }

    return entity;
  });

export const deleteEntity = base
  .use(requireAuth)
  .input(z.object({ entityId: z.cuid() }))
  .output(z.custom<Entity>())
  .handler(async ({ input, context, errors }) => {
    const verifyEntity = await prisma.entity.findUnique({
      where: {
        id: input.entityId,
      },
      include: { project: true },
    });

    if (verifyEntity?.project.userId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    const entity = await prisma.entity.delete({
      where: {
        id: input.entityId,
      },
    });

    if (!entity) {
      throw errors.BAD_REQUEST();
    }

    return entity;
  });
