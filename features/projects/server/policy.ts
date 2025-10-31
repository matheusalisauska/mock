import "server-only";

import { PlanType } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/db";

export async function canCreateProject(userId: string, plan: PlanType) {
  if (plan === PlanType.PREMIUM) return true;
  const count = await prisma.project.count({ where: { userId } });
  return count < 1;
}
