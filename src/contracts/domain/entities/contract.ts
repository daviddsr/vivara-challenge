import {
  IsUUID,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ContractStatus } from '../enums/contract-status.enum';

export class Contract {
  @IsUUID()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  @IsNotEmpty()
  public readonly terms: string;

  @IsEnum(ContractStatus)
  public readonly status: ContractStatus;

  @IsUUID()
  public readonly clientId: string;

  @IsUUID()
  public readonly contractorId: string;

  constructor(
    terms: string,
    clientId: string,
    contractorId: string,
    status?: ContractStatus,
    id?: string,
  ) {
    this.id = id;
    this.terms = terms;
    this.clientId = clientId;
    this.contractorId = contractorId;
    this.status = status || ContractStatus.NEW;
  }
}
