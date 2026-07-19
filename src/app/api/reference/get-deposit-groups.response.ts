import { IDepositGroup } from "@api/deposit-group/deposit-group.interface";
import { IApiResponse, IPaginatedResponse } from "../api.interfaces";

export interface IGetDepositGroupsResponse extends IApiResponse<IPaginatedResponse<IDepositGroup>> {
}
