import { ContractsRepositoryInterface } from '../../domain/repositories/contracts-repository.interface';

export class GetActiveContractsByProfileIdUseCase {
  constructor(
    private readonly contractsRepository: ContractsRepositoryInterface,
  ) {}

  async run(profileId: string) {
    return this.contractsRepository.findActiveContractsByProfileId(profileId);
  }
}
