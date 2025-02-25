import { Module } from '@nestjs/common';
import { GetUnpaidJobsByProfileIdUseCase } from './application/use-cases/get-unpaid-jobs-by-profile-id.use-case';
import { JobPrismaRepository } from './infrastructure/repositories/job.repository';
import { JobController } from './infrastructure/http/controllers/job.controller';
import { PayJobUseCase } from './application/use-cases/pay-job.use-case';
import { ProfileModule } from '../profiles/profile.module';
import { ContractModule } from '../contracts/contract.module';

@Module({
  controllers: [JobController],
  imports: [ProfileModule, ContractModule],
  providers: [
    {
      provide: 'JobRepository',
      useClass: JobPrismaRepository,
    },
    GetUnpaidJobsByProfileIdUseCase,
    PayJobUseCase,
  ],
  exports: ['JobRepository'],
})
export class JobModule {}
