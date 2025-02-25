import { ProfileType } from '../enums/profile-type.enum';

export class Profile {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly profession: string;
  public readonly balance: number;
  public readonly type: ProfileType;

  constructor(
    firstName: string,
    lastName: string,
    profession: string,
    balance: number,
    type: ProfileType,
    id: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.balance = balance;
    this.type = type;
  }
}
