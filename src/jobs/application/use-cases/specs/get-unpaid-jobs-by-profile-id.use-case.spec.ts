import { GetUnpaidJobsByProfileIdUseCase } from '../get-unpaid-jobs-by-profile-id.use-case';
import { Job } from '../../../domain/entities/job';
import { mock } from 'jest-mock-extended';
import { v4 as uuidv4 } from 'uuid';
import { JobRepositoryInterface } from '../../../domain/repositories/job.repository';

describe('GetUnpaidJobsByProfileIdUseCase', () => {
  let useCase: GetUnpaidJobsByProfileIdUseCase;
  let jobRepository: jest.Mocked<JobRepositoryInterface>;
  const profileId = uuidv4();

  beforeEach(() => {
    jobRepository = mock<JobRepositoryInterface>();
    useCase = new GetUnpaidJobsByProfileIdUseCase(jobRepository);
  });

  it('should return unpaid jobs for a given profile', async () => {
    const job1 = new Job(
      'Job 1',
      100,
      'contractId1',
      false,
      undefined,
      'jobId1',
    );
    const job2 = new Job(
      'Job 2',
      200,
      'contractId2',
      false,
      undefined,
      'jobId2',
    );

    jobRepository.findUnpaidJobsByProfileId.mockResolvedValue([job1, job2]);

    const result = await useCase.run(profileId);

    expect(jobRepository.findUnpaidJobsByProfileId).toHaveBeenCalledWith(
      profileId,
    );
    expect(result).toEqual([job1, job2]);
  });

  it('should return an empty array if no unpaid jobs exist for profile', async () => {
    jobRepository.findUnpaidJobsByProfileId.mockResolvedValue([]);

    const result = await useCase.run(profileId);

    expect(jobRepository.findUnpaidJobsByProfileId).toHaveBeenCalledWith(
      profileId,
    );
    expect(result).toEqual([]);
  });
});
