import { IsUUID } from 'class-validator';

export class GetContractByIdDto {
  @IsUUID('4', { message: 'The contract ID must be a valid UUID' })
  id: string;
}
