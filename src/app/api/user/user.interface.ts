import { IRole } from '../role/role.interface';
import { IDeposit } from '../deposit/deposit.interface';

export interface IUser {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly email: string;
  readonly roles: IRole[];
  readonly name: string;
  readonly password: string;
  readonly hashedRT: string;
  readonly deposits: IDeposit[];
}