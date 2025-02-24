import { Module } from '@nestjs/common';
import { ContractsRepository } from './infrastructure/repositories/contracts.repository';
import { GetActiveContractsByProfileIdUseCase } from './application/use-cases/get-active-contracts-by-profile-id.use-case';
import { ContractsController } from './infrastructure/http/controllers/contracts.controller';

@Module({
  controllers: [ContractsController],
  providers: [
    {
      provide: 'ContractsRepositoryInterface',
      useClass: ContractsRepository,
    },
    GetActiveContractsByProfileIdUseCase,
  ],
  exports: [
    'ContractsRepositoryInterface',
    GetActiveContractsByProfileIdUseCase,
  ],
})
export class ContractsModule {}
