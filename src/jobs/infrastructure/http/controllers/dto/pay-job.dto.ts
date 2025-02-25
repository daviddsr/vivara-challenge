import { IsUUID } from 'class-validator';

export class PayJobDTO {
  @IsUUID()
  id: string;
}
