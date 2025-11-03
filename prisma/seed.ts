import { FieldType } from "@/lib/generated/prisma/enums";
import { PrismaClient } from "../lib/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.fakerGenerator.createMany({
    data: [
      // STRING
      {
        label: "Full Name",
        path: "person.fullName",
        baseType: FieldType.string,
      },
      { label: "Email", path: "internet.email", baseType: FieldType.string },
      {
        label: "Company Name",
        path: "company.name",
        baseType: FieldType.string,
      },
      { label: "City", path: "location.city", baseType: FieldType.string },

      // NUMBER
      {
        label: "Random Integer",
        path: "number.int",
        baseType: FieldType.number,
      },
      { label: "Price", path: "commerce.price", baseType: FieldType.number },

      // DATE
      { label: "Past Date", path: "date.past", baseType: FieldType.date },
      { label: "Future Date", path: "date.future", baseType: FieldType.date },

      // BOOLEAN
      {
        label: "Random Boolean",
        path: "datatype.boolean",
        baseType: FieldType.boolean,
      },
    ],
  });
}

main()
  .then(() => console.log("✅ Faker generators seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
