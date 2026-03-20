import { IDeposit } from '@api/deposit';

export interface IDepositState {
    isSubmiting: boolean | null;
    deposit: IDeposit | null;
}

export const initialState: IDepositState = {
    isSubmiting: null,
    deposit: null,
};