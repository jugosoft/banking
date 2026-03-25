import { IDeposit } from '@api/deposit';

export interface IDepositState {
    isSubmiting: boolean | null;
    deposit: IDeposit | null;
    deposits: IDeposit[];
    isLoading: boolean;
}

export const initialState: IDepositState = {
    isSubmiting: null,
    deposit: null,
    deposits: [],
    isLoading: false,
};