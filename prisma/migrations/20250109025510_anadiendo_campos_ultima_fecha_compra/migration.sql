/*
  Warnings:

  - Added the required column `identityCard` to the `salePopCorn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastBuyDate` to the `salePopCorn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salePopCorn" ADD COLUMN     "identityCard" TEXT NOT NULL,
ADD COLUMN     "lastBuyDate" TIMESTAMP(3) NOT NULL;
