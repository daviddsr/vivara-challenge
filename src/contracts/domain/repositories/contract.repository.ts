import { Contract } from '../entities/contract';

export interface ContractRepository {
  findActiveContractsByProfileId(profileId: string): Promise<Contract[]>;
  findById(contractId: string): Promise<Contract | null>;
}
