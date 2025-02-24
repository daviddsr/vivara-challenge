import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetActiveContractsByProfileIdUseCase } from '../../../application/use-cases/get-active-contracts-by-profile-id.use-case';

@Controller('contracts')
export class ContractController {
  constructor(
    private readonly getActiveContractsByProfileIdUseCase: GetActiveContractsByProfileIdUseCase,
  ) {}

  @Get()
  async getActiveContractsByProfileId(@Req() req: Request) {
    return this.getActiveContractsByProfileIdUseCase.run(req.profileId);
  }

  @Get(':id')
  async getContractsById(@Req() req: Request) {
    return this.getActiveContractsByProfileIdUseCase.run(req.profileId);
  }
}
