import { IEntityBase } from './entity-base.interface';

export interface IUser extends IEntityBase {
  id: number;
  email: string;
  username: string;
}