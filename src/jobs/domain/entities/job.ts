import {
  IsUUID,
  IsString,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
  IsDate,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class Job {
  @IsUUID()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public readonly description: string;

  @IsNumber()
  @Min(0)
  public readonly price: number;

  @IsBoolean()
  public readonly paid: boolean;

  @IsOptional()
  @IsDate()
  public readonly paymentDate?: Date;

  @IsUUID()
  public readonly contractId: string;

  constructor(
    description: string,
    price: number,
    contractId: string,
    paid: boolean = false,
    paymentDate?: Date,
    id?: string,
  ) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.paid = paid;
    this.paymentDate = paymentDate;
    this.contractId = contractId;
  }
}
