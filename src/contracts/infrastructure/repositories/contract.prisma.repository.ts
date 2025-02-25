import { ContractRepository } from '../../domain/repositories/contract.repository';
import { Contract } from '../../domain/entities/contract';
import { ContractStatus } from '../../domain/enums/contract-status.enum';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';

export class ContractPrismaRepository
  extends PrismaService
  implements ContractRepository
{
  async findActiveContractsByProfileId(profileId: string): Promise<Contract[]> {
    const contracts = await this.contract.findMany({
      where: {
        NOT: { status: ContractStatus.TERMINATED },
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

  async findById(contractId: string): Promise<Contract | null> {
    const contract = await this.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) return null;

    return new Contract(
      contract.terms,
      contract.clientId,
      contract.contractorId,
      ContractStatus[contract.status],
      contract.id,
    );
  }
}
