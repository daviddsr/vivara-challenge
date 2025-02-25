import { Controller, Get, Param, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetUnpaidJobsByProfileIdUseCase } from '../../../application/use-cases/get-unpaid-jobs-by-profile-id.use-case';
import { PayJobUseCase } from '../../../application/use-cases/pay-job.use-case';
import { PayJobDTO } from './dto/pay-job.dto';

@Controller('jobs')
export class JobController {
  constructor(
    private readonly getUnpaidJobsByProfileIdUseCase: GetUnpaidJobsByProfileIdUseCase,
    private readonly payJobUseCase: PayJobUseCase,
  ) {}

  @Get('unpaid')
  async getUnpaidJobsByProfileId(@Req() req: Request) {
    return this.getUnpaidJobsByProfileIdUseCase.run(req.profileId);
  }

  @Put(':id/pay')
  async payJob(
    @Param() payJobDto: PayJobDTO,
    @Req() req: Request,
  ): Promise<void> {
    const { id: jobId } = payJobDto;

    await this.payJobUseCase.run(jobId, req.profileId);
  }
}
