import { Contract } from '../contract';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ContractStatus } from '../../enums/contract-status.enum';

describe('Contract', () => {
  it('should create a new contract with `status = new`', async () => {
    const contract = new Contract('Terms contract', uuidv4(), uuidv4());
    const errors = await validate(contract);

    expect(errors.length).toBe(0);
    expect(contract.status).toBe(ContractStatus.NEW);
  });

  it('should validate terms', async () => {
    const contract = new Contract('', uuidv4(), uuidv4());
    const errors = await validate(contract);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate `clientId` is a valid UUID', async () => {
    const contract = new Contract('Términos', 'INVALID_UUID', uuidv4());
    const errors = await validate(contract);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate `contractorId` is a valid UUID', async () => {
    const contract = new Contract('Términos', uuidv4(), 'INVALID_UUID');
    const errors = await validate(contract);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate that `status` has a valid value', async () => {
    const contract = new Contract(
      'Términos',
      uuidv4(),
      uuidv4(),
      'INVALID_CONTRACT_STATUS' as ContractStatus,
    );

    const errors = await validate(contract);

    expect(errors.length).toBeGreaterThan(0);
  });
});
