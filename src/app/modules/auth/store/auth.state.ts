import { IResponseErrors } from '@api/api.interfaces';
import { IUserInfo } from '@api/user/user.interface';

export interface IAuthState {
    isSubmiting: boolean | null;
    currentUser: IUserInfo | null;
    token: string | null;
    validationErrors: IResponseErrors | null;
}
