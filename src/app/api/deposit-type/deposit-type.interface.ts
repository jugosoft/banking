import { IDepositGroup } from "@api/deposit-group";

export interface IDepositType {
  readonly id: number;
  readonly name: string;
  readonly depositGroup: IDepositGroup;
}
