import { IBank } from './bank.interface';
import { IPercentPeriod } from './percent-period.interface';
import { IDepositType } from './deposit-type.interface';
import { IPeriod } from './period.interface';
import { IEntityBase } from './entity-base.interface';

export interface IDeposit extends IEntityBase {
  type: IDepositType;
  bank: IBank;
  period: IPeriod;
  startAmount: number;
  currentAmount: number;
  displayPercent: number;
  percentPeriods: IPercentPeriod[];
  capitalization: boolean;
  replenishable: boolean;
  withdrawal: boolean;
  comment: string | null;
}
