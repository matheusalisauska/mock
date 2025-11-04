import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { Field } from "@/lib/generated/prisma/client";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import { paginatedResponseSchema } from "@/schemas/pagination";
import z from "zod";

export const getManyFields = base
  .use(requireAuth)
  .input(
    z.object({
      page: z.number().default(PAGINATION.DEFAULT_PAGE),
      pageSize: z
        .number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE),
      entityId: z.string().optional(),
    })
  )
  .output(paginatedResponseSchema(z.custom<Field>()))
  .handler(async ({ input }) => {
    const { page, pageSize, entityId } = input;

    const [items, totalCount] = await Promise.all([
      prisma.field.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          entityId: entityId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.field.count({
        where: {
          entityId: entityId,
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
