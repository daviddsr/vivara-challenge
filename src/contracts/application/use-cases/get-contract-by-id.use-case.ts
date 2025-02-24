import { Inject } from '@nestjs/common';
import { ContractRepositoryInterface } from '../../domain/repositories/contract.repository';

export class GetActiveContractsByProfileIdUseCase {
  constructor(
    @Inject('ContractRepositoryInterface')
    private readonly contractRepository: ContractRepositoryInterface,
  ) {}

  async run(contractId: string) {
    return this.contractRepository.findById(contractId);
  }
}
