import { IDeposit } from '@api/deposit';

export interface IDepositState {
    isSubmiting: boolean | null;
    deposit: IDeposit | null;
}
