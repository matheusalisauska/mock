import { env } from "@/lib/env";
import { requireAuth } from "@/middlewares/auth-middleware";
import { base } from "@/middlewares/base";
import z from "zod";
import { CreatePixOutput } from "../schemas/create-pix-schema";

export const createPix = base
  .use(requireAuth)
  .input(z.void())
  .output(CreatePixOutput)
  .handler(async ({ context }) => {
    const payload = {
      amount: 120,
      expiresIn: 300,
      description: "Assinatura mensal do plano Pro",
      metadata: { externalId: context.user.id },
    };

    try {
      const request = await fetch(
        `${env.ABACATE_PAY_API_URL}/v1/pixQrCode/create`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.ABACATE_PAY_API_KEY}`,
          },
        }
      );

      const response: CreatePixOutput = await request.json();

      if (!request.ok || response.error || !response.data) {
        return { error: response.error || "Erro ao criar PIX" };
      }

      return {
        success: true,
        data: {
          id: response.data.id,
          amount: response.data.amount,
          status: response.data.status,
          devMode: response.data.devMode,
          brCode: response.data.brCode,
          brCodeBase64: response.data.brCodeBase64,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          expiresAt: response.data.expiresAt,
          platformFee: response.data.platformFee,
          metadata: {
            externalId: response.data.metadata.externalId,
          },
        },
        error: null,
      };
    } catch (err) {
      console.log(err);
      return { error: "Erro interno ao criar PIX" };
    }
  });
