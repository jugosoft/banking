import { IBank } from './bank.interface';
import { IDepositType } from './deposit-type.interface';

import { IEntityBase } from './entity-base.interface';

export interface IDepositListItem extends IEntityBase {
  type: IDepositType;
  bank: IBank;
  beginDate: Date;
  endDate: Date;
  currentAmount: number;
  displayPercent: number;
  capitalization: boolean;
  replenishable: boolean;
  withdrawal: boolean;
}
