import { IAuthState } from '../modules/auth/store/auth.state';
import { IHomeState } from '../modules/home/store/home.state';

export interface IState {
    auth: IAuthState;
    home: IHomeState;
}
