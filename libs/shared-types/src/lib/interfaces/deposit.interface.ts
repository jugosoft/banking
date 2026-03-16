import { IBank } from './bank.interface';
import { IDepositType } from './deposit-type.interface';

import { IEntityBase } from './entity-base.interface';

export interface IDeposit extends IEntityBase {
  id: number;
  archived: boolean;
  beginDate: Date;
  endDate?: Date;
  type: IDepositType;
  bank: IBank;
  capitalization: boolean;
  comment?: string;
  percent: number;
  replenishable: boolean;
  withdrawal: boolean;
  startAmount: number;
}
