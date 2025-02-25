import { Job } from '../entities/job';

export interface JobRepositoryInterface {
  findUnpaidJobsByProfileId(profileId: string): Promise<Job[]>;
}
