import prisma from "@/lib/db";
import { FieldConfig, generateMockResponse } from "@/lib/mock/generateMockItem";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string; entity: string[] }> }
) {
  const { projectId, entity } = await context.params;
  const entityName = entity[0];

  // 🔐 Aqui futuramente você valida o token da request antes de prosseguir

  // Busca a entity no banco
  const dbEntity = await prisma.entity.findFirst({
    where: {
      name: { equals: entityName, mode: "insensitive" },
      projectId,
    },
    include: { fields: true },
  });

  if (!dbEntity) {
    return Response.json({ error: "Entity not found" }, { status: 404 });
  }

  const fieldConfigs: FieldConfig[] = dbEntity.fields.map((field) => ({
    name: field.name,
    baseType: field.type,
    fakerGenerator: field.fakerGenerator || undefined,
    fakerArgs: Array.isArray(field.fakerArgs) ? field.fakerArgs : undefined,
    enumValues: undefined,
  }));

  const mockData = generateMockResponse(fieldConfigs, 5);

  return Response.json({
    projectId,
    entity: entityName,
    data: mockData,
  });
}
