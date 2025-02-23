import { Contract } from '../entities/contract';

export interface ContractsRepositoryInterface {
  findActiveContractsByProfileId(profileId: string): Promise<Contract[]>;
}
