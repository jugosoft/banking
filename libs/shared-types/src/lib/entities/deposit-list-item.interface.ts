import { IBank } from './bank.interface';
import { IPercentPeriod } from './percent-period.interface';
import { IDepositType } from './deposit-type.interface';
import { IPeriod } from './period.interface';
import { IEntityBase } from './entity-base.interface';

export interface IDepositListItem extends IEntityBase {
  type: IDepositType;
  bank: IBank;
  period: IPeriod;
  currentAmount: number;
  displayPercent: number;
  capitalization: boolean;
  replenishable: boolean;
  withdrawal: boolean;
}
