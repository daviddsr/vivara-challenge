import { Module } from '@nestjs/common';
import { ProfilePrismaRepository } from './infrastructure/repositories/profile.prisma.repository';

@Module({
  providers: [
    {
      provide: 'ProfileRepositoryInterface',
      useClass: ProfilePrismaRepository,
    },
  ],
  exports: ['ProfileRepositoryInterface'],
})
export class ProfileModule {}
