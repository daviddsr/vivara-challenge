import { Contract } from '../entities/contract';

export interface ContractsRepositoryInterface {
  findContractsByProfileId(profileId: string): Promise<Contract[]>;
}
