import { BillingPaidEvent } from "./schemas";

export async function handleAbacateWebhook(event: BillingPaidEvent) {
  switch (event.event) {
    case "billing.paid":
      await handlePaymentSuccess(event);
      break;
    default:
      console.warn("⚠️ Evento não tratado:", event);
  }
}

async function handlePaymentSuccess(event: BillingPaidEvent) {
  console.log("✅ Pagamento confirmado");
}
