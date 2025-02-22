import { Profile } from '../profile';
import { ProfileType } from '../../enums/profile-type.enum';
import { validate } from 'class-validator';

describe('Profile', () => {
  it('creates a valid Profile', async () => {
    const profile = new Profile(
      'David',
      'Soler',
      'Journalist',
      10000,
      ProfileType.CLIENT,
    );
    const errors = await validate(profile);
    expect(errors.length).toBe(0);
  });

  it('validates first name', async () => {
    const profile = new Profile(
      '',
      'Soler',
      'Journalist',
      10000,
      ProfileType.CLIENT,
    );
    const errors = await validate(profile);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('validates balance cannot be negative when creation', async () => {
    const profile = new Profile(
      'David',
      'Soler',
      'Journalist',
      -1000,
      ProfileType.CLIENT,
    );
    const errors = await validate(profile);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('validates type', async () => {
    const profile = new Profile(
      'Juan',
      'Pérez',
      'Ingeniero',
      5000,
      'not_a_valid_type' as ProfileType,
    );
    const errors = await validate(profile);
    expect(errors.length).toBeGreaterThan(0);
  });
});
