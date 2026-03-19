import { IUser } from "../user/user.interface";

export interface IDeposit {
  readonly id: number;
  readonly amount: number;
  readonly rate: number;
  readonly term: number;
  readonly name: string;
  readonly description?: string;
  readonly archived: boolean;
  readonly userId?: number;
  readonly user?: IUser;
}