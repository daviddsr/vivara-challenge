import { GetContractByIdUseCase } from '../../use-cases/get-contract-by-id.use-case';
import { Contract } from '../../../domain/entities/contract';
import { ContractStatus } from '../../../domain/enums/contract-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { ContractRepositoryInterface } from '../../../domain/repositories/contract.repository';
import { ContractNotFoundException } from '../../../domain/exceptions/contract-not-found.exception';
import { ForbiddenContractAccessException } from '../../../domain/exceptions/forbidden-contract-access.exception';
import { mock } from 'jest-mock-extended';

describe('GetContractByIdUseCase', () => {
  let contractRepository: jest.Mocked<ContractRepositoryInterface>;
  let useCase: GetContractByIdUseCase;

  beforeEach(() => {
    contractRepository = mock<ContractRepositoryInterface>();
    useCase = new GetContractByIdUseCase(contractRepository);
  });

  it('should throw ContractNotFoundException if contract does not exist', async () => {
    const contractId = uuidv4();
    const profileId = uuidv4();

    const spy = jest
      .spyOn(contractRepository, 'findById')
      .mockResolvedValue(null);

    await expect(useCase.run(contractId, profileId)).rejects.toThrow(
      ContractNotFoundException,
    );

    expect(spy).toHaveBeenCalledWith(contractId);
  });

  it('should throw ForbiddenContractAccessException if profileId is not clientId or contractorId', async () => {
    const contractId = uuidv4();
    const profileId = uuidv4();
    const contract = new Contract(
      'Example contract',
      uuidv4(),
      uuidv4(),
      ContractStatus.IN_PROGRESS,
    );

    jest.spyOn(contractRepository, 'findById').mockResolvedValue(contract);

    await expect(useCase.run(contractId, profileId)).rejects.toThrow(
      ForbiddenContractAccessException,
    );
  });

  it('should return contract if profileId is the clientId', async () => {
    const profileId = uuidv4();
    const contractId = uuidv4();
    const contract = new Contract(
      'Test contract',
      profileId,
      uuidv4(),
      ContractStatus.IN_PROGRESS,
    );

    const spy = jest
      .spyOn(contractRepository, 'findById')
      .mockResolvedValue(contract);

    const result = await useCase.run(contractId, profileId);

    expect(result).toBe(contract);
    expect(spy).toHaveBeenCalledWith(contractId);
  });
});
