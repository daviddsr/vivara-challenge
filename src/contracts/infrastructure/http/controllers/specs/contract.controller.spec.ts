import { ContractController } from '../contract.controller';
import { GetActiveContractsByProfileIdUseCase } from '../../../../application/use-cases/get-active-contracts-by-profile-id.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { Contract } from '../../../../domain/entities/contract';
import { ContractStatus } from '../../../../domain/enums/contract-status.enum';
import { mock } from 'jest-mock-extended';
import { Request } from 'express';
import { GetContractByIdUseCase } from '../../../../application/use-cases/get-contract-by-id.use-case';
import { ProfileMiddleware } from '../../../../../shared/infrastructure/middleware/profile.middleware';

describe('ContractController', () => {
  let controller: ContractController;
  let mockGetContractsByProfileIdUseCase: GetActiveContractsByProfileIdUseCase;
  let getContractByIdUseCase: jest.Mocked<GetContractByIdUseCase>;

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
      controllers: [ContractController],
      providers: [
        {
          provide: GetActiveContractsByProfileIdUseCase,
          useValue: mockGetContractsByProfileIdUseCase,
        },
        {
          provide: GetContractByIdUseCase,
          useValue: {
            run: jest.fn(),
          } as unknown as jest.Mocked<GetContractByIdUseCase>,
        },
      ],
    })
      .overrideProvider(ProfileMiddleware)
      .useValue({ use: jest.fn((req, res, next) => next()) })
      .compile();

    controller = module.get<ContractController>(ContractController);
    getContractByIdUseCase = module.get(
      GetContractByIdUseCase,
    ) as jest.Mocked<GetContractByIdUseCase>;
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

  it('GET /contracts/:id should return contract if profileId has access', async () => {
    const profileId = uuidv4();
    const contractId = uuidv4();
    const contract = new Contract(
      'Test contract',
      profileId,
      uuidv4(),
      ContractStatus.IN_PROGRESS,
    );

    jest.spyOn(getContractByIdUseCase, 'run').mockResolvedValue(contract);

    const mockRequest = mock<Request>();
    mockRequest.profileId = profileId;

    const result = await controller.getContractById(
      { id: contractId },
      mockRequest,
    );

    expect(getContractByIdUseCase.run).toHaveBeenCalledWith(
      contractId,
      profileId,
    );
    expect(result).toEqual(contract);
  });
});
