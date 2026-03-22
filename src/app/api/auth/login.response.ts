import { IUserInfo } from '@api/user';
import { IApiResponse } from '../api.interfaces';
import { TokenPair } from './tokens.type';

export interface ILoginResponse extends IApiResponse<IUserInfo & TokenPair> {
}