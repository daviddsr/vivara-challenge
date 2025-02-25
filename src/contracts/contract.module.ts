import { Module } from '@nestjs/common';
import { ContractPrismaRepository } from './infrastructure/repositories/contract.prisma.repository';
import { GetActiveContractsByProfileIdUseCase } from './application/use-cases/get-active-contracts-by-profile-id.use-case';
import { ContractController } from './infrastructure/http/controllers/contract.controller';
import { GetContractByIdUseCase } from './application/use-cases/get-contract-by-id.use-case';

@Module({
  controllers: [ContractController],
  providers: [
    {
      provide: 'ContractRepository',
      useClass: ContractPrismaRepository,
    },
    GetActiveContractsByProfileIdUseCase,
    GetContractByIdUseCase,
  ],
  exports: ['ContractRepository'],
})
export class ContractModule {}
