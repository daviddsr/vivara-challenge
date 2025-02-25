import { Contract } from '../entities/contract';

export interface ContractRepositoryInterface {
  findActiveContractsByProfileId(profileId: string): Promise<Contract[]>;
  findById(contractId: string): Promise<Contract | null>;
}
