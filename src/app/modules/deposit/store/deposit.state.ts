import { Deposit } from "../../../entities";

export interface IDepositState {
    isSubmiting: boolean | null;
    deposit: Deposit | null;
}
