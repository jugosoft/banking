import { IApiResponse } from "../api.interfaces";
import { IPaginatedResponse } from "../api.interfaces";
import { IInvestListItem } from "./invest.interface";

export interface IGetInvestListResponse extends IApiResponse<IPaginatedResponse<IInvestListItem>> {
}
