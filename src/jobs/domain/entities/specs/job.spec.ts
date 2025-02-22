import { Job } from '../job';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

describe('Job', () => {
  it('should create a job with paid = false by default', async () => {
    const job = new Job('Job description', 2000, uuidv4());
    const errors = await validate(job);

    expect(errors.length).toBe(0);
    expect(job.paid).toBe(false);
  });

  it('should allow to assign paid = true when creating', async () => {
    const job = new Job('Desarrollo de API', 2000, uuidv4(), true);
    expect(job.paid).toBe(true);
  });

  it('should validate description is not empty', async () => {
    const job = new Job('', 2000, uuidv4());
    const errors = await validate(job);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate that price is not negative', async () => {
    const job = new Job('Desarrollo de API', -100, uuidv4());
    const errors = await validate(job);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate that `contractId` is a valid UUID', async () => {
    const job = new Job('Desarrollo de API', 2000, 'INVALID_UUID');
    const errors = await validate(job);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should allow to pass a payment date when creation', async () => {
    const paymentDate = new Date();
    const job = new Job(
      'Desarrollo de API',
      2000,
      uuidv4(),
      false,
      paymentDate,
    );
    expect(job.paymentDate).toBe(paymentDate);
  });

  it('should validate that paymentDate is a valid date', async () => {
    const job = new Job(
      'Desarrollo de API',
      2000,
      uuidv4(),
      false,
      'INVALID_DATE' as unknown as Date,
    );
    const errors = await validate(job);

    expect(errors.length).toBeGreaterThan(0);
  });
});
