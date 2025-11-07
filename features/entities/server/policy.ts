import "server-only";

import { PlanType } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/db";
import { FREE_PLAN_LIMITS, PREMIUM_PLAN_LIMITS } from "@/config/limits";

export async function canCreateEntity(userId: string, plan: PlanType) {
  const count = await prisma.entity.count({
    where: {
      project: {
        userId,
      },
    },
  });

  if (plan === PlanType.FREE) {
    return count < FREE_PLAN_LIMITS.ENTITIES;
  }

  return count < PREMIUM_PLAN_LIMITS.ENTITIES;
}
