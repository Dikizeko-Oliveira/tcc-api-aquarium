/*
  Warnings:

  - You are about to alter the column `temperature` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "temperature" SET DATA TYPE INTEGER;
