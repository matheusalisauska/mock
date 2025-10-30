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

      const data = await request.json();
      console.log(data);
      if (!request.ok) {
        return { error: data.message || "Erro ao criar PIX" };
      }

      return {
        success: true,
        data: {
          id: data.id,
          amount: data.amount,
          status: data.status,
          devMode: data.devMode,
          brCode: data.brCode,
          brCodeBase64: data.brCodeBase64,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          expiresAt: data.expiresAt,
          platformFee: data.platformFee,
          metadata: {
            externalId: data.metadata.externalId,
          },
        },
        error: null,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return { error: "Erro interno ao criar PIX" };
    }
  });
