import { IBank } from "@api/bank/bank.interface";
import { IUser } from "../user/user.interface";
import { IDepositType } from "@api/deposit-type";

export interface IDeposit {
  readonly id: number;
  readonly startAmount: number;
  readonly rate: number;
  readonly term: number;
  readonly type: IDepositType;
  readonly percent: number;
  readonly name: string;
  readonly beginDate: Date;
  readonly endDate: Date;
  readonly comment?: Date;
  readonly description?: string;
  readonly archived: boolean;
  readonly user: IUser;
  readonly bank: IBank;
}