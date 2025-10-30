import { z } from "zod";

export const BillingPaidSchema = z.object({
  id: z.string(),
  event: z.literal("billing.paid"),
  devMode: z.boolean(),
  data: z.object({
    payment: z.object({
      amount: z.number(),
      fee: z.number(),
      method: z.string(),
    }),
    pixQrCode: z.object({
      id: z.string(),
      amount: z.number(),
      kind: z.string(),
      status: z.string(),
      metadata: z.record(z.string(), z.any()).optional(),
    }),
  }),
});

export type BillingPaidEvent = z.infer<typeof BillingPaidSchema>;
