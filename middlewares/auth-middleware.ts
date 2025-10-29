import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { base } from "./base";
import { Session, User } from "@/lib/generated/prisma/client";

export const requireAuth = base.$context<{session?: Session, user?: Partial<User>}>().middleware(async ({ next, errors }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.session || !session.user) {
        throw errors.UNAUTHORIZED;
    }

    // normalize optional fields so they are exactly `string | null` (no `undefined`)
    const normalizedSession: Session = {
        ...session.session,
        ipAddress: session.session.ipAddress ?? null,
        userAgent: session.session.userAgent ?? null
    };

    const result = await next({
        context: {
            session: normalizedSession,
            user: session.user
        }
    });

    return result;
});
