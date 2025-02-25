import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/shared/infrastructure/database/prisma.service';
import { ProfileType } from '../../src/profiles/domain/enums/profile-type.enum';
import { ContractStatus } from '../../src/contracts/domain/enums/contract-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { JobPrismaRepository } from '../../src/jobs/infrastructure/repositories/job.repository';

describe('JobsController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jobRepository: JobPrismaRepository;
  let clientProfileId: string;
  let contractorProfileId: string;
  let contractId: string;
  let jobId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: 'JobRepository',
          useClass: JobPrismaRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jobRepository = moduleFixture.get<JobPrismaRepository>('JobRepository');

    clientProfileId = uuidv4();
    contractorProfileId = uuidv4();
    contractId = uuidv4();
    jobId = uuidv4();

    await prisma.profile.createMany({
      data: [
        {
          id: clientProfileId,
          firstName: 'John',
          lastName: 'Doe',
          profession: 'Client',
          balance: 2000,
          type: ProfileType.CLIENT,
        },
        {
          id: contractorProfileId,
          firstName: 'Jane',
          lastName: 'Smith',
          profession: 'Developer',
          balance: 500,
          type: ProfileType.CONTRACTOR,
        },
      ],
    });

    await prisma.contract.create({
      data: {
        id: contractId,
        terms: 'Test contract terms',
        status: ContractStatus.IN_PROGRESS,
        clientId: clientProfileId,
        contractorId: contractorProfileId,
      },
    });

    await prisma.job.create({
      data: {
        id: jobId,
        description: 'Build an API',
        price: 1000,
        paid: false,
        contractId,
      },
    });
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.job.deleteMany(),
      prisma.contract.deleteMany(),
      prisma.profile.deleteMany(),
    ]);
    await app.close();
  });

  describe('PUT /jobs/:id/pay', () => {
    it('should pay for the job successfully', async () => {
      await request(app.getHttpServer())
        .put(`/jobs/${jobId}/pay`)
        .set('profile_id', clientProfileId)
        .expect(200);

      const updatedJob = await jobRepository.findById(jobId);
      expect(updatedJob?.paid).toBe(true);
      expect(updatedJob?.paymentDate).not.toBeNull();

      const updatedClient = await prisma.profile.findUnique({
        where: { id: clientProfileId },
      });
      const updatedContractor = await prisma.profile.findUnique({
        where: { id: contractorProfileId },
      });

      expect(updatedClient?.balance.toNumber()).toBe(1000);
      expect(updatedContractor?.balance.toNumber()).toBe(1500);
    });

    it('should return error if job is already paid', async () => {
      const response = await request(app.getHttpServer())
        .put(`/jobs/${jobId}/pay`)
        .set('profile_id', clientProfileId)
        .expect(403);

      expect(response.body.message).toBe('This job is already paid');
    });

    it('should return error if client has insufficient balance', async () => {
      await prisma.profile.update({
        where: { id: clientProfileId },
        data: { balance: 500 },
      });

      const newJobId = uuidv4();
      await prisma.job.create({
        data: {
          id: newJobId,
          description: 'New Task',
          price: 1000,
          paid: false,
          contractId,
        },
      });

      const response = await request(app.getHttpServer())
        .put(`/jobs/${newJobId}/pay`)
        .set('profile_id', clientProfileId)
        .expect(403);

      expect(response.body.message).toBe(
        'Insufficient balance to pay for this job',
      );
    });

    it('should return error if job does not exist', async () => {
      const nonExistentJobId = uuidv4();

      const response = await request(app.getHttpServer())
        .put(`/jobs/${nonExistentJobId}/pay`)
        .set('profile_id', clientProfileId)
        .expect(404);

      expect(response.body.message).toBe('Job not found');
    });
  });
});
