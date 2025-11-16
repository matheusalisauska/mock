import "server-only";

import { PlanType } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/db";
import { FREE_PLAN_LIMITS, PREMIUM_PLAN_LIMITS } from "@/config/limits";

export async function canCreateField(userId: string, plan: PlanType) {
  const count = await prisma.field.count({
    where: {
      entity: {
        project: {
          userId: userId,
        },
      },
    },
  });

  if (plan === PlanType.FREE) {
    return count < FREE_PLAN_LIMITS.FIELDS;
  }

  return count < PREMIUM_PLAN_LIMITS.FIELDS;
}
