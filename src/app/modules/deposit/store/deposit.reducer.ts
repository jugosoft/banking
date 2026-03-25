import { Action, createReducer, on } from '@ngrx/store';
import { saveDeposit, saveDepositError, saveDepositSuccess, getDeposit, getDepositError, getDepositSuccess } from './deposit.actions';
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
    ),

    on(
        getDeposit,
        (state): IDepositState => ({
            ...state,
            isLoading: true,
        })
    ),

    on(
        getDepositSuccess,
        (state, { result }): IDepositState => ({
            ...state,
            isLoading: false,
            // deposits: result.data,
        })
    ),

    on(
        getDepositError,
        (state): IDepositState => ({
            ...state,
            isLoading: false,
            deposits: [],
        })
    )
);

export function reducer(state: IDepositState, action: Action) {
    return depositReducer(state, action);
}
