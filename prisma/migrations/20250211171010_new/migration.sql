/*
  Warnings:

  - You are about to drop the column `catchDate` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `weather` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the column `bestTime` on the `MarkedSpot` table. All the data in the column will be lost.
  - You are about to drop the column `facilities` on the `MarkedSpot` table. All the data in the column will be lost.
  - You are about to drop the column `fishTypes` on the `MarkedSpot` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `MarkedSpot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "catchDate",
DROP COLUMN "length",
DROP COLUMN "note",
DROP COLUMN "weather",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "MarkedSpot" DROP COLUMN "bestTime",
DROP COLUMN "facilities",
DROP COLUMN "fishTypes",
DROP COLUMN "isPublic";
