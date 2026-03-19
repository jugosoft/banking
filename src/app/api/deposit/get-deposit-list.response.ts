import { IApiResponse } from "../api.interfaces";
import { IPaginatedResponse } from "../api.interfaces";
import { IDeposit } from "./deposit.interface";

export interface IGetDepositListResponse extends IApiResponse<IPaginatedResponse<IDeposit>> {
}