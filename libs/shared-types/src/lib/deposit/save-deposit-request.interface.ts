import { IDeposit } from '../entities';

export interface ISaveDepositRequest {
  deposit: {
    bankId: number;
    typeId: number;
    amount: number;
    percent: number;
    startDate: Date;
    endDate: Date;
  }
}