import { Module } from '@nestjs/common';
import { ContractsRepository } from './infrastructure/repositories/contracts.repository';
import { GetContractsByProfileIdUseCase } from './application/use-cases/get-contracts-by-profile-id.use-case';

@Module({
  providers: [
    {
      provide: 'ContractsRepositoryInterface',
      useClass: ContractsRepository,
    },
    GetContractsByProfileIdUseCase,
  ],
  exports: [GetContractsByProfileIdUseCase],
})
export class ContractsModule {}
