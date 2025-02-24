import { Profile } from '../entities/profile';

export interface ProfileRepositoryInterface {
  findProfileById(profileId: string): Promise<Profile | null>;
}
