import { IRole } from '../role/role.interface';

export interface IUserInfo {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly email: string;
  readonly roles: IRole[];
  readonly name: string;
}