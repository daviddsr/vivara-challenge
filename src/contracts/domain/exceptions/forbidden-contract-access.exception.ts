import { ForbiddenException } from '@nestjs/common';

export class ForbiddenContractAccessException extends ForbiddenException {
  constructor() {
    super('You do not have permission to access this contract');
  }
}
