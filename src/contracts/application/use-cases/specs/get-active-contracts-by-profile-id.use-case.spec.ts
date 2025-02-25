import { Contract } from '../../../domain/entities/contract';
import { GetActiveContractsByProfileIdUseCase } from '../get-active-contracts-by-profile-id.use-case';
import { ContractStatus } from '../../../domain/enums/contract-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { ContractRepositoryInterface } from '../../../domain/repositories/contract.repository';
import { mock } from 'jest-mock-extended';

describe('GetActiveContractsByProfileIdUseCase', () => {
  let useCase: GetActiveContractsByProfileIdUseCase;
  let contractRepository: jest.Mocked<ContractRepositoryInterface>;
  const profileId = uuidv4();
  const contract = new Contract(
    'Test contract',
    profileId,
    uuidv4(),
    ContractStatus.IN_PROGRESS,
  );

  beforeEach(() => {
    contractRepository = mock<ContractRepositoryInterface>();
    useCase = new GetActiveContractsByProfileIdUseCase(contractRepository);
  });

  it('should return a list of contracts from a given profile', async () => {
    contractRepository.findActiveContractsByProfileId.mockResolvedValue([
      contract,
    ]);

    const result = await useCase.run(profileId);

    expect(result).toEqual([contract]);

    expect(
      contractRepository.findActiveContractsByProfileId,
    ).toHaveBeenCalledWith(profileId);
  });
});
