import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { Entity, Prisma } from "@/lib/generated/prisma/client";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import { paginatedResponseSchema } from "@/schemas/pagination";
import z from "zod";

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
