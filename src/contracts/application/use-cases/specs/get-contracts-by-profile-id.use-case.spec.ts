import { Contract } from '../../../domain/entities/contract';
import { GetContractsByProfileIdUseCase } from '../../use-cases/get-contracts-by-profile-id.use-case';
import { ContractStatus } from '../../../domain/enums/contract-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { ContractsRepositoryInterface } from '../../../domain/repositories/contracts-repository.interface';

describe('GetContractsByProfileIdUseCase', () => {
  let useCase: GetContractsByProfileIdUseCase;
  let contractsRepository: ContractsRepositoryInterface;
  const profileId = uuidv4();
  const contract = new Contract(
    'Test contract',
    profileId,
    uuidv4(),
    ContractStatus.IN_PROGRESS,
  );

  beforeEach(() => {
    contractsRepository = {
      findContractsByProfileId: jest.fn().mockResolvedValue([contract]),
    };

    useCase = new GetContractsByProfileIdUseCase(contractsRepository);
  });

  it('should return a list of contracts from a given profile', async () => {
    const result = await useCase.run(profileId);

    expect(result).toEqual([contract]);

    expect(contractsRepository.findContractsByProfileId).toHaveBeenCalledWith(
      profileId,
    );
  });
});
