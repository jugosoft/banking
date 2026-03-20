import { IUser } from '../user/user.interface';

export interface IAuthInfo {
    readonly user: IUser;
    readonly token: string;
}