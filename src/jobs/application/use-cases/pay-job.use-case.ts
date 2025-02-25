import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JobRepository } from '../../domain/repositories/job.repository';
import { ProfileRepository } from '../../../profiles/domain/repositories/profile.repository';
import { PrismaService } from '../../../shared/infrastructure/database/prisma.service';
import { ProfileType } from 'src/profiles/domain/enums/profile-type.enum';
import { ContractRepository } from 'src/contracts/domain/repositories/contract.repository';
import { Profile } from 'src/profiles/domain/entities/profile';
import { Job } from 'src/jobs/domain/entities/job';

@Injectable()
export class PayJobUseCase {
  constructor(
    @Inject('JobRepository')
    private readonly jobRepository: JobRepository,
    @Inject('ProfileRepository')
    private readonly profileRepository: ProfileRepository,
    @Inject('ContractRepository')
    private readonly contractRepository: ContractRepository,
    private readonly prisma: PrismaService,
  ) {}

  async run(jobId: string, profileId: string): Promise<void> {
    const job = await this.findJob(jobId);

    if (job.paid) throw new ForbiddenException('This job is already paid');

    const client = await this.findClient(profileId);

    if (!client) throw new NotFoundException('Client profile not found');

    this.checkIfClientCanPay(client, job.price);

    await this.makePayment(client, job);
  }

  private async findJob(jobId: string): Promise<Job> {
    const job = await this.jobRepository.findById(jobId);

    if (!job) throw new NotFoundException('Job not found');

    return job;
  }

  private checkIfClientCanPay(client: Profile, priceJob: number) {
    if (client.type !== ProfileType.CLIENT) {
      throw new ForbiddenException('Only clients can pay for jobs');
    }

    if (client.balance < priceJob) {
      throw new ForbiddenException('Insufficient balance to pay for this job');
    }
  }

  private async makePayment(client: Profile, job: Job) {
    const contract = await this.contractRepository.findById(job.contractId);

    if (!contract) throw new NotFoundException('Contract not found');

    const contractor = await this.findClient(contract.contractorId);

    if (!contractor)
      throw new NotFoundException('Contractor profile not found');

    await this.prisma.$transaction(async () => {
      await this.profileRepository.updateBalance(
        client.id,
        client.balance - job.price,
      );
      await this.profileRepository.updateBalance(
        contractor.id,
        contractor.balance + job.price,
      );
      await this.jobRepository.markAsPaid(job.id);
    });
  }

  private async findClient(clientId: string): Promise<Profile | undefined> {
    return await this.profileRepository.findProfileById(clientId);
  }
}
