import { Test, TestingModule } from '@nestjs/testing';
import { GetUnpaidJobsByProfileIdUseCase } from '../../../../application/use-cases/get-unpaid-jobs-by-profile-id.use-case';
import { Job } from '../../../../domain/entities/job';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { JobController } from '../job.controller';
import { JobRepository } from '../../../repositories/job.repository';

describe('JobsController', () => {
  let jobsController: JobController;
  let getUnpaidJobsByProfileIdUseCase: GetUnpaidJobsByProfileIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: 'GetUnpaidJobsByProfileIdUseCase',
          useClass: GetUnpaidJobsByProfileIdUseCase,
        },
        {
          provide: 'JobRepositoryInterface',
          useClass: JobRepository,
        },
      ],
    }).compile();

    jobsController = module.get<JobController>(JobController);
    getUnpaidJobsByProfileIdUseCase =
      module.get<GetUnpaidJobsByProfileIdUseCase>(
        'GetUnpaidJobsByProfileIdUseCase',
      );
  });

  it('should return a list of unpaid jobs from active contracts from a given profile', async () => {
    const profileId = uuidv4();
    const contractId = uuidv4();
    const job = new Job('Job 1', 500, contractId, false);

    jest.spyOn(getUnpaidJobsByProfileIdUseCase, 'run').mockResolvedValue([job]);

    const mockRequest = { profileId } as Request;

    const result = await jobsController.getUnpaidJobsByProfileId(mockRequest);

    expect(getUnpaidJobsByProfileIdUseCase.run).toHaveBeenCalledWith(profileId);
    expect(result).toEqual([job]);
  });
});
