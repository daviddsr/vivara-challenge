import { PrismaClient } from '@prisma/client';
import { ContractsRepositoryInterface } from '../../domain/repositories/contracts-repository.interface';
import { Contract } from 'src/contracts/domain/entities/contract';
import { ContractStatus } from 'src/contracts/domain/enums/contract-status.enum';

export class ContractsRepository implements ContractsRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findContractsByProfileId(profileId: string): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany({
      where: {
        OR: [{ clientId: profileId }, { contractorId: profileId }],
      },
    });

    return contracts.map(
      (contract) =>
        new Contract(
          contract.terms,
          contract.clientId,
          contract.contractorId,
          ContractStatus[contract.status],
          contract.id,
        ),
    );
  }
}
