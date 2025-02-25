import { Module } from '@nestjs/common';
import { GetUnpaidJobsByProfileIdUseCase } from './application/use-cases/get-unpaid-jobs-by-profile-id.use-case';
import { JobRepository } from './infrastructure/repositories/job.repository';
import { JobController } from './infrastructure/http/controllers/job.controller';

@Module({
  controllers: [JobController],
  providers: [
    {
      provide: 'JobRepositoryInterface',
      useClass: JobRepository,
    },
    {
      provide: 'GetUnpaidJobsByProfileIdUseCase',
      useClass: GetUnpaidJobsByProfileIdUseCase,
    },
  ],
  exports: ['JobRepositoryInterface'],
})
export class JobModule {}
