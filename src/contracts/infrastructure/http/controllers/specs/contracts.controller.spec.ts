import { ContractsController } from '../../../../infrastructure/http/controllers/contracts.controller';
import { GetActiveContractsByProfileIdUseCase } from '../../../../application/use-cases/get-active-contracts-by-profile-id.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { Contract } from '../../../../domain/entities/contract';
import { ContractStatus } from '../../../../domain/enums/contract-status.enum';
import { mock } from 'jest-mock-extended';
import { Request } from 'express';

describe('ContractsController', () => {
  let controller: ContractsController;
  let mockGetContractsByProfileIdUseCase: GetActiveContractsByProfileIdUseCase;

  const profileId = uuidv4();
  const contract = new Contract(
    'Test contract',
    profileId,
    uuidv4(),
    ContractStatus.IN_PROGRESS,
  );

  beforeEach(async () => {
    mockGetContractsByProfileIdUseCase = {
      run: jest.fn(),
    } as unknown as GetActiveContractsByProfileIdUseCase;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
      providers: [
        {
          provide: GetActiveContractsByProfileIdUseCase,
          useValue: mockGetContractsByProfileIdUseCase,
        },
      ],
    }).compile();

    controller = module.get<ContractsController>(ContractsController);
  });

  it('GET /contracts should return a list of active contracts', async () => {
    jest
      .spyOn(mockGetContractsByProfileIdUseCase, 'run')
      .mockResolvedValue([contract]);

    const mockRequest = mock<Request>();
    mockRequest.profileId = profileId;

    const result = await controller.getActiveContractsByProfileId(mockRequest);

    expect(mockGetContractsByProfileIdUseCase.run).toHaveBeenCalledWith(
      profileId,
    );
    expect(result).toEqual([contract]);
  });
});
