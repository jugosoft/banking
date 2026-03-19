import { IDepositCard } from '../../../api/deposit/deposit.interface';

export interface IHomeState {
    isSubmiting: boolean | null;
    deposits: IDepositCard[] | null;
}
