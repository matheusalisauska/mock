/*
  Warnings:

  - Made the column `url` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "url" SET NOT NULL;
