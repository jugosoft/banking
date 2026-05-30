import { IApiResponse } from "../api.interfaces";
import { IDepositType } from "../deposit-type/deposit-type.interface";
import { IPaginatedResponse } from "../api.interfaces";

export interface IGetDepositTypesResponse extends IApiResponse<IPaginatedResponse<IDepositType>> {
}