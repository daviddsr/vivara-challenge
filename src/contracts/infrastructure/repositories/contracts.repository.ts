import { ContractsRepositoryInterface } from '../../domain/repositories/contracts-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { ContractStatus } from '../../domain/enums/contract-status.enum';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';

export class ContractsRepository
  extends PrismaService
  implements ContractsRepositoryInterface
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
}
