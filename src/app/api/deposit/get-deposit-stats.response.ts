import { IApiResponse } from "../api.interfaces";

export interface IDepositStats {
    readonly totalInterest: number;
    readonly totalAmount: number;
}

export interface IGetDepositStatsResponse extends IApiResponse<IDepositStats> {
}
