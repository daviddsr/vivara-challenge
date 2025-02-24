import { Module } from '@nestjs/common';
import { ProfileRepository } from './infrastructure/repositories/profile.repository';

@Module({
  providers: [
    {
      provide: 'ProfileRepositoryInterface',
      useClass: ProfileRepository,
    },
  ],
  exports: ['ProfileRepositoryInterface'],
})
export class ProfileModule {}
