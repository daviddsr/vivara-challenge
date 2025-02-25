import { Profile } from '../entities/profile';

export interface ProfileRepository {
  findProfileById(profileId: string): Promise<Profile | undefined>;
  updateBalance(profileId: string, newBalance: number): Promise<void>;
}
