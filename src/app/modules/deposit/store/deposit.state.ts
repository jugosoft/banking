import { IDeposit } from '../../../api/deposit/deposit.interface';

export interface IDepositState {
    isSubmiting: boolean | null;
    deposit: Deposit | null;
}
