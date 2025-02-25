import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetUnpaidJobsByProfileIdUseCase } from '../../../application/use-cases/get-unpaid-jobs-by-profile-id.use-case';

@Controller('jobs')
export class JobController {
  constructor(
    @Inject('GetUnpaidJobsByProfileIdUseCase')
    private readonly getUnpaidJobsByProfileIdUseCase: GetUnpaidJobsByProfileIdUseCase,
  ) {}

  @Get('unpaid')
  async getUnpaidJobsByProfileId(@Req() req: Request) {
    return this.getUnpaidJobsByProfileIdUseCase.run(req.profileId);
  }
}
