import { IResponseErrors } from '@banking/shared-types';
import { ICurrentUser } from '../types';

export interface IAuthState {
  isSubmiting: boolean | null;
  currentUser: ICurrentUser | null;
  token: string | null;
  validationErrors: IResponseErrors | null;
}
