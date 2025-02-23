import { ContractsRepositoryInterface } from '../../domain/repositories/contracts-repository.interface';

export class GetContractsByProfileIdUseCase {
  constructor(
    private readonly contractsRepository: ContractsRepositoryInterface,
  ) {}

  async run(profileId: string) {
    return this.contractsRepository.findContractsByProfileId(profileId);
  }
}
