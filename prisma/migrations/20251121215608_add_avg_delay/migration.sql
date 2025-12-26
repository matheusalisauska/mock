-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "avgDelayMs" INTEGER,
ADD COLUMN     "errorBody" JSONB,
ADD COLUMN     "errorRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "errorStatus" INTEGER;
