import { IDeposit } from "@banking/shared-types";

export interface IDepositState {
  isSubmiting: boolean | null;
  deposit: IDeposit | null;
}
