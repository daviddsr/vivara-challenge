-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('client', 'contractor');

-- CreateTable
CREATE TABLE "Profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,
    "type" "ProfileType" NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);
