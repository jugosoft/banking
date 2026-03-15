import { IBank } from './bank.interface';
import { IPercentPeriod } from './percent-period.interface';
import { IDepositType } from './deposit-type.interface';
import { IPeriod } from './period.interface';
import { IEntityBase } from './entity-base.interface';

export interface IDeposit extends IEntityBase {
  id: number;
  archived: boolean;
  period: IPeriod;
  type: IDepositType;
  bank: IBank;
  capitalization: boolean;
  comment: string | null;
  displayPercent: number;
  percentPeriods: IPercentPeriod[];
  replenishable: boolean;
  withdrawal: boolean;
  startAmount: number;
  currentAmount: number;
}
