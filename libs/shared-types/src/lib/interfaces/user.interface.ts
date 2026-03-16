import { IDeposit } from './deposit.interface';
import { IEntityBase } from './entity-base.interface';

export interface IUser extends IEntityBase {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  deposits?: IDeposit[];
}
