-- DropForeignKey
ALTER TABLE "public"."Field" DROP CONSTRAINT "Field_entityId_fkey";

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
