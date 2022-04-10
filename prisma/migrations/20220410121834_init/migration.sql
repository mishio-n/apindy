-- CreateEnum
CREATE TYPE "GenderCategory" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "StableRegion" AS ENUM ('MIHO', 'RITTO', 'NRA');

-- CreateTable
CREATE TABLE "Horse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "genderCategory" "GenderCategory" NOT NULL,
    "sire" TEXT NOT NULL,
    "bloodmare" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "stableId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" "StableRegion" NOT NULL,

    CONSTRAINT "Stable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "colors" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "jsonLink" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Horse_id_key" ON "Horse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stable_name_key" ON "Stable"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_name_key" ON "Owner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Race_id_key" ON "Race"("id");

-- AddForeignKey
ALTER TABLE "Horse" ADD CONSTRAINT "Horse_stableId_fkey" FOREIGN KEY ("stableId") REFERENCES "Stable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horse" ADD CONSTRAINT "Horse_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
