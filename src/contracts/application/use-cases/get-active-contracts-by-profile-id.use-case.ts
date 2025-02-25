import { Inject, Injectable } from '@nestjs/common';
import { ContractRepository } from '../../domain/repositories/contract.repository';

@Injectable()
export class GetActiveContractsByProfileIdUseCase {
  constructor(
    @Inject('ContractRepository')
    private readonly contractRepository: ContractRepository,
  ) {}

  async run(profileId: string) {
    return this.contractRepository.findActiveContractsByProfileId(profileId);
  }
}
