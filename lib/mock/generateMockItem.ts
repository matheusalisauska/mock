/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";

export type FieldConfig = {
  name: string;
  baseType: "string" | "number" | "date" | "boolean" | "enum" | "json";
  fakerGenerator?: string | null;
  fakerArgs?: unknown | null;
  enumValues?: string[] | null;
};

function generateMockItem(fields: FieldConfig[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const field of fields) {
    const { name, baseType, fakerGenerator, fakerArgs, enumValues } = field;

    if (fakerGenerator) {
      const parts = fakerGenerator.split(".");
      let fn: any = faker;
      for (const part of parts) {
        fn = fn[part];
        if (!fn) break;
      }
      if (typeof fn === "function") {
        result[name] = fakerArgs
          ? fn(...(Array.isArray(fakerArgs) ? fakerArgs : [fakerArgs]))
          : fn();
      } else {
        result[name] = null;
      }
    } else {
      switch (baseType) {
        case "string":
          result[name] = faker.lorem.words(3);
          break;
        case "number":
          result[name] = faker.number.int({ min: 0, max: 1000 });
          break;
        case "date":
          result[name] = faker.date.past().toISOString();
          break;
        case "boolean":
          result[name] = faker.datatype.boolean();
          break;
        case "enum":
          result[name] = enumValues?.length
            ? faker.helpers.arrayElement(enumValues)
            : null;
          break;
        default:
          result[name] = null;
      }
    }
  }
  return result;
}

export function generateMockResponse(fields: FieldConfig[], count = 3) {
  return Array.from({ length: count }, () => generateMockItem(fields));
}
