import { IDepositCard } from "../../../common/interfaces";

export interface IHomeState {
  isSubmiting: boolean | null;
  deposits: IDepositCard[] | null;
}
