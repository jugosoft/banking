import { IApiResponse, IPaginatedResponse } from "../api.interfaces";
import { IBank } from "./bank.interface";

export interface IGetBanksResponse extends IApiResponse<IPaginatedResponse<IBank>> {
}