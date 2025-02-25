import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';
import { ProfileRepository } from '../../domain/repositories/profile.repository';
import { Profile } from '../../domain/entities/profile';
import { ProfileType } from '../../domain/enums/profile-type.enum';

@Injectable()
export class ProfilePrismaRepository
  extends PrismaService
  implements ProfileRepository
{
  async findProfileById(profileId: string): Promise<Profile | null> {
    const profile = await this.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) return null;

    return new Profile(
      profile.firstName,
      profile.lastName,
      profile.profession,
      profile.balance instanceof Decimal
        ? profile.balance.toNumber()
        : (profile.balance as number),
      ProfileType[profile.type],
      profile.id,
    );
  }
}
