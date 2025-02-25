import { NotFoundException } from '@nestjs/common';

export class ContractNotFoundException extends NotFoundException {
  constructor() {
    super('The contract was not found');
  }
}
