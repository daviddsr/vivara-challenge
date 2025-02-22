-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('client', 'contractor');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('new', 'in_progress', 'terminated');

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

-- CreateTable
CREATE TABLE "Contracts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "terms" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'new',
    "clientId" UUID NOT NULL,
    "contractorId" UUID NOT NULL,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paymentDate" TIMESTAMP(3),
    "contractId" UUID NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
