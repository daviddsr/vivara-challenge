import { Inject } from '@nestjs/common';
import { ContractRepositoryInterface } from '../../domain/repositories/contract.repository';

export class GetActiveContractsByProfileIdUseCase {
  constructor(
    @Inject('ContractsRepositoryInterface')
    private readonly contractRepository: ContractRepositoryInterface,
  ) {}

  async run(profileId: string) {
    return this.contractRepository.findActiveContractsByProfileId(profileId);
  }
}
