import { IBank } from "@api/bank/bank.interface";
import { IDepositType } from "@api/deposit-type";

export interface IDeposit {
  readonly id: number;
  readonly amount: number;
  readonly percent: number;
  readonly term: number;
  readonly depositType: IDepositType;
  readonly name: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly comment?: Date;
  readonly description?: string;
  readonly archived: boolean;
  readonly bank: IBank;
}