import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';
import { JobRepositoryInterface } from '../../domain/repositories/job.repository';
import { Job } from '../../domain/entities/job';
import { ContractStatus } from '../../../contracts/domain/enums/contract-status.enum';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class JobRepository
  extends PrismaService
  implements JobRepositoryInterface
{
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
          job.description,
          job.price instanceof Decimal
            ? job.price.toNumber()
            : (job.price as number),
          job.contractId,
          job.paid,
          job.paymentDate ?? undefined,
          job.id,
        ),
    );
  }
}
