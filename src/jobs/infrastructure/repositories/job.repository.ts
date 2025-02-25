import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';
import { JobRepository } from '../../domain/repositories/job.repository';
import { Job } from '../../domain/entities/job';
import { ContractStatus } from '../../../contracts/domain/enums/contract-status.enum';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class JobPrismaRepository
  extends PrismaService
  implements JobRepository
{
  async findById(jobId: string): Promise<Job | undefined> {
    const job = await this.job.findUnique({
      where: { id: jobId },
    });

    if (!job) return undefined;

    return new Job(
      job.id,
      job.description,
      job.price instanceof Decimal
        ? job.price.toNumber()
        : (job.price as number),
      job.contractId,
      job.paid,
      job.paymentDate ?? undefined,
    );
  }

  async findUnpaidJobsByProfileId(profileId: string): Promise<Job[]> {
    const jobs = await this.job.findMany({
      where: {
        paid: false,
        contract: {
          status: {
            not: ContractStatus.TERMINATED,
          },
          OR: [{ clientId: profileId }, { contractorId: profileId }],
        },
      },
    });

    return jobs.map(
      (job) =>
        new Job(
          job.id,
          job.description,
          job.price instanceof Decimal
            ? job.price.toNumber()
            : (job.price as number),
          job.contractId,
          job.paid,
          job.paymentDate ?? undefined,
        ),
    );
  }

  async markAsPaid(jobId: string): Promise<void> {
    await this.job.update({
      where: { id: jobId },
      data: { paid: true, paymentDate: new Date() },
    });
  }
}
