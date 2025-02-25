import { Inject } from '@nestjs/common';
import { ContractRepositoryInterface } from '../../domain/repositories/contract.repository';
import { ContractNotFoundException } from '../../domain/exceptions/contract-not-found.exception';
import { ForbiddenContractAccessException } from '../../domain/exceptions/forbidden-contract-access.exception';

export class GetContractByIdUseCase {
  constructor(
    @Inject('ContractRepositoryInterface')
    private readonly contractRepository: ContractRepositoryInterface,
  ) {}

  async run(contractId: string, profileId: string) {
    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new ContractNotFoundException();
    }

    if (
      contract.clientId !== profileId &&
      contract.contractorId !== profileId
    ) {
      throw new ForbiddenContractAccessException();
    }

    return contract;
  }
}
