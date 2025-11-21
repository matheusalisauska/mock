import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { FakerGenerator, Field, FieldType } from "@/lib/generated/prisma";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import { paginatedResponseSchema } from "@/schemas/pagination";
import z from "zod";
import { canCreateField } from "../policy";
import { CreateFieldSchema } from "../schemas/create-field-schema";

export const getFakerGeneratorOptions = base
  .input(
    z.object({
      baseType: z.custom<FieldType>(),
    })
  )
  .output(z.array(z.custom<FakerGenerator>()))
  .handler(async ({ input }) => {
    const data = await prisma.fakerGenerator.findMany({
      where: {
        baseType: input.baseType,
      },
    });

    return data;
  });

export const createField = base
  .use(requireAuth)
  .input(CreateFieldSchema)
  .output(z.custom<Field>())
  .handler(async ({ input, context, errors }) => {
    if (!(await canCreateField(context.user.id, context.user.plan))) {
      throw errors.FORBIDDEN({
        message: "Field creation limit reached for your plan.",
      });
    }
    console.log("enter");

    const field = await prisma.field.create({
      data: {
        name: input.name,
        type: input.type,
        entityId: input.entityId,
        fakerGenerator: input.fakerGenerator,
        required: input.required,
      },
    });

    if (!field) {
      throw errors.BAD_REQUEST();
    }

    return field;
  });

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

export const deleteField = base
  .use(requireAuth)
  .input(z.object({ fieldId: z.cuid() }))
  .output(z.custom<Field>())
  .handler(async ({ input, context, errors }) => {
    const verifyField = await prisma.field.findUnique({
      where: {
        id: input.fieldId,
      },
      include: {
        entity: {
          select: { project: { select: { userId: true } } },
        },
      },
    });

    if (verifyField?.entity.project.userId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    const field = await prisma.field.delete({
      where: {
        id: input.fieldId,
      },
    });

    if (!field) {
      throw errors.BAD_REQUEST();
    }

    return field;
  });
