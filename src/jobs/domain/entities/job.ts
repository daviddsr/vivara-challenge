export class Job {
  public readonly id?: string;
  public readonly description: string;
  public readonly price: number;
  public readonly paid: boolean;
  public readonly paymentDate?: Date;
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
