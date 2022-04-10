/*
  Warnings:

  - You are about to drop the column `jsonLink` on the `Race` table. All the data in the column will be lost.
  - Added the required column `json` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Race" DROP COLUMN "jsonLink",
ADD COLUMN     "json" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RaceTierList" (
    "id" TEXT NOT NULL,
    "json" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RaceTierList_id_key" ON "RaceTierList"("id");
