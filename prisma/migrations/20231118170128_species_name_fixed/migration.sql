/*
  Warnings:

  - You are about to drop the column `epecies` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "epecies",
ADD COLUMN     "species" TEXT;
