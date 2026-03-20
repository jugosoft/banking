import { IApiResponse } from '../api.interfaces';
import { IAuthInfo } from './auth-info.interface';

export interface ILoginResponse extends IApiResponse<IAuthInfo> {
}