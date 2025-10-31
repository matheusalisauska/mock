import z from "zod";

export const CreateBillingSchema = z.object({
  externalId: z.string().min(1),
});

const PixStatusEnum = z.enum([
  "PENDING",
  "EXPIRED",
  "CANCELLED",
  "PAID",
  "REFUNDED",
]);

export const PixSuccessSchema = z.object({
  success: z.literal(true),
  data: z
    .object({
      id: z.string(),
      amount: z.number(),
      status: PixStatusEnum,
      devMode: z.boolean(),
      brCode: z.string(),
      brCodeBase64: z.string(),
      platformFee: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      expiresAt: z.string(),
      metadata: z.object({
        externalId: z.string(),
      }),
    })
    .loose(),
  error: z.null(),
});

export const PixErrorSchema = z.object({
  data: z.null().optional(),
  error: z.string(),
});

export const CreatePixOutput = z.union([PixSuccessSchema, PixErrorSchema]);

export type CreatePixOutput = z.infer<typeof CreatePixOutput>;
