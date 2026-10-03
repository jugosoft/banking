import { IBank } from "@api/bank/bank.interface";
import { IDepositType } from "@api/deposit-type";

export interface IUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

export interface IInvestHistoryItem {
  readonly amount: number;
  readonly date: Date;
}

export interface IInvest {
  readonly id: number;
  readonly amount: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly snapshotDate: Date;
  readonly history: IInvestHistoryItem[];
  readonly user: IUser;
  readonly bank: IBank;
  readonly depositType: IDepositType;
}

export interface IInvestListItem {
  readonly id: number;
  readonly amount: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly bank: IBank;
  readonly depositType: IDepositType;
}
