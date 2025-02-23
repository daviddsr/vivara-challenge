import { Module } from '@nestjs/common';
import { ProfilesRepository } from './infrastructure/repositories/profile.repository';

@Module({
  providers: [
    {
      provide: 'ProfilesRepositoryInterface',
      useClass: ProfilesRepository,
    },
  ],
  exports: ['ProfilesRepositoryInterface'],
})
export class ProfilesModule {}
