import { PrismaClient, ProfileType, ContractStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seed() {
  console.log('Populating database...');

  try {
    await prisma.job.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.profile.deleteMany();

    console.log('Database cleaned');

    const profiles = [
      {
        firstName: 'Harry',
        lastName: 'Potter',
        profession: 'Wizard',
        balance: 1150,
        type: ProfileType.CLIENT,
      },
      {
        firstName: 'Mr',
        lastName: 'Robot',
        profession: 'Hacker',
        balance: 231.11,
        type: ProfileType.CLIENT,
      },
      {
        firstName: 'John',
        lastName: 'Snow',
        profession: 'Knows nothing',
        balance: 451.3,
        type: ProfileType.CLIENT,
      },
      {
        firstName: 'Ash',
        lastName: 'Ketchum',
        profession: 'Pokemon master',
        balance: 1.3,
        type: ProfileType.CLIENT,
      },
      {
        firstName: 'John',
        lastName: 'Lennon',
        profession: 'Musician',
        balance: 64,
        type: ProfileType.CONTRACTOR,
      },
      {
        firstName: 'Linus',
        lastName: 'Torvalds',
        profession: 'Programmer',
        balance: 1214,
        type: ProfileType.CONTRACTOR,
      },
      {
        firstName: 'Alan',
        lastName: 'Turing',
        profession: 'Programmer',
        balance: 22,
        type: ProfileType.CONTRACTOR,
      },
      {
        firstName: 'Aragorn',
        lastName: 'II Elessar Telcontar',
        profession: 'Fighter',
        balance: 314,
        type: ProfileType.CONTRACTOR,
      },
    ];

    const createdProfiles = await Promise.all(
      profiles.map((profile) =>
        prisma.profile.create({
          data: { id: uuidv4(), ...profile },
        }),
      ),
    );

    const contractsData = [
      {
        terms: 'bla bla bla',
        status: ContractStatus.TERMINATED,
        clientId: createdProfiles[0].id,
        contractorId: createdProfiles[4].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[0].id,
        contractorId: createdProfiles[5].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[1].id,
        contractorId: createdProfiles[5].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[1].id,
        contractorId: createdProfiles[6].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.NEW,
        clientId: createdProfiles[2].id,
        contractorId: createdProfiles[7].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[2].id,
        contractorId: createdProfiles[6].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[3].id,
        contractorId: createdProfiles[6].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[3].id,
        contractorId: createdProfiles[5].id,
      },
      {
        terms: 'bla bla bla',
        status: ContractStatus.IN_PROGRESS,
        clientId: createdProfiles[3].id,
        contractorId: createdProfiles[7].id,
      },
    ];

    const createdContracts = await Promise.all(
      contractsData.map((contract) =>
        prisma.contract.create({
          data: { id: uuidv4(), ...contract },
        }),
      ),
    );

    const jobsData = [
      { description: 'work', price: 2000, contractId: createdContracts[0].id },
      { description: 'work', price: 201, contractId: createdContracts[1].id },
      { description: 'work', price: 202, contractId: createdContracts[2].id },
      { description: 'work', price: 200, contractId: createdContracts[3].id },
      { description: 'work', price: 200, contractId: createdContracts[6].id },
      {
        description: 'work',
        price: 2020,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: createdContracts[6].id,
      },
      {
        description: 'work',
        price: 300,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: createdContracts[1].id,
      },
      {
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-16T19:11:26.737Z'),
        contractId: createdContracts[2].id,
      },
      {
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-17T19:11:26.737Z'),
        contractId: createdContracts[0].id,
      },
      {
        description: 'work',
        price: 200,
        paid: true,
        paymentDate: new Date('2020-08-17T19:11:26.737Z'),
        contractId: createdContracts[4].id,
      },
      {
        description: 'work',
        price: 21,
        paid: true,
        paymentDate: new Date('2020-08-10T19:11:26.737Z'),
        contractId: createdContracts[0].id,
      },
      {
        description: 'work',
        price: 21,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: createdContracts[1].id,
      },
      {
        description: 'work',
        price: 121,
        paid: true,
        paymentDate: new Date('2020-08-15T19:11:26.737Z'),
        contractId: createdContracts[2].id,
      },
      {
        description: 'work',
        price: 121,
        paid: true,
        paymentDate: new Date('2020-08-14T23:11:26.737Z'),
        contractId: createdContracts[2].id,
      },
    ];

    await prisma.job.createMany({
      data: jobsData.map((job) => ({ id: uuidv4(), ...job })),
    });

    console.log('🚀 Seed completado con éxito');
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seed();
}
