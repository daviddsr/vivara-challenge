import {
  Controller,
  Get,
  Param,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { GetActiveContractsByProfileIdUseCase } from '../../../application/use-cases/get-active-contracts-by-profile-id.use-case';
import { GetContractByIdUseCase } from '../../../application/use-cases/get-contract-by-id.use-case';
import { GetContractByIdDto } from '../dto/get-contract-by-id.dto';

@Controller('contracts')
export class ContractController {
  constructor(
    private readonly getActiveContractsByProfileIdUseCase: GetActiveContractsByProfileIdUseCase,
    private readonly getContractByIdUseCase: GetContractByIdUseCase,
  ) {}

  @Get()
  async getActiveContractsByProfileId(@Req() req: Request) {
    return this.getActiveContractsByProfileIdUseCase.run(req.profileId);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getContractById(
    @Param() params: GetContractByIdDto,
    @Req() req: Request,
  ) {
    const { id: contractId } = params;

    return this.getContractByIdUseCase.run(contractId, req.profileId);
  }
}
