import {
  IsUUID,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ProfileType } from '../enums/profile-type.enum';

export class Profile {
  @IsUUID()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public readonly profession: string;

  @IsNumber()
  @Min(0)
  public readonly balance: number;

  @IsEnum(ProfileType)
  public readonly type: ProfileType;

  constructor(
    firstName: string,
    lastName: string,
    profession: string,
    balance: number,
    type: ProfileType,
    id?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.balance = balance;
    this.type = type;
  }
}
