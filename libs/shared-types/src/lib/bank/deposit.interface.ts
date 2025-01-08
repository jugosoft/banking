import { IBank } from './bank.interface';
import { IPercentPeriod } from './percent-period.interface';

export interface IDeposit {
  bank: IBank;
  startAmount: number;
  percentPeriods: IPercentPeriod[];
  capitalization: boolean;
  replenishable: boolean;
  withdrawal: boolean;
  isClosingSoon: boolean;
  daysBeforeClose: number;
}
