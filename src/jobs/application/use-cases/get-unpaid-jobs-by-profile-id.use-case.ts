import { Inject, Injectable } from '@nestjs/common';
import { Job } from '../../domain/entities/job';
import { JobRepository } from '../../domain/repositories/job.repository';

@Injectable()
export class GetUnpaidJobsByProfileIdUseCase {
  constructor(
    @Inject('JobRepository')
    private readonly jobRepository: JobRepository,
  ) {}

  async run(profileId: string): Promise<Job[]> {
    return this.jobRepository.findUnpaidJobsByProfileId(profileId);
  }
}
