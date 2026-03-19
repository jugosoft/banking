import { IApiResponse } from "../api.interfaces";
import { IDeposit } from "./deposit.interface";

export interface IGetDepositResponse extends IApiResponse<IDeposit> {
}