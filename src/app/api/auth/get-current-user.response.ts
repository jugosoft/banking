import { IUserInfo } from '@api/user';
import { IApiResponse } from '../api.interfaces';
import { TokenPair } from './tokens.type';

export interface IGetCurrentUserResponse extends IApiResponse<IUserInfo & TokenPair> {
}