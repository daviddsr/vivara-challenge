import { Inject, Injectable } from '@nestjs/common';
import { Job } from '../../domain/entities/job';
import { JobRepositoryInterface } from '../../domain/repositories/job.repository';

@Injectable()
export class GetUnpaidJobsByProfileIdUseCase {
  constructor(
    @Inject('JobRepositoryInterface')
    private readonly jobsRepository: JobRepositoryInterface,
  ) {}

  async run(profileId: string): Promise<Job[]> {
    return this.jobsRepository.findUnpaidJobsByProfileId(profileId);
  }
}
