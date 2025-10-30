import crypto from "node:crypto";

// Public HMAC key
const ABACATEPAY_PUBLIC_KEY =
  "t9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9";

/**
 * Verifies if the webhook signature matches the expected HMAC.
 * @param rawBody Raw request body string.
 * @param signatureFromHeader The signature received from `X-Webhook-Signature`.
 * @returns true if the signature is valid, false otherwise.
 */
export function verifyAbacateSignature(
  rawBody: string,
  signatureFromHeader: string
) {
  console.log(rawBody, signatureFromHeader);
  const bodyBuffer = Buffer.from(rawBody, "utf8");

  const expectedSig = crypto
    .createHmac("sha256", ABACATEPAY_PUBLIC_KEY)
    .update(bodyBuffer)
    .digest("base64");

  const A = Buffer.from(expectedSig);
  const B = Buffer.from(signatureFromHeader);

  return A.length === B.length && crypto.timingSafeEqual(A, B);
}
