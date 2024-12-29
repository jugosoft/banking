import {createReducer, on} from '@ngrx/store';
import { IAuthState } from './auth.state';

export const AUTH_INITIAL_STATE: IAuthState = {
    token: null
};

export const authReducer = createReducer(
    AUTH_INITIAL_STATE,

    // on(getEducationalProgramApprovedList, (state): IAuthState => {
    //     return {
    //         ...state,
    //         approved: {
    //             ...state.approved,
    //             page: 0,
    //             state: DataState.FILTERING
    //         }
    //     };
    // })
);
