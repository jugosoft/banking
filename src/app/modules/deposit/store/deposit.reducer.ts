-import { Action, createReducer, on } from '@ngrx/store';
import {
    saveDeposit,
    saveDepositError,
    saveDepositSuccess,
} from './deposit.actions';
import { IDepositState, initialState } from './deposit.state';



export const depositReducer = createReducer(
    initialState,

    on(
        saveDeposit,
        (state): IDepositState => ({
            ...state,
            isSubmiting: true,
        })
    ),

    on(
        saveDepositSuccess,
        (state, { result }): IDepositState => ({
            ...state,
            isSubmiting: false,
        })
    ),

    on(
        saveDepositError,
        (state, { error }): IDepositState => ({
            ...state,
            isSubmiting: false,
        })
    )
);

export function reducer(state: IDepositState, action: Action) {
    return depositReducer(state, action);
}
