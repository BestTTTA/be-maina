-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('PAID', 'FREE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "BaitType" AS ENUM ('LIVE', 'ARTIFICIAL', 'NATURAL');

-- CreateEnum
CREATE TYPE "EffectivenessLevel" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "googleId" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingSpot" (
    "id" TEXT NOT NULL,
    "addressName" TEXT NOT NULL,
    "spotImageUrl" TEXT NOT NULL,
    "fee" "FeeType" NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FishingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catch" (
    "id" TEXT NOT NULL,
    "fishName" TEXT NOT NULL,
    "fishImageUrl" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Catch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bait" (
    "id" TEXT NOT NULL,
    "type" "BaitType" NOT NULL,
    "brand" TEXT NOT NULL,
    "effectiveness" "EffectivenessLevel" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "catchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bait_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Bait_catchId_key" ON "Bait"("catchId");

-- AddForeignKey
ALTER TABLE "FishingSpot" ADD CONSTRAINT "FishingSpot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catch" ADD CONSTRAINT "Catch_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "FishingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bait" ADD CONSTRAINT "Bait_catchId_fkey" FOREIGN KEY ("catchId") REFERENCES "Catch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
