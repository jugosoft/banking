import { IResponseErrors } from '@api/api.interfaces';
import { IUser } from '@api/user/user.interface';

export interface IAuthState {
    isSubmiting: boolean | null;
    currentUser: Omit<IUser, 'password' | 'hashedRT' | 'deposits'> | null;
    token: string | null;
    validationErrors: IResponseErrors | null;
}
