import { Module } from '@nestjs/common';
import { ProfilePrismaRepository } from './infrastructure/repositories/profile.prisma.repository';

@Module({
  providers: [
    {
      provide: 'ProfileRepository',
      useClass: ProfilePrismaRepository,
    },
  ],
  exports: ['ProfileRepository'],
})
export class ProfileModule {}
