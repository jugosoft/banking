import { IBank } from './bank.interface';
import { IPercentPeriod } from './percent-period.interface';
import { IDepositType } from './deposit-type.interface';

export interface IDeposit {
  type: IDepositType;
  bank: IBank;
  startAmount: number;
  displayPercent: number;
  percentPeriods: IPercentPeriod[];
  capitalization: boolean;
  replenishable: boolean;
  withdrawal: boolean;
  daysBeforeClose: number;
  comment: string | null;
}
