import { IUser } from '../user/user.interface';
import { IApiResponse } from '../api.interfaces';

export interface IGetCurrentUserResponse extends IApiResponse<IUser> {
}