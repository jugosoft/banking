import { ICurrentUser } from '../types';

export interface IAuthState {
  isSubmiting: boolean | null;
  currentUser: ICurrentUser | null;
}
