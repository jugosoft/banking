import { IDepositCard } from "src/app/common/interfaces";

export interface IHomeState {
    isSubmiting: boolean | null;
    isLoading: boolean | null;
    deposits: IDepositCard[] | null;
}
