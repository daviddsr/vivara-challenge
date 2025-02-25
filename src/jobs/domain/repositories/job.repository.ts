import { Job } from '../entities/job';

export interface JobRepository {
  findById(jobId: string): Promise<Job | undefined>;
  findUnpaidJobsByProfileId(profileId: string): Promise<Job[]>;
  markAsPaid(jobId: string): Promise<void>;
}
