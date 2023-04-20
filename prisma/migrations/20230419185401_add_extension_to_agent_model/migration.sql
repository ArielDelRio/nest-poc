/*
  Warnings:

  - A unique constraint covering the columns `[extension]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "extension" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_extension_key" ON "Agent"("extension");
