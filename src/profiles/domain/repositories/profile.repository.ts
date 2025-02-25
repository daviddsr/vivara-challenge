import { Profile } from '../entities/profile';

export interface ProfileRepository {
  findProfileById(profileId: string): Promise<Profile | null>;
}
