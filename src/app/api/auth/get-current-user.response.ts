import { IApiResponse } from '../api.interfaces';
import { IAuthInfo } from './auth-info.interface';

export interface IGetCurrentUserResponse extends IApiResponse<IAuthInfo> {
}