import { handleAbacateWebhook } from "@/features/billing/lib/abacate-pay/handler";
import { BillingPaidSchema } from "@/features/billing/lib/abacate-pay/schemas";
import { verifyAbacateSignature } from "@/features/billing/lib/abacate-pay/verify-signature";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const jsonBody = JSON.parse(rawBody);
    const parsed = BillingPaidSchema.parse(jsonBody);

    const url = req.nextUrl;
    const webhookSecret = url.searchParams.get("webhookSecret");
    const headerSignature = req.headers.get("X-Webhook-Signature");

    if (!(await verifyAbacateAuth(webhookSecret, headerSignature, rawBody))) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 400 });
    }

    await handleAbacateWebhook(parsed);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Erro no webhook:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function verifyAbacateAuth(
  secret: string | null,
  headerSignature: string | null,
  rawBody: string
) {
  if (secret !== process.env.ABACATE_WEBHOOK_SECRET) {
    return false;
  }

  return verifyAbacateSignature(rawBody, headerSignature || "");
}
