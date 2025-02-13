/*
  Warnings:

  - You are about to drop the column `fishImageUrl` on the `Catch` table. All the data in the column will be lost.
  - You are about to drop the `FishingSpot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Bait` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catchDate` to the `Catch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Catch" DROP CONSTRAINT "Catch_spotId_fkey";

-- DropForeignKey
ALTER TABLE "FishingSpot" DROP CONSTRAINT "FishingSpot_userId_fkey";

-- AlterTable
ALTER TABLE "Bait" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Catch" DROP COLUMN "fishImageUrl",
ADD COLUMN     "catchDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "weather" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- DropTable
DROP TABLE "FishingSpot";

-- CreateTable
CREATE TABLE "MarkedSpot" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fee" "FeeType" NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "facilities" TEXT[],
    "bestTime" TEXT,
    "fishTypes" TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MarkedSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "markedSpotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpotImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatchImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "catchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatchImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MarkedSpot" ADD CONSTRAINT "MarkedSpot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotImage" ADD CONSTRAINT "SpotImage_markedSpotId_fkey" FOREIGN KEY ("markedSpotId") REFERENCES "MarkedSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "MarkedSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatchImage" ADD CONSTRAINT "CatchImage_catchId_fkey" FOREIGN KEY ("catchId") REFERENCES "Catch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
