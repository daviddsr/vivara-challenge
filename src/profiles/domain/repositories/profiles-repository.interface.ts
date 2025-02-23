import { Profile } from '../entities/profile';

export interface ProfilesRepositoryInterface {
  findProfileById(profileId: string): Promise<Profile | null>;
}
