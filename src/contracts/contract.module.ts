import { Module } from '@nestjs/common';
import { ContractRepository } from './infrastructure/repositories/contract.repository';
import { GetActiveContractsByProfileIdUseCase } from './application/use-cases/get-active-contracts-by-profile-id.use-case';
import { ContractController } from './infrastructure/http/controllers/contract.controller';

@Module({
  controllers: [ContractController],
  providers: [
    {
      provide: 'ContractRepositoryInterface',
      useClass: ContractRepository,
    },
    GetActiveContractsByProfileIdUseCase,
  ],
  exports: [
    'ContractRepositoryInterface',
    GetActiveContractsByProfileIdUseCase,
  ],
})
export class ContractModule {}
