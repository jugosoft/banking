import { Action, createReducer, on } from '@ngrx/store';
import { IHomeState } from './deposit.state';
import { getDepositList, getDepositListError, getDepositListSuccess } from './home.actions';

export const initialState: IHomeState = {
  isSubmiting: null,
  deposits: null,
};

export const homeReducer = createReducer(
  initialState,

  on(
    getDepositList,
    (state): IHomeState => ({
      ...state,
      isSubmiting: true
    })
  ),

  on(
    getDepositListSuccess,
    (state, { result }): IHomeState => ({
      ...state,
      isSubmiting: false,
      deposits: result.deposits
    })
  ),

  on(
    getDepositListError,
    (state, { error }): IHomeState => ({
      ...state,
      isSubmiting: false,
      deposits: null
    })
  )
);

export function reducer(state: IHomeState, action: Action) {
  return homeReducer(state, action);
}
