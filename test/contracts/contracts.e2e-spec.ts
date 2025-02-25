import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/shared/infrastructure/database/prisma.service';
import { ContractStatus } from '../../src/contracts/domain/enums/contract-status.enum';
import { ProfileType } from '../../src/profiles/domain/enums/profile-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { ProfilePrismaRepository } from '../../src/profiles/infrastructure/repositories/profile.prisma.repository';
import { ContractPrismaRepository } from '../../src/contracts/infrastructure/repositories/contract.prisma.repository';

describe('ContractController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: 'ProfileRepositoryInterface',
          useClass: ProfilePrismaRepository,
        },
        {
          provide: 'ContractRepository',
          useClass: ContractPrismaRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /contracts', () => {
    it('should return error if there is no profile_id', async () => {
      const response = await request(app.getHttpServer()).get('/contracts');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Header 'profile_id' is required");
    });

    it('should return error if profile_id does not exist in database', async () => {
      const response = await request(app.getHttpServer())
        .get('/contracts')
        .set('profile_id', uuidv4());

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid profile_id');
    });

    it('should return a list of active contracts from given profile', async () => {
      const profile = await prisma.profile.create({
        data: {
          id: uuidv4(),
          firstName: 'David',
          lastName: 'Soler',
          profession: 'Developer',
          balance: 1000,
          type: ProfileType.CLIENT,
        },
      });

      const profile2 = await prisma.profile.create({
        data: {
          id: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          profession: 'Developer',
          balance: 1000,
          type: ProfileType.CONTRACTOR,
        },
      });

      const profile3 = await prisma.profile.create({
        data: {
          id: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          profession: 'Developer',
          balance: 1000,
          type: ProfileType.CONTRACTOR,
        },
      });

      const contract = await prisma.contract.create({
        data: {
          id: uuidv4(),
          terms: 'Example terms',
          status: ContractStatus.IN_PROGRESS,
          clientId: profile.id,
          contractorId: profile2.id,
        },
      });

      await prisma.contract.create({
        data: {
          id: uuidv4(),
          terms: 'Example terms',
          status: ContractStatus.IN_PROGRESS,
          clientId: profile2.id,
          contractorId: profile3.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/contracts')
        .set('profile_id', profile.id);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe(contract.id);
    });
  });
});
